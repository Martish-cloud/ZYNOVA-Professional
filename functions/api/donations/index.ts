import { recordVerifiedPayment, loadDonations, loadDistributions, calculateStats } from "../_store.ts";

export const onRequestPost = async (context: { request: Request; env: any }) => {
  try {
    const body = (await context.request.json().catch(() => ({}))) as any;
    const { donorName, donorEmail, amount, currency, transactionReference, paymentMethod, anonymous } = body;

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Minimum contribution amount is ₹1"
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    if (!transactionReference || String(transactionReference).trim().length < 3) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Transaction / UTR Reference ID is required."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const refUpper = String(transactionReference).toUpperCase();
    if (refUpper.includes("PIN") || refUpper.includes("OTP") || refUpper.includes("CVV")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please only provide your transaction/UTR reference ID. Do NOT submit PIN, OTP, or passwords."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Record submission (for UPI reference reconciliation)
    const { added, record } = await recordVerifiedPayment(
      {
        amount: numAmount,
        currency: currency || "INR",
        paymentMethod: paymentMethod || "UPI",
        paymentId: `upi_ref_${transactionReference.trim()}`,
        transactionReference: transactionReference.trim(),
        donorName: anonymous ? "Anonymous" : (donorName || "Anonymous"),
        donorEmail: donorEmail || undefined,
        paymentStatus: "verified"
      },
      context.env
    );

    const donations = await loadDonations(context.env);
    const distributions = await loadDistributions(context.env);
    const stats = calculateStats(donations, distributions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your contribution. Your reference has been recorded and verified.",
        isNew: added,
        donation: {
          id: record.id,
          amount: record.amount,
          currency: record.currency,
          status: record.paymentStatus,
          createdAt: record.createdAt
        },
        stats
      }),
      { status: 201, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to record contribution submission",
        error: String(error)
      }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

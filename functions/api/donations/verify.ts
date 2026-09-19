import {
  verifyRazorpaySignature,
  recordVerifiedPayment,
  loadDonations,
  loadDistributions,
  calculateStats
} from "../_store.ts";

export const onRequestPost = async (context: { request: Request; env: any }) => {
  try {
    const body = (await context.request.json().catch(() => ({}))) as any;
    const {
      paymentId,
      orderId,
      signature,
      amount,
      donorName,
      donorEmail
    } = body;

    if (!paymentId || !amount) {
      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          message: "Payment ID and contribution amount are required for verification."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          message: "Minimum verified contribution amount is ₹1."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 1. Verify cryptographic signature if secret is provided in environment
    const secret = context.env?.RAZORPAY_KEY_SECRET || "";
    if (secret && signature && orderId) {
      const isValid = await verifyRazorpaySignature(orderId, paymentId, signature, secret);
      if (!isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: "Cryptographic signature verification failed. Untrusted payment."
          }),
          { status: 403, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }
    }

    // 2. Prevent duplicate counting (Idempotency)
    const { added, record } = await recordVerifiedPayment(
      {
        amount: numAmount,
        currency: "INR",
        paymentMethod: "UPI / Online",
        paymentId: paymentId.trim(),
        orderId: orderId?.trim() || undefined,
        donorName: donorName?.trim() || "Anonymous",
        donorEmail: donorEmail?.trim() || undefined,
        paymentStatus: "verified"
      },
      context.env
    );

    // 3. Recalculate transparency metrics immediately
    const donations = await loadDonations(context.env);
    const distributions = await loadDistributions(context.env);
    const stats = calculateStats(donations, distributions);

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        isNewContribution: added,
        amount: numAmount,
        record: {
          id: record.id,
          paymentId: record.paymentId,
          amount: record.amount,
          currency: record.currency,
          verifiedAt: record.verifiedAt
        },
        stats
      }),
      { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        verified: false,
        message: "Payment verification failed due to server error",
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

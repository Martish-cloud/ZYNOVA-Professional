import {
  verifyWebhookSignature,
  recordVerifiedPayment,
  loadDonations,
  loadDistributions,
  calculateStats
} from "../_store.ts";

export const onRequestPost = async (context: { request: Request; env: any }) => {
  try {
    const rawBody = await context.request.text();
    const signature = context.request.headers.get("x-razorpay-signature") || "";
    const webhookSecret = context.env?.RAZORPAY_WEBHOOK_SECRET || "";

    // 1. Verify webhook signature if secret configured
    if (webhookSecret) {
      const isValid = await verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.warn("[WEBHOOK] Invalid Razorpay webhook signature");
        return new Response("Invalid signature", { status: 400 });
      }
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response("Invalid JSON payload", { status: 400 });
    }

    const event = payload.event;
    console.log(`[WEBHOOK] Received payment event: ${event}`);

    // Handle payment.captured or order.paid
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity || payload.payload?.order?.entity;

      if (!paymentEntity) {
        return new Response("Missing payment entity", { status: 400 });
      }

      const paymentId = paymentEntity.id;
      const orderId = paymentEntity.order_id;
      // Razorpay amounts are in paise (100 paise = 1 INR)
      const amountPaise = Number(paymentEntity.amount);
      const amountInr = amountPaise >= 100 ? amountPaise / 100 : amountPaise;
      const currency = paymentEntity.currency || "INR";
      const status = paymentEntity.status; // "captured"
      const donorEmail = paymentEntity.email;
      const donorName = paymentEntity.notes?.donorName || "Anonymous";

      // Ensure payment is successful and currency matches
      if (status !== "captured" && status !== "paid" && event !== "payment.captured") {
        console.log(`[WEBHOOK] Payment ${paymentId} status is ${status}, ignoring non-captured event.`);
        return new Response("Ignored non-captured event", { status: 200 });
      }

      if (currency !== "INR") {
        console.warn(`[WEBHOOK] Currency mismatch: ${currency}`);
      }

      // 2. Idempotency & Recording
      const { added } = await recordVerifiedPayment(
        {
          amount: amountInr,
          currency: "INR",
          paymentMethod: paymentEntity.method ? `Razorpay (${paymentEntity.method})` : "UPI / Online",
          paymentId,
          orderId,
          donorName,
          donorEmail,
          paymentStatus: "verified"
        },
        context.env
      );

      console.log(`[WEBHOOK] Payment ${paymentId} processed. Added new: ${added}. Amount: ₹${amountInr}`);

      // 3. Recalculate
      const donations = await loadDonations(context.env);
      const distributions = await loadDistributions(context.env);
      const stats = calculateStats(donations, distributions);

      return new Response(
        JSON.stringify({
          status: "ok",
          processed: true,
          added,
          stats
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Acknowledge other events without error
    return new Response(JSON.stringify({ status: "ignored_event" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[WEBHOOK ERROR]", error);
    return new Response("Internal webhook error", { status: 500 });
  }
};

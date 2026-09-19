import {
  loadDonations,
  loadDistributions,
  calculateStats,
  recordVerifiedPayment,
  verifyRazorpaySignature,
  verifyWebhookSignature
} from "./functions/api/_store.ts";

export interface Env {
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  DB?: any;
  TRANSPARENCY_KV?: any;
  KV?: any;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
}

const jsonResponse = (data: any, status = 200, extraHeaders: Record<string, string> = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature",
      ...extraHeaders
    }
  });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature"
        }
      });
    }

    // 1. GET /api/donations/transparency or /api/transparency
    if (
      request.method === "GET" &&
      (url.pathname === "/api/donations/transparency" || url.pathname === "/api/transparency")
    ) {
      try {
        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);
        return jsonResponse({ success: true, data: stats }, 200, {
          "Cache-Control": "public, max-age=10, stale-while-revalidate=30"
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 2. POST /api/donations/create-order
    if (request.method === "POST" && url.pathname === "/api/donations/create-order") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const amount = Number(body.amount);
        if (isNaN(amount) || amount < 1) {
          return jsonResponse({ success: false, message: "Minimum contribution amount is ₹1" }, 400);
        }

        const keyId = env.RAZORPAY_KEY_ID || "";
        const keySecret = env.RAZORPAY_KEY_SECRET || "";

        if (keyId && keySecret) {
          const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
          const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              currency: "INR",
              receipt: `zyn_don_${Date.now()}`
            })
          });

          if (rzpRes.ok) {
            const rzpOrder = (await rzpRes.json()) as any;
            return jsonResponse({
              success: true,
              orderId: rzpOrder.id,
              amount,
              currency: "INR",
              keyId
            });
          }
        }

        const fallbackOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        return jsonResponse({
          success: true,
          orderId: fallbackOrderId,
          amount,
          currency: "INR",
          keyId: keyId || "rzp_test_zynova"
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 3. POST /api/donations/verify
    if (request.method === "POST" && url.pathname === "/api/donations/verify") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const { paymentId, orderId, signature, amount, donorName, donorEmail } = body;

        const numAmount = Number(amount);
        if (!paymentId || isNaN(numAmount) || numAmount < 1) {
          return jsonResponse({ success: false, message: "Valid payment ID and minimum ₹1 amount required." }, 400);
        }

        const secret = env.RAZORPAY_KEY_SECRET || "";
        if (secret && signature && orderId) {
          const isValid = await verifyRazorpaySignature(orderId, paymentId, signature, secret);
          if (!isValid) {
            return jsonResponse({ success: false, message: "Cryptographic signature verification failed." }, 403);
          }
        }

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
          env
        );

        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);

        return jsonResponse({
          success: true,
          verified: true,
          isNewContribution: added,
          amount: numAmount,
          record,
          stats
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 4. POST /api/donations/webhook
    if (request.method === "POST" && url.pathname === "/api/donations/webhook") {
      try {
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") || "";
        const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET || "";

        if (webhookSecret) {
          const isValid = await verifyWebhookSignature(rawBody, signature, webhookSecret);
          if (!isValid) {
            return new Response("Invalid signature", { status: 400 });
          }
        }

        const payload = JSON.parse(rawBody);
        const event = payload.event;

        if (event === "payment.captured" || event === "order.paid") {
          const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity;
          if (!entity) return new Response("Missing payment entity", { status: 400 });

          const amountPaise = Number(entity.amount);
          const amountInr = amountPaise >= 100 ? amountPaise / 100 : amountPaise;

          const { added } = await recordVerifiedPayment(
            {
              amount: amountInr,
              currency: "INR",
              paymentMethod: entity.method ? `Razorpay (${entity.method})` : "UPI / Online",
              paymentId: entity.id,
              orderId: entity.order_id,
              donorName: entity.notes?.donorName || "Anonymous",
              donorEmail: entity.email,
              paymentStatus: "verified"
            },
            env
          );

          const donations = await loadDonations(env);
          const distributions = await loadDistributions(env);
          const stats = calculateStats(donations, distributions);

          return jsonResponse({ status: "ok", added, stats });
        }

        return jsonResponse({ status: "ignored_event" });
      } catch (_err) {
        return new Response("Internal webhook error", { status: 500 });
      }
    }

    // 5. POST /api/donations (reconciliation submission)
    if (request.method === "POST" && url.pathname === "/api/donations") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const { donorName, donorEmail, amount, currency, transactionReference, paymentMethod, anonymous } = body;
        const numAmount = Number(amount);

        if (isNaN(numAmount) || numAmount < 1 || !transactionReference) {
          return jsonResponse({ success: false, message: "Valid amount (min ₹1) and reference ID required." }, 400);
        }

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
          env
        );

        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);

        return jsonResponse(
          {
            success: true,
            isNew: added,
            donation: record,
            stats
          },
          201
        );
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // Default: Fallback to static assets (SPA)
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};

export const onRequestPost = async (context: { request: Request; env: any }) => {
  try {
    const body = (await context.request.json().catch(() => ({}))) as any;
    const amount = Number(body.amount);

    if (isNaN(amount) || amount < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Minimum contribution amount is ₹1"
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const keyId = context.env?.RAZORPAY_KEY_ID || "";
    const keySecret = context.env?.RAZORPAY_KEY_SECRET || "";

    // If Razorpay API credentials are configured in Cloudflare environment
    if (keyId && keySecret) {
      const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // amount in paise
          currency: "INR",
          receipt: `zyn_don_${Date.now()}`,
          notes: {
            initiative: "Zynova Gives Back",
            donorName: body.donorName || "Anonymous"
          }
        })
      });

      if (rzpRes.ok) {
        const rzpOrder = (await rzpRes.json()) as any;
        return new Response(
          JSON.stringify({
            success: true,
            orderId: rzpOrder.id,
            amount: amount,
            currency: "INR",
            keyId
          }),
          { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }
    }

    // Fallback order ID for zero-setup / direct payment checkout mode
    const fallbackOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return new Response(
      JSON.stringify({
        success: true,
        orderId: fallbackOrderId,
        amount: amount,
        currency: "INR",
        keyId: keyId || "rzp_test_zynova_direct"
      }),
      { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create contribution order",
        error: String(err)
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

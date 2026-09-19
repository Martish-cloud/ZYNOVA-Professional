import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { prisma } from "../services/db.js";
import { donationSchema } from "../schemas/validation.js";

export const submitDonation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parseResult = donationSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid contribution submission",
        errors: parseResult.error.flatten().fieldErrors
      });
      return;
    }

    const { donorName, donorEmail, amount, currency, transactionReference, paymentMethod, anonymous } = parseResult.data;

    // Safety check: Ensure no sensitive bank credentials were inadvertently sent
    const refUpper = transactionReference.toUpperCase();
    if (refUpper.includes("PIN") || refUpper.includes("OTP") || refUpper.includes("CVV")) {
      res.status(400).json({
        success: false,
        message: "Please only provide your transaction/UTR reference ID. Do NOT submit PIN, OTP, or banking passwords."
      });
      return;
    }

    const donation = await prisma.donation.create({
      data: {
        donorName: anonymous ? "Anonymous" : (donorName || "Anonymous"),
        donorEmail: donorEmail || null,
        amount,
        currency,
        transactionReference,
        paymentMethod,
        paymentStatus: "pending", // Always pending until manual reconciliation
        anonymous
      }
    });

    console.log(`[CHARITY] New contribution recorded: ${donation.id} - ${currency} ${amount} (Ref: ${transactionReference}) [Status: pending]`);

    res.status(201).json({
      success: true,
      message: "Thank you for your contribution. Your payment will be verified before it is included in the published donation records.",
      donation: {
        id: donation.id,
        amount: donation.amount,
        currency: donation.currency,
        status: donation.paymentStatus,
        createdAt: donation.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTransparencyStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Current month start
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Sum of verified donations for current month
    const currentMonthAgg = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: {
        paymentStatus: "verified",
        createdAt: { gte: startOfMonth }
      }
    });

    // Sum of all-time verified donations
    const totalVerifiedAgg = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { paymentStatus: "verified" }
    });

    // Sum of distributed donations from published records
    const totalDistributedAgg = await prisma.monthlyDistribution.aggregate({
      _sum: { amountDistributed: true },
      where: { published: true }
    });

    // Latest published distribution
    const latestDistribution = await prisma.monthlyDistribution.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: {
        currentMonthVerified: currentMonthAgg._sum.amount ?? 0,
        totalVerified: totalVerifiedAgg._sum.amount ?? 0,
        totalDistributed: totalDistributedAgg._sum.amountDistributed ?? 0,
        latestDistribution: latestDistribution
          ? {
              month: latestDistribution.month,
              amountDistributed: latestDistribution.amountDistributed,
              recipientName: latestDistribution.recipientName ?? "To Be Announced",
              cause: latestDistribution.cause ?? "Community Initiative",
              distributionDate: latestDistribution.distributionDate
            }
          : null,
        recipientStatus: latestDistribution?.recipientName ?? "To Be Announced"
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const amount = Number(req.body.amount);
    if (isNaN(amount) || amount < 1) {
      res.status(400).json({ success: false, message: "Minimum contribution amount is ₹1" });
      return;
    }

    const keyId = process.env.RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    if (keyId && keySecret) {
      const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
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
        res.json({
          success: true,
          orderId: rzpOrder.id,
          amount,
          currency: "INR",
          keyId
        });
        return;
      }
    }

    const fallbackOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    res.json({
      success: true,
      orderId: fallbackOrderId,
      amount,
      currency: "INR",
      keyId: keyId || "rzp_test_zynova"
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { paymentId, orderId, signature, amount, donorName, donorEmail } = req.body;
    const numAmount = Number(amount);

    if (!paymentId || isNaN(numAmount) || numAmount < 1) {
      res.status(400).json({ success: false, message: "Valid payment ID and minimum ₹1 amount required." });
      return;
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    if (secret && signature && orderId) {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (expectedSignature.toLowerCase() !== signature.toLowerCase()) {
        res.status(403).json({ success: false, message: "Cryptographic signature verification failed." });
        return;
      }
    }

    // Idempotency check in Prisma DB
    const existing = await prisma.donation.findFirst({
      where: {
        OR: [
          { id: paymentId },
          { transactionReference: paymentId }
        ]
      }
    });

    if (existing) {
      res.json({
        success: true,
        verified: true,
        isNewContribution: false,
        amount: existing.amount,
        record: existing
      });
      return;
    }

    const newRecord = await prisma.donation.create({
      data: {
        donorName: donorName?.trim() || "Anonymous",
        donorEmail: donorEmail?.trim() || null,
        amount: numAmount,
        currency: "INR",
        transactionReference: paymentId.trim(),
        paymentMethod: "UPI / Online",
        paymentStatus: "verified",
        anonymous: !donorName || donorName === "Anonymous"
      }
    });

    res.json({
      success: true,
      verified: true,
      isNewContribution: true,
      amount: numAmount,
      record: newRecord
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = (req.headers["x-razorpay-signature"] as string) || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    if (secret) {
      const rawBody = JSON.stringify(req.body);
      const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
      if (expectedSignature !== signature) {
        res.status(400).send("Invalid signature");
        return;
      }
    }

    const payload = req.body;
    const event = payload?.event;

    if (event === "payment.captured" || event === "order.paid") {
      const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity;
      if (!entity) {
        res.status(400).send("Missing entity");
        return;
      }

      const paymentId = entity.id;
      const amountPaise = Number(entity.amount);
      const amountInr = amountPaise >= 100 ? amountPaise / 100 : amountPaise;

      const existing = await prisma.donation.findFirst({
        where: { transactionReference: paymentId }
      });

      if (!existing) {
        await prisma.donation.create({
          data: {
            donorName: entity.notes?.donorName || "Anonymous",
            donorEmail: entity.email || null,
            amount: amountInr,
            currency: "INR",
            transactionReference: paymentId,
            paymentMethod: entity.method ? `Razorpay (${entity.method})` : "UPI / Online",
            paymentStatus: "verified",
            anonymous: !entity.notes?.donorName
          }
        });
      }

      res.json({ status: "ok", processed: true });
      return;
    }

    res.json({ status: "ignored" });
  } catch (_err) {
    res.status(500).send("Internal webhook error");
  }
};


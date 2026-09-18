import type { Request, Response, NextFunction } from "express";
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

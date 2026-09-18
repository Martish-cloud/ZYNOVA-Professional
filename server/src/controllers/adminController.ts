import type { Request, Response, NextFunction } from "express";
import { prisma } from "../services/db.js";
import { updateDonationStatusSchema, monthlyDistributionSchema } from "../schemas/validation.js";

export const getInquiries = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookings = await prisma.discoveryBooking.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.discoveryBooking.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// Admin Donations Management
export const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;
    const whereClause = status ? { paymentStatus: String(status) } : {};

    const donations = await prisma.donation.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

export const updateDonationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parseResult = updateDonationStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid status update",
        errors: parseResult.error.flatten().fieldErrors
      });
      return;
    }

    const updated = await prisma.donation.update({
      where: { id },
      data: { paymentStatus: parseResult.data.paymentStatus }
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// Admin Monthly Distributions Management
export const getDistributions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const distributions = await prisma.monthlyDistribution.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      count: distributions.length,
      data: distributions
    });
  } catch (error) {
    next(error);
  }
};

export const createDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parseResult = monthlyDistributionSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid distribution data",
        errors: parseResult.error.flatten().fieldErrors
      });
      return;
    }

    const data = parseResult.data;
    const created = await prisma.monthlyDistribution.create({
      data: {
        month: data.month,
        totalVerifiedContributions: data.totalVerifiedContributions,
        processingFees: data.processingFees,
        refunds: data.refunds,
        amountAvailable: data.amountAvailable,
        amountDistributed: data.amountDistributed,
        recipientName: data.recipientName || null,
        recipientDetails: data.recipientDetails || null,
        cause: data.cause || null,
        distributionDate: data.distributionDate ? new Date(data.distributionDate) : null,
        documentationURL: data.documentationURL || null,
        published: data.published
      }
    });

    res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parseResult = monthlyDistributionSchema.partial().safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid update data",
        errors: parseResult.error.flatten().fieldErrors
      });
      return;
    }

    const data = parseResult.data;
    const updated = await prisma.monthlyDistribution.update({
      where: { id },
      data: {
        ...(data.month && { month: data.month }),
        ...(data.totalVerifiedContributions !== undefined && { totalVerifiedContributions: data.totalVerifiedContributions }),
        ...(data.processingFees !== undefined && { processingFees: data.processingFees }),
        ...(data.refunds !== undefined && { refunds: data.refunds }),
        ...(data.amountAvailable !== undefined && { amountAvailable: data.amountAvailable }),
        ...(data.amountDistributed !== undefined && { amountDistributed: data.amountDistributed }),
        ...(data.recipientName !== undefined && { recipientName: data.recipientName }),
        ...(data.recipientDetails !== undefined && { recipientDetails: data.recipientDetails }),
        ...(data.cause !== undefined && { cause: data.cause }),
        ...(data.distributionDate !== undefined && {
          distributionDate: data.distributionDate ? new Date(data.distributionDate) : null
        }),
        ...(data.documentationURL !== undefined && { documentationURL: data.documentationURL }),
        ...(data.published !== undefined && { published: data.published })
      }
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [
      totalInquiries,
      newInquiries,
      totalBookings,
      pendingBookings,
      totalDonations,
      pendingDonations,
      verifiedDonationsAgg,
      totalDistributedAgg
    ] = await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: "NEW" } }),
      prisma.discoveryBooking.count(),
      prisma.discoveryBooking.count({ where: { status: "PENDING" } }),
      prisma.donation.count(),
      prisma.donation.count({ where: { paymentStatus: "pending" } }),
      prisma.donation.aggregate({
        _sum: { amount: true },
        where: { paymentStatus: "verified" }
      }),
      prisma.monthlyDistribution.aggregate({
        _sum: { amountDistributed: true },
        where: { published: true }
      })
    ]);

    res.json({
      success: true,
      stats: {
        totalInquiries,
        newInquiries,
        totalBookings,
        pendingBookings,
        donations: {
          totalCount: totalDonations,
          pendingCount: pendingDonations,
          verifiedAmount: verifiedDonationsAgg._sum.amount ?? 0,
          totalDistributed: totalDistributedAgg._sum.amountDistributed ?? 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

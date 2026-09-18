import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/db.js";

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

export const getDashboardStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [totalInquiries, newInquiries, totalBookings, pendingBookings] = await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: "NEW" } }),
      prisma.discoveryBooking.count(),
      prisma.discoveryBooking.count({ where: { status: "PENDING" } })
    ]);

    res.json({
      success: true,
      stats: {
        totalInquiries,
        newInquiries,
        totalBookings,
        pendingBookings
      }
    });
  } catch (error) {
    next(error);
  }
};

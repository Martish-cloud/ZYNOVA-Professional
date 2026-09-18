import { Router } from "express";
import {
  getInquiries,
  updateInquiryStatus,
  getBookings,
  updateBookingStatus,
  getDonations,
  updateDonationStatus,
  getDistributions,
  createDistribution,
  updateDistribution,
  getDashboardStats
} from "../controllers/adminController.js";
import { requireAdminAuth } from "../middleware/auth.js";

const router = Router();

// Protect all admin routes with requireAdminAuth middleware
router.use(requireAdminAuth);

router.get("/stats", getDashboardStats);

// Inquiries
router.get("/inquiries", getInquiries);
router.patch("/inquiries/:id", updateInquiryStatus);

// Bookings
router.get("/bookings", getBookings);
router.patch("/bookings/:id", updateBookingStatus);

// Donations
router.get("/donations", getDonations);
router.patch("/donations/:id/status", updateDonationStatus);

// Monthly Distributions & Transparency Publishing
router.get("/distributions", getDistributions);
router.post("/distributions", createDistribution);
router.patch("/distributions/:id", updateDistribution);

export default router;

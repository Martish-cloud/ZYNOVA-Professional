import { Router } from "express";
import {
  getInquiries,
  updateInquiryStatus,
  getBookings,
  updateBookingStatus,
  getDashboardStats
} from "../controllers/adminController.js";
import { requireAdminAuth } from "../middleware/auth.js";

const router = Router();

// Protect all admin routes with requireAdminAuth middleware
router.use(requireAdminAuth);

router.get("/stats", getDashboardStats);
router.get("/inquiries", getInquiries);
router.patch("/inquiries/:id", updateInquiryStatus);
router.get("/bookings", getBookings);
router.patch("/bookings/:id", updateBookingStatus);

export default router;

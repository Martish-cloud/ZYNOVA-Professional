import { Router } from "express";
import {
  submitDonation,
  getTransparencyStats,
  createOrder,
  verifyPayment,
  handleWebhook
} from "../controllers/donationController.js";
import { submissionRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Public route to submit contribution confirmation for manual reconciliation
router.post("/", submissionRateLimiter, submitDonation);

// Public route to get live transparency statistics
router.get("/transparency", getTransparencyStats);

// Online contribution order creation & cryptographic verification
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

// Payment gateway webhook
router.post("/webhook", handleWebhook);

export default router;

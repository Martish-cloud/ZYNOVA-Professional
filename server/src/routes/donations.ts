import { Router } from "express";
import { submitDonation, getTransparencyStats } from "../controllers/donationController.js";
import { submissionRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Public route to submit contribution confirmation for manual reconciliation
router.post("/", submissionRateLimiter, submitDonation);

// Public route to get live transparency statistics
router.get("/transparency", getTransparencyStats);

export default router;

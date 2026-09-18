import { Router } from "express";
import { handleBookingSubmit } from "../controllers/bookingController.js";
import { submissionRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submissionRateLimiter, handleBookingSubmit);

export default router;

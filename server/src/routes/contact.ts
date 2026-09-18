import { Router } from "express";
import { handleContactSubmit } from "../controllers/contactController.js";
import { submissionRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submissionRateLimiter, handleContactSubmit);

export default router;

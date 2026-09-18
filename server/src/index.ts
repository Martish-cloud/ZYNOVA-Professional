import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ENV } from "./config/env.js";
import healthRouter from "./routes/health.js";
import contactRouter from "./routes/contact.js";
import bookingsRouter from "./routes/bookings.js";
import adminRouter from "./routes/admin.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// Body Parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Root route
app.get("/", (_req, res) => {
  res.json({
    name: "ZYNOVA API Service",
    version: "1.0.0",
    status: "active",
    endpoints: {
      health: "/api/health",
      contact: "POST /api/contact",
      bookings: "POST /api/bookings",
      admin: "/api/admin (Protected)"
    }
  });
});

// API Routes
app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/admin", adminRouter);

// Centralized error handler
app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 ZYNOVA Backend Server running on port ${PORT}`);
  console.log(`📍 Environment: ${ENV.NODE_ENV}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================\n`);
});

export default app;

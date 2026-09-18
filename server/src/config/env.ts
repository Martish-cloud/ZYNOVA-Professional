import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || "zynova_admin_secret_dev_key",
  EMAIL: {
    SERVICE: process.env.EMAIL_SERVICE || "",
    HOST: process.env.EMAIL_HOST || "",
    PORT: parseInt(process.env.EMAIL_PORT || "587", 10),
    USER: process.env.EMAIL_USER || "",
    PASS: process.env.EMAIL_PASS || "",
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || "team.zynova@gmail.com"
  }
};

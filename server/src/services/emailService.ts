import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

interface EmailPayload {
  to?: string;
  subject: string;
  text: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (ENV.EMAIL.USER && ENV.EMAIL.PASS) {
      if (ENV.EMAIL.SERVICE) {
        this.transporter = nodemailer.createTransport({
          service: ENV.EMAIL.SERVICE,
          auth: {
            user: ENV.EMAIL.USER,
            pass: ENV.EMAIL.PASS
          }
        });
      } else if (ENV.EMAIL.HOST) {
        this.transporter = nodemailer.createTransport({
          host: ENV.EMAIL.HOST,
          port: ENV.EMAIL.PORT,
          secure: ENV.EMAIL.PORT === 465,
          auth: {
            user: ENV.EMAIL.USER,
            pass: ENV.EMAIL.PASS
          }
        });
      }
    }
  }

  async sendNotification(payload: EmailPayload): Promise<boolean> {
    const recipient = payload.to || ENV.EMAIL.NOTIFICATION_EMAIL;

    if (!this.transporter) {
      console.log("\n================ [EMAIL NOTIFICATION PREVIEW] ================");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${payload.subject}`);
      console.log("---------------------------------------------------------------");
      console.log(payload.text);
      console.log("===============================================================\n");
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"ZYNOVA Platform" <${ENV.EMAIL.USER}>`,
        to: recipient,
        subject: payload.subject,
        text: payload.text,
        html: payload.html
      });
      return true;
    } catch (error) {
      console.error("[EmailService] Error dispatching email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();

import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().max(30, "Phone number is too long").optional().default(""),
  company: z.string().trim().max(100, "Company name is too long").optional().default(""),
  serviceRequired: z.string().trim().min(1, "Service required is mandatory"),
  budgetRange: z.string().trim().optional().default("Not specified"),
  message: z.string().trim().min(5, "Message must be at least 5 characters long").max(5000, "Message is too long")
});

export const discoveryBookingSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  company: z.string().trim().max(100, "Company name is too long").optional().default(""),
  service: z.string().trim().min(1, "Service domain is required"),
  preferredDate: z.string().trim().optional().default("Earliest Available"),
  preferredTime: z.string().trim().optional().default("Flexible"),
  message: z.string().trim().min(5, "Project brief must be at least 5 characters long").max(5000, "Brief is too long")
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type DiscoveryBookingInput = z.infer<typeof discoveryBookingSchema>;

export const donationSchema = z.object({
  donorName: z.string().trim().max(100, "Name is too long").optional().default("Anonymous"),
  donorEmail: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  amount: z.coerce.number().min(5, "Minimum contribution is ₹5").max(500, "Maximum contribution is ₹500"),
  currency: z.string().trim().default("INR"),
  transactionReference: z.string().trim().min(3, "Transaction / UTR reference ID is required").max(100, "Reference is too long"),
  paymentMethod: z.string().trim().default("UPI"),
  anonymous: z.boolean().optional().default(false)
});

export const updateDonationStatusSchema = z.object({
  paymentStatus: z.enum(["pending", "verified", "failed", "refunded"])
});

export const monthlyDistributionSchema = z.object({
  month: z.string().trim().min(1, "Month identifier is required"),
  totalVerifiedContributions: z.coerce.number().min(0).default(0),
  processingFees: z.coerce.number().min(0).default(0),
  refunds: z.coerce.number().min(0).default(0),
  amountAvailable: z.coerce.number().min(0).default(0),
  amountDistributed: z.coerce.number().min(0).default(0),
  recipientName: z.string().trim().optional(),
  recipientDetails: z.string().trim().optional(),
  cause: z.string().trim().optional(),
  distributionDate: z.string().datetime().optional().nullable(),
  documentationURL: z.string().trim().url("Invalid documentation URL").optional().or(z.literal("")),
  published: z.boolean().default(false)
});

export type DonationInput = z.infer<typeof donationSchema>;
export type MonthlyDistributionInput = z.infer<typeof monthlyDistributionSchema>;

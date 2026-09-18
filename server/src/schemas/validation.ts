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

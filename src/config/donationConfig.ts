export interface DonationConfig {
  donationEnabled: boolean;
  minimumDonation: number;
  maximumDonation: number;
  currency: string;
  currencySymbol: string;
  upiPaymentURL: string;
  charityRecipient: string;
  showcaseImage: string;
  qrCodeImage: string;
  presetAmounts: number[];
  razorpayKeyId?: string;
  copy: {
    sectionTag: string;
    headline: string;
    subheadline: string;
    description: string;
    disclaimer: string;
    scanInstruction: string;
    reconciliationNotice: string;
    postSubmissionNote: string;
  };
  api: {
    submitDonation: string;
    transparency: string;
    createOrder: string;
    verifyPayment: string;
    webhook: string;
  };
}

export const donationConfig: DonationConfig = {
  donationEnabled: true,
  minimumDonation: 5,
  maximumDonation: 500,
  currency: "INR",
  currencySymbol: "₹",
  // The supplied QR code image is the primary payment mechanism.
  upiPaymentURL: "",
  charityRecipient: "To Be Announced",
  showcaseImage: "/assets/zynova-charity-showcase.webp",
  qrCodeImage: "/assets/zynova-charity-upi-qr.png",
  presetAmounts: [5, 10, 25, 50, 100, 500],
  razorpayKeyId: (import.meta as unknown as { env?: Record<string, string> })?.env?.VITE_RAZORPAY_KEY_ID || "",
  copy: {
    sectionTag: "ZYNOVA GIVES BACK",
    headline: "Small Donation. Big Impact.",
    subheadline: "Every ₹5 Can Create a Difference.",
    description:
      "Every contribution, big or small, can help support charitable initiatives. Zynova -Solutions Gives Back is our initiative to collect voluntary contributions and allocate the available donation pool toward charitable causes on a monthly cycle.",
    disclaimer:
      "Zynova -Solutions Gives Back is a voluntary community-support initiative. Contributions are subject to applicable payment, charitable and regulatory requirements. Monthly distribution information will be published after verification and completion of each distribution cycle.",
    scanInstruction: "Scan this QR code using any supported UPI app, or pay instantly online.",
    reconciliationNotice:
      "Providing your transaction/reference ID helps us reconcile contributions. Please do not enter your UPI PIN, OTP, password or other banking credentials.",
    postSubmissionNote:
      "Thank you for your contribution. Your payment will be verified before it is included in the published donation records."
  },
  api: {
    submitDonation: "/api/donations",
    transparency: "/api/donations/transparency",
    createOrder: "/api/donations/create-order",
    verifyPayment: "/api/donations/verify",
    webhook: "/api/donations/webhook"
  }
};

export interface DonationConfig {
  donationEnabled: boolean;
  minimumDonation: number;
  currency: string;
  currencySymbol: string;
  upiPaymentURL: string;
  charityRecipient: string;
  showcaseImage: string;
  qrCodeImage: string;
  presetAmounts: number[];
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
  };
}

export const donationConfig: DonationConfig = {
  donationEnabled: true,
  minimumDonation: 5,
  currency: "INR",
  currencySymbol: "₹",
  // IMPORTANT: Do NOT invent a UPI payment URL. Empty string by default.
  // The supplied QR code image is the primary payment mechanism.
  upiPaymentURL: "",
  charityRecipient: "To Be Announced",
  showcaseImage: "/assets/zynova-charity-showcase.png",
  qrCodeImage: "/assets/zynova-charity-upi-qr.png",
  presetAmounts: [5, 10, 25, 50, 100, 500, 1000],
  copy: {
    sectionTag: "ZYNOVA GIVES BACK",
    headline: "Small Donation. Big Impact.",
    subheadline: "Every ₹5 Can Create a Difference.",
    description:
      "Every contribution, big or small, can help support charitable initiatives. Zynova Gives Back is our initiative to collect voluntary contributions and allocate the available donation pool toward charitable causes on a monthly cycle.",
    disclaimer:
      "Zynova Gives Back is a voluntary community-support initiative. Contributions are subject to applicable payment, charitable and regulatory requirements. Monthly distribution information will be published after verification and completion of each distribution cycle.",
    scanInstruction: "Scan this QR code using any supported UPI app.",
    reconciliationNotice:
      "Providing your transaction/reference ID helps us reconcile contributions. Please do not enter your UPI PIN, OTP, password or other banking credentials.",
    postSubmissionNote:
      "Thank you for your contribution. Your payment will be verified before it is included in the published donation records."
  },
  api: {
    submitDonation: "/api/donations",
    transparency: "/api/donations/transparency"
  }
};

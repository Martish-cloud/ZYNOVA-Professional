export interface DonationConfig {
  donationEnabled: boolean;
  minimumDonation: number;
  maximumDonation: number;
  currency: string;
  currencySymbol: string;
  upiId: string;
  businessName: string;
  contactEmail: string;
  charityRecipient: string;
  showcaseImage: string;
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
  maximumDonation: 50000,
  currency: "INR",
  currencySymbol: "₹",
  upiId: "askfor.amithalder@okaxis",
  businessName: "Zynova Digital Professionals",
  contactEmail: "team.zynova@gmail.com",
  charityRecipient: "Sonu Sood Foundation",
  showcaseImage: "/assets/zynova-charity-showcase.webp",
  presetAmounts: [5, 25, 50, 100, 500],
  copy: {
    sectionTag: "ZYNOVA GIVES BACK",
    headline: "Small Donation. Big Impact.",
    subheadline: "Direct UPI Contribution Initiative",
    description:
      "Every contribution, big or small, can help support charitable initiatives. Zynova Gives Back is our community initiative to collect voluntary contributions directly via UPI and allocate the available donation pool toward verified charitable causes on a monthly cycle.",
    disclaimer:
      "Zynova Gives Back is a voluntary community-support initiative. Contributions are made directly via peer-to-peer UPI. Monthly distribution information will be published following review of each cycle.",
    scanInstruction: "Scan this dynamic QR code using Google Pay, PhonePe, Paytm, or any UPI app.",
    reconciliationNotice:
      "Optionally provide your transaction or UTR reference ID to help us attribute your contribution in our monthly transparency log. Never share banking PINs, OTPs, or passwords.",
    postSubmissionNote:
      "Thank you for your contribution. Your reference has been logged for monthly transparency reporting."
  },
  api: {
    submitDonation: "/api/donations",
    transparency: "/api/donations/transparency"
  }
};

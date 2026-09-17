import { siteConfig } from "../config/siteConfig";

export interface FreelancePlatform {
  id: string;
  name: string;
  configKey: keyof typeof siteConfig.freelancePlatforms;
  brandColor: string;
}

export const platformsData: FreelancePlatform[] = [
  {
    id: "upwork",
    name: "Upwork",
    configKey: "upwork",
    brandColor: "#14A800"
  },
  {
    id: "fiverr",
    name: "Fiverr",
    configKey: "fiverr",
    brandColor: "#1DBF73"
  },
  {
    id: "freelancer",
    name: "Freelancer",
    configKey: "freelancer",
    brandColor: "#29B2FE"
  },
  {
    id: "peoplePerHour",
    name: "PeoplePerHour",
    configKey: "peoplePerHour",
    brandColor: "#FF6600"
  },
  {
    id: "truelancer",
    name: "Truelancer",
    configKey: "truelancer",
    brandColor: "#2B7DE9"
  }
];

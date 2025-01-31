import NormalTicketComponent from "../_components/client/tickets/normal-ticket";
import { Metadata } from "next";
import { BaseWebsiteLink } from "../base";

export const metadata: Metadata = {
  title: "Nile Guides - Report an Issue or Problem",
  description:
    "Facing an issue on Nile Guides? Create a support ticket to report your problem and get assistance from our team.",
  keywords: [
    "Nile Guides",
    "support ticket",
    "report issue",
    "help center",
    "customer support",
    "problem resolution",
  ],
  openGraph: {
    title: "Nile Guides - Report an Issue or Problem",
    description:
      "Facing an issue on Nile Guides? Create a support ticket to report your problem and get assistance from our team.",
    url: BaseWebsiteLink + "/make-ticket",
    siteName: "Nile Guides",
    images: [
      {
        url: "/logo.ico",
        width: 800,
        height: 600,
        alt: "Nile Guides - Report an Issue",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Guides - Report an Issue or Problem",
    description:
      "Facing an issue on Nile Guides? Create a support ticket to report your problem and get assistance from our team.",
    images: ["/logo.ico"],
  },
};
export default function MakeTicket() {
  return <NormalTicketComponent />;
}

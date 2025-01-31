import ChangeRoleTicket from "@/app/_components/client/tickets/change-role-ticket";
import { BaseWebsiteLink } from "@/app/base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Guides - Become a Worker and Offer Tours",
  description:
    "Join Nile Guides as a worker and start offering your tours at Philae Temple. Fill out the form to change your role from client to worker.",
  keywords: [
    "Nile Guides",
    "become a worker",
    "offer tours",
    "Philae Temple",
    "tour guide",
    "Egypt tourism",
  ],
  openGraph: {
    title: "Nile Guides - Become a Worker and Offer Tours",
    description:
      "Join Nile Guides as a worker and start offering your tours at Philae Temple. Fill out the form to change your role from client to worker.",
    url: BaseWebsiteLink + "/make-ticket/change-role",
    siteName: "Nile Guides",
    images: [
      {
        url: "/logo.ico",
        width: 800,
        height: 600,
        alt: "Nile Guides - Become a Worker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Guides - Become a Worker and Offer Tours",
    description:
      "Join Nile Guides as a worker and start offering your tours at Philae Temple. Fill out the form to change your role from client to worker.",
    images: ["/logo.ico"],
  },
};
export default function ChangeRole() {
  return <ChangeRoleTicket />;
}

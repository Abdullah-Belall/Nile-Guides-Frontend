import ForgotPasswordComponent from "@/app/_components/client/Auth/Login/forgot-password";
import { BaseWebsiteLink } from "@/app/base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Guides - Forgot Password",
  description:
    "Forgot your password? Reset it easily on Nile Guides to regain access to your account and continue managing your tours and bookings.",
  keywords: [
    "Nile Guides",
    "forgot password",
    "reset password",
    "account recovery",
    "tours",
    "Philae Temple",
    "Egypt tourism",
  ],
  openGraph: {
    title: "Nile Guides - Forgot Password",
    description:
      "Forgot your password? Reset it easily on Nile Guides to regain access to your account and continue managing your tours and bookings.",
    url: BaseWebsiteLink + "/forgot-password",
    siteName: "Nile Guides",
    images: [
      {
        url: "/logo.ico",
        width: 800,
        height: 600,
        alt: "Nile Guides - Forgot Password",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Guides - Forgot Password",
    description:
      "Forgot your password? Reset it easily on Nile Guides to regain access to your account and continue managing your tours and bookings.",
    images: ["/logo.ico"],
  },
};
export default function ForgotPassword() {
  return <ForgotPasswordComponent />;
}

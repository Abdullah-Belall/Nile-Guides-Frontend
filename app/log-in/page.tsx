import LoginComponent from "../_components/client/Auth/Login/login";
import { Metadata } from "next";
import { BaseWebsiteLink } from "../base";

export const metadata: Metadata = {
  title: "Nile Guides - Login to Your Account",
  description:
    "Login to your Nile Guides account to access your dashboard, manage your bookings, or start offering tours as a worker.",
  keywords: [
    "Nile Guides",
    "login",
    "sign in",
    "account",
    "tours",
    "Philae Temple",
    "Egypt tourism",
  ],
  openGraph: {
    title: "Nile Guides - Login to Your Account",
    description:
      "Login to your Nile Guides account to access your dashboard, manage your bookings, or start offering tours as a worker.",
    url: BaseWebsiteLink + "/log-in",
    siteName: "Nile Guides",
    images: [
      {
        url: "/logo.ico",
        width: 800,
        height: 600,
        alt: "Nile Guides - Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Guides - Login to Your Account",
    description:
      "Login to your Nile Guides account to access your dashboard, manage your bookings, or start offering tours as a worker.",
    images: ["/logo.ico"],
  },
};
export default function Login() {
  return <LoginComponent />;
}

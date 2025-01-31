import { Metadata } from "next";
import SignUpComponent from "../_components/client/Auth/Signup/signup";
import { BaseWebsiteLink } from "../base";

export const metadata: Metadata = {
  title: "Sign Up | Nile Guides",
  description:
    "Join Nile Guides today! Sign up as a worker to offer your services or as a client to book amazing tours in Egypt.",
  keywords: [
    "sign up",
    "Nile Guides registration",
    "join Nile Guides",
    "worker sign up",
    "client sign up",
    "Egypt tours",
  ],
  openGraph: {
    title: "Sign Up | Nile Guides",
    description:
      "Join Nile Guides today! Sign up as a worker to offer your services or as a client to book amazing tours in Egypt.",
    type: "website",
    url: BaseWebsiteLink + "/sign-up",
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
        alt: "Sign Up - Nile Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Nile Guides",
    description:
      "Join Nile Guides today! Sign up as a worker to offer your services or as a client to book amazing tours in Egypt.",
    images: ["/logo.ico"],
  },
};
export default function SignUp() {
  return <SignUpComponent />;
}

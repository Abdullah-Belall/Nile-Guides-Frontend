import PostForm from "@/app/_components/templates/post-form";
import { BaseWebsiteLink } from "@/app/base";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create New Post | Nile Guides",
  description:
    "Create a new post on Nile Guides to offer your tours and services. Add details, images, and descriptions to attract clients.",
  keywords: ["new post", "create post", "Nile Guides post", "offer tours", "worker dashboard"],
  openGraph: {
    title: "Create New Post | Nile Guides",
    description:
      "Create a new post on Nile Guides to offer your tours and services. Add details, images, and descriptions to attract clients.",
    type: "website",
    url: BaseWebsiteLink + "/new-post", // Replace with your actual domain
    images: [
      {
        url: "/logo.ico", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Create New Post - Nile Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create New Post | Nile Guides",
    description:
      "Create a new post on Nile Guides to offer your tours and services. Add details, images, and descriptions to attract clients.",
    images: ["/logo.ico"], // Replace with your actual Twitter image URL
  },
};
export default function NewBusiness() {
  return <PostForm type={"Post"} />;
}

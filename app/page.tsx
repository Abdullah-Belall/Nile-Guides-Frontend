import { Suspense } from "react";
import Posts from "./_components/server/posts";
import PostSkeleton from "./_components/skeletons/post-skeleton";
import Footer from "./_components/server/footer";
import FiltersOptions from "./_components/client/filter-options-home";

import { Metadata } from "next";
import { BaseWebsiteLink } from "./base";

export const metadata: Metadata = {
  title: "Nile Guides | Discover the Best Tourist Tours in Egypt",
  description:
    "Explore the best tourist tours in Egypt with Nile Guides. Browse posts from workers and book your favorite tours in Philae Temple and other tourist destinations.",
  keywords: [
    "tourist tours",
    "Philae Temple",
    "tour guide",
    "book tours",
    "Egypt tourism",
    "Nile Guides",
  ],
  openGraph: {
    title: "Nile Guides | Discover the Best Tourist Tours in Egypt",
    description:
      "Explore the best tourist tours in Egypt with Nile Guides. Browse posts from workers and book your favorite tours in Philae Temple and other tourist destinations.",
    type: "website",
    url: BaseWebsiteLink,
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
        alt: "Nile Guides - Discover the Best Tours in Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Guides | Discover the Best Tourist Tours in Egypt",
    description:
      "Explore the best tourist tours in Egypt with Nile Guides. Browse posts from workers and book your favorite tours in Philae Temple and other tourist destinations.",
    images: ["/logo.ico"],
  },
};

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchParams_ = await searchParams;
  return (
    <>
      <div className="flex min-h-[calc(100dvh-94px)] flex-col w-full px-mainX">
        <FiltersOptions />
        <Suspense
          fallback={
            <div className="flex flex-wrap w-full gap-2 animate-pulse">
              <PostSkeleton />
            </div>
          }
        >
          <Posts searchParams={searchParams_} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

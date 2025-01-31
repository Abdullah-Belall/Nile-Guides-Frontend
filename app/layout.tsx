import NavBar from "./_components/client/nav-bar";
import { AuthProvider } from "./authContext";
import "./globals.css";
import { poppins } from "./ui/fonts";
import DynamicNavBarPart from "./_components/server/dynamic-navbar-part";
import { BaseWebsiteLink } from "./base";

export const metadata = {
  title: "Nile Guides - Explore & Book Tours",
  description: "Discover expert tour guides and book amazing travel experiences with Nile Guides.",
  openGraph: {
    title: "Nile Guides - Explore & Book Tours",
    description: "Find professional tour guides and unique experiences with Nile Guides.",
    url: BaseWebsiteLink,
    siteName: "Nile Guides",
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
        alt: "Nile Guides Cover Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${poppins.className} text-mainlight bg-anotherLight mt-[94px] antialiased`}
        >
          <NavBar>
            <DynamicNavBarPart />
          </NavBar>
          <main className="w-full min-h-[calc(100dvh-94px)] flex flex-col jutify-center items-center">
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}

import "./globals.css";
import "./responsive.css";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/context/CategoryContext";
import { getAllCategories } from "@/lib/api/categories";
import { getSocialLinks } from "@/lib/api/socialLinks";
import { getContactDetails } from "@/lib/api/contactDetails";
import ProgressBar from "@/components/ProgressBar";
import { Suspense } from 'react';
import ExtraMetaTags from "@/components/ExtraMetaTags";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "MPG Stone",
  description: "Informative website for stone products",
  robots: "noindex, nofollow",
  authors: [{ name: "mpgstone.com" }],
};

export default async function RootLayout({ children }) {
  const categories = await getAllCategories();
  const socialLinks = await getSocialLinks();
  const contactDetails = await getContactDetails();
  return (
    <html lang="en-US">
      <head>
        <ExtraMetaTags publisher={" "}/>
      </head>
      <body
        className={`${montserrat.className} flex flex-col min-h-screen relative`}
      >
        <CategoryProvider categories={categories}>
          <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
          <Header contactDetails={contactDetails} />
          <main>{children}</main>
          <Footer
            socialLinks={socialLinks.social_media_links}
            contactDetails={contactDetails}
          />
        </CategoryProvider>
      </body>
    </html>
  );
}

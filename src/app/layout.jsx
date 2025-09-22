import "./globals.css";
import "./responsive.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/context/CategoryContext";
import { getAllCategories } from "@/lib/api/categories";
import { getSocialLinks } from "@/lib/api/socialLinks";
import { getContactDetails } from "@/lib/api/contactDetails";
import ProgressBar from "@/components/ProgressBar";
import { Suspense } from "react";
import Script from "next/script";
import ExtraMetaTags from "@/components/ExtraMetaTags";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "MPG Stone",
  description: "Informative website for stone products",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  authors: [{ name: "mpgstone.com" }],
};

export default async function RootLayout({ children }) {
  const categories = await getAllCategories();
  const socialLinks = await getSocialLinks();
  const contactDetails = await getContactDetails();
  return (
    <html lang="en-US">
      <head>
        <ExtraMetaTags publisher={" "} />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link href="https://mpgstone.com/" hreflang="x-default" rel="alternate" />
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/677ba3f2af5bfec1dbe741e3/1igtfgrm4';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        {/* Google Analytics Script */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-E1JP28VMB4"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E1JP28VMB4');
    `,
          }}
        />
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

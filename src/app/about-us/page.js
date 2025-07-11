import AboutUs from "@/components/about-us/AboutUs";
import AboutUsMid from "@/components/about-us/AboutUsMid";
import MiniBanner from "@/components/MiniBanner";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getPageMetaData } from "@/lib/api/pagesMetaData";
import { getAllProducts } from "@/lib/api/products";

export async function generateMetadata() {
    const pageMetaData = await getPageMetaData("about");

      return {
        title: pageMetaData.meta_title,
        description: pageMetaData.meta_description,
        keywords: pageMetaData.meta_keywords,
        openGraph: {
          title: pageMetaData.og_title || pageMetaData.meta_title,
          description: pageMetaData.og_descriptions || pageMetaData.meta_description,
          url: pageMetaData.canonical_url,
          images: pageMetaData.meta_image,
          type: "website",
          locale: "en_US",
          siteName: "MPG Stone"
        },
        twitter: {
          title: pageMetaData.twitter_title || pageMetaData.meta_title,
          description: pageMetaData.twitter_description || pageMetaData.meta_description,
          images: pageMetaData.meta_image
        },
        alternates: {
          canonical: pageMetaData.canonical_url || "",
        },
        robots: pageMetaData.robots_tag,
      };
}

export default async function aboutUsPage() {
    const allProducts = await getAllProducts("all", "all-category");
    const randomProducts = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);
    return (
        <>
            <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"About Us"} />
            <AboutUs />
            <AboutUsMid />
            <RelatedProducts relatedProducts={randomProducts} isAboutUsPage={true}/>
        </>
    )
}
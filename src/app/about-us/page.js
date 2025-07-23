import AboutUs from "@/components/about-us/AboutUs";
import AboutUsMid from "@/components/about-us/AboutUsMid";
import MiniBanner from "@/components/MiniBanner";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getPageMetaData } from "@/lib/api/pagesMetaData";
import { getAllProducts } from "@/lib/api/products";
const getAboutPage = async () => {
  const res = await fetch("https://backend.mpgstone.com/api/about/", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};


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
  const data = await getAboutPage();
  console.log(data)

  return (
    <>
      <MiniBanner bg_img={"/media/about_us_banner.webp"} pageName={"About Us"} />
      <AboutUs title={data.title} description={{des1: data.description1, des2 : data.description2}} image={data.image_url} />
      <AboutUsMid cardData={data.sections} />
      <RelatedProducts relatedProducts={randomProducts} isAboutUsPage={true} />
    </>
  )
}
import MiniBanner from "@/components/MiniBanner";
import CataloguesGrid from "@/components/product-catalogue/CataloguesGrid";
import { getPageMetaData } from "@/lib/api/pagesMetaData";
import { getProductCatalogues } from "@/lib/api/productCatalogue";

export async function generateMetadata() {
    const pageMetaData = await getPageMetaData("catalogue");

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

export default async function ProductCataloguePage(){
    const productCatalogues = await getProductCatalogues();

    return (
        <>
        <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"Product Catalogue"} />
        <CataloguesGrid catalogues={productCatalogues}/>
        </>
    )
}
import AboutUs from "@/components/about-us/AboutUs";
import AboutUsMid from "@/components/about-us/AboutUsMid";
import MiniBanner from "@/components/MiniBanner";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getAllProducts } from "@/lib/api/products";

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
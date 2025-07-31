
import MiniBanner from "@/components/MiniBanner";
import CategoriesGrid from "@/components/category/CategoiresGrid";

export async function generateMetadata() {
      return {
        alternates: {
            canonical: "https://mpgstone.com/product-category/",
        },
        robots: "index, follow",
      };
}

export default function AllCategoriesPage() {
    return (
        <>
            <MiniBanner bg_img={"/media/product_category_banner.webp"} pageName={"Product Category"} />
            <CategoriesGrid/>
            
        </>
    );
}

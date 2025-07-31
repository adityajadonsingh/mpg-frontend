
import MiniBanner from "@/components/MiniBanner";
import CategoriesGrid from "@/components/category/CategoiresGrid";
import { getPageMetaData } from "@/lib/api/pagesMetaData";

export async function generateMetadata() {
      return {
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

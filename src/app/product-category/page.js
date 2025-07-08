
import MiniBanner from "@/components/MiniBanner";
import CategoriesGrid from "@/components/category/CategoiresGrid";

export default function AllCategoriesPage() {
    return (
        <>
            <MiniBanner bg_img={"/media/all-category.png"} pageName={"Product Category"} />
            <CategoriesGrid/>
            
        </>
    );
}

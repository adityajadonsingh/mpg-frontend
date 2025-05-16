
import Breadcrum from "@/components/Breadcrum";
import PageBanner from "@/components/PageBanner";
import CategoriesGrid from "@/components/category/CategoiresGrid";

const slugPath = [
    {
        slug_name : "Product Categories",
        slug : "/product-category"
    }
]
export default function AllCategoriesPage() {
    return (
        <>
            <PageBanner pageName={"Product Categories"} imgUrl={"/media/all-category.png"} short_content={""} />
            <Breadcrum path_arr={slugPath}/>
            <CategoriesGrid/>
            
        </>
    );
}

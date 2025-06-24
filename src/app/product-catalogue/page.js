import MiniBanner from "@/components/MiniBanner";
import CataloguesGrid from "@/components/product-catalogue/CataloguesGrid";
import { getProductCatalogues } from "@/lib/api/productCatalogue";

export default async function ProductCataloguePage(){
    const productCatalogues = await getProductCatalogues();

    return (
        <>
        <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"Product Catalogue"} />
        <CataloguesGrid catalogues={productCatalogues}/>
        </>
    )
}
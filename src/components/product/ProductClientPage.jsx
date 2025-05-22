import ProductTop from "@/components/product/ProductTop";
import ProductMid from "@/components/product/ProductMid";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductClientPage({ product, relatedProducts }) {
console.log(relatedProducts.length)
  const slugPath = [
    {
      slug_name: "Product Categories",
      slug: "/product-category",
    },
    {
      slug_name: product.category,
      slug: `/product-category/${product.category
        .toLowerCase()
        .replace(" ", "-")}`,
    },
    {
      slug_name: product.name,
      slug: `/product-category/${product.slug}`,
    },
  ];

  return (
    <>
      <ProductTop
        imgUrl={product.image}
        productName={product.name}
        productDescription={product.descriptions}
        path_arr={slugPath}
      />
      
      <ProductMid accordionData={product.attributes} product_id={product.id}/>
      <RelatedProducts relatedProducts={relatedProducts}/>
    </>
  );
}

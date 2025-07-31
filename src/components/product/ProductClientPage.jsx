import ProductTop from "@/components/product/ProductTop";
import ProductMid from "@/components/product/ProductMid";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductClientPage({ product, relatedProducts }) {
  const mainImage = {
    image: product.image,
    alt_text: product.alt_text,
  };
  const galleryImages = [mainImage, ...product.gallery_images];
  const slugPath = [
    {
      slug_name: "Product Category",
      slug: "/product-category/",
    },
    {
      slug_name: product.category,
      slug: `/product-category/${product.category
        .toLowerCase()
        .replace(/ /g, "-")}`,
    },
    {
      slug_name: product.name,
      slug: `/product-category/${product.category
        .toLowerCase()
        .replace(/ /g, "-")}/${product.slug}/`,
    },
  ];
  return (
    <>
      <ProductTop
        gallery={galleryImages}
        productName={product.name}
        productDescription={product.descriptions}
        path_arr={slugPath}
      />

      <ProductMid accordionData={product.attributes} product_id={product.id} />
      {relatedProducts.length !== 0 ? (
        <RelatedProducts relatedProducts={relatedProducts} />
      ) : null}
    </>
  );
}

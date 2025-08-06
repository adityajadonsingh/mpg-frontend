import ProductClientPage from "@/components/product/ProductClientPage";
import SchemaInjector from "@/components/SchemaInjector";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

// ✅ Static paths for SSG
export async function generateStaticParams() {
  const allProducts = await getAllProducts("all", "all-category");

  return allProducts.map((product) => {
    const categorySlug = product.category.replace(/ /g, "-").toLowerCase();
    return {
      category: categorySlug,
      product: product.slug,
    };
  });
}

// ✅ Optional revalidation interval (ISR)
export const revalidate = 60;

// ✅ Product Detail Page Component
export default async function ProductDetail({ params }) {
  const { category, product } = await params;

  const productDetails = await getAllProducts(product, null);

  if (!productDetails || productDetails.length === 0) {
    return notFound();
  }

  const productData = productDetails[0];

  const actualCategorySlug = productData.category.replace(/ /g, "-").toLowerCase();

  if (category !== actualCategorySlug) {
    return notFound();
  }

  const fetchRelatedProducts = await getAllProducts("10", productData.category);
  const relatedProducts = fetchRelatedProducts.filter(
    (prod) => prod.name !== productData.name
  );
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mpgstone.com/"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Product Category",
      "item": "https://mpgstone.com/product-category/"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productData.category,
      "item": `https://mpgstone.com/product-category/${productData.category.replace(/ /g, "-").toLowerCase()}/`
    }, {
      "@type": "ListItem",
      "position": 4,
      "name": productData.name,
      "item": `https://mpgstone.com/product-category/${productData.category.replace(/ /g, "-").toLowerCase()}/${productData.slug}/`
    }]
  }
  const reviewsSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData.name,
    "image": productData.image,
    "description": productData.meta_description,
    "brand": {
      "@type": "Brand",
      "name": "MPG Stone"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "10"
    }
  }
  const normalizeSchema = (schema) =>
    schema?.schema_json ? schema : { schema_json: schema };
  const rawSchemas = [
    breadcrumbSchema,
    reviewsSchema,
    ...(Array.isArray(productData.schema_markup) ? productData.schema_markup : [])
  ];

  const safeSchemas = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      })
    ).values()
  );

  return (
    <>
      <ProductClientPage
        product={productData}
        relatedProducts={relatedProducts}
      />
      <SchemaInjector schemas={safeSchemas} />
    </>

  );
}

export async function generateMetadata({ params }) {
  const { category, product } = await params;
  const [productDetails] = await getAllProducts(product, null);

  // ❗ If product not found, return minimal metadata
  if (!productDetails) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: productDetails.meta_title,
    description: productDetails.meta_description,
    keywords: productDetails.meta_keywords,
    openGraph: {
      title: productDetails.og_title || productDetails.meta_title,
      description: productDetails.og_descriptions || productDetails.meta_description,
      url: productDetails.canonical_url,
      images: productDetails.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: productDetails.twitter_title || productDetails.meta_title,
      description: productDetails.twitter_description || productDetails.meta_description,
      images: productDetails.meta_image,
    },
    alternates: {
      canonical: productDetails.canonical_url || "",
    },
    robots: productDetails.robots_tag,
  };
}

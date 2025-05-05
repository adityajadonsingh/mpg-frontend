// app/[category]/[product]/page.js
export default function ProductDetail({ params }) {
    const { category, product } = params;
  
    // You can fetch product detail from API using product slug
    return (
      <div>
        <h2 className="text-2xl font-bold capitalize">{product.replaceAll("-", " ")}</h2>
        <p>Category: {category}</p>
        {/* Product description, images, etc. */}
      </div>
    );
  }
  
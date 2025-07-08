import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/api/products";

export async function GET() {
  try {
    const allProducts = await getAllProducts("all", "all-category");

    const minimalProducts = allProducts.map((prod) => ({
      name: prod.name,
      slug: prod.slug,
      category_slug: prod.category.toLowerCase().replace(/\s+/g, "-"), // adjust if needed
    }));

    return NextResponse.json(minimalProducts);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export const getProductReview = async (product_id) => {
  const res = await fetch(`https://backend.mpgstone.com/api/reviews/?product_id=${product_id}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product reviews");
  }

  return res.json();
};

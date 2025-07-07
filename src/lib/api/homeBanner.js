export const getAllBanners = async () => {
    console.log(`${process.env.BACKEND_INTERNAL_URL}`)
  const res = await fetch(`${process.env.BACKEND_INTERNAL_URL}/api/banners/`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

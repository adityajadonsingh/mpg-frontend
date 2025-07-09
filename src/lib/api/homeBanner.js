export const getAllBanners = async () => {
  const res = await fetch("https://backend.mpgstone.com/api/banners/", {
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

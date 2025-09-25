export const getAllCategories = async () => {
  const res = await fetch("https://backend.mpgstone.com/api/categories/", {
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

export const getHomeCategoriesOnly = async () => {
  const rawCategories = await getAllCategories();

  const allowedCategories = [
    "Cobblestone paving",
    "Granite Slabs",
    "Quartz Slabs",
    "Porcelain Slabs",
    "Outdoor Porcelain Tiles",
  ];

  return rawCategories
    .filter((cat) =>
      allowedCategories.some(
        (allowed) =>
          allowed.toLowerCase().trim() ===
          (cat.category_name || "").toLowerCase().trim()
      )
    )
    .map((cat) => ({
      category_name: cat.category_name,
      slug: cat.slug,
      alt_text: cat.alt_text || cat.category_name,
      image:
        typeof cat.image === "string"
          ? cat.image
          : cat.image?.url || "/media/placeholder.jpg",
    }));
};

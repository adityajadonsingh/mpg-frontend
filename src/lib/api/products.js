export const getAllProducts = async (category) => {
  if (category) {
    const res = await fetch(`https://mpg-backend-production.up.railway.app/api/products/?category=${category}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  }
  const res = await fetch("https://mpg-backend-production.up.railway.app/api/products/", {
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

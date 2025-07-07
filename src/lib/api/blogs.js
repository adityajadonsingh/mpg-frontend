export const getAllBlogs = async () => {
  const res = await fetch(`${process.env.BACKEND_INTERNAL_URL}/api/blogs/`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};


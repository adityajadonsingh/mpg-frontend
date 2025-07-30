export const getAllBlogs = async () => {
  const res = await fetch("https://backend.mpgstone.com/api/blogs/", {
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
export const getBlogsCategory = async () => {
  const res = await fetch("https://backend.mpgstone.com/api/blogcategories/", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog categories");
  }

  return res.json();
};


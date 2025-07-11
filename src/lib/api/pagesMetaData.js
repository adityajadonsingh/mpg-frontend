export const getPageMetaData = async (pageName) => {
  const res = await fetch(`https://backend.mpgstone.com/api/page-meta/?page=${pageName}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch page meta data");
  }

  return res.json();
};


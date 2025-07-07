export const getContactDetails = async () => {
  const res = await fetch("https://backend.mpgstone.co.uk/api/contactdetails/", {
    next: { revalidate: 60000000 }, // Revalidate every 60 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

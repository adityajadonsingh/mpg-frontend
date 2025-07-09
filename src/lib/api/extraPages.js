export const getExtraPageContent = async (pageName) => {
    if (pageName === "privacy") {
        const res = await fetch("https://backend.mpgstone.com/api/legal/privacy-policy/", {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }

        return res.json();
    }else if (pageName === "terms"){
        const res = await fetch("https://backend.mpgstone.com/api/legal/terms-and-conditions/", {
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
};

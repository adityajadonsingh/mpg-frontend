export const getAllProducts = async (quantity, category) => {

  if (quantity == "all" && category != null) {
    const res = await fetch("https://mpg-backend-production.up.railway.app/api/products/", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    // console.log("Fetching all products from api")
    return res.json();
  }else if(quantity == "10", category){
    const res = await fetch(`https://mpg-backend-production.up.railway.app/api/products/?category=${category}&limit=10`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    // console.log("Fetching all products in specified category from api")
    return res.json();
  }
  
  else if (quantity == "category-all", category) {
    const res = await fetch(`https://mpg-backend-production.up.railway.app/api/products/?category=${category}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    // console.log("Fetching all products in specified category from api")
    return res.json();
  }

  else if (quantity && category == null) {
    const res = await fetch(`https://mpg-backend-production.up.railway.app/api/products/?slug=${quantity}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    // console.log("Fetching single product from api")
    return res.json();
  }


};

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchBar({ categories }) {
  const minimalCategories = categories.map((cat) => ({
    name: cat.category_name,
    slug: cat.slug,
  }));
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/search-products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filteredCategories = minimalCategories.filter((cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredProducts = products.filter((prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults([
      { type: "category", items: filteredCategories },
      { type: "product", items: filteredProducts },
    ]);
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products or categories..."
        className="w-full bg-white border-0 rounded p-2 sm:px-4 px-2 md:text-base text-xs"
      />

      {isOpen &&
        (results[0].items.length > 0 || results[1].items.length > 0) && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-1 rounded z-50 max-h-72 overflow-y-auto">
            {results.map(
              (group) =>
                group.items.length > 0 && (
                  <div key={group.type} className="px-4 py-2">
                    <h4 className="text-sm font-semibold mb-1 capitalize">
                      {group.type === "category" ? "Categories" : "Products"}
                    </h4>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={
                              group.type === "category"
                                ? `/product-category/${item.slug}`
                                : `/product-category/product/${item.slug}`
                            }
                            onClick={() => setIsOpen(false)}
                            className="block py-1 hover:bg-gray-100 px-2 rounded capitalize"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
    </div>
  );
}

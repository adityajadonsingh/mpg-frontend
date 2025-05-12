"use client";
import Image from 'next/image';
import Link from "next/link";
import { useCategories } from "@/context/CategoryContext";
import { useEffect, useState } from "react";

export default function Header() {
  const categories = useCategories();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header transition-all duration-300 ${scrolled ? "shadow-md bg-white" : ""}`}>
      <div className="container mx-auto">
        <div className="wrapper flex justify-between items-center">
          <div className="logo">
            <Link href="/" className="text-xl font-bold">
              <Image
                width={800}
                height={500}
                src="https://mpgstone.com/wp-content/uploads/2023/09/logo-5.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="search-bar relative h-fit">
            <input className="search-input outline-0" type="text" />
            <i className="bi bi-search search-icn"></i>
          </div>
          <div className="end-side flex gap-x-5">
            <nav>
              <ul className="nav">
                <li className="nav-item relative group">
                  <span className="cursor-pointer">Categories<i className="bi bi-caret-down-fill ml-2"></i></span>
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded z-50 min-w-[150px]">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <a
                          href={`/${cat.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                        >
                          {cat.category_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link href="/">Products</Link>
                </li>
                <li className="nav-item">
                  <Link href="/about-us">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link href="/products">Contact Us</Link>
                </li>
              </ul>
            </nav>
            <div className="contact-icns flex gap-x-2 items-center">
              <a href="">
                <div className="icn">
                  <i className="bi bi-telephone"></i>
                </div>
              </a>
              <a href="">
                <div className="icn">
                  <i className="bi bi-envelope"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

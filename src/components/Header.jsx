"use client";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/context/CategoryContext";
import { useEffect, useState } from "react";

export default function Header() {
  const categories = useCategories();
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <header
        className={`header transition-all duration-300 ${
          scrolled ? "shadow-md bg-white" : ""
        }`}
      >
        <div className="wrapper flex justify-between items-center relative">
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

          {/* Search Bar */}
          <div className="search-bar relative h-fit hidden md:block">
            <input className="search-input outline-0" type="text" />
            <i className="bi bi-search search-icn"></i>
          </div>
          {/* Mobile Menu Icon */}
          <button
            onClick={toggleSidebar}
            className="hidden menu-toggle text-2xl cursor-pointer"
          >
            <i className="bi bi-list"></i>
          </button>
          {/* Desktop Nav + Icons */}
          <div className="end-side flex gap-x-5 nav-things">
            <nav>
              <ul className="nav">
                <li className="nav-item relative group">
                  <span className="cursor-pointer">
                    Categories<i className="bi bi-caret-down-fill ml-2"></i>
                  </span>
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded z-50 min-w-[150px] overflow-hidden">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <a
                          href={`/product-category/${cat.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                        >
                          {cat.category_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link href="/all-products">Products</Link>
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
      </header>

      {/* Sidebar (mobile) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden toggle-menus`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={toggleSidebar}>
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        <div className="p-4">
          <ul className="nav flex flex-col gap-y-3">
            <li className="nav-item">
              <details>
                <summary className="cursor-pointer flex justify-between items-center">
                  Categories <i className="bi bi-caret-down-fill ml-2"></i>
                </summary>
                <ul className="pl-4 mt-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <a
                        href={`/product-category/${cat.slug}`}
                        className="block px-2 py-1 hover:bg-gray-100 rounded"
                        onClick={toggleSidebar}
                      >
                        {cat.category_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li className="nav-item">
              <Link href="/all-products" onClick={toggleSidebar}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about-us" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" onClick={toggleSidebar}>
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="contact-icns flex gap-x-4 items-center mt-6">
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0006] bg-opacity-30 z-[99999] backdrop-blur-[2px] hidden toggle-menu-bg"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

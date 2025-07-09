"use client";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/context/CategoryContext";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

export default function Header({ contactDetails }) {
  const categories = useCategories();
  const [dropdown, setDropdown] = useState("hidden");
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref for dropdown container

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleDropdown = () => {
    setDropdown((prev) => (prev === "hidden" ? "block" : "hidden"));
  };
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !event.composedPath().includes(dropdownRef.current)
      ) {
        setDropdown("hidden");
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`header relative transition-all duration-300 ${
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
          <div className="search-bar xl:w-96 md:w-72 sm:w-52 w-40 md:relative h-fit ">
            <SearchBar categories={categories} />
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
                <li className="nav-item group" ref={dropdownRef}>
                  <span className="cursor-pointer" onClick={handleDropdown}>
                    Categories<i className="bi bi-caret-down-fill ml-2"></i>
                  </span>
                  <ul
                    className={`dropdown-menu absolute bg-white shadow-md z-[999999] min-w-[150px] overflow-hidden ${dropdown}`}
                  >
                    {categories.map((cat) => (
                      <li key={cat.slug} className="rounded overflow-hidden">
                        <Link
                          href={`/product-category/${cat.slug}/`}
                          className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                          onClick={() => setDropdown("hidden")}
                        >
                          {cat.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link href="/products/">Products</Link>
                </li>
                <li className="nav-item">
                  <Link href="/about-us/">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact-us/">Contact Us</Link>
                </li>
              </ul>
            </nav>
            <div className="contact-icns flex gap-x-2 items-center">
              <a href={`tel: ${contactDetails.phones[0]}`}>
                <div className="icn">
                  <i className="bi bi-telephone"></i>
                </div>
              </a>
              <a href={`mailto: ${contactDetails.emails[0]}`}>
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
        className={`fixed top-0 left-0 sm:w-64 w-full h-full bg-[#ededf0] transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden toggle-menus`}
      >
        <div className="p-4 border-b border-[#b6b6b678] flex justify-between items-center">
          <span className="text-lg font-semibold">Menu</span>
          <button className="cursor-pointer" onClick={toggleSidebar}>
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
                <ul className="mt-2 h-[320px] overflow-y-scroll bg-white p-3 rounded-md">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/product-category/${cat.slug}/`}
                        className="block px-2 py-1 hover:bg-gray-100 rounded"
                        onClick={toggleSidebar}
                      >
                        {cat.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li className="nav-item">
              <Link href="/products/" onClick={toggleSidebar}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about-us/" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact-us/" onClick={toggleSidebar}>
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="contact-icns flex gap-x-4 items-center mt-6">
            <a href={`tel: ${contactDetails.phones[0]}`}>
              <div className="icn">
                <i className="bi bi-telephone"></i>
              </div>
            </a>
            <a href={`mailto: ${contactDetails.emails[0]}`}>
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCategories } from "@/context/CategoryContext";
import axios from "axios";

import Popup from "@/components/Popup";

export default function Footer({ socialLinks, contactDetails }) {
  const categories = useCategories();
  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  // Fetch all subscribers on load
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(
          "https://backend.mpgstone.com/api/subscribe/"
        );
        setSubscribers(res.data.subscribers || []);
      } catch (error) {
        console.error("Error fetching subscribers", error);
      }
    };
    fetchSubscribers();
  }, []);

  // Handle email submission
  const handleSubscribe = async (e) => {
    if (e.key === "Enter" && email.trim()) {
      const alreadySubscribed = subscribers.some(
        (sub) => sub.email.toLowerCase() === email.toLowerCase()
      );

      if (alreadySubscribed) {
        setPopupMessage("You are already subscribed.");
      } else {
        try {
          // Save subscriber
          await axios.post("https://backend.mpgstone.com/api/subscribe/", {
            email,
            type: "newsletter",
          });

          // Send thank-you email
          await fetch("/api/sendMail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, type: "newsletter" }),
          });

          setPopupMessage("Subscription successful!");
          setEmail("");
        } catch (error) {
          console.error("Subscription error:", error);
          setPopupMessage("Subscription failed. Try again.");
        }
      }
    }
  };

  return (
    <>
      {popupMessage && (
        <Popup
          message={popupMessage}
          duration={3000}
          onClose={() => setPopupMessage("")}
        />
      )}
      <footer className="footer">
        <div className="wrapper">
          <div className="grid gap-x-4 gap-y-6 lg:grid-cols-[1fr_0.6fr_1fr_1fr] md:grid-cols-[1fr_0.6fr_1fr]">
            <div className="foot-logo">
              <div className="logo-box">
                <Link href="/">
                  <img
                    src="/media/logo.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <p className="mt-5">
                Leading natural stones manufacturer and supplier in the USA and worldwide since 1984. With a proven experience of 38+ years, MPG Stone has evolved as one of the fastest-growing natural stones and floor tiles offering brands in a short time.
              </p>
            </div>
            <div className="link-box">
              <h4>Quick Links</h4>
              <ul className="links">
                <li className="link">
                  <Link href="/about-us/">About Us</Link>
                </li>
                <li className="link">
                  <Link href="/contact-us/">Contact Us</Link>
                </li>
                <li className="link">
                  <Link href="/blogs/">Blogs</Link>
                </li>
                <li className="link">
                  <Link href="/product-category/">Product Category</Link>
                </li>
                <li className="link">
                  <Link href="/products/">Products</Link>
                </li>
                <li className="link">
                  <Link href="/product-catalogue/">Product Catalogue</Link>
                </li>
              </ul>
            </div>
            {/* <div className="link-box">
              <h4>Categories</h4>
              
            </div> */}
            <div className="link-box contact-links">
              <h4>Contact Us</h4>
              <ul className="links">
                <li className="link flex items-center gap-x-3 pb-6">
                  <div className="icn-box">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="cont-link">
                    {contactDetails.phones.map((tel, idx) => (
                      <Link
                        key={`tel-${idx}`}
                        href={`tel: ${tel}`}
                        className="block"
                      >
                        {tel}
                      </Link>
                    ))}
                  </div>
                </li>
                <li className="link flex items-center gap-x-3 pb-6">
                  <div className="icn-box">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="cont-link">
                    {contactDetails.emails.map((mail, idx) => (
                      <Link
                        key={`mail-${idx}`}
                        href={`mailto: ${mail}`}
                        className="block"
                      >
                        {mail}
                      </Link>
                    ))}
                  </div>
                </li>
                <li className="link flex items-center gap-x-3 pb-6">
                  <div className="icn-box">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="cont-link">
                    {/* <span className="block">Phone</span> */}
                    <Link
                      href="https://www.google.co.in/maps/place/Kemp+House,+124+City+Rd,+London+EC1V+2NX,+UK/@51.5272629,-0.0913798,17z/data=!3m1!4b1!4m6!3m5!1s0x48761ca66f36980f:0xb05f7a46d81c2d05!8m2!3d51.5272596!4d-0.0888049!16s%2Fg%2F11m7662hk2?entry=tts&g_ep=EgoyMDI1MDUwNi4wIPu8ASoASAFQAw%3D%3D"
                      target="_blank"
                      className="block"
                    >
                      {contactDetails.address}
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="link-box">
              <h4>Subscribe</h4>
              <p>
                Stay informed about the latest trends and developments, ensuring you’re always one step ahead. Join us on this journey to explore what’s next in the fascinating world of stones.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleSubscribe}
                className="w-full mt-4 border border-gray-300 rounded p-3 bg-gray-100"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="foot-category link-box mt-5">
            <h4>Shop All Categories</h4>
            <ul className="links flex flex-wrap gap-y-1">
              {categories.map((category, idx) => {
                return (
                  <li className="link" key={`cat-key-${idx}`}>
                    <Link href={`/product-category/${category.slug}/`}>
                      {category.category_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="foot-mid">
            <div className="flex md:justify-between items-center flex-wrap justify-center gap-y-2">
              <ul className="links flex gap-x-4">
                <li>
                  <Link href="/terms-and-conditions/">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy/">Privacy Policy</Link>
                </li>
              </ul>
              <ul className="social-icns flex gap-x-4">
                {socialLinks.map((social, idx) => {
                  return (
                    <li key={`social-link-${idx}`}>
                      <a href={social.url} target="_blank">
                        <i className={`bi bi-${social.iconclass}`}></i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-5 ">
            <span className="block text-center">
              @2025 all rights reserved by{" "}
              <Link className="font-semibold" href="/">
                mpgstone.com
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

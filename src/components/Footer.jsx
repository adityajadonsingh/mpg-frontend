"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCategories } from "@/context/CategoryContext";

import Popup from "@/components/Popup";

export default function Footer({ socialLinks = [], contactDetails = {} }) {
  const categories = useCategories();

  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

  const phones = contactDetails?.phones || [];
  const emails = contactDetails?.emails || [];
  const address = contactDetails?.address || "";

  // Fetch all subscribers
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch("https://backend.mpgstone.com/api/subscribe/", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSubscribers(data.subscribers || []);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  // Newsletter subscription
  const handleSubscribe = async (e) => {
    if (e.key !== "Enter" || !email.trim()) return;

    const normalizedEmail = email.trim().toLowerCase();

    const alreadySubscribed = subscribers.some(
      (sub) => sub.email?.toLowerCase() === normalizedEmail,
    );

    if (alreadySubscribed) {
      setPopupMessage("You are already subscribed.");
      return;
    }

    try {
      const res = await fetch("https://backend.mpgstone.com/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          type: "newsletter",
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Send thank-you email
      await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          type: "newsletter",
        }),
      });

      setPopupMessage("Subscription successful!");
      setEmail("");

      // Keep local state updated
      setSubscribers((prev) => [
        ...prev,
        {
          email: normalizedEmail,
        },
      ]);
    } catch (error) {
      console.error("Subscription error:", error);
      setPopupMessage("Subscription failed. Try again.");
    }
  };

  const getGoogleMapsUrl = (location) => {
    if (!location) return "#";

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location,
    )}`;
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

      <footer className="footer bg-[#f8f8f8] text-[#5f6f82]">
        <div className="wrapper">
          {/* =========================
              MAIN FOOTER
          ========================== */}
          <div
            className="
              grid
              gap-x-10
              gap-y-10
              lg:grid-cols-[1.25fr_0.75fr_1.25fr_1.35fr]
              md:grid-cols-2
              grid-cols-1
            "
          >
            {/* =========================
                COMPANY
            ========================== */}
            <div className="foot-logo">
              <div className="logo-box">
                <Link href="/" aria-label="MPG Stone Home">
                  <img
                    src="/media/logo.svg"
                    alt="MPG Stone"
                    className="h-auto w-[180px]"
                  />
                </Link>
              </div>

              <p className="mt-5 max-w-[430px] text-[15px] leading-7 text-[#69788a]">
                Leading natural stones manufacturer and supplier in the USA and
                worldwide since 1984. With a proven experience of 38+ years, MPG
                Stone has evolved as one of the fastest-growing natural stones
                and floor tiles offering brands in a short time.
              </p>
            </div>

            {/* =========================
                QUICK LINKS
            ========================== */}
            <div className="link-box">
              <h4 className="mb-5 text-[19px] font-semibold uppercase tracking-wide text-[#111111]">
                Quick Links
              </h4>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about-us/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact-us/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blogs/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    href="/product-category/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    Product Category
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/product-catalogue/"
                    className="text-[15px] text-[#66768a] transition-colors duration-200 hover:text-[#f36f21]"
                  >
                    Product Catalogue
                  </Link>
                </li>
              </ul>
            </div>

            {/* =========================
                CONTACT
            ========================== */}
            <div className="link-box contact-links">
              <h4 className="mb-5 text-[19px] font-semibold uppercase tracking-wide text-[#111111]">
                Contact Us
              </h4>

              <ul className="space-y-5">
                {/* Phone */}
                {phones.length > 0 && (
                  <li className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#eef0f3]
                        text-[#687789]
                      "
                    >
                      <i className="bi bi-telephone text-[17px]" />
                    </div>

                    <div className="pt-1">
                      {phones.map((tel, idx) => (
                        <Link
                          key={`tel-${idx}`}
                          href={`tel:${tel}`}
                          className="
                            block
                            text-[15px]
                            leading-6
                            text-[#66768a]
                            transition-colors
                            duration-200
                            hover:text-[#f36f21]
                          "
                        >
                          {tel}
                        </Link>
                      ))}
                    </div>
                  </li>
                )}

                {/* Email */}
                {emails.length > 0 && (
                  <li className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#eef0f3]
                        text-[#687789]
                      "
                    >
                      <i className="bi bi-envelope text-[17px]" />
                    </div>

                    <div className="pt-1">
                      {emails.map((mail, idx) => (
                        <Link
                          key={`mail-${idx}`}
                          href={`mailto:${mail}`}
                          className="
                            block
                            text-[15px]
                            leading-6
                            text-[#66768a]
                            transition-colors
                            duration-200
                            hover:text-[#f36f21]
                          "
                        >
                          {mail}
                        </Link>
                      ))}
                    </div>
                  </li>
                )}

                {/* Backend Address */}
                {address && (
                  <li className="flex items-start gap-4">
                    <div
                      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#eef0f3]
        text-[#687789]
      "
                    >
                      <i className="bi bi-geo-alt text-[17px]" />
                    </div>

                    <div className="pt-1">
                      <span className="mb-1 block text-[13px] font-semibold text-[#111111]">
                        USA Address
                      </span>

                      <Link
                        href={getGoogleMapsUrl(address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
          block
          text-[15px]
          leading-6
          text-[#66768a]
          transition-colors
          duration-200
          hover:text-[#f36f21]
        "
                      >
                        {address}
                      </Link>
                    </div>
                  </li>
                )}

                {/* India Office Address */}
                <li className="flex items-start gap-4">
                  <div
                    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-[#eef0f3]
      text-[#687789]
    "
                  >
                    <i className="bi bi-geo-alt text-[17px]" />
                  </div>

                  <div className="pt-1">
                    <span className="mb-1 block text-[13px] font-semibold text-[#111111]">
                      India Office Address
                    </span>

                    <Link
                      href={getGoogleMapsUrl(
                        "38-R, Model Town, Rewari - 123401, Haryana, India",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
        block
        text-[15px]
        leading-6
        text-[#66768a]
        transition-colors
        duration-200
        hover:text-[#f36f21]
      "
                    >
                      38-R, Model Town, Rewari - 123401, Haryana, India
                    </Link>
                  </div>
                </li>

                {/* India Factory Address */}
                <li className="flex items-start gap-4">
                  <div
                    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-[#eef0f3]
      text-[#687789]
    "
                  >
                    <i className="bi bi-geo-alt text-[17px]" />
                  </div>

                  <div className="pt-1">
                    <span className="mb-1 block text-[13px] font-semibold text-[#111111]">
                      India Factory Address
                    </span>

                    <Link
                      href={getGoogleMapsUrl(
                        "Village Husainpur, Harinagar, Rewari - 123401, Haryana, India",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
        block
        text-[15px]
        leading-6
        text-[#66768a]
        transition-colors
        duration-200
        hover:text-[#f36f21]
      "
                    >
                      Village Husainpur, Harinagar, Rewari - 123401, Haryana,
                      India
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            {/* =========================
                SUBSCRIBE
            ========================== */}
            <div className="link-box">
              <h4 className="mb-5 text-[19px] font-semibold uppercase tracking-wide text-[#111111]">
                Subscribe
              </h4>

              <p className="max-w-[480px] text-[15px] leading-7 text-[#69788a]">
                Stay informed about the latest trends and developments, ensuring
                you’re always one step ahead. Join us on this journey to explore
                what’s next in the fascinating world of stones.
              </p>

              <div className="mt-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleSubscribe}
                  className="
                    h-[50px]
                    w-full
                    rounded-[3px]
                    border
                    border-[#d5d9df]
                    bg-white
                    px-4
                    text-[15px]
                    text-[#333333]
                    outline-none
                    placeholder:text-[#a5adb7]
                    focus:border-[#f36f21]
                    focus:ring-1
                    focus:ring-[#f36f21]
                  "
                  placeholder="Email"
                  aria-label="Email address"
                />

                <p className="mt-2 text-xs text-[#8993a0]">
                  Press Enter to subscribe.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              SHOP ALL CATEGORIES
          ========================== */}
          <div className="foot-category link-box mt-10 border-t border-[#e1e3e6] pt-8">
            <h4 className="mb-5 text-[19px] font-semibold uppercase tracking-wide text-[#111111]">
              Shop All Categories
            </h4>

            <ul className="flex flex-wrap gap-y-2">
              {categories.map((category, idx) => (
                <li className="flex items-center" key={`cat-key-${idx}`}>
                  <Link
                    href={`/product-category/${category.slug}/`}
                    className="
                      px-1
                      text-[15px]
                      leading-6
                      text-[#66768a]
                      transition-colors
                      duration-200
                      hover:text-[#f36f21]
                    "
                  >
                    {category.category_name}
                  </Link>

                  {idx !== categories.length - 1 && (
                    <span className="text-[#aab0b7]">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              FOOTER MID
          ========================== */}
          <div className="foot-mid mt-8 border-t border-[#dfe2e5] pt-5">
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-5
              "
            >
              {/* Legal */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <Link
                    href="/terms-and-conditions/"
                    className="
                      text-[14px]
                      text-[#66768a]
                      transition-colors
                      duration-200
                      hover:text-[#f36f21]
                    "
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    href="/privacy-policy/"
                    className="
                      text-[14px]
                      text-[#66768a]
                      transition-colors
                      duration-200
                      hover:text-[#f36f21]
                    "
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>

              {/* Social Icons */}
              <ul className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <li key={`social-link-${idx}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.iconclass}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#eef0f3]
                        text-[#69788a]
                        transition-all
                        duration-200
                        hover:bg-[#f36f21]
                        hover:text-white
                      "
                    >
                      <i className={`bi bi-${social.iconclass}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =========================
              COPYRIGHT
          ========================== */}
          <div
            className="
              mt-6
              border-t
              border-[#dfe2e5]
              py-5
              text-center
            "
          >
            <span className="text-[14px] text-[#7b8795]">
              © {new Date().getFullYear()} All rights reserved by{" "}
              <Link
                href="/"
                className="
                  font-semibold
                  text-[#5c6876]
                  transition-colors
                  duration-200
                  hover:text-[#f36f21]
                "
              >
                mpgstone.com
              </Link>
            </span>
          </div>
        </div>
      </footer>

      {/* =========================
          WHATSAPP FLOAT
      ========================== */}
      <div className="whatsapp-float fixed bottom-5 right-5 z-50">
        <a
          href="https://wa.me/13212942352"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact MPG Stone on WhatsApp"
          className="
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-full
            bg-[#16b957]
            text-white
            shadow-[0_5px_20px_rgba(0,0,0,0.18)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#12a84e]
          "
        >
          <i className="bi bi-whatsapp text-[27px]" />
        </a>
      </div>
    </>
  );
}

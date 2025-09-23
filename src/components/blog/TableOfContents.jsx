"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) return;

    const container = document.createElement("div");
    container.innerHTML = content;

    const foundHeadings = [];
    container.querySelectorAll("h2").forEach((el, index) => {
      const id = `heading-${index}`;
      el.setAttribute("id", id);
      el.classList.add("scroll-mt-24");

      foundHeadings.push({
        id,
        text: el.textContent,
      });
    });

    document.querySelectorAll(".blog-html")[0].innerHTML = container.innerHTML;

    setHeadings(foundHeadings);
  }, [content]);

  if (!headings.length) return null;

  return (
    <div className="mb-6 px-6 py-4 rounded bg-[#ededf0]">
      <h2 className="font-semibold text-xl mb-3">Table of Contents</h2>
      <ul className="space-y-2 list-disc pl-5">
        {headings.map((h) => (
          <li key={h.id}>
            <Link href={`#${h.id}`} className="hover:text-[#f36c23] hover:underline">
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

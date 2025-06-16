"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FacebookShareButton() {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    shareUrl && (
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
      >
        <div className="icn cursor-pointer">
          <i className="bi bi-facebook"></i>
        </div>
      </Link>
    )
  );
}

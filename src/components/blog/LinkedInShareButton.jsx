"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LinkedInShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    url && (
      <Link
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
      >
        <div className="icn cursor-pointer">
          <i className="bi bi-linkedin"></i>
        </div>
      </Link>
    )
  );
}

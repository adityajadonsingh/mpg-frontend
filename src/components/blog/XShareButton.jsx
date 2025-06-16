"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function XShareButton({ text = "Check this out!" }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const tweetText = `${text} ${url}`;

  return (
    url && (
      <Link
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
        target="_blank"
      >
        <div className="icn cursor-pointer">
          <i className="bi bi-twitter-x"></i> {/* Use bi-twitter-x or bi-twitter */}
        </div>
      </Link>
    )
  );
}

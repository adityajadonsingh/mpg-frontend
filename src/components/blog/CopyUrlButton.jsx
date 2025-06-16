"use client";

import { useState } from "react";

export default function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // revert icon after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="icn cursor-pointer" onClick={handleCopy}>
      <i className={`bi ${copied ? "bi-clipboard-check-fill" : "bi-share-fill"}`}></i>
    </div>
  );
}

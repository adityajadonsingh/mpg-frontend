"use client";
export default function ExtraMetaTags({ publisher }) {
  if (!publisher) return null;
  return <meta property="article:publisher" content={publisher} />;
}
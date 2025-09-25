"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  ssr: false,
  loading: () => <p>Loading testimonials...</p>,
});

export default function LazyTestimonials(props) {
  return <Testimonials {...props} />;
}
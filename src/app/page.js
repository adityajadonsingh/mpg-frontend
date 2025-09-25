import dynamic from "next/dynamic";

import BestMPG from "@/components/home/BestMPG";
import HeroClient from "@/components/home/HeroClient";
import HomeCategories from "@/components/home/HomeCategories";
import MessageBox from "@/components/home/MessageBox";

import { getAllBanners } from "@/lib/api/homeBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import { getAllTestimonials } from "@/lib/api/testimonials";
import PageDescription from "@/components/PageDescription";
import { getHomepageContent } from "@/lib/api/homepageContent";
import SchemaInjector from "@/components/SchemaInjector";
import HomePopup from "./HomePopup";
import { getHomeCategoriesOnly } from "@/lib/api/categories";
import LazyTestimonials from "@/components/home/LazyTestimonials";
import ContactForm from "@/components/home/ContactForm";

const Blogs = dynamic(() => import("@/components/home/Blogs"), {
  ssr: true, 
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-md" />,
});


export async function generateMetadata() {
  const content = await getHomepageContent();
  return {
    title: content.meta_title || "Home | MPG Stone",
    description: content.meta_description || "Default description",
    keywords: content.meta_keywords || "",
    openGraph: {
      title: content.og_title || content.meta_title,
      description: content.og_description || content.meta_description,
      url: content.canonical_url,
      images: content.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: content.twitter_title || content.meta_title,
      description: content.twitter_description || content.meta_description,
      images: content.meta_image,
    },
    alternates: {
      canonical: content.canonical_url || "",
    },
    robots: content.robots_tag,
  };
}

export default async function Home() {
  const [banners, blogs, testimonials, homePageContent, categories] = await Promise.all([
    getAllBanners(),
    getAllBlogs(),
    getAllTestimonials(),
    getHomepageContent(),
    getHomeCategoriesOnly()
  ]);

  return (
    <>
      <HeroClient banners={banners} />
      <HomeCategories categories={categories} />
      <BestMPG />
      <MessageBox />
      <LazyTestimonials testimonials={testimonials.testimonials} />
      <Blogs blogs={blogs.blogs} />
      <ContactForm />
      <PageDescription content={homePageContent.content} />
      <SchemaInjector schemas={homePageContent.schemas} />
      <HomePopup />
    </>
  );
}

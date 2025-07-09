import BestMPG from "@/components/home/BestMPG";
import Blogs from "@/components/home/Blogs";
import HeroClient from "@/components/home/HeroClient";
import HomeCategories from "@/components/home/HomeCategories";
import MessageBox from "@/components/home/MessageBox";
import Testimonials from "@/components/home/Testimonials";
import ContactForm from "@/components/home/ContactForm";
import { getAllBanners } from "@/lib/api/homeBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import { getAllTestimonials } from "@/lib/api/testimonials";
import PageDescription from "@/components/PageDescription";
import { getHomepageContent } from "@/lib/api/homepageContent";
import SchemaInjector from "@/components/SchemaInjector";

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
      siteName: "MPG Stone"
    },
    twitter: {
      title: content.twitter_title || content.meta_title,
      description: content.twitter_description || content.meta_description,
      images: content.meta_image
    },
    alternates: {
      canonical: content.canonical_url || "",
    },
    robots: content.robots_tag,
  };
}

export default async function Home() {
  const banners = await getAllBanners();
  const blogs = await getAllBlogs();
  const testimonials = await getAllTestimonials();
  const homePageContent = await getHomepageContent();
  return (
    <>
      <HeroClient banners={banners} />
      <HomeCategories />
      <BestMPG />
      <MessageBox />
      <Testimonials testimonials={testimonials.testimonials} />
      <Blogs blogs={blogs.blogs} />
      <ContactForm />
      <PageDescription content={homePageContent.content} />
      <SchemaInjector schemas={homePageContent.schemas} />
    </>
  );
}

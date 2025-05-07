import BestMPG from "@/components/home/BestMPG";
import Blogs from "@/components/home/Blogs";
import HeroClient from "@/components/home/HeroClient";
import HomeCategories from "@/components/home/HomeCategories";
import MessageBox from "@/components/home/MessageBox";
import Testimonials from "@/components/home/Testimonials";
import { getAllBanners } from "@/lib/api/homeBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import { getAllTestimonials } from "@/lib/api/testimonials";

export default async function Home() {
  const banners = await getAllBanners();
  const blogs = await getAllBlogs();
  const testimonials = await getAllTestimonials();
  console.log(testimonials.testimonials)
  return (
    <>
      <HeroClient banners={banners} />
      <HomeCategories />
      <BestMPG/>
      <MessageBox />
      <Testimonials testimonials={testimonials.testimonials} />
      <Blogs blogs={blogs.blogs} />
    </>
  );
}

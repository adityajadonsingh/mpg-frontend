import BestMPG from "@/components/home/BestMPG";
import Blogs from "@/components/home/Blogs";
import HeroClient from "@/components/home/HeroClient";
import HomeCategories from "@/components/home/HomeCategories";
import MessageBox from "@/components/home/MessageBox";
import Testimonials from "@/components/home/Testimonials";
import { getAllBanners } from "@/lib/api/homeBanner";

export default async function Home() {
  const banners = await getAllBanners();
  return (
    <>
      <HeroClient banners={banners} />
      <HomeCategories />
      <BestMPG/>
      <MessageBox />
      <Testimonials />
      <Blogs />
    </>
  );
}

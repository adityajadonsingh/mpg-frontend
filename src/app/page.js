import BestMPG from "@/components/home/BestMPG";
import HeroClient from "@/components/home/HeroClient";
import HomeCategories from "@/components/home/HomeCategories";
import MessageBox from "@/components/home/MessageBox";
import { getAllBanners } from "@/lib/api/homeBanner";

export default async function Home() {
  const banners = await getAllBanners();
  return (
    <>
      <HeroClient banners={banners} />
      <HomeCategories />
      <BestMPG/>
      <MessageBox />
    </>
  );
}

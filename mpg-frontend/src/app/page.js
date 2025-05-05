import BestMPG from "@/components/home/BestMPG";
import Hero from "@/components/home/Hero";
import HomeCategories from "@/components/home/HomeCategories";

export default async function Home() {
  return (
    <>
      <Hero />
      <HomeCategories />
      <BestMPG/>
    </>
  );
}

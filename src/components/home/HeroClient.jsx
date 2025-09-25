import Image from "next/image";

export default function HeroClient({ banners }) {
  return (
    <section className="home-banner">
      <div className="wrap relative">
              <Image
                width={800}
                height={500}
                src={banners[0].image}
                alt={banners[0].title}
                priority
                className="z-10 h-full w-full bg-[#ebedf0]"
                placeholder="blur"
                blurDataURL="/media/placeholder.jpg"
              />
              <div className="content-box">
                <h1>{banners[0].title}</h1>
                <p>{banners[0].subtitle}</p>
                <a href="#contactForm">
                  <button>Enquire Now</button>
                </a>
              </div>
            </div>
    </section>
  );
}

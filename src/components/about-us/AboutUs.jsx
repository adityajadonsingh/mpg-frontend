import Image from "next/image"

export default function AboutUs() {
  return (
    <>
        <section className="about-us">
            <div className="wrapper">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="img-box relative">
                        <Image 
                            src={""}
                            alt="about-us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

import Image from "next/image"

export default function AboutUs() {
  return (
    <>
        <section className="about-us my-10">
            <div className="wrapper">
                <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-24 lg:gap-x-12 md:gap-x-8 md:gap-y-0 sm:gap-y-8 gap-y-5 md:px-0 sm:px-10">
                    <div className="img-box md:h-96 sm:h-80 h-48 xl:w-4/5 w-full xl:ml-auto relative">
                        <Image 
                            src="/media/about-us.png"
                            alt="about-us"
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div className="content xl:w-4/5 w-full my-auto">
                        <h2 className="md:text-2xl text-lg font-bold md:mb-5 mb-3">ABOUT MPG STONE</h2>
                        <p className="mb-2 md:text-md text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio accusamus nam sit corporis iure accusantium suscipit, saepe id nemo voluptate eum magnam dignissimos cumque, asperiores sed adipisci quisquam cupiditate. Rerum.</p>
                        <p className="mb-2 md:text-md text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio accusamus nam sit corporis iure accusantium suscipit, saepe id nemo voluptate eum magnam dignissimos cumque, asperiores sed adipisci quisquam cupiditate. Rerum.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
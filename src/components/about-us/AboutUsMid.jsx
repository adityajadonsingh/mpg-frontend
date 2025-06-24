export default function AboutUsMid(){
    return (
        <>
            <section className="about-cards md:py-10 pb-5">
                <div className="wrapper">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 sm:px-6">
                        <div className="card text-center w-full h-full xl:py-18 lg:py-16 md:py-10 py-6 xl:px-8 px-6 bg-[#F2F2F2] rounded-md shadow-md" >
                            <div className="icn">
                                <img src="/media/icons/target.png" className="w-20 h-20 mx-auto" alt="mission" />
                            </div>
                            <h4 className="md:mt-8 mt-4 md:mb-6 mb-4 lg:text-2xl text-xl font-bold">Our Mission</h4>
                            <p className="md:text-base text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam esse voluptas at nostrum, fugit possimus accusamus magnam autem praesentium ipsam dolores, molestiae, recusandae ipsa? Accusantium.</p>
                        </div>
                        <div className="card text-center w-full h-full xl:py-18 lg:py-16 md:py-10 py-6 xl:px-8 px-6 bg-[#F2F2F2] rounded-md shadow-md" >
                            <div className="icn">
                                <img src="/media/icons/vision.png" className="w-20 h-20 mx-auto" alt="vision" />
                            </div>
                            <h4 className="md:mt-8 mt-4 md:mb-6 mb-4 lg:text-2xl text-xl font-bold">Our Vision</h4>
                            <p className="md:text-base text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam esse voluptas at nostrum, fugit possimus accusamus magnam autem praesentium ipsam dolores, molestiae, recusandae ipsa? Accusantium.</p>
                        </div>
                        <div className="card text-center w-full h-full xl:py-18 lg:py-16 md:py-10 py-6 xl:px-8 px-6 bg-[#F2F2F2] rounded-md shadow-md" >
                            <div className="icn">
                                <img src="/media/icons/values.png" className="w-20 h-20 mx-auto" alt="values" />
                            </div>
                            <h4 className="md:mt-8 mt-4 md:mb-6 mb-4 lg:text-2xl text-xl font-bold">Our Values</h4>
                            <p className="md:text-base text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam esse voluptas at nostrum, fugit possimus accusamus magnam autem praesentium ipsam dolores, molestiae, recusandae ipsa? Accusantium.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
import Image from "next/image"

export default function CategoryBanner ({name, image, short_des}){
    return (
        <>
            <section className="cat-banner">
                <div className="grid grid-cols-2">
                    <div className="category-info">
                        <h1>{name}</h1>
                        <p>{short_des}</p>
                        <div className="flex gap-x-5">
                            <a href="/all-products">
                                <button className="view-prod-btn">
                                    View All Products
                                </button>
                            </a>
                            <button className="enquire-btn">
                                Enquire Now
                            </button>
                        </div>
                    </div>
                    <div className="category-image relative">
                        <Image 
                            style={{objectFit: "cover"}}
                            fill
                            src={image}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
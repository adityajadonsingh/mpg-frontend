import Image from "next/image"
import Link from "next/link"

export default function MiniBanner({ bg_img, pageName }){
    return(
        <>
            <section className="mini-banner">
                <Image src={bg_img} alt={pageName} fill className="z-0 object-cover"  />
                <div className="w-full relative z-10 h-full flex flex-col justify-center items-start">
                    <h1>{pageName}</h1>
                    <div className="bread">
                        <ul className="flex">
                            <li className="text-[#f36c23]">
                                <Link href={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li className="text-[#fff]">
                                {pageName}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
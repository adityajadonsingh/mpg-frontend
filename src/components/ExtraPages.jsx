import Link from "next/link"

export default function ExtraPages({ pageName , content}){

    return (
        <>
            <section className="extra-pages my-10">
                <div className="wrapper md:w-11/12 w-full mx-auto">
                    <ul className="flex gap-x-3 mb-5 text-[#2c2c2c]">
                        <li>
                            <Link href={"/"}><p>Home</p></Link>
                        </li>
                        <li>/</li>
                        <li>
                            <p>{pageName}</p>
                        </li>
                    </ul>
                    <h1 className="md:text-3xl text-xl font-semibold mb-6">{pageName}</h1>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                </div>
            </section>
        </>
    )
}
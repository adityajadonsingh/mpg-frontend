import Link from "next/link"

export default function ExtraPages({content}){

    return (
        <>
            <section className="extra-pages my-10">
                <div className="wrapper md:w-11/12 w-full mx-auto">
                    <div className="prose" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                </div>
            </section>
        </>
    )
}
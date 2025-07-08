import Link from "next/link"

export default function thankYouPage() {
    return (
        <>
            <section className="thank-you-page">
                <div className="wrapper">
                    <h1>Thank You</h1>
                    <p>We have received your message and will get back to you soon. You may also reach us at (+1) 321 294 2352 or info@mpgstone.com</p>
                    <Link href={"/"}>
                        <button>Home</button>
                    </Link>
                </div>
            </section>
        </>
    )
}
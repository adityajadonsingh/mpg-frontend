import Link from "next/link"

export default function Breadcrum({ path_arr }) {
    return (
        <>
            <div className="breadcrum">
                <div className="wrapper">
                    <ul className="flex flex-wrap">
                        <li><Link href="/">Home</Link></li>
                        {
                            path_arr.map((path, idx) => <li key={`bread-${idx}`}><Link href={path.slug}>{path.slug_name}</Link></li>)
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

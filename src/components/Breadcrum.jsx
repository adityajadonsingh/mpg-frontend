import Link from "next/link"

export default function Breadcrum({ path_arr }) {
    return (
        <div className="breadcrum">
            <div className="wrapper">
                <ul className="flex flex-wrap">
                    <li><Link href="/">Home</Link></li>
                    {
                        path_arr.map((path, idx) => {
                            const isLast = idx === path_arr.length - 1
                            return (
                                <li className="capitalize" key={`bread-${idx}`}>
                                    {isLast ? (
                                        <span className="text-[#f36c23]">{path.slug_name}</span>
                                    ) : (
                                        <Link href={path.slug}>{path.slug_name}</Link>
                                    )}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
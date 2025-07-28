import Link from "next/link"

export default function Breadcrum({ path_arr }) {
    return (
        <div className="breadcrum">
            <div className="wrapper">
                <ul className="flex flex-wrap font-medium">
                    <li><Link className="text-[#da4c00]" href="/">Home</Link></li>
                    {
                        path_arr.map((path, idx) => {
                            const isLast = idx === path_arr.length - 1
                            return (
                                <li className="capitalize" key={`bread-${idx}`}>
                                    {isLast ? (
                                        <span >{path.slug_name}</span>
                                    ) : (
                                        <Link className="text-[#f36c23]" href={path.slug}>{path.slug_name}</Link>
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
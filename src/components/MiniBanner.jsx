export default function MiniBanner({ bg_img, pageName }){
    return(
        <>
            <section className="mini-banner" style={{backgroundImage: `url("${bg_img}")`}}>
                <div className="wrapper w-full h-full flex flex-col justify-center items-center">
                    <h1 className="relative z-10">{pageName}</h1>
                </div>
            </section>
        </>
    )
}
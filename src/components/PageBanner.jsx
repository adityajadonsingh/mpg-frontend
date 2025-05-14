export default function PageBanner({ pageName, imgUrl, short_content }) {
  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `url(${imgUrl})` }}>
        <div className="wrapper relative z-10">
          <h1 className="text-center">{pageName}</h1>
          {
            short_content !== "" ? <p>{short_content}</p> : null 
          }
        </div>
      </section>
    </>
  );
}

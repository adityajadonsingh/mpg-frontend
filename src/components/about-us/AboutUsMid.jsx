export default function AboutUsMid({ cardData }) {
  return (
    <>
      <section className="about-cards md:py-10 pb-5">
        <div className="wrapper">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 sm:px-6">
            {cardData.map((item, idx) => {
              return (
                <div className="card text-center w-full h-full xl:py-18 lg:py-16 md:py-10 py-6 xl:px-8 px-6 bg-[#F2F2F2] rounded-md shadow-md">
                  <div className="icn">
                    <img
                      src={item.icon_url}
                      className="w-20 h-20 mx-auto"
                      alt={item.icon_alt}
                    />
                  </div>
                  <h4 className="md:mt-8 mt-4 md:mb-6 mb-4 lg:text-2xl text-xl font-bold">
                    {item.title}
                  </h4>
                  <p className="md:text-base text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

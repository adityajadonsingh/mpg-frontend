import Link from "next/link";
import Image from "next/image";

export default function CataloguesGrid({ catalogues }) {
  console.log(catalogues);
  return (
    <>
      <section className="catalogues py-10">
        <div className="wrapper">
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {catalogues.map((catalogue, idx) => (
              <div key={`card-${idx}`} className="card group">
                <Link href={catalogue.pdf_file} target="_blank">
                  <div className="relative w-full md:h-60 sm:h-52 h-36">
                    <Image
                      src={catalogue.thumbnail}
                      alt=""
                      fill
                      className="object-contain md:h-60 sm:h-52 h-36"
                    />
                  </div>
                  <h2 className="md:text-lg text-base mt-3 text-center font-semibold group-hover:text-[#f36c23]">{catalogue.name}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

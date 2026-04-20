"use client";

import Link from "next/link";
import Image from "next/image";

export default function CataloguesGrid({ catalogues }) {
  return (
    <section className="catalogues py-10">
      <div className="wrapper">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {catalogues.map((catalogue, idx) => (
            <div key={`card-${idx}`} className="card group relative">
              {/* DOWNLOAD BUTTON */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  const response = await fetch(catalogue.pdf_file);
                  const blob = await response.blob();
                  const blobUrl = window.URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = catalogue.brochure_name + ".pdf";
                  document.body.appendChild(link);
                  link.click();

                  link.remove();
                  window.URL.revokeObjectURL(blobUrl);
                }}
                className="absolute top-3 right-3 z-20 px-2 py-1 rounded-sm bg-[#f36c23] text-white hover:bg-white hover:text-[#f36c23] transition"
              >
                <i className="bi bi-download"></i>
              </button>

              {/* CARD LINK */}
              <Link href={catalogue.pdf_file} target="_blank">
                <div className="relative w-full md:h-60 sm:h-52 h-36">
                  <Image
                    src={catalogue.thumbnail}
                    alt={catalogue.name}
                    fill
                    className="object-contain md:h-60 sm:h-52 h-36"
                  />
                </div>

                <h2 className="md:text-lg text-base mt-3 text-center font-semibold group-hover:text-[#f36c23]">
                  {catalogue.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

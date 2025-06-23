import { getContactDetails } from "@/lib/api/contactDetails";
import Link from "next/link";

export default async function ContactInfo() {
  const contactDetails = await getContactDetails();
  return (
    <>
      <section className="contact-info mt-10 mb-10">
        <div className="wrapper">
          <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-5 gap-2">
            <div className="card rounded-sm md:p-6 p-3 shadow-md hover:shadow-lg w-full h-full flex flex-col items-center text-center">
              <div className="icn">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <h2>Have a talk</h2>
              <p>
                <Link href={`tel:${contactDetails.phones[0]}`}>
                  {contactDetails.phones[0]}
                </Link>
              </p>
            </div>
            <div className="card rounded-sm md:p-6 p-3 shadow-md hover:shadow-lg w-full h-full flex flex-col items-center text-center">
              <div className="icn">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <h2>Email Us On</h2>
              <p>
                <Link href={`mailto:${contactDetails.emails[0]}`}>
                  {contactDetails.emails[0]}
                </Link>
              </p>
            </div>
            
            <div className="card rounded-sm md:p-6 p-3 shadow-md hover:shadow-lg w-full h-full flex flex-col items-center text-center">
              <div className="icn">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h2>Locate us at</h2>
              <p>{contactDetails.address}</p>
            </div>
            <div className="card rounded-sm md:p-6 p-3 shadow-md hover:shadow-lg w-full h-full flex flex-col items-center text-center">
              <div className="icn">
                <i className="bi bi-clock-fill"></i>
              </div>
              <h2>Operating Time</h2>
              <p>7 AM to 4 PM</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

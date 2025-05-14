"use client";
import { useState } from "react";
import Popup from "@/components/Popup";
export default function ContactForm() {
  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      setPopupMessage("Please agree to the terms before submitting.");
      return;
    } else if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phone_number === "" ||
      formData.message === ""
    ) {
      setPopupMessage("Please fill all details !");
      return;
    } else if (!/^[+\d][\d\s-]*$/.test(formData.phone_number)) {
      setPopupMessage(
        "Phone number must contain only digits, spaces, hyphens, or start with '+'!"
      );
      return;
    }

    // Remove `consent` from data before sending
    const { consent, ...dataToSend } = formData;
    setPopupMessage("Message sent successfully!");

    try {
      // Send to external API
      const postRes = await fetch(
        "https://mpg-backend-production.up.railway.app/api/contact/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!postRes.ok) throw new Error("External API failed");

      // Optional: If you implement a mail API later, use this

      const emailRes = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSend, type: "contact" }),
      });

      const emailResult = await emailRes.json();
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      setPopupMessage("Submission failed");
    }
  };

  return (
    <>
      {popupMessage && (
        <Popup
          message={popupMessage}
          duration={3000}
          onClose={() => setPopupMessage("")}
        />
      )}
      <section className="contact-home pb-10">
        <div className="wrapper">
          <div className="grid grid-cols-2">
            <div className="content my-auto px-8">
              <h2 className="heading mb-4">
                Contact us to discuss your Project today
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                temporibus harum, sapiente nostrum numquam quas nesciunt vitae
                eos dolor minus ipsam. Aut optio aliquam temporibus perspiciatis
                quos voluptatem culpa porro iste vero ipsa vitae in cumque
                dignissimos harum, voluptatum minus!
              </p>
            </div>
            <div className="form-div">
              <form onSubmit={handleSubmit} className="space-y-4 w-2/3 m-auto">
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-100"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-100"
                  required
                />
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="PHONE"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-100
                  required
                  "
                />
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-3 bg-gray-100"
                  rows={4}
                  required
                />
                <label className="flex items-start space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I am happy to give you personal data because I know you'll
                    keep it safe and secure, please keep me up to date with your
                    news and special offers.
                  </span>
                </label>
                <button
                  type="submit"
                  className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 cursor-pointer"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Popup from "@/components/Popup";

export default function ContactForm({ isContactPage = false }) {
  const [popupMessage, setPopupMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef();

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

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
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
    } else if (!captchaToken) {
      setPopupMessage("Please complete the captcha!");
      return;
    }

    try {
      // ✅ Verify captcha first with your API
      const captchaRes = await fetch("/api/verifyCaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaRes.ok) {
        setPopupMessage("Captcha verification failed. Please try again.");
        return;
      }

      const { consent, ...dataToSend } = formData;

      // ✅ Send to external API
      const postRes = await fetch(
        "https://backend.mpgstone.co.uk/api/contact/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!postRes.ok) throw new Error("External API failed");

      // ✅ Send to your internal API
      const emailRes = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSend, type: "contact" }),
      });
      if (!emailRes.ok) throw new Error("Email API failed");

      setPopupMessage("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        message: "",
        consent: false,
      });
      setCaptchaToken("");
      recaptchaRef.current.reset();
    } catch (err) {
      console.error(err);
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
      <section className="contact-home pb-10 scroll-mt-28" id="contactForm">
        <div className="wrapper">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {isContactPage ? (
              <div className="contact-map w-full md:h-full h-60 md:pb-0 pb-8 overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1261703.2816718512!2d-2.8678275133941526!3d51.85613199156033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876044584955555%3A0x80c9a38bec6df4a7!2sAllstone%20Products%20Ltd!5e0!3m2!1sen!2sin!4v1750402691369!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <div className="content my-auto lg:px-8 pr-4 md:pb-0 pb-8 ">
                <h2 className="heading mb-4">
                  Contact us to discuss your Project today now
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  temporibus harum, sapiente nostrum numquam quas nesciunt vitae
                  eos dolor minus ipsam. Aut optio aliquam temporibus
                  perspiciatis quos voluptatem culpa porro iste vero ipsa vitae
                  in cumque dignissimos harum, voluptatum minus!
                </p>
              </div>
            )}

            <div className="form-div">
              <form
                onSubmit={handleSubmit}
                className={`space-y-4 ${
                  isContactPage ? "sm:w-10/12" : "lg:w-2/3"
                }  w-full m-auto`}
              >
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
                  className="w-full border border-gray-300 rounded p-3 bg-gray-100"
                  required
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

                {/* ✅ Classic visible reCAPTCHA */}
                <ReCAPTCHA
                  sitekey={"6LeXonMrAAAAAGtX_r67cVdX-OFictaSFfINO5GM"}
                  onChange={handleCaptchaChange}
                  ref={recaptchaRef}
                />

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

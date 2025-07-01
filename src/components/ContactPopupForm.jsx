"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";

export default function ContactPopupForm({
  isOpen,
  setIsOpen,
  productName,
  setPopupMessage,
}) {
  const [formData, setFormData] = useState({
    product_name: "",
    name: "",
    email: "",
    phone_number: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        product_name: productName || "",
        name: "",
        email: "",
        phone_number: "",
        message: "",
        consent: false,
      });
      setPopupMessage(""); // Clear previous message when reopening
    }
  }, [isOpen, productName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      setPopupMessage("Please fill all details!");
      return;
    } else if (!/^[+\d][\d\s-]*$/.test(formData.phone_number)) {
      setPopupMessage("Invalid phone number format!");
      return;
    }

    const { consent, ...dataToSend } = formData;

    console.log("Submitting form:", dataToSend); // Optional: for debugging

    try {
      const captchaRes = await fetch("/api/verifyCaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaRes.ok) {
        setPopupMessage("Captcha verification failed. Please try again.");
        return;
      }
      const res1 = await fetch(
        "https://backend.mpgstone.co.uk/api/enquiry/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      const res2 = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSend, type: "product" }),
      });

      if (!res1.ok || !res2.ok) {
        throw new Error("API response not ok");
      }

      setPopupMessage("Message sent successfully!");
      setFormData({
        product_name: productName || "",
        name: "",
        email: "",
        phone_number: "",
        message: "",
        consent: false,
      });
      setIsOpen(false); // Close only after successful submission
    } catch (err) {
      console.error("Submission error:", err);
      setPopupMessage("Submission failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000086] bg-opacity-50 z-[99999] backdrop-blur-[2px] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-[95%] relative shadow-lg">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-3xl cursor-pointer text-gray-600 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <ReCAPTCHA
                  sitekey={"6LeXonMrAAAAAGtX_r67cVdX-OFictaSFfINO5GM"}
                  onChange={handleCaptchaChange}
                  ref={recaptchaRef}
                />
          <label className="hidden items-start space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the terms and want to stay updated with offers.
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
  );
}

"use client";
import { useEffect, useState } from "react";
import { getProductReview } from "@/lib/api/reviews";
import Popup from "@/components/Popup";

export default function ProductReviews({ product_id }) {
  const [popupMessage, setPopupMessage] = useState("");
  const [form, setForm] = useState({
    product_id,
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await getProductReview(product_id);
      setReviews(data);
    }
    fetchReviews();
  }, [product_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product_id,
      name: form.name,
      email: form.email,
      rating: form.rating,
      comment: form.comment,
    };

    try {
      const res = await fetch(
        "https://backend.mpgstone.com/api/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(payload)
      if (!res.ok) throw new Error("Failed to submit review");

      setPopupMessage("Review submitted!");
      setForm({ product_id, name: "", email: "", comment: "", rating: 0 });

      const updatedReviews = await getProductReview(product_id);
      setReviews(updatedReviews);
    } catch (err) {
      setPopupMessage("Something went wrong.");
    }
  };
  const activeReviews = reviews.filter((review) => review.is_active === true);
  return (
    <>
      {/* Show Reviews */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        <div className="space-y-4">
          {activeReviews.map((review, idx) => (
            <div key={idx} className=" p-4 rounded-md shadow-sm bg-white">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{review.name}</h4>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${
                        review.rating >= star
                          ? "bi-star-fill text-yellow-400"
                          : "bi-star text-gray-300"
                      } text-sm`}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Review"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          rows="4"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          required
        />

        {/* Star Rating */}
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`bi ${
                (hoverRating || form.rating) >= star
                  ? "bi-star-fill text-yellow-400"
                  : "bi-star text-gray-300"
              } text-xl cursor-pointer transition-colors duration-200`}
              onClick={() => setForm({ ...form, rating: star })}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
            ></i>
          ))}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-800 transition"
        >
          Submit Review
        </button>
      </form>
      {popupMessage && (
        <Popup
          message={popupMessage}
          duration={3000}
          onClose={() => setPopupMessage("")}
        />
      )}
    </>
  );
}

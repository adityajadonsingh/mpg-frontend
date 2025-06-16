"use client";

import { useEffect, useState } from "react";
import Popup from "@/components/Popup";

export default function CommentSection({ blogId, blogTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all comments and filter by blogId
  const fetchComments = async () => {
    try {
      const res = await fetch("https://backend.mpgstone.co.uk/api/comments/");
      if (!res.ok) throw new Error("Failed to load comments");
      const data = await res.json();

      const filteredComments = data.filter(
        (comment) => String(comment.blog_id) === String(blogId)
      );

      setComments(filteredComments.reverse()); // latest first
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPopupMessage("");

    try {
      const response = await fetch(
        "https://backend.mpgstone.co.uk/api/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blog_id: blogId,
            name: formData.name,
            email: formData.email,
            comment: formData.comment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");

      setPopupMessage("Comment submitted successfully!");
      setFormData({ name: "", email: "", comment: "" });

      await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "blog",
          name: formData.name,
          email: formData.email,
          message: formData.comment,
          blog_name: blogTitle, 
        }),
      });
    } catch (error) {
      setPopupMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      <div className="blog-comments mt-8">
        <h4 className="font-semibold text-xl mb-4">Comments</h4>
        <div className="space-y-6 mb-8">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} className="bg-gray-100 p-4 flex rounded shadow">
                <div className="flex">
                  <img
                    src="/media/user.png"
                    className="blog-img block w-[50px] h-[50px] mr-4"
                    alt={c.name}
                  />
                  <div className="user-cmt">
                    <p className="font-medium">
                      {c.name}{" "}
                      <span className="text-gray-500 block text-sm">
                        ({c.email})
                      </span>
                    </p>
                    <p className="text-gray-700 mt-1">{c.comment}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        <h4 className="font-semibold text-xl mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your comment..."
            required
            className="w-full border border-gray-300 rounded-md p-4 min-h-[120px]"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="flex-1 border border-gray-300 rounded-md p-3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="flex-1 border border-gray-300 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md transition cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

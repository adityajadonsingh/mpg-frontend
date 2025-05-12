"use client";
import { useEffect, useState } from "react";

export default function Popup({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setAnimate(true), 50);

    const timer = setTimeout(() => {
      setAnimate(false); // Trigger fade-out
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 300); // Wait for fade-out transition
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 popup-z transition-all duration-300 ease-in-out ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-green-600 text-white px-6 py-3 rounded shadow-lg">
        {message}
      </div>
    </div>
  );
}

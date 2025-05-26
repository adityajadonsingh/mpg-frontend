import { useState, useRef, useEffect } from "react";

export default function ProductAttributes({accordionData}) {


  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    accordionData.forEach((_, index) => {
      const el = contentRefs.current[index];
      if (el) {
        if (openIndex === index) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [openIndex, accordionData]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Attributes</h2>
      {accordionData.map((item, index) => (
        <div key={index} className={`border-b border-gray-300 ${
                openIndex === index ? "bg-white" : ""
              }`}>
          <button
            onClick={() => toggleItem(index)}
            className={`w-full text-left py-3 px-3 rounded-sm flex justify-between items-center font-medium hover:bg-white cursor-pointer ${
                openIndex === index ? "!bg-[#c35718] text-white" : "bg-transparent"
              }`}
            
          >
            <span>{item.title}</span>
            <span
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
             <i className="bi bi-chevron-down"></i>
            </span>
          </button>

          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="overflow-hidden transition-all duration-500  ease-in-out max-h-0"
          >
            <div className="p-3 text-sm text-gray-700">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

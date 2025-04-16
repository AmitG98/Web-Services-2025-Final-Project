import React, { useState } from "react";

function Dropdown({ options, selectedOption, onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-40">
      <button
        className=" text-xs w-full h-8 border border-gray-600 rounded-md bg-transparent text-white px-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 text-white rounded shadow-lg mt-1 border border-gray-600 z-10 max-h-32 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 text-xs hover:bg-gray-700 cursor-pointer custom-scrollbar"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

import React, { useState } from "react";
import { ReactComponent as Circle } from "../../assets/icons/Ellipse 4.svg";
import { ReactComponent as Plus } from "../../assets/icons/Vector.svg";

const AddProfileButton = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
  
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
      setIsOpen(false);
      setName("");
    };
    const handleSubmit = () => {
      if (name.trim()) {
        onAdd(name.trim());
        handleClose();
      }
    };
  
    return (
      <>
        <div onClick={handleOpen} className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="relative w-20 h-20">
            <Circle className="w-full h-full" />
            <Plus className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-sm text-gray-400">Add Profile</span>
        </div>
  
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#141414] p-6 rounded-lg shadow-lg w-80 space-y-4">
              <h2 className="text-white text-xl font-semibold">Add New Profile</h2>
              <input
                className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                placeholder="Enter profile name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button onClick={handleClose} className="px-4 py-1 text-sm bg-gray-600 rounded hover:bg-gray-500 text-white">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="px-4 py-1 text-sm bg-red-600 rounded hover:bg-red-500 text-white">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default AddProfileButton;
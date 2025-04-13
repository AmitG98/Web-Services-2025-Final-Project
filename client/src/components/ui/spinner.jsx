import React from "react";
import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <Loader className="animate-spin text-white w-6 h-6" />
    </div>
  );
};

export default Spinner;

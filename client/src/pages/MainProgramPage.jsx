// MainProgramPage.jsx
import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";

const MainProgramPage = ({ contentType = "all" }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={contentType} />
      </div>

      <h1 className="text-white text-3xl text-center pt-20">
        This is the {contentType} page
      </h1>
    </div>
  );
};

export default MainProgramPage;

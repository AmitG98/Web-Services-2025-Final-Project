import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import HighlightBanner from "../components/coreUi/HighlightBanner";
import { useProgramList } from "../hooks/useProgramList";

const MainProgramPage = ({ contentType = "all" }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const { data: bannerOptions } = useProgramList({
    query: "popular",
    type: contentType === "all" ? "movie" : contentType,
  });

  const randomIndex = Math.floor(Math.random() * (bannerOptions?.length || 0));
  const randomBanner = bannerOptions?.[randomIndex];

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={contentType} />
      </div>

      <HighlightBanner program={randomBanner} />

      <h1 className="text-white text-3xl text-center pt-20">
        This is the {contentType} page
      </h1>

      <MainFooter />
    </div>
  );
};

export default MainProgramPage;

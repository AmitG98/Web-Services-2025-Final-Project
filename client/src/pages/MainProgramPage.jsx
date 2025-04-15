import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import HighlightBanner from "../components/coreUi/HighlightBanner";
import { useProgramList } from "../hooks/useProgramList";

import FreshArrivals from "../components/Rows/2-FreshArrivals";
import TopWeeklyHits from "../components/Rows/3-TopWeeklyHits";
import RecentReviewsByUser from "../components/Rows/4-RecentReviewsByUser";
import CriticsChoice from "../components/Rows/5-CriticsChoice";
import ToonWorld from "../components/Rows/6-ToonWorld";
import EditorPicks from "../components/Rows/7-EditorPicks";
import MyWatchlistRow from "../components/Rows/8-MyWatchlistRow";

const MainProgramPage = ({ contentType = "all" }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const { data: bannerOptions } = useProgramList({
    query: "popular",
    type: contentType === "all" ? "movie" : contentType,
  });

  const randomIndex = Math.floor(Math.random() * (bannerOptions?.length || 0));
  const randomBanner = bannerOptions?.[randomIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={contentType} />
      </div>

      <main className="flex-grow pt-24">
        <HighlightBanner program={randomBanner} />

        {/* <h1 className="text-white text-3xl text-center pt-20">
          This is the {contentType} page
        </h1> */}
        <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
          {/* <SmartMatches setSelected={setSelectedProgram} type={contentType} /> */}
          <FreshArrivals
            setSelectedMovie={setSelectedProgram}
            type={contentType}
          />
          <TopWeeklyHits
            setSelectedMovie={setSelectedProgram}
            type={contentType}
          />
          <RecentReviewsByUser setSelectedMovie={setSelectedProgram} />
          <CriticsChoice
            setSelectedMovie={setSelectedProgram}
            type={contentType}
          />
          <ToonWorld setSelectedMovie={setSelectedProgram} type={contentType} />
          <EditorPicks
            setSelectedMovie={setSelectedProgram}
            type={contentType}
          />
          <MyWatchlistRow setSelectedMovie={setSelectedProgram} />
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default MainProgramPage;

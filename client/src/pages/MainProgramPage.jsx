import React, { useState, useEffect } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import ContentRow from "../components/coreUi/ContentRow";
import HeroSection from "../components/coreUi/HeroSection";
import {
  useHomepagePrograms,
  useNewAndPopularList,
} from "../hooks/useProgramList";
import MoreInfo from "./MoreInfo";

const MainProgramPage = ({ contentType = "all" }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const { data: bannerOptions = [] } = useNewAndPopularList({
    queryKey: ["newAndPopular", 4],
  });

  const {} = useHomepagePrograms({
    query: "popular",
    type: contentType === "all" ? "movie" : contentType,
  });

  useEffect(() => {
    if (bannerOptions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerOptions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerOptions]);

  const currentBanner = bannerOptions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={contentType} />
      </div>

      <main className="flex-grow pt-0">
        {/* <HeroSection program={currentBanner} /> */}
        <HeroSection
          program={currentBanner}
          onMoreInfoClick={(program) => {
            setSelectedProgram(program);
            setMoreInfoOpen(true);
          }}
        />

        <div className="relative z-10 px-3 sm:px-10 lg:px-20 pt-20 space-y-12">
          {/*row1-recommended	התאמות אישיות למשתמש*/}
          <ContentRow
            title="Matched to You"
            queryKey="personalized"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          {/* row2-newest	התכנים הכי חדשים בנטפליקס */}
          <ContentRow
            title="New on Netflix"
            queryKey="newest"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          <ContentRow
            title="Top 10 in Israel Today"
            queryKey="mostWatched"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          <ContentRow
            title="Last 10 reviewed programs"
            queryKey="recentReviews"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          <ContentRow
            title="Top-rated programs"
            queryKey="topRated"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          {/* row6-animated	תוכניות מקטגוריית אנימציה */}
          <ContentRow
            title="Animation"
            queryKey="animated"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          {/* row7-custom	תוכניות מקטגוריה לבחירתכם */}
          <ContentRow
            title="Comedy"
            queryKey="custom"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />

          <ContentRow
            title="My List"
            queryKey="myList"
            type={contentType}
            onProgramClick={(program) => {
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />
        </div>
      </main>

      {moreInfoOpen && selectedProgram && (
        <MoreInfo
          isOpen={moreInfoOpen}
          onClose={() => setMoreInfoOpen(false)}
          program={selectedProgram}
        />
      )}

      <MainFooter />
    </div>
  );
};

export default MainProgramPage;

import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import ContentRow from "../components/coreUi/ContentRow";
import HeroSection from "../components/coreUi/HeroSection";
import { useHomepagePrograms } from "../hooks/useProgramList";

const MainProgramPage = ({ contentType = "all" }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const { data: bannerOptions } = useHomepagePrograms({
    query: "popular",
    type: contentType === "all" ? "movie" : contentType,
  });

  const randomIndex = Math.floor(Math.random() * (bannerOptions?.length || 0));
  const randomBanner = bannerOptions?.[randomIndex] || {
    title: "House Of Ninjas",
    overview:
      "Years after retiring from their formidable ninja lives, a dysfunctional family must return to shadowy missions to counteract a string of looming threats.",
    backdrop_path: "HouseOfNinjas-Hero.png",
  };
  console.log("🎬 randomBanner:", randomBanner);

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={contentType} />
      </div>

      <main className="flex-grow pt-0">
        <HeroSection program={randomBanner} />

        <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
          <ContentRow
            title="Matched to You"
            queryKey="MatchedToYou"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="New on Netflix"
            queryKey="newest"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="Top 10 in Israel Today"
            queryKey="mostWatched"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="Last 10 reviewed programs"
            queryKey="recentReviews"
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="Top-rated programs"
            queryKey="topRated"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="Animation"
            queryKey="animated"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="Comedy"
            queryKey="custom"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          <ContentRow
            title="My List"
            queryKey="myList"
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default MainProgramPage;

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
          {/*row1-recommended	התאמות אישיות למשתמש*/}
          <ContentRow
            title="Matched to You"
            queryKey="personalized"
            type={contentType}
          />

          {/* row2-newest	התכנים הכי חדשים בנטפליקס */}
          <ContentRow
            title="New on Netflix"
            queryKey="newest"
            type={contentType}
          />

          {/* row3-mostWatched	הכי נצפים השבוע בארץ*/}
          <ContentRow
            title="Top 10 in Israel Today"
            queryKey="mostWatched"
            type={contentType}
          />

          {/* row4-userReviews	ביקורות אחרונות של המשתמש */}
          <ContentRow
            title="Last 10 reviewed programs"
            queryKey="recentReviews"
          />

          {/* row5-topRated	תוכניות עם דירוג גבוה */}
          <ContentRow
            title="Top-rated programs"
            queryKey="topRated"
            type={contentType}
          />

          {/* row6-animated	תוכניות מקטגוריית אנימציה */}
          <ContentRow
            title="Animation"
            queryKey="animated"
            type={contentType}
          />

          {/* row7-custom	תוכניות מקטגוריה לבחירתכם */}
          <ContentRow
            title="Action"
            queryKey="custom"
            type={contentType}
          />

          {/* row8-myList	התוכניות האחרונות שנוספו לרשימת הצפייה */}
          <ContentRow
            title="My List"
            queryKey="myList"
          />
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default MainProgramPage;

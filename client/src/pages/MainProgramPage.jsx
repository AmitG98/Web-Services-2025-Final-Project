import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import ContentRow from "../components/coreUi/ContentRow";
import HighlightBanner from "../components/coreUi/HighlightBanner";
import { useHomepagePrograms } from "../hooks/useProgramList";

const MainProgramPage = ({ contentType = "all" }) => {
  const [setSelectedProgram] = useState(null);
  const [setMoreInfoOpen] = useState(false);

  const { data: bannerOptions } = useHomepagePrograms({
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

        <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
          {/*row1-recommended	התאמות אישיות למשתמש*/}

          {/* row2-newest	התכנים הכי חדשים בנטפליקס - working with DB */}
          <ContentRow
            title="New on Netflix"
            queryKey="newest"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row3-mostWatched	הכי נצפים השבוע בארץ*/}
          <ContentRow
            title="Top 10 This Week in Israel"
            queryKey="mostWatched"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row4-userReviews	ביקורות אחרונות של המשתמש */}
          <ContentRow
            title="Your Recent Reviews"
            queryKey="recentReviews"
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row5-topRated	תוכניות עם דירוג גבוה */}
          <ContentRow
            title="Critics' Choice"
            queryKey="topRated"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row6-animated	תוכניות מקטגוריית אנימציה - working with DB*/} 
          <ContentRow
            title="Animation Zone"
            queryKey="animated"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row7-custom	תוכניות מקטגוריה לבחירתכם - working with DB */}
          <ContentRow
            title="Editor's Picks"
            queryKey="custom"
            type={contentType}
            setSelectedProgram={setSelectedProgram}
            setMoreInfoOpen={setMoreInfoOpen}
          />

          {/* row8-myList	התוכניות האחרונות שנוספו לרשימת הצפייה */}
          <ContentRow
            title="My Watchlist"
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

import React from "react";
import { useHomepagePrograms } from "../../hooks/useProgramList";
import Spinner from "../ui/spinner";
import ProgramCard from "../coreUi/ProgramCard";
import MoreInfo from "../../pages/MoreInfo";

const FreshArrivals = ({ setSelectedProgram, setMoreInfoOpen, type }) => {
  const { data, isLoading, isError } = useHomepagePrograms({ query: "newest", type });
  const content = data?.newest;

  if (isLoading) return <Spinner />;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">New on Netflix</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {content?.map((program) => (
            <ProgramCard
              key={program._id}
              program={program}
              onClick={() => {
                setSelectedProgram(program);
                setMoreInfoOpen(true);
              }}
            />
          ))}
        </div>
      </div>
      <MoreInfo />
    </section>
  );
};

export default FreshArrivals;

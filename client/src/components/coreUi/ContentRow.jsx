import React from "react";
import { useHomepagePrograms } from "../../hooks/useProgramList";
import ProgramCard from "./ProgramCard";
import Spinner from "../ui/spinner";
// import MoreInfo from "../../pages/MoreInfo";
import { useProfilesList } from "../../hooks/useUserProfiles";
import { addInteraction } from "../../api/logs";

const ContentRow = ({
  title,
  queryKey,
  type,
  setSelectedProgram,
  setMoreInfoOpen,
}) => {
  const { data, isLoading, isError } = useHomepagePrograms({ type });
  const { data: profile } = useProfilesList();

  const content = data?.[queryKey];

  // const handleClick = async (program) => {
  //   if (profile?._id && program?._id) {
  //     await addInteraction(profile._id, program._id, "click");
  //   }
  //   setSelectedProgram(program);
  //   setMoreInfoOpen(true);
  // };
  if (isLoading) return <Spinner />;
  if (isError || !content) return null;

  return (
    <section className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">{title}</h3>

      <div className="relative flex items-center w-full">
      <div className="w-full flex gap-2 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide">
      {content.map((program) => (
          <ProgramCard
            key={`${program.type}-${program.tmdbId || program._id || program.id}`}
            program={program}
            onClick={() => {
              addInteraction(profile?._id, program._id, "click");
              setSelectedProgram(program);
              setMoreInfoOpen(true);
            }}
          />
        ))}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;

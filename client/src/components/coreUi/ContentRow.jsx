import React from "react";
import { useHomepagePrograms } from "../../hooks/useProgramList";
import ProgramCard from "./ProgramCard";
import Spinner from "../ui/spinner";
// import MoreInfo from "../../pages/MoreInfo";
// import { useProfilesList } from "../../hooks/useUserProfiles";
// import { addInteraction } from "../../api/logs";

const ContentRow = ({
  title,
  queryKey,
  type,
  onProgramClick,
}) => {

  const { data, isLoading, isError } = useHomepagePrograms({ query: queryKey, type });
// const { data: profile } = useProfilesList();
  const content = data?.[queryKey];
  
  if (isLoading) return <Spinner />;
  if (isError || !content) return null;

  return (
    <section className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">{title}</h3>
      <div className="relative w-full overflow-x-auto scroll-smooth">
        <div className="inline-flex gap-2 px-2">
          {content.map((program) => (
            <ProgramCard
              key={`${program.type}-${program.tmdbId || program._id || program.id}`}
              program={program.program || program}
              onClick={(program) => onProgramClick?.(program)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;

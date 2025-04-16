import { useQuery } from "@tanstack/react-query";
import { getProgramDetails } from "../api/program";

export const useProgramDetails = (tmdbId, type = "movie") => {
  return useQuery({
    queryKey: ["program", tmdbId],
    queryFn: () => getProgramDetails(tmdbId, type),
    enabled: !!tmdbId,
  });
};

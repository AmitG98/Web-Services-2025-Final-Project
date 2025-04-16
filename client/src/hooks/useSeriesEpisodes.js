import { useQuery } from "@tanstack/react-query";
import axios from "../api/axiosClient";

export const useSeriesEpisodes = (seriesId, seasonNumber = 1) => {
  return useQuery({
    queryKey: ["episodes", seriesId, seasonNumber],
    queryFn: async () => {
      const { data } = await axios.get(`/programs/episodes/${seriesId}/${seasonNumber}`);
      return data;
    },
    enabled: !!seriesId,
  });
};
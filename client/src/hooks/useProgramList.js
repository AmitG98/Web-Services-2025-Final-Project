import { useQuery } from "@tanstack/react-query";
import { getHomepageContent as getPrograms } from "../api/program";
import { toast } from "sonner";

export const useProgramList = (filters = {}) => {
  return useQuery({
    queryKey: ["programList", filters],
    queryFn: () => getPrograms(filters),
    onError: (err) => {
      toast.error("Failed to load content", {
        description: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    },
    refetchOnWindowFocus: false,
  });
};
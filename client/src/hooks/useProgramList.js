import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchHomepageContent,
  fetchNewAndPopular,
  getProgramDetails,
  getProgramsByType,
  searchPrograms,
  createProgram
} from "../api/program";
import { toast } from "sonner";

export const useHomepagePrograms = (filters = {}) => {
  return useQuery({
    queryKey: ["homepage-programs", filters],
    queryFn: () => fetchHomepageContent(filters),
    onError: (err) =>
      toast.error("Failed to load homepage", {
        description: err?.response?.data?.message || "Try again.",
      }),
    refetchOnWindowFocus: false,
  });
};

export const useProgramList = (type) =>
  useQuery({
    queryKey: ["ProgramsByType", type],
    queryFn: () => getProgramsByType(type),
    refetchOnWindowFocus: false,
});

export const useNewAndPopularList = (limit = 90) =>
  useQuery({
    queryKey: ["newAndPopular", limit],
    queryFn: fetchNewAndPopular,
    refetchOnWindowFocus: false,
  });

export const useProgramDetails = (id, type = "movie") =>
  useQuery({
    queryKey: ["program-detail", id, type],
    queryFn: () => getProgramDetails(id, type),
    enabled: !!id,
    onError: () => toast.error("Couldn't fetch details"),
  });

export const useProgramSearch = (params = {}) =>
  useQuery({
    queryKey: ["search", params],
    queryFn: () => searchPrograms(params),
    onError: () => toast.error("Search failed"),
    refetchOnWindowFocus: false,
  });

export const useAddNewProgram = () =>
  useMutation({
    mutationFn: createProgram,
    onSuccess: () => toast.success("Program added"),
    onError: () => toast.error("Adding program failed"),
  });

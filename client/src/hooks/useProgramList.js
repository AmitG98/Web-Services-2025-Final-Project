import { useQuery } from "@tanstack/react-query";
// import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchHomepageContent,
  getProgramsByType,
  // getProgramDetails,
  // createProgram,
  // searchPrograms
} from "../api/program";
import { toast } from "sonner";

// Homepage content
export const useHomepagePrograms = (filters = {}) => {
  console.log("📤 Sending request to /programs/home with filters:", filters);
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

// General program list by filters
export const useProgramList = (type = "movie") =>
  useQuery({
    queryKey: ["programs", type],
    queryFn: () => getProgramsByType(type),
    onError: () =>
      toast.error("Failed to load programs", {
        description: "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });

// // Program details by ID
// export const useProgramDetails = (id, type = "movie") =>
//   useQuery({
//     queryKey: ["program-detail", id, type],
//     queryFn: () => getProgramDetails(id, type),
//     enabled: !!id,
//     onError: () => toast.error("Couldn't fetch details"),
//   });

// // Program search
// export const useProgramSearch = (params = {}) =>
//   useQuery({
//     queryKey: ["search", params],
//     queryFn: () => searchPrograms(params),
//     onError: () => toast.error("Search failed"),
//     refetchOnWindowFocus: false,
//   });

// // Add a new program
// export const useAddNewProgram = () =>
//   useMutation({
//     mutationFn: createProgram,
//     onSuccess: () => toast.success("Program added"),
//     onError: () => toast.error("Adding program failed"),
//   });

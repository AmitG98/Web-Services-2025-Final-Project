import { useMutation, useQuery } from "@tanstack/react-query";
import { addReview, getMyReviews } from "../api/review";
import { toast } from "sonner";

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: addReview,
    onMutate: (data) => {
      console.log("📡 Submitting via useMutation:", data);
    },
    onSuccess: () => {
      toast.success("Review posted!");
    },
    onError: (err) => {
      toast.error("Couldn't post review", {
        description: err?.response?.data?.message || "Please try again.",
      });
    },
  });
};

export const useRecentReviews = () =>
  useQuery({
    queryKey: ["user-reviews"],
    queryFn: getMyReviews,
    onError: (err) => {
      toast.error("Failed to fetch reviews", {
        description: err?.response?.data?.message || "Try later.",
      });
    },
    refetchOnWindowFocus: false,
  });

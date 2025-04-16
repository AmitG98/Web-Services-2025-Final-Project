import { useMutation, useQuery } from "@tanstack/react-query";
import { addReview, getMyReviews } from "../api/review";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSubmitReview = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review posted!");
      navigate("/");
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

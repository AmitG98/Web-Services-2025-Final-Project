// src/hooks/useMyMovieList.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyList, addToMyList, removeFromMyList } from "../api/myList";
import { toast } from "sonner";

export const useMyMovieList = () =>
  useQuery({
    queryKey: ["myList"],
    queryFn: getMyList,
    refetchOnWindowFocus: false,
  });

export const useAddToMyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ programId, data }) => addToMyList(programId, data),
    onMutate: () => toast.loading("Adding to your list..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Added to your list!");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.error || "Something went wrong");
    },
  });
};

export const useRemoveFromMyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (programId) => removeFromMyList(programId),
    onMutate: () => toast.loading("Removing from your list..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Removed from your list!");
      queryClient.invalidateQueries({ queryKey: ["my-list"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.error || "Failed to remove.");
    },
  });
};

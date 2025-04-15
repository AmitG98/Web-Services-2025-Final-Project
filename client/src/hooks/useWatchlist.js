import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyList, addToMyList } from "../api/myList";
import { toast } from "sonner";

export const useWatchlist = (userId) =>
  useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getMyList(userId),
    enabled: !!userId,
  });

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToMyList,
    onMutate: () => toast.loading("Adding to your list..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Added to your list!");
      queryClient.invalidateQueries(["watchlist"]);
    },
    onError: (err) => {
      toast.dismiss();
      toast.error("Failed to add", {
        description: err?.response?.data?.error,
      });
    },
  });
};

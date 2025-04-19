import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyList, addToMyList } from "../api/myList";
import { toast } from "sonner";

const loadingToastId = "adding-to-list";

export const useMyMovieList = () =>
  useQuery({
    queryKey: ["myList"],
    queryFn: getMyList,
    refetchOnWindowFocus: false,
  });

export const useAddToMyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      return addToMyList(payload);
    },
    onMutate: () => {
      toast.loading("Adding to your list...", { id: loadingToastId });
    },
    onSuccess: () => {
      toast.dismiss(loadingToastId);
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
    onError: (error) => {
      toast.dismiss(loadingToastId);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

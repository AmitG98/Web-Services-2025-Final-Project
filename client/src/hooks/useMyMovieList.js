// src/hooks/useMyMovieList.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyList, addToMyList, removeFromMyList } from "../api/myList";
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
        console.log("🚀 useAddToMyList → payload שהתקבל:", payload);
        return addToMyList(payload);
      },
      onMutate: () => {
        toast.loading("Adding to your list...", { id: loadingToastId });
      },
      onSuccess: () => {
        toast.dismiss(loadingToastId); // סוגר רק את הטוסט של ההמתנה
        queryClient.invalidateQueries({ queryKey: ["myList"] });
      },
      onError: (error) => {
        toast.dismiss(loadingToastId); // גם במקרה של שגיאה, נסגור את loading
        console.error("❌ useAddToMyList → שגיאה:", error?.response?.data);
        toast.error(error?.response?.data?.message || "Something went wrong");
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from "../api/profile";
import { toast } from "sonner";

export const useProfilesList = () =>
  useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
    refetchOnWindowFocus: false,
  });

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProfile,
    onSuccess: () => {
      toast.success("Profile added");
      queryClient.invalidateQueries(["profiles"]);
    },
    onError: () => {
      toast.error("Failed to add profile");
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      toast.success("Profile deleted");
      queryClient.invalidateQueries(["profiles"]);
    },
    onError: () => {
      toast.error("Failed to delete profile");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newName }) => updateProfile(id, { name: newName }),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries(["profiles"]);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};

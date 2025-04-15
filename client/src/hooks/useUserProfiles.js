import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProfiles, addProfile } from "../api/profile";
import { toast } from "sonner";

export const useProfilesList = () =>
  useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
    onError: (err) =>
      toast.error("Couldn't load profiles", {
        description: err?.response?.data?.message || "Please refresh.",
      }),
    refetchOnWindowFocus: false,
  });

export const useCreateProfile = () =>
  useMutation({
    mutationFn: addProfile,
    onSuccess: () => toast.success("Profile created!"),
    onError: (err) =>
      toast.error("Profile creation failed", {
        description: err?.response?.data?.message || "Try again.",
      }),
  });

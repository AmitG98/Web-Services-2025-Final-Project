import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useProfilesList,
  useCreateProfile,
  useDeleteProfile,
  useUpdateProfile,
} from "../hooks/useUserProfiles";
import ProfileCard from "../components/Profile/ProfileCard";
import AddProfileButton from "../components/Profile/AddProfileButton";
import { useSessionContext } from "../context/UserSessionProvider";

const Profiles = () => {
  const navigate = useNavigate();
  const { chooseProfile } = useSessionContext();

  const { data } = useProfilesList();
  const profiles = data || [];

  const { mutate: createProfile } = useCreateProfile();
  const { mutate: deleteProfile } = useDeleteProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const handleSelect = (profile) => {
    sessionStorage.setItem("selectedProfile", JSON.stringify(profile));
    chooseProfile(profile);
    navigate("/home");
  };

  const handleDelete = (id) => {
    deleteProfile(id);
  };

  const handleEdit = (id, newName) => {
    updateProfile({ id, newName });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Who's watching?</h1>

      <div className="flex gap-6 justify-center flex-wrap sm:flex-nowrap">
        {profiles?.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}

        {profiles?.length < 5 && (
          <AddProfileButton
            onAdd={(name) => createProfile({ name })}
          />
        )}
      </div>
    </div>
  );
};

export default Profiles;

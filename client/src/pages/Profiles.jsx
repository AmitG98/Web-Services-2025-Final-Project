import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfilesList, useCreateProfile, useDeleteProfile, useUpdateProfile } from "../hooks/useUserProfiles";
import { CustomButton } from "../components/ui/CustomButton";
import ProfileCard from "../components/ui/ProfileCard";

const Profiles = () => {
  const navigate = useNavigate();
  const { data } = useProfilesList();
  const profiles = data?.profiles || [];

  const { mutate: createProfile } = useCreateProfile();
  const { mutate: deleteProfile } = useDeleteProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const handleSelect = (profile) => {
    localStorage.setItem("selectedProfile", JSON.stringify(profile));
    navigate("/home");
  };

  const handleDelete = (id) => {
    deleteProfile(id);
  };

  const handleEdit = (id, newName) => {
    updateProfile({ id, newName });
  };

  const handleAddProfile = () => {
    const newName = prompt("Enter a name for the new profile:");
    if (newName) {
      createProfile({ name: newName });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Who's watching?</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
          <CustomButton
            onClick={handleAddProfile}
            type="secondary"
            size="lg"
            className="text-2xl font-bold w-28 h-28"
          >
            +
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Profiles;

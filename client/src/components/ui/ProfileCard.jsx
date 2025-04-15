import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const avatars = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
];

const ProfileCard = ({ profile, onSelect, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);

  const handleNameSave = () => {
    setIsEditing(false);
    if (editedName !== profile.name) {
      onEdit(profile._id, editedName);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      <div className="relative group">
        <img
          src={avatars[profile.avatarIndex]}
          alt="Profile avatar"
          className="w-24 h-24 rounded-md object-cover cursor-pointer"
          onClick={() => onSelect(profile)}
        />
        <button
          className="absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white hover:bg-red-600"
          onClick={() => onDelete(profile._id)}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isEditing ? (
        <input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
          onBlur={handleNameSave}
          className="bg-transparent border-b border-white text-center text-white outline-none w-20"
        />
      ) : (
        <div className="flex items-center gap-1">
          <span
            onClick={() => setIsEditing(true)}
            className="text-sm text-white hover:underline cursor-pointer"
          >
            {profile.name}
          </span>
          <Pencil size={12} className="text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

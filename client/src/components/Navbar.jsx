import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/authContext";

function Navbar() {
  const { logout } = useAuth();
  const [localSearchInputValue, setLocalSearchInputValue] = useState("");
  const { updateSearch } = useGlobalSearch();

  useEffect(() => {
    updateSearch(localSearchInputValue);
  }, [localSearchInputValue, updateSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Search triggered:", localSearchInputValue);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const selectedProfile = JSON.parse(localStorage.getItem("selectedProfile"));

  return (
    <nav className="mt-6 bg-transparent text-white w-screen flex items-center justify-between px-4">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" className="h-8" />
        </Link>
      </div>

      <div className="hidden lg:flex flex-row justify-between w-screen items-center">
        <div className="flex flex-row justify-around items-center w-1/2 gap-6">
          <Link to="/">
            <img src="/Logo.png" alt="Logo" className="h-8" />
          </Link>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/tv-shows" className="text-white hover:text-gray-300">
            TV Shows
          </Link>
          <Link to="/movies" className="text-white hover:text-gray-300">
            Movies
          </Link>
          <Link
            to="/new-and-popular"
            className="text-white hover:text-gray-300"
          >
            New & Popular
          </Link>
          <Link to="/my-list" className="text-white hover:text-gray-300">
            My List
          </Link>
          <Link to="/browse" className="text-white hover:text-gray-300">
            Browse
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6">
          <div className="relative border border-gray-600 rounded-md w-60 h-10 flex items-center px-3 hover:border-gray-500 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search..."
              value={localSearchInputValue}
              onChange={(e) => setLocalSearchInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent w-full h-full text-white placeholder-gray-400 outline-none pr-8"
            />
            <i
              className="fa-solid fa-magnifying-glass text-white absolute right-3 cursor-pointer"
              onClick={() =>
                console.log("Search triggered:", localSearchInputValue)
              }
            ></i>
          </div>

          <i className="fa-regular fa-bell text-xl text-white cursor-pointer"></i>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}profile-avators/${
                  selectedProfile.avatar || "default.png"
                }`}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />

              <i className="fa-solid fa-angle-down text-white"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black w-44 mt-2 rounded-md shadow-lg p-1">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User size={16} />
                <span>{selectedProfile?.username}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

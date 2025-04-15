import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import { ChevronsUpDown, Bell, Search } from "lucide-react";
import {
  CusMenuDropdown,
  CusMenuTrigger,
  CusMenuContent,
  CusMenuItem,
  CusMenuLabel,
} from "./CustomMenuDropdown";

const MainHeader = ({ activePage }) => {
  const { activeUser, logout } = useUserAuth();
  const { updateSearch } = useGlobalSearch();
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") updateSearch(input);
  };

  return (
    <header className="w-full px-4 py-3 bg-black/90 text-white flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/home" className="text-2xl font-bold tracking-wide">
          <img
            src="/Logo.png"
            alt="Netflix Logo"
            className="w-28 h-auto object-contain"
          />
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm">
          <Link
            to="/home"
            className={
              activePage === "all" ? "font-bold underline" : "opacity-70"
            }
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={
              activePage === "movie" ? "font-bold underline" : "opacity-70"
            }
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className={
              activePage === "tv" ? "font-bold underline" : "opacity-70"
            }
          >
            TV Shows
          </Link>
          <Link to="/new&popular" className="opacity-70">
            New & Popular
          </Link>
          <Link to="/my-list" className="opacity-70">
            My List
          </Link>
          <Link to="/browse" className="opacity-70">
            Browse
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-neutral-800 px-3 py-1 rounded-md text-sm w-52"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search size={16} className="absolute right-2 top-2 text-gray-400" />
        </div>

        <Bell className="cursor-pointer" />

        <CusMenuDropdown>
          <CusMenuTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={activeUser?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronsUpDown size={16} />
            </div>
          </CusMenuTrigger>

          <CusMenuContent className="w-40 bg-white text-black">
            <CusMenuLabel>{activeUser?.username}</CusMenuLabel>
            <CusMenuItem onClick={logout}>Logout</CusMenuItem>
          </CusMenuContent>
        </CusMenuDropdown>
      </div>
    </header>
  );
};

export default MainHeader;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSessionContext } from "../../context/UserSessionProvider";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import { ChevronsUpDown, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CusMenuDropdown,
  CusMenuTrigger,
  CusMenuContent,
  CusMenuItem,
  CusMenuLabel,
} from "./CustomMenuDropdown";

const MainHeader = ({ activePage }) => {
  const { currentUser, logout } = useSessionContext();
  const { updateSearch } = useGlobalSearch();
  const [input, setInput] = useState("");
  const selectedProfile = JSON.parse(sessionStorage.getItem("selectedProfile"));
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") updateSearch(input);
  };

  const navLinks = [
    { label: "Home", to: "/home", key: "all" },
    { label: "TVShows", to: "/tv-shows", key: "tv" },
    { label: "Movies", to: "/movies", key: "movie" },
    { label: "New & Popular", to: "/new&popular", key: "new&popular" },
    { label: "My List", to: "/my-list", key: "my-list" },
    { label: "Browse", to: "/browse", key: "browse" },
  ];

  return (
    <header className="w-full px-4 py-3 bg-black/10 backdrop-blur-sm text-white flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/home" className="text-2xl font-bold tracking-wide">
          <img
            src="/Logo.png"
            alt="Netflix Logo"
            className="w-28 h-auto object-contain"
          />
        </Link>

        <nav className="hidden sm:flex gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={
                activePage && activePage === link.key
                  ? "font-bold underline"
                  : "opacity-70 hover:opacity-100 transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />
        <CusMenuDropdown>
          <CusMenuTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/public/${selectedProfile?.avatar}`}
                alt="Profile Avatar"
                className="w-10 h-10 rounded-full"
              />
              <ChevronsUpDown size={16} />
            </div>
          </CusMenuTrigger>

          <CusMenuContent className="w-40 bg-white text-black">
            <CusMenuLabel>{currentUser?.username}</CusMenuLabel>
            <CusMenuItem
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </CusMenuItem>
          </CusMenuContent>
        </CusMenuDropdown>
      </div>
    </header>
  );
};

export default MainHeader;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../logo.svg'; // אפשר להחליף ללוגו של נטפליקס בעתיד

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Netflix Logo" className="logo" />
        <nav className="nav-links">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/tv-shows">TV Shows</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/new-popular">New & Popular</NavLink>
          <NavLink to="/my-list">My List</NavLink>
          <NavLink to="/browse">Browse</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

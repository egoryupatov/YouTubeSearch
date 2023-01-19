import React from "react";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  onSignOutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="leftMenu">
          <Link to="/search">
            <img className="navbarLogo" src="/images/logo.svg" alt="" />
          </Link>

          <div>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Search
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Favorites{" "}
            </NavLink>
          </div>
        </div>
        <div className="rightMenu">
          <div className="logOut" onClick={props.onSignOutClick}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

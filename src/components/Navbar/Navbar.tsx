import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const onSignOutClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="leftMenu">
          <Link to="/">
            <img className="navbarLogo" src="/images/logo.svg" />
          </Link>
          <Link to="/search">
            <div>Search</div>
          </Link>
          <Link to="/favorites">
            <div>Favorites</div>
          </Link>
        </div>
        <div className="rightMenu">
          <div className="signOut" onClick={onSignOutClick}>
            Sign out
          </div>
        </div>
      </div>
    </div>
  );
};

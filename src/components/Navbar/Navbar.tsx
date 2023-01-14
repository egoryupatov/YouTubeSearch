import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: React.FC = (props) => {
  const navigate = useNavigate();

  const onSignOutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="leftMenu">
          <Link to="/search">
            <img className="navbarLogo" src="/images/logo.svg" alt="" />
          </Link>
          <Link to="/search">
            <div>Search</div>
          </Link>
          <Link to="/favorites">
            <div>Favorites</div>
          </Link>
        </div>
        <div className="rightMenu">
          <div className="logOut" onClick={onSignOutClick}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

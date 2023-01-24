import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const NavbarContainer: React.FC = (props) => {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <Navbar onSignOutClick={handleSignOutClick} />;
};

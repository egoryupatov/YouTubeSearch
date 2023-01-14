import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContainer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return null;
};

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContainer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/");
    }
  }, []);

  return null;
};

import React, { createRef, useState } from "react";
import "./AuthForm.scss";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthForm, UserData } from "./AuthForm";

export const AuthFormContainer: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] =
    useState<boolean>(false);
  const navigate = useNavigate();
  let users = require("../../users.json");

  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const onPasswordVisibilityChange = () => {
    setIsPasswordVisible((prevState: boolean) => !prevState);
  };
  const onSignInClick = () => {
    users.forEach((user: UserData) => {
      if (
        user.username === userData.username &&
        user.password === userData.password
      ) {
        localStorage.setItem("token", `${uuidv4()}`);
        localStorage.setItem("username", `${userData.username}`);
        navigate("/search");
      } else {
        setIsErrorMessageVisible(true);
      }
    });
  };

  return (
    <AuthForm
      isPasswordVisible={isPasswordVisible}
      isErrorMessageVisible={isErrorMessageVisible}
      onPasswordVisibilityChange={onPasswordVisibilityChange}
      onSignInClick={onSignInClick}
      setUserData={setUserData}
      userData={userData}
    />
  );
};

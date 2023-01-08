import React, { useEffect, useState } from "react";
import "./AuthForm.scss";
import { useNavigate } from "react-router-dom";

export const AuthForm: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const navigate = useNavigate();
  let users = require("../../users.json");

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/search");
    }
  }, []);

  const onPasswordVisibilityChange = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const onSignInClick = () => {
    users.map((user: any) => {
      if (
        user.username === userData.username &&
        user.password === userData.password
      ) {
        localStorage.setItem("token", "superToken");
        localStorage.setItem("username", `${userData.username}`);
        navigate("/search");
      } else {
        setIsErrorMessageVisible(true);
      }
    });
  };

  return (
    <div className="formContainer">
      <div className="authForm">
        <div className="logoContainer">
          <img src="/images/logo.svg" />
        </div>
        <div className="textContainer">Sign in</div>
        <div className="inputContainer">
          <div className="textField">
            <label>Username</label>
            <input
              type="text"
              onChange={(event) =>
                setUserData({ ...userData, username: event.target.value })
              }
            />
          </div>
          <div className="textField">
            <label>Password</label>
            <div className="passwordField">
              <input
                type={isPasswordVisible ? "text" : "password"}
                onChange={(event) =>
                  setUserData({ ...userData, password: event.target.value })
                }
              />

              {isPasswordVisible ? (
                <img
                  onClick={onPasswordVisibilityChange}
                  src="/images/eye-on-blue.svg"
                />
              ) : (
                <img
                  onClick={onPasswordVisibilityChange}
                  src="/images/eye-off-blue.svg"
                />
              )}
            </div>
          </div>
          {isErrorMessageVisible ? (
            <div className="textField">
              <div className="errorMessage">
                There is no such user, try again!
              </div>
            </div>
          ) : null}
        </div>
        <div className="buttonContainer">
          <button onClick={onSignInClick}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

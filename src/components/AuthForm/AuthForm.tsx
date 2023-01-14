import React, { createRef, useState } from "react";
import "./AuthForm.scss";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const AuthForm: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const navigate = useNavigate();
  let users = require("../../users.json");

  const ref = createRef<HTMLInputElement>();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onPasswordVisibilityChange = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const onSignInClick = () => {
    users.forEach((user: any) => {
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

  /*  useEffect(() => {
    console.log(ref.current.hasFocus());
  }, [isPasswordVisible]);*/

  return (
    <div className="formContainer">
      <div className="authForm">
        <div className="logoContainer">
          <img src="/images/logo.svg" alt="" />
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
                ref={ref}
                onChange={(event) =>
                  setUserData({ ...userData, password: event.target.value })
                }
              />

              {isPasswordVisible ? (
                <img
                  onClick={onPasswordVisibilityChange}
                  src="/images/eye-on-blue.svg"
                  alt=""
                />
              ) : (
                <img
                  onClick={onPasswordVisibilityChange}
                  src="/images/eye-off-blue.svg"
                  alt=""
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

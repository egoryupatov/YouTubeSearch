import React, { Dispatch, Ref, SetStateAction } from "react";

export interface UserData {
  username: string;
  password: string;
}

interface AuthFormProps {
  setUserData: Dispatch<SetStateAction<{ username: string; password: string }>>;
  userData: UserData;
  isPasswordVisible: boolean;
  isErrorMessageVisible: boolean;
  onPasswordVisibilityChange: () => void;
  onSignInClick: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
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
                props.setUserData({
                  ...props.userData,
                  username: event.target.value,
                })
              }
            />
          </div>
          <div className="textField">
            <label>Password</label>
            <div className="passwordField">
              <input
                type={props.isPasswordVisible ? "text" : "password"}
                onChange={(event) =>
                  props.setUserData({
                    ...props.userData,
                    password: event.target.value,
                  })
                }
              />

              {props.isPasswordVisible ? (
                <img
                  onClick={props.onPasswordVisibilityChange}
                  src="/images/eye-on-blue.svg"
                  alt=""
                />
              ) : (
                <img
                  onClick={props.onPasswordVisibilityChange}
                  src="/images/eye-off-blue.svg"
                  alt=""
                />
              )}
            </div>
          </div>
          {props.isErrorMessageVisible ? (
            <div className="textField">
              <div className="errorMessage">
                There is no such user, try again!
              </div>
            </div>
          ) : null}
        </div>
        <div className="buttonContainer">
          <button onClick={props.onSignInClick}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import "./Notification.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { setIsFavoritesNotificationDisplayed } from "../../store/videosSlice";

export const Notification: React.FC = () => {
  const dispatch = useDispatch();

  //сделать чтобы по клику закрывалось окно

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        dispatch(setIsFavoritesNotificationDisplayed(false));
      }}
    >
      <div className="notificationContainer">
        <div>Your search request has been saved to "Favorites"</div>
        <Link to={"/favorites"}>
          <span>Go to favorites</span>
        </Link>
      </div>
    </OutsideClickHandler>
  );
};

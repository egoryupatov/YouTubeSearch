import React from "react";
import { Link } from "react-router-dom";
import "/Notification.scss";

export const Notification: React.FC = () => {
  return (
    <div className="notificationContainer">
      <div>Your search request has been saved to "Favorites"</div>
      <Link to={"/favorites"}>Go to "Favorites"</Link>
    </div>
  );
};

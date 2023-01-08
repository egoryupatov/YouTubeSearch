import React from "react";
import { Video } from "../../constants/constants";
import "./ListView.scss";

export const ListVideo: React.FC<Video> = (props) => {
  return (
    <div className="listVideo">
      <div className="preview">
        <img src={props.preview} />
      </div>
      <div className="info">
        <div className="title">{props.title}</div>
        <div className="desc">
          <div>{props.channel}</div>
          <div>{props.views}</div>
        </div>
      </div>
    </div>
  );
};

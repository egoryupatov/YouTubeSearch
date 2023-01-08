import React from "react";
import "./GridView.scss";
import { Video } from "../../constants/constants";

export const GridVideo: React.FC<Video> = (props) => {
  return (
    <div className="videoGrid">
      <div className="preview">
        <img src={props.preview} />
      </div>
      <div className="title">
        {props.title.length >= 56
          ? props.title.slice(0, 56) + "..."
          : props.title}
      </div>
      <div className="desc">
        <div>
          {props.channel.length >= 27
            ? props.channel.slice(0, 27) + "..."
            : props.channel}
        </div>
        <div>{props.views}</div>
      </div>
    </div>
  );
};

import React from "react";
import "./GridView.scss";
import { IVideo } from "../../types/general.types";
import { countViews } from "../../utils/countViews";

export const GridView: React.FC<IVideo> = (props) => {
  return (
    <div className="gridView">
      <div className="preview">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
        >
          <div className="tooltipLeft" />

          <img src={props.preview} alt="" />

          <div className="tooltipRight" />
        </a>
      </div>
      <div className="title">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
        >
          {props.title.length >= 56
            ? props.title.slice(0, 56) + "..."
            : props.title}
        </a>
      </div>
      <div className="desc">
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/channel/${props.channelId}`}
          >
            {props.channel.length >= 27
              ? props.channel.slice(0, 27) + "..."
              : props.channel}
          </a>
        </div>
        <div>{countViews(Number(props.views))}</div>
      </div>
    </div>
  );
};

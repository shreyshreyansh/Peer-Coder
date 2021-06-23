import React, { Component } from "react";
import Video from "./Video";
import "../css/VideoBar.css";

class VideoBar extends Component {
  render() {
    return (
      <div className="scrollmenu">
        {this.props.peersStream.map((peer) => {
          return (
            <Video
              key={peer.userId}
              media={peer.stream}
              height={120}
              width={160}
            ></Video>
          );
        })}
      </div>
    );
  }
}
export default VideoBar;

import React, { Component } from "react";
import "../css/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
      audio: false,
    };
  }
  toggleAudioCss() {
    let audio = this.state.audio;
    this.setState({ audio: !audio });
  }
  toggleVideoCss() {
    let video = this.state.video;
    this.setState({ video: !video });
  }
  render() {
    return (
      <div className="header">
        <span href="#" className="logo">
          PEER CODER
        </span>
        <div className="header-right">
          <button
            className={this.state.video ? "buttonOn" : "buttonOff"}
            onClick={() => {
              this.props.onVideoToggle(this.props.userId);
              this.toggleVideoCss();
            }}
          >
            <i
              className={
                this.state.video ? "fa fa-video-camera" : "fa fa-video-slash"
              }
            ></i>
          </button>
          <button
            className={this.state.audio ? "buttonOn" : "buttonOff"}
            onClick={() => {
              this.props.onAudioToggle(this.props.userId);
              this.toggleAudioCss();
            }}
          >
            <i
              className={
                this.state.audio ? "fa fa-microphone" : "fa fa-microphone-slash"
              }
            ></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;

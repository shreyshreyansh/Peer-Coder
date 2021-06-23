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
            <i className="fa fa-video-camera"></i>
          </button>
          <button
            className={this.state.audio ? "buttonOn" : "buttonOff"}
            onClick={() => {
              this.props.onAudioToggle(this.props.userId);
              this.toggleAudioCss();
            }}
          >
            <i className="fa fa-microphone"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;

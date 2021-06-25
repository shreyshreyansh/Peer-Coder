import React, { Component } from "react";
import "../css/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a
          href="https://github.com/shreyshreyansh/Peer-Coder"
          target="_blank"
          rel="noopener noreferrer"
          className="left-footer"
        >
          ⭐ Star Project
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="right-footer"
        >
          © GitHub community
        </a>
      </div>
    );
  }
}
export default Footer;

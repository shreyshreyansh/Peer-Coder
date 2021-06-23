import PropTypes from "prop-types";
import React from "react";
import "../css/Video.css";

class Video extends React.Component {
  componentDidMount() {
    this.video.srcObject = this.props.media;
  }

  shouldComponentUpdate(props) {
    return this.props.media !== props.media;
  }

  componentDidUpdate() {
    this.video.srcObject = this.props.media;
  }

  render() {
    const { width, height, muted, children } = this.props;

    return (
      <video
        height={height}
        width={width}
        muted={muted}
        autoPlay
        ref={(video) => {
          this.video = video;
        }}
      >
        {children}
      </video>
    );
  }
}

Video.defaultProps = {
  children: null,
  height: 110,
  width: 160,
  muted: false,
  media: null,
};

Video.propTypes = {
  children: PropTypes.element,
  media: PropTypes.shape({
    active: PropTypes.bool,
    ended: PropTypes.bool,
    id: PropTypes.string,
  }),
  height: PropTypes.number,
  width: PropTypes.number,
  muted: PropTypes.bool,
};

export default Video;

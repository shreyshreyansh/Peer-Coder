import React, { Component } from "react";
import Header from "./Header";
import VideoBar from "./VideoBar";
import Editor from "./Editor";
import Footer from "./Footer";
import io from "socket.io-client";
import Peer from "peerjs";
import "../css/App.css";
const myPeer = new Peer();
const socket = io("http://localhost:4000");
const peers = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      stream: {},
      peers: [],
      code: "",
      input: "",
      output: "",
    };
    this.handleVideoToggle = this.handleVideoToggle.bind(this);
    this.handleAudioToggle = this.handleAudioToggle.bind(this);
  }
  componentDidMount() {
    myPeer.on("open", (id) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          this.addUserIdAndStream(id, stream);
          this.addVideoStream(id, stream, false);
          socket.on("user-connected", (userId) => {
            this.connectToNewUser(userId, stream);
          });
          myPeer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              this.addVideoStream(call.peer, userVideoStream, false);
            });
            call.on("close", () => {
              const peers = this.state.peers;
              var peersModified = peers.filter((peer) => {
                return peer.userId !== call.peer;
              });
              this.setState({ peers: peersModified });
            });
            peers[call.peer] = call;
          });
          socket.emit("join-room", this.props.roomId, id);
        });
    });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });
  }
  connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    call.on("stream", (userVideoStream) => {
      this.addVideoStream(userId, userVideoStream, false);
    });
    call.on("close", () => {
      const peers = this.state.peers;
      var peersModified = peers.filter((peer) => {
        return peer.userId !== userId;
      });
      this.setState({ peers: peersModified });
    });
    peers[userId] = call;
  }

  addVideoStream(userId, stream, flag) {
    if (userId === this.state.userId) {
      stream.getVideoTracks()[0].enabled = false;
      stream.getAudioTracks()[0].enabled = false;
    }
    const peers = this.state.peers;
    peers.forEach((peer) => {
      if (peer.userId === userId) {
        peer.stream = stream;
        flag = true;
      }
    });
    if (!flag) peers.push({ userId: userId, stream: stream });
    this.setState({ peers: peers });
  }

  addUserIdAndStream(userId, stream) {
    this.setState({ userId: userId, stream: stream });
  }

  handleVideoToggle(userId) {
    this.state.peers.forEach((peer) => {
      if (peer.userId === userId) {
        const enabled = peer.stream.getVideoTracks()[0].enabled;
        peer.stream.getVideoTracks()[0].enabled = !enabled;
      }
    });
  }

  handleAudioToggle(userId) {
    this.state.peers.forEach((peer) => {
      if (peer.userId === userId) {
        const enabled = peer.stream.getAudioTracks()[0].enabled;
        peer.stream.getAudioTracks()[0].enabled = !enabled;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          userId={this.state.userId}
          stream={this.state.stream}
          onVideoToggle={this.handleVideoToggle}
          onAudioToggle={this.handleAudioToggle}
        />
        <VideoBar peersStream={this.state.peers} userId={this.state.userId} />
        <Editor />
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;

import React, { Component } from "react";
import VideoBar from "./VideoBar";
import io from "socket.io-client";
import Peer from "peerjs";
const myPeer = new Peer();
const socket = io("http://localhost:4000");
const peers = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peers: [],
    };
  }
  componentDidMount() {
    myPeer.on("open", (id) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
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

  render() {
    return <VideoBar peersStream={this.state.peers} />;
  }
}
export default App;

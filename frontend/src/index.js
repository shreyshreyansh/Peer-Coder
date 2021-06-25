import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
  HashRouter as Router,
  Route,
  useParams,
  Redirect,
} from "react-router-dom";
const { v4: uuidV4 } = require("uuid");
ReactDOM.render(
  <Router>
    <Route exact path="/">
      <Redirect to={"/" + uuidV4()} />
    </Route>
    <Route path="/:roomId" children={<Room />} />
  </Router>,
  document.getElementById("root")
);

function Room() {
  let { roomId } = useParams();
  return <App roomId={roomId} />;
}

// https://peaceful-depths-33963.herokuapp.com/
const app = require("express")();
const http = require("http").Server(app);
const PORT = process.env.PORT || 4000;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ status: "running" });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
    socket.on("code change", function (data) {
      socket.broadcast.to(roomId).emit("receive code", data);
    });
    socket.on("input change", function (data) {
      socket.broadcast.to(roomId).emit("receive input", data);
    });
    socket.on("output change", function (data) {
      socket.broadcast.to(roomId).emit("receive output", data);
    });
    socket.on("data-for-new-user", function (data) {
      socket.broadcast.to(roomId).emit("receive-data-for-new-user", data);
    });
    socket.on("mode-change-send", function (data) {
      socket.broadcast.to(roomId).emit("mode-change-receive", data);
    });
  });
});

http.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

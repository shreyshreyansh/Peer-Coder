const app = require("express")();
const http = require("http").Server(app);
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

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
    socket.on("code change", function (data) {
      console.log("code", data);
      socket.broadcast.to(roomId).emit("receive code", data);
    });
    socket.on("input change", function (data) {
      console.log("input", data);
      socket.broadcast.to(roomId).emit("receive input", data);
    });
    socket.on("output change", function (data) {
      console.log("output", data);
      socket.broadcast.to(roomId).emit("receive output", data);
    });
    socket.on("data-for-new-user", function (data) {
      socket.broadcast.emit("receive-data-for-new-user", data);
    });
  });
});

http.listen(process.env.PORT || 4000);

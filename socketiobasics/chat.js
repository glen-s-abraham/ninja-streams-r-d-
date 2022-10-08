const express = require("express");
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/public"));

const server = app.listen(9000);
const upgradedServer = socketio(server, {
  cors: {
    origin: "*",
  },
});

upgradedServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("messageFromServer", { data: "Shit connected" });
  socket.on("newMessageToServer", (msg) => {
    console.log(msg);
    upgradedServer.emit("broadcast", msg);
  });
});

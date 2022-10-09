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
  socket.on("messageToServer", (msg) => {
    console.log(msg);
  });
  socket.join("level1", (err) => {
    console.log("joined level 1");
    console.log(err);
    return;
  });
  upgradedServer
    .to("level1")
    .emit("joined", `${socket.id} said i have joined the level 1 room`);
});

upgradedServer.of("/admin").on("connection", (socket) => {
  console.log("someone connected to admin namespace");
  upgradedServer.of("/admin").emit("welcome", "welcome to admin channel");
});

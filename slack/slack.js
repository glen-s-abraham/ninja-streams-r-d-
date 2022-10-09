const express = require("express");
const socketio = require("socket.io");

const namespaces = require("./data/namespace");

const app = express();
app.use(express.static(__dirname + "/public"));

const server = app.listen(9000);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nsList", nsData);
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joned ${namespace.endpoint}`);
    nsSocket.emit("nsRoomList", namespaces[0].rooms);
    nsSocket.on("joinRoom", (room, memberUpdateCallBack) => {
      nsSocket.join(room);
      let clientsList = io.of("/wiki").adapter.rooms.get(room);
      let memberCount = clientsList.size;
      memberUpdateCallBack(memberCount);
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "lorem",
        avatar: "https://via.placeholder.com/30",
      };
      const roomName = [...nsSocket.rooms][1];
      io.of("/wiki").to(roomName).emit("broadcast", fullMsg);
    });
  });
});

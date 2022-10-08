const http = require("http");
const socketio = require("socket.io");

const server = http.createServer((req, res) => {
  res.end("connected");
});

const io = socketio(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "Shit worked");
  socket.on("message", (s) => {
    console.log(s);
  });
});

server.listen(8000);

const express = require("express");
const socketio = require("socket.io");
const app = express();
const helmet = require("helmet");

app.use(express.static(__dirname + "/public"));
app.use(helmet());

const expressServer = app.listen(8080);
const io = socketio(expressServer);
console.log(`Server running on http://localhost:8080`);

const http = require("http");
const webSocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("connected");
});

const wss = new webSocket.Server({ server });
wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  console.log(req);
  ws.send("shit worked!");
});
server.listen(8000);

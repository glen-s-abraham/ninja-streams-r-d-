let socket = io("http://localhost:9000", { transports: ["websocket"] });
socket.connect();
let adminSocket = io("http://localhost:9000/admin", {
  transports: ["websocket"],
});

socket.on("messageFromServer", (data) => {
  console.log(data);
  socket.emit("messageToServer", { data: "this is from client" });
});

socket.on("joined", (msg) => console.log(msg));

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMsg = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMsg });
});

socket.on("broadcast", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});

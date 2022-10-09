function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000${endpoint}`, {
    transports: ["websocket"],
  });
  nsSocket.on("nsRoomList", (nsRooms) => {
    let roomsList = document.querySelector(".room-list");
    roomsList.innerHTML = "";
    nsRooms.forEach((room) => {
      const icon = room.isPrivate
        ? "glyphicon glyphicon-lock"
        : "glyphicon glyphicon glyphicon-globe";
      roomsList.innerHTML += `<li class="room"><span class="${icon}"></span>${room.roomTitle}</li>`;
    });
    Array.from(document.getElementsByClassName("room")).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(e.target.innerText);
      });
    });
    const topRoom = document.querySelector(".room").innerText;
    joinRoom(topRoom);
  });

  nsSocket.on("broadcast", (msg) => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += buildHtml(msg);
  });

  document.querySelector(".message-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newMsg = document.querySelector("#user-message").value;
    nsSocket.emit("newMessageToServer", { text: newMsg });
  });
}

function buildHtml(msg) {
  return `<li>
  <div class="user-image">
      <img src=${msg.avatar} />
  </div>
  <div class="user-message">
      <div class="user-name-time">${msg.username} <span>${msg.time}</span></div>
      <div class="message-text">${msg.text}</div>
  </div>
</li>`;
}

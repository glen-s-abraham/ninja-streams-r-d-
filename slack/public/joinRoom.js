function joinRoom(room) {
  nsSocket.emit("joinRoom", room, (updtdMemberCount) => {
    //update room member total
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${updtdMemberCount} <span class="glyphicon glyphicon-user"></span>`;
  });
}

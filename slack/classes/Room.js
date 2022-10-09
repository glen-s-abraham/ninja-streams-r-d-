class Room {
  constructor(roomId, roomTitle, nameSpace, isPrivate = false) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.nameSpace = nameSpace;
    this.isPrivate = isPrivate;
    this.history = [];
  }
  addMessage(msg) {
    this.history.push(msg);
  }
  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;

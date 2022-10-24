let socket = io('http://localhost:3000');

let chatLobby = document.querySelector('#video-chat-lobby');
let roomName = document.querySelector('#room-name');
let joinBtn = document.querySelector('#join');
let chatRoomn = document.querySelector('#video-chat');
let userVideo =document.querySelector('#user-video');
let peerVideo =document.querySelector('#peer-video');



joinBtn.addEventListener('click',(evt)=>{
    if(roomName.value===""){
        alert("Please enter a valid room name")
    }else{
        socket.emit("join",roomName.value);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: false, video: { width: 1280, height: 720 } },
               (stream) => {
                  userVideo.srcObject = stream;
                  userVideo.onloadedmetadata = (e) => {
                    userVideo.play();
                  };
                  chatLobby.style = 'display:none';
               },
               (err) => {
                  console.error(`The following error occurred: ${err.name}`);
               }
            );
         } else {
            console.log("getUserMedia not supported");
         }
    }

})
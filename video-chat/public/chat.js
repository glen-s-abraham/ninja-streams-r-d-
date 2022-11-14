let socket = io('http://localhost:3000');

let chatLobby = document.querySelector('#video-chat-lobby');
let roomName = document.querySelector('#room-name');
let joinBtn = document.querySelector('#join');
let chatRoomn = document.querySelector('#video-chat');
let userVideo = document.querySelector('#user-video');
let peerVideo = document.querySelector('#peer-video');
let btnGroup = document.querySelector('#btn-group');
let btnMute = document.querySelector('#btnMute');
let btnLeave = document.querySelector('#btnLeave');
let btnHide = document.querySelector('#btnHide');


let rtcPeerConn;
let userStream;

let isCreator = false;
let isMuted = false;
let isCameraHidden = false;




const iceServers = {
   iceServers: [
      { urls: "stun:stunserver.example.org" },
   ]
}

joinBtn.addEventListener('click', (evt) => {
   if (roomName.value === "") {
      alert("Please enter a valid room name")
   } else {
      socket.emit('join', roomName.value)
   }
});


btnMute.addEventListener('click', (evt) => {
   isMuted = !isMuted;
   if (isMuted) {
      userStream.getAudioTracks()[0].enabled = false;
      btnMute.textContent = "Unmute";
   } else {
      userStream.getAudioTracks()[0].enabled = true;
      btnMute.textContent = "mute"
   }
})

btnHide.addEventListener('click', (evt) => {
   isCameraHidden = !isCameraHidden;
   if (isCameraHidden) {
      userStream.getVideoTracks()[0].enabled = false;
      btnHide.textContent = "Unhide Camera";
   } else {
      userStream.getVideoTracks()[0].enabled = true;
      btnHide.textContent = "Hide Camera"
   }

})

btnLeave.addEventListener('click', (evt) => {
   socket.emit("leave", roomName.value);
   chatLobby.style = "display:block";
   btnGroup.style = "display:none";
   userVideo.srcObject.getTracks().forEach(track=>track.stop());
   peerVideo.srcObject.getTracks().forEach(track=>track.stop());
   if(rtcPeerConn){
      rtcPeerConn.ontrack = null;
      rtcPeerConn.onicecandidate = null;
      rtcPeerConn.close();
      rtcPeerConn=null;
   }
})
socket.on('leave', () => {
   isCreator = true;
   peerVideo.srcObject.getTracks().forEach(track=>track.stop());
   if(rtcPeerConn){
      rtcPeerConn.ontrack = null;
      rtcPeerConn.onicecandidate = null;
      rtcPeerConn.close();
      rtcPeerConn=null;
   }
})

socket.on("created", () => {
   isCreator = true;

   navigator.mediaDevices
      .getUserMedia({
         audio: false,
         video: { width: 500, height: 500 },
      })
      .then(function (stream) {
         /* use the stream */
         userStream = stream;
         chatLobby.style = "display:none";
         btnGroup.style = "display:flex"
         userVideo.srcObject = stream;
         userVideo.onloadedmetadata = function (e) {
            userVideo.play();
         };
      })
      .catch(function (err) {
         /* handle the error */
         console.log(err)
         alert("Couldn't Access User Media");
      });
});

socket.on("joined", () => {
   navigator.mediaDevices
      .getUserMedia({
         audio: true,
         video: { width: 500, height: 500 },
      })
      .then(function (stream) {
         /* use the stream */
         userStream = stream;
         chatLobby.style = "display:none";
         btnGroup.style = "display:flex"
         userVideo.srcObject = stream;
         userVideo.onloadedmetadata = function (e) {
            userVideo.play();
         };
         socket.emit("ready", roomName.value);
      })
      .catch(function (err) {
         /* handle the error */
         alert("Couldn't Access User Media");
      });
});

socket.on('full', () => {
   alert("room full,Can't join");
})

const _onIceCandidateImpl = (evt) => {
   if (evt.candidate) {
      socket.emit('candidate', evt.candidate, roomName.value);
   }
}

const _onTrackImpl = (evt) => {
   peerVideo.srcObject = evt.streams[0];
   peerVideo.onloadedmetadata = (e) => {
      peerVideo.play();
   }
}



socket.on('ready', () => {
   if (isCreator) {
      rtcPeerConn = new RTCPeerConnection(iceServers);
      rtcPeerConn.onicecandidate = _onIceCandidateImpl;
      rtcPeerConn.ontrack = _onTrackImpl;
      rtcPeerConn.addTrack(userStream.getVideoTracks()[0], userStream);
      rtcPeerConn.createOffer().then((offer) => {
         rtcPeerConn.setLocalDescription(offer);
         socket.emit('offer', offer, roomName.value)
      }).catch(err => console.error(err))
   }
})
socket.on('candidate', (candidate) => {
   let iceCandidate = new RTCIceCandidate(candidate);
   rtcPeerConn.addIceCandidate(iceCandidate);
})
socket.on('offer', (offer) => {
   console.log(userStream)
   if (!isCreator) {
      rtcPeerConn = new RTCPeerConnection(iceServers);
      rtcPeerConn.onicecandidate = _onIceCandidateImpl;
      rtcPeerConn.ontrack = _onTrackImpl;
      rtcPeerConn.addTrack(userStream.getVideoTracks()[0], userStream);
      rtcPeerConn.setRemoteDescription(offer)
      rtcPeerConn.createAnswer().then((answer) => {
         rtcPeerConn.setLocalDescription(answer)
         socket.emit('answer', answer, roomName.value);
      }).catch(err => console.error(err))
   }
})
socket.on('answer', (answer) => {
   rtcPeerConn.setRemoteDescription(answer);
})


const express = require('express')
const socketio  = require('socket.io');

const app = express();

app.use(express.static(__dirname+'/public'));

const server = app.listen(3000);
const io = socketio(server,{
    cors:{origin:'*'}
})

io.on('connection',(socket)=>{
    socket.on('join',(roomName)=>{
        let rooms = io.sockets.adapter.rooms;
        curRoom = rooms.get(roomName);
        if(curRoom===undefined){
            socket.join(roomName);
            socket.emit('created');
            console.log('created');
        }else if(curRoom.size ===1){
            socket.join(roomName)
            socket.emit('joined')
            console.log('joined');
        }else{
            socket.emit('full')
            console.log('full')
        }
        
    })
    socket.on('ready',(roomName)=>{
        socket.broadcast.to(roomName).emit('ready');
        console.log('ready')
    })
    socket.on('candidate',(candidate,roomName)=>{
        socket.broadcast.to(roomName).emit('candidate',candidate);
        console.log(candidate)
    })
    socket.on('offer',(offer,roomName)=>{
        socket.broadcast.to(roomName).emit('offer',offer);
        console.log(offer)
    })
    socket.on('answer',(answer,roomName)=>{
        socket.broadcast.to(roomName).emit('answer',answer);
    })
})
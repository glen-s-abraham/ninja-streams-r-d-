const express = require("express");
const socketio = require("socket.io");
const app = express();
const helmet = require("helmet");

const Orb = require('./sockets/classes/Orbs');
let orbs = [];



app.use(express.static(__dirname + "/public"));
app.use(helmet());

const expressServer = app.listen(8080);
const io = socketio(expressServer,{
    cors:{
        origin:'*'
    }
});

const initGame=()=>{
    for(let i=0;i<500;i++){
        orbs.push(new Orb());
    }
}

initGame();

io.on('connect',(socket)=>{
    socket.emit('init',{orbs})
})

console.log(`Server running on http://localhost:8080`);

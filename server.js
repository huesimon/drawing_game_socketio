var express = require('express');
var app = express();
var server = app.listen(3000);
var playerList = [];

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server);


io.sockets.on('connection', newConnection);

// io.sockets.on('disconnect', newConnection );


function newConnection(socket) {
    console.log('new connection ' + socket.id);
    socket.on('disconnect', userDisconnect);
    //add connected player to the list
    //idea is to let one user at the time draw, hopefully
    playerList.push(socket.id);


    //if there  is a message called mouse, trigger function "mouseMsg"
    socket.on('mouse', mouseMsg);

    //if someone "clears"
    socket.on('clear', clearTheCanvas);

    function mouseMsg(data) {

        if (whoIsAllowedToDraw(data)){
            // socket.broadcast.emit('mouse', data);
            io.sockets.emit('mouse', data);
            // io.sockets.emit('mouse', data);
            //will send to everyone + you
            console.log(data);
            console.log(playerList.length);
        }

    }

    function clearTheCanvas(data) {
        if (whoIsAllowedToDraw(data)){
            io.sockets.emit('clear', data);
            console.log('someone cleared');

        }

    }

    function userDisconnect() {
        //for some reason i don't have to use socket as a parameter, tried doing that for too long ZzzZ...
        //socket was already a parameter in "newConnection"...
        console.log("User disconnected" + socket.id);
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i] === socket.id) {
                playerList.splice(i, 1);
            }

        }


    }

    function whoIsAllowedToDraw(data) {
        //pick a player that is allowed to draw
        //should it be random? or just the first player in the array?
        //what if player leaves?
        //pick next player in array
        if (playerList[1] === data.id) {
            return true;
        }
        else {
            return false;
        }

    }




}


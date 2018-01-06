var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server);


io.sockets.on('connection', newConnection);



function newConnection(socket) {
    console.log('new connection ' + socket.id)


    //if there  is a message called mouse, trigger function "mouseMsg"
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data);
        //will send to everyone + you
        console.log(data)
    }
}

var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(9000, function(){
    console.log('listening to requests on prt 9000');
});


// Static files
app.use(express.static('public'));


// Socket setup
var io = socket(server);
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    // Handle chat event
    // When I hear chat message sent to me, fire callback 
    // function to receive data and pass function
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})

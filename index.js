var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// When http://localhost:3000/ is called, returns the index.html file in this directory
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Fired whenever a user loads the web page, connecting to the server via sockets.
io.on('connection', function (socket) {
    console.log('a user connected');

    // When the client has sent a "chat message" event, broadcast this to ALL clients
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    // Fires when the user closes the browser tab / session.
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

// Start the server and listen on port 3000, hosting at http://localhost:3000/
http.listen(3000, function () {
    console.log('listening on *:3000');
});
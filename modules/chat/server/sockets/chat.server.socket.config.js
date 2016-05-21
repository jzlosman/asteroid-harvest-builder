'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected

  socket.on('join', function (game_id) {
    socket.join(game_id);
    io.in(game_id).emit('chatMessage', {
      type: 'status',
      text: 'has joined the game',
      created: Date.now(),
      game_id: game_id,
      profileImageURL: socket.request.user.profileImageURL,
      username: socket.request.user.username
    });
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    if (message.type === undefined) {
      message.type = 'message';
    }
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;

    // Emit the 'chatMessage' event
    io.emit('chatMessage', message);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('move', function (message) {
    message.type = 'move';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;

    // Emit the 'chatMessage' event
    io.emit('move', message);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('removeDrawable', function (message) {
    message.type = 'Drawables';
    message.created = Date.now();
    message.username = socket.request.user.username;
    // Emit the 'chatMessage' event
    io.emit('removeDrawable', message);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('sendAsteroids', function (message) {
    message.type = 'Asteroids';
    message.created = Date.now();
    message.username = socket.request.user.username;
    // Emit the 'chatMessage' event
    io.emit('sendAsteroids', message);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('sendDrawables', function (message) {
    message.type = 'Drawables';
    message.created = Date.now();
    message.username = socket.request.user.username;
    // Emit the 'chatMessage' event
    io.emit('sendDrawables', message);
  });


  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('chatMessage', {
      type: 'status',
      text: 'left the game',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};

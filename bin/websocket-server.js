var io = require('socket.io')();
io.on('connection', function (socket) {
  socket.join('room');

  socket.on('startDraw', function (data) {
    socket.to('room').emit('startDraw', data);
  });
  socket.on('draw', function (data) {
    socket.to('room').emit('draw', data);
  });
  socket.on('endDraw', function (data) {
    socket.to('room').emit('endDraw');
  });
  socket.on('msg', function (data) {
    if (data === 'correct') {
      socket.emit('correct');
    } else {
      socket.to('room').emit('msg', data);
    }
  });

});

io.listen(8081);

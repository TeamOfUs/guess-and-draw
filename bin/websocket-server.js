var io = require('socket.io')();
let rooms = {};

io.on('connection', function (socket) {
  let url = socket.request.headers.referer;
  let splited = url.split('/');
  let roomID = splited[splited.length - 1];   // 获取房间ID
  newPlayer(socket);

  socket.on('getPlayers', function(data){
    socket.emit('players',rooms[roomID]);
  });
  socket.on('ready', function(data){
    //everyone ready

    socket.to('room').emit('startGame');
    rooms[roomID]
    setTimeout(function(){

    },15000);
  });
  socket.on('unready', function(data){
      rooms[roomID]
  });

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
function newPlayer(socket){
  socket.join('room');
  socket.emit('players',room[roomID]);

  if(!rooms[rommID]){
    room[roomID] = [];
  }
  room[roomID].push();

  socket.to('room').emit('newPlayer','selfData');
}

io.listen(8081);

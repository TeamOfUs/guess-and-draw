var io = require('socket.io')();
io.on('connection', function (socket) {
    socket.emit('welcome', "hello");
    socket.join('room');

    socket.on('start', function (data) {
        socket.to('room').emit('start', data);
    });
    socket.on('draw', function (data) {
        socket.to('room').emit('draw', data);
    });
    socket.on('end', function (data) {
        socket.to('room').emit('end');
    });
	socket.on('msg',function(data){
		console.log(data);
		if(data === 'correct'){
			socket.emit('correct');
		}else{
			socket.to('room').emit('msg',data);
		}
	});
	
});

io.listen(8081);

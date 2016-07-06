var io = require('socket.io-client')('http://localhost:8081');

io.on('welcome', function (data) {
    console.log(data);
});
io.on('start', function (data) {
    panel.remoteStartDraw(data.x, data.y);
});
io.on('draw', function (data) {
    panel.remoteDraw(data.x, data.y)
});
io.on('end', function (data) {
    panel.remoteEndDraw();
});
io.startDraw = function (x, y) {
    io.emit('start', {
        'x': x,
        'y': y
    });
}
io.sendDraw = function (x, y) {
    io.emit('draw', {
        'x': x,
        'y': y
    });
}
io.endDraw = function (x, y) {
    io.emit('end');
}

modules.exports = io;

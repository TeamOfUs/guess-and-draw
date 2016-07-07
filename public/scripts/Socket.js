const io = require('socket.io-client')('http://localhost:8081'),
	Component = require('./Component');

class Socket extends Component {
	constructor() {
		super();
		this.io = io;
		this.on();

		super.subscribe('sendStartDraw', this.startDraw);
		super.subscribe('sendDraw', this.sendDraw);
		super.subscribe('sendEndDraw', this.endDraw);
		super.subscribe('sendMsg', this.sendMsg);
		super.subscribe('correct', this.correct);

	}
	on() {
		this.io.on('welcome', function (data) {
			console.log(data);
		});
		this.io.on('start', (data) => super.broadcast('receiveStartDraw', data));
		this.io.on('draw', (data) => super.broadcast('receiveDraw', data));
		this.io.on('end', (data) => super.broadcast('receiveEndDraw'));
		this.io.on('msg', (data) => super.broadcast('receiveMsg', data));
		this.io.on('correct', (data) => super.broadcast('receiveStartDraw'));

	}
	startDraw(data) {
		this.io.emit('start', {
			'x': data.x,
			'y': data.y
		});
	}
	sendDraw(data) {
		this.io.emit('draw', {
			'x': data.x,
			'y': data.y
		});
	}
	endDraw(data) {
		this.io.emit('end');
	}
	sendMsg(data) {
		this.io.emit('msg', data);
	}
}

module.exports = Socket;
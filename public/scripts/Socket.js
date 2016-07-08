const io = require('socket.io-client')('http://localhost:8081');

class Socket  {
  constructor() {
    this.io = io;
    this.on();

    this.subscribe('start');
    this.subscribe('draw');
    this.subscribe('end');
    this.subscribe('msg');
    this.subscribe('newWord');
    this.subscribe('giveUp');
    this.subscribe('correct');
  }
  receive(topic,data=null){
      this.io.emit(topic,data);
  }
  subscribe(topic){
      controller.subscribe(topic,this);
  }
  on() {
    this.io.on('welcome', function (data) {
      console.log(data);
    });
    this.io.on('start', (data) => controller.broadcast('receiveStartDraw', data));
    this.io.on('draw', (data) => controller.broadcast('receiveDraw', data));
    this.io.on('end', (data) => controller.broadcast('receiveEndDraw'));
    this.io.on('msg', (data) => controller.broadcast('receiveMsg', data));
    this.io.on('correct', (data) => controller.broadcast('correct'));
    this.io.on('newWord', (data)=> controller.broadcast('newWord,data'));

  }
}
module.exports = Socket;

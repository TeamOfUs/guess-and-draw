const io = require('socket.io-client')('http://localhost:8081'),
      Component = require('./Component');

class Socket extends Component{
    constructor(){
        super();
        this.io = io;
        this.on();
        
        super.subscribe('sendStartDraw',this.startDraw);
        super.subscribe('sendDraw',this.sendDraw);
        super.subscribe('sendEndDraw',this.endDraw);
    }
    on(){
        this.io.on('welcome', function (data) {
            console.log(data);
        });
        this.io.on('start', function (data) {
            controller.broadcast('receiveStartDraw',data);
        });
        this.io.on('draw', function (data) {
            controller.broadcast('receiveDraw',data);
        });
        this.io.on('end', function (data) {
            controller.broadcast('receiveEndDraw',null);
        });
    }
    startDraw(data){
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
    receive(topic,msg){
        super.receive(topic,msg);
    }
}

module.exports = Socket;

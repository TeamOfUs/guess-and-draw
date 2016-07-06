const Component = require('./Component');

class Panel extends Component{
    constructor(dom) {
        super();
        this.el = document.getElementById(dom);
        this.ctx = this.el.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.drawer = true;
        this.drawing = false;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.addListener();

        super.subscribe('receiveStartDraw',this.remoteStartDraw);
        super.subscribe('receiveDraw',this.remoteDraw);
        super.subscribe('receiveEndDraw',this.remoteEndDraw);
    }
    handleDown(e) {
        if (!this.drawer) {
            return
        }
        this.drawing = true;
        this.x = e.pageX - e.target.offsetLeft;
        this.y = e.pageY - e.target.offsetTop;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.beginPath();
        super.broadcast('sendStartDraw',{
            x:this.x,
            y:this.y
        });
    }
    handleUp(e) {
        if (!this.drawer) {
            return
        }
        this.stopDrawing();
        super.broadcast('sendEndDraw');
    }
    handleMove(e) {
        if (!this.drawer) {
            return
        }
        if (!this.drawing) {
            return;
        }
        this.x = Math.floor(e.pageX - e.target.offsetLeft);
        this.y = Math.floor(e.pageY - e.target.offsetTop);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
        super.broadcast('sendDraw',{
            x:this.x,
            y:this.y
        });
    }
    stopDrawing() {
        this.drawing = false;
        this.ctx.closePath();
    }
    remoteStartDraw(data) {
        this.ctx.moveTo(data.x, data.y);
        this.ctx.beginPath();
    }
    remoteDraw(data) {
        this.ctx.lineTo(data.x, data.y);
        this.ctx.stroke();
    }
    remoteEndDraw() {
        this.ctx.closePath();
    }
    addListener() {
        this.el.addEventListener("mousedown", event => this.handleDown(event));
        this.el.addEventListener("mouseup", event => this.handleUp(event));
        this.el.addEventListener("mousemove", event => this.handleMove(event));
    }
    setColor(color) {
        this.ctx.strokeStyle = color;
    }
    setWidth(width) {
        this.ctx.lineWidth = width;
    }
}

module.exports = Panel;


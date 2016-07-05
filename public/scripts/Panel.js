class Panel {
    constructor(dom, io) {
        this.el = document.getElementById(dom);
        this.ctx = this.el.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.drawer = true;
        this.drawing = false;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.addListener();
        this.io = io;
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
        this.io.startDraw();
    }
    handleUp(e) {
        if (!this.drawer) {
            return
        }
        this.stopDrawing();
        this.io.endDraw();
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
        this.io.sendDraw(this.x, this.y);
    }
    stopDrawing() {
        this.drawing = false;
        this.ctx.closePath();
    }
    remoteStartDraw(x, y) {
        this.ctx.moveTo(x, y);
        this.ctx.beginPath();
    }
    remoteDraw(x, y) {
        this.ctx.lineTo(x, y);
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
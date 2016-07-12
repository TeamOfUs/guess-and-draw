const Component = require('./Component');

class Panel extends Component {
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

    super.subscribe('nextDrawer', this.drawer);
    super.subscribe('receiveStartDraw', this.remoteStartDraw);
    super.subscribe('receiveDraw', this.remoteDraw);
    super.subscribe('receiveEndDraw', this.remoteEndDraw);
    super.subscribe('setColor', this.setColor);
    super.subscribe('setWidth', this.setWidth);
  }
  drawer(id){
    if(cookies.get('id') === id){
      this.drawer = true;
    }
  }
  handleDown(e) {
    if (!this.drawer) {
      return
    }
    this.drawing = true;
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.beginPath();
    super.broadcast('startDraw', {
      x: this.x,
      y: this.y
    });
  }
  handleUp(e) {
    if (!this.drawer) {
      return
    }
    this.drawing = false;
    this.ctx.closePath();
    super.broadcast('endDraw');
  }
  handleMove(e) {
    if (!this.drawer) {
      return
    }
    if (!this.drawing) {
      return;
    }
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
    super.broadcast('draw', {
      x: this.x,
      y: this.y,
      color: this.ctx.strokeStyle,
      width: this.ctx.lineWidth
    });
  }
  remoteStartDraw(data) {
    this.ctx.moveTo(data.x, data.y);
    this.ctx.beginPath();
  }
  remoteDraw(data) {
    this.ctx.lineWidth = data.width;
    this.ctx.strokeStyle = data.color;
    this.ctx.lineTo(data.x, data.y);
    this.ctx.stroke();
  }
  remoteEndDraw() {
    this.ctx.closePath();
  }
  setColor(color){
    this.ctx.strokeStyle = color;
  }
  setWidth(width){
    this.ctx.lineWidth = width;
  }
  addListener() {
    this.el.addEventListener("mousedown", event => this.handleDown(event));
    this.el.addEventListener("mouseup", event => this.handleUp(event));
    this.el.addEventListener("mousemove", event => this.handleMove(event));
  }
}

module.exports = Panel;

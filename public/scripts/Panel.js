class Panel {
    constructor(dom) {
        this.el = document.getElementById(dom);
        this.ctx = this.el.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.drawer = true;
        this.drawing = false;
        this.addListener();
    }
    handleDown(e) {
        if(drawer){
            return
        }
        this.drawing = true;
        this.x = e.pageX - e.target.offsetLeft;
        this.y = e.pageY - e.target.offsetTop;
        this.ctx.moveTo(this.x,this.y);
    }
    handleUp(e) {
        if(drawer){
            return
        }
        this.drawing = false;
    }
    handleMove(e) {
        if(drawer){
            return
        }
        if(!this.drawing){
            return;
        }
        this.x = e.pageX - e.target.offsetLeft;
        this.y = e.pageY - e.target.offsetTop;
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    addListener() {
        this.el.addEventListener("mousedown", event => this.handleDown(event));
        this.el.addEventListener("mouseup", event => this.handleUp(event));
        this.el.addEventListener("mousemove", event => this.handleMove(event));
    }
}

module.exports = Panel;

var ctx = document.getElementById('panel').getContext('2d');
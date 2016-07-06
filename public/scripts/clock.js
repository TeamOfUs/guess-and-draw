class clock {
    constructor(dom) {
        this.el = dom;
        this.time = 60;
    }
    start(){
        let timer = setInterval(handler,1000);
        return timer;
    }
    end(){
        
    }
    addTime(time){
        this.time += time;
    }
    reset(){
        this.time = 60;
    }
    handler(){
        this.time -= 1;
        this.el.nodeValue = this.time;
    }
}

module.exports = clock;
class clock {
    constructor(dom) {
        this.el = dom;
        this.time = 60;
    }
    set time (value){
        this.el.innerHTML = value;
    }
    start(){
        let timer = setInterval(handler,1000);
        return timer;
    }
    end(id){
        clearInterval(id);
    }
    addTime(time){
        this.time += time;
    }
    reset(){
        this.time = 60;
    }
    handler(){
        this.time -= 1;
    }
}

module.exports = clock;
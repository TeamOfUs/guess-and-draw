class Component{
    constructor(){
        this.topics = {};
    }
    subscribe(topic,handler){
        this.topics[topic] = handler;
        controller.subscribe(topic,this);
    }
    broadcast(topic,msg){
        controller.broadcast(topic,msg);
    }
    receive(topic,msg){
        this.topics[topic].call(this,msg);
        //神来之笔 有待考察。
    }
}

module.exports = Component;

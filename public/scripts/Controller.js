class Controller{
    constructor(){
        this.topics = {};
    }
    subscribe (topic,listener){
        if(!this.topics[topic]){
            this.topics[topic] = [listener];
        }else{
            this.topics[topic].push(listener);
        }
    }
    broadcast (topic,msg){
        var listeners = this.topics[topic];
        listeners.forEach(function(listener){
            listener.receive(topic,msg);
        });
    }
}

module.exports = Controller;

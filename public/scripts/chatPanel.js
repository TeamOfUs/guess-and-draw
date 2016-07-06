const Component = require('./Component');

class chatPanel extends Component{
    constructor(dom) {
        super();
        this.el = dom;
        this.addListener();
    }
    addListener() {
        this.el.addEventListener('click', event => this.clickHandler(event));
    }
    clickHandler(e) {
        let tagName = e.target.tagName;
        switch(tagName){
            case 'button':
                let msg = document.getElementById("").value;
                sendMsg(msg);

                break;
            case 'nameTag':
                //input里面加上id
                break;
            default:
                break;
        }
    }
    sendMsg(msg){
        //ws
    }
    receiveMsg(){
        //ws
        addMsg(msg);
    }
    addMsg(msg){
        let msg = document.createElement("");

    }
}

module.exports = chatPanel;

const Component = require('./Component');

class chatPanel extends Component{
    constructor(dom) {
        super();
        this.el = document.getElementById(dom);
        this.addListener();

        super.subscribe('receiveMsg',this.receiveMsg);
		super.subscribe('correct',this.correct);
    }
    addListener() {
        this.el.addEventListener('click', (event) => this.clickHandler(event));
    }
    clickHandler(e) {
        let tagName = e.target.tagName;
		console.log(tagName);
        switch(tagName){
            case 'BUTTON':
                let msg = document.getElementById("text").value;
                this.sendMsg(msg);
                break;
            case 'nameTag':
                //input里面加上id
                break;
            default:
                break;
        }
    }
    sendMsg(msg){
		super.broadcast('sendMsg',msg);
	}
    receiveMsg(msg){
		let node = document.createElement('li');
		node.innerHTML = msg;
		this.dom.children[0].appendChild(node);
	}
    correct(){
		let node = document.createElement('li').innerHTML = "Bingo！";
		this.el.childNodes[0].appendChild(node);
		alert('correct')
	}
}

module.exports = chatPanel;

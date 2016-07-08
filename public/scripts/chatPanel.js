const Component = require('./Component');

class ChatPanel extends Component{
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
        switch(tagName){
            case 'BUTTON':
                let msg = document.getElementById("text").value;
                this.sendMsg(msg);
                break;
            case 'nameTag':
                this.el.children[1].value = e.target.nodeValue;
                break;
            default:
                break;
        }
    }
    sendMsg(msg){
		super.broadcast('msg',msg);
	}
    receiveMsg(msg){
		let node = document.createElement('li');
        node.classList.add();
		node.innerHTML = msg;
		this.el.children[0].appendChild(node);
	}
    correct(){
		let node = document.createElement('li');
        node.innerText = "Bingo!";
		this.el.children[0].appendChild(node);
	}
}

module.exports = ChatPanel;

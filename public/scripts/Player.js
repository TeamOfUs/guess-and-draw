const Component = require('./Component');

class Player extends Component {
  constructor(data) {
    super();

    this.name = data.name;
    this.avatar = data.avatar;//url

    super.subscribe('getScore',this.getScore);

    this.drawPlayer(this.name,this.avatar);
  }
  drawPlayer(name,avatar){
    let node = document.createElement('li'),
        img = document.createElement('img'),
        name = document.createElement('span'),
        score = document.createElement('span');
    name.innerText = this.name;
    img.setAttribute('src',this.avatar);
    node.appendChild(img);
    node.appendChild(name);
    node.appendChild(score);

    this.el = node;
  }
  addScore(data){
    this.el.children[2].innerText += data;
  }
}

module.exports = Player;

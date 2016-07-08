const Component = require('./Component');

class Player extends Component {
  constructor(data) {
    super();
    this.el = null;
    this.id = data.id;
    this.avatar = data.avatar; //url
    this.ifReady = false;
    super.subscribe('correct', this.correct);
    this.drawPlayer(this.id, this.avatar);
  }
  drawPlayer(id, avatar) {
    let node = document.createElement('li'),
      img = document.createElement('img'),
      name = document.createElement('span'),
      score = document.createElement('span');
    name.innerHTML = this.id;
    img.setAttribute('src', this.avatar);
    node.appendChild(img);
    node.appendChild(name);
    node.appendChild(score);
    this.el = node;
  }
  correct(data) {
    this.el.children[2].innerText += data;
  }
}

module.exports = Player;

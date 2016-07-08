const Component = require('./Component');

class NameBar extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById('clock');
    this.word = '';
    this.addListenner();

    super.subscribe('newWord', this.getWord);
  }
  set word(word) {
    this.el.innerHTML = word;
  }
  addListenner() {
    this.el.children[1].addEventListener('click', event => this.clickHandler);
  }
  clickHandler() {
    super.broadcast('giveUp');
  }
  getWord(word){
    this.word = word;
  }
}

module.exports = NameBar;

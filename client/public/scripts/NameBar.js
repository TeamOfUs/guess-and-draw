const Component = require('./Component');

class NameBar extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById(dom);
    this.word = '';
    this.addListenner();

    super.subscribe('nextWord', this.getWord);
    super.subscribe('nextTip', this.getTip);
  }
  set word(word) {
    this.el.children[0].innerHTML += word;
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
  getTip(tip){
    this.word = tip;
  }
}

module.exports = NameBar;

const Component = require('./Component');

class Audio extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementsByTagName('audio');
    super.subscribe('correct',this.correct);
  }
  correct(){
    this.el[0].play();
  }
}

module.exports = Audio;

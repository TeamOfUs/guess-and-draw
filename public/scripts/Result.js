const Component = require('./Component');

class Result extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById('result');
    this.addListenner();

    this.addTimer();
    super.subscribe('');
  }
  addListener(){
    this.el.children[0].addEventListener('click',this.handler);
  }
  handler(e){
    this.hide();
  }
  addTimer(){
    setTimeout(this.hide,5000);
  }
  show(){
    this.el.classList.addClass('display');
  }
  hide(){
    this.el.classList.removeClass('display');
  }
}

module.exports = Result;

const Component = require('./Component');

class ToolBar extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById(dom);
    this.addListener();
  }
  addListener() {
    this.el.addEventListener('click', event => this.clickHandler(event));
  }
  clickHandler(e) {
    let id = e.target.getAttribute("id");
    switch (id) {
      case 'red':
      case 'blue':
      case 'yellow':
      case 'green':
      case 'black':
      case 'white':
        super.broadcast('setColor',id);
        break;
      case '1x-width':
        super.broadcast('setWidth',1);
        break;
      case '4x-width':
        super.broadcast('setWidth',4);
        break;
      case '8x-widht':
        super.broadcast('setWidth',8);
        break;
      case '32x-width':
        super.broadcast('setWidth',32);
        break;
      default:
        break;
    }
  }
}

module.exports = ToolBar;

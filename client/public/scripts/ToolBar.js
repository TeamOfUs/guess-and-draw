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
      case 'orange':
      case 'yellow':
      case 'green':
      case 'cyan':
      case 'blue':
      case 'purple':
      case 'black':
      case 'white':
        super.broadcast('setColor',id);
        break;
      case 'x1':
        super.broadcast('setWidth',1);
        break;
      case 'x2':
        super.broadcast('setWidth',4);
        break;
      case 'x8':
        super.broadcast('setWidth',8);
        break;
      case 'x16':
        super.broadcast('setWidth',32);
        break;
      default:
        break;
    }
  }
}

module.exports = ToolBar;

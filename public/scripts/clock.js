const Component = require('./Component');

class Clock extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById('clock');
    this.time = 60;
    this.timerId = null;

    super.subscribe('newRound', this.reset);

  }
  set time(value) {
    this.el.innerHTML = value;
  }
  start() {
    this.timerId = setInterval(handler, 1000);
    return timer;
  }
  end(id) {
    clearInterval(id);
  }
  addTime(time) {
    this.time += time;
  }
  reset() {
    this.time = 60;
  }
  handler() {
    this.time -= 1;
  }
}

module.exports = Clock;

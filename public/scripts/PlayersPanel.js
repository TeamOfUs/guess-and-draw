const Component = require('./Component'),
  Player = require('./Player'),
  config = require('./config');

class PlayersPanel extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById('players');
    this.getPlayers();

  }
  getPlayers() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', config.getPlayers);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let data = xhr.responseText;
        this.initPlayers(data);
      }
    }
    xhr.send();
  }
  initPlayers(data) {
    data.forEach((player)=>{
      this.player.push(new Player(data));
    });
  }
}

module.exports = PlayersPanel;

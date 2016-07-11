const Component = require('./Component'),
  Player = require('./Player'),
  config = require('./config');

class PlayersPanel extends Component {
  constructor(dom) {
    super();
    this.el = document.getElementById(dom);

    super.subscribe('getPlayers',this.initPlayers);
  }
  initPlayers(data) {
    data.forEach((player)=>{
      new Player(player);
    });
  }
}

module.exports = PlayersPanel;

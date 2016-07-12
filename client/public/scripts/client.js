(function (window) {
  const Audio = require('./Audio'),
    Clock = require('./Clock'),
    ChatPanel = require('./ChatPanel'),
    Controller = require('./Controller'),
    NameBar = require('./NameBar'),
    Panel = require('./Panel'),
    PlayersPanel = require('./PlayersPanel'),
    Socket = require('./Socket'),
    ToolBar = require('./ToolBar');


  window.controller = new Controller();

  new Audio();
  new Clock('clock');
  new ChatPanel('chat');
  new NameBar('canvas-head');
  new Panel('panel');
  new PlayersPanel('display');
  new Socket();
  new ToolBar('canvas-tools');

  //todo list --
  //    在Canvas的外层监听moouseup ;触发panel的mouseup
})(window)

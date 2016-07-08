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

//  new Audio();
//  new Clock('clock');
  new ChatPanel('chatPanel');
//  new NameBar();
  new Panel('panel');
  new PlayersPanel();
  new Socket();
  new ToolBar('toolBar');

  //todo list --
  //    在Canvas的外层监听moouseup ;触发panel的mouseup
})(window)

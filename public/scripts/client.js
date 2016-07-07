(function (window) {
    const Controller = require('./Controller'),
          Panel = require('./Panel'),
		  ChatPanel = require('./ChatPanel'),
          Socket = require('./Socket');

    window.controller = new Controller();

    let  panel = new Panel('panel'),
		 chatPanel = new ChatPanel('chatPanel'),
         socket = new Socket();

    //todo list
    //    在Canvas的外层监听moouseup ,触发panel的mouseup
})(window)

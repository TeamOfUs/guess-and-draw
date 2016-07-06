(function (window) {
    var io = require('websocket'),
        Panel = require('./Panel'),
        panel = new Panel('panel',io),
        toolBar = new toolBar(panel),
        //            clocker = new Clocker(),
        //            chatPanel = new ChatPanel();
    //todo list
    //    在Canvas的外层监听moouseup ,触发panel的mouseup
})(window)
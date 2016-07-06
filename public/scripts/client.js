(function (window) {
    const Controller = require('./Controller'),
          Panel = require('./Panel'),
          Socket = require('./Socket');

    window.controller = new Controller();

    let  panel = new Panel('panel'),
         socket = new Socket();

    //todo list
    //    在Canvas的外层监听moouseup ,触发panel的mouseup
})(window)

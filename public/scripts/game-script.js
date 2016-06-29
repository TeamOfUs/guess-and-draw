var Panel = require('./Panel');

(function (window) {
    function $(dom){
        return document.querySelector(dom);
    }
    
    function init(){
        let panel = new Panel("panel");
    }
    
    init();
    

})(window)
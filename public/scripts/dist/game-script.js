/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Panel = __webpack_require__(1);

	(function (window) {
	    function $(dom){
	        return document.querySelector(dom);
	    }
	    
	    function init(){
	        let panel = new Panel("panel");
	    }
	    
	    init();
	    

	})(window)

/***/ },
/* 1 */
/***/ function(module, exports) {

	class Panel {
	    constructor(dom) {
	        this.el = document.getElementById(dom);
	        this.ctx = this.el.getContext('2d');
	        this.x = 0;
	        this.y = 0;
	        this.drawer = true;
	        this.drawing = false;
	        this.addListener();
	    }
	    handleDown(e) {
	        if(drawer){
	            return
	        }
	        this.drawing = true;
	        this.x = e.pageX - e.target.offsetLeft;
	        this.y = e.pageY - e.target.offsetTop;
	        this.ctx.moveTo(this.x,this.y);
	    }
	    handleUp(e) {
	        if(drawer){
	            return
	        }
	        this.drawing = false;
	    }
	    handleMove(e) {
	        if(drawer){
	            return
	        }
	        if(!this.drawing){
	            return;
	        }
	        this.x = e.pageX - e.target.offsetLeft;
	        this.y = e.pageY - e.target.offsetTop;
	        this.ctx.lineTo(this.x, this.y);
	        this.ctx.stroke();
	    }
	    addListener() {
	        this.el.addEventListener("mousedown", event => this.handleDown(event));
	        this.el.addEventListener("mouseup", event => this.handleUp(event));
	        this.el.addEventListener("mousemove", event => this.handleMove(event));
	    }
	}

	module.exports = Panel;

	var ctx = document.getElementById('panel').getContext('2d');

/***/ }
/******/ ]);
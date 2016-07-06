class toolBar {
    constructor(dom,controller) {
        this.el = dom;
        this.addListener();
    }
    addListener() {
        this.el.addEventListener('click', event => this.clickHandler(event));
    }
    clickHandler(e) {
        let id = e.target.getAttribute("id");
        switch(targetClass){
            case: 'red':
            case: 'blue':
            case: 'yellow':
            case: 'green':
            case: 'black':
            case: 'white':
                controller.broadcast('changeColor',targetClass);
                break;
            case: '1x-width':
                this.panel.setWidth(1);
                break;
            case: '2x-width':
                this.panel.setWidth(2);
                break;
            case: '4x-widht':
                this.panel.setWidth(4);
                break;
            case: '8x-width':
                this.panel.setWidth(8);
                break;
            default:
                break;
        }
    }
}

module.exports = toolBar;

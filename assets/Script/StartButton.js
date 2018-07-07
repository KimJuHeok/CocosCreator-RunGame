

cc.Class({
    extends: cc.Component,

    properties: {
        maskLayer: {
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.preloadScene("Game");
     },

    start () {

    },
    GameStart() {
        this.maskLayer.active = true;
        this.maskLayer.opacity = 0;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=> {
                    cc.director.loadScene('Game');
                })
            ));
    }




    // update (dt) {},
});

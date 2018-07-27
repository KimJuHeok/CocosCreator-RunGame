

cc.Class({
    extends: cc.Component,

    properties: {
        maskLayer:{
            default:null,
            type:cc.Node,
        },

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

     },
     FadeOutScene(){
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(cc.fadeOut(0.2));
    },

    start () {
        this.FadeOutScene();
    },

    // update (dt) {},
});

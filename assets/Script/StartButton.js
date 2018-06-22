

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.preloadScene("Game");

     this.node.on("touchend",function(){
         cc.director.loadScene("Game");
        });
     },

    start () {

    },

    // update (dt) {},
});

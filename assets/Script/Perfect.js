
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.node.active = false;
        this.animation.on('finished',function() {
            this.node.active = false;
        },this);
     },

    start () {

    },
    Initalize(){
        this.animation = this.getComponent(cc.Animation);
    },


    ShowPerfect(number) {
        this.node.active = true;
        this.node.setPosition(0,104);
        this.node.getChildByName("Combo").getComponent(cc.Label).string = number;
        this.animation.play("ShowPerfect");
    },
    FailPerfect(){
        this.node.setPosition(0,104);
        this.animation.play("FailPerfect");
        this.node.active = true;
    }

    // update (dt) {},
});

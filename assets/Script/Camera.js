

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        if(!this.target)
        {
            return;
        }
        var follow = cc.follow(this.target, cc.rect(-300, 0,1080*2,1920));
        this.node.runAction(follow);

    },

    // update (dt) {},
});

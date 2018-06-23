

cc.Class({
    extends: cc.Component,

    properties: {
        SpawnObject:{
            default:[],
            type:cc.Prefab
        },
        SpawnLayer: {
            default:null,
            type:cc.Layout

        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    SpawnDrop:function(dt) {
        this.delta += dt;

        if( this.delta < 1.6)
        {
            return;
        }
        this.delta = 0;

        

        var DropObject_ = cc.instantiate(this.SpawnObject[Math.round(this.getRandom(0,1))]);
        DropObject_.setPosition(0,600,0);

       // var dropSpeed = cc.random0To1() * 6 + 2;
        var moveby = cc.moveBy(5,cc.p(0,-2600));

        var Sequence = cc.sequence(
            moveby, 
            cc.removeSelf(true),

        );

        DropObject_.runAction(Sequence);
        this.SpawnLayer.node.addChild(DropObject_);
    },

     update (dt) {
        this.SpawnDrop(dt);

     },

     getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
});

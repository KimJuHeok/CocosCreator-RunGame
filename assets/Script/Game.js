

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

        if( this.delta < 3.1)
        {
            return;
        }
        this.delta = 0;

        var DropObject_ = cc.instantiate(this.SpawnObject[Math.round(this.getRandom(0,0))]);
        DropObject_.setPosition(0,1080,0);
        this.SpawnLayer.node.addChild(DropObject_);
    },

     update (dt) {
        this.SpawnDrop(dt);

     },

     getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
});

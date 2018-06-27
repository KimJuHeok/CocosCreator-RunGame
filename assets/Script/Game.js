

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
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.SpawnDropBegin();
    },


    SpawnDrop:function(dt) {
        this.delta += dt;

        if( this.delta < 3.1)
        {
            return;
        }
        this.delta = 0;

        var DropObject_ = cc.instantiate(this.SpawnObject[Math.round(this.getRandom(1,this.SpawnObject.length-1))]);
        DropObject_.setPosition(0,1080,0);
        var dropSpeed = 7;
        var moveTo = cc.moveTo(dropSpeed,cc.p(0,-2700));

        var Sequence = cc.sequence(
            moveTo,
            cc.removeSelf(true),
        );
        this.SpawnLayer.node.addChild(DropObject_);
        DropObject_.runAction(Sequence);

    },
    SpawnDropBegin() {

        var DropObject = cc.instantiate(this.SpawnObject[0]);
        DropObject.setPosition(0,-990,0);
        var dropSpeed = 7;
        var moveTo = cc.moveTo(dropSpeed,cc.p(0,-4770));
        var Sequence = cc.sequence(
            moveTo,
            cc.removeSelf(true),
        );
        this.SpawnLayer.node.addChild(DropObject);
        DropObject.runAction(Sequence);

    },

     update (dt) {
        this.SpawnDrop(dt);

     },

     getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
});

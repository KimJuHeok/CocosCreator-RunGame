

cc.Class({
    extends: cc.Component,

    properties: {
        SpawnObject:{
            default:null,
            type:cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    SpawnDrop:function(dt) {
        this.delta += dt;

        if( this.delta < 1)
        {
            return;
        }
        this.delta = 0;

        var layer_drop = this.DropLayer.node;
        var PositionSize_ = layer_drop.getContentSize();

        

        var DropObject_ = cc.instantiate(SpawnObject);
        DropObject_.setPosition(this.CreateDropPosition());

        var dropSpeed = cc.random0To1() * 6 + 2;
        var moveby = cc.moveBy(dropSpeed,0, -PositionSize_.height);

        var Sequence = cc.sequence(
            moveby, 
            cc.removeSelf(true),
            cc.callFunc(function(){this.GameOverCheck();},this),
        );

        DropObject_.runAction(Sequence);
        layer_drop.addChild(DropObject_);
    },

    // update (dt) {},
});

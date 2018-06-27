
cc.Class({
    extends: cc.Component,

    properties: {
        Spawn: {
            default:null,
            type:cc.Prefab,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

     update (dt) {
         if(this.node.y <= -1994)
         {
             this.Clone();
         }
        else{
            this.node.y -= 7;
            }
         
     },

     Clone() {
        var temp = cc.instantiate(this.Spawn);
        temp.setPosition(0,1994,0);
        this.node.destroy();
        this.node.parent.addChild(temp);
     },
});

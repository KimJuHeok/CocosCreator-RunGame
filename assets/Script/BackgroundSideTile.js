
cc.Class({
    extends: cc.Component,

    properties: {
        Spawn: {
            default:null,
            type:cc.Prefab,
        },

    },

    // LIFE-CYCLE CALLBACKS:


    start () {
        

    },

     update (dt) {
         if(this.node.y <= -1994)
         {
             this.Clone();
         }
        else{
            this.node.y -= 13;
            }
         
     },

     Clone() {
        var temp = cc.instantiate(this.Spawn);
        temp.setPosition(0,1994,0);
        this.node.destroy();
        this.node.parent.insertChild(temp,0);
     },
});

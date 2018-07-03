

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
        

    },

     update (dt) {
         if(this.node.y <= -this.node.height)
         {
             this.node.y = this.node.height-60;
         }
        else{
            this.node.y -= 9;
            }
         
     },
});

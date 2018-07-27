

cc.Class({
    extends: cc.Component,

    properties: {
        LocalSpeed:12,
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
        

    },
    SetSpeed(Speed){
        this.LocalSpeed = Speed;
    },
     update (dt) {
         if(this.node.y <= -this.node.height)
         {
             this.node.y = this.node.height-60;
         }
        else{
            this.node.y -= this.LocalSpeed;
            }
         
     },
});

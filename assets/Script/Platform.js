
cc.Class({
    extends: cc.Component,

    properties: {
        LocalSpeed:13,

    },

    // onLoad () {},

    start () {
        //this.LocalSpeed = 9;

    },
    SetSpeed(speed) {
        this.LocalSpeed = speed;
    },
     update (dt) {

         if(this.node.y >= -1920)
         {
             this.node.y -= this.LocalSpeed;
         }
         else
         {
             this.node.active = false;
         }
     },
});

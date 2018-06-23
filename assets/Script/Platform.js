
cc.Class({
    extends: cc.Component,

    properties: {
    },


    // onLoad () {},

    start () {

    },
    onCollisionEnter:function(other,self){
        cc.log("entered");
    },

    onCollisionExit: function (other, self) {
        cc.log("ended");
    },

     update (dt) {
         this.node.y -= 9;
     },
});

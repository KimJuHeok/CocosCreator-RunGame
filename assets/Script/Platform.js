
cc.Class({
    extends: cc.Component,

    properties: {
    },


    // onLoad () {},

    start () {

    },
    onCollisionEnter:function(other,self){
    },

    onCollisionExit: function (other, self) {
        if(other.node.group == "Check")
        {
            this.node.destroy();
        }
    },

     update (dt) {
         //this.node.y -= 7;
     },
});

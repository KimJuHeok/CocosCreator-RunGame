
cc.Class({
    extends: cc.Component,

    properties: {
        Percentage:30,
    },


    // onLoad () {},

    start () {
        this.RandomActive();
    },
    RandomActive() {
        if(Math.random()*100 < 30)
        {
            this.node.active = true;
        }
        else
            this.node.active = false;

    },

    onCollisionEnter: function (other, self){
        this.node.active = false;
        this.Player = other.getComponent("Player");
        this.Player.AddCoin();
   },

     update (dt) {
     },

});

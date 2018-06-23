

cc.Class({
    extends: cc.Component,

    properties: {
        jumpLoc:210,
        DrawCollision:false,


    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         var isJumping = false;
         this.anim = this.getComponent(cc.Animation);
         var Collision = cc.director.getCollisionManager();
         Collision.enabled = true;
         Collision.enabledDebugDraw = this.DrawCollision;

         this.anim.on('finished',function(){
             this.isJumping = false;
             this.anim.play("Player_idle");
         },this);


     },

     OnRight() {
        this.anim.play("Player_jump");
        this.isJumping = true;

        var jumpRight = cc.jumpBy(0.3, cc.p(this.jumpLoc,0), 50,1);
        this.node.runAction(jumpRight);

     },

     OnLeft() {
        this.anim.play("Player_jump");
        this.isJumping = true;
        var jumpLeft = cc.jumpBy(0.3, cc.p(-this.jumpLoc,0), 50,1);
        this.node.runAction(jumpLeft);
     },
     GetIsJumping() {
         return this.isJumping;
     },

     onCollisionEnter: function (other, self){
         //console.log(other);
     },



    // update (dt) {},
});

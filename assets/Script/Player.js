

cc.Class({
    extends: cc.Component,

    properties: {
        jumpLoc:210,
        DrawCollision:false,
        isJumping:false,
        isOnPlatform:true,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.anim = this.getComponent(cc.Animation);
         this.Collision = cc.director.getCollisionManager();
         this.Collision.enabled = true;
         this.Collision.enabledDebugDraw = this.DrawCollision;

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

        // if(other.node.group === "Platform"){
        //     this.isOnPlatform = true;
        // }
          this.isOnPlatform = true;
     },
     onCollisionStay: function (other, self) {
          this.isOnPlatform = true;
    },

     CheckGameOver() {
         if(!this.isOnPlatform)
         {
             cc.director.pause();
         }

     },



     update (dt) {
        this.CheckGameOver();

        if(!this.isJumping)
        {
        this.isOnPlatform = false;
        }
     },
});

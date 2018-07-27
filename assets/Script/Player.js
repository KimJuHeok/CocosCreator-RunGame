
cc.Class({
    extends: cc.Component,

    properties: {
        jumpLoc:210,
        DrawCollision:false,
        isJumping:false,
        isOnPlatform:true,
        PlayerLoc:0,
        Game: {
            default:null,
            type:cc.Node,
        },
        CoinAmount:0,
        IsOnFever:false,
        IsOnPerfectPoint:false,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.ComboSystem = this.node.getChildByName("PerfectEffect").getComponent('ComboSystem');
         this.CoinGet =this.node.getChildByName("CoinGetEffect");
         this.CoinGetAnim = this.CoinGet.getComponent(cc.Animation);
         this.step = this.node.getChildByName("StepEffect");
         this.stepAnim = this.step.getComponent(cc.Animation);
         this.GameScript = this.Game.getComponent('Game');
         this.anim = this.getComponent(cc.Animation);
         this.Collision = cc.director.getCollisionManager();
         this.Collision.enabled = true;
         this.Collision.enabledDebugDraw = this.DrawCollision;

         this.anim.on('finished',function(){
             if(this.GameScript.IsOnFeverMode == false)
             {
                this.CheckIsPerfect();
             }
             this.isJumping = false;
             this.anim.play("Player_idle");
             this.step.active = true;
             this.stepAnim.play('Player_stepped');
         },this);
         this.stepAnim.on('finished',function(){
             this.step.active = false;
         },this);
         this.CoinGetAnim.on('finished',function(){
             this.CoinGet.active = false;
         },this);


     },
     AddCoin() {
         this.GameScript.AddCoin_Game();
     },

     OnRight() {
        this.step.active = false;
        this.anim.play("Player_jump_Right");
        this.isJumping = true;
        let jumpRight = cc.jumpBy(0.12, cc.p(this.jumpLoc,0), 50,1);
        this.node.runAction(jumpRight);
     },

     OnLeft() {
        this.step.active = false;
        this.anim.play("Player_jump_Left");
        this.isJumping = true;
        let jumpLeft = cc.jumpBy(0.12, cc.p(-this.jumpLoc,0), 50,1);
        this.node.runAction(jumpLeft);
     },
     OnFever(){
         this.GameScript.SetFeverMode();
     },
     GetIsJumping() {
         return this.isJumping;
     },
     SetPlayerLoc(num) {
         this.PlayerLoc = num;
     },
     GetPlayerLoc() {
         return this.PlayerLoc;
     },

     onCollisionEnter: function (other, self){
         if(other.tag == 4)  // 코인의 콜리전태그
         {
             this.CoinGet.active = true;
             this.CoinGetAnim.play("CoinGet");
         }

         if(other.tag == 2 || other.tag == 1)
         {
            this.IsOnPerfectPoint = true;
         }
         else
         {
             this.IsOnPerfectPoint = false;
         }
          this.isOnPlatform = true;
          
     },
     CheckIsPerfect() {
         if(this.IsOnPerfectPoint)
         {
            this.ComboSystem.didPerfect();
         }
         else
         {
             this.ComboSystem.failPerfect();
         }
     },
     onCollisionStay: function (other, self) {
         this.isOnPlatform = true;
    },

     CheckGameOver() {
         if(!this.isOnPlatform)
         {
             this.node.dispatchEvent(new cc.Event.EventCustom("GameOver",true));
         }
     },
     
    lateUpdate() {
        if(this.GameScript.IsCountDownOver)
        {
            if(this.GameScript.IsOnFeverMode == false)
            {
            this.CheckGameOver();
            }

            if(this.isJumping)
            {
            this.isOnPlatform = true;
            }
            else
            {
            this.isOnPlatform = false;
            }
        }

    },
});

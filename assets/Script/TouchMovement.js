// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    
    properties: {
        Player: {
            default:null,
            type:cc.Node,
        },
        PlayerLimit: 0,
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        var Xorigin;
        var XforCheck;
        var IsWorkable = false; //터치 중인지 체크
        this.playerScript = this.Player.getComponent('Player');

        this.node.on('touchstart',function(touch){
            Xorigin = touch.getLocation().x;
            XforCheck = Xorigin;
            IsWorkable = true;
        },this.node)


         this.node.on('touchmove',function(event) {  
              var delta = event.touch.getDelta();


            XforCheck += delta.x;

            if(XforCheck > Xorigin+100)
            {
                  // Right Swipe\
                if(IsWorkable) {
                  if(!this.playerScript.GetIsJumping()) {
                      if(this.PlayerLimit <= 0) {
                      this.playerScript.OnRight();
                      this.PlayerLimit += 1;
                      IsWorkable = false;
                      }
                    }
                }
                
            }
            if(XforCheck < Xorigin-100)
            {
                  // Left Swipe
                if(IsWorkable){
                    if(!this.playerScript.GetIsJumping()) {
                        if(this.PlayerLimit >= 0) {
                       this.playerScript.OnLeft();
                       this.PlayerLimit -= 1;
                       IsWorkable = false;
                        }
                    }
                }
            }   


         },this)

     },

    // start () {
    // },

    // update (dt) {},
});

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
            type:cc.Node
        }
        
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
                      this.playerScript.OnRight();
                      cc.log("RightSuccess!");
                      IsWorkable = false;
                    }
                }
                
            }
            if(XforCheck < Xorigin-100)
            {
                if(IsWorkable){
                    if(!this.playerScript.GetIsJumping()) {
                // Left Swipe
                       this.playerScript.OnLeft();
                       cc.log("LeftSucces!");
                       IsWorkable = false;
                    }
                }
            }   


         },this)

     },

    // start () {
    // },

    // update (dt) {},
});

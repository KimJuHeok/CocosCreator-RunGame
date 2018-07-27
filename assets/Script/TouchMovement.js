cc.Class({
    extends: cc.Component,

    
    properties: {
        InputArray: {
            default:[],
            type:cc.Integer,
        },
        Right:2,
        Left:3,
        Game:{
            default:null,
            type:cc.Node,
        },
        
    },
    

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.GetCharacter();
        var Xorigin;
        var XforCheck;
        var IsWorkable = false; //터치 중인지 체크
        this.GameComp = this.Game.getComponent('Game');
        
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
                if(this.GameComp.IsCountDownOver  && !this.GameComp.IsGameOver) {
                if(IsWorkable) {
                if(this.playerScript.GetPlayerLoc()<= 0) {
                this.InputArray.unshift(this.Right);
                this.playerScript.SetPlayerLoc(this.playerScript.GetPlayerLoc()+1);
                IsWorkable = false;
                }
                }
            }
                
            }
            if(XforCheck < Xorigin-100)
            {
                if(this.GameComp.IsCountDownOver  && !this.GameComp.IsGameOver){
                if(IsWorkable){ 
                if(this.playerScript.GetPlayerLoc()>= 0) {
                    this.InputArray.unshift(this.Left);
                    this.playerScript.SetPlayerLoc(this.playerScript.GetPlayerLoc()-1);
                    IsWorkable = false;
                    }
                }
            }
            }   


         },this)

     },
     GetCharacter(){
        this.local = cc.sys.localStorage;
        let CurrCharacter = Number(this.local.getItem("CurrCharacter"));
        switch(CurrCharacter)
        {
            case 1:
            this.Player = cc.find("Canvas/Root/CharacterManager/Character1");
            this.playerScript = this.Player.getComponent('Player');
            break;
            case 2:
            this.Player = cc.find("Canvas/Root/CharacterManager/Character2");
            this.playerScript = this.Player.getComponent('Player');
            break;
            case 3:
            break;
            default:
            this.Player = cc.find("Canvas/Root/CharacterManager/Character1");
            this.playerScript = this.Player.getComponent('Player');
            break;
        }
    },

     update (dt) {

            if(!this.InputArray[0] == 0)
             {
                if(!this.playerScript.GetIsJumping())
                {
                switch(this.InputArray[0])
                 {
                 case this.Right:
                 this.playerScript.OnRight();
                 this.InputArray.splice(0,1);
                 break;
                 case this.Left:
                 this.playerScript.OnLeft();
                 this.InputArray.splice(0,1);
                 break;
                 }
                }
             }
     },
     InputClear() {
         this.InputArray.splice(0,this.InputArray.length);
     },
});

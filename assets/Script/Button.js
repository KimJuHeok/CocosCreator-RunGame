

cc.Class({
    extends: cc.Component,

    properties: {
        maskLayer: {
            default:null,
            type:cc.Node,
        },
        Game: {
            default:null,
            type:cc.Node,
        },
        Store:{
            default:null,
            type:cc.Node,
        },
        PageView:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.preloadScene("Game");
     },

    start () {

    },
    GameStartClicked() {
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=> {
                    cc.director.loadScene('Game');
                })
            ));
    },

    MainClicked() {
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=> {
                    cc.director.loadScene('Main');
                })
            ));
    },

    PauseClicked() {
        this.GameScript = this.Game.getComponent("Game");
        if(!this.GameScript.IsGameOver)
        {
        this.GameScript.PausePressed();
        this.maskLayer.active = true;
        this.maskLayer.opacity = 100;
        this.maskLayer.color = cc.Color.BLACK;
        }
    },
    ResumeClicked() {
        this.GameScript = this.Game.getComponent("Game");
        if(!this.GameScript.IsGameOver)
        {
        this.GameScript.GameResume();
        this.maskLayer.active = false;
        this.maskLayer.opacity = 0;
        }
    },
    StoreClicked() {
        this.Store.active = true;
    },
    BuyClicked() {
        this.local = cc.sys.localStorage;
        let PageIndex = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        switch(PageIndex)
        {
            case 0:
            this.local.setItem("Character1",true);
            break;
            case 1:
            this.local.setItem("Character2",true);
            break;
            case 2:
            this.local.setItem("Character3",true);
            break;
            default:
            break;
        }
        
    },
    StoreStartClicked() {
        this.local = cc.sys.localStorage;
        let PageIndex = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        switch(PageIndex)
        {
            case 0:
            this.local.setItem("CurrCharacter",1);
            break;
            case 1:
            this.local.setItem("CurrCharacter",2);
            break;
            case 2:
            this.local.setItem("CurrCharacter",3);
            break;
            default:
            break;
        }
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0.2),
                cc.callFunc(()=> {
                    cc.director.loadScene('Game');
                })
            ));

    }




    // update (dt) {},
});

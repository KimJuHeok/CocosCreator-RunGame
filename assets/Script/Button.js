

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
    }




    // update (dt) {},
});

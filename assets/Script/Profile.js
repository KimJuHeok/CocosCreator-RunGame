
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.local = cc.sys.localStorage;
        let CurrCharacter = Number(this.local.getItem("CurrCharacter"));
        switch(CurrCharacter)
        {
            case 1:
            this.node.getChildByName("Character1_Profile").active = true;
            break;
            case 2:
            this.node.getChildByName("Character2_Profile").active = true;
            break;
            case 3:
            break;
            default:
            break;
        }
        
    },

    // update (dt) {},
});

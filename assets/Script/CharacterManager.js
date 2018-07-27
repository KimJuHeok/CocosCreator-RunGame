

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    start () {
        this.local = cc.sys.localStorage;
        let CurrCharacter = Number(this.local.getItem("CurrCharacter"));
        switch(CurrCharacter)
        {
            case 1:
            this.node.getChildByName("Character1").active = true;
            break;
            case 2:
            this.node.getChildByName("Character2").active = true;
            break;
            case 3:
            break;
            default:
            this.node.getChildByName("Character1").active = true;
            break;
        }

    },

    // update (dt) {},
});

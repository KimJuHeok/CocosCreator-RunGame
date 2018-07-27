

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    onLoad () {
        this.local = cc.sys.localStorage;
        let CurrCharacter = Number(this.local.getItem("CurrCharacter"));
        switch(CurrCharacter)
        {
            case 1:
            this.target = cc.find("CharacterManager/Character1",this.node);
            break;
            case 2:
            this.target = cc.find("CharacterManager/Character2",this.node);
            break;
            case 3:
            break;
            default:
            this.target = cc.find("CharacterManager/Character1",this.node);
            break;

        }


        if(!this.target)
        {
            return;
        }
        var follow = cc.follow(this.target, cc.rect(-300, 0,1080*2,1920));
        this.node.runAction(follow);

    },

    // update (dt) {},
});

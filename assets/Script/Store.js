

cc.Class({
    extends: cc.Component,

    properties: {
        CharacterAmount:3,
        PageView:{
            default:null,
            type:cc.Node,
        },
        PlayButton:{
            default:null,
            type:cc.Node,
        },
        BuyButton:{
            default:null,
            type:cc.Node,
        },
    },
    CheckLocalStorage() {
        this.local = cc.sys.localStorage;
        for(let i = 1; i<=this.CharacterAmount;i++)
        {
            if(this.local.getItem("Character"+i) == null)
            {
                this.local.setItem("Character"+i,false);
            }
        }
     },

    start () {
        this.local = cc.sys.localStorage;
        let PageIndex = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        this.CheckLocalStorage();

    },
    ShowPlayButton() {
        this.BuyButton.active = false;
        this.PlayButton.active = true;
    },
    ShowBuyButton() {
        this.BuyButton.active = true;
        this.PlayButton.active = false
    },
    CheckCharacterOwning(number) {
        if(this.local.getItem("Character"+number) == "true")
        {
            this.ShowPlayButton();
        }else
        {
            this.ShowBuyButton();
        }        
    },

     update (dt) {
         let CurrentPage = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
         switch(CurrentPage)
         {
             case 0:
             this.CheckCharacterOwning(1);
             break;
             case 1:
             this.CheckCharacterOwning(2);
             break;
             case 2:
             this.CheckCharacterOwning(3);
             break;
             default:
             break;
         }
     },
});

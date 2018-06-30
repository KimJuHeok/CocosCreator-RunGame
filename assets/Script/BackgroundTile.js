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
        Spawn: {
            default:null,
            type:cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
        

    },

     update (dt) {
         if(this.node.y <= -1920)
         {
             this.Clone();
         }
        else{
            this.node.y -= 9;
            }
         
     },

     Clone() {
        var temp = cc.instantiate(this.Spawn);
        temp.setPosition(0,1870,0);
        this.node.destroy();
        this.node.parent.insertChild(temp,0);
     },
});

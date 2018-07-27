
cc.Class({
    extends: cc.Component,

    properties: {
        LocalSpeed:9,

    },
    onLoad() {
        
        this.anim = this.getComponent(cc.Animation);
    },
    onEnable() {
        for(let i = 0; i < this.node.children.length; i++)
        {
            let temp = this.node.children[i].getComponent('Coin');
            temp.RandomActive();
        }
        this.anim.play('Idle');
    },

    SetSpeed(speed) {
        this.LocalSpeed = speed;
    },
     update (dt) {

         if(this.node.y >= -1920)
         {
             this.node.y -= this.LocalSpeed;
         }
         else
         {
             this.node.active = false;
         }
     },

     onCollisionEnter: function (other, self){
         if(self.tag == 1)
         {
            this.anim.play('Half');
         }
         if(self.tag == 2)
         {
             this.anim.play('Pressed');
         }


   },

});

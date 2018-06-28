var RankString = cc.Enum({
    0:"first",
    1:"second",
    2:"third",
    3:"fourth",
    4:"fifth",
});

cc.Class({
    extends: cc.Component,

    properties: {
        SpawnObject:{
            default:[],
            type:cc.Prefab
        },
        SpawnLayer: {
            default:null,
            type:cc.Layout,
        },
        ScoreLabel: {
            default:null,
            type:cc.Label,
        },
        CurrentScore:0,
        ScoreArray:{
            default:[],
            type:cc.Integer,
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.node.on("GameOver",function() {
             this.GameOver();
         },this);
        this.local = cc.sys.localStorage;
        //this.local.clean();
        this.ScoreArrayInit();
       
     },

    start () {
        this.CurrentScore = 0;
        this.SpawnDropBegin();
    },
    GameOver() {
        cc.director.pause();
        this.ScoreAdd(this.CurrentScore);
        cc.log("GameOver");
        //cc.log(this.local.getItem("first"));
        this.ScoreSort();
        this.LocalStorageInit();
        cc.log("LocalStorage");
        for(let i = 0; i<this.ScoreArray.length-1;i++){
            cc.log(this.local.getItem(RankString["%d",i]));
        }
        cc.log("ScoreArray");
        for(let i = 0; i<this.ScoreArray.length-1;i++){
            cc.log(this.ScoreArray[i]);
        }
    },
    ScoreArrayInit() {
        for(let i=0; i<this.ScoreArray.length;i++){
            this.ScoreArray[i] = this.local.getItem(RankString["%d",i]);
        }

    },
    LocalStorageInit() {
        for(let i = 0; i<this.ScoreArray.length;i++)
        {
            this.local.setItem(RankString["%d",i],this.ScoreArray[i]);
        }

    },


    SpawnDrop:function(dt) {
        this.delta += dt;

        if( this.delta < 3.1) {
            return;
        }
        this.delta = 0;

        var DropObject_ = cc.instantiate(this.SpawnObject[Math.round(this.getRandom(1,this.SpawnObject.length-1))]);
        DropObject_.setPosition(0,1080,0);
        var dropSpeed = 7;
        var moveTo = cc.moveTo(dropSpeed,cc.p(0,-2700));

        var Sequence = cc.sequence(
            moveTo,
            cc.removeSelf(true),
        );
        this.SpawnLayer.node.addChild(DropObject_);
        DropObject_.runAction(Sequence);

    },
    SpawnDropBegin() {

        var DropObject = cc.instantiate(this.SpawnObject[0]);
        DropObject.setPosition(0,-990,0);
        var dropSpeed = 7;
        var moveTo = cc.moveTo(dropSpeed,cc.p(0,-4770));
        var Sequence = cc.sequence(
            moveTo,
            cc.removeSelf(true),
        );
        this.SpawnLayer.node.addChild(DropObject);
        DropObject.runAction(Sequence);

    },
    ScoreCount(dt) {
        this.delta_ += dt;
        if(this.delta_ < 1) {
            return;
        }
        this.delta_ = 0;
        this.CurrentScore +=1;
        this.ScoreLabel.string = this.CurrentScore; 
        

    },
    ScoreAdd(Current) {  //스코어를 배열에 넣음, 로컬저장소에도 넣어줌
        for(let i = 0; i<this.ScoreArray.length-1; i++){
            if(this.ScoreArray[i] <= Current)
            {
                this.ScoreArray.splice(i,0,Current);
                return;
            }

            if(this.ScoreArray[i] == 0 || this.ScoreArray[i] == null)
            {
            this.ScoreArray.splice(i,0,Current);
            return;
            }
        }
    },
    ScoreSort() {      //내림차순 정렬 
        for(let i = 0; i<this.ScoreArray.length-1; i++) {
            for(let j = 0; j<this.ScoreArray.length-1-i; j++) {
                if(this.ScoreArray[j] < this.ScoreArray[j+1]) {
                    let temp;
                    temp = this.ScoreArray[j];
                    this.ScoreArray[j] = this.ScoreArray[j+1];
                    this.ScoreArray[j+1] = temp;
                } 
            }
        }
    },

     update (dt) {
        this.ScoreCount(dt);
        this.SpawnDrop(dt);
      
     },

     getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
});

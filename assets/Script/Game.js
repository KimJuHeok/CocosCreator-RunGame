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
        },
        GameOverLayer:{
            default:null,
            type:cc.Layout,
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {  
         cc.director.resume();
         this.node.on("GameOver",function() {
             this.GameOver();
         },this);
        this.local = cc.sys.localStorage;
        //this.local.clear();
        this.ScoreArrayInit();
       
     },

    start () {  //현재 스코어 초기화, 플랫폼 생성 실행 
        this.CurrentScore = 0;
        this.SpawnDropBegin();
    },
    GameOver() {  //게임 오버 시 실행
        let Rank = [];
        Rank[0] = this.GameOverLayer.node.getChildByName("First");
        Rank[1] = this.GameOverLayer.node.getChildByName("Second");
        Rank[2] = this.GameOverLayer.node.getChildByName("Third");
        Rank[3] = this.GameOverLayer.node.getChildByName("Fourth");
        Rank[4] = this.GameOverLayer.node.getChildByName("Fifth");

        cc.director.pause();
        this.ScoreAdd(this.CurrentScore);
        cc.log("GameOver");
        //cc.log(this.local.getItem("first"));
        this.LocalStorageInit();
        this.GameOverLayer.node.active = true;
        // cc.log("LocalStorage");
         for(let x = 0; x<this.ScoreArray.length;x++){
            Rank[x].getComponent(cc.Label).string = this.ScoreArray[x];
         }
        // cc.log("ScoreArray");
        // for(let i = 0; i<this.ScoreArray.length-1;i++){
        //     cc.log(this.ScoreArray[i]);
        // }
    },
    ScoreArrayInit() {  //점수 배열에 local Storage에 있는 데이터들을 가져와 넣어줌
        for(let y=0; y<this.ScoreArray.length;y++){
            if(this.local.getItem(RankString["%d",y]) == null){
                this.ScoreArray[y] = 0;
            }
            else{
            this.ScoreArray[y] = this.local.getItem(RankString["%d",y]);
            }
        }

    },
    LocalStorageInit() { //Local Storage에 게임 끝난 후 남은 모든 점수 배열을 저장해줌
        for(let m = 0; m<this.ScoreArray.length;m++)
        {
            this.local.setItem(RankString["%d",m],this.ScoreArray[m]);
        }

    },


    SpawnDrop:function(dt) {  //플랫폼 생성
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
    SpawnDropBegin() {  //게임 시작 시 처음 생성되는 플랫폼

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
    ScoreCount(dt) { //점수 카운팅
        this.delta_ += dt;
        if(this.delta_ < 1) {
            return;
        }
        this.delta_ = 0;
        this.CurrentScore +=1;
        this.ScoreLabel.string = this.CurrentScore; 
        

    },
    ScoreAdd(Current) {  //스코어를 배열에 넣음
        for(let i = 0; i<this.ScoreArray.length; i++){
            if(this.ScoreArray[i] <= Current)
            {
                this.ScoreArray.splice(i,0,Current);
                this.ScoreArray.pop();
                return;
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

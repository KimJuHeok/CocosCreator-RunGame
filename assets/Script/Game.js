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
            default:null,
            type:cc.Prefab,
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
        },
        SpawnLoc_left:-190,  
        SpawnLoc_middle:23,    
        SpawnLoc_right:240,   
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
        //this.SpawnDropBegin();
    },
    GameOver() {  //게임 오버 시 실행
        // let Rank = [];
        // Rank[0] = this.GameOverLayer.node.getChildByName("First");
        // Rank[1] = this.GameOverLayer.node.getChildByName("Second");
        // Rank[2] = this.GameOverLayer.node.getChildByName("Third");
        // Rank[3] = this.GameOverLayer.node.getChildByName("Fourth");
        // Rank[4] = this.GameOverLayer.node.getChildByName("Fifth");

        // cc.director.pause();
        // this.ScoreAdd(this.CurrentScore);
        // cc.log("GameOver");
        // this.LocalStorageInit();
        // this.GameOverLayer.node.active = true;
        //  for(let x = 0; x<this.ScoreArray.length;x++){
        //     Rank[x].getComponent(cc.Label).string = this.ScoreArray[x];
        //  }

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

        if( this.delta < 0.5) {
            return;
        }
        this.delta = 0;

         let DropObject_ = cc.instantiate(this.SpawnObject);
         let SpawnLoc = this.getRandomSpawnLoc();
        DropObject_.setPosition(SpawnLoc,1080,0);
        let moveTo = cc.moveTo(5,cc.p(SpawnLoc,-1920));

        let Sequence = cc.sequence(
            moveTo,
            cc.removeSelf(true),
        );
        this.SpawnLayer.node.insertChild(DropObject_,0);
        DropObject_.runAction(Sequence);

    },
    SpawnDropBegin() {  //게임 시작 시 처음 생성되는 플랫폼

        var DropObject = cc.instantiate(this.SpawnObject[0]);
        DropObject.setPosition(0,-990,0);
        var moveTo = cc.moveTo(this.dropSpeed,cc.p(0,-4770));
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
     getRandomSpawnLoc(){
         switch (Math.round(this.getRandom(0,2))) {
            case 0:
                return this.SpawnLoc_left;
            case 1:
                return this.SpawnLoc_middle;
            case 2:
                return this.SpawnLoc_right;
  
        } 
     },

     getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
});

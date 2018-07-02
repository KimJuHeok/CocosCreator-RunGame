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
        Player:{
            default:null,
            type:cc.Node,
        },
        SpawnLoc_left:-190,  
        SpawnLoc_middle:23,    
        SpawnLoc_right:240,
        ObjectAmount:100,  
        ObjectCount:0,
 
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () { 
         this.playerScript = this.Player.getComponent('Player');
         cc.director.resume();
         this.ObjectArr = [];
         this.PrevSpawnLoc = 4;
         this.node.on("GameOver",function() {
             this.GameOver();
         },this);
        this.local = cc.sys.localStorage;
        this.ScoreArrayInit();
        
        for(let i = 0; i<this.ObjectAmount;i++)
        {
            this.ObjectArr[i] = cc.instantiate(this.SpawnObject);
            this.ObjectArr[i].active = false;
            this.SpawnLayer.node.insertChild(this.ObjectArr[i],0);
        }
     },

    start () {  //현재 스코어 초기화, 플랫폼 생성 실행 
        this.CurrentScore = 0;
        this.SpawnDropBegin();
        
        switch(this.Player.x + 10)
        {
            case this.SpawnLoc_left:
            return this.playerScript.SetPlayerLoc(-1);
            case this.SpawnLoc_middle:
            return this.playerScript.SetPalyerLoc(0);
            case this.SpawnLoc_right:
            return this.playerScript.SetPlayerLoc(1);
        }
        
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
        this.LocalStorageInit();
        this.GameOverLayer.node.active = true;
         for(let x = 0; x<this.ScoreArray.length;x++){
            Rank[x].getComponent(cc.Label).string = this.ScoreArray[x];
         }

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

        if( this.delta < 0.3) {
            return;
        }
        if(this.ObjectCount == 100)
        {
            this.ObjectCount = 0;
        }
        this.delta = 0;
        this.ObjectArr[this.ObjectCount].setPosition(this.getRandomSpawnLoc(),1920,0);
        this.ObjectArr[this.ObjectCount].active = true;
        this.ObjectCount++;

    },
    SpawnDropBegin() {  //게임 시작 시 처음 생성되는 플랫폼
        for(let i=0; i<16; i++){
            this.ObjectArr[i].setPosition(this.getRandomSpawnLoc(),i*162-750,0);
            this.ObjectArr[i].active = true;
            this.ObjectCount++;
        }
        this.Player.x = this.ObjectArr[0].x - 10;
        this.Player.y = -700;

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
         let SpawnLoc = this.getRandom(0,2);

         switch (SpawnLoc) {
            case 0:
                this.PrevSpawnLoc = SpawnLoc;
                return this.SpawnLoc_left;     
            case 1:
                this.PrevSpawnLoc = SpawnLoc;
                return this.SpawnLoc_middle;
            case 2:
                this.PrevSpawnLoc = SpawnLoc;
                return this.SpawnLoc_right;
            default:
                break;
  
        } 
        
     },

     getRandom(min, max) {
         let SpawnLoc = Math.floor(Math.random() * (max - min + 1)) + min;
         if(SpawnLoc+this.PrevSpawnLoc == 2)
         {
         return this.getRandom(0,2);
         }
        return SpawnLoc;
    }
});

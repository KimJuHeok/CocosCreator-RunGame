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
        ScoreLabel: {
            default:null,
            type:cc.Label,
        },
        BestScoreLabel: {
            default:null,
            type:cc.Label,
        },
        CoinAmoutLabel: {
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
        // Player:{
        //     default:null,
        //     type:cc.Node,
        // },
        Background:{  //1,2번째 인자 : background, 2,3번째 인자 : background_side
            default:[],
            type:cc.Node,
        },
        StartLabel:{
            default:null,
            type:cc.Label,
        },
        SpawnLoc_left:-190,  
        SpawnLoc_middle:23,    
        SpawnLoc_right:240,
        IsCountDownOver:false,
        IsGameOver:false,
        IsOnFeverMode:false,
        CountDown:5.3,
        Counter:0,
        maskLayer:{
            default:null,
            type:cc.Node,
        },
        PauseLayer:{
            default:null,
            type:cc.Layout,
        },
        GlobalCoinAmount:{
            default:0,
            type:cc.integer,
        }
        

 
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () { 
         this.node.once("GameOver",function() {
             this.GameOver();
         },this);
        this.Spawner = this.node.getComponent('Spawner');
        this.TouchMovement = this.node.parent.getComponent('TouchMovement');
        this.PrevSpawnLoc = 4;
        this.local = cc.sys.localStorage;
        
     },
     FadeOutScene(){
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(cc.fadeOut(0.2));
    },
    GetCharacter(){
        this.local = cc.sys.localStorage;
        let CurrCharacter = Number(this.local.getItem("CurrCharacter"));
        switch(CurrCharacter)
        {
            case 1:
            this.Player = cc.find("CharacterManager/Character1",this.node);
            this.playerScript = this.Player.getComponent('Player');
            break;
            case 2:
            this.Player = cc.find("CharacterManager/Character2",this.node);
            this.playerScript = this.Player.getComponent('Player');
            break;
            case 3:
            break;
            default:
            this.Player = cc.find("CharacterManager/Character1",this.node);
            this.playerScript = this.Player.getComponent('Player');
            break;
        }
    },

    start () {  //현재 스코어 초기화, 플랫폼 생성 실행,
        this.GetCharacter();
        this.GlobalCoinInit();
        this.ScoreArrayInit();
        this.BestScoreLabel.string = this.ScoreArray[0];
        this.CoinAmoutLabel.string = this.GlobalCoinAmount;
        this.FadeOutScene();
        this.CurrentScore = 0;
        this.Spawner.BeginSpawn();
        this.SetSpeedBackground(9);
        this.Spawner.SetSpeedPlatformArr(9);
        this.SetPlayerDefaultLoc();
    },

    
    PausePressed() {
        this.GamePause();
        this.PauseLayer.node.active = true;

    },
    GamePause() {
        this.IsPaused = true;
        this.SetSpeedBackground(0);
        this.Spawner.SetSpeedPlatformArr(0);
        this.TouchMovement.InputClear();
        this.playerScript.node.pauseAllActions();
        this.playerScript.anim.pause();
    },
    GameResume() {
        this.IsPaused = false;
        this.SetSpeedBackground(9);
        this.Spawner.SetSpeedPlatformArr(9);
        this.playerScript.node.resumeAllActions();
        this.PauseLayer.node.active = false;
        this.playerScript.anim.resume();

    },
 
    SetPlayerDefaultLoc(){
        this.Player.x = this.Spawner.FirstLoc;
        this.Player.y = -700;

        switch(this.Player.x + 10)
        {
            case this.SpawnLoc_left:
            return this.playerScript.SetPlayerLoc(-1);
            case this.SpawnLoc_middle:
            return this.playerScript.SetPlayerLoc(0);
            case this.SpawnLoc_right:
            return this.playerScript.SetPlayerLoc(1);
        }

    },
    GameOver() {  //게임 오버 시 실행
        this.IsGameOver = true;
        let Current = this.GameOverLayer.node.getChildByName("Current");
        Current.getComponent(cc.Label).string = this.CurrentScore;
        let Rank = [];
        Rank[0] = this.GameOverLayer.node.getChildByName("First");
        Rank[1] = this.GameOverLayer.node.getChildByName("Second");
        Rank[2] = this.GameOverLayer.node.getChildByName("Third");
        Rank[3] = this.GameOverLayer.node.getChildByName("Fourth");
        Rank[4] = this.GameOverLayer.node.getChildByName("Fifth");

        this.GamePause();
        this.ScoreAdd(this.CurrentScore);
        this.LocalStorageInit();
        this.local.setItem("GlobalCoin",this.GlobalCoinAmount);
        this.GameOverLayer.node.active = true;
         for(let x = 0; x<this.ScoreArray.length;x++){
            Rank[x].getComponent(cc.Label).string = this.ScoreArray[x];
         }

    },
    SetFeverMode() {
        this.Spawner.SetSpeedPlatformArr(14);
        this.SetSpeedBackground(14);
        this.Spawner.SetFeverTime();
        this.IsOnFeverMode = true;
    },
    SetDefaultMode() {
        this.Spawner.SetSpeedPlatformArr(9);
        this.SetSpeedBackground(9);
        this.Spawner.SetDefaultTime();
        this.IsOnFeverMode = false;
    },
    GlobalCoinInit() {
        this.GlobalCoinAmount = 0;
        this.GlobalCoinAmount = Number(this.local.getItem("GlobalCoin"));
    },
    AddCoin_Game(){
        this.GlobalCoinAmount ++;
        this.CoinAmoutLabel.string = this.GlobalCoinAmount;
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
    SetSpeedBackground(Speed){
        let temp_1 = [];
        let temp_2 = [];
        for(let i = 0; i<2;i++)
        {
            temp_1[i] = this.Background[i].getComponent('BackgroundTile');
            temp_1[i].SetSpeed(Speed);
        }
        for(let i = 2; i<4;i++)
        {
            temp_2[i] = this.Background[i].getComponent('BackgroundTile');
            if(Speed == 0){
                temp_2[i].SetSpeed(Speed);
            }
            else{
                temp_2[i].SetSpeed(Speed+3);
            }
            
        }
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
         if(!this.IsGameOver && !this.IsPaused)
        {
        this.Spawner.SpawnDrop(dt);

        if(!this.IsCountDownOver) {
            this.CountDown -= dt;
            if(this.CountDown <= 0) {
                this.IsCountDownOver = true;
                this.StartLabel.node.destroy();
            }
            if(Math.round(this.CountDown) == 0) {
                this.StartLabel.string = "Go";
                return;
            }
            this.StartLabel.string = Math.round(this.CountDown);
            return;
        }
            this.ScoreCount(dt);

        if(this.IsOnFeverMode == true)
        {
            this.Counter += dt;
            if(this.Counter >10)
            {
                this.SetDefaultMode();
                this.Counter = 0;
            }
        }

        }
     },
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
   },

   DoCountDown() {

   }

});


cc.Class({
    extends: cc.Component,

    properties: {
        SpawnObject:{
            default:[],
            type:cc.Prefab,
        },
        SpawnLayer: {
            default:null,
            type:cc.Layout,
        },
        ObjectCount_X1:0,
        ObjectCount_X2:0,
        ObjectCount_X3:0,
        ObjectAmount:40,
        SpawnLoc_left:-190,  
        SpawnLoc_middle:23,    
        SpawnLoc_right:240,
        SpawnDelayTime:0,
        FirstLoc:0,
        BeginPlatformLoc:-900,
        deltaTime_:0,
        DelayTime_X1:0.28,
        DelayTime_X2:0.58,
        DelayTime_X3:0.88,
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.IsGetFirstLoc = false;
         this.ObjectArr_X1 = [];
         this.ObjectArr_X2 = [];
         this.ObjectArr_X3 = [];
         this.ObjectComp_X1 = [];
         this.ObjectComp_X2 = [];
         this.ObjectComp_X3 = [];

        for(let j = 0; j<this.ObjectAmount;j++)
        {
            this.ObjectArr_X1[j] = cc.instantiate(this.SpawnObject[0]);
            this.ObjectArr_X1[j].active = false;
            this.SpawnLayer.node.insertChild(this.ObjectArr_X1[j],0);
            this.ObjectComp_X1[j] = this.ObjectArr_X1[j].getComponent('Platform');

            this.ObjectArr_X2[j] = cc.instantiate(this.SpawnObject[1]);
            this.ObjectArr_X2[j].active = false;
            this.SpawnLayer.node.insertChild(this.ObjectArr_X2[j],0);
            this.ObjectComp_X2[j] = this.ObjectArr_X2[j].getComponent('Platform');

            this.ObjectArr_X3[j] = cc.instantiate(this.SpawnObject[2]);
            this.ObjectArr_X3[j].active = false;
            this.SpawnLayer.node.insertChild(this.ObjectArr_X3[j],0);
            this.ObjectComp_X3[j] = this.ObjectArr_X3[j].getComponent('Platform');
        }
     },

     SpawnDrop:function(dt) {  //플랫폼 생성
        this.deltaTime_ += dt;

        if( this.deltaTime_ < this.SpawnDelayTime) {
            return;
        }
        if(this.ObjectCount_X1 == this.ObjectAmount)
        {
            this.ObjectCount_X1 = 0;
        }
        if(this.ObjectCount_X2 == this.ObjectAmount)
        {
            this.ObjectCount_X2 = 0;
        }
        if(this.ObjectCount_X3 == this.ObjectAmount)
        {
            this.ObjectCount_X3 = 0;
        }
        this.deltaTime_ = 0;
        switch(this.getRandom(0,2))
        {
            case 0:
            this.ObjectArr_X1[this.ObjectCount_X1].setPosition(this.getRandomSpawnLoc(),1920,0);
            this.ObjectArr_X1[this.ObjectCount_X1].active = true;
            this.ObjectArr_X1[this.ObjectCount_X1].setSiblingIndex(0);
            this.ObjectCount_X1++;
            this.SpawnDelayTime = this.DelayTime_X1;
   
            break;

            case 1:
            this.ObjectArr_X2[this.ObjectCount_X2].setPosition(this.getRandomSpawnLoc(),1920,0);
            this.ObjectArr_X2[this.ObjectCount_X2].active = true;
            this.ObjectArr_X2[this.ObjectCount_X2].setSiblingIndex(0);
            this.ObjectCount_X2++;
            this.SpawnDelayTime = this.DelayTime_X2;

            break;

            case 2:
            this.ObjectArr_X3[this.ObjectCount_X3].setPosition(this.getRandomSpawnLoc(),1920,0);
            this.ObjectArr_X3[this.ObjectCount_X3].active = true;
            this.ObjectArr_X3[this.ObjectCount_X3].setSiblingIndex(0);
            this.ObjectCount_X3++;
            this.SpawnDelayTime = this.DelayTime_X3;
 
            break;

        }
    },
    SetDefaultTime() {
        this.DelayTime_X1 = 0.28;
        this.DelayTime_X2 = 0.58;
        this.DelayTime_X3 = 0.88;
    },
    SetFeverTime() {
        this.DelayTime_X1 = 0.18;
        this.DelayTime_X2 = 0.35;
        this.DelayTime_X3 = 0.55;
    },

    BeginSpawn() {
        switch(this.getRandom(1,2))
        {
            case 1:
            this.ObjectArr_X2[this.ObjectCount_X2].setPosition(this.getRandomSpawnLoc(),1920,0);
            this.ObjectArr_X2[this.ObjectCount_X2].active = true;
            this.ObjectArr_X2[this.ObjectCount_X2].setSiblingIndex(1);
            if(!this.IsGetFirstLoc) {
                this.FirstLoc = this.ObjectArr_X2[this.ObjectCount_X2].x -10;
                this.IsGetFirstLoc = true;
             }
            this.ObjectCount_X2++;
            this.SpawnDelayTime = 0.58;

            break;

            case 2:
            this.ObjectArr_X3[this.ObjectCount_X3].setPosition(this.getRandomSpawnLoc(),1920,0);
            this.ObjectArr_X3[this.ObjectCount_X3].active = true;
            this.ObjectArr_X3[this.ObjectCount_X3].setSiblingIndex(1);
            if(!this.IsGetFirstLoc) {
                this.FirstLoc = this.ObjectArr_X3[this.ObjectCount_X3].x -10;
                this.IsGetFirstLoc = true;
             }
            this.ObjectCount_X3++;
            this.SpawnDelayTime = 0.88;
            break;
            }
        
    },
    SetSpeedPlatformArr(Speed){
        for(let i = 0; i<this.ObjectAmount;i++) {

            this.ObjectComp_X1[i].SetSpeed(Speed);
            this.ObjectComp_X2[i].SetSpeed(Speed);
            this.ObjectComp_X3[i].SetSpeed(Speed);
        }

    },
    getRandomSpawnLoc(){
        let SpawnLoc = this.getRandomForSpawn(0,2);

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
    getRandomForSpawn(min, max) {
        let SpawnLoc = Math.floor(Math.random() * (max - min + 1)) + min;
        if(this.ObjectCount == 0)
        {
            if(SpawnLoc == this.PrevSpawnLoc || SpawnLoc+this.PrevSpawnLoc == 2)
            {
               return this.getRandomForSpawn(0,2);
            }
        }
        else
        {
            if(SpawnLoc+this.PrevSpawnLoc == 2)
            {
                return this.getRandomForSpawn(0,2);
            }
        }
       return SpawnLoc;
   },
   getRandom(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
  },
});


cc.Class({
    extends: cc.Component,

    properties: {
        PerfectEffect:{
            default:null,
            type:cc.Prefab,
        },
        PerfectBroken:{
            default:null,
            type:cc.Node,
        },
        EffectArr:[],
        EffectScriptArr:[],
        EffectArrCount:0,
        PerfectCounter:1,
    },

    // onLoad () {},

    start () {
        this.EffectArrCount = 0;
        this.PerfectCounter = 1;
        for(let i = 0; i<10; i++)
        {
            this.EffectArr[i] = cc.instantiate(this.PerfectEffect);
            this.EffectScriptArr[i] = this.EffectArr[i].getComponent('Perfect');
            this.EffectScriptArr[i].Initalize();
            this.node.addChild(this.EffectArr[i]);
        }
    }, 
    didPerfect() {
        if(this.EffectArrCount < 10)
        {
            this.EffectArrCount = 0;
        }
        this.EffectScriptArr[this.EffectArrCount].ShowPerfect(this.PerfectCounter);
        this.PerfectCounter++;
        this.EffectArrCount++;
    },
    failPerfect() {
        if(this.EffectArrCoount < 10)
        {
            this.EffectArrCount = 0;
        }
        this.EffectScriptArr[this.EffectArrCount].FailPerfect();
        this.PerfectCounter = 1;
        this.EffectArrCount++;
    },

     update (dt) {
     },
});

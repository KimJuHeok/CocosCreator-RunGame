
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
        this.PerfectCounter = 0;
        for(let i = 0; i<30; i++)
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
        this.PerfectCounter++;
        this.EffectScriptArr[this.EffectArrCount].ShowPerfect(this.PerfectCounter);
        this.EffectArrCount++;
        if(this.PerfectCounter == 10)
        {
            this.OnFever();
        }
    },
    failPerfect() {
        if(this.EffectArrCount < 10)
        {
            this.EffectArrCount = 0;
        }
        this.EffectScriptArr[this.EffectArrCount].FailPerfect();
        this.PerfectCounter = 0;
        this.EffectArrCount++;
    },
    OnFever() {
        this.node.parent.getComponent("Player").OnFever();
    },

     update (dt) {
     },
});

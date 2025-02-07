// TimerManager.ts  
const { ccclass, property } = cc._decorator;  

@ccclass  
export default class TimerManager extends cc.Component {  
    private static _instance: TimerManager = null;  

    public static get instance(): TimerManager {  
        if (!this._instance) {  
            this._instance = new TimerManager();  
        }  
        return this._instance;  
    }  

    public time: number = 0; // 当前计时器  
    public spawnInterval: number = 1; 

    onLoad() {  
        cc.director.getPhysicsManager().enabled = true;  
    }  

    update(dt: number) {  
        
    }  

    // 重置计时器  
    public resetTimer() {  
        this.time = 0;  
    }  

     
}
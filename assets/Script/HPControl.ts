import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    playerNode: cc.Node = null;
    maxHealth: number = 100;
    // 当前生命值
    private _currentHealth: number = 100;

    get currentHealth(): number {
        return this._currentHealth;
    }

    set currentHealth(value: number) {
        // 限制当前生命值范围在0到最大生命值之间
        this._currentHealth = Math.min(Math.max(value, 0), this.maxHealth);
        this.updateProgressBar();
    }

    onLoad() {
        this.updateProgressBar();
    }

    updateProgressBar() {
        if (this.getComponent(cc.ProgressBar)) {
            const percentage = this._currentHealth / this.maxHealth;
            this.getComponent(cc.ProgressBar).progress = percentage;
           
        }
    }

    takeDamage(damage: number) {
        this.currentHealth -= damage;
    }

    heal(healAmount: number) {
        this.currentHealth += healAmount;
    }
  
   

    start () {
        
    }

    update (dt) {
        if (this.playerNode) {  
            const play = this.playerNode.getComponent(PlayerControl);  
            if (play && play.player) {  
                this._currentHealth = play.player.health; // 确保 play.player 不为 null  
                this.updateProgressBar();  
            } else {  
                console.error("PlayerControl component or player is null.");  
            }  
        } else {  
            console.error("PlayerNode reference is null.");  
        }
    }
}

import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExperienceControl extends cc.Component {
    @property(cc.Node)
    playerNode: cc.Node = null;
    maxexp: number = 100;
    currentexp: number = 0;

    onLoad() {
        this.updateProgressBar();
    }

    updateProgressBar() {
        if (this.getComponent(cc.ProgressBar)) {
            const percentage = this.currentexp / this.maxexp;
            this.getComponent(cc.ProgressBar).progress = percentage;
           
        }
    }
    

    start () {
        
    }

    update (dt) {
        const play = this.playerNode.getComponent(PlayerControl)
        this.currentexp = play.player.exp;
        this.updateProgressBar();
    }
}

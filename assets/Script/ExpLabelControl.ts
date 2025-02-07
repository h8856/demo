import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Node)
  pc:cc.Node = null;
    Label: any;
    onLoad () {

    }

    start () {

    }

    update (dt) {
        const play = this.pc.getComponent(PlayerControl);
        this.node.getComponent(cc.Label).string = play.player.lv + "";
        
    }
}

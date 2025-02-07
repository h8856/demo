import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HealthControl extends cc.Component {
    // @property(PlayerControl)
    // playercontrol:PlayerControl = null;
    iscolliding:boolean = false;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {
        
    }
    die(){
        this.node.destroy();
    }
    onBeginContact(contact, self, other){
        
        
    }
}

import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapControl extends cc.Component {
    @property(PlayerControl)
    player:PlayerControl = null;

    x:number;
    y:number;
    
    posix:number;
    posiy:number;
    onLoad () {

    }

    start () {

    }

    update (dt) {
        this.bgcontrol();
    }
    bgcontrol(){
        for (let child of this.node.children) {
            this.x = child.x;
            this.y = child.y;
            this.posix = this.player.node.position.x;
            this.posiy = this.player.node.position.y;
            let disx = this.posix - this.x;
            let disy = this.posiy - this.y;
            if(Math.abs(disx)>=1800){
                if(disx > 0 ){
                    disx = 1024;
                }
                if(disx < 0 ){
                    disx = -1024;
                }
                child.x += disx*3
            }
            if(Math.abs(disy)>=704){
                if(disy > 0 ){
                    disy = 704;
                }
                if(disy < 0 ){
                    disy = -704;
                }
                child.y += disy*2
            }
        }
    }
}

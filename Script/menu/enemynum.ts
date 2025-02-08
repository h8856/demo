
const {ccclass, property} = cc._decorator;

@ccclass
export default class enemynum extends cc.Component {

  
    onLoad () {

    }

    start () {

    }

    update (dt) {
        let num = cc.find("enemys").children.length;
        this.node.getComponent(cc.Label).string = num + "";
        
    }
}

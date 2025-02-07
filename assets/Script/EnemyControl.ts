
import BulletControl from "./BulletControl";
import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;
class enemy{
    hp:number;
    lv:number;
    isdie:boolean;
    constructor(hp:number,lv:number,isdie:boolean){
        this.hp = hp;
        this.lv = lv; 
        this.isdie = isdie;
    }
}
@ccclass
export default class EnemyControl extends cc.Component {
    player:cc.Node = null;
    bullet_hurt:number = 100;
    @property(cc.Prefab)
    healthpre:cc.Prefab = null;
    @property(cc.Prefab)
    exp:cc.Prefab = null;
    
    enemyAnimation:cc.Animation = null;
    ene:enemy;
    moveSpeed: number = 15;
    earn:number = 0;
    HP = 100;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.player = cc.find("player");
        let playercontrol = this.player.getComponent(PlayerControl);
        this.ene = new enemy(this.HP,1,false)
        this.bullet_hurt =playercontrol.hurt;
        this.enemyAnimation = this.getComponent(cc.Animation);
        if (this.enemyAnimation) {  
            this.playSpawnAnimation(); // 如果Animation组件存在，播放生成动画  
        } else {  
            cc.error("未找到Animation组件，请检查");  
        }
        this.schedule(this.move, 0.1);
    }
    playSpawnAnimation() {  
        // 播放生成动画  
        if (this.enemyAnimation) {  
            this.enemyAnimation.play("enemyclip"); // 使用动画剪辑的名称  
        } else {  
            cc.error("未找到 Animation 组件，请检查");  
        }  
    }
    stopAnimation() {  
        if (this.enemyAnimation) {  
            this.enemyAnimation.stop(); // 停止当前播放的动画  
            // 或者停止特定的动画，可以指定动画的名称  
            // this.enemyAnimation.stop("enemyclip"); // 停止特定动画  
        } else {  
            cc.error("未找到 Animation 组件，请检查");  
        }  
    } 
    start () {

    }
    rotateTowardsPlayer(direction: cc.Vec2) {  
        const rigidBody = this.getComponent(cc.RigidBody);  
        if (!rigidBody || !this.ene.isdie) return;
        const angle = Math.atan2(direction.x, direction.y) * (180 / Math.PI); // 转换到角度  
        this.node.rotation = angle+180; // 设置敌人的旋转角度  
    }
    move(dt) {  
        if (this.ene.hp > 0 && !this.ene.isdie) {  
            // 获取玩家的世界坐标  
            const playerWorldPosition = this.player.convertToWorldSpaceAR(cc.v2(0, 0));  
    
            // 获取敌人的世界坐标  
            const enemyWorldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));  
           
            // 计算朝向玩家的方向  
            const direction = playerWorldPosition.sub(enemyWorldPosition).normalize();   
            
            const rigidBody = this.getComponent(cc.RigidBody);  
            if (rigidBody) {  
                rigidBody.linearVelocity = direction.mul(this.moveSpeed); // 设置刚体的线性速度  
                this.rotateTowardsPlayer(direction); // 旋转朝向玩家  
            }  
        }  
    }
    die() {  
            const health = Math.random();  
            this.stopAnimation();  
            this.experience_init();  
            if (health >= 0.9) {  
                cc.log("生成爱心");  
                const heal = cc.instantiate(this.healthpre);    
                heal.setParent(this.node.parent);   
                heal.setScale(15, 15);   
                heal.position = this.node.position;  
            }

            this.node.destroy(); // 动作完成后再销毁节点  
     
    } 
    experience_init(){  
        
        if (this.exp) {  
            const experience = cc.instantiate(this.exp);  
            experience.setParent(this.node.parent);  
            experience.position = this.node.position;  
            experience.setScale(15, 15);  
            
        } else {  
            cc.error("经验Prefab未赋值，请检查");  
        }   
    }

    getenemyisdie(){
        return this.ene.isdie;
    }
    update (dt) {
        
            // this.move(dt); // 让敌人移动  
            if(this.ene.hp<=0){
                cc.director.getPhysicsManager().enabled = false;
                
                this.ene.hp = 0
                this.ene.isdie = true;
                this.die();
            }
            let playercontrol = this.player.getComponent(PlayerControl);
            this.HP = 100 + 100 * 0.5 * this.ene.lv;
            if(playercontrol.player.lv%5 == 0){
                this.ene.lv ++;
            }
            
        
    }
    onBeginContact(contact, self, other){
        
        if(other.tag == 0 && this.ene.isdie == false){
            this.ene.hp -= this.bullet_hurt;
            const action = cc.blink(0.5,3)
            this.node.runAction(action);
        }
        if(other.tag == 202 && this.ene.isdie == false){
            this.ene.hp -= this.bullet_hurt;
            const action = cc.blink(0.5,3)
            this.node.runAction(action);
        }
    }
}

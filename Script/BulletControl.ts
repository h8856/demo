
import HiddenJoystick from './HiddenJoystick';
const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {
    bullet_hurt:number = 50;
    player:cc.Node = null;
    static bullet_hurt: number;
    onLoad(): void {
        this.player = cc.find("player");
        cc.director.getCollisionManager().enabled = true;
      
    }

    static initialize(direction: any, Vec2: typeof cc.Vec2, speed: any, number: any) {
        throw new Error("Method not implemented.");
    }
    private direction: cc.Vec2 = cc.v2(0, 0);  
    private speed: number = 0;  

    // 初始化方法  
    initialize(direction: cc.Vec2, speed: number) {  
        this.direction = direction.normalize(); // 归一化方向向量  
        this.speed = speed;  
        const rigidBody = this.getComponent(cc.RigidBody);  
        if (rigidBody) {  
            rigidBody.linearVelocity = this.direction.mul(this.speed); // 设置物理速度  
        }  
    } 

    update(dt: number) {  

        // 判断子弹是否超出屏幕或者其他逻辑  
        if (Math.abs(this.node.position.y - this.player.position.y) > 1500 || Math.abs(this.node.position.x - this.player.position.x)> 1500) {  
            this.node.destroy(); // 超出屏幕则销毁子弹  
            // cc.log("子弹飞出屏幕")
        }  
    }
    onBeginContact(contact, self, other){
        if(other.tag == 1){
        // cc.log("子弹发生碰撞");  
            this.node.destroy(); // 碰撞时销毁子弹 
        }
    }
}

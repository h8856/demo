import PlayerControl from "./PlayerControl";

const {ccclass, property} = cc._decorator;  

@ccclass  
export default class HiddenJoystick extends cc.Component {  
    @property  
    moveSpeed: number = 200; // 玩家移动速度  
    
    @property(cc.Node)
    player:cc.Node = null;
    private touchPosition: cc.Vec2 = null; // 触摸起始位置  
    private movePosition: cc.Vec2 = null; // 当前触摸位置  
    private isTouching: boolean = false; // 控制是否正在触摸  
 
    
    onLoad() {  
        // 绑定触摸事件  
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);  
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);  
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);  
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);  

        // 获取玩家节点，确保路径正确  
         // 根据实际路径调整  
        if(this.player){
            const a = this.node.getComponent(PlayerControl);
            // this.moveSpeed = a.movespeed();
        }
    }  

    onTouchStart(event) {  
        this.isTouching = true; // 开始触摸  
        this.touchPosition = event.getLocation();   
        this.movePosition = this.touchPosition;   
        
    
        // // 将触摸位置转换为摇杆的局部坐标  
        // const touchLocalPosition = this.node.convertToNodeSpaceAR(this.touchPosition);  
        // this.yaogan.position = touchLocalPosition;  
    }  

    onTouchMove(event) {  
        this.movePosition = event.getLocation(); // 更新当前触摸位置  
    }  

    onTouchEnd() {  
        this.isTouching = false; // 结束触摸  
       
    }  

    updateJoystick(){  
        if (!this.touchPosition || !this.movePosition) return; // 确保触摸位置有效  

        const delta = this.movePosition.sub(this.touchPosition); // 计算触摸点与玩家的偏移量  
        const distance = delta.mag(); // 计算距离  

        // 设置移动的最大半径  
        const maxDistance = 281; // 最大距离，可以根据需要调整  
        if (distance > maxDistance) {  
            delta.normalize(); // 归一化方向向量  
            delta.mul(maxDistance); // 限制在最大距离  
        }  

        // 更新玩家位置  
        const direction = delta.normalize(); // 计算方向向量  
        this.player.position = this.player.position.add(direction.mul(this.moveSpeed * cc.director.getDeltaTime()));  
        

        // 计算玩家旋转角度（参数交换）   
        const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI); // 交换参数  
        this.player.angle = angle+90; // 更新玩家的旋转
        return direction;
    }  
    
    update(dt) {  
        if (this.isTouching) {  
            this.updateJoystick(); // 调用更新摇杆的方法  
            // 直接设置摄像机位置为玩家位置  
            cc.Camera.main.node.position = cc.v2(this.player.position.x - 480, this.player.position.y - 320);  
        }  
    }  
}
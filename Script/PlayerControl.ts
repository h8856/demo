import BulletControl from "./BulletControl";
import EnemyControl from "./EnemyControl";
import ExperienceControl from "./ExperienceControl";
import HealthControl from "./HealthControl";
import kuwuControl from "./kuwuControl";
import ManagerBase from "./ManagerBase";
import Message from "./Message";
// import PlayerManager from "./PlayerManager";
import TimerManager from "./TimeMnanger";
const {ccclass, property} = cc._decorator;
class Player{
    health:number
    lv:number
    exp:number;
    speed:number
    maxhealth:number = 100;
   
    constructor(health:number,lv:number,exp:number,speed:number){
        this.health = this.maxhealth;
        this.lv = lv;
        this.exp = exp;
        this.speed = speed;
    }
}
@ccclass
export default class PlayerControl extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null; // 子弹预制体  
    @property(cc.Prefab)
    kuwuPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;//敌人预设体
    @property  
    bulletSpeed: number = 600; // 子弹速度
    
    player:Player = null;
    static health: number;
    enemiesPerSecond: number = 5;
    experience:number = 0;
    Weapon:number = 1;//武器类型
    shootnum:number = 1;//射击频率
    hurt:number = 100;//伤害
    bulletFre:number = 1;//攻击间隔
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.player = new Player(100,1,0,200)
        cc.director.resume(); 
    }
    up_attack(){
        this.hurt *= 1.5;
    }
    up_atackspeed(){
        this.bulletFre *= 0.8;
    }
    update_Weapon(){
        this.Weapon = 2;
    }
    movespeed(){
        return this.player.speed;
    }
    shoot() {   
        for(let num = 0;num<this.shootnum;num++){

        
        if(this.Weapon == 1){
            // 实例化子弹  
            const bulletNode = cc.instantiate(this.bulletPrefab);  
        
            // 设置子弹的父节点  
            bulletNode.setParent(this.node.parent);  
            // 设置子弹的初始位置  
            bulletNode.position = this.node.position;  
        
            // 默认方向：玩家朝向  
            let angle = this.node.angle; // 玩家当前角度  
            let radian = angle * (Math.PI / 180); // 弧度  
            let directionVector = cc.v2(Math.sin(radian), -Math.cos(radian)); // 默认方向向量  
        
            // 找到所有敌人  
            let enemies = cc.find("enemys").children;  
            let playerWorldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO); // 玩家世界坐标  
        
            // 初始化变量，用于找到最近的敌人  
            let closestDistance = 400; // 初始为正无穷  
            let targetEnemy = null; // 最近敌人  
        
            for (let enemyNode of enemies) {  
                if (enemyNode.active) {  
                    // 获取敌人的世界坐标  
                    let enemyWorldPos = enemyNode.convertToWorldSpaceAR(cc.Vec2.ZERO);  
        
                    // 计算玩家和敌人之间的世界距离  
                    let distance = playerWorldPos.sub(enemyWorldPos).mag();  
        
                    if (distance < closestDistance) {  
                        closestDistance = distance;  
                        targetEnemy = enemyNode;  
                    }  
                }  
            }  
        
                // 如果找到了最近的敌人，根据方向计算向量  
            if (targetEnemy) {  
                let targetWorldPos = targetEnemy.convertToWorldSpaceAR(cc.Vec2.ZERO); // 敌人全局坐标  
                directionVector = targetWorldPos.sub(playerWorldPos).normalize(); // 瞄准敌人的向量  
            }  
        
            // 计算子弹的旋转角度  
            let bulletAngle = Math.atan2(directionVector.y, directionVector.x) * (180 / Math.PI); // 将方向向量转换为角度  
            bulletNode.angle = bulletAngle + 90; 
            // 初始化子弹的方向和速度  
            bulletNode.getComponent(BulletControl).initialize(directionVector, this.bulletSpeed);  
                    
        }
        if (this.Weapon == 2) {
            // 实例化子弹  
            const bulletNode = cc.instantiate(this.kuwuPrefab);  
        
            // 设置子弹的父节点  
            bulletNode.setParent(this.node.parent);  
            // 设置子弹的初始位置  
            bulletNode.position = this.node.position;  
        
            // 默认方向：玩家朝向  
            let angle = this.node.angle; // 玩家当前角度  
            let radian = angle * (Math.PI / 180); // 弧度  
            let directionVector = cc.v2(Math.sin(radian), -Math.cos(radian)); // 默认方向向量  
        
            // 找到所有敌人  
            let enemies = cc.find("enemys").children;  
            let playerWorldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO); // 玩家世界坐标  
        
            // 初始化变量，用于找到最近的敌人  
            let closestDistance = 400; 
            let targetEnemy = null; // 最近敌人  
        
            for (let enemyNode of enemies) {  
                if (enemyNode.active) {  
                    // 获取敌人的世界坐标  
                    let enemyWorldPos = enemyNode.convertToWorldSpaceAR(cc.Vec2.ZERO);  
        
                    // 计算玩家和敌人之间的世界距离  
                    let distance = playerWorldPos.sub(enemyWorldPos).mag();  
        
                    if (distance < closestDistance) {  
                        closestDistance = distance;  
                        targetEnemy = enemyNode;  
                    }  
                }  
            }  
        
                // 如果找到了最近的敌人，根据方向计算向量  
            if (targetEnemy) {  
                let targetWorldPos = targetEnemy.convertToWorldSpaceAR(cc.Vec2.ZERO); // 敌人全局坐标  
                directionVector = targetWorldPos.sub(playerWorldPos).normalize(); // 瞄准敌人的向量  
            }  
        
            // 计算子弹的旋转角度  
            let bulletAngle = Math.atan2(directionVector.y, directionVector.x) * (180 / Math.PI); // 将方向向量转换为角度  
            bulletNode.angle = bulletAngle + 90; 
            // 初始化子弹的方向和速度  
            bulletNode.getComponent(kuwuControl).initialize(directionVector, this.bulletSpeed);  
           
        }
    }
        
    } 
    
    addEnemy() {  
        const minRadius = 500;  
        const maxRadius = 800;  

        for (let i = 0; i < this.enemiesPerSecond; i++) {  
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;  
            const randomAngle = Math.random() * 2 * Math.PI;   

            // 计算全局坐标  
            const enemyPosition = cc.v2(  
                this.node.x + radius * Math.cos(randomAngle),  
                this.node.y + radius * Math.sin(randomAngle)  
            );  

            // 实例化敌人并设置其位置  
            const enemyNode = cc.instantiate(this.enemyPrefab);    
            const enemyParent = cc.find("enemys"); // 获取敌人父节点  
            enemyNode.setParent(enemyParent);  
            enemyNode.setScale(1, 1); // 确保敌人的缩放为正常  

            // 设置敌人的位置为全局坐标  
            enemyNode.position = enemyParent.convertToNodeSpaceAR(enemyPosition);  
        }  
        this.enemiesPerSecond + 1;
    }  
    healthup(hp:number){
        this.player.health += hp;
        if(this.player.health >= this.player.maxhealth){
            this.player.health = this.player.maxhealth;
        }
        cc.log(this.player.health)
    }
    @property(cc.Node)
    Skill:cc.Node = null;
    experience_up(){
        this.player.exp += 10;
        if(this.player.exp >= 100){
            const t = this.player.exp - 100;
            this.player.exp = t;
            this.player.lv += 1;
            if(this.player.lv%5 == 0){
                this.Skill.active = true;
            }
        }
    }
    start () {
        // PlayerManager.instance.RegisterReceiver(this)
        this.schedule(this.shoot, this.bulletFre);
        this.schedule(this.addEnemy, 2);
    }
    ReceiveMessage(message:Message){



    }
    onBeginContact(contact, self, other){
        if(other.tag == 101){
                this.healthup(20);
                other.getComponent(HealthControl).die();
        }
        if(other.tag == 102){
            this.experience_up();
            const experienceControl = other.getComponent(HealthControl);  
            if (experienceControl) {  
            experienceControl.die(); // 只有在组件存在时才调用  
            } else {  
                cc.warn("ExperienceControl组件未找到");  
            }  

        }
        if(other.tag == 1){
            this.player.health -= 5;
        }
       
    }
    pause(){
        cc.director.pause();
    }
    update (dt) {
       
        TimerManager.instance.time += dt;//计时器更新
        
    }
}

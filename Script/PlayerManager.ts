// import ManagerBase from "./ManagerBase";  

// const {ccclass, property} = cc._decorator;  

// @ccclass  
// export default class PlayerManager extends ManagerBase {  
//     static instance: PlayerManager;  
  
//     onLoad() {  
//         super.onLoad();  
//         if (PlayerManager.instance) {  
//             // 如果已经存在实例，则销毁此节点  
//             cc.warn("PlayerManager instance already exists. Destroying this instance.");  
//             this.node.destroy();  
//             return;  
//         }  
        
//         PlayerManager.instance = this;   
//         cc.log("PlayerManager instance created.");  
//     }  

//     start() {  
//         cc.log("PlayerManager started.");  
//     }  
    
//     update (dt) {  
//         // 可以添加一些逻辑  
//     }  

//     // 注册接收器  
//     RegisterReceiver(receiver) {  
//         cc.log("Receiver registered:", receiver);  
//         // 添加接收器处理逻辑  
//     }  
// }
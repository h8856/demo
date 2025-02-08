
import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ManagerBase extends ComponentBase {
    //管理的消息接受者数组
    ReceiveList: ComponentBase[] = [];
    //当前管理类接受的具体消息类型
    messageType: number;
    onLoad(): void {
        //设置当前管理类接受的消息类型
        this.messageType =  this.SetMessageType();
        MessageCenter.Managers.push(this);
    }

    //设置当前消息管理的消息类型
    SetMessageType(){
        return MessageType.Type_player;
    }

    //注册消息监听
    RegisterReceiver(cb: ComponentBase){
        this.ReceiveList.push(cb);
        // cc.log(this.ReceiveList.length)
    }
    ReceiveMessage(message:Message){
        super.ReceiveMessage(message);
        if(message.Type != this.messageType){
            return;
        }
        //向下层分发消息
        for (let cb of this.ReceiveList){
            cb.ReceiveMessage(message);
            
            
        }
    }
}

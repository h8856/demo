import ComponentBase from "./ComponentBase";
import Message from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageCenter{
    // 管理类列表
    static Managers:ComponentBase[] = [];

    //发送消息
    static SendMessage(msg:Message){
        for(let manager of this.Managers){
            manager.ReceiveMessage(msg);
        }
    }
    static SendCustomMessage(type:number,Command:number,content:any){
        let msg = new Message(type,Command,content)
        this.SendMessage(msg);
    }
   
}

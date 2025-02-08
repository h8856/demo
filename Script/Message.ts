const {ccclass, property} = cc._decorator;

@ccclass
export default class Message {
    //类型
    Type: number
    //执行的命令
    Command: number
    //参数
    Content: any

    constructor(Type,Command,Content){
        this.Type = Type
        this.Command = Command
        this.Content = Content
    }
    
}
export class MessageType {
    static Type_player =1;
    static Type_enemy = 2;
    static Type_fire = 3;

    static RefreshHp = 101;
    static RefreshPower = 103;
    
    
}
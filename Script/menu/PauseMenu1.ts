const {ccclass, property} = cc._decorator;  

@ccclass  
export default class NewClass extends cc.Component {  
    private isPaused: boolean = false;  
    @property(cc.Node)
    menu:cc.Node = null;
    // 切换暂停状态  
    togglePause() {  
        this.isPaused = !this.isPaused;  
        if (this.isPaused) {  
            this.pauseGame();  
        } else {  
            this.resumeGame();  
        }  
    }  

    // 暂停游戏  
    private pauseGame() {  
        cc.director.pause();  
        this.showPauseMenu();  
    }  

    // 恢复游戏  
    private resumeGame() {  
        cc.director.resume();  
        this.hidePauseMenu();  
    }  

    private showPauseMenu() {  
        this.menu.active = true;
    }  

    private hidePauseMenu() {  
        this.menu.active = false;
    }  
}  

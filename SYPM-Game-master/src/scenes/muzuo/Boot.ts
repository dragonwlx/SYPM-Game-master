import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.setPath('assets/img');
        this.load.image('background', 'game-muzuo/start-bg.png');
        this.load.svg('rotate-icon', 'common/rotate-icon.svg');  // 加载旋转提示图标
    }

    create ()
    {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);
        
        this.scene.start('Preloader');
    }
}

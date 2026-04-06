import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);
        
        // 设置透明背景
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
        
        // 设置背景
        const background = this.add.image(960, 670, 'start-bg');
        background.setScale(Math.max(1920 / background.width, 1341 / background.height));

        // 添加开始按钮
        const startButton = this.add.image(1600, 972, 'start-button');
        const startButtonDefaultScale = Math.max(90/ startButton.width, 90 / startButton.height)
        // startButton.setDisplaySize(90, 90);
        startButton.setScale(startButtonDefaultScale); // 确保初始缩放比例为1
        startButton.setInteractive({ cursor: 'pointer' });

        // 添加退出按钮
        const exitButton = this.add.rectangle(1672, 223, 65, 130, 0xffffff, 0);
        exitButton.setInteractive({ cursor: 'pointer' });
        exitButton.setDepth(2000); // 确保在最上层

        // 点击退出按钮隐藏游戏容器
        exitButton.on('pointerdown', () => {
            const gameContainer = document.getElementById('game-youzuo');
            if (gameContainer) {
                gameContainer.style.display = 'none';
                document.body.classList.remove('body-no-scroll');
                document.body.classList.remove('game-opened');
            }
        });

        // 添加按钮悬浮效果
        startButton.on('pointerover', () => {
            this.tweens.add({
                targets: startButton,
                scale: startButtonDefaultScale * 1.1,
                duration: 100,
                ease: 'Power1'
            });
        });

        startButton.on('pointerout', () => {
            this.tweens.add({
                targets: startButton,
                scale: startButtonDefaultScale,
                duration: 100,
                ease: 'Power1'
            });
        });

        // 点击开始按钮进入游戏
        startButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}

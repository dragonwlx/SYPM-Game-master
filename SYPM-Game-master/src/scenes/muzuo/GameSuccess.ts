import { Scene } from 'phaser';

export class GameSuccess extends Scene {
    constructor() {
        super('GameSuccess');
    }

    create() {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);

        // 设置透明背景
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        // 设置背景
        const background = this.add.image(960, 670, 'success-bg');
        background.setScale(Math.max(1920 / background.width, 1341 / background.height));

        // 添加成功 logo
        const successLogo = this.add.image(990, 580, 'success-logo');
        // 设置初始状态
        successLogo.setScale(0);
        successLogo.setAngle(0);
        // 设置目标尺寸
        const targetScale = (520 + 230) / successLogo.width;
        // 添加旋转放大动画
        this.tweens.add({
            targets: successLogo,
            scaleX: targetScale,
            scaleY: targetScale,
            angle: 360,
            duration: 1200,
            ease: 'Back.out(1.7)'
        });
        // 添加文字
        const successText = this.add.image(951, 980, 'success-text');
        successText.setScale(0);
        successText.setAngle(0);
        // 设置目标尺寸
        // 添加从小到大直接放大动画
        this.tweens.add({
            targets: successText,
            scaleX: 0.8,
            scaleY: 0.8,
            duration: 1200,
            ease: 'Back.out(1.7)'
        });
        // 添加下一个按钮
        const nextButton = this.add.image(960, 1045, 'success-next');
        nextButton.setScale(0);
        nextButton.setAngle(0);
        // 设置目标尺寸
        // 添加放大动画, 延迟1200ms 后开始
        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: nextButton,
                scaleX: 0.85,
                scaleY: 0.85,
                duration: 600,
                ease: 'Back.out(1.7)'
            });
        });
        // 添加透明度从 0.3-1 持续来回变化的动画, 延迟1800ms 后开始
        this.time.delayedCall(1800, () => {
            this.tweens.add({
                targets: nextButton,
                alpha: { from: 1, to: 0.3 },
                duration: 600,
                ease: 'Power2',
                yoyo: true,
                repeat: -1
            });
        });

        // 添加白色半透明的巨大返回按钮
        const returnButton = this.add.rectangle(950, 735, 1800, 870, 0xffffff, 0);
        returnButton.setInteractive({ cursor: 'pointer' });
        returnButton.setDepth(2000); // 确保在最上层
        returnButton.on('pointerdown', () => {
            this.scene.start('GameSuccess');
        });

        // 添加退出按钮
        const exitButton = this.add.rectangle(1672, 223, 65, 130, 0xffffff, 0);
        exitButton.setInteractive({ cursor: 'pointer' });
        exitButton.setDepth(2000); // 确保在最上层

        // 点击退出按钮隐藏游戏容器
        exitButton.on('pointerdown', () => {
            const gameContainer = document.getElementById('game-muzuo');
            if (gameContainer) {
                this.scene.start('MainMenu');
                gameContainer.style.display = 'none';
                document.body.classList.remove('body-no-scroll');
                document.body.classList.remove('game-opened');
            }
        });

        // 添加按钮悬浮效果
        returnButton.on('pointerover', () => {
            this.tweens.add({
                targets: returnButton,
                scale: 0.9,
                duration: 200,
                ease: 'Power1'
            });
        });

        returnButton.on('pointerout', () => {
            this.tweens.add({
                targets: returnButton,
                scale: 0.8,
                duration: 200,
                ease: 'Power1'
            });
        });

        // 点击返回按钮返回主菜单
        returnButton.on('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }
}

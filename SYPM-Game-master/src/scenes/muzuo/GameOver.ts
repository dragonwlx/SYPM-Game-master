import { Scene } from 'phaser';

export class GameOver extends Scene {
    private stars: Phaser.GameObjects.Image[] = [];

    constructor() {
        super('GameOver');
    }

    create() {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);

        // 设置透明背景
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        // 设置背景
        const background = this.add.image(960, 670, 'over-bg');
        background.setScale(Math.max(1920 / background.width, 1341 / background.height));

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

        // 创建三个星星
        const star1 = this.add.image(350, 440, 'star');
        const star2 = this.add.image(760, 580, 'star');
        const star3 = this.add.image(210, 500, 'star');

        // 设置不同的大小
        star1.setScale(0.3);
        star2.setScale(0.5);
        star3.setScale(0.8);

        // 设置初始角度
        star1.setAngle(15);
        star2.setAngle(-20);
        star3.setAngle(0);

        // 将星星添加到数组中以便更新
        this.stars = [star1, star2, star3];

        // 为每个星星创建旋转动画
        this.stars.forEach((star, index) => {
            this.tweens.add({
                targets: star,
                angle: { from: star.angle, to: star.angle + (index % 2 === 0 ? 20 : -20) },
                duration: 600 + index * 100,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
}

import { Scene } from 'phaser';

export class PortraitWarning extends Scene {
    private rotateIcon: Phaser.GameObjects.Image;

    constructor() {
        super('PortraitWarning');
    }

    create() {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);

        // 设置纯黑背景
        this.cameras.main.setBackgroundColor('#000000');

        // 检查旋转图标是否存在
        if (!this.textures.exists('rotate-icon')) {
            // 如果图标未加载，创建一个简单的图形
            const graphics = this.add.graphics();
            graphics.lineStyle(4, 0xffffff);
            graphics.strokeRect(960 - 50, 570 - 50, 100, 100);
            graphics.strokeRect(960 - 40, 570 - 40, 80, 80);
            graphics.setPosition(0, 0);

            // 添加旋转动画
            this.tweens.add({
                targets: graphics,
                angle: 90,
                duration: 600,
                ease: 'Power1',
                yoyo: true,
                repeat: -1
            });
        } else {
            // 添加旋转图标
            this.rotateIcon = this.add.image(960, 570, 'rotate-icon');
            this.rotateIcon.setScale(0.8);

            // 添加旋转动画
            this.tweens.add({
                targets: this.rotateIcon,
                angle: 90,
                duration: 600,
                ease: 'Power1',
                yoyo: true,
                repeat: -1
            });
        }

        // 添加提示文本
        const warningText = this.add.text(960, 770, '请将设备横向放置以获得最佳体验', {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        });
        warningText.setOrigin(0.5);

        // 检测屏幕方向
        this.checkOrientation();

        // 添加 resize 事件监听
        window.addEventListener('resize', () => this.checkOrientation());
    }

    private checkOrientation() {
        // 直接使用窗口尺寸进行检测
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / height;

        // 如果是横屏，返回之前的场景
        if (ratio > 1) {
            const previousScene = this.registry.get('previousScene') || 'Boot';
            this.scene.start(previousScene);
        }
    }

    update() {
        // 不需要在 update 中持续检测，因为我们已经添加了 resize 事件监听
    }
}

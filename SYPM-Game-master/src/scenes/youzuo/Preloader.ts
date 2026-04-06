import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);

        // 设置透明背景
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        // 进度条外框
        const barBg = this.add.rectangle(960, 670, 600, 40).setStrokeStyle(2, 0xffffff);

        // 进度条
        const bar = this.add.rectangle(960 - 298, 670, 4, 36, 0xffffff);

        // 使用进度事件更新进度条
        this.load.on('progress', (progress: number) => {
            // 更新进度条宽度
            bar.width = 4 + (596 * progress);
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/img/game-youzuo');

        this.load.image('start-button', 'start.png');  // 加载开始按钮图片
        this.load.image('bg', 'bg.png');  // 加载游戏场景背景
        this.load.image('start-bg', 'start-bg.png');  // 加载开始场景背景
        this.load.image('success-bg', 'success-bg.png');  // 加载成功场景背景
        this.load.image('button-0', '0.png');  // 加载目标区域默认填充图
        this.load.image('success-logo', 'success-logo.png');  // 加载成功场景的 logo
        this.load.image('success-text', 'success-text.png');  // 加载成功场景的文字
        this.load.image('success-next', 'success-next.png');  // 加载成功场景的下一关按钮
        this.load.image('over-bg', 'over-bg.png');  // 加载结束场景背景
        this.load.image('star', 'star.png');  // 加载星星!

        // 加载所有按钮的第一张图片
        this.load.image('button-1-1', '1-1.png');  // 可拖动，可翻面
        this.load.image('button-2-1', '2-1.png');  // 可翻面
        this.load.image('button-3-1', '3-1.png');  // 可拖动，可翻面
        this.load.image('button-4-1', '4-1.png');  // 可翻面
        this.load.image('button-5-1', '5-1.png');  // 可翻面
        this.load.image('button-6-1', '6-1.png');  // 可拖动，可翻面
        this.load.image('button-9-1', '9-1.png');  // 可拖动，可翻面
        this.load.image('button-11-1', '11-1.png'); // 可拖动，可翻面

        // 加载需要翻面效果的按钮的第二张图片（1-6,9,11）
        this.load.image('button-1-2', '1-2.png');  // 按钮1翻面图片
        this.load.image('button-2-2', '2-2.png');  // 按钮2翻面图片
        this.load.image('button-3-2', '3-2.png');  // 按钮3翻面图片
        this.load.image('button-4-2', '4-2.png');  // 按钮4翻面图片
        this.load.image('button-5-2', '5-2.png');  // 按钮5翻面图片
        this.load.image('button-6-2', '6-2.png');  // 按钮6翻面图片
        this.load.image('button-9-2', '9-2.png');  // 按钮9翻面图片
        this.load.image('button-11-2', '11-2.png'); // 按钮11翻面图片
    }

    create() {
        // 检查屏幕方向
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = width / height < 1;

        if (isPortrait) {
            // 如果是竖屏，跳转到警告场景
            this.scene.start('PortraitWarning');
            return;
        }

        // 如果是横屏，继续游戏
        this.scene.start('MainMenu');
    }
}

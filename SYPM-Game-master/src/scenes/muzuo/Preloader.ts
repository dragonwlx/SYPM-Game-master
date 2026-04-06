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
        this.load.setPath('assets/img/game-muzuo');

        this.load.image('start-button', 'start.png');  // 加载开始按钮图片
        this.load.image('bg-0', 'bg-0.png');  // 加载初始背景

        // 加载所有序列背景图片
        for (let i = 1; i <= 16; i++) {
            this.load.image(`bg-${i}-1`, `bg-${i}-1.png`);
            this.load.image(`bg-${i}-2`, `bg-${i}-2.png`);
        }

        this.load.image('start-bg', 'start-bg.png');  // 加载开始场景背景
        this.load.image('success-bg', 'success-bg.png');  // 加载成功场景背景
        this.load.image('success-logo', 'success-logo.png');  // 加载成功场景的 logo
        this.load.image('success-text', 'success-text.png');  // 加载成功场景的文字
        this.load.image('success-next', 'success-next.png');  // 加载成功场景的下一关按钮
        this.load.image('over-bg', 'over-bg.png');  // 加载结束场景背景
        this.load.image('star', 'star.png');  // 加载星星!

        // 加载所有按钮的第一张图片（只需要1-6号按钮）
        for (let i = 1; i <= 6; i++) {
            this.load.image(`button-${i}-1`, `btn-${i}-1.png`);
            this.load.image(`button-${i}-2`, `btn-${i}-2.png`);
        }

        // 加载所有 tip 图片
        this.load.image('tip-1', 'tip-1.png');
        this.load.image('tip-2', 'tip-2.png');
        this.load.image('tip-3-1', 'tip-3-1.png');
        this.load.image('tip-3-2', 'tip-3-2.png');
        this.load.image('tip-4', 'tip-4.png');
        this.load.image('tip-5', 'tip-5.png');
        this.load.image('tip-6', 'tip-6.png');
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

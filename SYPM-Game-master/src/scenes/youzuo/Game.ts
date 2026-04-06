import { Scene } from 'phaser';

interface ButtonConfig {
    id: number;
    isDraggable: boolean;
    canFlip: boolean;
    initialPosition: { x: number; y: number };
    targetPosition: { x: number; y: number };
}

export class Game extends Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.Image;
    private buttons: Map<number, Phaser.GameObjects.Sprite> = new Map();
    private buttonContainers: Map<number, Phaser.GameObjects.Container> = new Map();
    private targetZones: Map<number, Phaser.GameObjects.Sprite> = new Map();
    private draggableButtons: number[] = [1, 3, 6, 9, 11];
    private completedButtons: Set<number> = new Set();

    private readonly BUTTON_SIZE = 88;
    private readonly DRAGGABLE_BUTTON_SIZE = 150;
    private readonly BUTTON_SPACING = 180;
    private readonly BUTTON_Y = 1000;
    private readonly TARGET_Y = 810;
    private readonly START_X = 300;

    private readonly BUTTON_CONFIGS: ButtonConfig[] = [
        { id: 1, isDraggable: true, canFlip: true, initialPosition: { x: 520 + 20, y: this.BUTTON_Y }, targetPosition: { x: 492, y: this.TARGET_Y } },
        { id: 2, isDraggable: false, canFlip: true, initialPosition: { x: 585, y: this.TARGET_Y }, targetPosition: { x: 587, y: this.TARGET_Y } },
        { id: 3, isDraggable: true, canFlip: true, initialPosition: { x: 865, y: this.BUTTON_Y }, targetPosition: { x: 712, y: this.TARGET_Y } },
        { id: 4, isDraggable: false, canFlip: true, initialPosition: { x: 804, y: this.BUTTON_Y }, targetPosition: { x: 804, y: this.TARGET_Y } },
        { id: 5, isDraggable: false, canFlip: true, initialPosition: { x: 895, y: this.BUTTON_Y }, targetPosition: { x: 895, y: this.TARGET_Y } },
        { id: 6, isDraggable: true, canFlip: true, initialPosition: { x: 1035, y: this.BUTTON_Y }, targetPosition: { x: 986, y: this.TARGET_Y } },
        { id: 9, isDraggable: true, canFlip: true, initialPosition: { x: 1480, y: this.BUTTON_Y }, targetPosition: { x: 1445, y: this.TARGET_Y } },
        { id: 11, isDraggable: true, canFlip: true, initialPosition: { x: 1645, y: this.BUTTON_Y }, targetPosition: { x: 1670, y: this.TARGET_Y } }
    ];

    constructor() {
        super('Game');
    }

    create() {
        // 设置游戏尺寸
        this.scale.setGameSize(1920, 1341);

        // 重置游戏状态
        this.resetGameState();

        // 设置背景
        this.camera = this.cameras.main;
        this.background = this.add.image(960, 670, 'bg');
        // 使用适应填充而不是拉伸
        this.background.setScale(Math.max(1920 / this.background.width, 1341 / this.background.height));

        // 添加透明的返回按钮
        const returnButton = this.add.rectangle(1550, 223, 65, 130, 0xffffff, 0);
        returnButton.setInteractive({ cursor: 'pointer' });
        returnButton.setDepth(2000); // 确保在最上层

        // 添加退出按钮
        const exitButton = this.add.rectangle(1672, 223, 65, 130, 0xffffff, 0);
        exitButton.setInteractive({ cursor: 'pointer' });
        exitButton.setDepth(2000); // 确保在最上层

        // 点击退出按钮隐藏游戏容器并重置状态
        exitButton.on('pointerdown', () => {
            const gameContainer = document.getElementById('game-youzuo');
            if (gameContainer) {
                // 先重置游戏状态
                this.resetGameState();
                // 切换到主菜单场景
                this.scene.start('MainMenu');
                // 隐藏游戏容器
                gameContainer.style.display = 'none';
                document.body.classList.remove('body-no-scroll');
                document.body.classList.remove('game-opened');
            }
        });

        // 点击返回按钮返回主菜单
        returnButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // 创建所有按钮
        this.BUTTON_CONFIGS.forEach(config => this.createButton(config));
    }

    private resetGameState() {
        // 清除所有游戏状态
        this.completedButtons.clear();
        this.buttons.clear();
        this.buttonContainers.clear();
        this.targetZones.clear();
    }

    private createButton(config: ButtonConfig) {
        // 创建按钮并设置其尺寸
        const button = this.add.sprite(
            0,
            0,
            `button-${config.id}-1`
        );

        // 获取原始尺寸
        const originalWidth = button.width;
        const originalHeight = button.height;

        // 计算初始缩放比例
        let initialScale;
        if (config.isDraggable) {
            // 可拖动按钮使用较大尺寸
            initialScale = this.DRAGGABLE_BUTTON_SIZE / Math.max(originalWidth, originalHeight);
        } else {
            // 不可拖动按钮使用标准尺寸
            initialScale = this.BUTTON_SIZE / Math.max(originalWidth, originalHeight);
        }

        // 设置按钮的初始缩放比例
        button.setScale(initialScale);

        // 创建容器作为按钮的框子
        const container = this.add.container(
            config.initialPosition.x,
            config.initialPosition.y,
            [button]
        );

        // 设置容器尺寸
        if (config.isDraggable) {
            container.setSize(this.DRAGGABLE_BUTTON_SIZE, this.DRAGGABLE_BUTTON_SIZE);
            // 只有可拖动按钮设置为最高层
            container.setDepth(1000);
        } else {
            container.setSize(this.BUTTON_SIZE, this.BUTTON_SIZE);
            // 不可拖动按钮设置为普通层级
            container.setDepth(10);
        }

        // 创建目标区域
        const targetZone = this.add.sprite(
            config.targetPosition.x,
            config.targetPosition.y,
            'button-0'
        );
        // 设置目标区域的尺寸与按钮一致
        targetZone.setScale(this.BUTTON_SIZE / Math.max(targetZone.width, targetZone.height));
        // 设置目标区域的深度为较低层
        targetZone.setDepth(1);

        // 如果按钮不可拖动，隐藏目标区域的填充图
        if (!config.isDraggable) {
            targetZone.setVisible(false);
        }

        // 存储按钮、容器和目标区域引用
        this.buttons.set(config.id, button);
        this.buttonContainers.set(config.id, container);
        this.targetZones.set(config.id, targetZone);

        // 如果按钮不可拖动，直接放置在目标位置
        if (!config.isDraggable) {
            container.setPosition(config.targetPosition.x, config.targetPosition.y);
        } else {
            // 设置拖动交互
            container.setInteractive({ draggable: true, cursor: 'pointer' });

            // 计算拖动时的缩放比例
            const dragScale = this.BUTTON_SIZE / Math.max(originalWidth, originalHeight);

            container.on('dragstart', () => {
                container.setAlpha(0.8);

                // 拖动开始时，将按钮尺寸缩小到目标尺寸
                this.tweens.add({
                    targets: button,
                    scaleX: dragScale,
                    scaleY: dragScale,
                    duration: 100,
                    ease: 'Power1'
                });

                // 同时调整容器尺寸
                container.setSize(this.BUTTON_SIZE, this.BUTTON_SIZE);
            });

            container.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                container.x = dragX;
                container.y = dragY;
            });

            container.on('dragend', () => {
                container.setAlpha(1);

                const distance = Phaser.Math.Distance.Between(
                    container.x,
                    container.y,
                    config.targetPosition.x,
                    config.targetPosition.y
                );

                if (distance < 50) {
                    // 放置到目标位置
                    container.x = config.targetPosition.x;
                    container.y = config.targetPosition.y;

                    // 保持小尺寸
                    button.setScale(dragScale);
                    container.setSize(this.BUTTON_SIZE, this.BUTTON_SIZE);

                    // 添加到已完成列表
                    this.completedButtons.add(config.id);

                    // 隐藏目标区域的填充图
                    targetZone.setVisible(false);

                    // 检查是否所有可拖动按钮都到达目标位置
                    this.checkGameComplete();
                } else {
                    // 如果没有放置到目标位置，恢复到初始位置和尺寸
                    this.tweens.add({
                        targets: container,
                        x: config.initialPosition.x,
                        y: config.initialPosition.y,
                        duration: 200,
                        ease: 'Power2'
                    });

                    // 恢复按钮尺寸到初始大尺寸
                    this.tweens.add({
                        targets: button,
                        scaleX: initialScale,
                        scaleY: initialScale,
                        duration: 100,
                        ease: 'Power1'
                    });

                    // 恢复容器尺寸
                    container.setSize(this.DRAGGABLE_BUTTON_SIZE, this.DRAGGABLE_BUTTON_SIZE);

                    // 如果按钮从目标位置移开，从完成列表中移除
                    this.completedButtons.delete(config.id);

                    // 显示目标区域的填充图
                    targetZone.setVisible(true);
                }
            });
        }

        // 设置翻面效果
        if (config.canFlip) {
            // 添加交互性到容器
            if (!container.input) {
                container.setInteractive();
            }

            // 鼠标悬停时的翻面效果
            container.on('pointerover', () => {
                // 保存当前Y轴缩放值
                const currentScaleY = button.scaleY;

                // 创建X轴翻转动画
                this.tweens.add({
                    targets: button,
                    scaleX: 0,
                    duration: 100,
                    ease: 'Power1',
                    onComplete: () => {
                        // 当缩放到0时，切换纹理
                        button.setTexture(`button-${config.id}-2`);

                        // 计算新的X轴缩放值，保持与Y轴相同的比例
                        const newScaleX = currentScaleY * (button.width / button.height);

                        // 创建反向缩放动画
                        this.tweens.add({
                            targets: button,
                            scaleX: button.scaleY,
                            duration: 100,
                            ease: 'Power1'
                        });
                    }
                });
            });

            container.on('pointerout', () => {
                // 保存当前Y轴缩放值
                const currentScaleY = button.scaleY;

                // 创建X轴翻转动画
                this.tweens.add({
                    targets: button,
                    scaleX: 0,
                    duration: 100,
                    ease: 'Power1',
                    onComplete: () => {
                        // 当缩放到0时，切换回原始纹理
                        button.setTexture(`button-${config.id}-1`);

                        // 计算新的X轴缩放值，保持与Y轴相同的比例
                        const newScaleX = currentScaleY * (button.width / button.height);

                        // 创建反向缩放动画
                        this.tweens.add({
                            targets: button,
                            scaleX: button.scaleY,
                            duration: 100,
                            ease: 'Power1'
                        });
                    }
                });
            });
        }
    }

    private checkGameComplete() {
        // 检查所有可拖动的按钮是否都到达目标位置
        const isComplete = this.draggableButtons.every(id => this.completedButtons.has(id));

        if (isComplete) {
            this.time.delayedCall(200, () => {
                this.scene.start('GameSuccess');
            });
        }
    }
}

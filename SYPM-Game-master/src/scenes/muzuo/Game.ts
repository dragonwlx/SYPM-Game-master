import { Scene } from 'phaser';

interface ButtonConfig {
    id: number;
    isDraggable: boolean;
    initialPosition: { x: number; y: number };
    targetPosition: { x: number; y: number };
    size: {
        width?: number;  // 指定宽度，高度会按比例计算
        height?: number; // 指定高度，宽度会按比例计算
    };
    targetScale?: number; // 到达目标位置后的缩放比例
    depth?: number; // 按钮的层级
}

interface BackgroundSequence {
    start: number;
    end: number;
}

export class Game extends Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.Image;
    private buttons: Map<number, Phaser.GameObjects.Sprite> = new Map();
    private buttonContainers: Map<number, Phaser.GameObjects.Container> = new Map();
    private completedButtons: Set<number> = new Set();
    private currentDraggableButton: number = 1;
    private tips: Map<number, Phaser.GameObjects.Image> = new Map();

    private readonly BUTTON_SIZE = 88;
    private readonly DRAGGABLE_BUTTON_SIZE = 150;
    private readonly BUTTON_SPACING = 180;
    private readonly BUTTON_Y = 1000;
    private readonly TARGET_Y = 810;
    private readonly START_X = 300;

    private readonly BACKGROUND_SEQUENCES: { [key: number]: BackgroundSequence } = {
        1: { start: 1, end: 1 },
        2: { start: 2, end: 6 },
        3: { start: 7, end: 9 },
        4: { start: 10, end: 13 },
        5: { start: 14, end: 14 },
        6: { start: 15, end: 16 }
    };

    private readonly BUTTON_CONFIGS: ButtonConfig[] = [
        { 
            id: 1, 
            isDraggable: true, 
            initialPosition: { x: 1266, y: 1005 }, 
            targetPosition: { x: 1395, y: 825 },
            size: { width: 150 },
            targetScale: 1.10,
            depth: 10
        },
        { 
            id: 2, 
            isDraggable: true, 
            initialPosition: { x: 1720, y: 800 }, 
            targetPosition: { x: 1395, y: 652 },
            size: { height: 360 },
            targetScale: 0.94,
            depth: 20
        },
        { 
            id: 3, 
            isDraggable: true, 
            initialPosition: { x: 1472, y: 1002 }, 
            targetPosition: { x: 1363, y: 488 },
            size: { width: 230 },
            targetScale: 1.02,
            depth: 30
        },
        { 
            id: 4, 
            isDraggable: true, 
            initialPosition: { x: 1678, y: 380 }, 
            targetPosition: { x: 1432, y: 460 },
            size: { height: 150 },
            targetScale: 0.86,
            depth: 50
        },
        { 
            id: 5, 
            isDraggable: true, 
            initialPosition: { x: 1676, y: 994 }, 
            targetPosition: { x: 1310, y: 453 },
            size: { width: 180 },
            targetScale: 1.0,
            depth: 40
        },
        { 
            id: 6, 
            isDraggable: true, 
            initialPosition: { x: 1676, y: 518 }, 
            targetPosition: { x: 1328, y: 432 },
            size: { height: 100 },
            targetScale: 1.05,
            depth: 60
        }
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
        this.background = this.add.image(960, 670, 'bg-0');
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
            const gameContainer = document.getElementById('game-muzuo');
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
        this.currentDraggableButton = 1;

        // 清除所有 tips
        this.tips.forEach(tip => tip.destroy());
        this.tips.clear();
    }

    private async changeBackground(buttonId: number) {
        const sequence = this.BACKGROUND_SEQUENCES[buttonId];
        
        // 显示当前步骤的 tip
        this.showTip(buttonId);
        
        for (let i = sequence.start; i <= sequence.end; i++) {
            // 第一张背景
            this.background.setTexture(`bg-${i}-1`);
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // 第二张背景
            this.background.setTexture(`bg-${i}-2`);
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        if (buttonId < 6) {
            this.currentDraggableButton = buttonId + 1;
            this.updateButtonDraggableState();
        }
    }

    private showTip(buttonId: number) {
        // 如果这个 tip 已经显示过了，就不再显示
        if (this.tips.has(buttonId)) {
            return;
        }

        // 根据按钮 ID 设置不同的位置
        const positions: Record<number, { x: number; y: number }> = {
            1: { x: 1285, y: 820 },
            2: { x: 1306, y: 750 },
            3: { x: 1400, y: 550 },
            4: { x: 1450, y: 370 },
            5: { x: 1260, y: 570 },
            6: { x: 1330, y: 380 }
        };

        if (buttonId === 3) {
            // 第三步显示两个 tip
            const tip1 = this.add.image(positions[buttonId].x - 80, positions[buttonId].y, 'tip-3-1');
            const tip2 = this.add.image(positions[buttonId].x + 80, positions[buttonId].y, 'tip-3-2');
            
            tip1.setDepth(2000);
            tip2.setDepth(2000);
            
            // 添加淡入动画
            tip1.setAlpha(0);
            tip2.setAlpha(0);
            
            this.tweens.add({
                targets: [tip1, tip2],
                alpha: 1,
                duration: 800,
                ease: 'Power2'
            });

            // 保存这两个 tip
            this.tips.set(buttonId, tip1);
            this.tips.set(buttonId + 0.1, tip2); // 使用小数来区分第二个 tip
        } else {
            // 其他步骤只显示一个 tip
            const tipKey = `tip-${buttonId}`;
            const tip = this.add.image(positions[buttonId].x, positions[buttonId].y, tipKey);
            tip.setDepth(2000);
            
            // 添加淡入动画
            tip.setAlpha(0);
            this.tweens.add({
                targets: tip,
                alpha: 1,
                duration: 800,
                ease: 'Power2'
            });

            // 保存这个 tip
            this.tips.set(buttonId, tip);
        }
    }

    private updateButtonDraggableState() {
        this.BUTTON_CONFIGS.forEach(config => {
            const container = this.buttonContainers.get(config.id);
            if (container) {
                if (config.id === this.currentDraggableButton) {
                    container.setInteractive({ draggable: true, cursor: 'pointer' });
                } else if (!this.completedButtons.has(config.id)) {
                    container.disableInteractive();
                }
            }
        });
    }

    private createButton(config: ButtonConfig) {
        const button = this.add.sprite(0, 0, `button-${config.id}-1`);
        const originalWidth = button.width;
        const originalHeight = button.height;

        // 根据配置计算缩放比例
        let initialScale: number = 1;  // 设置默认值
        if (config.size.width) {
            // 如果指定了宽度，按宽度比例缩放
            initialScale = config.size.width / originalWidth;
        } else if (config.size.height) {
            // 如果指定了高度，按高度比例缩放
            initialScale = config.size.height / originalHeight;
        }
        button.setScale(initialScale);

        // 根据实际缩放后的尺寸设置容器大小
        const scaledWidth = originalWidth * initialScale;
        const scaledHeight = originalHeight * initialScale;

        const container = this.add.container(
            config.initialPosition.x,
            config.initialPosition.y,
            [button]
        );
        container.setSize(scaledWidth, scaledHeight);
        
        // 设置深度
        const depth = config.depth || 1000;
        container.setDepth(depth);
        button.setDepth(depth);

        this.buttons.set(config.id, button);
        this.buttonContainers.set(config.id, container);

        // 只有当前可拖动按钮才能拖动
        if (config.id === this.currentDraggableButton) {
            container.setInteractive({ draggable: true, cursor: 'pointer' });
        }

        // 计算到达目标位置时的缩放比例
        const targetScale = initialScale * (config.targetScale || 0.6);

        container.on('dragstart', () => {
            container.setAlpha(0.8);
            this.tweens.add({
                targets: button,
                scale: targetScale,
                duration: 100,
                ease: 'Power1'
            });
            container.setSize(scaledWidth * (config.targetScale || 0.6), scaledHeight * (config.targetScale || 0.6));
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

            if (distance < 50 && config.id === this.currentDraggableButton) {
                container.x = config.targetPosition.x;
                container.y = config.targetPosition.y;
                button.setScale(targetScale);
                container.setSize(scaledWidth * (config.targetScale || 0.6), scaledHeight * (config.targetScale || 0.6));
                this.completedButtons.add(config.id);
                
                // 完全禁用交互
                container.removeInteractive();
                container.input = null;
                
                // 切换到按钮的第二张图片
                button.setTexture(`button-${config.id}-2`);
                
                // 切换背景并检查游戏完成
                this.changeBackground(config.id).then(() => {
                    if (this.completedButtons.size === 6) {
                        this.time.delayedCall(1000, () => {
                            this.scene.start('GameSuccess');
                        });
                    }
                });
            } else {
                this.tweens.add({
                    targets: container,
                    x: config.initialPosition.x,
                    y: config.initialPosition.y,
                    duration: 200,
                    ease: 'Power2'
                });

                this.tweens.add({
                    targets: button,
                    scale: initialScale,
                    duration: 100,
                    ease: 'Power1'
                });

                container.setSize(scaledWidth, scaledHeight);
                this.completedButtons.delete(config.id);
                
                // 确保返回原位置时显示第一张图片
                button.setTexture(`button-${config.id}-1`);
            }
        });
    }
}

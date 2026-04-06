import { Boot as YouZuoBoot } from './scenes/youzuo/Boot';
import { Game as YouZuoGame } from './scenes/youzuo/Game';
import { GameOver as YouZuoGameOver } from './scenes/youzuo/GameOver';
import { MainMenu as YouZuoMainMenu } from './scenes/youzuo/MainMenu';
import { Preloader as YouZuoPreloader } from './scenes/youzuo/Preloader';
import { GameSuccess as YouZuoGameSuccess } from './scenes/youzuo/GameSuccess';
import { PortraitWarning as YouZuoPortraitWarning } from './scenes/youzuo/PortraitWarning';

import { Boot as MuZuoBoot } from './scenes/muzuo/Boot';
import { Game as MuZuoGame } from './scenes/muzuo/Game';
import { GameOver as MuZuoGameOver } from './scenes/muzuo/GameOver';
import { MainMenu as MuZuoMainMenu } from './scenes/muzuo/MainMenu';
import { Preloader as MuZuoPreloader } from './scenes/muzuo/Preloader';
import { GameSuccess as MuZuoGameSuccess } from './scenes/muzuo/GameSuccess';
import { PortraitWarning as MuZuoPortraitWarning } from './scenes/muzuo/PortraitWarning';

import { Game, Types, Scale } from "phaser";

// 油作游戏配置
const youZuoConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1341,
    parent: 'game-youzuo-container',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transparent: true,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 1920,
        height: 1341
    },
    scene: [
        YouZuoBoot,
        YouZuoPreloader,
        YouZuoMainMenu,
        YouZuoGame,
        YouZuoGameOver,
        YouZuoGameSuccess,
        YouZuoPortraitWarning
    ]
};

// 木作游戏配置
const muZuoConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1341,
    parent: 'game-muzuo-container',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transparent: true,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 1920,
        height: 1341
    },
    scene: [
        MuZuoBoot,
        MuZuoPreloader,
        MuZuoMainMenu,
        MuZuoGame,
        MuZuoGameOver,
        MuZuoGameSuccess,
        MuZuoPortraitWarning
    ]
};

// 创建游戏实例
const youZuoGame = new Game(youZuoConfig);
const muZuoGame = new Game(muZuoConfig);

// 添加全局竖屏检测
function checkOrientation(game: Game, containerId: string) {
    // 直接使用窗口尺寸进行检测
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;
    
    // 获取当前场景
    const currentScene = game.scene.getScenes(true)[0];
    if (!currentScene) return;

    const isPortrait = ratio < 1;
    const isInWarningScene = currentScene.scene.key === 'PortraitWarning';

    if (isPortrait && !isInWarningScene) {
        // 如果是竖屏且不在警告场景，切换到警告场景
        game.registry.set('previousScene', currentScene.scene.key);
        game.scene.start('PortraitWarning');
    } else if (!isPortrait && isInWarningScene) {
        // 如果是横屏且在警告场景，返回之前的场景
        const previousScene = game.registry.get('previousScene') || 'MainMenu';
        game.scene.start(previousScene);
    }
}

// 为每个游戏添加方向检测
window.addEventListener('resize', () => {
    checkOrientation(youZuoGame, 'game-youzuo-container');
    checkOrientation(muZuoGame, 'game-muzuo-container');
});

export default youZuoGame;

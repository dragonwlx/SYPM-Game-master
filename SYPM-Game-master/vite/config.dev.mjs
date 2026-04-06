import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080,
        host: '0.0.0.0'
    },
    plugins: [
        webfontDownload([
            // 替换为你需要的 Google Fonts 链接
            'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&family=Ma+Shan+Zheng&display=swap'
        ])
    ]
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: "./",
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        open: true
    },
    build: {
        outDir: './docs'
    },
    assetsInclude: ['**/*.png'],
    plugins: [react()],
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
        }
    }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: "./",
    server: {
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
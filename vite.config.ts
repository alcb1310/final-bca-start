import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        tanstackStart(),
        // react's vite plugin must come after start's vite plugins
        viteReact(),
    ]
})

import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        tanstackStart(),
        nitro(),
        // react's vite plugin must come after start's vite plugins
        viteReact(),
    ]
})

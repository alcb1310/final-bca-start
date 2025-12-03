import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        tailwindcss(),
        tsConfigPaths(),
        tanstackStart(),
        nitro(),
        // react's vite plugin must come after start's vite plugins
        viteReact(),
    ],
})

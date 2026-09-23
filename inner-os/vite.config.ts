import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// This app is built and its output is served as a static subfolder
// (/inner-os/) by the parent portfolio site, which loads it in an iframe.
export default defineConfig({
  base: '/inner-os/',
  plugins: [react()],
  build: {
    outDir: '../static/inner-os',
    emptyOutDir: true,
  },
})

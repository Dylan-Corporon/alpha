import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '/Users/dylancorporon/Desktop/GM Sites/data_site/app/public/wp-content/vue-app/assets', // Output folder
    rollupOptions: {
      output: {
        entryFileNames: `returnsFlow.js`, // Control file names
        chunkFileNames: `returnsFlow.js`,
        assetFileNames: `returnsFlow.css`
      }
    }
  }
})

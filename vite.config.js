import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/components\/(.*)/, replacement: path.resolve(__dirname, 'Components/$1') },
      { find: '@', replacement: path.resolve(__dirname, '.') }
    ]
  }
})

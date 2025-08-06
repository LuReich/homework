import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
     coverage: {
      reporter: ['text', 'html', 'lcov'], // 출력 포맷 설정
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        'src/**/*.test.{js,ts,jsx,tsx}',
        'src/**/*.spec.{js,ts,jsx,tsx}',
      ],
    },
    
  },
  server :{
    open : true,
    port: 4000
  }
})

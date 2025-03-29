import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: true,
        // 移除 debugger
        drop_debugger: true,
        unused: true, // 删除未引用的变量和函数
        dead_code: true, // 删除不可达代码
        pure_funcs: ['console.log'], // 移除特定的函数调用
      },
      format: {
        comments: false // 移除注释
      }
    }
  }
})

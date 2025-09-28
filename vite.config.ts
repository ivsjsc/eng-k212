import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react()
      ],
      define: {
        // Environment variables are handled by Vite automatically with VITE_ prefix
        // No need to manually define them here
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize build settings
        target: 'es2020',
        minify: 'terser',
        terserOptions: {
          compress: {
            // Remove console.log in production
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug']
          },
          mangle: {
            safari10: true
          }
        },
        rollupOptions: {
          output: {
            // Code splitting
            manualChunks: {
              // Vendor chunks
              'react-vendor': ['react', 'react-dom'],
              'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions'],
              'ui-vendor': ['@google/genai', 'exceljs'],
              // Feature chunks
              'components': [
                './components/TeacherDashboard',
                './components/WritingGrader',
                './components/SpeakingPartner',
                './components/CourseDetail'
              ]
            },
            // Asset naming
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name.split('.');
              const ext = info[info.length - 1];
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              }
              if (/css/i.test(ext)) {
                return `assets/css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js'
          }
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        // Source maps for production debugging (optional)
        sourcemap: isProduction ? false : true
      },
      // Optimize dependencies
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'firebase/app',
          'firebase/auth',
          'firebase/firestore',
          'firebase/functions',
          '@google/genai',
          'exceljs'
        ],
        exclude: ['@firebase/app']
      }
    };
});

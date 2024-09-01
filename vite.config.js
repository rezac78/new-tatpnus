import path from 'path';
import checker from 'vite-plugin-checker';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------
const PORT = 1010;
const env = loadEnv('all', process.cwd());

export default defineConfig({
  plugins: [
    react({
      swcOptions: {
        jsc: {
          parser: {
            syntax: 'typescript', // or 'ecmascript' for .js files
            tsx: true, // enable TSX
          },
          transform: {
            react: {
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              development: false,
              useBuiltins: false
            }
          }
        }
      }
    }),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"'
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false
      },
    })
  ],
  resolve: {
    alias: [
      { find: /^~(.+)/, replacement: path.join(process.cwd(), 'node_modules/$1') },
      { find: /^src(.+)/, replacement: path.join(process.cwd(), 'src/$1') },
    ]
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});

import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      skipIntroByDefault: true,
      nestedTransitions: true,
      dev: !production,
      css: css => {
        css.write('public/bundle.css');
      },
    }),
    resolve(),
    commonjs(),
    production && terser(),
    serve({
      open: true,
      openPage: '/',
      contentBase: 'public',
      host: 'localhost',
      port: 8080,
    }),
  ],
};

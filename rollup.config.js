import resolve from '@rollup/plugin-node-resolve'; // 查找 node 模块
import replace from '@rollup/plugin-replace'; // 替换第三方模块 process.env 变量
import babel from '@rollup/plugin-babel'; // rollup 和 babel 无缝集成
import commonjs from '@rollup/plugin-commonjs'; // rollup 和 babel 无缝集成
import typescript from '@rollup/plugin-typescript'; // 处理 ts 相关
import postcss from 'rollup-plugin-postcss'; // 处理 css 预处理器: css module

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import postcssImport from "postcss-import";
// import postcssNested from "postcss-nested";
// import autoprefixer from "autoprefixer";

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      name: 'ReactEasySlider',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      name: 'ReactEasySlider',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      extensions: ['.ts', '.tsx'],
    }),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    postcss({
      plugins: [],
      modules: true,
    }),
    serve({
      contentBase: ['demo', 'dist'],
    }),
    livereload(),
  ],
};

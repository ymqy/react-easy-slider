import resolve from '@rollup/plugin-node-resolve' // 查找 node 模块
import babel from '@rollup/plugin-babel'; // rollup 和 babel 无缝集成
import commonjs from '@rollup/plugin-commonjs'; // rollup 和 babel 无缝集成
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      name: 'ReactEasySlider',
      file: pkg.browser,
      format: 'umd',
      globals: {
        'react': 'React',
      },
    },
    {
      name: 'ReactEasySlider',
      file: pkg.browser.replace(".js", ".min.js"),
      format: 'iife',
      globals: {
        'react': 'React',
      },
    }
  ],
  external: ['react'],
  plugins: [
    resolve({
      extensions: ['.tsx'],
    }),
    commonjs(),
    babel({ 
      extensions: ['.tsx'],
      babelHelpers: 'bundled',
    }),
    postcss({
      plugins: [],
    })
  ]
};
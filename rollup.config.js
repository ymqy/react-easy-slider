import resolve from '@rollup/plugin-node-resolve' // 查找 node 模块
import jsx from 'acorn-jsx';
import typescript from '@rollup/plugin-typescript' // 用于解析 ts
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
    },
    {
      name: 'ReactEasySlider',
      file: pkg.browser.replace(".js", ".min.js"),
      format: 'iife',
    }
  ],
  acornInjectPlugins: [jsx()], // 用于解析 jsx
  plugins: [
    resolve(),
    typescript({ jsx: 'preserve' })
  ]
};
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import monaco from 'rollup-plugin-monaco-editor'
import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'

export default {
  input: './index.js',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  external: ['lodash'],
  plugins: [
    babel(),
    scss(),
    postcss(),
    monaco({
      languages: ['json', 'html', 'css', 'javascript']
    }),
    nodeResolve(),
    commonjs()
  ]
}

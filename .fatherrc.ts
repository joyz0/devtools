import path from 'path'
import { defineConfig } from 'father'

export default defineConfig({
  // Bundless 构建模式 transformer=babel
  esm: {
    input: 'src/client',
    output: 'dist/esm',
  },
  // Bundless 构建模式 transformer=esbuild
  cjs: {
    input: 'src/server',
    output: 'dist/cjs',
  },
  // Bundle 构建模式 transformer=babel
  umd: {
    name: 'fatherTemplate',
    entry: {
      'src/client': {},
      'src/server': {
        platform: 'node',
      },
    },
    output: 'dist/umd',
    extractCSS: true,
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    postcssOptions: {
      config: true,
    },
  },
  prebundle: {
    output: 'compiled',
    deps: {},
  },
  alias: {
    '@src': path.resolve(__dirname, 'src'),
  },
  sourcemap: true,
})

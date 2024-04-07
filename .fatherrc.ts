import path from 'path'
import { defineConfig } from 'father'

export default defineConfig({
  // extraBabelPlugins: ['babel-plugin-transform-typescript-metadata'],
  // extraBabelPresets: [],
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
    name: 'maycurDevtools',
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
    chainWebpack(config) {
      console.log(1111, config)
      return config
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

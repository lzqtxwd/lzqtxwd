const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  /**
   * 配置开发环境。
   */
  mode: 'development',
  devtool: 'inline-source-map', // 使用source maps
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: false,
    hot: true,
    quiet: true,
    port: 8082,
  },

  // 定义入口，webpack从这里开始编译
  entry: {
    app: './src/index.tsx',
  },

  /**
   * 定义打包后输出的位置，以及对应的文件名。
   * [name] 是一个占位符，此处根据 entry 入口中定义的 key 值，即等价于 app
   */
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][chunkhash].bundle.js',
  },

  resolve: {
    extensions: ['.tsx', 'ts', '.js', '.json'],
    /**
     * 配置路径别名。
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.join(__dirname, './src/containers'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },

  plugins: [
    /**
     * 从模板生成一个HTML文件，自动导入bundle.js。
     * 还能设置title等。
     */
    new HtmlWebpackPlugin({
      title: 'webpack练习',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),

    /**
     * 打包前清除打包目录 dist
     */
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      /**
       * 配置babel-loader。
       * 将ES6转ES5。
       */
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },

      /**
       * 处理图片和文字。
       * 阈值内的文件，转换成base64编码
       * 大于阈值8192的文件，使用file-loader处理。
       */
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },

      /**
       * style-loader:将CSS加载到JavaScript中，由dom操作去加载CSS
       * css-loader:加载CSS，支持模块化，压缩，文件导入
       * less-loader:将less文件转换成css
       * 链式调用。
       */
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
          },
        ],
      },

      /**
       * 加载ts文件
       */
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
};

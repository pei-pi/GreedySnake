//引入一个包
const path = require("path");
// 引入html插件，打包时自动生成html模板并导入打包出来的Js文件
const HTMLWebpackPlugin = require("html-webpack-plugin");
//引入clean插件,每次打包先清空之前文件，再打包，避免存在旧文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//webpack中的所有配置信息都应该写在module.exports中
module.exports = {
  entry: "./src/index.ts",
  output: {
    //指定打包文件的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的名字
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
      const:false,
    },
  },
  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          //配置babel
          {
            //指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // 指定corejs的版本
                    corejs: "3",
                    // 使用corejs的方式
                    useBuiltIns: "usage", //按需加载
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },

      // 设置less文件的处理
      {
        test: /.\less$/,
        use: [
          "style-loader",
          "css-loader",

          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title:"这是一个自定义title",
      template: "./src/index.html",
    }),
  ],
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
  },
};

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/bundle");

  return {
    entry: {
      hello_world: "./app/frontend/hello_world.ts",
      style: "./app/frontend/style.scss"
    },

    output: {
      filename: "[name].[contenthash].js",
      path: dist,
      publicPath: "bundle/"
    },

    mode: isProduction ? "production" : "development",

    devtool: isProduction ? "source-map" : "inline-source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },

    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[contenthash].[ext]',
                publicPath: '.',
                outputPath: ''
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // ビルド前にoutput先ディレクトリを空にする
      new CleanWebpackPlugin(),

      // asset manifestファイルを作成する
      new ManifestPlugin({ fileName: "webpack-manifest.json" }),

      // CSSファイルを作成する
      new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
    ]

  };
};

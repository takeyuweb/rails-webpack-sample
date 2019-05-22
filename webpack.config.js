const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/bundle");

  return {
    entry: {
      hello_world: "./app/frontend/javascripts/hello_world.ts",
      style: "./app/frontend/styles/style.scss"
    },

    // public/bundle 以下にシグネチャ付きのファイル名で書き出す。
    // 書き出したファイルにアクセスするためのURLは /bundle/ からはじまるように publicPath で指定する。
    output: {
      filename: "[name].[contenthash].js",
      path: dist,
      publicPath: "/bundle/"
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
        // 画像
        {
          test: /\.(png|jpe?g)$/,
          use: [
            "url-loader"
          ]
        }
      ]
    },

    plugins: [
      // asset manifestファイルを作成する
      new ManifestPlugin({ fileName: "webpack-manifest.json" }),

      // CSSファイルを作成する
      new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
    ]

  };
};

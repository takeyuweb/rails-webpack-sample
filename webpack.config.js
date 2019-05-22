const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/bundle");

  return {
    entry: {
      hello_world: "./app/frontend/hello_world.ts"
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
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },

    plugins: [
      // ビルド前にoutput先ディレクトリを空にする
      new CleanWebpackPlugin(),

      // asset manifestファイルを作成する
      new ManifestPlugin({ fileName: "webpack-manifest.json" })
    ]

  };
};

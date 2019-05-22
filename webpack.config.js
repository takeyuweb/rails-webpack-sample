const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/bundle");

  return {
    entry: {
      hello_world: "./app/frontend/javascripts/hello_world.ts",
      style: "./app/frontend/styles/style.scss"
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
      // manifestファイルをみることで、あるファイルがwebpackによりどんなファイル名で書き出されたか知ることができる
      // Rails 側の xxxxx_bundle_tag で参照するのに使う
      new ManifestPlugin({
        fileName: "webpack-manifest.json",
        // 上記の用途から、manifestファイルのキーにハッシュ値が含まれることが望ましくないため、キーからハッシュ値を除外する
        // このワークアラウンドがないと、CopyPluginによってコピーしたファイルはキーに to で指定した結果がそのまま入ってしまう
        //
        // [Feature] Support manifest file
        // https://github.com/webpack-contrib/copy-webpack-plugin/issues/104
        //
        // 例） "skyview.bf6a8ac49db7896747fa3b5c65cd71ba.jpg" => "skyview.jpg"
        map: function (file) {
          // Remove hash in manifest key
          file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
          return file;
        },
      }),

      // CSSファイルを作成する
      new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),

      // 画像ファイルはいちいち import や entrypoint に書かなくても image_bundle_tag で参照できるようにする
      // タスクランナー的な使い方であまり良くないように思うが、他に良い方法を思いつかない
      // from で複数の拡張子を対象にするための指定は file-loader の test と違い Regexp ではないので注意
      new CopyPlugin([
        {
          context: './app/frontend/',
          from: { glob: '**/*.{png,jpg,jpeg}', dot: false },
          // [path] は context からのパス
          to: '[path][name].[contenthash].[ext]'
        }
      ])
    ]

  };
};

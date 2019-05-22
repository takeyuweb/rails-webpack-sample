# Rails + Webpack Sample

## Setup

```bash
$ bundle install
$ npm install
```

## Start

```bash
$ npx webpack -p
$ bundle exec rails s
```

Open http://localhost:3000

## webpack

`app/frontend` 以下

### app/frontend/javascripts

JavaScriptを入れるところ

`webpack.config.js` で `app/frontend/javascripts/hello_world.ts` を `hello_world` という名前のエントリーポイントにしている。

Railsテンプレート中で `javascript_bundle_tag "hello_world"`

### app/frontend/styles

SCSSを入れるところ

`webpack.config.js` で `app/frontend/styles/style.scss` を `style` という名前のエントリーポイントにしている。

Railsテンプレート中で `stylesheet_bundle_tag "style"`

### app/frontend/images

画像を入れるところ

`app/frontend/images/path/to/file.png` を使いたいとき

SCSS中なら `url("../images/path/to/file.png")` （`../` の部分は `.scss` からの相対ディレクトリ指定）

JavaScript中なら `import img from '../images/path/to/file.png'` または `const img = require('../images/path/to/file.png')`

Railsテンプレート中なら `image_bundle_tag "style"`
※これだけでは参照できなくて、別途 `require('../images/path/to/file.png')` のようにwebpackに教えてあげる必要がある。

既知の課題 [sprocketsのようにapp/frontend/images においた画像をJavaScript中でのimportなしにimage_bundle_tagでRailsテンプレート中から参照したい ](https://github.com/takeyuweb/rails-webpack-sample/issues/6)

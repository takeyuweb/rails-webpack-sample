# Rails + Webpack Sample

![webpack](https://user-images.githubusercontent.com/60980/58201743-d059b700-7d10-11e9-82a8-27d1b652cc8e.gif)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>RailsWebpackSample</title>
    <meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="dX15C0OggA0QK9Scweo/Bm0l7FnWMNGs1rQrlTodQm4JVZI48HBQGaYFa5ffE/yslP6I0vcKphKCmUFlqkl6Mg==" />
    

    <script src="/bundle/hello_world.17631fbd2bb2407e5b58.js" defer="defer"></script>
    <link rel="stylesheet" media="screen" href="/bundle/style.a18b434aa32a868e5153.css" />
  </head>

  <body>
    <h1>Home#index</h1>
<p>Find me in app/views/home/index.html.erb</p>

<!-- app/frontend/images/skyview.jpg -->
<img src="/bundle/images/skyview.bf6a8ac49db7896747fa3b5c65cd71ba.jpg" />
  </body>
</html>
```

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

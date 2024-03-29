---
layout: docs
title: Webpack
description: Learn how to include Arizona Bootstrap in your project using Webpack.
group: getting-started
toc: true
---

## Installing {{% ourname %}}

[Install arizona-bootstrap]({{< docsref "/getting-started/download#npm" >}}) as a Node.js module using npm.

## Importing JavaScript

Import [{{< ourname >}}'s JavaScript]({{< docsref "/getting-started/javascript" >}}) by adding this line to your app's entry point (usually `index.js` or `app.js`):

```js
import 'arizona-bootstrap';
```

Alternatively, you may **import plugins individually** as needed:

```js
import 'arizona-bootstrap/js/dist/util';
import 'arizona-bootstrap/js/dist/alert';
...
```

{{< ourname >}} is dependent on [jQuery](https://jquery.com/) and [Popper](https://popper.js.org/),
these are defined as `peerDependencies`, this means that you will have to make sure to add both of them
to your `package.json` using `npm install --save jquery popper.js`.

## Importing Styles

### Importing Precompiled Sass

To enjoy the full potential of {{< ourname >}} and customize it to your needs, use the source files as a part of your project's bundling process.

First, create your own `_custom.scss` and use it to override the [built-in custom variables]({{< docsref "/getting-started/theming" >}}). Then, use your main Sass file to import your custom variables, followed by {{< ourname >}}:

```scss
@import "custom";
@import "~arizona-bootstrap/scss/arizona-bootstrap";
```

For {{< ourname >}} to compile, make sure you install and use the required loaders: [sass-loader](https://github.com/webpack-contrib/sass-loader), [postcss-loader](https://github.com/postcss/postcss-loader) with [Autoprefixer](https://github.com/postcss/autoprefixer#webpack). With minimal setup, your webpack config should include this rule or similar:

```js
...
{
  test: /\.(scss)$/,
  use: [{
    loader: 'style-loader', // inject CSS to page
  }, {
    loader: 'css-loader', // translates CSS into CommonJS modules
  }, {
    loader: 'postcss-loader', // Run postcss actions
    options: {
      plugins: function () { // postcss plugins, can be exported to postcss.config.js
        return [
          require('autoprefixer')
        ];
      }
    }
  }, {
    loader: 'sass-loader' // compiles Sass to CSS
  }]
},
...
```

### Importing Compiled CSS

Alternatively, you may use {{< ourname >}}'s ready-to-use CSS by simply adding this line to your project's entry point:

```js
import 'arizona-bootstrap/dist/css/arizona-bootstrap.min.css';
```

In this case you may use your existing rule for `css` without any special modifications to webpack config, except you don't need `sass-loader` just [style-loader](https://github.com/webpack-contrib/style-loader) and [css-loader](https://github.com/webpack-contrib/css-loader).

```js
...
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
...
```

---
layout: docs
title: Download
description: Download Arizona Bootstrap to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm, RubyGems, and more.
group: getting-started
toc: true
---

## Source Files

Compile {{< ourname >}} with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

- Sass compiler (Libsass or Ruby Sass is supported) for compiling your CSS.
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS vendor prefixing

Should you require [build tools]({{< docsref "/getting-started/build-tools#tooling-setup" >}}), they are included for developing {{< ourname >}} and its docs, but they're likely unsuitable for your own purposes.

<a href="{{ site.download.source }}" class="btn btn-bd-red" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>

## Arizona Digital CDN

Skip the download with the UA Digital CDN to deliver cached version of {{< ourname >}}'s compiled CSS and JS to your project.

```html
<link rel="stylesheet" href="{{< param "cdn.css" >}}" crossorigin="anonymous">
<script src="{{< param "cdn.js" >}}" crossorigin="anonymous"></script>
```

If you're using our compiled JavaScript, don't forget to include CDN versions of jQuery and Popper.js before it.

```html
<script src="{{< param "cdn.jquery" >}}" integrity="{{< param "cdn.jquery_hash" >}}" crossorigin="anonymous"></script>
<script src="{{< param "cdn.popper" >}}" integrity="{{< param "cdn.popper_hash" >}}" crossorigin="anonymous"></script>
```

## Package Managers

Pull in {{< ourname >}}'s **source files** into nearly any project with some of the most popular package managers. No matter the package manager, {{< ourname >}} will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

### npm

Install {{< ourname >}} in your Node.js powered apps with npm:

```sh
npm install {{ site.repo }}
```

`require('arizona-bootstrap')` will load all of {{< ourname >}}'s jQuery plugins onto the jQuery object. The `arizona-bootstrap` module itself does not export anything. You can manually load {{< ourname >}}'s jQuery plugins individually by loading the `/js/*.js` files under the package's top-level directory.

{{< ourname >}}'s `package.json` contains some additional metadata under the following keys:

- `sass` - path to {{< ourname >}}'s main [Sass](https://sass-lang.com/) source file
- `style` - path to {{< ourname >}}'s non-minified CSS that's been precompiled using the default settings (no customization)

### yarn

Install {{< ourname >}} in your Node.js powered apps with [the yarn package](https://yarnpkg.com/en/package/bootstrap):

```sh
yarn add {{ site.repo }}
```

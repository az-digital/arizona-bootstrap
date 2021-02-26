---
layout: docs
title: Download
description: Download Arizona Bootstrap to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm, RubyGems, and more.
group: getting-started
toc: true
---

## Source Files

Compile {{ .Site.Title }} with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

- Sass compiler (Libsass or Ruby Sass is supported) for compiling your CSS.
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS vendor prefixing

Should you require [build tools]({{< docsref "/getting-started/build-tools/#tooling-setup" >}}), they are included for developing {{ .Site.Title }} and its docs, but they're likely unsuitable for your own purposes.

<a href="{{ site.download.source }}" class="btn btn-bd-red" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>

## Arizona Digital CDN

Skip the download with the UA Digital CDN to deliver cached version of {{ .Site.Title }}'s compiled CSS and JS to your project.

```html
<link rel="stylesheet" href="{{ site.cdn.css }}" crossorigin="anonymous">
<script src="{{ site.cdn.js }}" crossorigin="anonymous"></script>
```

If you're using our compiled JavaScript, don't forget to include CDN versions of jQuery and Popper.js before it.

```html
<script src="{{ site.cdn.jquery }}" integrity="{{ site.cdn.jquery_hash }}" crossorigin="anonymous"></script>
<script src="{{ site.cdn.popper }}" integrity="{{ site.cdn.popper_hash }}" crossorigin="anonymous"></script>
```

## Package Managers

Pull in {{ .Site.Title }}'s **source files** into nearly any project with some of the most popular package managers. No matter the package manager, {{ .Site.Title }} will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

### npm

Install {{ .Site.Title }} in your Node.js powered apps with npm:

```sh
npm install {{ site.repo }}
```

`require('arizona-bootstrap')` will load all of {{ .Site.Title }}'s jQuery plugins onto the jQuery object. The `arizona-bootstrap` module itself does not export anything. You can manually load {{ .Site.Title }}'s jQuery plugins individually by loading the `/js/*.js` files under the package's top-level directory.

{{ .Site.Title }}'s `package.json` contains some additional metadata under the following keys:

- `sass` - path to {{ .Site.Title }}'s main [Sass](https://sass-lang.com/) source file
- `style` - path to {{ .Site.Title }}'s non-minified CSS that's been precompiled using the default settings (no customization)

### yarn

Install {{ .Site.Title }} in your Node.js powered apps with [the yarn package](https://yarnpkg.com/en/package/bootstrap):

```sh
yarn add {{ site.repo }}
```

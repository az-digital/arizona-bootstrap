---
layout: docs
title: Download
description: Download Arizona Bootstrap to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm.
group: getting-started
toc: true
---

## Source files

Compile Arizona Bootstrap with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

- Sass compiler for compiling Sass source files into CSS files
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS vendor prefixing

Should you require our full set of [build tools]({{< docsref "/getting-started/contribute" >}}), they are included for developing Arizona Bootstrap and its docs, but they're likely unsuitable for your own purposes.

<a href="{{< param "download.source" >}}" class="btn btn-bd-red" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>

## Arizona Digital CDN

Skip the download with the Arizona Digital CDN to deliver a cached version of Arizona Bootstrap's compiled CSS and JS to your project.

```html
<link href="{{< param "cdn.css" >}}" rel="stylesheet" integrity="{{< param "cdn.css_hash" >}}" crossorigin="anonymous">
<script src="{{< param "cdn.js_bundle" >}}" integrity="{{< param "cdn.js_bundle_hash" >}}" crossorigin="anonymous"></script>
```

If you're using our compiled JavaScript and prefer to include Popper separately, add Popper before our JS, via a CDN preferably.

```html
<script src="{{< param "cdn.popper" >}}" integrity="{{< param "cdn.popper_hash" >}}" crossorigin="anonymous"></script>
<script src="{{< param "cdn.js" >}}" integrity="{{< param "cdn.js_hash" >}}" crossorigin="anonymous"></script>
```

## Package managers

Pull in Arizona Bootstrap's **source files** into nearly any project with some of the most popular package managers. No matter the package manager, Arizona Bootstrap will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

### npm

Install {{< ourname >}} in your Node.js powered apps with the npm package:

```sh
npm install {{< param "repo" >}}
```
<p></p>

The `arizona-bootstrap` module does not export any plugins.

Arizona Bootstrap's `package.json` contains some additional metadata under the following keys:

- `sass` - path to Arizona Bootstrap's main [Sass](https://sass-lang.com/) source file
- `style` - path to Arizona Bootstrap's non-minified CSS that's been compiled using the default settings (no customization)

### yarn

Install {{< ourname >}} in your Node.js powered apps with the yarn package:

```sh
yarn add {{< param "repo" >}}
```
<p></p>

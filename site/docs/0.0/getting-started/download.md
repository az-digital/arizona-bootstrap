---
layout: docs
title: Download
description: Download Arizona Bootstrap to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm, RubyGems, and more.
group: getting-started
toc: true
---

## Compiled CSS and JS

Download ready-to-use compiled code for **{{ site.title }} v{{ site.current_version}}** to easily drop into your project, which includes:

- Compiled and minified CSS bundles (see [CSS files comparison]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/contents/#css-files))
- Compiled and minified JavaScript plugins

This doesn't include documentation, source files, or any optional JavaScript dependencies (jQuery and Popper.js).

<a href="{{ site.download.dist }}" class="btn btn-bd-primary" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download {{ site.title }}');">Download</a>

## Source files

Compile {{ site.title }} with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

- Sass compiler (Libsass or Ruby Sass is supported) for compiling your CSS.
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS vendor prefixing

Should you require [build tools]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/build-tools/#tooling-setup), they are included for developing {{ site.title }} and its docs, but they're likely unsuitable for your own purposes.

<a href="{{ site.download.source }}" class="btn btn-bd-primary" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>

## UA Digital CDN

Skip the download with the UA Digital CDN to deliver cached version of {{ site.title }}'s compiled CSS and JS to your project.

{% highlight html %}
<link rel="stylesheet" href="{{ site.cdn.css }}" crossorigin="anonymous">
<script src="{{ site.cdn.js }}" crossorigin="anonymous"></script>
{% endhighlight %}

If you're using our compiled JavaScript, don't forget to include CDN versions of jQuery and Popper.js before it.

{% highlight html %}
<script src="{{ site.cdn.jquery }}" integrity="{{ site.cdn.jquery_hash }}" crossorigin="anonymous"></script>
<script src="{{ site.cdn.popper }}" integrity="{{ site.cdn.popper_hash }}" crossorigin="anonymous"></script>
{% endhighlight %}

## Package managers

Pull in {{ site.title }}'s **source files** into nearly any project with some of the most popular package managers. No matter the package manager, {{ site.title }} will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

### npm

Install {{ site.title }} in your Node.js powered apps with npm:

{% highlight sh %}
npm install {{ site.repo }}
{% endhighlight %}

`require('arizona-bootstrap')` will load all of {{ site.title }}'s jQuery plugins onto the jQuery object. The `arizona-bootstrap` module itself does not export anything. You can manually load {{ site.title }}'s jQuery plugins individually by loading the `/js/*.js` files under the package's top-level directory.

{{ site.title }}'s `package.json` contains some additional metadata under the following keys:

- `sass` - path to {{ site.title }}'s main [Sass](https://sass-lang.com/) source file
- `style` - path to {{ site.title }}'s non-minified CSS that's been precompiled using the default settings (no customization)

### yarn

Install {{ site.title }} in your Node.js powered apps with [the yarn package](https://yarnpkg.com/en/package/bootstrap):

{% highlight sh %}
yarn add {{ site.repo }}
{% endhighlight %}

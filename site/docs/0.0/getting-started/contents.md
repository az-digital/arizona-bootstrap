---
layout: docs
title: Contents
description: Discover what's included in Arizona Bootstrap, including our precompiled and source code flavors. Remember, Arizona Bootstrap's JavaScript plugins require jQuery.
group: getting-started
toc: true
---

## Precompiled {{ site.title }}

Once downloaded, unzip the compressed folder and you'll see something like this:

<!-- NOTE: This info is intentionally duplicated in the README. Copy any changes made here over to the README too, but be sure to keep in mind to add the `dist` folder. -->

{% highlight plaintext %}
arizona-bootstrap/
├── css/
│   ├── arizona-bootstrap.css
│   ├── arizona-bootstrap.css.map
│   ├── arizona-bootstrap.min.css
│   └── arizona-bootstrap.min.css.map
└── js/
    ├── arizona-bootstrap.bundle.js
    ├── arizona-bootstrap.bundle.js.map
    ├── arizona-bootstrap.bundle.min.js
    ├── arizona-bootstrap.bundle.min.js.map
    ├── arizona-bootstrap.js
    ├── arizona-bootstrap.js.map
    ├── arizona-bootstrap.min.js
    └── arizona-bootstrap.min.js.map
{% endhighlight %}

This is the most basic form of {{ site.title }}: precompiled files for quick drop-in usage in nearly any web project. We provide compiled CSS and JS (`arizona-bootstrap.*`), as well as compiled and minified CSS and JS (`arizona-bootstrap.min.*`). [source maps](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps) (`arizona-bootstrap.*.map`) are available for use with certain browsers' developer tools. Bundled JS files (`arizona-bootstrap.bundle.js` and minified `arizona-bootstrap.bundle.min.js`) include [Popper](https://popper.js.org/), but not [jQuery](https://jquery.com/).

## CSS files

{{ site.title }} includes a handful of options for including some or all of our compiled CSS.

<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">CSS files</th>
      <th scope="col">Layout</th>
      <th scope="col">Content</th>
      <th scope="col">Components</th>
      <th scope="col">Utilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.css</code></div>
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.min.css</code></div>
      </th>
      <td class="text-success">Included</td>
      <td class="text-success">Included</td>
      <td class="text-success">Included</td>
      <td class="text-success">Included</td>
    </tr>
  </tbody>
</table>

## JS files

Similarly, we have options for including some or all of our compiled JavaScript.

<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">JS files</th>
      <th scope="col">Popper</th>
      <th scope="col">jQuery</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.bundle.js</code></div>
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.bundle.min.js</code></div>
      </th>
      <td class="text-success">Included</td>
      <td class="bg-light text-muted">Not included</td>
    </tr>
    <tr>
      <th scope="row">
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.js</code></div>
        <div><code class="font-weight-normal text-nowrap">arizona-bootstrap.min.js</code></div>
      </th>
      <td class="bg-light text-muted">Not included</td>
      <td class="bg-light text-muted">Not included</td>
    </tr>
  </tbody>
</table>

## {{ site.title }} source code

The {{ site.title }} source code download includes the precompiled CSS and JavaScript assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

{% highlight plaintext %}
arizona-bootstrap/
├── dist/
│   ├── css/
│   └── js/
├── site/
│   └──docs/
│      └── 0.0/
│          └── examples/
├── js/
└── scss/
{% endhighlight %}

The `scss/` and `js/` are the source code for our CSS and JavaScript. The `dist/` folder includes everything listed in the precompiled download section above. The `site/docs/` folder includes the source code for our documentation, and `examples/` of {{ site.title }} usage. Beyond that, any other included file provides support for packages, license information, and development.

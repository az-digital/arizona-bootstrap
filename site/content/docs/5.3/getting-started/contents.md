---
layout: docs
title: Contents
description: Discover what's included in Arizona Bootstrap, including our compiled and source code flavors.
group: getting-started
toc: true
---

## Compiled Arizona Bootstrap

Once downloaded, unzip the compressed folder and you'll see something like this:

<!-- NOTE: This info is intentionally duplicated in the README. Copy any changes made here over to the README too, but be sure to keep in mind to add the `dist` folder. -->

```text
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
```

This is the most basic form of Arizona Bootstrap: compiled files for quick drop-in usage in nearly any web project. We provide compiled CSS and JS (`arizona-bootstrap.*`), as well as compiled and minified CSS and JS (`arizona-bootstrap.min.*`). [Source maps](https://web.dev/articles/source-maps) (`arizona-bootstrap.*.map`) are available for use with certain browsers' developer tools. Bundled JS files (`arizona-bootstrap.bundle.js` and minified `arizona-bootstrap.bundle.min.js`) include [Popper](https://popper.js.org/docs/v2/).

### CSS files

Arizona Bootstrap is available as a single option including all of our compiled CSS.

{{< bs-table "table" >}}
| CSS files | Layout | Content | Components | Utilities |
| --- | --- | --- | --- | --- |
| `arizona-bootstrap.css`<br> `arizona-bootstrap.min.css` | Included | Included | Included | Included |
{{< /bs-table >}}

### JS files

We have options for including some or all of our compiled JavaScript.

{{< bs-table "table" >}}
| JS Files | Popper |
| --- | --- |
| `arizona-bootstrap.bundle.js`<br> `arizona-bootstrap.bundle.min.js`<br> | Included |
| `arizona-bootstrap.js`<br> `arizona-bootstrap.min.js`<br> | – |
{{< /bs-table >}}

## Arizona Bootstrap source code

The Arizona Bootstrap source code download includes the compiled CSS and JavaScript assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

```text
arizona-bootstrap/
├── dist/
│   ├── css/
│   └── js/
├── site/
│   └──content/
│      └── docs/
│          └── {{< param docs_version >}}/
│              └── examples/
├── js/
└── scss/
```

The `scss/` and `js/` are the source code for our CSS and JavaScript. The `dist/` folder includes everything listed in the compiled download section above. The `site/content/docs/` folder includes the source code for our hosted documentation, including our live examples of Arizona Bootstrap usage.

Beyond that, any other included files provide support for packages, license information, and development.

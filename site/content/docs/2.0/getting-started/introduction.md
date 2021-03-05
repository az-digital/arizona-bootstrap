---
layout: docs
title: Introduction
description: Get started with Arizona Bootstrap, the University of Arizona's theme for Bootstrap, with the Arizona Digital CDN and a template starter page.
group: getting-started
redirect_from:
  - "/docs/"
  - "/docs/2.0/"
  - "/docs/2.0/getting-started/"
  - "/docs/getting-started/"
  - "/getting-started/"
toc: true
---

## Download

Looking to quickly add {{< ourname >}} to your project? Use The Arizona Digital CDN. Using a package manager or need to download the source files? [Head to the downloads page]({{< docsref "/getting-started/download" >}}).

### CSS

Copy-paste the stylesheet `<link>` into your `<head>` before all other stylesheets to load our CSS.

```html
<link rel="stylesheet" href="{{< param "cdn.css" >}}" crossorigin="anonymous">
```

### JS

Many of our components require the use of JavaScript to function. Specifically, they require [jQuery](https://jquery.com/), [Popper.js](https://popper.js.org/), and our own JavaScript plugins. Place the following `<script>`s near the end of your pages, right before the closing `</body>` tag, to enable them. jQuery must come first, then Popper.js, and then our JavaScript plugins.

We use [jQuery's slim build](https://blog.jquery.com/2016/06/09/jquery-3-0-final-released/), but the full version is also supported.

```html
<script src="{{< param "cdn.jquery" >}}" integrity="{{< param "cdn.jquery_hash" >}}" crossorigin="anonymous"></script>
<script src="{{< param "cdn.popper" >}}" integrity="{{< param "cdn.popper_hash" >}}" crossorigin="anonymous"></script>
<script src="{{< param "cdn.js" >}}" crossorigin="anonymous"></script>
```

Curious which components explicitly require jQuery, our JS, and Popper.js? Click the show components link below. If you're at all unsure about the general page structure, keep reading for an example page template.

Our `arizona-bootstrap.bundle.js` and `arizona-bootstrap.bundle.min.js` include [Popper](https://popper.js.org/), but not [jQuery](https://jquery.com/). For more information about what's included in {{< ourname >}}, please see our [contents]({{< docsref "/getting-started/contents#precompiled-bootstrap" >}}) section.

<details>
<summary class="text-red mb-3">Show components requiring JavaScript</summary>
{{< markdown >}}
- Alerts for dismissing
- Buttons for toggling states and checkbox/radio functionality
- Carousel for all slide behaviors, controls, and indicators
- Collapse for toggling visibility of content
- Dropdowns for displaying and positioning (also requires [Popper.js](https://popper.js.org/))
- Modals for displaying, positioning, and scroll behavior
- Navbar for extending our Collapse plugin to implement responsive behavior
- Tooltips and popovers for displaying and positioning (also requires [Popper.js](https://popper.js.org/))
- Scrollspy for scroll behavior and navigation updates
{{< /markdown >}}
</details>

## Starter Template

Be sure to have your pages set up with the latest design and development standards. That means using an HTML5 doctype and including a viewport meta tag for proper responsive behaviors. An Arizona Branded starter template is available below.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Proxima Nova font. -->
    <link href="https://use.typekit.net/emv3zbo.css" rel="stylesheet" crossorigin="anonymous">
    <!-- Arizona Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.digital.arizona.edu/lib/arizona-bootstrap/main/css/arizona-bootstrap.min.css">
    <title>Arizona Bootstrap Starter Template</title>
  </head>
  <body>
    <div class="bg-red p-3 mb-5">
      <div class="container">
        <div class="row">
          <div class="col-12"><span class="text-uppercase heading-style m-0 text-white">The University of Arizona</span></div>
        </div>
      </div>
    </div>
    <main role="main">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>Hello, world!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fusce id velit ut tortor. Faucibus ornare suspendisse sed nisi. Facilisis volutpat est velit egestas dui. Vivamus arcu felis bibendum ut tristique. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mi quis hendrerit dolor magna. Consectetur a erat nam at lectus. Gravida rutrum quisque non tellus. Ac tincidunt vitae semper quis lectus. Malesuada fames ac turpis egestas maecenas. Vel orci porta non pulvinar neque laoreet. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Nec feugiat nisl pretium fusce id velit ut tortor. Elementum nibh tellus molestie nunc non blandit massa enim. Aliquet enim tortor at auctor. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Lacus vel facilisis volutpat est velit egestas dui.</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer bg-warm-gray text-center">
      <div class="container py-4">
        <div class="row">
          <div class="col-12">
            <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button>
            <hr />
            <small class="text-black">The University of Arizona</small>
          </div>
        </div>
      </div>
    </footer>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Arizona Bootstrap JS -->
    <script src="{{< param "cdn.jquery" >}}" integrity="{{< param "cdn.jquery_hash" >}}" crossorigin="anonymous"></script>
    <!-- Arizona Bootstrap -->
    <script src="https://cdn.digital.arizona.edu/lib/arizona-bootstrap/main/js/arizona-bootstrap.bundle.min.js"></script>
  </body>
</html>
```

That's all you need for overall page requirements. Visit the [Layout docs]({{< docsref "/layout/overview" >}}) to start laying out your site's content and components.

## Sticky Footer Template

If you want your footer to remain at the bottom of the page even when you don't have enough content to push the footer to the bottom, you can use the Arizona Branded sticky footer template below.

```html
<!doctype html>
<html lang="en" class="h-100">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Proxima Nova font. -->
    <link href="https://use.typekit.net/emv3zbo.css" rel="stylesheet" crossorigin="anonymous">
    <!-- Arizona Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.digital.arizona.edu/lib/arizona-bootstrap/main/css/arizona-bootstrap.min.css">

    <title>Arizona Bootstrap Starter Template</title>
  </head>
  <body class="d-flex flex-column h-100">
    <div class="bg-red p-3 mb-5">
      <div class="container">
        <div class="row">
          <div class="col-12"><span class="text-uppercase heading-style m-0 text-white">The University of Arizona</span></div>
        </div>
      </div>
    </div>
    <main role="main" class="flex-shrink-0">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>Hello, world!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fusce id velit ut tortor. Faucibus ornare suspendisse sed nisi. Facilisis volutpat est velit egestas dui. Vivamus arcu felis bibendum ut tristique. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Mi quis hendrerit dolor magna. Consectetur a erat nam at lectus. Gravida rutrum quisque non tellus. Ac tincidunt vitae semper quis lectus. Malesuada fames ac turpis egestas maecenas. Vel orci porta non pulvinar neque laoreet. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Nec feugiat nisl pretium fusce id velit ut tortor. Elementum nibh tellus molestie nunc non blandit massa enim. Aliquet enim tortor at auctor. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Lacus vel facilisis volutpat est velit egestas dui.</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer mt-auto bg-warm-gray text-center">
      <div class="container py-4">
        <div class="row">
          <div class="col-12">
            <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button> | <button class="btn btn-link">Link</button>
            <hr />
            <small class="text-black">The University of Arizona</small>
          </div>
        </div>
      </div>
    </footer>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Arizona Bootstrap JS -->
    <script src="{{< param "cdn.jquery" >}}" integrity="{{< param "cdn.jquery_hash" >}}" crossorigin="anonymous"></script>
    <!-- Arizona Bootstrap -->
    <script src="https://cdn.digital.arizona.edu/lib/arizona-bootstrap/main/js/arizona-bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## Important Globals

{{< ourname >}} employs a handful of important global styles and settings that you'll need to be aware of when using it, all of which are almost exclusively geared towards the *normalization* of cross browser styles. Let's dive in.

### HTML5 Doctype

{{< ourname >}} requires the use of the HTML5 doctype. Without it, you'll see some funky incomplete styling, but including it shouldn't cause any considerable hiccups.

```html
<!doctype html>
<html lang="en">
  ...
</html>
```

### Responsive Meta Tag

{{< ourname >}} is developed *mobile first*, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, **add the responsive viewport meta tag** to your `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

You can see an example of this in action in the [starter template](#starter-template).

### Box-sizing

For more straightforward sizing in CSS, we switch the global `box-sizing` value from `content-box` to `border-box`. This ensures `padding` does not affect the final computed width of an element, but it can cause problems with some third party software like Google Maps and Google Custom Search Engine.

On the rare occasion you need to override it, use something like the following:

```css
.selector-for-some-widget {
  box-sizing: content-box;
}
```

With the above snippet, nested elements—including generated content via `::before` and `::after`—will all inherit the specified `box-sizing` for that `.selector-for-some-widget`.

Learn more about [box model and sizing at CSS Tricks](https://css-tricks.com/box-sizing/).

### Reboot

For improved cross-browser rendering, we use [Reboot]({{< docsref "/content/reboot" >}}) to correct inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Community

Stay up to date on the development of {{< ourname >}} and reach out to the community with these helpful resources.

- Join [the official Slack workspace](/docs/{{< param docs_version >}}{{ {{< param slack >}} }}/).

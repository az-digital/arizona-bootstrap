---
layout: docs
title: University of Arizona wordmark header.
description: Add the Arizona red bar header to a site.
group: components
toc: true
---

## Wordmark header
The header is to be used on all subdomains of arizona.edu. Extending the header
to save room on your site, especially in mobile, with nav and search buttons is
supported as shown below.

<div class="alert alert-warning" role="alert">
  <p class="h4 alert-heading">Heads Up!</p>
  The wordmark logo without a Block "A" header should only be used when near a Block "A" logo.
</div>

{{< example >}}
<header class="bg-red arizona-header" id="header_arizona">
  <div class="container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </div>
  <div class="redbar-buttons d-lg-none">
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-redbar">
      <span class="icon material-icons-sharp"> search </span>
      <span class="icon-text"> search </span>
    </button>
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-redbar">
      <span class="icon material-icons-sharp"> menu </span>
      <span class="icon-text"> menu </span>
    </button>
  </div>
</header>

```html
<header class="bg-red arizona-header" id="header_arizona">
  <div class="container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </div>
  <div class="redbar-buttons d-lg-none">
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-redbar">
      <span class="icon material-icons-sharp"> search </span>
      <span class="icon-text"> search </span>
    </button>
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-redbar">
      <span class="icon material-icons-sharp"> menu </span>
      <span class="icon-text"> menu </span>
    </button>
  </div>
</header>
```
<div id="navbarOffcanvasDemo"></div>
{{< /example >}}

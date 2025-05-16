---
layout: docs
title: University of Arizona header
description: Add the university wordmark header to a site.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---


## Wordmark header

The header is to be used on all subdomains of arizona.edu.

<div class="alert alert-warning" role="alert">
  <p class="h4 alert-heading mt-0">Heads Up!</p>
  <p class="mb-0">The wordmark logo without a Block "A" header should only be used when near a Block "A" logo.</p>
</div>

## Extending the header

Extending the header with nav and search buttons is supported as shown below. This can save space on your site, especially for mobile devices.

{{< example >}}
<header class="bg-red arizona-header" id="header_arizona">
  <div class="container">
    <div class="row">
      <a class="arizona-logo" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
    </div>
  </div>
  <div class="redbar-buttons d-lg-none">
    <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-redbar" id="jsAzSearch">
      <span aria-hidden="true" class="icon material-icons-sharp"> search </span>
      <span class="icon-text"> search </span>
    </button>
    <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-redbar">
      <span aria-hidden="true" class="icon material-icons-sharp"> menu </span>
      <span class="icon-text"> menu </span>
    </button>
    <nav class="navbar-offcanvas mw-100 w-100 bg-white d-flex d-lg-none" id="azMobileNavDemo">
      <div class="navbar-offcanvas-header mb-2">
        <div class="bg-chili d-flex justify-content-between align-items-center">
          <a href="/" class="btn btn-menu-offcanvas-nav btn-red d-flex flex-column justify-content-center navbar-offcanvas-home">
            <span aria-hidden="true" class="material-icons-sharp">home</span>
            <span>Home</span>
          </a>
          <button data-bs-toggle="offcanvas" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-menu-offcanvas-nav btn-red d-flex flex-column justify-content-center navbar-offcanvas-home">
            <span aria-hidden="true" class="material-icons-sharp mx-auto">close</span>
            <span class="mx-auto">Close</span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</header>
{{< /example >}}

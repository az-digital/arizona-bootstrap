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
<header class="arizona-header text-bg-red" id="header_arizona">
  <div class="container">
    <div class="row justify-content-between">
      <a class="arizona-logo col-auto d-flex align-items-center pe-0" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
      <div class="arizona-header-buttons d-lg-none d-flex col-auto px-0">
        <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-arizona-header" id="jsAzSearch">
          <span aria-hidden="true" class="icon material-symbols-rounded"> search </span>
          <span class="icon-text"> Search </span>
        </button>
        <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-arizona-header">
          <span aria-hidden="true" class="icon material-symbols-rounded"> menu </span>
          <span class="icon-text"> Menu </span>
        </button>
        <!-- Offcanvas mobile navigation -->
        <div class="offcanvas offcanvas-end mw-100 w-100 bg-white d-flex d-lg-none overflow-y-auto" tabindex="-1" id="azMobileNavDemo" aria-label="Mobile navigation">
          <div class="offcanvas-header sticky-top p-0 m-0 text-bg-red d-flex justify-content-end align-items-center">
            <button data-bs-toggle="offcanvas" data-bs-target="#azMobileNavDemo" aria-controls="azMobileNavDemo" class="btn btn-offcanvas-header d-flex flex-column justify-content-center text-white px-3 py-1">
              <span aria-hidden="true" class="icon material-symbols-rounded mx-auto">close</span>
              <span class="icon-text mx-auto">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
{{< /example >}}

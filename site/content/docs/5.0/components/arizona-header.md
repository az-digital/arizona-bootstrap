---
layout: docs
title: University of Arizona header
description: Add the university wordmark header to a site.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---


## University header with wordmark logo

The Arizona Header is to be used on all subdomains of arizona.edu.

<div class="alert alert-warning" role="alert">
  <p class="h4 alert-heading mt-0">Heads Up!</p>
  <p class="mb-0">The wordmark logo without a Block "A" header should only be used when near a Block "A" logo. Typically, the Block "A" logo is included as part of the site branding just below the Arizona Header.</p>
</div>

<div class="arizona-header bg-red">
  <div class="container">
    <div class="row">
      <a class="arizona-logo col-auto" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
    </div>
  </div>
</div>
<p></p>

```html
<div class="arizona-header az-fixed-header-on-mobile bg-red" id="header_arizona">
  <div class="container">
    <div class="row">
      <a class="arizona-logo col-auto" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
    </div>
  </div>
</div>
```


## Extending the header

The Arizona Header can be extended with off-canvas search and navigation for mobile devices, as shown in the example below.

{{< example >}}
<div class="arizona-header az-fixed-header-on-mobile bg-red" id="header_arizona_example_1">
  <div class="container">
    <div class="row">
      <a class="arizona-logo col-auto" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
      <div class="d-lg-none d-flex col-auto px-0">
        <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavExample" aria-controls="azMobileNavExample" class="btn btn-arizona-header" id="jsAzSearch">
          <span aria-hidden="true" class="icon material-symbols-rounded">search</span>
          <span class="icon-text">Search</span>
        </button>
        <button data-bs-toggle="offcanvas" type="button" data-bs-target="#azMobileNavExample" aria-controls="azMobileNavExample" class="btn btn-arizona-header">
          <span aria-hidden="true" class="icon material-symbols-rounded">menu</span>
          <span class="icon-text">Menu</span>
        </button>
        <!-- Offcanvas mobile navigation -->
        <div class="offcanvas offcanvas-end mw-100 w-100 bg-white d-flex d-lg-none overflow-y-auto" tabindex="-1" id="azMobileNavExample">
          <div class="offcanvas-header sticky-top p-0 mb-2 text-bg-red d-flex justify-content-between align-items-center">
            <a href="#" class="btn btn-arizona-header">
              <span aria-hidden="true" class="icon material-symbols-rounded">home</span>
              <span class="icon-text">Home</span>
            </a>
            <button data-bs-toggle="offcanvas" data-bs-target="#azMobileNavExample" aria-controls="azMobileNavExample" class="btn btn-arizona-header">
              <span aria-hidden="true" class="icon material-symbols-rounded">close</span>
              <span class="icon-text">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{{< /example >}}


## Disable fixed position on mobile devices

In most cases, the Arizona Header element is intended to be fixed to the top of the browser window on mobile devices. This behavior is added by the `.az-fixed-header-on-mobile` class. This class can be omitted if a site does not include off-canvas navigation or other elements in the mobile display of the Arizona Header.

**Note:** For this documentation site, this fixed-position behavior has been overridden to prevent the example Arizona Headers from disappearing behind the existing Arizona Bootstrap navbar above.

{{< example >}}
<div class="arizona-header bg-red" id="header_arizona_example_2">
  <div class="container">
    <div class="row">
      <a class="arizona-logo col-auto" href="https://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg" fetchpriority="high">
      </a>
    </div>
  </div>
</div>
{{< /example >}}

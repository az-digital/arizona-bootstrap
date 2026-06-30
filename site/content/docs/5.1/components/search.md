---
layout: docs
title: Search
description: Build a reusable Arizona Bootstrap search control from Bootstrap form and input-group primitives.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---

## AZ Search
<span class="badge badge-az-experimental mt-0">Arizona Bootstrap Experimental Feature</span>

The AZ Search component provides a stylized search field built with Bootstrap form controls and input groups. It is intended to be reusable in AZ Navbar Fullscreen and other page regions where a prominent site search is needed.

The preferred class is `.az-search`. The legacy `.navbar-az-fullscreen-search` class is still supported for compatibility.

<style>
  .bd-content .az-search,
  .bd-content .navbar-az-fullscreen-search {
    --az-search-height: 43px;
    --az-search-width: 265px;
    padding: 5px 15px;
    margin-right: 0;

    .input-group {
      .btn {
        padding: 9px;
      }
      
      .btn::before {
        /* position: absolute; */
        top: 9px;
        bottom: 9px;
      }
    }

    .form-control {
      padding: 6px 12px 6px 12px;
    }

    .az-search-icon {
      width: 24px;
      height: 24px;
    }
  }
</style>

## Example

{{< example >}}
<div class="bg-blue">
  <form class="az-search" role="search">
    <label class="visually-hidden" for="az-search-example">Search the site</label>
    <div class="input-group">
      <input id="az-search-example" class="form-control" type="search" placeholder="Search" aria-label="Search the site">
      <button class="btn" type="submit" aria-label="Submit site search">
        <span class="az-search-icon" aria-hidden="true"></span>
      </button>
    </div>
  </form>
</div>
{{< /example >}}

<!-- ```html
<form class="az-search" role="search">
  <label class="visually-hidden" for="az-search-example">Search the site</label>
  <div class="input-group">
    <input id="az-search-example" class="form-control" type="search" placeholder="Search" aria-label="Search the site">
    <button class="btn" type="submit" aria-label="Submit site search">
      <span class="az-search-icon" aria-hidden="true"></span>
    </button>
  </div>
</form>
``` -->

## Navbar Fullscreen Integration

When used in AZ Navbar Fullscreen, combine `.az-search` with `.navbar-az-fullscreen-search` to keep existing fullscreen-specific spacing and responsive overrides.

{{< example >}}
<form class="az-search navbar-az-fullscreen-search ms-auto ms-lg-0 me-2 me-lg-4" role="search">
  <label class="visually-hidden" for="az-search-navbar-example">Search the site</label>
  <div class="input-group d-none d-lg-flex">
    <input id="az-search-navbar-example" class="form-control" type="search" placeholder="Search" aria-label="Search the site">
    <button class="btn" type="submit" aria-label="Submit site search">
      <span class="az-search-icon" aria-hidden="true"></span>
    </button>
  </div>
  <button class="btn d-lg-none az-search-toggle navbar-toggler-search" type="button" aria-label="Search the site">
    <span class="az-search-icon" aria-hidden="true"></span>
  </button>
</form>
{{< /example >}}

```html
<form class="az-search navbar-az-fullscreen-search ms-auto ms-lg-0 me-2 me-lg-4" role="search">
  <label class="visually-hidden" for="az-search-navbar-example">Search the site</label>
  <div class="input-group d-none d-lg-flex">
    <input id="az-search-navbar-example" class="form-control" type="search" placeholder="Search" aria-label="Search the site">
    <button class="btn" type="submit" aria-label="Submit site search">
      <span class="az-search-icon" aria-hidden="true"></span>
    </button>
  </div>
  <button class="btn d-lg-none az-search-toggle navbar-toggler-search" type="button" aria-label="Search the site">
    <span class="az-search-icon" aria-hidden="true"></span>
  </button>
</form>
```

## Accessibility

- Keep a programmatic label by including either a visible label or a `.visually-hidden` label.
- Keep descriptive `aria-label` text on icon-only submit or mobile toggle buttons.
- Use `type="search"` for proper browser semantics and platform affordances.
- The component includes `:focus-within` styles to improve keyboard focus visibility.

## CSS Variables

The following properties are set and used on the `.az-search` component:

{{< scss-docs name="az-search-css-vars" file="custom/_search.scss" scssroot="scss" >}}

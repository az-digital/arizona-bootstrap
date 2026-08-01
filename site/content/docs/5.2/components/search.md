---
layout: docs
title: Search
description: <span class="badge badge-az-experimental mt-3">Arizona Bootstrap Experimental Feature</span>
group: components
toc: true
---

The AZ Search component provides a stylized search field built with Bootstrap form controls and input groups. It is intended to be reusable in AZ Navbar Fullscreen and other page regions where a prominent site search is needed.

## Example

{{< example >}}
<div class="bg-blue">
  <form class="az-search" role="search">
    <label class="visually-hidden" for="az-search-example">Search</label>
    <div class="input-group">
      <input id="az-search-example" class="form-control" type="search" placeholder="Search" aria-label="Search">
      <button class="btn" type="submit" aria-label="Submit search">
        <span class="az-search-icon" aria-hidden="true"></span>
      </button>
    </div>
  </form>
</div>
{{< /example >}}

## Accessibility

- Keep a programmatic label by including either a visible label or a `.visually-hidden` label.
- Keep descriptive `aria-label` text on icon-only submit or mobile toggle buttons.
- Use `type="search"` for proper browser semantics and platform affordances.
- The component includes `:focus-visible` styles on search controls to improve keyboard focus visibility.

## CSS Variables

The following properties are set and used on the `.az-search` component:

{{< scss-docs name="az-search-css-vars" file="custom/_search.scss" scssroot="scss" >}}

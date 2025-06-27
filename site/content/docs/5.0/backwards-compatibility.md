---
layout: docs
title: Backwards Compatibility
description: Some styles and classes available in Arizona Bootstrap 2 (Bootstrap 4) have been deprecated, replaced, or removed in Arizona Bootstrap 5 (Bootstrap 5).
group: backwards-compatibility
redirect_from:
  - "/backwards-compatibility/"
  - "/docs/5.0/backwards-compatibility/"
toc: true
---

## Overview

Although backwards compatibility is included for some components and utilities available in Arizona Bootstrap 2, it is highly recommended that you utilize the new classes available in Arizona Bootstrap 5. They are simply included here to lessen the burden on site builders for migrating from Drupal sites using Arizona Bootstrap 2 to sites using Arizona Bootstrap 5.

All items that are included with backwards compatibility are built by extending the classes and styles available in Arizona Bootstrap 5. Any items that were marked as "deprecated" in Arizona Bootstrap 2 do not include backwards compatibility; these items are listed in the [Removed Utility Classes](#removed-utility-classes) and [Removed Components](#removed-components) sections.

For information on changes made in upstream Bootstrap 5, see the [Migration page](../migration").


## Backwards Compatible Components

Arizona Bootstrap 2 utilized components that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of available classes. They have been included with backwards compatibility in Arizona Bootstrap 5 to avoid breaking changes.

### Accordion

Arizona Bootstrap 2 used the card component to extend the default collapse behavior and create an accordion. To properly achieve the accordion style, a custom class `.accordion` was also needed as a wrapper.

{{< example >}}
<div class="accordion" id="ex1_accordionExample">
  <div class="card">
    <div class="card-header" id="ex1_headingOne">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#ex1_collapseOne" aria-expanded="true" aria-controls="ex1_collapseOne">
        Collapsible Group Item #1
      </button>
    </div>
    <div id="ex1_collapseOne" class="collapse show" aria-labelledby="ex1_headingOne" data-parent="#ex1_accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="ex1_headingTwo">
      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#ex1_collapseTwo" aria-expanded="false" aria-controls="ex1_collapseTwo">
        Collapsible Group Item #2
      </button>
    </div>
    <div id="ex1_collapseTwo" class="collapse" aria-labelledby="ex1_headingTwo" data-parent="#ex1_accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="ex1_headingThree">
      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#ex1_collapseThree" aria-expanded="false" aria-controls="ex1_collapseThree">
        Collapsible Group Item #3
      </button>
    </div>
    <div id="ex1_collapseThree" class="collapse" aria-labelledby="ex1_headingThree" data-parent="#ex1_accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
{{< /example >}}

In Arizona Bootstrap 5, the [accordion component](../components/accordion/) is natively provided by Bootstrap. Site owners who have used accordions in their Arizona Bootstrap 2 sites are encouraged to review relevant HTML and update to the latest implementation.

### Badges

Arizona Bootstrap 5 largely follows [upstream Bootstrap's changes to badges]({{< docsref "/migration#badges" >}}). The `badge-variant()` mixin override from Arizona Bootstrap 2 has been removed since badges will now use [color and background helpers]({{< docsref "/helpers/color-background" >}}) to ensure accessible color combinations. The `.badge-link` class dropped by upstream Bootstrap has been converted to a [custom Arizona Bootstrap class]({{< docsref "/components/badge#badge-links" >}}) that works with badges using the Chili, Midnight, and Light color and background helpers.


## Backwards Compatible Utilities

Arizona Bootstrap 2 contained utility classes that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of classes. They have been included with backwards compatibility in Arizona Bootstrap 5 to avoid breaking changes.


## Deprecated Components

The following components are deprecated in Arizona Bootstrap 5 and will be removed in the next major version.

### Card Classes

These custom Arizona Bootstrap classes are now deprecated:

 - `.card-borderless`: This class can be replaced with `.border-0`.
 - `.card-clickable` and `.card-clickable-link`: These classes can be replaced with styling using the standard [Stretched Link helper]({{< docsref "/helpers/stretched-link/" >}}) along with our custom [Hover utilities]({{< docsref "/utilities/hover/" >}}). See the [examples on the Card page]({{< docsref "/components/card/#borderless-and-clickable-cards" >}}).
 - `.card-landing-grid` and `.landing-$color`: The "landing grid" card style from Arizona Bootstrap 2 has been deprecated and should no longer be used.


### Nav Tabs Large

The `.nav-tabs-lg` custom Arizona Bootstrap class is now deprecated.


## Removed Utilities

The following utilities have been removed in Arizona Bootstrap 5.

### Blockquote Reverse

The `.blockquote-reverse` class was removed in upstream Bootstrap 4 and has been removed from Arizona Bootstrap 5.

### Heading-Style

The `.heading-style` class has been removed from Arizona Bootstrap 5. The Bootstrap `.h1` - `.h6` styles should be used instead.

### Mailto

The `.mailto` class, which is placed directly on the `<a>` link tag, has been removed in favor of Bootstrap's `.text-truncate` class, which is placed on the surrounding `<div>` instead. See [Text Truncation]({{< docsref "/helpers/text-truncation/" >}}) for more details.

### Sans

The legacy `.sans` class has been removed from Arizona Bootstrap 5, which already uses a sans-serif font for both body and heading text.


## Removed Components

The following components have been removed in Arizona Bootstrap 5.

### Background Wrapper Patterns

The Triangles Fade, Triangle Mosaic, and Catalinas Abstract background wrapper patterns were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5.

### Callout Variants

For our custom [Callouts component]({{< docsref "/components/callouts/" >}}), the following callout variants have been removed:
 - `.callout-leaf`
 - `.callout-river`
 - `.callout-silver`
 - `.callout-mesa`
 - `.callout-light`
 - `.callout-dark`


## Removed JavaScript

Components listed in the JavaScript section of Arizona Bootstrap 2 (e.g., Modals, Tooltips, Popovers) have had certain methods, options, and events removed or changed in Arizona Bootstrap 5. These items are not backwards compatible. They should not cause breaking changes, but if you are manually calling any of these methods, they will need to be updated to use the methods/events/functions that {{< ourname >}} uses. Refer to each individual component's documentation for an explanation of proper methods, options, and events.

## Icons

[Google Material Icons (Sharp)](https://fonts.google.com/icons?icon.style=Sharp&icon.set=Material+Icons) are deprecated in Arizona Bootstrap 5. Site owners are encouraged to review
the [updated documentation](../icons/) around importing and using the approved [Google Material Icons (Round)](https://fonts.google.com/icons?icon.style=Filled&icon.set=Material+Icons) in Arizona
Bootstrap 5.
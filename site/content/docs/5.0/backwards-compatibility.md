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

All items that are included with backwards compatibility are built by extending the classes and styles available in Arizona Bootstrap 5. Any items that were marked as "deprecated" in Arizona Bootstrap 2 do not include backwards compatibility; these items are listed in the [Removed Components](#removed-components) and [Removed Utilities](#removed-utilities) sections.

For information on changes made in upstream Bootstrap 5, see the [Migration page](../migration).

For reference, Arizona Quickstart 3 includes a [mapping of classes from Arizona Bootstrap 2 to Arizona Bootstrap 5](https://github.com/az-digital/az_quickstart/blob/main/modules/custom/az_core/src/Utility/AZBootstrapMarkupConverter.php#L183-L760) as part of a markup converter class. This mapping is used by drush commands such as [this one](https://github.com/az-digital/az_quickstart/blob/main/modules/custom/az_core/src/Drush/Commands/README.md#arizona-bootstrap-5-block-class-updates), which can be used to update Arizona Bootstrap 2 classes after a site has been migrated to Quickstart 3.


## Backwards Compatible Components

Arizona Bootstrap 2 utilized components that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of available classes. They have been included with backwards compatibility in Arizona Bootstrap 5 to avoid breaking changes.

### Badges

Arizona Bootstrap 5 largely follows [upstream Bootstrap's changes to badges]({{< docsref "/migration#badges" >}}). The `badge-variant()` mixin override from Arizona Bootstrap 2 has been removed since badges will now use [color and background helpers]({{< docsref "/helpers/color-background" >}}) to ensure accessible color combinations. The `.badge-link` class dropped by upstream Bootstrap has been converted to a [custom Arizona Bootstrap class]({{< docsref "/components/badge#badge-links" >}}) that works with badges using the Chili, Midnight, and Light color and background helpers.

### Primary Color Change

In Arizona Bootstrap 2, classes using the "primary" color were styled with Arizona Blue. In Arizona Bootstrap 5, "primary" now corresponds with Arizona Red and "secondary" (unused in Arizona Bootstrap 2) corresponds with Arizona Blue. Below are examples of replacements which can be made to update existing content while maintaining the same Arizona Blue color:
 - `.bg-primary`: Replace with `.text-bg-blue`.
 - `.btn-primary`: Replace with `.btn-blue`.
 - `.text-primary`: Replace with `.text-blue`.


## Deprecated Components

The following components are deprecated in Arizona Bootstrap 5 and will be removed in the next major version.

### Accordion Implementation

Arizona Bootstrap 2 used the card component to extend the default collapse behavior and create an accordion. To properly achieve the accordion style, a custom class `.accordion` was also needed as a wrapper. In Arizona Bootstrap 5, the [accordion component](../components/accordion/) is natively provided by Bootstrap. Site owners who have used accordions in their Arizona Bootstrap 2 sites are encouraged to review relevant HTML and update to the latest implementation.

### Arizona Header Classes

These custom Arizona Bootstrap classes for the Arizona Header are now deprecated:
- `.block-a-line-logo`: This class has no replacement. Instead, the `.arizona-line-logo` class should be used with the appropriate logo image.
- `.redbar-buttons`: This class has no replacement (the element now uses standard Arizona Bootstrap classes instead).
- `.btn-redbar`: This class has been replaced with `.btn-arizona-header`.

For both of these deprecated classes, the original CSS has been preserved. However, if these classes are used with the Arizona Header on a Quickstart 3 site, it will not be displayed correctly due to updates to the markup.

### Card Classes

These custom Arizona Bootstrap classes are now deprecated:

 - `.card-borderless`: This class can be replaced with `.border-0`.
 - `.card-clickable` and `.card-clickable-link`: These classes can be replaced with styling using the standard [Stretched Link helper]({{< docsref "/helpers/stretched-link/" >}}) along with our custom [Hover utilities]({{< docsref "/utilities/hover/" >}}). See the [examples on the Card page]({{< docsref "/components/card/#borderless-and-clickable-cards" >}}).
 - `.card-landing-grid` and `.landing-$color`: The "landing grid" card style from Arizona Bootstrap 2 has been deprecated and should no longer be used.

### Nav Tabs Large

The `.nav-tabs-lg` custom Arizona Bootstrap class is now deprecated.


## Deprecated Utilities

The following utilities are deprecated in Arizona Bootstrap 5 and will be removed in the next major version.

### Border Thick

The `.border-thick` custom Arizona Bootstrap class has been deprecated. The `.border-4` class from the new [border width]({{< docsref "/utilities/borders/#width" >}}) utilities can be used as a direct replacement.

### UL Triangles

The `.ul-triangles` custom Arizona Bootstrap class has been deprecated and replaced by `.az-list-triangles`.


## Removed Components

The following components have been removed in Arizona Bootstrap 5.

### Background Wrapper Patterns

The Triangles Fade, Triangle Mosaic, and Catalinas Abstract background wrapper patterns were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5.

### Button Classes

The following `.btn-*` classes were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5:

 - `.btn-default`: Replace with `.btn-red`.
 - `.btn-hollow-default`: Replace with `.btn-outline-red`.
 - `.btn-hollow-primary`: Replace with `.btn-outline-blue`.
 - `.btn-hollow-reverse`: Replace with `.btn-outline-white`.

### Callout Variants

For our custom [Callouts component]({{< docsref "/components/callouts/" >}}), the following callout variants have been removed:
 - `.callout-leaf`
 - `.callout-river`
 - `.callout-silver`
 - `.callout-mesa`
 - `.callout-light`
 - `.callout-dark`

### Card Color Classes

Card color classes such as `.card-primary` and `.card-primary-outline` were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. See [Card styles]({{< docsref "/components/card/#card-styles" >}}) for information on how to customize card colors and borders.

### Dropdown Dividers

The `.divider` and `.nav-divider` classes deprecated in Arizona Bootstrap 2 have been replaced by the `.dropdown-divider` class.

### Labels

The `.label-*` classes were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. Existing labels can be replaced with [badges]({{< docsref "/components/badge/" >}}).

### Modal Dark

The `.modal-bg-dark` class was deprecated in Arizona Bootstrap 2 and has been removed in Arizona Bootstrap 5. See the [Modal documentation]({{< docsref "/components/modal/" >}}) for details about customizing modals.

### Navbar Default

The `.navbar-default` class deprecated in Arizona Bootstrap 2 has been removed in Arizona Bootstrap 5. See the [Navbar documentation]({{< docsref "/components/navbar/" >}}) for information on theming navbars.

### Navbar Off Canvas

The Navbar Off Canvas component custom to Arizona Bootstrap has been removed. This component is no longer used in Arizona Quickstart. Instead of displaying a single nav in different ways for mobile and desktop devices, Quickstart now uses separate navs (with different functionality) for mobile and desktop devices. For an example from upstream Bootstrap of building a similar component, see [Offcanvas navbar]({{< docsref "/examples/offcanvas-navbar/" >}}).

### Panels

Panels were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. The following classes may be used as a starting point for updating the HTML for the component: **these classes are not direct replacements**.
 - `panel` &rarr; `card`
 - `panel-body` &rarr; `card-body`
 - `panel-heading` &rarr; `card-header`
 - `panel-title` &rarr; `card-title`
 - `panel-footer` &rarr; `card-footer`

### Thumbnails

Thumbnails were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. Thumbnails can be replaced with [cards]({{< docsref "/components/card/" >}}) as appropriate.

### Wells

Wells were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. The following classes may be used as a starting point for updating the HTML for the component: **these classes are not direct replacements**.
 - `well` &rarr; `card p-card text-bg-cool-gray`
 - `well-hollow` &rarr; `text-bg-white`


## Removed Utilities

The following utilities have been removed in Arizona Bootstrap 5.

### Background Color: Silver Tint

The `.bg-silver-tint` class was deprecated in Arizona Bootstrap 2 and has been removed in Arizona Bootstrap 5. Use `.text-bg-gray-100` instead.

### Blockquote Reverse

The `.blockquote-reverse` class was removed in upstream Bootstrap 4 and has been removed from Arizona Bootstrap 5.

### Bold Custom Class

The `.bold` Arizona Bootstrap class was [deprecated in Arizona Bootstrap 2](https://digital.arizona.edu/arizona-bootstrap/docs/2.0/backwards-compatibility/#fonts--font-styles) and has been removed from Arizona Bootstrap 5. Use `.fw-bold` from the [font-weight classes]({{< docsref "/utilities/text/#font-weight-and-italics" >}}) instead.

### Column Offset Classes

Column offset classes with the format `.col-<breakpoint>-offset-<size>` (e.g., `.col-md-offset-2`) were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. The format `.offset-<breakpoint>-<size>` should be used instead: see [Offsetting columns]({{< docsref "/layout/columns/#offsetting-columns" >}}).

### Heading Style

The `.heading-style` class has been removed from Arizona Bootstrap 5. The Bootstrap `.h1` - `.h6` styles should be used instead.

### Mailto

The `.mailto` class, which is placed directly on the `<a>` link tag, has been removed in favor of Bootstrap's `.text-truncate` class, which is placed on the surrounding `<div>` instead. See [Text Truncation]({{< docsref "/helpers/text-truncation/" >}}) for more details.

### Page Header

The `.page-header` class was deprecated in Arizona Bootstrap 2 and has been removed in Arizona Bootstrap 5. This class can be replaced with this set of classes: `mt-5 mb-4 pb-3`.

### Pull Classes

The `.pull-left` and `.pull-right` classes were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. They can be replaced with `.float-start` and `.float-end`, respectively.

### Text Alignment *-not Classes

The custom Arizona Bootstrap `*-not` classes from UA Bootstrap (e.g., `.text-left-not-xs`, `.text-justify-not-lg`) were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. See [Text alignment]({{< docsref "/utilities/text/#text-alignment" >}}) for examples of the available responsive text alignment classes.

### Text Size Heading Classes

The custom Arizona Bootstrap `.text-size-*` classes (e.g., `.text-size-h1`) were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. These classes can be replaced with the appropriate [heading style class]({{< docsref "/content/typography/#headings" >}}) in combination with `mb-0` to match the original styling (e.g., `.h1 mb-0`).

### Text Vertical Alignment

The custom Arizona Bootstrap `.margin-align-*` classes were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. These classes can be replaced with standard [Vertical align]({{< docsref "/utilities/vertical-align" >}}) classes as follows:
 - `margin-align-top` &rarr; `align-text-bottom`
 - `margin-align-middle` &rarr; `align-middle`
 - `margin-align-bottom` &rarr; `align-text-top`

### Triangle List Class

The `.triangle` class for styling list bullets was deprecated in Arizona Bootstrap 2 and has been replaced with `.az-list-triangles` in Arizona Bootstrap 5.

### Sans

The legacy `.sans` class has been removed from Arizona Bootstrap 5, which already uses a sans-serif font for both body and heading text.

### Zero Margin Classes

The `.margin-zero-top` and `.margin-zero-bottom` classes were deprecated in Arizona Bootstrap 2 and have been removed in Arizona Bootstrap 5. They can be replaced with `.mt-0` and `.mb-0`, respectively.


## Removed JavaScript

Components listed in the JavaScript section of Arizona Bootstrap 2 (e.g., Modals, Tooltips, Popovers) have had certain methods, options, and events removed or changed in Arizona Bootstrap 5. These items are not backwards compatible. They should not cause breaking changes, but if you are manually calling any of these methods, they will need to be updated to use the methods/events/functions that {{< ourname >}} uses. Refer to each individual component's documentation for an explanation of proper methods, options, and events.

### Offcanvasmenu

The Offcanvasmenu JavaScript module included in Arizona Bootstrap 2 has been removed from Arizona Bootstrap 5. This module supported the custom Navbar Off Canvas component, which has also been removed.


## Tables

Arizona Bootstrap 5 includes a custom set of [table variants]({{< docsref "content/tables/#variants" >}}). From the theme colors, only Light and Dark table variants are included. Table variants for select university brand colors are also included.

**Note:** In Bootstrap 5, [`.thead-light` and `.thead-dark` have been replaced with the `.table-*` color variant classes]({{< docsref "migration/#content-reboot-etc" >}}). Also, the default `.table` class now sets a white background color for its nested elements: it did not do so in Arizona Bootstrap 2. For tables placed on a background that isn't white, site owners can add the appropriate `.table-*` color variant class to the `.table` element.


## Icons

[Google Material Icons (Sharp)](https://fonts.google.com/icons?icon.style=Sharp&icon.set=Material+Icons) are deprecated in Arizona Bootstrap 5. Site owners are encouraged to review
the [updated documentation](../icons/) around importing and using the approved [Material Symbols (Rounded)](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols&icon.size=24&icon.color=%23e3e3e3) in Arizona
Bootstrap 5.

 - `.material-icons-sharp`: Replace with `.material-symbols-rounded`.

---
layout: docs
title: RFS
description: Bootstrap's resizing engine responsively scales common CSS properties to better utilize available space across viewports and devices.
group: getting-started
toc: true
---

## What is RFS?

Bootstrap's side project [RFS](https://github.com/twbs/rfs/tree/{{< param "rfs_version" >}}) is a unit resizing engine which was initially developed to resize font sizes (hence its abbreviation for Responsive Font Sizes). Nowadays RFS is capable of rescaling most CSS properties with unit values like `margin`, `padding`, `border-radius`, or even `box-shadow`.

The mechanism automatically calculates the appropriate values based on the dimensions of the browser viewport. It will be compiled into `calc()` functions with a mix of `rem` and viewport units to enable the responsive scaling behavior.

## Using RFS

The mixins are included in Arizona Bootstrap and are available once you include Arizona Bootstrap's `scss`. RFS can also be [installed standalone](https://github.com/twbs/rfs/tree/{{< param "rfs_version" >}}#installation) if needed.

### Using the mixins

The `rfs()` mixin has shorthands for `font-size`, `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `padding`, `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`. See the example below for source Sass and compiled CSS.

```scss
.title {
  @include font-size(4rem);
}
```

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

Any other property can be passed to the `rfs()` mixin like this:

```scss
.selector {
  @include rfs(4rem, border-radius);
}
```

`!important` can also just be added to whatever value you want:

```scss
.selector {
  @include padding(2.5rem !important);
}
```

### Using the functions

When you don't want to use the includes, there are also two functions:

- `rfs-value()` converts a value into a `rem` value if a `px` value is passed, in other cases it returns the same result.
- `rfs-fluid-value()` returns the fluid version of a value if the property needs rescaling.

In this example, we use one of Arizona Bootstrap's built-in [responsive breakpoint mixins]({{< docsref "/layout/breakpoints" >}}) to only apply styling below the `lg` breakpoint.

```scss
.selector {
  @include media-breakpoint-down(lg) {
    padding: rfs-fluid-value(2rem);
    font-size: rfs-fluid-value(1.125rem);
  }
}
```

```css
@media (max-width: 991.98px) {
  .selector {
    padding: calc(1.325rem + 0.9vw);
    font-size: 1.125rem; /* 1.125rem is small enough, so RFS won't rescale this */
  }
}
```

## Extended documentation

RFS is a separate project under the Bootstrap organization. More about RFS and its configuration can be found on its [GitHub repository](https://github.com/twbs/rfs/tree/{{< param "rfs_version" >}}).

---
layout: docs
title: Spacing
description: Arizona Bootstrap includes a wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.
group: utilities
toc: true
---

## How it Works

Assign responsive-friendly `margin` or `padding` values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties. Classes are built from a default Sass map ranging from `.25rem` to `8rem`. Classes are determined relative to `$spacer`, which equals `1rem`.

## Notation

Spacing utilities that apply to all breakpoints, from `xs` to `xl`, have no breakpoint abbreviation in them. This is because those classes are applied from `min-width: 0` and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.

The classes are named using the format `{property}{sides}-{size}` for `xs` and `{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, `lg`, and `xl`.

Where *property* is one of:

* `m` - for classes that set `margin`
* `p` - for classes that set `padding`

Where *sides* is one of:

* `t` - for classes that set `margin-top` or `padding-top`
* `b` - for classes that set `margin-bottom` or `padding-bottom`
* `l` - for classes that set `margin-left` or `padding-left`
* `r` - for classes that set `margin-right` or `padding-right`
* `x` - for classes that set both `*-left` and `*-right`
* `y` - for classes that set both `*-top` and `*-bottom`
* blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *size* is one of:

* `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
* `1` - (by default) for classes that set the `margin` or `padding` to `$spacer * .25`
* `2` - (by default) for classes that set the `margin` or `padding` to `$spacer * .5`
* `3` - (by default) for classes that set the `margin` or `padding` to `$spacer`
* `4` - (by default) for classes that set the `margin` or `padding` to `$spacer * 1.5`
* `5` - (by default) for classes that set the `margin` or `padding` to `$spacer * 3`
* `6` - (by default) for classes that set the `margin` or `padding` to `$spacer * 4`
* `7` - (by default) for classes that set the `margin` or `padding` to `$spacer * 5`
* `8` - (by default) for classes that set the `margin` or `padding` to `$spacer * 6`
* `9` - (by default) for classes that set the `margin` or `padding` to `$spacer * 7`
* `10` - (by default) for classes that set the `margin` or `padding` to `$spacer * 8`
* `auto` - for classes that set the `margin` to auto

(You can add more sizes by adding entries to the `$spacers` Sass map variable.)

## Examples

Here are some representative examples of these classes:

```scss
.mt-0 {
  margin-top: 0 !important;
}

.ml-1 {
  margin-left: ($spacer * .25) !important;
}

.px-2 {
  padding-left: ($spacer * .5) !important;
  padding-right: ($spacer * .5) !important;
}

.p-3 {
  padding: $spacer !important;
}
```

### Padding

Padding modifies the space inside the div.

{{< example >}}
<div class="row">
  <div class="col">
    <div class="p-3 bg-light">Less inner padding</div>
  </div>
  <div class="col">
    <div class="p-6 bg-light">More inner padding</div>
  </div>
</div>
{{< /example >}}

### Margin

Margin modifies the space outside the div.

{{< example >}}
<div class="row">
  <div class="col">
    <div class="my-3 bg-light">Less outer margin</div>
  </div>
  <div class="col">
    <div class="my-6 bg-light">More outer margin</div>
  </div>
</div>
{{< /example >}}


### Horizontal Centering

Additionally, {{< ourname >}} also includes an `.mx-auto` class for horizontally centering fixed-width block level content—that is, content that has `display: block` and a `width` set—by setting the horizontal margins to `auto`.

<div class="bd-example">
  <div class="mx-auto" style="width: 200px; background-color: rgba(86,61,124,.15);">
    Centered element
  </div>
</div>

```html
<div class="mx-auto" style="width: 200px;">
  Centered element
</div>
```

### Negative Margin

In CSS, `margin` properties can utilize negative values (`padding` cannot). As of 4.2, we've added negative margin utilities for every non-zero integer size listed above (e.g., `1`, `2`, `3`, `4`, `5`). These utilities are ideal for customizing grid column gutters across breakpoints.

The syntax is nearly the same as the default, positive margin utilities, but with the addition of `n` before the requested size. Here's an example class that's the opposite of `.mt-1`:

```scss
.mt-n1 {
  margin-top: -0.25rem !important;
}
```

Here's an example of customizing the {{< ourname >}} grid at the medium (`md`) breakpoint and above. We've increased the `.col` padding with `.px-md-5` and then counteracted that with `.mx-md-n5` on the parent `.row`.

{{< example >}}
<div class="row mx-md-n5">
  <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
  <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
</div>
{{< /example >}}

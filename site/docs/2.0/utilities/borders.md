---
layout: docs
title: Borders
description: Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.
group: utilities
redirect_from: "/docs/2.0/utilities/"
toc: true
---

## Border

Use border utilities to add or remove an element's borders. Choose from all borders or one at a time.

### Additive

<div class="bd-example-border-utils">
{{< example >}}
<span class="border"></span>
<span class="border-top"></span>
<span class="border-right"></span>
<span class="border-bottom"></span>
<span class="border-left"></span>
{{< /example >}}
</div>

### Subtractive

<div class="bd-example-border-utils bd-example-border-utils-0">
{{< example >}}
<span class="border-0"></span>
<span class="border-top-0"></span>
<span class="border-right-0"></span>
<span class="border-bottom-0"></span>
<span class="border-left-0"></span>
{{< /example >}}
</div>

## Border Color

Change the border color using utilities built on our theme colors.

<div class="bd-example-border-utils">
{{< example >}}
{% for color in .Site.Data.theme-colors %}
<span class="border border-{{ color.name }}"></span>{% endfor %}
<span class="border border-white"></span>
{{< /example >}}
</div>

## Border-radius

Add classes to an element to easily round its corners.

<div class="bd-example bd-example-images">
  {%- include icons/placeholder.svg width="75" height="75" class="rounded" title="Example rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-top" title="Example top rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-right" title="Example right rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-bottom" title="Example bottom rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-left" title="Example left rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-circle" title="Completely round image" -%}
  {%- include icons/placeholder.svg width="150" height="75" class="rounded-pill" title="Rounded pill image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-0" title="Example non-rounded image (overrides rounding applied elsewhere)" -%}
</div>

```html
<img src="..." alt="..." class="rounded">
<img src="..." alt="..." class="rounded-top">
<img src="..." alt="..." class="rounded-right">
<img src="..." alt="..." class="rounded-bottom">
<img src="..." alt="..." class="rounded-left">
<img src="..." alt="..." class="rounded-circle">
<img src="..." alt="..." class="rounded-pill">
<img src="..." alt="..." class="rounded-0">
```

## Sizes

Use `.rounded-lg` or `.rounded-sm` for larger or smaller border-radius.

<div class="bd-example bd-example-images">
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-sm" title="Example small rounded image" -%}
  {%- include icons/placeholder.svg width="75" height="75" class="rounded-lg" title="Example large rounded image" -%}
</div>

```html
<img src="..." alt="..." class="rounded-sm">
<img src="..." alt="..." class="rounded-lg">
```

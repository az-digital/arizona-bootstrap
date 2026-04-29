---
layout: docs
title: Background
description: Convey meaning through `background-color` and add decoration with gradients.
group: utilities
toc: true
---

{{< callout info >}}
{{< partial "callouts/warning-color-assistive-technologies.md" >}}
{{< /callout >}}

## Background color

Similar to the contextual text color classes, set the background of an element to any contextual class. Background utilities **do not set `color`**, so in some cases you'll want to use `.text-*` [color utilities]({{< docsref "/utilities/colors" >}}).

{{< callout info >}}
Background utilities like `.bg-*` that generated from our original `$theme-colors` Sass map don't yet respond to color modes. This will be resolved in upstream Bootstrap v6.0.0.
{{< /callout >}}

### Brand

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "colors") }}
<div class="p-3 mb-2 bg-{{ .name }}{{ if .contrast_color }} text-{{ .contrast_color }} {{ else }} text-white{{ end }}">.bg-{{ .name }}</div>
{{- end -}}
{{< /colors.inline >}}
{{< /example >}}

### Contextual (Theme)
{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="p-3 mb-2 bg-{{ .name }}{{ if .contrast_color }} text-{{ .contrast_color }}{{ else }} text-white{{ end }}">.bg-{{ .name }}</div>
{{- end -}}
{{< /colors.inline >}}
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
{{< /example >}}

### Grayscale

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "grays") }}
<div class="p-3 mb-2 bg-gray-{{ .name }}{{ if .contrast_color }} text-{{ .contrast_color }}{{ else }} text-white{{ end }}">.bg-gray-{{ .name }}</div>
{{- end -}}
{{< /colors.inline >}}
{{< /example >}}

### Transparent

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
<div class="position-relative overflow-hidden">
  <img class="position-absolute bottom-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">{{< colors.inline >}}
{{- $excluded := slice "leaf" "river" "silver" "mesa" "ash" "sage" -}}
{{- range $color := where $.Site.Data.colors "name" "not in" $excluded }}
  <div class="bg-transparent-{{ $color.name }}{{ if $color.contrast_color }} text-{{ $color.contrast_color }}{{ else }} text-white{{ end }} p-3 position-relative">.bg-transparent-{{ $color.name }}</div>
{{- end -}}
{{< /colors.inline >}}
</div>
{{< /example >}}

## Background gradient

### Brand Background Colors

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
<div class="position-relative overflow-hidden">
  <img class="position-absolute bottom-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">{{< colors.inline >}}
{{- $excluded := slice "leaf" "river" "silver" "mesa" "ash" "sage" -}}
{{- range $color := where $.Site.Data.colors "name" "not in" $excluded }}
  <div class="bg-gradient-{{ $color.name }}{{ if $color.contrast_color }} text-{{ $color.contrast_color }}{{ else }} text-white{{ end }} p-3 position-relative">.bg-gradient-{{ $color.name }}</div>
{{- end -}}
{{< /colors.inline >}}
</div>
{{< /example >}}

### Upstream Bootstrap Gradient Class

By adding a `.bg-gradient` class, a linear gradient is added as background image to the backgrounds. This gradient starts with a semi-transparent white which fades out to the bottom.

Do you need a gradient in your custom CSS? Just add `background-image: var(--bs-gradient);`.

{{< markdown >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "pnc-colors") }}
<div class="p-3 mb-2 bg-{{ .name }} bg-gradient{{ with .contrast_color }} text-{{ . }}{{ else }} text-white{{ end }}">.bg-{{ .name }}.bg-gradient</div>
{{- end -}}
{{< /colors.inline >}}
<div class="p-3 mb-2 bg-black bg-gradient text-white">.bg-black.bg-gradient</div>
{{< /markdown >}}

## Opacity

{{< added-in "5.1.0" >}}

As of v5.1.0, `background-color` utilities are generated with Sass using CSS variables. This allows for real-time color changes without compilation and dynamic alpha transparency changes.

### How it works

Consider our default `.bg-oasis` utility.

```css
.bg-oasis {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-oasis-rgb), var(--bs-bg-opacity)) !important;
}
```

We use an RGB version of our `--bs-oasis` (with the value of `55, 141, 189`) CSS variable and attached a second CSS variable, `--bs-bg-opacity`, for the alpha transparency (with a default value `1` thanks to a local CSS variable). That means anytime you use `.bg-oasis` now, your computed `color` value is `rgba(55, 141, 189, 1)`. The local CSS variable inside each `.bg-*` class avoids inheritance issues so nested instances of the utilities don't automatically have a modified alpha transparency.

### Example

To change that opacity, override `--bs-bg-opacity` via custom styles or inline styles.

{{< example >}}
<div class="bg-oasis p-2 text-white">This is default oasis background</div>
<div class="bg-oasis p-2" style="--bs-bg-opacity: .5;">This is 50% opacity oasis background</div>
{{< /example >}}

Or, choose from any of the `.bg-opacity` utilities:

{{< example >}}
<div class="bg-oasis p-2 text-white">This is default success background</div>
<div class="bg-oasis p-2 text-white bg-opacity-75">This is 75% opacity success background</div>
<div class="bg-oasis p-2 text-dark bg-opacity-50">This is 50% opacity success background</div>
<div class="bg-oasis p-2 text-dark bg-opacity-25">This is 25% opacity success background</div>
<div class="bg-oasis p-2 text-dark bg-opacity-10">This is 10% opacity success background</div>
{{< /example >}}

## CSS

In addition to the following Sass functionality, consider reading about our included [CSS custom properties]({{< docsref "/customize/css-variables" >}}) (aka CSS variables) for colors and more.

### Sass variables

Most `background-color` utilities are generated by our theme colors, reassigned from our generic color palette variables.

{{< scss-docs name="color-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="theme-color-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="variable-gradient" file="scss/_variables.scss" >}}

Grayscale colors are also available, but only a subset are used to generate any utilities.

{{< scss-docs name="gray-color-variables" file="scss/_variables.scss" >}}

Variables for setting `background-color` in `.bg-*-subtle` utilities in light and dark mode:

{{< scss-docs name="theme-bg-subtle-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="theme-bg-subtle-dark-variables" file="scss/_variables-dark.scss" >}}

### Sass maps

Theme colors are then put into a Sass map so we can loop over them to generate our utilities, component modifiers, and more.

{{< scss-docs name="theme-colors-map" file="scss/_variables.scss" >}}

Grayscale colors are also available as a Sass map. **This map is not used to generate any utilities.**

{{< scss-docs name="gray-colors-map" file="scss/_variables.scss" >}}

RGB colors are generated from a separate Sass map:

{{< scss-docs name="theme-colors-rgb" file="scss/_maps.scss" >}}

Background color opacities build on that with their own map that's consumed by the utilities API:

{{< scss-docs name="utilities-bg-colors" file="scss/_maps.scss" >}}

Color mode background colors are also available as a Sass map:

{{< scss-docs name="theme-bg-subtle-map" file="scss/_maps.scss" >}}

{{< scss-docs name="theme-bg-subtle-dark-map" file="scss/_maps.scss" >}}

### Sass mixins

**No mixins are used to generate our background utilities**, but we do have some additional mixins for other situations where you'd like to create your own gradients.

{{< scss-docs name="gradient-bg-mixin" file="scss/mixins/_gradients.scss" >}}

{{< scss-docs name="gradient-mixins" file="scss/mixins/_gradients.scss" >}}

### Sass utilities API

Background utilities are declared in our utilities API in `scss/_utilities.scss`. [Learn how to use the utilities API.]({{< docsref "/utilities/api#using-the-api" >}})

{{< scss-docs name="utils-bg-color" file="scss/_utilities.scss" >}}

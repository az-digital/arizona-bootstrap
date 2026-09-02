---
layout: docs
title: Color and background
description: Set a background color with contrasting foreground color.
group: helpers
toc: true
added:
  version: "5.2"
---

## Overview

Color and background helpers combine the power of our [`.text-*` utilities]({{< docsref "/utilities/colors" >}}) and [`.bg-*` utilities]({{< docsref "/utilities/background" >}}) in one class. Using our Sass `color-contrast()` function, we automatically determine a contrasting `color` for a particular `background-color`.

{{< callout warning >}}
**Heads up!** There's currently no support for a CSS-native `color-contrast` function, so we use our own via Sass. This means that customizing our theme colors via CSS variables may cause color contrast issues with these utilities.
{{< /callout >}}

### Brand

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "colors") }}
<div class="text-bg-{{ .name }} p-3">{{ .name | title }} with contrasting color</div>
{{- end -}}
{{< /text-bg.inline >}}
{{< /example >}}

### Contextual (Theme)
{{< example >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="text-bg-{{ .name }} p-3">{{ .name | title }} with contrasting color</div>
{{- end -}}
{{< /text-bg.inline >}}
{{< /example >}}

{{< callout info >}}
{{< partial "callouts/warning-color-assistive-technologies.md" >}}
{{< /callout >}}

### Grayscale

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "grays") }}
<div class="text-bg-gray-{{ .name }} p-3">.gray-{{ .name | title }} with contrasting color</div>
{{- end -}}
{{< /text-bg.inline >}}
{{< /example >}}

### Transparent

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

These text background classes set the text color by default. Other background classes that do not set the text color are found on the [Background color utilities page]({{< docsref "/utilities/background" >}}). This includes `bg-transparent`.

{{< example >}}
<div class="position-relative overflow-hidden">
  <img class="position-absolute bottom-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">{{< text-bg.inline >}}
{{- $excluded := slice "leaf" "river" "silver" "mesa" "ash" "sage" -}}
{{- range $color := where $.Site.Data.colors "name" "not in" $excluded }}
  <div class="text-bg-transparent-{{ $color.name }} p-3 position-relative">.text-bg-transparent-{{ $color.name }} with contrasting color</div>
{{- end -}}
{{< /text-bg.inline >}}
</div>
{{< /example >}}

### Gradient

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

{{< example >}}
<div class="position-relative overflow-hidden">
  <img class="position-absolute bottom-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">{{< text-bg.inline >}}
{{- $excluded := slice "leaf" "river" "silver" "mesa" "ash" "sage" -}}
{{- range $color := where $.Site.Data.colors "name" "not in" $excluded }}
  <div class="text-bg-gradient-{{ $color.name }} p-3 position-relative">.text-bg-gradient-{{ $color.name }} with contrasting color</div>
{{- end -}}
{{< /text-bg.inline >}}
</div>
{{< /example >}}

## With headings and links

<span class="badge badge-az-custom">Custom Arizona Bootstrap Styling</span>

Arizona Bootstrap includes additional styling to ensure that headings and links within elements styled by a `.text-bg-*` class have an accessible and brand-appropriate text color as well.

{{< example >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "colors") }}
<div class="text-bg-{{ .name }} p-3"><h3 class="h6 my-0">{{ .name | title }} with contrasting heading color and <a href="#top">link color</a></h3></div>
{{- end -}}
{{< /text-bg.inline >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="text-bg-{{ .name }} p-3"><h3 class="h6 my-0">{{ .name | title }} with contrasting heading color and <a href="#top">link color</a></h3></div>
{{- end -}}
{{< /text-bg.inline >}}
{{< text-bg.inline >}}
{{- range (index $.Site.Data "grays") }}
<div class="text-bg-gray-{{ .name }} p-3"><h3 class="h6 my-0">Gray {{ .name | title }} with contrasting heading color and <a href="#top">link color</a></h3></div>
{{- end -}}
{{< /text-bg.inline >}}
{{< /example >}}

## With components

Use them in place of combined `.text-*` and `.bg-*` classes, like on [badges]({{< docsref "/components/badge#background-colors" >}}):

{{< example >}}
<span class="badge text-bg-leaf">Leaf</span>
<span class="badge text-bg-sky">Sky</span>
<span class="badge text-bg-mesa">Mesa</span>
{{< /example >}}

Or on [cards]({{< docsref "/components/card#background-and-color" >}}):

{{< example >}}
<div class="card text-bg-warm-gray mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-bg-chili mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{{< /example >}}

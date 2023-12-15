---
layout: docs
title: Colors
description: Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.
group: utilities
toc: true
---

## Overview

{{< ourname >}} offers two "types" or colors: Brand colors and contextual (theme) colors. Brand colors are a collection of Arizona Branded colors offered by the <a href="https://marcom.arizona.edu/brand-guidelines/colors" target="_blank">Brand website</a>. Contextual colors are a smaller selection of Brand colors that are used to convey meaning and contextual information (e.g., success, warning, danger).

When using these colors, it is important to maintain sufficient color contrast between your text color and background color. You can utilize the <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAim Color Contrast Checker</a> to verify your color contrast. Or, for your convenience, {{< ourname >}} also provides a [helpful tool]({{< docsref "/getting-started/color-contrast" >}}) to determine which Brand text colors have sufficient color contrast on other Brand background colors.

## Text Color

### Brand

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "colors") }}
<p class="text-{{ .name }}{{ if or (eq .name "white") (eq .name "cool-gray") (eq .name "warm-gray") }} bg-dark{{ end }}">.text-{{ .name }}</p>{{ end }}
{{< /colors.inline >}}
{{< /example >}}

### Contextual (Theme)

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<p class="text-{{ .name }}{{ if eq .name "light" }} bg-dark{{ end }}">.text-{{ .name }}</p>
{{- end -}}
{{< /colors.inline >}}
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
{{< /example >}}

Contextual text classes also work well on anchors with the provided hover and focus states. **Note that the `.text-white` and `.text-muted` class has no additional link styling beyond underline.**

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<p><a href="#" class="text-{{ .name }}{{ if eq .name "light" }} bg-dark{{ end }}">{{ .name | title }} link</a></p>{{ end }}
{{< /colors.inline >}}
<p><a href="#" class="text-muted">Muted link</a></p>
<p><a href="#" class="text-white bg-dark">White link</a></p>
{{< /example >}}


## Background Color

Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes. Background utilities **do not set `color`**, so in some cases you'll want to use `.text-*` utilities.

### Brand

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "colors") }}
<div class="p-3 mb-2 bg-{{ .name }}">.bg-{{ .name }}</div>
{{ end }}
{{< /colors.inline >}}
{{< /example >}}

### Contextual (Theme)

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="p-3 mb-2 bg-{{ .name }}">.bg-{{ .name }}</div>
{{ end }}
{{< /colors.inline >}}
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
{{< /example >}}

### Grayscale

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data.grays) }}
<div class="p-3 mb-2 bg-gray-{{ .name }}">.bg-gray-{{ .name }}</div>
{{ end }}
{{< /colors.inline >}}
{{< /example >}}

## Background Gradient
Use the `bg-gradient-*` class to apply a gradient background from a color on the bottom to transparent on the top.

{{< example >}}
<h3 class="bold p-card pt-8 bg-gradient-black text-white">.bg-gradient-black</h3>
{{< /example >}}

### TWBS Original Information
When `$enable-gradients` is set to `true` (default is `false`), you can use `.bg-gradient-` utility classes. [Learn about our Sass options]({{< docsref "/getting-started/theming#sass-options" >}}) to enable these classes and more.

{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
- `.bg-gradient-{{ .name }}`
{{ end }}
{{< /colors.inline >}}

{{< callout info >}}
#### Dealing with Specificity

Sometimes contextual classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element's content in a `<div>` with the class.
{{< /callout >}}

{{< callout warning >}}
{{< partial "callout-warning-color-assistive-technologies.md" >}}
{{< /callout >}}

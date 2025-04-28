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

{{< example class="bd-example-border-utils" >}}
<span class="border"></span>
<span class="border-top"></span>
<span class="border-end"></span>
<span class="border-bottom"></span>
<span class="border-start"></span>
{{< /example >}}

### Subtractive

{{< example class="bd-example-border-utils bd-example-border-utils-0" >}}
<span class="border-0"></span>
<span class="border-top-0"></span>
<span class="border-end-0"></span>
<span class="border-bottom-0"></span>
<span class="border-start-0"></span>
{{< /example >}}

## Border Thickness

Add on the `border-thick` utility class to any border utility to set `border-width: .25rem !important;`.

{{< example class="bd-example-border-utils" >}}
<span class="border border-thick"></span>
<span class="border-top border-thick"></span>
<span class="border-end border-thick"></span>
<span class="border-bottom border-thick"></span>
<span class="border-start border-thick"></span>
{{< /example >}}

## Border Color

### Contextual (Theme)
Change border colors to convey meaning and contextual information (e.g., success, warning, danger)

{{< example class="bd-example-border-utils" >}}
{{< border.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<span class="border border-{{ .name }}"></span>
{{- end -}}
{{< /border.inline >}}
{{< /example >}}

### Brand
Add borders with <a href="https://marcom.arizona.edu/brand-guidelines/colors">Arizona-branded colors</a>.

{{< example class="bd-example-border-utils" >}}
{{< border.inline >}}
{{- range (index $.Site.Data "colors") }}
{{- if or (eq .name "red") (eq .name "blue") (eq .name "white") (eq .name "warm-gray") (eq .name "cool-gray")  (eq .name "cool-gray")  (eq .name "midnight")  (eq .name "azurite")  (eq .name "oasis")  (eq .name "chili") }}
<span class="border border-{{ .name }}"></span>
{{- end -}}
{{- end -}}
{{< /border.inline >}}
{{< /example >}}

## Border-radius

Add classes to an element to easily round its corners.

{{< example>}}
{{< placeholder width="75" height="75" class="rounded" title="Example rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-top" title="Example top rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-end" title="Example right rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-bottom" title="Example bottom rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-start" title="Example left rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-circle" title="Completely round image" >}}
{{< placeholder width="150" height="75" class="rounded-pill" title="Rounded pill image" >}}
{{< placeholder width="75" height="75" class="rounded-0" title="Example non-rounded image (overrides rounding applied elsewhere)" >}}
{{< /example >}}

## Sizes

Use `.rounded-lg` or `.rounded-sm` for larger or smaller border-radius.

{{< example >}}
{{< placeholder width="75" height="75" class="rounded-sm" title="Example small rounded image" >}}
{{< placeholder width="75" height="75" class="rounded-lg" title="Example large rounded image" >}}
{{< /example >}}

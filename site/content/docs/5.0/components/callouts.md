---
layout: docs
title: Callouts
description: Call attention to a snippet of content to make users aware of something important.
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

## Brand

Callouts call attention to a small portion of content. These use [brand colors]({{< docsref "/utilities/colors#brand-1" >}}), which is useful when you want the callout to stand out against the rest of the page but still coordinate with the page's style and color.

{{< example >}}
{{< callout.inline >}}
{{ range (index $.Site.Data.colors) }}
<div class="callout callout-{{ .name }}{{ if eq .name "white" }} text-bg-dark{{ end }}">
  <p class="h4">{{ .name | title }} Callout</p>
  <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
</div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}


## Contextual (Theme)

Contextual callouts are styled to match upstream Bootstrap's `bd-callout` docs class.

{{< example >}}
{{< callout.inline >}}
{{ range where (index $.Site.Data "theme-colors") "name" "not in" (slice "light" "dark") }}
<div class="bs-callout bs-callout-{{ .name }}">
  <strong>{{ .name | title }} Callout</strong> A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.
</div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}

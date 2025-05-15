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
## Contextual
Upstream Bootstrap's callouts utilize the danger, warning, and info colors specifically for these contexts.

{{< example >}}
{{< callout.inline >}}
{{ range where (index $.Site.Data "theme-colors") "name" "not in" (slice "success" "light" "dark") }}
<div class="bd-callout bd-callout-{{ .name }}">
  <strong>{{ .name | title }} Callout</strong>
  A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.
</div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}

## Brand

These are useful if you want a portion of content to stand out against the rest of the content, but still coordinate with [brand colors]({{< docsref "/utilities/colors#brand-1" >}}).

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

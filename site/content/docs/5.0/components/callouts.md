---
layout: docs
title: Callouts
description: Call attention to a snippet of content to make users aware of something important.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

## Brand

Callouts call attention to a small portion of content that needs to stand out against the rest of the page. They can be used with [brand colors]({{< docsref "/customize/color#all-colors" >}}) or [theme colors]({{< docsref "/customize/color#theme-colors" >}}).

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

{{< example >}}
{{< callout.inline >}}
{{ range index $.Site.Data "theme-colors" }}
<div class="callout callout-{{ .name }}{{ if eq .name "white" }} text-bg-dark{{ end }}">
  <p class="h4">{{ .name | title }} Callout</p>
  <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
</div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}

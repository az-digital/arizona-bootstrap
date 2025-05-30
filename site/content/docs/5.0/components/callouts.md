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
{{ $excluded := slice "leaf" "river" "silver" "mesa" }}
{{- range $color := where $.Site.Data.colors "name" "not in" $excluded -}}
  <div class="callout callout-{{ $color.name }}{{ if eq .name "white" }} text-bg-dark{{ end }}">
    <p class="h4">{{ .name | title }} Callout</p>
    <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
  </div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}


## Contextual (Theme)

{{< example >}}
{{< callout.inline >}}
{{ $excluded := slice "info" "light" "dark" }}
{{ $siteThemeColors := index $.Site.Data "theme-colors" }}
{{- range $color := where $siteThemeColors "name" "not in" $excluded -}}
  <div class="callout callout-{{ $color.name }}">
    <p class="h4">{{ .name | title }} Callout</p>
    <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
  </div>
{{ end }}
{{< /callout.inline >}}
{{< /example >}}

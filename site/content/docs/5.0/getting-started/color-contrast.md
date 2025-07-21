---
layout: docs
title: Color Contrast
description: A brief overview of Arizona Bootstrap's brand colors and color contrast.
group: getting-started
toc: true
extra_js:
  - src: "docs/5.0/assets/js/toggle-visible.js"
    async: true
---

## Overview

{{< ourname >}} provides a variety of Brand colors ready for use as background and/or text colors. Although these colors are available for use, it is important to maintain sufficient color contrast between your background and foreground (text) colors. This ensures proper accessibility on University of Arizona websites.

## University Standards

All University of Arizona websites should **maintain a minimum of WCAG AA color contrast between text color and background color**.

Below we have provided a table that includes all of the Arizona branded colors. Check the "Hide inaccessible color combinations" checkbox to only display the color combinations that meet the minimum of WCAG AA. The accessible color combinations have been determined by use of the [WebAIM Accessibility Tool](http://wave.webaim.org/report#/https://digital.arizona.edu/ua-bootstrap/colors.html).

<label id="hide-inaccessible-label" class="mb-2">
  <input type="checkbox" id="hide-inaccessible"><span role="button"> <strong>Hide inaccessible color combinations</strong></span>
</label>

{{< contrast.inline >}}
{{- $textcolors := (index (where .Site.Data.contrast "colorgroup" "text") 0).colors -}}
{{- $bgcolors := (index (where .Site.Data.contrast "colorgroup" "bg") 0).colors -}}
<div class="table-responsive">
  <table class="table table-bordered">
    <tr>
      <th></th>
    {{ range $textcolors -}}
      <th class="text-nowrap">.text-{{ .color }}</th>
    {{ end -}}
    </tr>
  {{ range $bg := $bgcolors -}}
    <tr>
      <th class="text-nowrap">.bg-{{ $bg.color }}</th>
      {{ range $text := $textcolors -}}
        {{- $cc := false -}}
        {{- range $con := $bg.contrast -}}
          {{- if $con -}}
            {{- if and (not $cc) (eq $con.accessible $text.color) -}}
              {{- $cc = true -}}
            {{- end -}}
          {{- end -}}
        {{- end -}}
        <td class="bg-{{ $bg.color }} text-center align-items-center">
          <span class="text-{{ $text.color }}{{ if (not $cc) }} inaccessible{{ end }}">.text-{{ $text.color }}</span>
        </td>
      {{ end }}
    </tr>
  {{ end -}}
  </table>
</div>
{{< /contrast.inline >}}



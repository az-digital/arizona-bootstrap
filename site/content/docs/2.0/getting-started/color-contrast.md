---
layout: docs
title: Color Contrast
description: A brief overview of Arizona Bootstrap's brand colors and color contrast.
group: getting-started
toc: true
---

## Overview

{{< ourname >}} provides a variety of Brand colors ready for use as background and/or text colors. Although these colors are available for use, it is important to maintain sufficient color contrast between your background and foreground (text) colors. This ensures proper accessibility on University of Arizona websites.

## University Standards

All University of Arizona websites should **maintain a minimum of WCAG AA color contrast between text color and background color**.

Below we have provided a table that includes all of the Arizona branded colors. Check the "Hide inaccessible color combinations" checkbox to only display the color combinations that meet the minimum of WCAG AA. The accessible color combinations have been determined by use of the [WebAIM Accessibility Tool](http://wave.webaim.org/report#/http://uadigital.arizona.edu/ua-bootstrap/colors.html).

<label id="hide-inaccessible-label">
  <input type="checkbox" id="hide-inaccessible"> <strong>Hide inaccessible color combinations.</strong>
</label>
 {{< contrast.inline >}}

{{ $contrasts := $.Site.Data.contrast }}
{{ $bgcolors := $.Site.Data.contrast }}
{{ $elem_key := "text" }}


<div class="table-responsive">
  <table class="table table-bordered">
  {{- range $contrasts }}
    {{ if eq .colorgroup "text" }}
      <tr>
        <th></th>
        {{- range .colors }}
          {{- range . }}
            <th class="text-nowrap">.text-{{ . }}</th>
          {{- end }}
        {{- end }}
      </tr>  
    {{ end }}
    {{ if eq .colorgroup "bg" }}
      {{ range $bg := .colors }}
        <tr>
          <th class="text-nowrap">.bg-{{ $bg.color }}</th>
          {{ $contrast := .contrast}}
          {{- range $contrasts }}
            {{ if eq .colorgroup "text" }}
              {{ range $text := .colors }}
                {{ $cc := false }}
                {{ range $contrast := $bg }}
                  {{ if and (not $cc) (eq . $text.color) }}
                    {{ $cc = true }}
                  {{ end }}
                {{ end }}
                <td class="bg-{{ $bg.color }} text-center align-items-center">
                  <span class="text-{{ $text.color }}{{ if (not $cc) }} inaccessible{{ end }}">.text-{{ $text.color }}</span>
                </td>
              {{- end}}
            {{- end}}
          {{- end}}
        </tr>
      {{- end }}
    {{- end }}
  {{- end}}
  </table>
</div> 

{{< /contrast.inline >}}



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

Below we have provided a table that includes all of the Arizona branded colors. Check the "Hide inaccessible color combinations" checkbox to only display the color combinations that meet the minimum of WCAG AA. The accessible color combinations have been determined by use of the <a href="http://wave.webaim.org/report#/http://uadigital.arizona.edu/ua-bootstrap/colors.html" target="_blank">WebAIM Accessibility Tool</a>.

<label id="hide-inaccessible-label">
  <input type="checkbox" id="hide-inaccessible"> <strong>Hide inaccessible color combinations.</strong>
</label>
{{ $textcolors := .Site.Data.color-contrast.colorgroup.text.colors }}
{{ $bgcolors := .Site.Data.color-contrast.colorgroup.bg.colors }}

<div class="table-responsive">
  <table class="table table-bordered">
    <tr>
      <th></th>
      {{ range $textcolors }}  
      <th class="text-nowrap">.text-{{ .color }}</th>
      {{ end }}
    </tr>
  {{ range $bg := $bgcolors }}
    <tr>
      <th class="text-nowrap">.bg-{{ $bg.color }}</th>
      {{ range $text := $textcolors }}
        {{ $cc := false }}
        {{ range $contrast := $bg.contrast }}
          {{ if and (not $cc) (eq $contrast.accessible $text.color) }}
            {{ $cc = true }}
          {{ end }}
        {{ end }}
      <td class="bg-{{ $bg.color }} text-center align-items-center">
        <span class="text-{{ $text.color }}{{ if (not $cc) }} inaccessible{{ end }}">.text-{{ $text.color }}</span>
      </td>
      {{ end }}
    </tr>
  {{ end }}
  </table>
</div>

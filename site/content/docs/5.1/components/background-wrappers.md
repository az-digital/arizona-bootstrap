---
layout: docs
title: Background Wrappers
description: Make your content span the full-width of the screen, and add an optional background color or background pattern.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

Background wrappers span the full-width of the screen and help to break up content and add variety to your page layout. You can use any [color and background helper class]({{< docsref "/helpers/color-background" >}}) (e.g., `.text-bg-blue`) in combination with a background pattern option (e.g., `bg-triangles-top-left`) on your background wrapper. Ensure that you maintain proper color contrast and accessibility. {{< ourname >}} provides a [color contrast tool]({{< docsref "/getting-started/color-contrast" >}}) that shows you which branded color combinations are accessible.

## Live Demo

Click on the background color options below to see a live preview of what the background wrapper looks like in your selected color and/or background pattern.

<div class="row mb-3">
  {{< wrapperdemo.inline >}}
  {{ range (index $.Site.Data "colors") }}
  <div class="col-6 col-md-4 col-lg-3 col-xl-2 mt-3">
    <button id="background-wrapper-btn-{{ .name }}" data-bgcolor="{{ .name }}" class="btn d-block w-100 px-2 btn-background-wrapper-demo {{ if eq .name "chili" }}btn-red{{ else if eq .name "blue" }}btn-blue{{ else }}text-bg-{{ .name }}{{ end }}">{{ .name | title }}</button>
  </div>
  {{ end }}
  {{< /wrapperdemo.inline >}}
</div>
<div class="row mb-4 pt-0 pb-4 pt-xl-4 bg-gray-100 bg-triangles-centered">
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-top-left" data-triangles="triangles-top-left" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Triangles Top Left</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-centered" data-triangles="triangles-centered" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Triangles Centered</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-top-right" data-triangles="triangles-top-right" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Triangles Top Right</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-trilines" data-triangles="trilines" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Trilines</button>
  </div>
</div>

<p class="mt-3"><span class="badge badge-az-experimental mt-0">Arizona Bootstrap Experimental Feature</span></p>

<div class="row mb-4 pt-0 pb-4 pt-xl-4 bg-gray-100">
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-sky-left" data-triangles="monsoon-sky-left" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Sky Left</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-sky-right" data-triangles="monsoon-sky-right" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Sky Right</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-white-left" data-triangles="monsoon-white-left" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon White Left</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-white-right" data-triangles="monsoon-white-right" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon White Right</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-warm-gray-left" data-triangles="monsoon-warm-gray-left" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Warm Gray Left</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-warm-gray-right" data-triangles="monsoon-warm-gray-right" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Warm Gray Right</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-cool-gray-left" data-triangles="monsoon-cool-gray-left" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Cool Gray Left</button>
  </div>
  <div class="col-6 col-lg-3 mt-3">
    <button id="monsoon-background-btn-cool-gray-right" data-triangles="monsoon-cool-gray-right" class="btn d-block w-100 btn-outline-blue btn-triangle-background-demo">Monsoon Cool Gray Right</button>
  </div>
</div>

{{< example >}}
<div class="background-wrapper" id="background-wrapper-live-demo">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3>Background Wrapper Example</h3>
        <p>A background wrapper can use any combination of the color and background helper classes and the background pattern options. However, you must ensure your selection ensures sufficient color contrast and proper accessibility standards.</p>
        <p><a href="https://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>
{{< /example >}}

<!-- Include JavaScript for Background Wrapper demo -->
<script defer src="{{< docsrefazold `/assets/js/background-wrapper-demo.js` >}}"></script>

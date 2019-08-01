---
layout: docs
title: Background Wrappers
description: Make your content span the full-width of the screen, and add an optional background color or background pattern.
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

## Examples

Background wrappers span the full-width of the screen and help to break up content and add variety to your page layout. You can use any [background color utility class]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/colors/#background-color) (e.g., `.bg-blue`) in combination with a background pattern option (e.g., `bg-triangles-top-left`) on your background wrapper. Ensure you maintain proper color contrast and accessibility.

To use a background wrapper, you must close the current container, add your background wrapper, and then open the container again.

{% capture example %}
<div class="background-wrapper bg-cool-gray">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 sans text-midnight">Plain Background Wrapper</p>
        <p>A background wrapper using only a background-color.<br />View the accessibility standards followed at The University of Arizona</p>
        <p><a href="http://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>

<div class="background-wrapper bg-white bg-triangles-top-left">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 sans text-midnight">Triangles Top Left</p>
        <p>A background wrapper using a triangle pattern on the top left.<br />View the accessibility standards followed at The University of Arizona</p>
        <p><a href="http://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>

<div class="background-wrapper bg-cool-gray bg-triangles-top-right">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 sans text-midnight">Triangles Top Right</p>
        <p>A background wrapper using a triangle pattern on the top right.<br />View the accessibility standards followed at The University of Arizona</p>
        <p><a href="http://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>

<div class="background-wrapper bg-white bg-triangles-centered">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 sans text-midnight">Triangles Centered</p>
        <p>A background wrapper using a triangle pattern in the center.<br />View the accessibility standards followed at The University of Arizona</p>
        <p><a href="http://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>
{% endcapture %}
{% include example.html content=example %}



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


Background wrappers span the full-width of the screen and help to break up content and add variety to your page layout. You can use any [background color utility class]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/colors/#background-color) (e.g., `.bg-blue`) in combination with a background pattern option (e.g., `bg-triangles-top-left`) on your background wrapper. Ensure you maintain proper color contrast and accessibility. {{ site.title }} provides a [color contrast tool]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/color-contrast) that shows you which Branded color combinations are accessible.

{% highlight html %}
<div class="container">
  <div class="row">
    <div class="col-12">
      ...
    </div> <!-- close column -->
  </div> <!-- close row -->
</div> <!-- close container -->
<div class="background-wrapper">
  <div class="container">
    ...
  </div>
</div><!-- close background wrapper -->
{% endhighlight %}

## Live Demo

Click on the background color options below to see a live preview of what the background wrapper looks like in your selected color and/or background pattern.

<div class="row mb-3">
{% for color in site.data.colors %}
  <div class="col-6 col-md-4 col-lg-3 col-xl-2 mt-3">
    <button id="background-wrapper-btn-{{ color.name }}" data-bgcolor="{{ color.name }}" class="btn btn-block btn-background-wrapper-demo bg-{{ color.name }}">{{ color.name | capitalize }}</button>
  </div>
{% endfor %}
</div>
<div class="row mb-5 pt-0 pb-4 pt-xl-4 bg-gray-100 bg-triangles-centered">
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-top-left" data-triangles="triangles-top-left" class="btn btn-block btn-outline-blue btn-triangle-background-demo">Triangles Top Left</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-centered" data-triangles="triangles-centered" class="btn btn-block btn-outline-blue btn-triangle-background-demo">Triangles Centered</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-top-right" data-triangles="triangles-top-right" class="btn btn-block btn-outline-blue btn-triangle-background-demo">Triangles Top Right</button>
  </div>
  <div class="col-6 col-lg-4 col-xl-3 mt-3 mt-xl-0">
    <button id="triangles-background-btn-trilines" data-triangles="trilines" class="btn btn-block btn-outline-blue btn-triangle-background-demo">Trilines</button>
  </div>
</div>

{% capture example %}
<div class="background-wrapper" id="background-wrapper-live-demo">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3>Background Wrapper Example</h3>
        <p>A background wrapper can use any combination of the background color utility classes and the background pattern options. However, you must ensure your selection ensures sufficient color contrast and proper accessibility standards.</p>
        <p><a href="http://itaccessibility.arizona.edu/guidelines/standards" class="btn btn-blue" target="_blank">Accessibility Standards</a></p>
      </div>
    </div>
  </div>
</div>
{% endcapture %}
{% include example.html content=example %}


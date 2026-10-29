---
layout: docs
title: Hover
description: Documentation and examples for common hover utilities to control hover effects.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Utility</span>
group: utilities
toc: true
---

## Text Decoration

Add a text underline on hover with the `.hover` class on the parent element and the `.hover-text-underline` class on the target child element.

{{< example >}}
<div class="card hover" style="width: 18rem;">
  <div class="card-body">
    <h3 class="card-title mb-3 h5 fw-bold hover-text-underline">Card with Hover Underline</h3>
    <div class="card-text">
      <p>This card's title should have an underline applied when the card receives hover or focus.</p>
    </div>
    <div class="mt-auto">
      <a href="#top" class="stretched-link">This is a link</a>
    </div>
  </div>
</div>
{{< /example >}}

## Image Zoom

Add an image zoom-in effect on hover with the `.hover` class on the parent element and the `.hover-img-zoom-in` class on the target child image element.

In this example, the `.overflow-hidden` class is added to a `<div>` element surrounding the image in order to contain the image when the hover effect is applied. [Learn more about the overflow utility classes]({{< docsref "/utilities/overflow" >}}).

{{< example >}}
<div class="card hover" style="width: 18rem;">
  <div class="rounded-top position-relative overflow-hidden">
    <img class="card-img-top img-fluid hover-img-zoom-in" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling" title="">
  </div>
  <div class="card-body">
    <h3 class="card-title mb-3 h5 fw-bold">Card with Image Zoom</h3>
    <div class="card-text">
      <p>This card's image should zoom in when the card receives hover or focus.</p>
    </div>
    <div class="mt-auto">
      <a href="#top" class="stretched-link">This is a link</a>
    </div>
  </div>
</div>
{{< /example >}}

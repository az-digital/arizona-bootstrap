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
    <h2 class="card-title mt-0 h4 hover-text-underline">This is a card title</h2>
    <p>This card's title should have an underline applied when it receives hover or focus anywhere on the card.</p>
    <a class="stretched-link" href="#">This is a link</a>
  </div>
</div>
{{< /example >}}

## Image Zoom

Add an image zoom-in effect on hover with the `.hover` class on the parent element and the `.hover-img-zoom-in` class on the target child image element.

In this example, the `.overflow-hidden` class is added to a `<div>` element surrounding the image in order to contain the image when the hover effect is applied. [Learn more about the overflow utility classes]({{< docsref "/utilities/overflow" >}}).

{{< example >}}
<div class="card text-bg-warm-gray hover" style="width: 18rem;">
  <div class="overflow-hidden">
    <img class="card-img-top hover-img-zoom-in" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" alt="University of Arizona Spring Fling" title="">
  </div>
  <div class="card-body">
    <h2 class="card-title mt-0 h4 hover-text-underline">This is a card title</h2>
    <p>This card's title should have an underline applied when it receives hover or focus anywhere on the card.</p>
    <a class="stretched-link" href="#">This is a link</a>
  </div>
</div>
{{< /example >}}

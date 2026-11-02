---
layout: docs
title: Images
description: Documentation and examples for opting images into responsive behavior (so they never become wider than their parent) and add lightweight styles to them—all via classes.
group: content
toc: true
---

## Responsive images

Images in Bootstrap are made responsive with `.img-fluid`. This applies `max-width: 100%;` and `height: auto;` to the image so that it scales with the parent width.

{{< example >}}
<img class="img-fluid" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}

## Rounded corners

<span class="badge badge-az-custom">Custom Arizona Bootstrap Styling</span>

Arizona Bootstrap rounds image corners by default using upstream Bootstrap's [border-radius() mixin]({{< docsref "/utilities/borders/#sass-mixins" >}}). The default rounded corners are not applied to images with a [card image class]({{< docsref "/components/card/#images-1" >}}) (`.card-img`, `.card-img-top`, or `.card-img-bottom`).

{{< example >}}
<img class="img-fluid" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}

Use `.rounded-0` from the [border radius utilities]({{< docsref "/utilities/borders/#sizes" >}}) to override the default rounded corners and restore sharp corners on an image.

{{< example >}}
<img class="img-fluid rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}


## Image thumbnails

In addition to our [border-radius utilities]({{< docsref "/utilities/borders" >}}), you can use `.img-thumbnail` to give an image a rounded 1px border appearance.

{{< example >}}
<img class="img-thumbnail" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}

## Aligning images

Align images with the [helper float classes]({{< docsref "/utilities/float" >}}) or [text alignment classes]({{< docsref "/utilities/text#text-alignment" >}}). `block`-level images can be centered using [the `.mx-auto` margin utility class]({{< docsref "/utilities/spacing#horizontal-centering" >}}).

{{< example >}}
<img width="200" height="200" class="float-start" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}}" alt="University of Arizona Spring Fling">
<img width="200" height="200" class="float-end" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}


{{< example >}}
<img width="200" height="200" class="mx-auto d-block" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}}" alt="University of Arizona Spring Fling">
{{< /example >}}

{{< example >}}
<div class="text-center">
  <img width="200" height="200" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}}" alt="University of Arizona Spring Fling">
</div>
{{< /example >}}


## Picture

If you are using the `<picture>` element to specify multiple `<source>` elements for a specific `<img>`, make sure to add the `.img-*` classes to the `<img>` and not to the `<picture>` tag.

```html
<picture>
  <source srcset="..." type="image/svg+xml">
  <img src="..." class="img-fluid img-thumbnail" alt="...">
</picture>
```

## CSS

### Sass variables

Variables are available for image thumbnails.

{{< scss-docs name="thumbnail-variables" file="scss/_variables.scss" >}}

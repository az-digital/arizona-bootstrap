---
layout: docs
title: Accordion
description: Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.
group: components
aliases:
  - "/components/"
  - "/docs/5.1/components/"
toc: true
---

## How it works

The accordion uses [collapse]({{< docsref "/components/collapse" >}}) internally to make it collapsible.

{{< callout info >}}
{{< partial "callouts/info-prefersreducedmotion.md" >}}
{{< /callout >}}

## Example

Click the accordions below to expand/collapse the accordion content.

To render an accordion that's expanded by default:
- add the `.show` class on the `.accordion-collapse` element.
- drop the `.collapsed` class from the `.accordion-button` element and set its `aria-expanded` attribute to `true`.

{{< example >}}
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
{{< /example >}}

### Flush

Add `.accordion-flush` to remove some borders and rounded corners to render accordions edge-to-edge with their parent container.

{{< example class="bg-body-secondary" >}}
<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div>
{{< /example >}}

### Accordion Anchor links
Anchor links allow users to click to copy direct links to accordions. The page will auto-scroll to the referenced accordion and open it. This is useful for pages with many accordions such as FAQs.

{{< example >}}
<div class="accordion" id="accordionAnchorExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="collapseAnchor1-link">
      <a onclick="copyAnchor(this, event)" class="position-absolute ms-2 me-2 accordion-anchor z-1 pt-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Copy Accordion Link" href="#collapseAnchor1-link"><span class="material-symbols-rounded" style="font-size:32px;">link</span></a>
      <button class="accordion-button z-0 ps-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnchor1" aria-expanded="true" aria-controls="collapseAnchor1">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseAnchor1" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="collapseAnchor2-link">
      <a onclick="copyAnchor(this, event)" class="position-absolute ms-2 me-2 accordion-anchor z-1 pt-2" href="#collapseAnchor2-link"><span class="material-symbols-rounded" style="font-size:32px;">link</span></a>
      <button class="accordion-button collapsed z-0 ps-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnchor2" aria-expanded="false" aria-controls="collapseAnchor2">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseAnchor2" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="collapseAnchor3-link">
      <a onclick="copyAnchor(this, event)" class="position-absolute ms-2 me-2 accordion-anchor z-1 pt-2" href="#collapseAnchor3-link"><span class="material-symbols-rounded" style="font-size:32px;">link</span></a>
      <button class="accordion-button collapsed z-0 ps-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnchor3" aria-expanded="false" aria-controls="collapseAnchor3">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseAnchor3" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
{{< /example >}}

### Always open

Omit the `data-bs-parent` attribute on each `.accordion-collapse` to make accordion items stay open when another item is opened.

{{< example >}}
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
{{< /example >}}

## Accessibility

Please read the [collapse accessibility section]({{< docsref "/components/collapse#accessibility" >}}) for more information.

## CSS

### Variables

{{< added-in "5.2.0" >}}

As part of Bootstrap's evolving CSS variables approach, accordions now use local CSS variables on `.accordion` for enhanced real-time customization. Values for the CSS variables are set via Sass, so Sass customization is still supported, too.

{{< scss-docs name="accordion-css-vars" file="scss/_accordion.scss" >}}

### Sass variables

{{< scss-docs name="accordion-variables" file="scss/_variables.scss" >}}

<!-- Include JavaScript for Background Wrapper demo -->
<script defer src="{{< docsrefazold `/assets/js/accordion.js` >}}"></script>
---
layout: docs
title: Cards
description: Bootstrap's cards provide a flexible and extensible content container with multiple variants and options.
group: components
toc: true
---

## About

A **card** is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. If you're familiar with Bootstrap 3, cards replace our old panels, wells, and thumbnails. Similar functionality to those components is available as modifier classes for cards.

## Example

Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no `margin` by default, so use [spacing utilities]({{< docsref "/utilities/spacing" >}}) as needed.

Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they'll naturally fill the full width of its parent element. This is easily customized with our various [sizing options](#sizing).

{{< example >}}
<div class="card" style="width: 18rem;">
  {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

## Content Types

Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what's supported.

### Body

The building block of a card is the `.card-body`. Use it whenever you need a padded section within a card.

{{< example >}}
<div class="card">
  <div class="card-body">
    This is some text within a card body.
  </div>
</div>
{{< /example >}}

### Titles, Text, and Links

Card titles are used by adding `.card-title` to a `<h*>` tag. In the same way, links are added and placed next to each other by adding `.card-link` to an `<a>` tag.

Subtitles are used by adding a `.card-subtitle` to a `<h*>` tag. If the `.card-title` and the `.card-subtitle` items are placed in a `.card-body` item, the card title and subtitle are aligned nicely.

{{< example >}}
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
{{< /example >}}

### Images

`.card-img-top` places an image to the top of the card. With `.card-text`, text can be added to the card. Text within `.card-text` can also be styled with the standard HTML tags.

{{< example >}}
<div class="card" style="width: 18rem;">
  {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{{< /example >}}

### List Groups

Create lists of content in a card with a flush list group.

{{< example >}}
<div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
</div>
{{< /example >}}

{{< example >}}
<div class="card" style="width: 18rem;">
  <div class="card-header">
    Featured
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
</div>
{{< /example >}}

### Kitchen Sink

Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.

{{< example >}}
<div class="card" style="width: 18rem;">
  {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
{{< /example >}}

### Header and Footer

Add an optional header and/or footer within a card.

{{< example >}}
<div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

Card headers can be styled by adding `.card-header` to `<h*>` elements.

{{< example >}}
<div class="card">
  <h5 class="card-header">Featured</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div class="card">
  <div class="card-header">
    Quote
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
{{< /example >}}

## Sizing

Cards assume no specific `width` to start, so they'll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.

### Using Grid Markup

Using the grid, wrap cards in columns and rows as needed.

{{< example >}}
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-red">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-red">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
{{< /example >}}

### Using Utilities

Use our handful of [available sizing utilities]({{< docsref "/utilities/sizing" >}}) to quickly set a card's width.

{{< example >}}
<div class="card w-75">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Button</a>
  </div>
</div>

<div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Button</a>
  </div>
</div>
{{< /example >}}

### Using Custom CSS

Use custom CSS in your stylesheets or as inline styles to set a width.

{{< example >}}
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

## Text Alignment

You can quickly change the text alignment of any card—in its entirety or specific parts—with our [text align classes]({{< docsref "/utilities/text#text-alignment" >}}).

{{< example >}}
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>

<div class="card text-center" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>

<div class="card text-right" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

## Navigation

Add some navigation to a card's header (or block) with Bootstrap's [nav components]({{< docsref "/components/navs" >}}).

{{< example >}}
<div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-pills card-header-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-red">Go somewhere</a>
  </div>
</div>
{{< /example >}}

## Images

Cards include a few options for working with images. Choose from appending "image caps" at either end of a card, overlaying images with card content, or simply embedding the image in a card.

### Image Caps

Similar to headers and footers, cards can include top and bottom "image caps"—images at the top or bottom of a card.

<div class="bd-example">
  <div class="card mb-3">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
    {{< placeholder width="100%" height="180" class="card-img-bottom" text="Image cap" >}}
  </div>
</div>

```html
<div class="card mb-3">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <img src="..." class="card-img-bottom" alt="...">
</div>
```

### Image Overlays

Turn an image into a card background and overlay your card's text. Depending on the image, you may or may not need additional styles or utilities.

{{< example >}}
<div class="card bg-dark text-white">
  {{< placeholder width="100%" height="270" class="bd-placeholder-img-lg card-img" text="Card image" >}}
  <div class="card-img-overlay">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text">Last updated 3 mins ago</p>
  </div>
</div>
{{< /example >}}

{{< callout info >}}
Note that content should not be larger than the height of the image. If content is larger than the image the content will be displayed outside the image.
{{< /callout >}}

## Horizontal

Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with `.no-gutters` and use `.col-md-*` classes to make the card horizontal at the `md` breakpoint. Further adjustments may be needed depending on your card content.

{{< example >}}
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      {{< placeholder width="100%" height="250" class="" text="Image" >}}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
{{< /example >}}

## Card Styles

Cards include various options for customizing their backgrounds, borders, and color.

### Background and color

Use [text and background utilities]({{< docsref "/utilities/colors" >}}) to change the appearance of a card.

{{< example >}}
{{< card.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="card bg-{{ .name }} mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">{{ .name | title }} card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{{- end -}}
{{< /card.inline >}}
{{< /example >}}

{{< callout warning >}}
{{< partial "callout-warning-color-assistive-technologies.md" >}}
{{< /callout >}}

### Border

Use [border utilities]({{< docsref "/utilities/borders" >}}) to change just the `border-color` of a card. Note that you can put `.text-{color}` classes on the parent `.card` or a subset of the card's contents as shown below.

{{< example >}}
{{< card.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<div class="card border-{{ .name }} mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body{{ if not (eq .name "light") }} text-{{ .name }}{{ end }}">
    <h5 class="card-title">{{ .name | title }} card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
{{- end -}}
{{< /card.inline >}}
{{< /example >}}

### Borderless

Borderless cards are cards that have their border removed. You can use any of the available utility classes to style your card and its text.

{{< example >}}
<div class="card card-borderless" style="max-width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Borderless Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a class="card-link" href="#">Link to Content</a>
  </div>
</div>
<div class="card card-borderless" style="max-width: 18rem;">
  <div class="card-body">
    <h5 class="card-title text-midnight">Borderless Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a class="card-link" href="#">Link to Content</a>
  </div>
</div>
<div class="card card-borderless bg-light" style="max-width: 18rem;">
  <div class="card-body">
    <h5 class="card-title text-midnight">Borderless Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a class="card-link" href="#">Link to Content</a>
  </div>
</div>
{{< /example >}}

### Landing Grid

The landing grid card adds a Brand colored box-shadow on the right and bottom sides of the card, while maintaining a border on the top and left sides. Landing grid cards are available in the following Brand colors:

<ul>
  <li>Sky (default)</li>
  <li>Oasis</li>
  <li>Azurite</li>
  <li>Blue</li>
  <li>Midnight</li>
  <li>Leaf</li>
  <li>River</li>
  <li>Bloom</li>
  <li>Red</li>
  <li>Chili</li>
  <li>Ash</li>
  <li>Silver</li>
</ul>

{{< example >}}
<div class="card-deck">
  <div class="card card-landing-grid">
    <div class="card-body">
      <h3 class="text-uppercase">Freshmen</h3>
      <div class="card-text">
        <p class="mb-0">You are an incoming freshman if you will soon graduate from high school, you have graduated, or you have a GED and have not enrolled in college since graduating.</p>
      </div>
    </div>
    <div class="card-body landing-btn-container d-flex flex-column justify-content-end align-items-start">
      <a href="#">How to Apply</a>
    </div>
  </div>
  <div class="card card-landing-grid">
    <div class="card-body">
      <h3 class="text-uppercase">Transfer</h3>
      <div class="card-text">
        <p class="mb-0">You are a transfer student if you have attended other colleges/universities and have completed 12 or more units since graduating from high school. In this example, there is an external link class to demonstrate that option.</p>
      </div>
    </div>
    <div class="card-body landing-btn-container d-flex flex-column justify-content-end align-items-start">  
      <a href="#">How to Apply</a>
    </div>
  </div>
</div>

<div class="card-deck mt-4">
  <div class="card card-landing-grid landing-azurite">
    <div class="card-body">
      <h3 class="text-uppercase">Freshmen</h3>
      <div class="card-text">
        <p class="mb-0">You are an incoming freshman if you will soon graduate from high school, you have graduated, or you have a GED and have not enrolled in college since graduating.</p>
      </div>
    </div>
    <div class="card-body landing-btn-container d-flex flex-column justify-content-end align-items-start">
      <a href="#">How to Apply</a>
    </div>
  </div>
  <div class="card card-landing-grid landing-azurite">
    <div class="card-body">
      <h3 class="text-uppercase">Transfer</h3>
      <div class="card-text">
        <p class="mb-0">You are a transfer student if you have attended other colleges/universities and have completed 12 or more units since graduating from high school. In this example, there is an external link class to demonstrate that option.</p>
      </div>
    </div>
    <div class="card-body landing-btn-container d-flex flex-column justify-content-end align-items-start">  
      <a href="#">How to Apply</a>
    </div>
  </div>
</div>
{{< /example >}}

### Mixins Utilities

You can also change the borders on the card header and footer as needed, and even remove their `background-color` with `.bg-transparent`.

{{< example >}}
<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header bg-transparent border-success">Header</div>
  <div class="card-body text-success">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <div class="card-footer bg-transparent border-success">Footer</div>
</div>
{{< /example >}}

## Card Layout

In addition to styling the content within cards, Bootstrap includes a few options for laying out series of cards. For the time being, **these layout options are not yet responsive**.

### Card Groups

Use card groups to render cards as a single, attached element with equal width and height columns. Card groups use `display: flex;` to achieve their uniform sizing.

{{< example >}}
<div class="card-group">
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
{{< /example >}}

When using card groups with footers, their content will automatically line up.

{{< example >}}
<div class="card-group">
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
</div>
{{< /example >}}

### Card Decks

Need a set of equal width and height cards that aren't attached to one another? Use card decks.

{{< example >}}
<div class="card-deck">
  <div class="card">
    {{< placeholder width="100%" height="200" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="200" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="200" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
{{< /example >}}

Just like with card groups, card footers in decks will automatically line up.

{{< example >}}
<div class="card-deck">
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="180" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
</div>
{{< /example >}}

### Clickable Card Decks

You can apply a clickable card style/functionality to all of the cards in your deck. Clickable card decks are useful for landing pages or pages where you have a series of link options that send you to other pages/sites.

Clickable cards leverage the [stretched link]({{< docsref "/utilities/stretched-link" >}}) utility class, as well as accessible attributes to improve screen reader experience. Each of the available [card styles](#card-styles) has an associated clickable card style that will be automatically applied.

Adding the clickable card style removes the card link in favor of a visual arrow indicator to make it more apparent that the entire card is clickable, rather than just the button/link text.

<div class="alert alert-info">
  <p class="my-0 py-2 h5 text-blue">The example below is filled with demo "library" content for the DRC to test with.</p>
</div>

{{< example >}}
<div class="card-deck clickable-card-deck">
  <div class="card">
    <div class="card-body">
      <h3>Main Library</h3>
      <p class="card-text">The go-to place to study, create, collaborate and get things done. The Main Library is open almost 24/7, offering flexible spaces, friendly experts, a wide range of technology and in-depth research collections that encourage new ideas and help to build new connections.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="Visit the Main Library's Website" aria-label="Visit the Main Library's website" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3>Health Sciences Library</h3>
      <p class="card-text">The primary source of knowledge-based health information in Arizona. The Health Sciences Library provides access to the latest published research and gives scientists and healthcare providers tools to improve the quality of life for people everywhere.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="Visit Health Sciences library's website" aria-label="Visit Health Sciences library's website" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3>Fine Arts Library</h3>
      <p class="card-text">A north-campus haven for students and faculty, the Fine Arts Library houses an extensive music collection including scores, sheet music and vinyl LPs, as well as a theater collection of plays and films and architecture materials.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="Visit the Fine Arts library's website" aria-label="Visit the Fine Arts library's website" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>
{{< /example >}}


#### Best Practices

When building the HTML for your clickable card deck cards, ensure you are including the `title` attribute on your anchor `<a>` tag. This will ensure that users using assistive devices (like screenreaders) will receive clear details about the link. The `title` attribute is replacing the standard anchor text in this case, as the anchor text is the double arrow icon.

```html
<a href="https://arizona.edu/" title="The University of Arizona" aria-label="The University of Arizona">
  <span class="material-icons-sharp">double_arrow</span>
</a>
```


#### Background Color Example

Just as with the [background and color](#background-and-color) card style, you can utilize the clickable card deck with background colors utility classes on your individual cards. On hover/focus, cards will receive a darkened version of their applied background color.

<div class="card-deck clickable-card-deck">
  <div class="card bg-blue">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card bg-azurite">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card bg-river">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>

<div class="card-deck clickable-card-deck mt-4">
  <div class="card bg-gray-600">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card bg-gray-400">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card bg-gray-200">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>


#### Border Example

<div class="card-deck clickable-card-deck">
  <div class="card border-success mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card border-info mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card border-dark mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>

#### Borderless Example

<div class="card-deck clickable-card-deck">
  <div class="card card-borderless mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card card-borderless mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card card-borderless mb-3">
    <div class="card-body">
      <h3 class="card-title">A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>

#### Landing Grid Example

Just as with the [landing grid](#landing-grid) card style, you can utilize the clickable card deck with available landing grid color options. The arrow on the clickable card will inherit the same color as your card.

<div class="card-deck clickable-card-deck">
  <div class="card card-landing-grid">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card card-landing-grid landing-azurite">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
  <div class="card card-landing-grid landing-river">
    <div class="card-body">
      <h3>A Sample Card Title</h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-body clickable-card-btn-container">
      <a title="A sample card title" href="#" class="clickable-card-arrow stretched-link"><span class="material-icons-sharp display-3">double_arrow</span></a>
    </div>
  </div>
</div>



### Card Columns

Cards can be organized into [Masonry](https://masonry.desandro.com/)-like columns with just CSS by wrapping them in `.card-columns`. Cards are built with CSS `column` properties instead of flexbox for easier alignment. Cards are ordered from top to bottom and left to right.

**Heads up!** Your mileage with card columns may vary. To prevent cards breaking across columns, we must set them to `display: inline-block` as `column-break-inside: avoid` isn't a bulletproof solution yet.

{{< example >}}
<div class="card-columns">
  <div class="card">
    {{< placeholder width="100%" height="160" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title that wraps to a new line</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
  <div class="card p-3">
    <blockquote class="blockquote mb-0 card-body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">
        <small class="text-muted">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </small>
      </footer>
    </blockquote>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="160" class="card-img-top" text="Image cap" >}}
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card bg-red text-white text-center p-3">
    <blockquote class="blockquote mb-0">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
      <footer class="blockquote-footer text-white">
        <small>
          Someone famous in <cite title="Source Title">Source Title</cite>
        </small>
      </footer>
    </blockquote>
  </div>
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has a regular title and short paragraphy of text below it.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    {{< placeholder width="100%" height="260" class="card-img" text="Card image" >}}
  </div>
  <div class="card p-3 text-right">
    <blockquote class="blockquote mb-0">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">
        <small class="text-muted">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </small>
      </footer>
    </blockquote>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
{{< /example >}}

Card columns can also be extended and customized with some additional code. Shown below is an extension of the `.card-columns` class using the same CSS we use—CSS columns— to generate a set of responsive tiers for changing the number of columns.

```scss
.card-columns {
  @include media-breakpoint-only(lg) {
    column-count: 4;
  }
  @include media-breakpoint-only(xl) {
    column-count: 5;
  }
}
```

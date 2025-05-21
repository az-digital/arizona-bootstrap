---
layout: docs
title: Icons
description: Guidance and suggestions for using icon libraries with Arizona Bootstrap.
group: icons
redirect_from:
  - "/icons/"
  - "/docs/5.0/icons/"
toc: true
---

<div class="alert alert-warning" role="alert">
  <p class="h4 alert-heading">Heads Up!</p>
  If you're using Arizona Bootstrap, Arizona Icons and/or Material Design Rounded icons will still need
  to be added to your project if you would like to use them.
</div>

These icons have been approved to use within Arizona web assets like Arizona
Quickstart, and Arizona Bootstrap.

- [Arizona Icons](https://github.com/az-digital/az-icons) (Arizona branded icons)
- [Google Material Icons (Rounded)](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Icons)

## Arizona Icons Implementation

Include a reference to the Arizona Icons' CDN to your project in order to use the font icons:

```html
<link href="https://cdn.digital.arizona.edu/lib/az-icons/main/az-icons-styles.css" rel="stylesheet">
```

*(Latest vs. Pinned releases coming soon)*

In general, developers should use the main branch version of the icons for development work, and then switch to a pinned version when development is done:

- Latest is good for when you need to use icons that have been newly released, and you are following the az-icons project and know what has changed and how those changes will affect your site.
- Pinned versions are good for any project that wants to be sure to _not_ update az-icons if you don't purposefully change it.

[Refer to Arizona Icons GitHub repository](https://github.com/az-digital/az-icons) for more information and resources.

<div class="row">
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-arizona"></i></p>
      <p class="small"><code class="text-blue">.az-icon-arizona</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-award"></i></p>
      <p class="small"><code class="text-blue">.az-icon-award</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-cost"></i></p>
      <p class="small"><code class="text-blue">.az-icon-cost</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-facebook"></i></p>
      <p class="small"><code class="text-blue">.az-icon-facebook</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-financial-aid"></i></p>
      <p class="small"><code class="text-blue">.az-icon-financial-aid</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-grad-cap"></i></p>
      <p class="small"><code class="text-blue">.az-icon-grad-cap</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-instagram"></i></p>
      <p class="small"><code class="text-blue">.az-icon-instagram</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-linkedin"></i></p>
      <p class="small"><code class="text-blue">.az-icon-linkedin</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-majors-and-degrees"></i></p>
      <p class="small"><code class="text-blue">.az-icon-majors-and-degrees</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-map-marker"></i></p>
      <p class="small"><code class="text-blue">.az-icon-map-marker</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-pinterest"></i></p>
      <p class="small"><code class="text-blue">.az-icon-pinterest</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-scholarship"></i></p>
      <p class="small"><code class="text-blue">.az-icon-scholarship</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-sign-post"></i></p>
      <p class="small"><code class="text-blue">.az-icon-sign-post</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-spotify"></i></p>
      <p class="small"><code class="text-blue">.az-icon-spotify</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-spring-fling"></i></p>
      <p class="small"><code class="text-blue">.az-icon-spring-fling</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-tiktok"></i></p>
      <p class="small"><code class="text-blue">.az-icon-tiktok</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-twitter"></i></p>
      <p class="small"><code class="text-blue">.az-icon-twitter</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-x-twitter"></i></p>
      <p class="small"><code class="text-blue">.az-icon-x-twitter</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-wildcat"></i></p>
      <p class="small"><code class="text-blue">.az-icon-wildcat</code></p>
    </div>
  </div>
  <div class="col-6 col-md-3 col-sm-1 col-lg-3">
    <div class="text-center mb-4">
      <p class="fs-2 mb-2"><i class="az-icon-youtube"></i></p>
      <p class="small"><code class="text-blue">.az-icon-youtube</code></p>
    </div>
  </div>
</div>

## Material Icons Implementation

Include the Material Icons' stylesheet in your project in order to use the font icons. [Refer to Material Icons docs](https://developers.google.com/fonts/docs/material_icons#icon_font_for_the_web) for more information.

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons+Round" rel="stylesheet">
```


Google's Material Icons can be implemented just like text, in that they can combined with any utility class available to text.

Your `span` should include the `.material-icons-round` class along with any utility classes you want to include. The text inside the `span` should be the ID/name of the icon you want to use. [Browse the font icon library (rounded style)](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Icons) to find the ID of your desired icon.

{{< example >}}
<span class="material-icons-round text-sky display-4">accessible_forward</span>
<span class="material-icons-round text-azurite display-3">accessible_forward</span>
<span class="material-icons-round text-blue display-1">accessible_forward</span>
{{< /example >}}

---
layout: docs
title: Deprecated
description: Styles and classes available in UA Bootstrap (Bootstrap 3) that have been deprecated, replaced, or removed in Arizona Bootstrap (Bootstrap 4).
group: deprecated
redirect_from:
  - "/deprecated/"
  - "/docs/4.3/deprecated/"
toc: true
---

## Overview

Although backwards compatibility is included for some components and utilities available in UA Bootstrap, it is highly recommended that you utilize the new classes available in {{< ourname >}}. They are simply included here to lessen the burden on site builders for migrating from Drupal 7 sites using UA Bootstrap to Drupal 8 sites using {{< ourname >}}. All items that are included with backwards compatibility are built by extending the classes and styles available in {{< ourname >}}. Any items that were marked as "deprecated" in UA Bootstrap do not include backwards compatibility; these items are listed in the [Removed Utilities]({{< docsref "/deprecated#removed-utility-classes" >}}) and [Removed Components]({{< docsref "/deprecated#removed-components" >}}) sections.

## Backwards Compatible Components

UA Bootstrap utilized components that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of available classes. They have been included with backwards compatibility in Arizona Bootstrap to avoid breaking changes.

### Background Wrappers

In UA Bootstrap, the following background wrapper patterns were marked as deprecated. They are also deprecated in {{< ourname >}} and have been removed from the docs. Background patterns for triangles top-left, top-right, centered, and tri-lines are still available.

<div class="bd-example">
  <div class="background-wrapper bg-triangles-fade bg-silver-tint mb-5">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 mb-0">Triangles Fade Background Wrapper</p>
      </div>
    </div>
  </div>
  <div class="background-wrapper bg-catalinas-abstract mb-5">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 mb-0">Catalinas Abstract Background Wrapper</p>
      </div>
    </div>
  </div>
  <div class="background-wrapper bg-triangles-mosaic bg-sky">
    <div class="row">
      <div class="col-12 text-center">
        <p class="h3 mb-0">Triangle Mosaic Background Wrapper</p>
      </div>
    </div>
  </div>
</div>


### Buttons

In {{< ourname >}}, Button classes have changed as follows:

#### Default, Primary, and Secondary

The classes `.btn-default` and `.btn-primary` available in UA Bootstrap have been deprecated in {{< ourname >}}. Similarly, `.btn-secondary` (which is available in base Bootstrap 4) has been removed from {{< ourname >}}. These classes have been deprecated in favor of more intuitive button classes (e.g., `.btn-red` and `.btn-blue`). However, `.btn-default` and `.btn-primary` are both backwards compatible, and all three classes can be extended using the [available button color classes]({{< docsref "/components/buttons#examples" >}}).

<div class="bd-example mb-3">
  <button type="button" class="btn btn-default">Default Button</button>
  <button type="button" class="btn btn-primary">Primary Button</button>
</div>

#### Hollow Buttons

Hollow buttons now use the `.btn-outline-*` class. These buttons are included with backwards compatibility and can be extended using the [available outline classes]({{< docsref "/components/buttons#outline-buttons" >}}). The `.btn-hollow` class (in practice identical to `.btn-hollow-default`) is not backwards compatible, needing replacement by `.btn-outline-red`.

The class `.btn-hollow-reverse` is included with backwards compatibility and can be extended using the `.btn-outline-white` class.

<div class="bd-example">
  <button type="button" class="btn btn-hollow-default">Default Hollow Button</button>
  <button type="button" class="btn btn-hollow-primary">Primary Hollow Button</button>
  <div class="p-3 bg-dark w-25">
    <button type="button" class="btn btn-hollow-reverse">Hollow Reverse Button</button>
  </div>
</div>

### Cards

In {{< ourname >}}, color-specific cards can be replicated by using the [background color utility classes]({{< docsref "/utilities/colors#background-color" >}}) and [border utility classes]({{< docsref "/utilities/borders" >}}).

<div class="bd-example">
  <div class="row">
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-primary">
        <div class="card-body">
          <p class="card-title">Primary Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-success">
        <div class="card-body">
          <p class="card-title">Success Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-info">
        <div class="card-body">
          <p class="card-title">Info Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-warning">
        <div class="card-body">
          <p class="card-title">Warning Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-danger">
        <div class="card-body">
          <p class="card-title">Danger Card</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-primary-outline">
        <div class="card-body">
          <p class="card-title">Primary Outline Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-success-outline">
        <div class="card-body">
          <p class="card-title">Success Outline Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-info-outline">
        <div class="card-body">
          <p class="card-title">Info Outline Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-warning-outline">
        <div class="card-body">
          <p class="card-title">Warning Outline Card</p>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-5 col-lg-2">
      <div class="card card-danger-outline">
        <div class="card-body">
          <p class="card-title">Danger Outline Card</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Labels

In {{< ourname >}}, labels have been replaced with the [Badge]({{< docsref "/components/badge" >}}) component. Labels can be replicated by extending the `.badge` styles.

<div class="bd-example">
  <span class="label label-default">Default</span>
  <span class="label label-primary">Primary</span>
  <span class="label label-success">Success</span>
  <span class="label label-info">Info</span>
  <span class="label label-warning">Warning</span>
  <span class="label label-danger">Danger</span>
  <span class="label label-muted">Muted</span>
</div>

### Panels

Panels have been extended using a combination of the `.card` class (and its child classes) and the `.bg-light` class. "Expanding" or "collapsible" panels, however, are still available as an {{< ourname >}} component: [Collapse]({{< docsref "/components/collapse" >}}).

<div class="bd-example">
  <div class="panel panel-default mb-2">
    <div class="panel-heading">
      <span class="h3 panel-title">Panel Default</span>
    </div>
    <div class="panel-body">
      <p>This is an example of how the backwards-compatible Panel looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
    </div>
  </div>
  <div class="panel panel-primary mb-2">
    <div class="panel-heading">
      <span class="h3 panel-title">Panel Primary</span>
    </div>
    <div class="panel-body">
      <p>This is an example of how the backwards-compatible Panel looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
    </div>
  </div>
  {{ range (index $.Site.Data "theme-colors") }}
  {{ if and (ne .name "light") (ne .name "dark") }}
  <div class="panel panel-{{ color.name }} mb-2">
    <div class="panel-heading">
      <span class="h3 panel-title">Panel {{ .name | title }}</span>
    </div>
    <div class="panel-body">
      <p>This is an example of how the backwards-compatible Panel looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
    </div>
  </div>
  {{ end }}
  {{ end }}
</div>


### Thumbnails

Thumbnails have been extended using a combination of the `.card` class and its child classes.

<div class="bd-example">
  <div class="row">
    <div class="col-12 col-md-4">
      <div class="thumbnail">
        <div class="caption">
          <p class="h3">Thumbnail Title</p>
          <p>This is an example of how the backwards-compatible Thumbnail looks in {{< ourname >}}. This component should not be used, but it included here for the sake of verifying its backwards-compatibility.</p>
          </div>
      </div>
    </div>
  </div>
</div>

### Wells

Wells have been extended using a combination of the `.card` class and the `.bg-light` class, and swapping out `.bg-light` for `.bg-white` for the hollow well.

<div class="bd-example">
  <div class="well">
    <p class="mb-0">This is an example of how the backwards-compatible <strong>well</strong> looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
  <div class="well well-hollow my-3">
    <p class="mb-0">This is an example of how the backwards-compatible <strong>hollow well</strong> looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
  <div class="well well-sm">
    <p class="mb-0">This is an example of how the backwards-compatible <strong>small well</strong> looks in {{< ourname >}}. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
</div>


## Backwards Compatible Utilities

UA Bootstrap contained utility classes that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of classes. They have been included with backwards compatibility in Arizona Bootstrap to avoid breaking changes.

### Background Color

<div class="bd-example">
  <p class="p-3 mb-2 bg-silver-tint">.bg-silver-tint</p>
</div>

### Column Offset

The syntax for column offsets has changed in {{< ourname >}}. Previously, you would offset columns using `.col-md-offset-2`. In {{< ourname >}}, you use `.offset-md-2`. Refer to [Offsetting Columns]({{< docsref "/layout/grid#offsetting-columns" >}}) for further details.

<div class="bd-example">
  <div class="container">
    <div class="row mb-2">
      <div class="bg-gray-200 p-2 col-md-4">.col-md-4</div>
      <div class="bg-gray-200 p-2 col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
    </div>
    <div class="row mb-2">
      <div class="bg-gray-200 p-2 col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
      <div class="bg-gray-200 p-2 col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
    </div>
    <div class="row">
      <div class="bg-gray-200 p-2 col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
    </div>
  </div>
</div>

### Pull Left/Right

The syntax for pulling content to the left/right has changed to `.float-left` and `.float-right`.

<div class="bd-example">
  <img class="pull-left me-3" width="350" alt="Example image 1" src="{{< docsrefazold `/assets/img/img_placeholders/gallery-img-2.jpg` >}}">
  <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non consectetur a erat nam. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Dui nunc mattis enim ut tellus elementum sagittis vitae. Id donec ultrices tincidunt arcu non sodales. Enim diam vulputate ut pharetra sit. Amet consectetur adipiscing elit ut aliquam purus sit amet. Malesuada nunc vel risus commodo viverra maecenas accumsan. Purus semper eget duis at tellus at urna. A condimentum vitae sapien pellentesque. Cras adipiscing enim eu turpis egestas. Consequat semper viverra nam libero justo laoreet sit amet. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Id venenatis a condimentum vitae. Ultricies integer quis auctor elit sed vulputate mi sit amet.</p>
  <img class="pull-right ms-3" width="350" alt="Example image 1" src="{{< docsrefazold `/assets/img/img_placeholders/gallery-img-2.jpg` >}}">
  <p class="lead">Turpis cursus in hac habitasse platea dictumst quisque. Tellus cras adipiscing enim eu. Lectus sit amet est placerat in egestas. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Sed euismod nisi porta lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Convallis posuere morbi leo urna molestie at elementum. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Vulputate dignissim suspendisse in est ante in nibh mauris.</p>
</div>

### Input Group Button

In {{< ourname >}}, what was previously `.input-group-btn` has been replaced by `.input-group-append`.

<div class="bd-example">
  <div class="input-group">
    <div class="input-group-btn">
      <button class="btn btn-red">{{- partial "icons/lightning.svg" (dict "width" "height" "class" "20" "20" "text-white") -}}</button>
      <button class="btn btn-blue">Action</button>
    </div>
    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon">
  </div>
</div>

### Margin Vertical Align

The margin align classes have been replaced in {{< ourname >}} with the [vertical align utility classes]({{< docsref "/utilities/vertical-align" >}}).

<div class="bd-example mb-4">
  <p class="bg-light">
    <span class="margin-align-top">top</span>
    <span class="margin-align-middle">middle</span>
    <span class="margin-align-bottom">bottom</span>
  </p>
  <div class="col-12 bg-light p-3">
    <p class="h3 margin-zero-top">Text align with zero margin-top</p>
  </div>
  <div class="col-12 mt-3 bg-light p-3">
    <p class="h3 margin-zero-bottom">Text align with zero margin-bottom</p>
  </div>
</div>

### Modal Dark

The `.modal-bg-dark` class can be extended by using the `.bg-dark` class.

<div class="bd-example bd-example-modal">
  <div class="modal modal-bg-dark" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-blue" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-red">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

### Navbar Default

The `.navbar-default` class can be extended by utilizing the `.navbar-light` class.

<div class="bd-example">
  <nav class="navbar navbar-expand-lg navbar-default">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Navbar</a>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control me-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-blue my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</div>

### Navbar Divider

The `.divider` and `.nav-divider` classes have been replaced by the `.dropdown-divider` class.

<div class="bd-example">
  <div class="dropdown">
    <a class="btn btn-blue dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown link
    </a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </div>
</div>


### Page Header

The `.page-header` class available in UA Bootstrap has been removed in {{< ourname >}}. You can replicate its effect by combining headers (e.g., h1, h2, h3, etc.) with [spacing utility classes]({{< docsref "/utilities/spacing" >}}).

<div class="bd-example">
  <p class="page-header"><span class="h1">Page Header</span></p>
</div>

### Fonts & Font Styles

You can replicate these effect by using the available [font weight and italic]({{< docsref "/utilities/text#font-weight-and-italics" >}}) and font family classes.

<div class="bd-example">
  <p class="bold">.bold</p>
</div>

### Responsive Text Alignment *-not Classes

UA Bootstrap included custom classes that utilized the *-not formatting. These classes are not included in {{< ourname >}}, but are backwards compatible and can be extended using a combination of the available [text alignment classes]({{< docsref "/utilities/text#text-alignment" >}}), which are also responsive using the usual grid breakpoints.

<div class="bd-example">
  <p class="p-3 mb-0 bg-gray-100 text-left-not-xs">.text-left-not-xs</p>
  <p class="p-3 mb-0 bg-light text-center-not-xs">.text-center-not-xs</p>
  <p class="p-3 mb-0 bg-gray-100 text-right-not-xs">.text-right-not-xs</p>
  <p class="p-3 mb-0 bg-light text-justify-not-xs">.text-justify-not-xs</p>
  <p class="p-3 mb-0 bg-gray-100 text-left-not-sm">.text-left-not-sm</p>
  <p class="p-3 mb-0 bg-light text-center-not-sm">.text-center-not-sm</p>
  <p class="p-3 mb-0 bg-gray-100 text-right-not-sm">.text-right-not-sm</p>
  <p class="p-3 mb-0 bg-light text-justify-not-sm">.text-justify-not-sm</p>
  <p class="p-3 mb-0 bg-gray-100 text-left-not-md">.text-left-not-md</p>
  <p class="p-3 mb-0 bg-light text-center-not-md">.text-center-not-md</p>
  <p class="p-3 mb-0 bg-gray-100 text-right-not-md">.text-right-not-md</p>
  <p class="p-3 mb-0 bg-light text-justify-not-md">.text-justify-not-md</p>
  <p class="p-3 mb-0 bg-gray-100 text-left-not-lg">.text-left-not-lg</p>
  <p class="p-3 mb-0 bg-light text-center-not-lg">.text-center-not-lg</p>
  <p class="p-3 mb-0 bg-gray-100 text-right-not-lg">.text-right-not-lg</p>
  <p class="p-3 mb-0 bg-light text-justify-not-lg">.text-justify-not-lg</p>
</div>


### Text Size

Text size classes have been extended by combining header classes (e.g., `.h1`) with margin-bottom-zero (`.mb-0`).

<div class="bd-example mb-4">
{{ range (seq 1 6) }}
<p class="text-size-h{{ . }}">.text-size-h{{ . }}</p>
{{ end }}
</div>

### Triangle List

In UA Bootstrap, the `.triangle` class was available for unordered lists. This class has been renamed `.ul-triangles` in {{< ourname >}}. This rename is to match the naming scheme that the rest of {{< ourname >}}'s components follow, and to make it more intuitive that the class can only be used on unordered lists.

<div class="bd-example">
  <ul class="triangle">
    <li>Triangle unordered list item</li>
  </ul>
</div>

## Removed Utility Classes

Components and utility classes that were marked as deprecated in UA Bootstrap have been completely removed in {{< ourname >}}.

### Column Push/Pull

The column push/pull classes available in UA Bootstrap have been replaced by [Order Classes]({{< docsref "/layout/grid#order-classes" >}}). These classes are not backwards compatible and will need to be updated to use {{< ourname >}}'s classes.

### Mailto

The `.mailto` class, which is placed directly on the `<a>` link tag, has been deprecated in favor of Bootstrap's `.text-truncate` class, which is placed on the surrounding `<div>` instead. See [Text Wrapping and Overflow]({{< docsref "/utilities/text#text-wrapping-and-overflow" >}}) for more details.

### No Line Height

The `.no-line-height` class has been completely removed and does not have an equivalent in {{< ourname >}}.

### Row and Column Buffers

Row and column buffers were deprecated in UA Bootstrap and have been completely removed in {{< ourname >}}. For the same effect, please use the [spacing utility classes]({{< docsref "/utilities/spacing" >}}).

### Theme Colors

The decision was made to remove all `.*-primary` and `.*-secondary` classes from {{< ourname >}} in favor of encouraging the use of more intuitive utility classes, and to avoid backwards compatibility issues with UA Bootstrap.

### Tooltip Arrow

In UA Bootstrap, tooltip markup used the class `.tooltip-arrow` for its arrow. In {{< ourname >}}, the class `.arrow` is used.

## Removed Components

### Navbar Inverted

The `.navbar-inverse` class has been completely removed.

## Removed JavaScript

Components listed in the JavaScript section of UA Bootstrap (e.g., Modals, Tooltips, Popovers) have had certain methods, options, and events removed or changed in {{< ourname >}}. These items are not backwards compatible. They should not cause breaking changes, but if you are manually calling any of these methods, they will need to be updated to use the methods/events/functions that {{< ourname >}} uses. Some examples include: `remote`, `.in` vs. `.show`, and `viewport` vs. `boundary`. Refer to each individual component's documentation for an explanation of proper methods, options, and events.

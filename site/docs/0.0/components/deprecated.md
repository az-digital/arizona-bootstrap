---
layout: docs
title: Deprecated
description: Components available in UA Bootstrap (Bootstrap 3) that have been deprecated/replaced in Arizona Bootstrap (Bootstrap 4).
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

## Components

### Buttons

In Bootstrap 4, `.btn-default` has been deprecated. Pointing `.btn-default` to `.btn-primary` would result in a red button, and pointing `.btn-secondary` would result in a blue button. Conflicts with backwards-compatibility arose with `secondary` being blue, since `primary` was blue in UA Bootstrap. This means existing sites using the blue button would suddenly become red. In favor of more intuitive buttons, we have also removed `primary` and `secondary` from `theme colors` in favor of `.btn-red` and `.btn-blue`.

<button type="button" class="btn btn-default">Default Button</button>
<button type="button" class="btn btn-primary">Primary Button</button>
<button type="button" class="btn btn-hollow-default">Default Hollow Button</button>
<button type="button" class="btn btn-hollow-primary">Primary Hollow Button</button>

### Cards

In Bootstrap 4, color-specific cards can be extended using the background color utility classes and border utility classes.

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

### Labels

In Bootstrap 4, labels have been replaced with the [Badge]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/badge) component. Labels can be replicated by extending the `.badge` styles. 

<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
<span class="label label-muted">Muted</span>

### Panels

Panels have been extended using a combination of the `.card` class (and its child classes) and the .bg-light class. "Expanding" or "collapsible" panels, however, are still available as a Bootstrap 4 component under [Collapse]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/collapse).

<div class="panel panel-default mb-2">
  <div class="panel-heading">
    <span class="h3 panel-title">Panel Default</span>
  </div>
  <div class="panel-body">
    <p>This is an example of how the backwards-compatible Panel looks in Bootstrap 4. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
</div>
<div class="panel panel-primary mb-2">
  <div class="panel-heading">
    <span class="h3 panel-title">Panel Primary</span>
  </div>
  <div class="panel-body">
    <p>This is an example of how the backwards-compatible Panel looks in Bootstrap 4. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
</div>
{% for color in site.data.theme-colors %}
{% if color.name != "light" and color.name != "dark" %}
<div class="panel panel-{{ color.name }} mb-2">
  <div class="panel-heading">
    <span class="h3 panel-title">Panel {{ color.name | capitalize }}</span>
  </div>
  <div class="panel-body">
    <p>This is an example of how the backwards-compatible Panel looks in Bootstrap 4. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
  </div>
</div>
{% endif %}
{% endfor %}


### Thumbnails

Thumbnails have been extended using a combination of the `.card` class and its child classes. 

<div class="row">
  <div class="col-12 col-md-4">
    <div class="thumbnail">
      <div class="caption">
        <p class="h3">Thumbnail Title</p>
        <p>This is an example of how the backwards-compatible Thumbnail looks in Bootstrap 4. This component should not be used, but it included here for the sake of verifying its backwards-compatibility.</p>
        </div>
    </div>
  </div>
</div>

### Wells

Wells have been extended using a combination of the `.card` class and the `.bg-light` class. 

<div class="well">
  <p>This is an example of how the backwards-compatible Well looks in Bootstrap 4. This component should not be used, but is included here for the sake of verifying its backwards-compatibility.</p>
</div> 


## Utilities

Certain utility classes available in Bootstrap 3 have been removed in Bootstrap 4, but can be replicated by using a combination of utility classes available in Bootstrap 4. 

### Text size

Text size classes have been extended by combining header classes (e.g., `.h1`) with margin-bottom-zero (`.mb-0`).

{% for i in (1..6) %}
<p class="text-size-h{{ i }}">.text-size-h{{ i }}</p>
{% endfor %}


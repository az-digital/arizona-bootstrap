---
layout: docs
title: Colors
description: Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.
group: utilities
toc: true
---

## Overview

{{ site.title }} offers two "types" or colors: Brand colors and contextual (theme) colors. Brand colors are a collection of Arizona Branded colors offered by the <a href="https://brand.arizona.edu/ua-color-palette" target="_blank">Brand website</a>. Contextual colors are a smaller selection of Brand colors that are used to convey meaning and contextual information (e.g., success, warning, dager).

When using these colors, it is important to maintain sufficient color contrast between your text color and background color. You can utilize the <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAim Color Contrast Checker</a> to verify your color contrast. Or, for your convenience, {{ site.title }} also provides a [helpful tool]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/color-contrast) to determine which Brand text colors have sufficient color contrast on other Brand background colors.

## Text Color

### Brand

{% capture example %}
{% for color in site.data.colors %}
<p class="text-{{ color.name }}{% if color.name == "white" or color.name == "cool-gray" or color.name == "warm-gray" %} bg-dark{% endif %}">.text-{{ color.name }}</p>{% endfor %}
{% endcapture %}
{% include example.html content=example %}

### Contextual (Theme)

{% capture example %}
{% for color in site.data.theme-colors %}
<p class="text-{{ color.name }}{% if color.name == "light" %} bg-dark{% endif %}">.text-{{ color.name }}</p>{% endfor %}
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
{% endcapture %}
{% include example.html content=example %}

Contextual text classes also work well on anchors with the provided hover and focus states. **Note that the `.text-white` and `.text-muted` class has no additional link styling beyond underline.**

{% capture example %}
{% for color in site.data.theme-colors %}
<p><a href="#" class="text-{{ color.name }}{% if color.name == "light" %} bg-dark{% endif %}">{{ color.name | capitalize }} link</a></p>{% endfor %}
<p><a href="#" class="text-muted">Muted link</a></p>
<p><a href="#" class="text-white bg-dark">White link</a></p>
{% endcapture %}
{% include example.html content=example %}


## Background Color

Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes. Background utilities **do not set `color`**, so in some cases you'll want to use `.text-*` utilities.

### Brand

{% capture example %}
{% for color in site.data.colors %}
<div class="p-3 mb-2 bg-{{ color.name }}">.bg-{{ color.name }}</div>{% endfor %}
{% endcapture %}
{% include example.html content=example %}

### Contextual (Theme)

{% capture example %}
{% for color in site.data.theme-colors %}
<div class="p-3 mb-2 bg-{{ color.name }}">.bg-{{ color.name }}</div>{% endfor %}
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
{% endcapture %}
{% include example.html content=example %}

### Grayscale

{% capture example %}
{% for color in site.data.grays %}
<div class="p-3 mb-2 bg-gray-{{ color.name }}">.bg-gray-{{ color.name }}</div>{% endfor %}
{% endcapture %}
{% include example.html content=example %}

## Background Gradient

When `$enable-gradients` is set to `true` (default is `false`), you can use `.bg-gradient-` utility classes. [Learn about our Sass options]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/theming/#sass-options) to enable these classes and more.

{% for color in site.data.theme-colors %}
- `.bg-gradient-{{ color.name }}`{% endfor %}

{% capture callout %}
#### Dealing with Specificity

Sometimes contextual classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element's content in a `<div>` with the class.
{% endcapture %}
{% include callout.html content=callout type="info" %}

{% include callout-warning-color-assistive-technologies.md %}

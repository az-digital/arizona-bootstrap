---
layout: docs
title: Callouts
description: Call attention to a snippet of content to make users aware of something important.
group: components
redirect_from:
  - "/components/"
  - "/docs/4.3/components/"
toc: true
---

## Examples

Callouts are similar to alerts, in that they call attention to a small portion of content that needs to stand out against the rest of the content. They are useful for pointing out important information or notices. Callouts can be combined with any of the available [brand colors]({{ site.baseurl }}/docs/{{ site.docs_version }}/docs/0.0/utilities/colors/#brand-1) or [theme colors](docs/0.0/utilities/colors/#theme-1).

<!-- <div class="callout callout-red">
  <p class="h4">Red Callout</p>
  <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
</div> -->
{% capture example %}
{% for color in site.data.colors %}
<div class="callout callout-{{ color.name }}{% if color.name == "white" or color.name == "cool-gray" or color.name == "warm-gray" or color.name == "sky" %} bg-dark {% endif %}">
  <p class="h4">{{ color.name | capitalize }} Callout</p>
  <p>A callout is useful for drawing attention to an important piece of content. You can use any of the available brand and theme colors in conjunction with the callout to change its border and text color.</p>
</div>
{% endfor %}
{% endcapture %}
{% include example.html content=example %}
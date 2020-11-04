---
layout: docs
title: University of Arizona wordmark header.
description: Add the Arizona red bar header to a site.
group: components
toc: true
---

The University of Arizona wordmark header is to be used on all subdomains of arizona.edu.

<header class="bg-red arizona-header" id="header_arizona">
  <section class="container l-container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </section>
</header>
{% highlight html %}
<header class="bg-red arizona-header" id="header_arizona">
  <section class="container l-container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </section>
</header>
{% endhighlight %}

Extending the header to save room on your site, especially in mobile, with nav and search buttons is supported as shown below.

<header class="bg-red arizona-header" id="header_arizona">
  <section class="container l-container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </section>
  <div class="redbar-buttons d-lg-none d-flex justify-content-end">
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red mr-1">
      <span class="material-icons-sharp"> search </span>
    </button>
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red">
      <span class="material-icons-sharp"> menu </span>
    </button>
  </div>
</header>
{% highlight html %}
<header class="bg-red arizona-header" id="header_arizona">
  <section class="container l-container">
    <div class="row">
      <a class="arizona-logo" href="http://www.arizona.edu" title="The University of Arizona homepage">
        <img class="arizona-line-logo" alt="The University of Arizona Wordmark Line Logo White" src="https://cdn.digital.arizona.edu/logos/v1.0.0/ua_wordmark_line_logo_white_rgb.min.svg"/>
      </a>
    </div>
  </section>
  <div class="redbar-buttons d-lg-none d-flex justify-content-end">
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red mr-1">
      <span class="material-icons-sharp"> search </span>
    </button>
    <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red">
      <span class="material-icons-sharp"> menu </span>
    </button>
  </div>
</header>
{% endhighlight %}

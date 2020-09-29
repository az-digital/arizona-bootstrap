---
layout: docs
title: WebFont Proxima Nova
description: The Proxima Nova font suite is available for official use by University of Arizona employees through a license with Adobe.
group: content
redirect_from: "/docs/4.3/content/"
toc: true
---

<div class="alert alert-warning" role="alert">
  <p class="h4 alert-heading">Heads Up!</p>
  If you're using Arizona Bootstrap, Proxima Nova will still need to be added to
  your project.
</div>

## Centrally managed typekit webfont

For ease of integration into web projects around campus, the Arizona Digital
team manages a typekit webfont project that can be referenced by your site.

#### Notes to consider when using the centrally mananged webfont project.
Our license with typekit allows anyone with a netid to create their own webfont
project in Creative Cloud Typekit and use it in all of their web projects. Of
course there are advantages and Disadvantages to each approach.

#### Managing your own project

**Advantages**
- You can tailor your font project to only include the fonts that your web site
or app uses, minimizing the number of assets an end-user
- If tailoring your own web project you may benefit with perfomance gains on
first end-user page load of your site or app if the user has never visited one
of the other websites (Arizona.edu for example) that includes the centrally
managed font.

**Disadvantages**
- Performance loss if your end-user has already downloaded the centrally managed
  font library from one of the other sites that use the centrally managed font.
- You have to manage your own font in typekit under your netid, or a department
  managed netid, which comes with the risk with managing yet another service on
  your own.

#### Using the centrally managed project

Using shared standard assets is inherently faster across multiple
domains, and any deviation to using shared standard assets should be considered
carefully by researching traffic-flow between institutional web properties, and
not solely initial page-load times on one site.  In other words all sites that
link to an arizona.edu subdomain, typically share users with the parent domain,
and other subdomains. Modern web browsers cache assets based on the address it
is downloaded from, so if all subdomains share the same asset, the end-user's
browser will access a cached copy without downloading it again across those
subdomains.

**Advantages**
- Worry-free font hosting.
- No managing department or team-level creative cloud accounts to ensure your
font isn't tied to one team-member
- Leverages browser caching across other domains and subdomains that use the
shared assets.
- You can easily switch to a self-managed model and back again.
- Centralized documentation on how to integrate into other shared assets.

**Disadvantages**
- Less flexibility in regards to which font is available to your project.
- Workflow challenges with making updates to centrally managed web fonts.

## Global settings
[Follow these instructions](#instructions) on how to add Proxima Nova to your
website.

### **Native Fallback Fonts**
The fallback webfont for Arizona Bootstrap is Calibri. Additional fallbacks
follow Bootstrap 4's use of "native font stack" for optimum text rendering on
every device and OS. Read more about [native font stacks in this Smashing Magazine article](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

{% highlight css %}
  $font-family-sans-serif:
  proxima-nova,
  calibri,
  // Safari for macOS and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for macOS (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  Roboto,
  // Basic web fallback
  "Helvetica Neue", Arial, sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default;
{% endhighlight %}

This `font-family` is applied to the `<body>` and automatically inherited
globally throughout Bootstrap. To switch the global `font-family`, update
`$font-family-base` and recompile Arizona Bootstrap.

## How to Use
The Proxima Nova font suite is available for official use by University of Arizona
employees through a license with Adobe Typekit.

### Reference link

Arizona Bootstrap uses a Creative Cloud Library with shared governance to
manage our font reference links within Arizona Bootstrap.

Put this within your `<head>` tag **above** the reference to Arizona Bootstrap.

{% highlight html %}
<!-- Proxima Nova reference. -->
<link href="https://use.typekit.net/emv3zbo.css" rel="stylesheet" crossorigin="anonymous">
<!-- Arizona Bootstrap reference. -->
<link rel="stylesheet" href="{{ site.cdn.css }}" crossorigin="anonymous">
{% endhighlight %}

If using the font independently from Arizona Bootstrap, below are
instructions on how to use the different weights and styles.

### **Instructions**
The following istructions are for adding specific CSS classes for font weights
or styles.  If using Arizona Bootstrap, you will most likely not need to do
this unless you are trying to use a specific variant.
<span class="label label-warning">Important</span>

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-bold' data-font-name='Proxima Nova Bold' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Bold

<div class="bd-example">
  <div class="proxima-nova-bold">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-bold {
font-family: proxima-nova, sans-serif;
font-weight: 700;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-bold">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-bold-italic' data-font-name='Proxima Nova Bold Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Bold Italic

<div class="bd-example">
  <div class="proxima-nova-bold-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-bold-italic {
font-family: proxima-nova, sans-serif;
font-weight: 700;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-bold-italic">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova' data-font-name='Proxima Nova Regular' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Regular

<div class="bd-example">
  <div class="proxima-nova">
   <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
   <span>abcdefghijklmnopqrstuvwxyz</span> <br />
   <span>0123456789</span> <br />
   <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-italic' data-font-name='Proxima Nova Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Italic

<div class="bd-example">
  <div class="proxima-nova-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-italic">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-ec-bold-italic' data-font-name='Proxima Nova Extra Condensed Bold Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Extra Condensed Bold Italic

<div class="bd-example">
  <div class="proxima-nova-ec-bold-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-ec-bold-italic {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 700;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-ec-bold-italic">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-ec-bold' data-font-name='Proxima Nova Extra Condensed Bold' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Extra Condensed Bold

<div class="bd-example">
  <div class="proxima-nova-ec-bold">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-ec-bold {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 700;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-ec-bold">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-ec-italic' data-font-name='Proxima Nova Extra Condensed Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Extra Condensed Italic

<div class="bd-example">
  <div class="proxima-nova-ec-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-ec-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-ec-italic">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-ec' data-font-name='Proxima Nova Extra Condensed Regular' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Extra Condensed Regular

<div class="bd-example">
  <div class="proxima-nova-ec">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-ec {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 400;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-ec">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-c-bold' data-font-name='Proxima Nova Condensed Bold' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Condensed Bold

<div class="bd-example">
  <div class="proxima-nova-c-bold">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-c-bold {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 700;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-c-bold">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-c-bold-italic' data-font-name='Proxima Nova Condensed Bold Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Condensed Bold Italic

<div class="bd-example">
  <div class="proxima-nova-c-bold-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-c-bold-italic {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 700;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-c-bold-italic">
  ...
</span>
{% endhighlight %}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-c' data-font-name='Proxima Nova Condensed Regular' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Condensed Regular

<div class="bd-example">
  <div class="proxima-nova-c">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-c {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 400;
font-style: normal;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-c">
  ...
</span>
{% endhighlight %}
<div>
  <button class="js-specimen-modal-trigger btn btn-info float-right" data-font-class='proxima-nova-c-italic' data-font-name='Proxima Nova Condensed Italic' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
</div>
### Proxima Nova Condensed Italic

<div class="bd-example">
  <div class="proxima-nova-c-italic">
    <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
    <span>abcdefghijklmnopqrstuvwxyz</span> <br />
    <span>0123456789</span> <br />
    <span>!@#$%^&</span>
  </div>
</div>

{% highlight css %}
.proxima-nova-c-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}

{% endhighlight %}

{% highlight html %}
<span class="proxima-nova-c-italic">
  ...
</span>
{% endhighlight %}

### **Examples in CSS**

Below are two examples of how you would use the Proxima Nova fonts in your code.

**Example 1**

<div class="bd-example">
  <h2 class="pn">Hello World!</h2>
  <div class="pn">
    <em>Hello World!</em>
  </div>
  <div class="pn">
    <strong>Hello World!</strong>
  </div>
  <div class="pn">
    <strong><em>Hello World!</em></strong>
  </div>
</div>
{% highlight css %}
.pn {
font-family: proxima-nova-condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
// Not strictly necessary, since Arizona Bootstrap already sets <em> to italic.
.pn em {
font-style: italic;
}
// Not strictly necessary, since Arizona Bootstrap already sets <strong> to
bolder.
.pn strong {
font-weight:700;
}
{% endhighlight %}
{% highlight html %}
<h2 class="pn">Hello World!</h2>
<div>
  <em class="pn">Hello World!</em>
</div>
<div>
  <strong class="pn">Hello World!</strong>
</div>
<div>
  <strong class="pn"><em>Hello World!</em></strong>
</div>
{% endhighlight %}
**Example 2**

{% highlight css %}
p { font-family: proxima-nova-condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
{% endhighlight %}

{% highlight html %}
<p>Hello World!</p>
{% endhighlight %}

<div id="specimen-modal" tabindex="-1" class="modal fade bs-example-modal-lg">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button data-dismiss="modal" type="button" class="btn float-right btn-light">
          <span class="material-icons-sharp align-middle">close</span>
        </button>
        <h4 id="myModalLabel" class="modal-title my-0">FONT SAMPLE</h4>
      </div>
      <div class="modal-body">
        <h1 id="js-change-font-name" class="my-0">FF Milo Serif Web Black Italic</h1>
        <div class="card">
          <div class="card-body">
            <form id="bigcontrol" name="bigcontrol"><button id="abcView" name="abcView" type="button" style="margin-right:15px; margin-bottom:15px;" class="btn btn-outline-light js-abcButton-trigger">ABC</button>
              <p><strong>Or try your own text:</strong></p>
              <div class="input-group">
                <input maxlength="120" name="customSampleText" size="62" type="text" value="Bear Down, Arizona. Bear Down, red and blue." class="form-control"/>
                <div class="input-group-btn"><button id="customSampleBtn" name="customSampleBtn" type="button" class="btn btn-info js-custom-sample-trigger">Go</button></div>
              </div>
            </form>
          </div>
        </div>
        <table id="js-specimen-modal-font" class="table table-striped">
          <tbody>
            <tr>
              <td>
                <p id="big1" style="font-size:72px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>72px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big2" style="font-size:48px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>48px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big3" style="font-size:36px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>36px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big4" style="font-size:28px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>28px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big5" style="font-size:24px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>24px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big6" style="font-size:20px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>20px</p>
              </th>
            </tr>
            <tr>
              <td>
                <p id="big7" style="font-size:16px" class="sample-text">All hail, Arizona! Thy colors Red and Blue Stand as a symbol of our love for you.</p>
              </td>
              <th>
                <p>16px</p>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

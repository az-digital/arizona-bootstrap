---
layout: docs
title: Font
description: The Proxima Nova font suite is available for official use by University of Arizona employees through a license with Adobe.
group: content
toc: true
extra_js:
  - src: "docs/5.0/assets/js/font-sample.js"
    async: true
---

<div class="alert alert-warning" role="alert">
  <p class="h4 mt-0">Heads Up!</p>
  If you're using Arizona Bootstrap, Proxima Nova will still need to be added to
  your project.
</div>

## How to Use
The Proxima Nova font suite is available for official use by University of Arizona
employees through a license with Adobe Typekit.

### Reference link

Arizona Bootstrap uses an Adobe Typekit account with shared governance to
manage our font reference links within Arizona Bootstrap.

Put this within your `<head>` tag **above** the reference to Arizona Bootstrap.

```html
<!-- Proxima Nova reference. -->
<link href="https://use.typekit.net/emv3zbo.css" rel="stylesheet" crossorigin="anonymous">
<!-- Arizona Bootstrap reference. -->
<link rel="stylesheet" href="{{< param "cdn.css" >}}" crossorigin="anonymous">
```

## Centrally-managed Typekit Webfont

For ease of integration into web projects around campus, the Arizona Digital
team manages a Typekit webfont project that can be referenced by your site.

#### Notes to consider when using the centrally managed webfont project.
Our license with Typekit allows anyone with a NetID to create their own webfont
project in Creative Cloud Typekit and use it in all of their web projects.

### Managing your own project

**Advantages**
- You can tailor your font project to only include the fonts that your web site or app uses, minimizing the number of assets an end-user has to download.
- Faster page load if your site uses a smaller subset of font variants than what are included in the shared library.

**Disadvantages**
- You have to manage your own font in Typekit using a NetID.
  - If the NetID is tied to one person, it creates a single point of failure if
    that user leaves the University.
  - If the NetID is a shared "test NetID" you have to manage credentials, and sign it
    up to use Adobe products.

**Note:** If you choose to manage your own web font project, it is strongly recommended that you go through the effort to use a [test NetID](https://apps.iam.arizona.edu/), which is shared with your department.
**Note:** Our license agreement with Adobe does not allow us to self-host font files.

## Native Fallback Fonts
The fallback webfont for Arizona Bootstrap is Calibri. Additional fallbacks
follow Bootstrap 5's use of "native font stack" for optimum text rendering on
every device and OS. Read more about [native font stacks in this Smashing Magazine article](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

```css
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
```

This `font-family` is applied to the `<body>` and automatically inherited
globally throughout Bootstrap. To switch the global `font-family`, update
`$font-family-base` and recompile Arizona Bootstrap.

## Adding Specific CSS Classes
<span class="badge bg-warning align-text-top">Important</span> The following instructions are for adding specific CSS classes for font weights or styles. If using Arizona Bootstrap, you will most likely not need to do this unless you are trying to use a specific variant.


<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-bold' data-font-name='Proxima Nova Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Bold

```css
.proxima-nova-bold {
font-family: proxima-nova, sans-serif;
font-weight: 700;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-bold">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-bold-italic' data-font-name='Proxima Nova Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Bold Italic

```css
.proxima-nova-bold-italic {
font-family: proxima-nova, sans-serif;
font-weight: 700;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-bold-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova' data-font-name='Proxima Nova Regular' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Regular

```css
.proxima-nova {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova">
 <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
 <span>abcdefghijklmnopqrstuvwxyz</span> <br>
 <span>0123456789</span> <br>
 <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-italic' data-font-name='Proxima Nova Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Italic

```css
.proxima-nova-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-ec-bold-italic' data-font-name='Proxima Nova Extra Condensed Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Extra Condensed Bold Italic

```css
.proxima-nova-ec-bold-italic {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 700;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-ec-bold-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-ec-bold' data-font-name='Proxima Nova Extra Condensed Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Extra Condensed Bold

```css
.proxima-nova-ec-bold {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 700;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-ec-bold">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-ec-italic' data-font-name='Proxima Nova Extra Condensed Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Extra Condensed Italic

```css
.proxima-nova-ec-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-ec-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-ec' data-font-name='Proxima Nova Extra Condensed Regular' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Extra Condensed Regular

```css
.proxima-nova-ec {
font-family: proxima-nova-extra-condensed, sans-serif;
font-weight: 400;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-ec">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-c-bold' data-font-name='Proxima Nova Condensed Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Condensed Bold

```css
.proxima-nova-c-bold {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 700;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-c-bold">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-c-bold-italic' data-font-name='Proxima Nova Condensed Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Condensed Bold Italic

```css
.proxima-nova-c-bold-italic {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 700;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-c-bold-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-c' data-font-name='Proxima Nova Condensed Regular' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Condensed Regular

```css
.proxima-nova-c {
font-family: proxima-nova-condensed, sans-serif;
font-weight: 400;
font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-c">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

<div>
  <button class="js-specimen-modal-trigger btn btn-info float-end" data-font-class='proxima-nova-c-italic' data-font-name='Proxima Nova Condensed Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>
</div>

### Proxima Nova Condensed Italic

```css
.proxima-nova-c-italic {
font-family: proxima-nova, sans-serif;
font-weight: 400;
font-style: italic;
}
```

{{< example >}}
<div class="proxima-nova-c-italic">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span> <br>
  <span>0123456789</span> <br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

### Examples in CSS

Below are two examples of how you would use the Proxima Nova fonts in your code.

**Example 1**

{{< example >}}
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
{{< /example >}}

```css
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
```
{{< example >}}
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
{{< /example >}}

**Example 2**

```css
p { font-family: proxima-nova-condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
```

{{< example >}}
<p>Hello World!</p>
{{< /example >}}

<div id="specimen-modal" tabindex="-1" class="modal fade bs-example-modal-lg" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="myModalLabel" class="modal-title my-0">FONT SAMPLE</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h1 id="js-change-font-name" class="my-0">FF Milo Serif Web Black Italic</h1>
        <div class="card">
          <div class="card-body">
            <form id="bigcontrol" name="bigcontrol"><button id="abcView" name="abcView" type="button" style="margin-right:15px; margin-bottom:15px;" class="btn btn-outline-light js-abcButton-trigger">ABC</button>
              <p><strong>Or try your own text:</strong></p>
              <div class="input-group">
                <input maxlength="120" name="customSampleText" size="62" type="text" value="Bear Down, Arizona. Bear Down, red and blue." class="form-control">
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

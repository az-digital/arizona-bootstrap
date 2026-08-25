---
layout: docs
title: Font
description: Additional fonts are available for official use by University of Arizona employees through a license with Adobe.
group: content
toc: true
extra_js:
  - src: "docs/5.1/assets/js/font-sample.js"
    async: true
---

<div class="alert alert-warning" role="alert">
  <p class="h4 mt-0">Heads Up!</p>
  If you're using Arizona Bootstrap, Proxima Nova and Garamond Premier Pro will still need to be added to your project.
</div>

## How to Use
The Proxima Nova and Garamond Premier Pro font suites are available for official use by University of Arizona employees through a license with Adobe Typekit.

### Reference link

Arizona Bootstrap uses an Adobe Typekit account with shared governance to
manage our font reference links within Arizona Bootstrap.

Put this within your `<head>` tag **above** the reference to Arizona Bootstrap.

```html
<!-- Proxima Nova + Garamond Premier Pro reference. -->
<link href="https://use.typekit.net/sgx0zzg.css" rel="stylesheet" crossorigin="anonymous">
<!-- Arizona Bootstrap reference. -->
<link rel="stylesheet" href="{{< param "cdn.css" >}}" crossorigin="anonymous">
```

Previous versions of Arizona Bootstrap required only Proxima Nova (and Garamond Premier Pro if AZ Navbar Fullscreen was used). Arizona Bootstrap 5.2 now requires both Proxima Nova and Garamond Premier Pro. If your application requires a lower version of Arizona Bootstrap than 5.2, use the legacy embed code(s).
```html
<!-- Proxima Nova reference. -->
<link href="https://use.typekit.net/emv3zbo.css" rel="stylesheet" crossorigin="anonymous">
<!-- Garamond Premier Pro reference (only needed for AZ Navbar Fullscreen). -->
<link href="https://use.typekit.net/eyf6fhr.css" rel="stylesheet" crossorigin="anonymous">
<!-- Arizona Bootstrap reference. -->
<link rel="stylesheet" href="{{< param "cdn.css" >}}" crossorigin="anonymous">
```

## Centrally-managed Typekit Webfonts

For ease of integration into web projects around campus, the Arizona Digital
team manages Typekit webfont projects that can be referenced by your site.

#### Notes to consider when using the centrally managed webfont projects.
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
<p></p>

This `font-family` is applied to the `<body>` and automatically inherited
globally throughout Bootstrap. To switch the global `font-family`, update
`$font-family-base` and recompile Arizona Bootstrap.

## Adding Specific CSS Classes

<span class="badge badge-az-custom">Custom Arizona Bootstrap Classes</span>

<span class="badge bg-warning align-text-top">Important</span> The following instructions are for adding specific CSS classes for font weights or styles to your project. If using Arizona Bootstrap, you will most likely not need to do this unless you are trying to use a specific variant.


<button class="js-specimen-modal-trigger btn btn-info float-end mt-2" data-font-class='proxima-nova' data-font-name='Proxima Nova' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>

### Proxima Nova

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
  <span>abcdefghijklmnopqrstuvwxyz</span><br>
  <span>0123456789</span><br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

Additional Proxima Nova weights and styles are available via the embed code. Rather than adding a dedicated class for each variation, combine the `.proxima-nova` class with Bootstrap's [font-weight]({{< docsref "/utilities/text/#font-weight-and-italics" >}}) `.fw-*` and `.fst-italic` utility classes.

{{< bs-table "table align-middle font-variants-table" >}}
| Weight | Style | Classes | Sample |
| --- | --- | --- | ---: |
| Light (300) | Normal | `proxima-nova fw-light` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-light' data-font-name='Proxima Nova Light' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Light (300) | Italic | `proxima-nova fw-light fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-light fst-italic' data-font-name='Proxima Nova Light Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Regular (400) | Normal | `proxima-nova` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova' data-font-name='Proxima Nova' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Regular (400) | Italic | `proxima-nova fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fst-italic' data-font-name='Proxima Nova Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Normal | `proxima-nova fw-medium` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-medium' data-font-name='Proxima Nova Medium' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Italic | `proxima-nova fw-medium fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-medium fst-italic' data-font-name='Proxima Nova Medium Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Normal | `proxima-nova fw-semibold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-semibold' data-font-name='Proxima Nova Semibold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Italic | `proxima-nova fw-semibold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-semibold fst-italic' data-font-name='Proxima Nova Semibold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Normal | `proxima-nova fw-bold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-bold' data-font-name='Proxima Nova Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Italic | `proxima-nova fw-bold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova fw-bold fst-italic' data-font-name='Proxima Nova Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
{{< /bs-table >}}

<button class="js-specimen-modal-trigger btn btn-info float-end mt-2" data-font-class='proxima-nova-condensed' data-font-name='Proxima Nova Condensed' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>

### Proxima Nova Condensed

```css
.proxima-nova-condensed {
  font-family: proxima-nova-condensed, sans-serif;
  font-weight: 400;
  font-style: normal;
}
```

{{< example >}}
<div class="proxima-nova-condensed">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span><br>
  <span>0123456789</span><br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

Additional Proxima Nova Condensed weights and styles are available via the embed code. Combine the `.proxima-nova-condensed` class with Bootstrap's `.fw-*` and `.fst-italic` utility classes.

{{< bs-table "table align-middle font-variants-table" >}}
| Weight | Style | Classes | Sample |
| --- | --- | --- | ---: |
| Light (300) | Normal | `proxima-nova-condensed fw-light` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-light' data-font-name='Proxima Nova Condensed Light' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Light (300) | Italic | `proxima-nova-condensed fw-light fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-light fst-italic' data-font-name='Proxima Nova Condensed Light Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Regular (400) | Normal | `proxima-nova-condensed` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed' data-font-name='Proxima Nova Condensed' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Regular (400) | Italic | `proxima-nova-condensed fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fst-italic' data-font-name='Proxima Nova Condensed Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Normal | `proxima-nova-condensed fw-medium` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-medium' data-font-name='Proxima Nova Condensed Medium' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Italic | `proxima-nova-condensed fw-medium fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-medium fst-italic' data-font-name='Proxima Nova Condensed Medium Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Normal | `proxima-nova-condensed fw-semibold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-semibold' data-font-name='Proxima Nova Condensed Semibold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Italic | `proxima-nova-condensed fw-semibold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-semibold fst-italic' data-font-name='Proxima Nova Condensed Semibold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Normal | `proxima-nova-condensed fw-bold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-bold' data-font-name='Proxima Nova Condensed Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Italic | `proxima-nova-condensed fw-bold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='proxima-nova-condensed fw-bold fst-italic' data-font-name='Proxima Nova Condensed Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
{{< /bs-table >}}

<button class="js-specimen-modal-trigger btn btn-info float-end mt-2" data-font-class='garamond-premier-pro' data-font-name='Garamond Premier Pro' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button>

### Garamond Premier Pro

```css
.garamond-premier-pro {
  font-family: garamond-premier-pro, serif;
  font-weight: 400;
  font-style: normal;
}
```

{{< example >}}
<div class="garamond-premier-pro">
  <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
  <span>abcdefghijklmnopqrstuvwxyz</span><br>
  <span>0123456789</span><br>
  <span>!@#$%^&</span>
</div>
{{< /example >}}

Additional Garamond Premier Pro weights and styles are available via the embed code (note: no Light/300 weight is available for this font). Combine the `.garamond-premier-pro` class with Bootstrap's `.fw-*` and `.fst-italic` utility classes.

{{< bs-table "table align-middle font-variants-table" >}}
| Weight | Style | Classes | Sample |
| --- | --- | --- | ---: |
| Regular (400) | Normal | `garamond-premier-pro` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro' data-font-name='Garamond Premier Pro' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Regular (400) | Italic | `garamond-premier-pro fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fst-italic' data-font-name='Garamond Premier Pro Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Normal | `garamond-premier-pro fw-medium` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-medium' data-font-name='Garamond Premier Pro Medium' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Medium (500) | Italic | `garamond-premier-pro fw-medium fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-medium fst-italic' data-font-name='Garamond Premier Pro Medium Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Normal | `garamond-premier-pro fw-semibold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-semibold' data-font-name='Garamond Premier Pro Semibold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Semibold (600) | Italic | `garamond-premier-pro fw-semibold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-semibold fst-italic' data-font-name='Garamond Premier Pro Semibold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Normal | `garamond-premier-pro fw-bold` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-bold' data-font-name='Garamond Premier Pro Bold' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
| Bold (700) | Italic | `garamond-premier-pro fw-bold fst-italic` | <button class="js-specimen-modal-trigger btn btn-sm btn-info" data-font-class='garamond-premier-pro fw-bold fst-italic' data-font-name='Garamond Premier Pro Bold Italic' data-bs-target='.bs-example-modal-lg' data-bs-toggle='modal' type='button'>View Sample</button> |
{{< /bs-table >}}

## Examples

Below are two examples of how you would use the Proxima Nova fonts in your project.

**Example 1: Using Existing Arizona Bootstrap Classes**

{{< example >}}
  <h2 class="proxima-nova">Proxima Nova Heading</h2>
  <div class="proxima-nova">
    <em>Proxima Nova with emphasis</em>
  </div>
  <div class="proxima-nova">
    <strong>Proxima Nova with strong importance</strong>
  </div>
  <div class="proxima-nova">
    <strong><em>Proxima Nova with emphasis and strong importance</em></strong>
  </div>
{{< /example >}}

**Example 2: Using a Project-Specific Class**

```css
.proxima-nova-condensed {
  font-family: proxima-nova-condensed, sans-serif;
}
```

{{< example >}}
<p class="proxima-nova-condensed">Proxima Nova Condensed</p>
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

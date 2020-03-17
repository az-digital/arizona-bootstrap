---
layout: docs
title: WebFont Proxima Nova
description: The Proxima Nova font suite is available for official use by University of Arizona employees through a license with Adobe.
group: content
redirect_from: "/docs/4.3/content/"
toc: true
---

## Global settings
For projects not using Arizona Bootstrap, follow these instructions on how to add Proxima Nova to your website. Be aware that Arizona Bootstrap reference links come "pre-loaded" with the Proxima Nova font suite. In other words, if you're using Arizona Bootstrap, font installation instructions are not required.


### **Fallback Fonts**

Not all web browsers know about web fonts, and thus we must include consistent
fallback typefaces so that your visitor see the same font families when they
visit UA sites. Below is the official font stack for both Milo Sans and Milo
Serif.
.

## How to Use
The Milo font suite is available for official use by UA employees through
a license with FontShop. Please follow the instructions below to ensure
compliance with the license.

### **Instructions**

Before using the Milo font suite, please complete the <a href="https://brand.arizona.edu/font-license-agreement" target="_blank">font license
agreement</a> <span class="label
label-warning">Important</span>

For projects not using UA Bootstrap, follow these instructions on <a href="https://brand.arizona.edu/how-add-milo-your-website" target="_blank">how to add Milo to your website</a>.
Be aware that [UA Bootstrap reference links](index.html#ua-bootstrap-reference-links) come "pre-loaded"
with the Milo font suite. In other words, if you're using UA Bootstrap, font
installation instructions are not required.<span class="label
label-warning">Important</span>

### **Fallback Fonts**

Not all web browsers know about web fonts, and thus we must include consistent
fallback typefaces so that your visitor see the same font families when they
visit UA sites. Below is the official font stack for both Milo Sans and Milo
Serif.

**Serif**

```css
font-family: MiloSerifWeb, TimesNewRoman, "Times New Roman", Times, Baskerville,
Georgia, serif;
```

**Milo Sans Serif**

```css
font-family: MiloWeb, Verdana, Geneva, sans-serif;
```

### **Examples in CSS**

Below are two examples of how you would use the Milo fonts in your code.

**Example 1**

```css
h2 {
  font-family: MiloSerifWeb, TimesNewRoman, "Times New Roman", Times,
  Baskerville, Georgia, serif;
}
```
```html
<h2 class="msw">Hello World!</h2>
```

**Example 2**

```css
p { font-family: MiloWeb, Verdana, Geneva, sans-serif; }
```

```html
<p>Hello World!</p>
```

###  Milo Serif Black

<button class="js-specimen-modal-trigger btn btn-red pull-right" data-font-class='milo-serif-web-black' data-font-name='Milo Serif Black' data-target='.bs-example-modal-lg' data-toggle='modal' type='button'>View Sample</button>
### Serif Normal Black

<style>
.serif-normal-black {
    font-weight: 900;
    font-family: MiloSerifWeb-Black, TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif;
    font-size: 36px;
    word-wrap: break-word;
}
.serif-normal-black span:first-child {
    text-transform: uppercase;
}
</style>

<div class="serif-normal-black">
  <div class="example">
   <p class="example-label text-size-h3"><span class="label label-info">Example</span></p>
   <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
   <span>abcdefghijklmnopqrstuvwxyz</span> <br />
   <span>0123456789</span> <br />
   <span>!@#$%^&</span>
 </div>
</div>

The font family changes to **MiloSerifWeb-Black** <span class="label label-primary">Notice</span>

```css
.serif-normal-black {
  font-family: MiloSerifWeb-Black, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
  font-style: normal;
  font-weight: 900;
}

<span class="serif-normal-black">
    ...
</span>
```

<button class="js-specimen-modal-trigger btn btn-red pull-right" data-font-class='milo-serif-web-black-italics'  data-font-name='Milo Serif Black Italic'  data-target='.bs-example-modal-lg'  data-toggle='modal'  type='button'>View Sample</button>
### Serif Normal Black Italic

<style>
.serif-normal-black-italic {
    font-weight: normal;
    font-family: MiloSerifWeb-Black, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
    font-style: italic;
    font-size: 36px;
    word-wrap: break-word;
}
</style>

<div class="serif-normal-black-italic">
  <div class="example">
   <p class="example-label text-size-h3"><span class="label label-info">Example</span></p>
   <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
   <span>abcdefghijklmnopqrstuvwxyz</span> <br />
   <span>0123456789</span> <br />
   <span>!@#$%^&</span>
 </div>
</div>

```css
.serif-normal-black-italic {
  font-family: MiloSerifWeb-Black, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
  font-style: normal;
  font-weight:normal;
  font-style: italic;
}

<span class="serif-normal-black-italic">
    ...
</span>
```
### Milo Serif Web

<button class="js-specimen-modal-trigger pull-right btn btn-red" data-font-class='milo-serif-web-text-normal'  data-font-name='Milo Serif Web'  data-target='.bs-example-modal-lg'  data-toggle='modal', type='button'>View Sample</button>
### Serif Normal
<style>
.serif-normal {
  font-family: MiloSerifWeb, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  word-wrap: break-word;
}
.serif-medium {
  font-family: MiloSerifWeb, TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  word-wrap: break-word;
}
</style>

<div class="serif-normal">
  <div class="example">
   <p class="example-label text-size-h3"><span class="label label-info">Example</span></p>
   <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
   <span>abcdefghijklmnopqrstuvwxyz</span> <br />
   <span>0123456789</span> <br />
   <span>!@#$%^&</span>
 </div>
</div>


```css
.serif-normal {
  font-family: MiloSerifWeb, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
  font-style: normal;
  font-weight: normal;
}
```

<button class="js-specimen-modal-trigger pull-right btn btn-red" data-font-class='milo-serif-web-text-medium'  data-font-name='Milo Serif Web Medium'  data-target='.bs-example-modal-lg'  data-toggle='modal'  type='button'>View Sample</button>
### Serif Medium

<div class="serif-medium">
  <div class="example">
   <p class="example-label text-size-h3"><span class="label label-info">Example</span></p>
   <span class="text-uppercase">abcdefghijklmnopqrstuvwxyz</span>
   <span>abcdefghijklmnopqrstuvwxyz</span> <br />
   <span>0123456789</span> <br />
   <span>!@#$%^&</span>
 </div>
</div>


```css
.serif-medium {
  font-family: MiloSerifWeb, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
  font-style: normal;
  font-weight: 700;
}
```



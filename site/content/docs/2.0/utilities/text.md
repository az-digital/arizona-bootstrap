---
layout: docs
title: Text
description: Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.
group: utilities
toc: true
---

## Text Alignment

Easily realign text to components with text alignment classes.

{{< example >}}
<p class="text-justify">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
{{< /example >}}

For left, right, and center alignment, responsive classes are available that use the same viewport width breakpoints as the grid system.

{{< example >}}
<p class="text-start">Left aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-end">Right aligned text on all viewport sizes.</p>

<p class="text-sm-left">Left aligned text on viewports sized SM (small) or wider.</p>
<p class="text-md-left">Left aligned text on viewports sized MD (medium) or wider.</p>
<p class="text-lg-left">Left aligned text on viewports sized LG (large) or wider.</p>
<p class="text-xl-left">Left aligned text on viewports sized XL (extra-large) or wider.</p>
{{< /example >}}

## Text Wrapping and Overflow

Wrap text with a `.text-wrap` class.

{{< example >}}
<div class="badge badge-red text-wrap" style="width: 6rem;">
  This text should wrap.
</div>
{{< /example >}}

Prevent text from wrapping with a `.text-nowrap` class.

{{< example >}}
<div class="text-nowrap bd-highlight" style="width: 8rem;">
  This text should overflow the parent.
</div>
{{< /example >}}

For longer content, you can add a `.text-truncate` class to truncate the text with an ellipsis. **Requires `display: inline-block` or `display: block`.**

{{< example >}}
<!-- Block level -->
<div class="row">
  <div class="col-2 text-truncate">
    Praeterea iter est quasdam res quas ex communi.
  </div>
</div>

<!-- Inline level -->
<span class="d-inline-block text-truncate" style="max-width: 150px;">
  Praeterea iter est quasdam res quas ex communi.
</span>
{{< /example >}}

## Word Break

Prevent long strings of text from breaking your components' layout by using `.text-break` to set `overflow-wrap: break-word` (and `word-break: break-word` for IE & Edge compatibility).

{{< example >}}
<p class="text-break">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>
{{< /example >}}

## Hyphenate Word

Allow long strings of text to break to the next line with a hyphen automatically placed at the break point by using `.text-hyphen` to set `hyphens: auto`. This should only be applied as a span on a single word that may be longer than the column width at some screen sizes. Do not use on paragraphs or longer spans of text.

{{< example >}}
<div class="card col-2">
  <div class="card-body">
    <p>We should all learn about <span class="text-hyphen">Tranformationaltotality</span>.</p>
  </div>
</div>
{{< /example >}}

## Text Transform

Transform text in components with text capitalization classes.

{{< example >}}
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">capitalized text.</p>
{{< /example >}}

Note how `.text-capitalize` only changes the first letter of each word, leaving the case of any other letters unaffected.

## Font Weight and Italics

Quickly change the weight (boldness) of text or italicize text.

{{< example >}}
<p class="font-weight-bold">Bold text.</p>
<p class="font-weight-bolder">Bolder weight text (relative to the parent element).</p>
<p class="font-weight-normal">Normal weight text.</p>
<p class="font-weight-light">Light weight text.</p>
<p class="font-weight-lighter">Lighter weight text (relative to the parent element).</p>
<p class="font-italic">Italic text.</p>
{{< /example >}}

## Font Families

### Monospace

Change a selection of text to our monospace font stack with `.text-monospace`.

{{< example >}}
<p class="text-monospace">This is monospace text</p>
{{< /example >}}

## Reset Color

Reset a text or link's color with `.text-reset`, so that it inherits the color from its parent.

{{< example >}}
<p class="text-muted">
  Muted text with a <a href="#" class="text-reset">reset link</a>.
</p>
{{< /example >}}

## Text Decoration

Remove a text decoration with a `.text-decoration-none` class.

{{< example >}}
<a href="#" class="text-decoration-none">Non-underlined link</a>
{{< /example >}}

Add text decoration on hover with [hover utility classes]({{< docsref "/utilities/hover#text-decoration" >}}).

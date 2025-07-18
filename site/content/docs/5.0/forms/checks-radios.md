---
layout: docs
title: Checks and radios
description: Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.
group: forms
aliases: "/docs/5.0/forms/checks/"
toc: true
---

## Approach

Browser default checkboxes and radios are replaced with the help of `.form-check`, a series of classes for both input types that improves the layout and behavior of their HTML elements, that provide greater customization and cross browser consistency. Checkboxes are for selecting one or several options in a list, while radios are for selecting one option from many.

Structurally, our `<input>`s and `<label>`s are sibling elements as opposed to an `<input>` within a `<label>`. This is slightly more verbose as you must specify `id` and `for` attributes to relate the `<input>` and `<label>`. We use the sibling selector (`~`) for all our `<input>` states, like `:checked` or `:disabled`. When combined with the `.form-check-label` class, we can easily style the text for each item based on the `<input>`'s state.

Our checks use custom Bootstrap icons to indicate checked or indeterminate states.

## Checks

{{< example >}}
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkDefault">
  <label class="form-check-label" for="checkDefault">
    Default checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkChecked" checked>
  <label class="form-check-label" for="checkChecked">
    Checked checkbox
  </label>
</div>
{{< /example >}}

### Indeterminate

Checkboxes can utilize the `:indeterminate` pseudo class when manually set via JavaScript (there is no available HTML attribute for specifying it).

{{< example class="bd-example-indeterminate" >}}
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkIndeterminate">
  <label class="form-check-label" for="checkIndeterminate">
    Indeterminate checkbox
  </label>
</div>
{{< /example >}}

### Disabled

Add the `disabled` attribute and the associated `<label>`s are automatically styled to match with a lighter color to help indicate the input's state.

{{< example class="bd-example-indeterminate" >}}
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkIndeterminateDisabled" disabled>
  <label class="form-check-label" for="checkIndeterminateDisabled">
    Disabled indeterminate checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkDisabled" disabled>
  <label class="form-check-label" for="checkDisabled">
    Disabled checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkCheckedDisabled" checked disabled>
  <label class="form-check-label" for="checkCheckedDisabled">
    Disabled checked checkbox
  </label>
</div>
{{< /example >}}

## Radios

{{< example >}}
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1">
  <label class="form-check-label" for="radioDefault1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2" checked>
  <label class="form-check-label" for="radioDefault2">
    Default checked radio
  </label>
</div>
{{< /example >}}

### Disabled

Add the `disabled` attribute and the associated `<label>`s are automatically styled to match with a lighter color to help indicate the input's state.

{{< example >}}
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDisabled" id="radioDisabled" disabled>
  <label class="form-check-label" for="radioDisabled">
    Disabled radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDisabled" id="radioCheckedDisabled" checked disabled>
  <label class="form-check-label" for="radioCheckedDisabled">
    Disabled checked radio
  </label>
</div>
{{< /example >}}

## Switches

A switch has the markup of a custom checkbox but uses the `.form-switch` class to render a toggle switch. Consider using `role="switch"` to more accurately convey the nature of the control to assistive technologies that support this role. In older assistive technologies, it will simply be announced as a regular checkbox as a fallback. Switches also support the `disabled` attribute.

{{< example >}}
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault">
  <label class="form-check-label" for="switchCheckDefault">Default switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked>
  <label class="form-check-label" for="switchCheckChecked">Checked switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDisabled" disabled>
  <label class="form-check-label" for="switchCheckDisabled">Disabled switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switchCheckCheckedDisabled" checked disabled>
  <label class="form-check-label" for="switchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
</div>
{{< /example >}}

## Default (stacked)

By default, any number of checkboxes and radios that are immediate sibling will be vertically stacked and appropriately spaced with `.form-check`.

{{< example >}}
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
  <label class="form-check-label" for="defaultCheck2">
    Disabled checkbox
  </label>
</div>
{{< /example >}}

{{< example >}}
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
  <label class="form-check-label" for="exampleRadios2">
    Second default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
  <label class="form-check-label" for="exampleRadios3">
    Disabled radio
  </label>
</div>
{{< /example >}}

## Inline

Group checkboxes or radios on the same horizontal row by adding `.form-check-inline` to any `.form-check`.

{{< example >}}
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
  <label class="form-check-label" for="inlineCheckbox2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
  <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
</div>
{{< /example >}}

{{< example >}}
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
</div>
{{< /example >}}

## Reverse

Put your checkboxes, radios, and switches on the opposite side with the `.form-check-reverse` modifier class.

{{< example >}}
<div class="form-check form-check-reverse">
  <input class="form-check-input" type="checkbox" value="" id="reverseCheck1">
  <label class="form-check-label" for="reverseCheck1">
    Reverse checkbox
  </label>
</div>
<div class="form-check form-check-reverse">
  <input class="form-check-input" type="checkbox" value="" id="reverseCheck2" disabled>
  <label class="form-check-label" for="reverseCheck2">
    Disabled reverse checkbox
  </label>
</div>

<div class="form-check form-switch form-check-reverse">
  <input class="form-check-input" type="checkbox" id="switchCheckReverse">
  <label class="form-check-label" for="switchCheckReverse">Reverse switch checkbox input</label>
</div>
{{< /example >}}

## Without labels

Omit the wrapping `.form-check` for checkboxes and radios that have no label text. Remember to still provide some form of accessible name for assistive technologies (for instance, using `aria-label`). See the [forms overview accessibility]({{< docsref "/forms/overview#accessibility" >}}) section for details.

{{< example >}}
<div>
  <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
</div>

<div>
  <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="" aria-label="...">
</div>
{{< /example >}}

## Toggle buttons

Create button-like checkboxes and radio buttons by using `.btn` styles rather than `.form-check-label` on the `<label>` elements. These toggle buttons can further be grouped in a [button group]({{< docsref "/components/button-group" >}}) if needed.

### Checkbox toggle buttons

{{< example >}}
<input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
<label class="btn btn-red" for="btn-check">Single toggle</label>

<input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off">
<label class="btn btn-red" for="btn-check-2">Checked</label>

<input type="checkbox" class="btn-check" id="btn-check-3" autocomplete="off" disabled>
<label class="btn btn-red" for="btn-check-3">Disabled</label>
{{< /example >}}

{{< example >}}
<input type="checkbox" class="btn-check" id="btn-check-4" autocomplete="off">
<label class="btn" for="btn-check-4">Single toggle</label>

<input type="checkbox" class="btn-check" id="btn-check-5" checked autocomplete="off">
<label class="btn" for="btn-check-5">Checked</label>

<input type="checkbox" class="btn-check" id="btn-check-6" autocomplete="off" disabled>
<label class="btn" for="btn-check-6">Disabled</label>
{{< /example >}}

{{< callout info >}}
Visually, these checkbox toggle buttons are identical to the [button plugin toggle buttons]({{< docsref "/components/buttons#button-plugin" >}}). However, they are conveyed differently by assistive technologies: the checkbox toggles will be announced by screen readers as "checked"/"not checked" (since, despite their appearance, they are fundamentally still checkboxes), whereas the button plugin toggle buttons will be announced as "button"/"button pressed". The choice between these two approaches will depend on the type of toggle you are creating, and whether or not the toggle will make sense to users when announced as a checkbox or as an actual button.
{{< /callout >}}

### Radio toggle buttons

{{< example >}}
<input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
<label class="btn btn-blue" for="option1">Checked</label>

<input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
<label class="btn btn-blue" for="option2">Radio</label>

<input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" disabled>
<label class="btn btn-blue" for="option3">Disabled</label>

<input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
<label class="btn btn-blue" for="option4">Radio</label>
{{< /example >}}

{{< example >}}
<input type="radio" class="btn-check" name="options-base" id="option5" autocomplete="off" checked>
<label class="btn" for="option5">Checked</label>

<input type="radio" class="btn-check" name="options-base" id="option6" autocomplete="off">
<label class="btn" for="option6">Radio</label>

<input type="radio" class="btn-check" name="options-base" id="option7" autocomplete="off" disabled>
<label class="btn" for="option7">Disabled</label>

<input type="radio" class="btn-check" name="options-base" id="option8" autocomplete="off">
<label class="btn" for="option8">Radio</label>
{{< /example >}}

### Outlined styles

Different variants of `.btn`, such as the various outlined styles, are supported.

{{< example >}}
<input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">
<label class="btn btn-outline-red" for="btn-check-outlined">Single toggle</label><br>

<input type="checkbox" class="btn-check" id="btn-check-2-outlined" checked autocomplete="off">
<label class="btn btn-outline-blue" for="btn-check-2-outlined">Checked</label><br>

<input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked>
<label class="btn btn-outline-success" for="success-outlined">Checked success radio</label>

<input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off">
<label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label>
{{< /example >}}

## CSS

### Sass variables

Variables for checks:

{{< scss-docs name="form-check-variables" file="scss/_variables.scss" >}}

Variables for switches:

{{< scss-docs name="form-switch-variables" file="scss/_variables.scss" >}}

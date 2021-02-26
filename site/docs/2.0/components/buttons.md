---
layout: docs
title: Buttons
description: Use Bootstrap's custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
group: components
toc: true
---

## Examples

Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.

{{< example >}}
<button type="button" class="btn btn-red">Red</button>
<button type="button" class="btn btn-blue">Blue</button>
{{< buttons.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<button type="button" class="btn btn-{{ .name }}">{{ .name | title }}</button>
{{- end -}}
{{< /buttons.inline >}}
{{< /example >}}

{{< callout warning >}}
{{< partial "callout-warning-color-assistive-technologies.md" >}}
{{< /callout >}}

## Outline Buttons

In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the `.btn-outline-*` ones to remove all background images and colors on any button.

{{< example >}}
<button type="button" class="btn btn-outline-red">Red</button>
<button type="button" class="btn btn-outline-blue">Blue</button>
{{{< buttons.inline >}}
{{- range (index $.Site.Data "theme-colors") }}
<button type="button" class="btn btn-outline-{{ .name }}">{{ .name | title }}</button>
{{- end -}}
{{< /buttons.inline >}}
{{< /example >}}

For outline buttons on a **dark background color**, use the `.btn-outline-white`.
<div class="bd-example">
  <div class="d-inline-block w-25 bg-dark p-3">
    <button type="button" class="btn btn-outline-white">White</button>
  </div>
  <div class="d-inline-block w-25 bg-red p-3">
    <button type="button" class="btn btn-outline-white">White</button>
  </div>
  <div class="d-inline-block w-25 bg-blue p-3">
    <button type="button" class="btn btn-outline-white">White</button>
  </div>
</div>
```html
<div class="bg-dark p-3">
  <button type="button" class="btn btn-outline-white">White</button>
</div>
<div class="bg-red p-3">
  <button type="button" class="btn btn-outline-white">White</button>
</div>
<div class="bg-blue p-3">
  <button type="button" class="btn btn-outline-white">White</button>
</div>
```

## Sizes

Fancy larger or smaller buttons? Add `.btn-lg` or `.btn-sm` for additional sizes.

{{< example >}}
<button type="button" class="btn btn-red btn-lg">Large button</button>
<button type="button" class="btn btn-blue btn-lg">Large button</button>
{{< /example >}}

{{< example >}}
<button type="button" class="btn btn-red btn-sm">Small button</button>
<button type="button" class="btn btn-blue btn-sm">Small button</button>
{{< /example >}}

Create block level buttons—those that span the full width of a parent—by adding `.btn-block`.

{{< example >}}
<button type="button" class="btn btn-red btn-lg btn-block">Block level button</button>
<button type="button" class="btn btn-blue btn-lg btn-block">Block level button</button>
{{< /example >}}

## Arrow Buttons

Add an arrow to any button style by adding the `.btn-arrow` class.

{{< example >}}
<button type="button" class="btn btn-lg btn-red btn-arrow">Large Arrow Button</button>
<button type="button" class="btn btn-lg btn-blue btn-arrow">Large Arrow Button</button>
<button type="button" class="btn btn-lg btn-info btn-arrow">Large Arrow Button</button>
<button type="button" class="btn btn-lg btn-outline-success btn-arrow">Large Arrow Button</button>
{{< /example >}}

{{< example >}}
<button type="button" class="btn btn-red btn-arrow">Regular Arrow Button</button>
<button type="button" class="btn btn-blue btn-arrow">Regular Arrow Button</button>
<button type="button" class="btn btn-info btn-arrow">Regular Arrow Button</button>
<button type="button" class="btn btn-outline-success btn-arrow">Regular Arrow Button</button>
{{< /example >}}

{{< example >}}
<button type="button" class="btn btn-sm btn-red btn-arrow">Small Arrow Button</button>
<button type="button" class="btn btn-sm btn-blue btn-arrow">Small Arrow Button</button>
<button type="button" class="btn btn-sm btn-info btn-arrow">Small Arrow Button</button>
<button type="button" class="btn btn-sm btn-outline-success btn-arrow">Small Arrow Button</button>
{{< /example >}}

## Button Tags

The `.btn` classes are designed to be used with the `<button>` element. However, you can also use these classes on `<a>` or `<input>` elements (though some browsers may apply a slightly different rendering).

When using button classes on `<a>` elements that are used to trigger in-page functionality (like collapsing content), rather than linking to new pages or sections within the current page, these links should be given a `role="button"` to appropriately convey their purpose to assistive technologies such as screen readers.

{{< example >}}
<a class="btn btn-red" href="#" role="button">Link</a>
<button class="btn btn-red" type="submit">Button</button>
<input class="btn btn-red" type="button" value="Input">
<input class="btn btn-red" type="submit" value="Submit">
<input class="btn btn-red" type="reset" value="Reset">
{{< /example >}}

## Active State

Buttons will appear pressed (with a darker background, darker border, and inset shadow) when active. **There's no need to add a class to `<button>`s as they use a pseudo-class**. However, you can still force the same active appearance with `.active` (and include the <code>aria-pressed="true"</code> attribute) should you need to replicate the state programmatically.

{{< example >}}
<a href="#" class="btn btn-red btn-lg active" role="button" aria-pressed="true">Red link</a>
<a href="#" class="btn btn-blue btn-lg active" role="button" aria-pressed="true">Link</a>
{{< /example >}}

## Disabled State

Make buttons look inactive by adding the `disabled` boolean attribute to any `<button>` element.

{{< example >}}
<button type="button" class="btn btn-lg btn-red" disabled>Red button</button>
<button type="button" class="btn btn-blue btn-lg" disabled>Button</button>
{{< /example >}}

Disabled buttons using the `<a>` element behave a bit different:

- `<a>`s don't support the `disabled` attribute, so you must add the `.disabled` class to make it visually appear disabled.
- Some future-friendly styles are included to disable all `pointer-events` on anchor buttons. In browsers which support that property, you won't see the disabled cursor at all.
- Disabled buttons should include the `aria-disabled="true"` attribute to indicate the state of the element to assistive technologies.

{{< example >}}
<a href="#" class="btn btn-red btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Red link</a>
<a href="#" class="btn btn-blue btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Link</a>
{{< /example >}}

{{< callout warning >}}
##### Link Functionality Caveat

The `.disabled` class uses `pointer-events: none` to try to disable the link functionality of `<a>`s, but that CSS property is not yet standardized. In addition, even in browsers that do support `pointer-events: none`, keyboard navigation remains unaffected, meaning that sighted keyboard users and users of assistive technologies will still be able to activate these links. So to be safe, add a `tabindex="-1"` attribute on these links (to prevent them from receiving keyboard focus) and use custom JavaScript to disable their functionality.
{{< /callout >}}

## Button Plugin

Do more with buttons. Control button states or create groups of buttons for more components like toolbars.

### Toggle States

Add `data-toggle="button"` to toggle a button's `active` state. If you're pre-toggling a button, you must manually add the `.active` class **and** `aria-pressed="true"` to the `<button>`.

{{< example >}}
<button type="button" class="btn btn-red" data-toggle="button" aria-pressed="false">
  Single toggle
</button>
{{< /example >}}

### Checkbox and Radio Buttons

Bootstrap's `.button` styles can be applied to other elements, such as `<label>`s, to provide checkbox or radio style button toggling. Add `data-toggle="buttons"` to a `.btn-group` containing those modified buttons to enable their toggling behavior via JavaScript and add `.btn-group-toggle` to style the `<input>`s within your buttons. **Note that you can create single input-powered buttons or groups of them.**

The checked state for these buttons is **only updated via `click` event** on the button. If you use another method to update the input—e.g., with `<input type="reset">` or by manually applying the input's `checked` property—you'll need to toggle `.active` on the `<label>` manually.

Note that pre-checked buttons require you to manually add the `.active` class to the input's `<label>`.

{{< example >}}
<div class="btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-blue active">
    <input type="checkbox" checked> Checked
  </label>
</div>
{{< /example >}}

{{< example >}}
<div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-blue active">
    <input type="radio" name="options" id="option1" checked> Active
  </label>
  <label class="btn btn-blue">
    <input type="radio" name="options" id="option2"> Radio
  </label>
  <label class="btn btn-blue">
    <input type="radio" name="options" id="option3"> Radio
  </label>
</div>
{{< /example >}}

### Methods

| Method | Description |
| --- | --- |
| `$().button('toggle')` | Toggles push state. Gives the button the appearance that it has been activated. |
| `$().button('dispose')` | Destroys an element's button. |

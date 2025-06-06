---
layout: docs
title: Button group
description: Group a series of buttons together on a single line or stack them in a vertical column.
group: components
toc: true
---

## Basic example

Wrap a series of buttons with `.btn` in `.btn-group`.

{{< example >}}
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-red">Left</button>
  <button type="button" class="btn btn-red">Middle</button>
  <button type="button" class="btn btn-red">Right</button>
</div>
{{< /example >}}

{{< callout info >}}
Button groups require an appropriate `role` attribute and explicit label to ensure assistive technologies like screen readers identify buttons as grouped and announce them. Use `role="group"` for button groups or `role="toolbar"` for button toolbars. Then use `aria-label` or `aria-labelledby` to label them.
{{< /callout >}}

These classes can also be added to groups of links, as an alternative to the [`.nav` navigation components]({{< docsref "/components/navs-tabs" >}}).

{{< example >}}
<div class="btn-group">
  <a href="#" class="btn btn-red active" aria-current="page">Active link</a>
  <a href="#" class="btn btn-red">Link</a>
  <a href="#" class="btn btn-red">Link</a>
</div>
{{< /example >}}

## Mixed styles

{{< example >}}
<div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" class="btn btn-danger">Left</button>
  <button type="button" class="btn btn-warning">Middle</button>
  <button type="button" class="btn btn-success">Right</button>
</div>
{{< /example >}}

## Outlined styles

{{< example >}}
<div class="btn-group" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-red">Left</button>
  <button type="button" class="btn btn-outline-red">Middle</button>
  <button type="button" class="btn btn-outline-red">Right</button>
</div>
{{< /example >}}

## Checkbox and radio button groups

Combine button-like checkbox and radio [toggle buttons]({{< docsref "/forms/checks-radios" >}}) into a seamless looking button group.

{{< example >}}
<div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
  <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
  <label class="btn btn-outline-red" for="btncheck1">Checkbox 1</label>

  <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
  <label class="btn btn-outline-red" for="btncheck2">Checkbox 2</label>

  <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
  <label class="btn btn-outline-red" for="btncheck3">Checkbox 3</label>
</div>
{{< /example >}}

{{< example >}}
<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
  <label class="btn btn-outline-red" for="btnradio1">Radio 1</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
  <label class="btn btn-outline-red" for="btnradio2">Radio 2</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
  <label class="btn btn-outline-red" for="btnradio3">Radio 3</label>
</div>
{{< /example >}}

## Button toolbar

Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.

{{< example >}}
<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-red">1</button>
    <button type="button" class="btn btn-red">2</button>
    <button type="button" class="btn btn-red">3</button>
    <button type="button" class="btn btn-red">4</button>
  </div>
  <div class="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" class="btn btn-blue">5</button>
    <button type="button" class="btn btn-blue">6</button>
    <button type="button" class="btn btn-blue">7</button>
  </div>
  <div class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-info">8</button>
  </div>
</div>
{{< /example >}}

Feel free to mix input groups with button groups in your toolbars. Similar to the example above, you'll likely need some utilities though to space things properly.

{{< example >}}
<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-outline-blue">1</button>
    <button type="button" class="btn btn-outline-blue">2</button>
    <button type="button" class="btn btn-outline-blue">3</button>
    <button type="button" class="btn btn-outline-blue">4</button>
  </div>
  <div class="input-group">
    <div class="input-group-text" id="btnGroupAddon">@</div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
  </div>
</div>

<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
    <button type="button" class="btn btn-outline-blue">1</button>
    <button type="button" class="btn btn-outline-blue">2</button>
    <button type="button" class="btn btn-outline-blue">3</button>
    <button type="button" class="btn btn-outline-blue">4</button>
  </div>
  <div class="input-group">
    <div class="input-group-text" id="btnGroupAddon2">@</div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2">
  </div>
</div>
{{< /example >}}

## Sizing

Instead of applying button sizing classes to every button in a group, just add `.btn-group-*` to each `.btn-group`, including each one when nesting multiple groups.

{{< example >}}
<div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
  <button type="button" class="btn btn-outline-red">Left</button>
  <button type="button" class="btn btn-outline-red">Middle</button>
  <button type="button" class="btn btn-outline-red">Right</button>
</div>
<br>
<div class="btn-group" role="group" aria-label="Default button group">
  <button type="button" class="btn btn-outline-red">Left</button>
  <button type="button" class="btn btn-outline-red">Middle</button>
  <button type="button" class="btn btn-outline-red">Right</button>
</div>
<br>
<div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
  <button type="button" class="btn btn-outline-red">Left</button>
  <button type="button" class="btn btn-outline-red">Middle</button>
  <button type="button" class="btn btn-outline-red">Right</button>
</div>
{{< /example >}}

## Justified

<span class="badge badge-az-custom">Custom Arizona Bootstrap Class</span>

Add the `.btn-group-justified` class to your `.btn-group` to make each button in the group the same size and span the full-width of its containing `div`. The buttons will remain the same size, regardless of the amount of text in each button.

{{< example >}}
<div class="btn-group btn-group-justified" role="group" aria-label="Justified button group">
  <button type="button" class="btn btn-red">Left Button with More Text</button>
  <button type="button" class="btn btn-blue">Middle</button>
  <button type="button" class="btn btn-info">Right Button</button>
</div>
{{< /example >}}

```html
<div class="btn-group btn-group-lg" role="group" aria-label="...">...</div>
<div class="btn-group" role="group" aria-label="...">...</div>
<div class="btn-group btn-group-sm" role="group" aria-label="...">...</div>
```

## Nesting

Place a `.btn-group` within another `.btn-group` when you want dropdown menus mixed with a series of buttons.

{{< example >}}
<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="btn btn-red">1</button>
  <button type="button" class="btn btn-red">2</button>

  <div class="btn-group" role="group">
    <button type="button" class="btn btn-red dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>
{{< /example >}}

## Vertical variation

Make a set of buttons appear vertically stacked rather than horizontally. **Split button dropdowns are not supported here.**

{{< example >}}
<div class="btn-group-vertical" role="group" aria-label="Vertical button group">
  <button type="button" class="btn btn-red">Button</button>
  <button type="button" class="btn btn-red">Button</button>
  <button type="button" class="btn btn-red">Button</button>
  <button type="button" class="btn btn-red">Button</button>
</div>
{{< /example >}}

{{< example >}}
<div class="btn-group-vertical" role="group" aria-label="Vertical button group">
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-red dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
  <button type="button" class="btn btn-red">Button</button>
  <button type="button" class="btn btn-red">Button</button>
  <div class="btn-group dropstart" role="group">
    <button type="button" class="btn btn-red dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
  <div class="btn-group dropend" role="group">
    <button type="button" class="btn btn-red dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
  <div class="btn-group dropup" role="group">
    <button type="button" class="btn btn-red dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div class="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
  <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off" checked>
  <label class="btn btn-outline-danger" for="vbtn-radio1">Radio 1</label>
  <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off">
  <label class="btn btn-outline-danger" for="vbtn-radio2">Radio 2</label>
  <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio3" autocomplete="off">
  <label class="btn btn-outline-danger" for="vbtn-radio3">Radio 3</label>
</div>
{{< /example >}}

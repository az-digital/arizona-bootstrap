---
layout: docs
title: Colors
description: Convey meaning through `color` with a handful of color utility classes. Includes support for styling links with hover states, too.
group: utilities
toc: true
---

{{< callout info >}}
{{< partial "callouts/warning-color-assistive-technologies.md" >}}
{{< /callout >}}

## Colors

Colorize text with color utilities. If you want to colorize links, you can use the [`.link-*` helper classes]({{< docsref "/helpers/colored-links" >}}) which have `:hover` and `:focus` states.

## Types of colors

{{< ourname >}} offers two types of colors: brand colors and contextual (theme) colors.
 - Brand colors are a collection of Arizona-branded colors offered by the <a href="https://marcom.arizona.edu/brand-guidelines/colors" target="_blank">University Marketing & Communications website</a>.
  - Contextual colors are a smaller selection of colors that are used to convey meaning and contextual information (e.g., success, warning, danger).

When using these colors, it is important to maintain sufficient color contrast between your text color and background color. You can utilize the <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAim Color Contrast Checker</a> to verify your color contrast. Or, for your convenience, {{< ourname >}} also provides a [helpful tool]({{< docsref "/getting-started/color-contrast" >}}) to determine which brand text colors have sufficient color contrast on other brand background colors.


### Brand

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "colors") }}
<p class="text-{{ .name }}{{- if or (eq .name "cool-gray") (eq .name "warm-gray") (eq .name "silver")  (eq .name "white") }} bg-dark{{ end }}">.text-{{ .name }}</p>
{{- end -}}
{{< /colors.inline >}}
<p class="text-dark-silver">.text-dark-silver</p>
{{< /example >}}

### Contextual (Theme)

{{< callout info >}}
Color utilities like `.text-*` that generated from our original `$theme-colors` Sass map don't yet respond to color modes, however, any `.text-*-emphasis` utility will. This will be resolved in upstream Bootstrap v6.
{{< /callout >}}

{{< example >}}
{{< colors.inline >}}
{{- range (index $.Site.Data "theme-colors") -}}
<p class="text-{{ .name }}{{- if (ne .name "info") -}}{{ with .contrast_color }} bg-{{ . }}{{ end }}{{- end -}}">.text-{{ .name }}</p>
<p class="text-{{ .name }}-emphasis">.text-{{ .name }}-emphasis</p>
{{- end -}}
{{< /colors.inline >}}

<p class="text-body">.text-body</p>
<p class="text-body-emphasis">.text-body-emphasis</p>
<p class="text-body-secondary">.text-body-secondary</p>
<p class="text-body-tertiary">.text-body-tertiary</p>

<p class="text-black-50 bg-white">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
{{< /example >}}

{{< callout warning >}}
**Deprecation:** With the addition of `.text-opacity-*` utilities and CSS variables for text utilities, `.text-black-50` and `.text-white-50` are deprecated as of upstream Bootstrap v5.1.0. They'll be removed in v6.0.0.
{{< /callout >}}

{{< callout warning >}}
**Deprecation:** With the addition of the expanded theme colors and variables, the `.text-muted` utility has been deprecated as of v5.3.0. Its default value has also been reassigned to the new `--bs-secondary-color` CSS variable to better support color modes. It will be removed in upstream Bootstrap v6.0.0.
{{< /callout >}}

## Further information from upstream Bootstrap

### Opacity

{{< added-in "5.1.0" >}}

As of v5.1.0, text color utilities are generated with Sass using CSS variables. This allows for real-time color changes without compilation and dynamic alpha transparency changes.

#### How it works

Consider our default `.text-primary` utility.

```css
.text-primary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}
```

We use an RGB version of our `--bs-primary` (with the value of `13, 110, 253`) CSS variable and attached a second CSS variable, `--bs-text-opacity`, for the alpha transparency (with a default value `1` thanks to a local CSS variable). That means anytime you use `.text-primary` now, your computed `color` value is `rgba(13, 110, 253, 1)`. The local CSS variable inside each `.text-*` class avoids inheritance issues so nested instances of the utilities don't automatically have a modified alpha transparency.

#### Example

To change that opacity, override `--bs-text-opacity` via custom styles or inline styles.

{{< example >}}
<div class="text-primary">This is default primary text</div>
<div class="text-primary" style="--bs-text-opacity: .5;">This is 50% opacity primary text</div>
{{< /example >}}

Or, choose from any of the `.text-opacity` utilities:

{{< example >}}
<div class="text-primary">This is default primary text</div>
<div class="text-primary text-opacity-75">This is 75% opacity primary text</div>
<div class="text-primary text-opacity-50">This is 50% opacity primary text</div>
<div class="text-primary text-opacity-25">This is 25% opacity primary text</div>
{{< /example >}}

### Specificity

Sometimes contextual classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element's content in a `<div>` or more semantic element with the desired class.

### CSS

In addition to the following Sass functionality, consider reading about our included [CSS custom properties]({{< docsref "/customize/css-variables" >}}) (aka CSS variables) for colors and more.

#### Sass variables

Most `color` utilities are generated by our theme colors, reassigned from our generic color palette variables.

{{< scss-docs name="color-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="theme-color-variables" file="scss/_variables.scss" >}}

Grayscale colors are also available, but only a subset are used to generate any utilities.

{{< scss-docs name="gray-color-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="theme-text-map" file="scss/_maps.scss" >}}

Variables for setting colors in `.text-*-emphasis` utilities in light and dark mode:

{{< scss-docs name="theme-text-variables" file="scss/_variables.scss" >}}

{{< scss-docs name="theme-text-dark-variables" file="scss/_variables-dark.scss" >}}

#### Sass maps

Theme colors are then put into a Sass map so we can loop over them to generate our utilities, component modifiers, and more.

{{< scss-docs name="theme-colors-map" file="scss/_variables.scss" >}}

Grayscale colors are also available as a Sass map. **This map is not used to generate any utilities.**

{{< scss-docs name="gray-colors-map" file="scss/_variables.scss" >}}

RGB colors are generated from a separate Sass map:

{{< scss-docs name="theme-colors-rgb" file="scss/_maps.scss" >}}

Color opacities build on that with their own map that's consumed by the utilities API:

{{< scss-docs name="utilities-text-colors" file="scss/_maps.scss" >}}

Color mode adaptive text colors are also available as a Sass map:

{{< scss-docs name="theme-text-map" file="scss/_maps.scss" >}}

{{< scss-docs name="theme-text-dark-map" file="scss/_maps.scss" >}}

#### Sass utilities API

Color utilities are declared in our utilities API in `scss/_utilities.scss`. [Learn how to use the utilities API.]({{< docsref "/utilities/api#using-the-api" >}})

{{< scss-docs name="utils-color" file="scss/_utilities.scss" >}}

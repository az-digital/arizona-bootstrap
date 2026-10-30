---
layout: docs
title: Sass
description: Utilize our source Sass files to take advantage of variables, maps, mixins, and functions to help you build faster and customize your project.
group: customize
toc: true
---

Utilize our source Sass files to take advantage of variables, maps, mixins, and more.

## Using Arizona Bootstrap as a dependency

Install Arizona Bootstrap from a GitHub release tag and add Sass to your project:

```shell
npm install github:az-digital/arizona-bootstrap#v{{< param current_version >}}
npm install --save-dev sass
```

Bootstrap is a peer dependency. npm 7 and later install it automatically; with an older npm or Yarn 1, add `bootstrap` to your project yourself. If your project already uses a version of Bootstrap that doesn't match, npm stops with an error rather than installing a second copy. To include Arizona Bootstrap in your `scss/custom.scss`, use:

```scss
// Include any default variable overrides here.
@import "arizona-bootstrap/scss/arizona-bootstrap";

// Add your custom styles here.
```

Compile from your project root with `node_modules` on Sass's load path:

```shell
npx sass --load-path=node_modules scss/custom.scss css/custom.css
```

The load path resolves both Arizona Bootstrap and its `bootstrap/scss/...` imports, including when npm hoists Bootstrap into your project's `node_modules`. If you use the Sass JavaScript API, set `loadPaths: ['node_modules']` in the options passed to `sass.compile()`. Configure the equivalent load path in other build tools.

## File structure

Whenever possible, avoid modifying Arizona Bootstrap's or Bootstrap's core files. For Sass, that means creating your own stylesheet that imports Arizona Bootstrap so you can modify and extend it. Assuming you're using a package manager like npm, you'll have a file structure that looks like this:

```text
your-project/
├── scss/
│   └── custom.scss
├── node_modules/
│   ├── arizona-bootstrap/
│   │   ├── js/
│   │   └── scss/
│   └── bootstrap/
│       ├── js/
│       └── scss/
└── index.html
```

If you've downloaded our source files and aren't using a package manager, you'll want to manually create something similar to that structure, keeping Arizona Bootstrap's and Bootstrap's source files separate from your own. Name the folders `arizona-bootstrap` and `bootstrap`, and use the folder that contains them as Sass's load path, here `--load-path=.` instead of `--load-path=node_modules`.

```text
your-project/
├── scss/
│   └── custom.scss
├── arizona-bootstrap/
│   ├── js/
│   └── scss/
├── bootstrap/
│   ├── js/
│   └── scss/
└── index.html
```

## Importing

In your `custom.scss`, you'll import Arizona Bootstrap's source Sass files. You have two options: include all of Arizona Bootstrap, or pick the parts you need. Arizona Bootstrap's styles build on Bootstrap's and depend on each other, so we encourage the former. You also will need to include some JavaScript for our plugins.

```scss
// Custom.scss
// Option A: Include all of Arizona Bootstrap

// Include any default variable overrides here (though functions won't be available)

@import "arizona-bootstrap/scss/arizona-bootstrap";

// Then add additional custom code here
```

```scss
// Custom.scss
// Option B: Include parts of Arizona Bootstrap

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import "bootstrap/scss/functions";

// 2. Include any default variable overrides here

// 3. Include Arizona Bootstrap's variables, then the remainder of required Bootstrap stylesheets (including any separate color mode stylesheets)
@import "arizona-bootstrap/scss/design-tokens";
@import "arizona-bootstrap/scss/custom/variables";
@import "arizona-bootstrap/scss/override/variables";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";

// 4. Include any default map overrides here

// 5. Include remainder of required parts
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";

// 6. Optionally include any other parts as needed
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/images";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/helpers";

// 7. Optionally include utilities API last to generate classes based on the Sass map in `_utilities.scss`
@import "arizona-bootstrap/scss/override/utilities";
@import "arizona-bootstrap/scss/custom/utilities";
@import "bootstrap/scss/utilities/api";

// 8. Optionally include Arizona Bootstrap's parts as needed
@import "arizona-bootstrap/scss/custom/typography";
@import "arizona-bootstrap/scss/override/typography";

// 9. Add additional custom code here
```

With that setup in place, you can begin to modify any of the Sass variables and maps in your `custom.scss`. You can also start to add parts of Bootstrap under the `// Optional` section as needed. We suggest using the full import stack from our `scss/arizona-bootstrap.scss` file as your starting point. Its Arizona Bootstrap imports are relative to its own folder, so add the `arizona-bootstrap/scss/` prefix to them when you copy them.

## Compiling

In order to use your custom Sass code as CSS in the browser, you need a Sass compiler. Sass ships as a CLI package, but you can also compile it with other build tools like [Gulp](https://gulpjs.com/) or [Webpack](https://webpack.js.org/), or with a GUI applications. Some IDEs also have Sass compilers built in or as downloadable extensions.

We like to use the CLI to compile our Sass, but you can use whichever method you prefer. From your project root, run the following:

```shell
# Install Sass in your project
npm install --save-dev sass

# Watch your custom Sass for changes and compile it to CSS
npx sass --watch --load-path=node_modules scss/custom.scss css/custom.css
```

Learn more about your options at [sass-lang.com/install](https://sass-lang.com/install/) and [compiling with VS Code](https://code.visualstudio.com/docs/languages/css#_transpiling-sass-and-less-into-css).

## Including

Once your CSS is compiled, you can include it in your HTML files. Inside your `index.html` you'll want to include your compiled CSS file. Be sure to update the path to your compiled CSS file if you've changed it.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Custom Bootstrap</title>
    <link href="/css/custom.css" rel="stylesheet">
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

## Variable defaults

Every Sass variable in Bootstrap includes the `!default` flag allowing you to override the variable's default value in your own Sass without modifying Bootstrap's source code. Copy and paste variables as needed, modify their values, and remove the `!default` flag. If a variable has already been assigned, then it won't be re-assigned by the default values in Bootstrap.

You will find the complete list of Bootstrap's variables in `scss/_variables.scss`. Some variables are set to `null`, these variables don't output the property unless they are overridden in your configuration.

Variable overrides must come after our functions are imported, but before the rest of the imports.

Here's an example that changes the `background-color` and `color` for the `<body>` when importing and compiling Arizona Bootstrap via npm:

```scss
// Required
@import "bootstrap/scss/functions";

// Default variable overrides
$body-bg: #000;
$body-color: #111;

// Required
@import "arizona-bootstrap/scss/design-tokens";
@import "arizona-bootstrap/scss/custom/variables";
@import "arizona-bootstrap/scss/override/variables";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";

// Optional Bootstrap components here
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
// etc
```

Repeat as necessary for any variable in Arizona Bootstrap or Bootstrap, including the global options below.

## Maps and loops

Bootstrap includes a handful of Sass maps, key value pairs that make it easier to generate families of related CSS. We use Sass maps for our colors, grid breakpoints, and more. Just like Sass variables, all Sass maps include the `!default` flag and can be overridden and extended.

Some of our Sass maps are merged into empty ones by default. This is done to allow easy expansion of a given Sass map, but comes at the cost of making _removing_ items from a map slightly more difficult.

### Modify map

All variables in the `$theme-colors` map are defined as standalone variables. To modify an existing color in our `$theme-colors` map, add the following to your custom Sass file:

```scss
$primary: #0074d9;
$danger: #ff4136;
```

Later on, these variables are set in Bootstrap's `$theme-colors` map:

```scss
$theme-colors: (
  "primary": $primary,
  "danger": $danger
);
```

### Add to map

Add new colors to `$theme-colors`, or any other map, by creating a new Sass map with your custom values and merging it with the original map. In this case, we'll create a new `$custom-colors` map and merge it with `$theme-colors`.

```scss
// Create your own map
$custom-colors: (
  "custom-color": #900
);

// Merge the maps
$theme-colors: map-merge($theme-colors, $custom-colors);
```

### Remove from map

To remove colors from `$theme-colors`, or any other map, use `map-remove`. Be aware you must insert `$theme-colors` between our requirements just after its definition in `variables` and before its usage in `maps`:

```scss
// Required
@import "bootstrap/scss/functions";
@import "arizona-bootstrap/scss/design-tokens";
@import "arizona-bootstrap/scss/custom/variables";
@import "arizona-bootstrap/scss/override/variables";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";

$theme-colors: map-remove($theme-colors, "info", "light", "dark");

@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";

// Optional
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
// etc
```

## Required keys

Bootstrap assumes the presence of some specific keys within Sass maps as we used and extend these ourselves. As you customize the included maps, you may encounter errors where a specific Sass map's key is being used.

For example, we use the `primary`, `success`, and `danger` keys from `$theme-colors` for links, buttons, and form states. Replacing the values of these keys should present no issues, but removing them may cause Sass compilation issues. In these instances, you'll need to modify the Sass code that makes use of those values.

## Functions

### Colors

Next to the [Sass maps]({{< docsref "/customize/color#color-sass-maps" >}}) we have, theme colors can also be used as standalone variables, like `$primary`.

```scss
.custom-element {
  color: $gray-100;
  background-color: $dark;
}
```

You can lighten or darken colors with Bootstrap's `tint-color()` and `shade-color()` functions. These functions will mix colors with black or white, unlike Sass' native `lighten()` and `darken()` functions which will change the lightness by a fixed amount, which often doesn't lead to the desired effect.

`shift-color()` combines these two functions by shading the color if the weight is positive and tinting the color if the weight is negative.

{{< scss-docs name="color-functions" file="scss/_functions.scss" >}}

In practice, you'd call the function and pass in the color and weight parameters.

```scss
.custom-element {
  color: tint-color($primary, 10%);
}

.custom-element-2 {
  color: shade-color($danger, 30%);
}

.custom-element-3 {
  color: shift-color($success, 40%);
  background-color: shift-color($success, -60%);
}
```

### Color contrast

In order to meet the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG/) contrast requirements, authors **must** provide a minimum [text color contrast of 4.5:1](https://www.w3.org/TR/WCAG/#contrast-minimum) and a minimum [non-text color contrast of 3:1](https://www.w3.org/TR/WCAG/#non-text-contrast), with very few exceptions.

To help with this, we included the `color-contrast` function in Bootstrap. It uses the [WCAG contrast ratio algorithm](https://www.w3.org/TR/WCAG/#dfn-contrast-ratio) for calculating contrast thresholds based on [relative luminance](https://www.w3.org/TR/WCAG/#dfn-relative-luminance) in an `sRGB` color space to automatically return a light (`#fff`), dark (`#212529`) or black (`#000`) contrast color based on the specified base color. This function is especially useful for mixins or loops where you're generating multiple classes.

For example, to generate color swatches from our `$theme-colors` map:

```scss
@each $color, $value in $theme-colors {
  .swatch-#{$color} {
    color: color-contrast($value);
  }
}
```

It can also be used for one-off contrast needs:

```scss
.custom-element {
  color: color-contrast(#000); // returns `color: #fff`
}
```

You can also specify a base color with our color map functions:

```scss
.custom-element {
  color: color-contrast($dark); // returns `color: #fff`
}
```

### Escape SVG

We use the `escape-svg` function to escape the `<`, `>` and `#` characters for SVG background images. When using the `escape-svg` function, data URIs must be quoted.

### Add and Subtract functions

We use the `add` and `subtract` functions to wrap the CSS `calc` function. The primary purpose of these functions is to avoid errors when a "unitless" `0` value is passed into a `calc` expression. Expressions like `calc(10px - 0)` will return an error in all browsers, despite being mathematically correct.

Example where the calc is valid:

```scss
$border-radius: .25rem;
$border-width: 1px;

.element {
  // Output calc(.25rem - 1px) is valid
  border-radius: calc($border-radius - $border-width);
}

.element {
  // Output the same calc(.25rem - 1px) as above
  border-radius: subtract($border-radius, $border-width);
}
```

Example where the calc is invalid:

```scss
$border-radius: .25rem;
$border-width: 0;

.element {
  // Output calc(.25rem - 0) is invalid
  border-radius: calc($border-radius - $border-width);
}

.element {
  // Output .25rem
  border-radius: subtract($border-radius, $border-width);
}
```

## Mixins

Our `scss/mixins/` directory has a ton of mixins that power parts of Bootstrap and can also be used across your own project.

### Color schemes

A shorthand mixin for the `prefers-color-scheme` media query is available with support for `light` and `dark` color schemes. See [the color modes documentation]({{< docsref "/customize/color-modes" >}}) for information on our color mode mixin.

{{< scss-docs name="mixin-color-scheme" file="scss/mixins/_color-scheme.scss" >}}

```scss
.custom-element {
  @include color-scheme(light) {
    // Insert light mode styles here
  }

  @include color-scheme(dark) {
    // Insert dark mode styles here
  }
}
```

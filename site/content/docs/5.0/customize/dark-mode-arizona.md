---
layout: docs
title: Arizona Dark Mode
description: Learn how Arizona Bootstrap implements dark mode and how to use it in your projects.
group: customize
toc: true
---

## Arizona Bootstrap Dark Mode

Arizona Bootstrap supports dark mode through Bootstrap's color mode system. This document explains how Arizona-specific components and styles work with dark mode.

## Enabling Dark Mode

To enable dark mode for your entire site, add the `data-bs-theme="dark"` attribute to the `<html>` element:

```html
<!doctype html>
<html lang="en" data-bs-theme="dark">
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

You can also apply dark mode to specific components:

```html
<div class="card" data-bs-theme="dark">
  <!-- This card will use dark mode regardless of the global setting -->
</div>
```

## Arizona Brand Colors in Dark Mode

Arizona Bootstrap maintains brand consistency while ensuring proper contrast and readability in dark mode:

- **Headers and Navigation**: The Arizona Red header remains consistent in both light and dark modes
- **Headings**: Use a lighter blue color in dark mode for better contrast
- **Background**: Uses a very dark color with a subtle midnight tint
- **Interactive Elements**: Adjusted for proper contrast and visibility

## Component-Specific Dark Mode Styles

### Headings

Headings use the Arizona Sky Blue color in dark mode for better contrast against dark backgrounds.

```html
<h1>Arizona Heading</h1>
<h2>Secondary Heading</h2>
```

### Cards

Cards have adjusted background and border colors in dark mode.

```html
<div class="card">
  <div class="card-header">Card Header</div>
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content</p>
  </div>
</div>
```

### Navigation

The standard navbar adapts to dark mode, while the off-canvas menu maintains the Arizona Blue background for brand consistency.

```html
<nav class="navbar navbar-expand-lg navbar-light">
  <!-- Navigation content -->
</nav>
```

### Lists

Triangle lists use a lighter color in dark mode for better visibility.

```html
<ul class="ul-triangles">
  <li>List item one</li>
  <li>List item two</li>
</ul>
```

### Blockquotes

Blockquotes maintain their left border but use a lighter color in dark mode.

```html
<blockquote class="blockquote">
  <p>A well-known quote, contained in a blockquote element.</p>
</blockquote>
```

## Customizing Dark Mode

If you need to customize the dark mode appearance further, you can modify the CSS variables defined in `_variables-dark.scss`. These variables control the appearance of components in dark mode.

## JavaScript Toggle

To allow users to toggle between light and dark modes, you can implement a theme switcher using JavaScript:

```html
<button id="theme-toggle">Toggle Dark Mode</button>

<script>
  document.getElementById('theme-toggle').addEventListener('click', function() {
    const html = document.documentElement;
    if (html.getAttribute('data-bs-theme') === 'dark') {
      html.setAttribute('data-bs-theme', 'light');
    } else {
      html.setAttribute('data-bs-theme', 'dark');
    }
  });
</script>
```

## Accessibility Considerations

Dark mode improves accessibility for users who are sensitive to bright light or who prefer darker interfaces. Arizona Bootstrap's dark mode implementation ensures:

- Sufficient contrast between text and background colors
- Consistent focus indicators
- Readable text at various sizes
- Proper color contrast ratios for WCAG compliance
---
layout: docs
title: Accessibility
description: A brief overview of Arizona Bootstrap's features and limitations for the creation of accessible content.
group: getting-started
toc: true
---

{{< ourname >}} provides an easy-to-use framework of ready-made styles, layout tools, and interactive components, allowing developers to create websites and applications that are visually appealing, functionally rich, and accessible out of the box.

## Overview and Limitations

The overall accessibility of any project built with {{< ourname >}} depends in large part on the author's markup, additional styling, and scripting they've included. However, provided that these have been implemented correctly, it should be perfectly possible to create websites and applications with Bootstrap that fulfill [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1](https://www.w3.org/TR/WCAG/) (A/AA/AAA), [Section 508](https://www.section508.gov/) and similar accessibility standards and requirements.

### Structural Markup

{{< ourname >}}'s styling and layout can be applied to a wide range of markup structures. This documentation aims to provide developers with best practice examples to demonstrate the use of {{< ourname >}} itself and illustrate appropriate semantic markup, including ways in which potential accessibility concerns can be addressed.

### Interactive Components

{{< ourname >}}'s interactive components—such as modal dialogs, dropdown menus and custom tooltips—are designed to work for touch, mouse and keyboard users. Through the use of relevant [<abbr title="Web Accessibility Initiative">WAI</abbr>-<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](https://www.w3.org/WAI/standards-guidelines/aria/) roles and attributes, these components should also be understandable and operable using assistive technologies (such as screen readers).

Because {{< ourname >}}'s components are purposely designed to be fairly generic, authors may need to include further <abbr title="Accessible Rich Internet Applications">ARIA</abbr> roles and attributes, as well as JavaScript behavior, to more accurately convey the precise nature and functionality of their component. This is usually noted in the documentation.

### Color Contrast

Most colors that currently make up {{< ourname >}}'s default palette—used throughout the framework for things such as button variations, alert variations, form validation indicators—lead to *insufficient* color contrast (below the recommended [WCAG 2.1 text color contrast ratio of 4.5:1](https://www.w3.org/TR/WCAG/#contrast-minimum)) when used against a light background. Authors will need to manually modify/extend these default colors to ensure adequate color contrast ratios.

### Visually Hidden Content

Content which should be visually hidden, but remain accessible to assistive technologies such as screen readers, can be styled using the `.sr-only` class. This can be useful in situations where additional visual information or cues (such as meaning denoted through the use of color) need to also be conveyed to non-visual users.

```html
<p class="text-danger">
  <span class="sr-only">Danger: </span>
  This action is not reversible
</p>
```

For visually hidden interactive controls, such as traditional "skip" links, `.sr-only` can be combined with the `.sr-only-focusable` class. This will ensure that the control becomes visible once focused (for sighted keyboard users).

```html
<a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>
```

### Reduced Motion

{{< ourname >}} includes support for the [`prefers-reduced-motion` media feature](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion). In browsers/environments that allow the user to specify their preference for reduced motion, most CSS transition effects in {{< ourname >}} (for instance, when a modal dialog is opened or closed, or the sliding animation in carousels) will be disabled, and meaningful animations (such as spinners) will be slowed down.

## Additional Resources

- [IT Accessibility information from the Disability Resource Center](https://itaccessibility.arizona.edu/)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN accessibility documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Tenon.io Accessibility Checker](https://tenon.io/)
- [Color Contrast Analyser (CCA)](https://www.tpgi.com/color-contrast-checker/)
- ["HTML Codesniffer" bookmarklet for identifying accessibility issues](https://github.com/squizlabs/HTML_CodeSniffer)
- [Microsoft Accessibility Insights](https://accessibilityinsights.io/)
- [Deque Axe testing tools](https://www.deque.com/axe/)
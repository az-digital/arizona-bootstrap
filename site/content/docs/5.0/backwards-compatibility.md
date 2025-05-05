---
layout: docs
title: Backwards Compatibility
description: Some styles and classes available in Arizona Bootstrap 2 (Bootstrap 4) have been deprecated, replaced, or removed in Arizona Bootstrap 5 (Bootstrap 5).
group: backwards-compatibility
redirect_from:
  - "/backwards-compatibility/"
  - "/docs/5.0/backwards-compatibility/"
toc: true
---

## Overview

Although backwards compatibility is included for some components and utilities available in Arizona Bootstrap 2, it is highly recommended that you utilize the new classes available in {{< ourname >}}. They are simply included here to lessen the burden on site builders for migrating from Drupal sites using Arizona Bootstrap 2 to sites using {{< ourname >}}. All items that are included with backwards compatibility are built by extending the classes and styles available in {{< ourname >}}. Any items that were marked as "deprecated" in Arizona Bootstrap 2 do not include backwards compatibility; these items are listed in the [Removed Utilities]({{< docsref "/deprecated#removed-utility-classes" >}}) and [Removed Components]({{< docsref "/deprecated#removed-components" >}}) sections.


## Backwards Compatible Components

Arizona Bootstrap 2 utilized components that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of available classes. They have been included with backwards compatibility in Arizona Bootstrap 5 to avoid breaking changes.


## Backwards Compatible Utilities

Arizona Bootstrap 2 contained utility classes that are no longer supported/maintained in {{< ourname >}}, but can be replicated by utilizing a combination of classes. They have been included with backwards compatibility in Arizona Bootstrap 5 to avoid breaking changes.


## Removed Utility Classes

Components and utility classes that were marked as deprecated in Arizona Bootstrap 2 have been completely removed in {{< ourname >}}.


## Removed Components



## Removed JavaScript

Components listed in the JavaScript section of Arizona Bootstrap 2 (e.g., Modals, Tooltips, Popovers) have had certain methods, options, and events removed or changed in {{< ourname >}}. These items are not backwards compatible. They should not cause breaking changes, but if you are manually calling any of these methods, they will need to be updated to use the methods/events/functions that {{< ourname >}} uses. Refer to each individual component's documentation for an explanation of proper methods, options, and events.

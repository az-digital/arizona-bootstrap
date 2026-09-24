# Accessibility Review And Remediation Plan

## Review Metadata

- Repository: Arizona Bootstrap
- Review date: April 24, 2026
- Planning branch: `accessibility/planning-2026-04`
- Parent issue: [#1987 - Epic: remediate April 2026 accessibility review findings](https://github.com/az-digital/arizona-bootstrap/issues/1987)

## Setup Completed For Review

The repository needed local setup before the docs site could be reviewed in rendered form.

- Installed workspace dependencies with `npm install`
- Installed `jq` with `winget`
- Exposed Git for Windows `sh.exe` on the user `PATH`
- Generated `hugo.yml` from `hugo_template.yml` using the existing repository script
- Confirmed the docs site builds successfully with `npm run docs-build`

## Executive Summary

The highest-value accessibility fixes are in the documentation site, the published examples, and the copy-paste guidance rather than in the distributed runtime components.

The most important issues are:

1. Misleading and incomplete accessibility semantics in the Arizona header mobile offcanvas example
2. Broken collapse wiring in a published navbar example
3. Validation documentation that still publishes patterns already acknowledged as inaccessible
4. Docs shell issues that can create hidden focus or a weaker skip-link experience
5. Photo Gallery examples with inconsistent alternative text and repeated control names

The review also found residual risk around custom hover and focus behavior in the Arizona navbar and around custom focus-ring contrast. Those items need targeted verification even though they were not classified as confirmed defects from static inspection alone.

## Planning Outputs

### Parent Issue

- [#1987 - Epic: remediate April 2026 accessibility review findings](https://github.com/az-digital/arizona-bootstrap/issues/1987)

### Sub-Issues

- [#1988 - Fix mislabeled Arizona header mobile offcanvas example](https://github.com/az-digital/arizona-bootstrap/issues/1988)
- [#1989 - Correct broken collapse wiring in navbar wrapping example](https://github.com/az-digital/arizona-bootstrap/issues/1989)
- [#1990 - Fix Photo Gallery example accessible names and alt-text inconsistencies](https://github.com/az-digital/arizona-bootstrap/issues/1990)
- [#1991 - Align docs shell branding labels and disclose new-tab behavior](https://github.com/az-digital/arizona-bootstrap/issues/1991)
- [#1992 - Revise inaccessible validation guidance and checkout demo patterns](https://github.com/az-digital/arizona-bootstrap/issues/1992)
- [#1993 - Clean up docs shell focus and skip-link behavior](https://github.com/az-digital/arizona-bootstrap/issues/1993)
- [#1994 - Add accessibility regression checks and manual verification guidance](https://github.com/az-digital/arizona-bootstrap/issues/1994)

## Findings

### 1. Arizona Header Mobile Offcanvas Example

Severity: Major

The Arizona header mobile example publishes separate `Search` and `Menu` buttons that open the same offcanvas panel. The offcanvas also lacks an accessible name.

Impact:

- The `Search` label does not match the behavior exposed to users.
- Screen reader users may encounter an unnamed dialog-like region.
- Teams copying the example inherit a misleading pattern.

Evidence:

- [site/content/docs/5.1/components/arizona-header.md](site/content/docs/5.1/components/arizona-header.md)

Recommended direction:

- Rename the control or provide real search content.
- Add a visible offcanvas title and connect it with `aria-labelledby`.

Tracking issue:

- [#1988](https://github.com/az-digital/arizona-bootstrap/issues/1988)

### 2. Navbar Wrapping Example Uses Inconsistent Collapse References

Severity: Major

The navbar wrapping example uses different values for `data-bs-target`, `aria-controls`, and the collapse element `id`.

Impact:

- The published example is unreliable when copied.
- Assistive technologies receive a broken control relationship.
- This is a direct documentation defect rather than a theoretical concern.

Evidence:

- [site/content/docs/5.1/components/navbar.md](site/content/docs/5.1/components/navbar.md)

Recommended direction:

- Make the toggler and collapse container reference the same identifier everywhere.

Tracking issue:

- [#1989](https://github.com/az-digital/arizona-bootstrap/issues/1989)

### 3. Validation Guidance Still Publishes Known-Inaccessible Patterns

Severity: Major

The validation documentation already acknowledges that the client-side custom validation styles and tooltips are not accessible, but the page still publishes and demonstrates those patterns. The checkout demo also contains an unlabeled promo code field.

Impact:

- Consumers can copy inaccessible form validation guidance from the docs.
- Error feedback is not robustly associated and announced.
- The checkout demo includes a directly unlabeled control.

Evidence:

- [site/content/docs/5.1/forms/validation.md](site/content/docs/5.1/forms/validation.md)
- [site/content/docs/5.1/examples/checkout/index.html](site/content/docs/5.1/examples/checkout/index.html)
- [site/static/docs/5.1/assets/js/validate-forms.js](site/static/docs/5.1/assets/js/validate-forms.js)

Recommended direction:

- Move the docs toward accessible validation examples.
- Ensure error messages are programmatically tied to fields.
- Document a focus-management strategy for failed submission.
- Add a real label to the checkout promo code field.

Tracking issue:

- [#1992](https://github.com/az-digital/arizona-bootstrap/issues/1992)

### 4. Docs Shell Contains Hidden Focus Risk And Weak Skip-Link Targeting

Severity: Moderate

The docs layout includes a focusable input inside `aria-hidden` content. The global skip link targets the page heading instead of the main landmark.

Impact:

- Focus could land in content hidden from assistive technologies.
- Skip navigation works less directly than it should.
- The issue affects the docs shell rather than a single example page.

Evidence:

- [site/layouts/_default/docs.html](site/layouts/_default/docs.html)
- [site/layouts/_default/about.html](site/layouts/_default/about.html)
- [site/layouts/partials/skippy.html](site/layouts/partials/skippy.html)

Recommended direction:

- Remove the focusable element from the hidden subtree.
- Point skip navigation at the main landmark itself.
- Use the same skip-target strategy in docs and about layouts.

Tracking issue:

- [#1993](https://github.com/az-digital/arizona-bootstrap/issues/1993)

### 5. Photo Gallery Examples Use Inconsistent Alternative Text And Repeated Control Names

Severity: Moderate

The Photo Gallery docs reuse image assets with inconsistent alt text across examples. The grid variant also depends on repeated image alt text as the accessible name for multiple thumbnail buttons.

Impact:

- Screen reader users may hear contradictory descriptions for the same image.
- Repeated thumbnail controls are hard to distinguish.
- The problem is amplified because the component is intended to be copied.

Evidence:

- [site/content/docs/5.1/components/photo-gallery.md](site/content/docs/5.1/components/photo-gallery.md)

Recommended direction:

- Normalize alt text for reused images.
- Give repeated launch buttons distinct, action-oriented names when needed.
- Keep captions and alternative text aligned.

Tracking issue:

- [#1990](https://github.com/az-digital/arizona-bootstrap/issues/1990)

### 6. Docs Shell Branding And New-Tab Behavior Need Cleanup

Severity: Minor

The docs shell still labels Arizona Bootstrap brand links as `Bootstrap`, and several links open a new tab without any visible or assistive technology cue.

Impact:

- Accessible names do not consistently reflect the product name.
- New-tab context changes are less predictable than they should be.
- The issue affects navigation and supporting documentation rather than core component behavior.

Evidence:

- [site/layouts/partials/docs-navbar.html](site/layouts/partials/docs-navbar.html)
- [site/layouts/partials/footer.html](site/layouts/partials/footer.html)
- [site/content/docs/5.1/about/get-involved.md](site/content/docs/5.1/about/get-involved.md)

Recommended direction:

- Update accessible names to use Arizona Bootstrap consistently.
- Either disclose new-tab behavior consistently or stop forcing new tabs.

Tracking issue:

- [#1991](https://github.com/az-digital/arizona-bootstrap/issues/1991)

## Residual Risks And Follow-Up Verification

### 1. Arizona Navbar Hover And Focus Logic

The custom hover dropdown behavior in [js/src/navbar.js](js/src/navbar.js) is stateful and mixes pointer, focus, blur, and click handling. It should be manually tested with keyboard-only use and at least one Windows screen reader combination before it is treated as low risk.

Verification should cover:

- Opening and closing dropdowns with keyboard only
- Focus persistence and return behavior
- Mixed mouse and keyboard interactions
- Sibling dropdown closing behavior

### 2. Custom Focus-Ring Contrast

The custom focus-ring styling in the Arizona navbar and Photo Gallery should be verified against rendered backgrounds after compilation.

Relevant source areas:

- [scss/custom/_navbar.scss](scss/custom/_navbar.scss)
- [scss/custom/_photo-gallery.scss](scss/custom/_photo-gallery.scss)
- [scss/override/_variables.scss](scss/override/_variables.scss)

This item was not classified as a confirmed defect from static review alone, but it remains a candidate for failure depending on the final rendered colors and surfaces.

### 3. Missing Dedicated Accessibility Regression Coverage

The current package scripts build and lint the project, but they do not appear to run dedicated accessibility automation.

Relevant scripts:

- [package.json](package.json)

The follow-up work should decide whether to add automated checks, manual verification guidance, or both.

Tracking issue:

- [#1994](https://github.com/az-digital/arizona-bootstrap/issues/1994)

## Remediation Sequence

### Phase 1 - Fix Published High-Risk Docs Defects

Complete these first because they affect guidance and copied implementations directly.

1. [#1988](https://github.com/az-digital/arizona-bootstrap/issues/1988)
2. [#1989](https://github.com/az-digital/arizona-bootstrap/issues/1989)
3. [#1992](https://github.com/az-digital/arizona-bootstrap/issues/1992)
4. [#1993](https://github.com/az-digital/arizona-bootstrap/issues/1993)

### Phase 2 - Clean Up Supporting Content And Example Semantics

1. [#1990](https://github.com/az-digital/arizona-bootstrap/issues/1990)
2. [#1991](https://github.com/az-digital/arizona-bootstrap/issues/1991)

### Phase 3 - Lock In Regression Protection

1. [#1994](https://github.com/az-digital/arizona-bootstrap/issues/1994)

## Notes

- An earlier concern around `site/layouts/partials/docs-sidebar-about.html` was not carried forward into the final plan because the built site marks that template as unused.
- No code changes have been made yet beyond local environment setup and this planning document.
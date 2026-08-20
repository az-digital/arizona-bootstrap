/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: accordion.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

const ANCHOR_SELECTOR = '.accordion-anchor'
const COLLAPSE_TOGGLE_SELECTOR = '[data-bs-toggle="collapse"]'
const COPY_FEEDBACK_MS = 2000
const COPY_ICON = 'link'
const COPIED_ICON = 'check'

// Copy the accordion's direct link to the clipboard and give visual feedback,
// without navigating or toggling the panel on click.
function copyAnchorLink(event, anchor) {
  if (event) {
    event.stopPropagation()
    event.preventDefault()
  }

  const href = anchor.getAttribute('href') || ''
  const anchorId = href.startsWith('#') ? href.slice(1) : anchor.parentElement?.id
  if (!anchorId) {
    return
  }

  const baseUrl = window.location.href.split('#')[0]
  const urlToCopy = `${baseUrl}#${anchorId}`
  const feedbackSpan = anchor.querySelector('span') || anchor.children[0]

  if (!navigator.clipboard) {
    return
  }

  navigator.clipboard.writeText(urlToCopy).then(() => {
    if (!feedbackSpan) {
      return
    }

    feedbackSpan.innerHTML = COPIED_ICON
    setTimeout(() => {
      feedbackSpan.innerHTML = COPY_ICON
    }, COPY_FEEDBACK_MS)
  })
}

// Resolve the collapsible panel referenced by a URL hash. The hash may point at
// the panel itself or at an accordion heading whose toggle targets the panel.
function resolvePanelFromHash(hash) {
  const id = (hash || '').replace(/^#/, '')
  if (!id) {
    return null
  }

  const target = document.getElementById(id)
  if (!target) {
    return null
  }

  if (target.classList.contains('accordion-collapse')) {
    return target
  }

  const toggle = target.matches(COLLAPSE_TOGGLE_SELECTOR) ?
    target :
    target.querySelector(COLLAPSE_TOGGLE_SELECTOR)
  if (!toggle) {
    return null
  }

  const ariaControls = toggle.getAttribute('aria-controls')
  const selector = toggle.getAttribute('data-bs-target') || (ariaControls ? `#${ariaControls}` : '')

  return selector ? document.querySelector(selector) : null
}

// Scroll the accordion item into view, respecting reduced-motion preferences.
function scrollToPanel(panel) {
  const scrollTarget = panel.closest('.accordion-item') || panel
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true

  scrollTarget.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start'
  })
}

// Expand the panel referenced by the current URL hash, then scroll to it once
// the expand transition completes so the final position is accurate.
function openPanelFromHash() {
  const panel = resolvePanelFromHash(window.location.hash)
  if (!panel) {
    return
  }

  if (panel.classList.contains('show')) {
    scrollToPanel(panel)
    return
  }

  panel.addEventListener('shown.bs.collapse', () => scrollToPanel(panel), { once: true })
  Collapse.getOrCreateInstance(panel).show()
}

/**
 * Enable accordion anchor links: copy-to-clipboard on the anchor, plus
 * open-and-scroll-to the referenced panel when its link is in the URL.
 */
function enableAccordionAnchors() {
  if (typeof document === 'undefined') {
    return
  }

  // Delegate so anchors added after init still work and timing is not an issue.
  document.addEventListener('click', event => {
    const anchor = event.target.closest(ANCHOR_SELECTOR)
    if (anchor) {
      copyAnchorLink(event, anchor)
    }
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', openPanelFromHash, { once: true })
  } else {
    openPanelFromHash()
  }

  window.addEventListener('hashchange', openPanelFromHash)
}

export { enableAccordionAnchors as default }

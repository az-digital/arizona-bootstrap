/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: accordion.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'
import Tooltip from '../../node_modules/bootstrap/js/src/tooltip.js'

const ANCHOR_SELECTOR = '.accordion-anchor'
const COLLAPSE_TOGGLE_SELECTOR = '[data-bs-toggle="collapse"]'
const COPY_FEEDBACK_MS = 3000
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
  const feedbackTooltip = Tooltip.getInstance(anchor)

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
      feedbackTooltip.hide()
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

  // Check accordion dropdown
  const targetButton = target.querySelectorAll('button')
  if (targetButton[0] === null) {
    return null
  }

  if (!targetButton[0].classList.contains('collapsed')) {
    return null // Do nothing if the panel is already opened.
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

// Expand the panel referenced by the current URL hash, then scroll its
// heading into view once the show transition actually finishes. On a fresh
// page load, the browser's native fragment-scroll fires immediately, before
// this panel's sibling (if one was open, per data-bs-parent) has finished
// collapsing - so it commits to a resting position based on stale layout,
// holds there for the whole ~350ms transition, then gets corrected in a
// separate hop once this function's own scroll runs. That jump-pause-hop
// sequence reads as a stutter even when the correction itself is small.
function openPanelFromHash() {
  const panel = resolvePanelFromHash(window.location.hash)
  if (!panel) {
    return
  }

  const header = panel.closest('.accordion-item')?.querySelector('.accordion-header')
  const scrollHeaderIntoView = () => header?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (panel.classList.contains('show')) {
    scrollHeaderIntoView()
    return
  }

  // data-bs-parent means opening this panel also closes whichever sibling is
  // currently open. That sibling's hide transition is a separate Collapse
  // instance with its own independently-queued completion callback, so this
  // panel's shown.bs.collapse firing doesn't guarantee the sibling's own
  // hidden.bs.collapse has too - scrolling before it has can mean the page
  // is still settling underneath the scroll animation. Wait for both.
  const parentSelector = panel.getAttribute('data-bs-parent')
  const openSibling = parentSelector ?
    document.querySelector(parentSelector)?.querySelector('.accordion-collapse.show') :
    null
  const awaitedTransitions = openSibling && openSibling !== panel ? 2 : 1
  let settledTransitions = 0
  const onTransitionSettled = () => {
    settledTransitions += 1
    if (settledTransitions >= awaitedTransitions) {
      scrollHeaderIntoView()
    }
  }

  panel.addEventListener('shown.bs.collapse', onTransitionSettled, { once: true })
  if (openSibling && openSibling !== panel) {
    openSibling.addEventListener('hidden.bs.collapse', onTransitionSettled, { once: true })
  }

  Collapse.getOrCreateInstance(panel).show()
}

// Deferred a frame: the browser's own native fragment-scroll on a fresh load
// can otherwise race this code and run after it, undoing the reset in
// openPanelFromHash() before it has any effect.
function openInitialPanelFromHash() {
  requestAnimationFrame(() => openPanelFromHash(true))
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
    document.addEventListener('DOMContentLoaded', openInitialPanelFromHash, { once: true })
  } else {
    openInitialPanelFromHash()
  }

  window.addEventListener('hashchange', () => openPanelFromHash(false))
}

export { enableAccordionAnchors as default }

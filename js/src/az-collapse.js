/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: az-collapse.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Experimental az-collapse component.
 */
import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'
import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'
import SelectorEngine from '../../node_modules/bootstrap/js/src/dom/selector-engine.js'
import { isDisabled } from '../../node_modules/bootstrap/js/src/util/index.js'

/**
 * Constants
 */

const NAME = 'az-collapse'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`
const EVENT_MOUSEENTER_DATA_API = `mouseenter${EVENT_KEY}`
const EVENT_FOCUSIN_DATA_API = `focusin${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`
const EVENT_SHOW_BS_COLLAPSE = 'show.bs.collapse'
const EVENT_HIDE_BS_COLLAPSE = 'hide.bs.collapse'

const CLASS_NAME_COLLAPSED = 'collapsed'

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="az-collapse-hover"]'

const supportsPointerHover = () => typeof window !== 'undefined' && window.matchMedia?.(HOVER_MEDIA_QUERY)?.matches === true

/**
 * Updates aria-expanded and collapsed class on all az-collapse-hover triggers
 * that target a given panel element, to reflect the panel's shown state.
 * @param {Element} panel - The collapse panel element
 * @param {boolean} isShown - Whether the panel is being shown
 */
function updateTriggerAria(panel, isShown) {
  const panelId = panel.id
  if (!panelId) {
    return
  }

  for (const trigger of SelectorEngine.find(`${SELECTOR_DATA_TOGGLE}[data-bs-target="#${panelId}"]`)) {
    trigger.classList.toggle(CLASS_NAME_COLLAPSED, !isShown)
    trigger.setAttribute('aria-expanded', isShown)
  }
}

/**
 * Class definition
 */

class AzCollapse extends Collapse {
  // Getters
  static get NAME() {
    return NAME
  }

  static get DATA_KEY() {
    return DATA_KEY
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (event.target.tagName === 'A' || (event.delegateTarget && event.delegateTarget.tagName === 'A')) {
    event.preventDefault()
  }

  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    AzCollapse.getOrCreateInstance(element, { toggle: false }).toggle()
  }
})

// Limit hover activation to devices that actually support hover with a fine pointer.
EventHandler.on(document, EVENT_MOUSEENTER_DATA_API, SELECTOR_DATA_TOGGLE, function () {
  if (!supportsPointerHover() || isDisabled(this)) {
    return
  }

  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    AzCollapse.getOrCreateInstance(element, { toggle: false }).show()
  }
})

// Activate on focus so keyboard navigation into the trigger opens the matching panel.
EventHandler.on(document, EVENT_FOCUSIN_DATA_API, SELECTOR_DATA_TOGGLE, function () {
  if (isDisabled(this)) {
    return
  }

  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    AzCollapse.getOrCreateInstance(element, { toggle: false }).show()
  }
})

/**
 * Keep aria-expanded in sync on az-collapse-hover triggers whenever any
 * collapse panel targeted by them shows or hides (including accordion-driven
 * sibling closure that bypasses the AzCollapse instance).
 */
EventHandler.on(document, EVENT_SHOW_BS_COLLAPSE, event => {
  updateTriggerAria(event.target, true)
})

EventHandler.on(document, EVENT_HIDE_BS_COLLAPSE, event => {
  updateTriggerAria(event.target, false)
})

/**
 * Initialize aria on page load for any az-collapse-hover triggers that
 * start in an active state.
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const trigger of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
    const panel = SelectorEngine.getElementFromSelector(trigger)
    if (panel) {
      const isShown = panel.classList.contains('show')
      trigger.classList.toggle(CLASS_NAME_COLLAPSED, !isShown)
      trigger.setAttribute('aria-expanded', isShown)
    }
  }
})

export default AzCollapse

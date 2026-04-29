/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: az-tab.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Tab from '../../node_modules/bootstrap/js/src/tab.js'
import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'
import SelectorEngine from '../../node_modules/bootstrap/js/src/dom/selector-engine.js'
import { getNextActiveElement, isDisabled } from '../../node_modules/bootstrap/js/src/util/index.js'

/**
 * Constants
 */

const NAME = 'az-tab'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`
const EVENT_MOUSEENTER_DATA_API = `mouseenter${EVENT_KEY}`
const EVENT_FOCUSIN_DATA_API = `focusin${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'
const ARROW_UP_KEY = 'ArrowUp'
const ARROW_DOWN_KEY = 'ArrowDown'
const HOME_KEY = 'Home'
const END_KEY = 'End'

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="pill-hover"]'
const SELECTOR_DATA_TOGGLE_ACTIVE = '.active[data-bs-toggle="pill-hover"]'

const supportsPointerHover = () => typeof window !== 'undefined' && window.matchMedia?.(HOVER_MEDIA_QUERY)?.matches === true

/**
 * Class definition
 */

class AzTab extends Tab {
  // Getters
  static get NAME() {
    return NAME
  }

  _keydown(event) {
    if (!([ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key))) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    const children = this._getChildren().filter(element => !isDisabled(element))
    let nextActiveElement

    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1]
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key)
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true)
    }

    if (nextActiveElement) {
      nextActiveElement.focus({ preventScroll: true })
      AzTab.getOrCreateInstance(nextActiveElement).show()
    }
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(this)) {
    return
  }

  AzTab.getOrCreateInstance(this).show()
})

// Limit hover activation to devices that actually support hover with a fine pointer.
EventHandler.on(document, EVENT_MOUSEENTER_DATA_API, SELECTOR_DATA_TOGGLE, function () {
  if (!supportsPointerHover() || isDisabled(this)) {
    return
  }

  AzTab.getOrCreateInstance(this).show()
})

// Activate on focus so keyboard navigation into the trigger opens the matching panel.
EventHandler.on(document, EVENT_FOCUSIN_DATA_API, SELECTOR_DATA_TOGGLE, function () {
  if (isDisabled(this)) {
    return
  }

  AzTab.getOrCreateInstance(this).show()
})

/**
 * Initialize on focus
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    AzTab.getOrCreateInstance(element)
  }
})

export default AzTab

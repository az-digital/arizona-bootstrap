/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: offcanvasmenu.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from '../../node_modules/bootstrap/js/src/base-component.js'
import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'
import SelectorEngine from '../../node_modules/bootstrap/js/src/dom/selector-engine.js'
import Backdrop from '../../node_modules/bootstrap/js/src/util/backdrop.js'
import {
  defineJQueryPlugin,
  getElement,
  reflow
} from '../../node_modules/bootstrap/js/src/util/index.js'

/**
 * Constants
 */

const NAME = 'offcanvasmenu'
const AZ_VERSION = 'v0.0.4'
const DATA_KEY = 'az.offcanvasmenu'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_OPEN = `open${EVENT_KEY}`
const EVENT_OPENED = `opened${EVENT_KEY}`
const EVENT_CLOSE = `close${EVENT_KEY}`
const EVENT_CLOSED = `closed${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_OPEN = 'open'
const CLASS_NAME_CLOSE = 'offcanvasmenu-toggle'
const CLASS_NAME_CLOSING = 'closing'
const CLASS_NAME_CLOSED = 'closed'
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_CLOSE} .${CLASS_NAME_CLOSE}`

const CLASS_NAME_FREEZE = 'offcanvasmenu-toggle-body-freeze'
const CLASS_NAME_BACKDROP = 'offcanvasmenu-backdrop'

const SELECTOR_ACTIVES = '.open, .closing'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvasmenu"]'

const Default = {
  toggle: true,
  parent: null
}

const DefaultType = {
  toggle: 'boolean',
  parent: '(null|element)'
}

/**
 * Class definition
 */

class Offcanvasmenu extends BaseComponent {
  constructor(element, config) {
    super(element, config)

    this._isTransitioning = false
    this._triggerArray = []
    this._backdrop = this._initializeBackDrop()

    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE)

    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem)
      const filterElement = SelectorEngine.find(selector)
        .filter(foundElement => foundElement === this._element)

      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem)
      }
    }

    this._initializeChildren()

    if (!this._config.parent) {
      this._addAriaAndClosedClass(this._triggerArray, this._isOpen())
    }

    if (this._config.toggle) {
      this.toggle()
    }
  }

  // Getters

  static get AZ_VERSION() {
    return AZ_VERSION
  }

  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  // Public

  toggle() {
    if (this._isOpen()) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    if (this._isTransitioning || this._isOpen()) {
      return
    }

    let activeChildren = []

    // find active children
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES)
        .filter(element => element !== this._element)
        .map(element => Offcanvasmenu.getOrCreateInstance(element, { toggle: false }))
    }

    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_OPEN)
    if (startEvent.defaultPrevented) {
      return
    }

    for (const activeInstance of activeChildren) {
      activeInstance.close()
    }

    this._backdrop.show()

    this._element.classList.remove(CLASS_NAME_CLOSE)
    this._element.classList.add(CLASS_NAME_CLOSING)

    this._addAriaAndClosedClass(this._triggerArray, true)
    this._isTransitioning = true

    const complete = () => {
      this._isTransitioning = false

      this._element.classList.remove(CLASS_NAME_CLOSING)
      this._element.classList.add(CLASS_NAME_CLOSE, CLASS_NAME_OPEN)

      document.body.classList.add(CLASS_NAME_FREEZE)

      EventHandler.trigger(this._element, EVENT_OPENED)
    }

    this._queueCallback(complete, this._element)
  }

  close() {
    if (this._isTransitioning || !this._isOpen()) {
      return
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_CLOSE)
    if (startEvent.defaultPrevented) {
      return
    }

    reflow(this._element)

    this._element.classList.add(CLASS_NAME_CLOSING)
    this._element.classList.remove(CLASS_NAME_CLOSE, CLASS_NAME_OPEN)

    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger)

      if (element && !this._isOpen(element)) {
        this._addAriaAndClosedClass([trigger], false)
      }
    }

    this._isTransitioning = true

    const complete = () => {
      this._isTransitioning = false
      this._backdrop.hide()

      document.body.classList.remove(CLASS_NAME_FREEZE)

      this._element.classList.remove(CLASS_NAME_CLOSING)
      this._element.classList.add(CLASS_NAME_CLOSE)
      EventHandler.trigger(this._element, EVENT_CLOSED)
    }

    this._queueCallback(complete, this._element)
  }

  setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning
  }

  dispose() {
    this._backdrop.dispose()
    super.dispose()
  }

  // Private

  _isOpen(element = this._element) {
    return element.classList.contains(CLASS_NAME_OPEN)
  }

  _initializeBackDrop() {
    return new Backdrop({
      className: CLASS_NAME_BACKDROP
    })
  }

  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle) // Coerce string values
    config.parent = getElement(config.parent)
    return config
  }

  _initializeChildren() {
    if (!this._config.parent) {
      return
    }

    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE)

    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element)

      if (selected) {
        this._addAriaAndClosedClass([element], this._isOpen(selected))
      }
    }
  }

  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent)
    // remove children if greater depth
    return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element))
  }

  _addAriaAndClosedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return
    }

    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_CLOSED, !isOpen)
      element.setAttribute('aria-expanded', isOpen)
    }
  }

  // Static

  static jQueryInterface(config) {
    const _config = {}
    if (typeof config === 'string' && /open|close/.test(config)) {
      _config.toggle = false
    }

    return this.each(function () {
      const data = Offcanvasmenu.getOrCreateInstance(this, _config)

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

/**
 * Viewport conditional dropdown menu override for offcanvas menu.
 */

let VIEWPORT_WIDTH = false
const XS_BREAKPOINT_MAX = 767

// @TODO Use CSS breakpoint info, rather than seemingly arbitrary window width.
// Get the viewportWidth value.
function getViewportWidth() {
  VIEWPORT_WIDTH = window.innerWidth || document.documentElement.clientWidth
}

for (const element of SelectorEngine.find('.dropdown.keep-open .dropdown-toggle')) {
  EventHandler.on(element, 'click', event => {
    getViewportWidth()
    if (VIEWPORT_WIDTH < XS_BREAKPOINT_MAX) {
      if (event.target.hasAttribute('aria-expanded')) {
        event.target.parentElement.classList.remove('show')
        event.target.setAttribute('aria-expanded', false)
      } else {
        event.target.parentElement.classList.add('show')
        event.target.setAttribute('aria-expanded', true)
      }

      event.target.nextElementSibling.matches('.dropdown-menu').toggle()
      event.stopPropagation()
    }
  })
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || (event.delegateTarget && event.delegateTarget.tagName === 'A')) {
    event.preventDefault()
  }

  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    Offcanvasmenu.getOrCreateInstance(element, { toggle: false }).toggle()
  }
})

/**
 * jQuery
 */

defineJQueryPlugin(Offcanvasmenu)

export default Offcanvasmenu

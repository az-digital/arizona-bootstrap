/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: offcanvasmenu.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from '../../node_modules/bootstrap/js/src/util.js'
import { version } from '../../package.json'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME                = 'offcanvasmenu'
const AZ_VERSION          = `${version}`
const DATA_KEY            = 'az.offcanvasmenu'
const EVENT_KEY           = `.${DATA_KEY}`
const DATA_API_KEY        = '.data-api'
const JQUERY_NO_CONFLICT  = $.fn[NAME]

const Default = {
  toggle : true,
  parent : ''
}

const DefaultType = {
  toggle : 'boolean',
  parent : '(string|element)'
}

const EVENT_OPEN           = `open${EVENT_KEY}`
const EVENT_OPENED         = `opened${EVENT_KEY}`
const EVENT_CLOSE          = `close${EVENT_KEY}`
const EVENT_CLOSED         = `closed${EVENT_KEY}`
const TA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_OPEN      = 'open'
const CLASS_NAME_CLOSE     = 'offcanvas-toggle'
const CLASS_NAME_CLOSING   = 'closing'
const CLASS_NAME_CLOSED    = 'closed'

const SELECTOR_ACTIVES     = '.open, .closing'
const SELECTOR_DATA_TOGGLE = '[data-toggle="offcanvas"]'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Offcanvasmenu {
  constructor(element, config) {
    this._isTransitioning = false
    this._element         = element
    this._config          = this._getConfig(config)
    this._triggerArray    = [].slice.call(document.querySelectorAll(
      `[data-toggle="offcanvas"][href="#${element.id}"],` +
                                                                    `[data-toggle="offcanvas"][data-target="#${element.id}"]`
    ))

    const toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE))
    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i]
      const selector = Util.getSelectorFromElement(elem)
      const filterElement = [].slice.call(document.querySelectorAll(selector))
        .filter((foundElem) => foundElem === element)

      if (selector !== null && filterElement.length > 0) {
        this._selector = selector
        this._triggerArray.push(elem)
      }
    }

    this._parent = this._config.parent ? this._getParent() : null

    if (!this._config.parent) {
      this._addAriaAndOffcanvasmenudClass(this._element, this._triggerArray)
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

  // Public
  toggle() {
    if ($(this._element).hasClass(CLASS_NAME_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    if (this._isTransitioning ||
        $(this._element).hasClass(CLASS_NAME_OPEN)) {
      return
    }

    let actives
    let activesData

    if (this._parent) {
      actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES))
        .filter((elem) => {
          if (typeof this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === this._config.parent
          }

          return elem.classList.contains(CLASS_NAME_CLOSE)
        })

      if (actives.length === 0) {
        actives = null
      }
    }

    if (actives) {
      activesData = $(actives).not(this._selector).data(DATA_KEY)
      if (activesData && activesData._isTransitioning) {
        return
      }
    }

    const startEvent = $.Event(EVENT_OPEN)
    $(this._element).trigger(startEvent)
    if (startEvent.isDefaultPrevented()) {
      return
    }

    if (actives) {
      Offcanvasmenu._jQueryInterface.call($(actives).not(this._selector), 'close')
      if (!activesData) {
        $(actives).data(DATA_KEY, null)
      }
    }

    $(this._element)
      .removeClass(CLASS_NAME_CLOSE)
      .addClass(CLASS_NAME_CLOSING)

    if (this._triggerArray.length) {
      $(this._triggerArray)
        .removeClass(CLASS_NAME_CLOSED)
        .attr('aria-expanded', true)
    }

    this.setTransitioning(true)

    const complete = () => {
      $(this._element)
        .removeClass(CLASS_NAME_CLOSING)
        .addClass(`${CLASS_NAME_CLOSE} ${CLASS_NAME_OPEN}`)

      this.setTransitioning(false)

      $(this._element).trigger(EVENT_OPENED)
    }
    const transitionDuration = Util.getTransitionDurationFromElement(this._element)

    $(this._element)
      .one(Util.TRANSITION_END, complete)
      .emulateTransitionEnd(transitionDuration)
  }

  close() {
    if (this._isTransitioning ||
        !$(this._element).hasClass(CLASS_NAME_OPEN)) {
      return
    }

    const startEvent = $.Event(EVENT_CLOSE)
    $(this._element).trigger(startEvent)
    if (startEvent.isDefaultPrevented()) {
      return
    }

    Util.reflow(this._element)

    $(this._element)
      .addClass(CLASS_NAME_CLOSING)
      .removeClass(`${CLASS_NAME_CLOSE} ${CLASS_NAME_OPEN}`)

    const triggerArrayLength = this._triggerArray.length
    if (triggerArrayLength > 0) {
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i]
        const selector = Util.getSelectorFromElement(trigger)

        if (selector !== null) {
          const $elem = $([].slice.call(document.querySelectorAll(selector)))
          if (!$elem.hasClass(CLASS_NAME_OPEN)) {
            $(trigger).addClass(CLASS_NAME_CLOSED)
              .attr('aria-expanded', false)
          }
        }
      }
    }

    this.setTransitioning(true)

    const complete = () => {
      this.setTransitioning(false)
      $(this._element)
        .removeClass(CLASS_NAME_CLOSING)
        .addClass(CLASS_NAME_CLOSE)
        .trigger(EVENT_CLOSED)
    }

    const transitionDuration = Util.getTransitionDurationFromElement(this._element)

    $(this._element)
      .one(Util.TRANSITION_END, complete)
      .emulateTransitionEnd(transitionDuration)
  }

  setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning
  }

  dispose() {
    $.removeData(this._element, DATA_KEY)

    this._config          = null
    this._parent          = null
    this._element         = null
    this._triggerArray    = null
    this._isTransitioning = null
  }

  // Private

  _getConfig(config) {
    config = {
      ...Default,
      ...config
    }
    config.toggle = Boolean(config.toggle) // Coerce string values
    Util.typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  _getParent() {
    let parent

    if (Util.isElement(this._config.parent)) {
      parent = this._config.parent

      // It's a jQuery object
      if (typeof this._config.parent.jquery !== 'undefined') {
        parent = this._config.parent[0]
      }
    } else {
      parent = document.querySelector(this._config.parent)
    }

    const selector = `[data-toggle="offcanvas"][data-parent="${this._config.parent}"]`
    const children = [].slice.call(parent.querySelectorAll(selector))

    $(children).each((i, element) => {
      this._addAriaAndOffcanvasmenudClass(
        Offcanvasmenu._getTargetFromElement(element),
        [element]
      )
    })

    return parent
  }

  _addAriaAndOffcanvasmenudClass(element, triggerArray) {
    const isOpen = $(element).hasClass(CLASS_NAME_OPEN)

    if (triggerArray.length) {
      $(triggerArray)
        .toggleClass(CLASS_NAME_CLOSED, !isOpen)
        .attr('aria-expanded', isOpen)
    }
  }

  // Static

  static _getTargetFromElement(element) {
    const selector = Util.getSelectorFromElement(element)
    return selector ? document.querySelector(selector) : null
  }

  static _jQueryInterface(config) {
    return this.each(function () {
      const $this   = $(this)
      let data      = $this.data(DATA_KEY)
      const _config = {
        ...Default,
        ...$this.data(),
        ...typeof config === 'object' && config ? config : {}
      }

      if (!data && _config.toggle && typeof config === 'string' && /open|close/.test(config)) {
        _config.toggle = false
      }

      if (!data) {
        data = new Offcanvasmenu(this, _config)
        $this.data(DATA_KEY, data)
      }

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
 * ------------------------------------------------------------------------
 * Viewport conditional dropdown menu override for offcanvas meun.
 * ------------------------------------------------------------------------
 */

// Define our viewportWidth variable
let VIEWPORT_WIDTH = false
const XS_BREAKPOINT_MAX = 767

// @TODO Use CSS breakpoint info, rather than seemingly arbitrary window width.
// Set/update the viewportWidth value
function setViewportWidth() {
  VIEWPORT_WIDTH = window.innerWidth || document.documentElement.clientWidth
}

$('.dropdown.keep-open .dropdown-toggle').on('click', function (event) {
  setViewportWidth()
  if (VIEWPORT_WIDTH < XS_BREAKPOINT_MAX) {
    $(this).next('.dropdown-menu').toggle()
    event.stopPropagation()
  }
})

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

$(document).on(TA_API, SELECTOR_DATA_TOGGLE, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the
  // offcanvas element
  if (event.currentTarget.tagName === 'A') {
    event.preventDefault()
  }

  const $trigger = $(this)
  const selector = Util.getSelectorFromElement(this)
  const selectors = [].slice.call(document.querySelectorAll(selector))

  $(selectors).each(function () {
    const $target = $(this)
    const data    = $target.data(DATA_KEY)
    const config  = data ? 'toggle' : $trigger.data()
    Offcanvasmenu._jQueryInterface.call($target, config)
  })
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = Offcanvasmenu._jQueryInterface
$.fn[NAME].Constructor = Offcanvasmenu
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Offcanvasmenu._jQueryInterface
}

export default Offcanvasmenu


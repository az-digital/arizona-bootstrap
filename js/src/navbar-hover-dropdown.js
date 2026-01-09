/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-hover-dropdown.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'
import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'
const HIDE_DELAY_MS = 300

const supportsPointerHover = () => typeof window !== 'undefined' && window.matchMedia?.(HOVER_MEDIA_QUERY)?.matches === true

function getPrimaryDropdownTrigger(dropdownElement) {
  const splitToggle = dropdownElement.querySelector(':scope > .dropdown-toggle.dropdown-toggle-split')
  if (splitToggle instanceof HTMLElement) {
    return splitToggle
  }

  const toggle = dropdownElement.querySelector(':scope > .dropdown-toggle')
  if (toggle instanceof HTMLElement) {
    return toggle
  }

  return null
}

function closeOtherDropdowns(navbar, currentDropdownElement) {
  const openDropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown.show')
  for (const openDropdown of openDropdowns) {
    if (openDropdown === currentDropdownElement) {
      continue
    }

    if (!(openDropdown instanceof HTMLElement)) {
      continue
    }

    const trigger = getPrimaryDropdownTrigger(openDropdown)
    if (!trigger) {
      continue
    }

    const instance = Dropdown.getInstance(trigger)
    instance?.hide()
  }
}

class NavbarHoverDropdown extends Dropdown {
  constructor(element, dropdownElement, navbar, config) {
    super(element, config)

    this._dropdownElement = dropdownElement
    this._navbar = navbar
    this._hideTimer = null
    this._shouldCloseSiblings = dropdownElement.matches('.navbar-nav > .nav-item.dropdown')
    this._hoverTriggered = false
    this._suppressNextBlur = false

    if (supportsPointerHover()) {
      this._addHoverListeners()
    }
  }

  dispose() {
    this._removeHoverListeners()
    super.dispose()
  }

  _addHoverListeners() {
    if (!this._dropdownElement) {
      return
    }

    this._boundOnEnter = () => this._handleHoverEnter()
    this._boundOnLeave = () => this._handleHoverLeave()
    this._boundMenuEnter = () => this._cancelScheduledHide()
    this._boundMenuLeave = () => this._handleHoverLeave()
    this._boundOnFocus = event => this._handleFocus(event)
    this._boundOnBlur = event => this._handleBlur(event)

    EventHandler.on(this._element, 'mouseenter', this._boundOnEnter)
    EventHandler.on(this._element, 'mouseleave', this._boundOnLeave)
    EventHandler.on(this._element, 'focus', this._boundOnFocus)
    EventHandler.on(this._element, 'blur', this._boundOnBlur)
    EventHandler.on(this._dropdownElement, 'mouseleave', this._boundOnLeave)

    if (this._menu) {
      EventHandler.on(this._menu, 'mouseenter', this._boundMenuEnter)
      EventHandler.on(this._menu, 'mouseleave', this._boundMenuLeave)
    }
  }

  _removeHoverListeners() {
    if (!this._dropdownElement || !supportsPointerHover()) {
      return
    }

    EventHandler.off(this._element, 'mouseenter', this._boundOnEnter)
    EventHandler.off(this._element, 'mouseleave', this._boundOnLeave)
    EventHandler.off(this._element, 'focus', this._boundOnFocus)
    EventHandler.off(this._element, 'blur', this._boundOnBlur)
    EventHandler.off(this._dropdownElement, 'mouseleave', this._boundOnLeave)

    if (this._menu) {
      EventHandler.off(this._menu, 'mouseenter', this._boundMenuEnter)
      EventHandler.off(this._menu, 'mouseleave', this._boundMenuLeave)
    }
  }

  _handleHoverEnter() {
    this._cancelScheduledHide()
    this._hoverTriggered = true

    if (this._shouldCloseSiblings && this._navbar && this._dropdownElement) {
      closeOtherDropdowns(this._navbar, this._dropdownElement)
    }

    this.show()
    this._removePointerFocus()
  }

  _handleHoverLeave() {
    this._scheduleHide()
  }

  _handleFocus(event) {
    if (event.relatedTarget && this._menu?.contains(event.relatedTarget)) {
      return
    }

    this._cancelScheduledHide()
    this.show()
  }

  _handleBlur(event) {
    if (this._suppressNextBlur) {
      this._suppressNextBlur = false
      return
    }

    if (event.relatedTarget && this._menu?.contains(event.relatedTarget)) {
      return
    }

    this._scheduleHide()
  }

  _scheduleHide() {
    this._cancelScheduledHide()
    this._hideTimer = window.setTimeout(() => {
      this.hide()
    }, HIDE_DELAY_MS)
  }

  _cancelScheduledHide() {
    if (this._hideTimer) {
      window.clearTimeout(this._hideTimer)
      this._hideTimer = null
    }
  }

  _removePointerFocus() {
    if (!this._hoverTriggered) {
      return
    }

    if (document.activeElement === this._element) {
      this._suppressNextBlur = true
      this._element.blur()
    }

    this._hoverTriggered = false
  }
}

function enableAzNavbarHoverDropdowns() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const navbars = document.querySelectorAll('.navbar-az')
  if (!navbars.length) {
    return
  }

  if (!supportsPointerHover()) {
    return
  }

  for (const navbar of navbars) {
    EventHandler.on(navbar, 'mouseleave', () => {
      const openTriggers = navbar.querySelectorAll('.dropdown-toggle.show')

      for (const trigger of openTriggers) {
        Dropdown.getInstance(trigger)?.hide()
      }
    })

    const dropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown')

    for (const dropdownElement of dropdowns) {
      if (!(dropdownElement instanceof HTMLElement)) {
        continue
      }

      const triggerElement = getPrimaryDropdownTrigger(dropdownElement)
      if (!triggerElement) {
        continue
      }

      const existingInstance = Dropdown.getInstance(triggerElement)
      if (existingInstance && !(existingInstance instanceof NavbarHoverDropdown)) {
        existingInstance.dispose()
      }

      if (existingInstance instanceof NavbarHoverDropdown) {
        continue
      }

      createNavbarHoverDropdown(triggerElement, dropdownElement, navbar)
    }
  }
}

function createNavbarHoverDropdown(triggerElement, dropdownElement, navbar) {
  return new NavbarHoverDropdown(triggerElement, dropdownElement, navbar)
}

export { enableAzNavbarHoverDropdowns as default }

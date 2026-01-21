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

// Enable hover behavior only on fine-pointer devices to avoid touch conflicts.
const supportsPointerHover = () => typeof window !== 'undefined' && window.matchMedia?.(HOVER_MEDIA_QUERY)?.matches === true

function getPrimaryDropdownTrigger(dropdownElement) {
  const toggle = dropdownElement.querySelector(':scope > .dropdown-toggle')
  return toggle instanceof HTMLElement ? toggle : null
}

// Close sibling dropdowns unless they were opened via click.
function closeOtherDropdowns(navbar, currentDropdownElement) {
  const openTriggers = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown .dropdown-toggle.show')

  for (const trigger of openTriggers) {
    if (!(trigger instanceof HTMLElement)) {
      continue
    }

    const dropdownElement = trigger.closest('.navbar-nav > .nav-item.dropdown')
    if (!dropdownElement || dropdownElement === currentDropdownElement) {
      continue
    }

    const instance = Dropdown.getInstance(trigger)

    if (instance?.isClickOpen?.()) {
      continue
    }

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
    // State flags for hover/click coordination.
    this._hoverTriggered = false
    this._suppressNextBlur = false
    this._suppressNextFocus = false
    this._hoverOpen = false
    this._clickOpen = false
    this._pendingClick = false
    this._wasHoverOpened = false
    this._suppressHover = false
    this._ignoreNextToggle = false

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
    this._boundOnMouseDown = () => this._handleMouseDown()
    this._boundOnClick = event => this._handleClick(event)

    EventHandler.on(this._element, 'mouseenter', this._boundOnEnter)
    EventHandler.on(this._element, 'mouseleave', this._boundOnLeave)
    EventHandler.on(this._element, 'focus', this._boundOnFocus)
    EventHandler.on(this._element, 'blur', this._boundOnBlur)
    EventHandler.on(this._element, 'mousedown', this._boundOnMouseDown)
    EventHandler.on(this._element, 'click', this._boundOnClick)
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
    EventHandler.off(this._element, 'mousedown', this._boundOnMouseDown)
    EventHandler.off(this._element, 'click', this._boundOnClick)
    EventHandler.off(this._dropdownElement, 'mouseleave', this._boundOnLeave)

    if (this._menu) {
      EventHandler.off(this._menu, 'mouseenter', this._boundMenuEnter)
      EventHandler.off(this._menu, 'mouseleave', this._boundMenuLeave)
    }
  }

  // Hover opens the menu and closes hover-open siblings.
  _handleHoverEnter() {
    if (this._suppressHover) {
      return
    }

    this._cancelScheduledHide()
    this._hoverTriggered = true
    this._hoverOpen = true
    this._wasHoverOpened = true

    if (this._shouldCloseSiblings && this._navbar && this._dropdownElement) {
      closeOtherDropdowns(this._navbar, this._dropdownElement)
    }

    this._suppressNextFocus = true
    this.show()
    if (this._suppressNextFocus) {
      this._suppressNextFocus = false
    }

    this._removePointerFocus()
  }

  _handleHoverLeave() {
    this._suppressHover = false
    this._scheduleHide({ source: 'hover' })
  }

  // Focus opens the menu, but skips focus transitions into the menu.
  _handleFocus(event) {
    // Suppress focus triggered by click - the click handler manages that interaction
    if (this._suppressNextFocus) {
      this._suppressNextFocus = false
      return
    }

    if (event.relatedTarget && this._menu?.contains(event.relatedTarget)) {
      return
    }

    this._cancelScheduledHide()

    if (this._isShown()) {
      return
    }

    this._hoverOpen = false
    this._wasHoverOpened = false
    this.show()
  }

  // Blur schedules a hide unless focus moved into the menu.
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

  _handleMouseDown() {
    // Set flag before focus fires (event order: mousedown → focus → click)
    this._suppressNextFocus = true
  }

  // Click is handled here to prevent Bootstrap's delegated double-toggle.
  _handleClick(event) {
    event.preventDefault()
    event.stopImmediatePropagation()

    this._pendingClick = true
    this._cancelScheduledHide()
    this.toggle()
  }

  // Hide on hover-out, but never when the menu is click-open.
  _scheduleHide({ source } = {}) {
    this._cancelScheduledHide()

    if (this._clickOpen) {
      return
    }

    if (source === 'hover' && !this._hoverOpen) {
      return
    }

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

  /**
   * Handles click-driven toggling while preserving independent hover state.
   * The click handler sets `_pendingClick`, and this method processes that
   * click before Bootstrap's delegated toggle runs.
   *
   * Behavior:
   * - If a click occurs while the menu is hover-open, convert it to click-open.
   * - If already open via click, close and suppress immediate re-toggle.
   * - Otherwise open via click and mark `_clickOpen`.
   * - Ignore the next delegated `toggle()` invoked by Bootstrap after a handled click.
   */
  toggle() {
    if (this._pendingClick) {
      this._pendingClick = false
      this._ignoreNextToggle = true // Ignore Bootstrap's subsequent toggle call

      if (this._isShown()) {
        if (this._wasHoverOpened && !this._clickOpen) {
          this._clickOpen = true
          this._hoverOpen = false
          this._wasHoverOpened = false
          this._cancelScheduledHide()
          return
        }

        this._hoverOpen = false
        this._wasHoverOpened = false
        this._suppressHover = true
        super.hide()
        this._ignoreNextToggle = true
        this._clickOpen = this._isShown()
        return
      }

      this._hoverOpen = false
      this._wasHoverOpened = false
      this._cancelScheduledHide()
      super.show()
      this._clickOpen = this._isShown()
      return
    }

    // Ignore toggle calls from Bootstrap's delegated handler after we already processed the click
    if (this._ignoreNextToggle) {
      this._ignoreNextToggle = false
      return
    }

    return super.toggle()
  }

  hide() {
    this._hoverOpen = false
    this._clickOpen = false
    this._pendingClick = false
    this._ignoreNextToggle = false
    this._cancelScheduledHide()
    return super.hide()
  }

  _completeHide(relatedTarget) {
    this._hoverOpen = false
    this._clickOpen = false
    this._pendingClick = false
    this._ignoreNextToggle = false
    this._cancelScheduledHide()
    super._completeHide(relatedTarget)
  }

  // Remove focus after hover to avoid sticky focus rings.
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

  isClickOpen() {
    return this._clickOpen
  }
}

// Wire up hover dropdowns for AZ navbars and global outside interactions.
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

  const handleOutsideInteraction = event => {
    const target = event?.target
    if (!(target instanceof Node)) {
      return
    }

    for (const navbar of navbars) {
      const openTriggers = navbar.querySelectorAll('.dropdown-toggle.show')

      for (const trigger of openTriggers) {
        const instance = Dropdown.getInstance(trigger)

        if (!(instance instanceof NavbarHoverDropdown) || !instance.isClickOpen()) {
          continue
        }

        const dropdownElement = trigger.closest('.navbar-nav > .nav-item.dropdown')
        if (!dropdownElement || dropdownElement.contains(target)) {
          continue
        }

        instance.hide()
      }
    }
  }

  EventHandler.on(document, 'click', handleOutsideInteraction)
  EventHandler.on(document, 'focusin', handleOutsideInteraction)

  for (const navbar of navbars) {
    EventHandler.on(navbar, 'mouseover', event => {
      const target = event?.target
      if (!(target instanceof Element)) {
        return
      }

      const navList = target.closest('.navbar-nav')
      if (!navList) {
        return
      }

      const openTriggers = navbar.querySelectorAll('.dropdown-toggle.show')

      for (const trigger of openTriggers) {
        const instance = Dropdown.getInstance(trigger)

        if (!(instance instanceof NavbarHoverDropdown) || instance.isClickOpen()) {
          continue
        }

        if (!instance._hoverOpen) {
          continue
        }

        const dropdownElement = trigger.closest('.navbar-nav .nav-item.dropdown')
        if (dropdownElement) {
          const menuElement = instance._menu || dropdownElement.querySelector('.dropdown-menu')
          const isInsideToggle = trigger.contains(target)
          const isInsideMenu = menuElement instanceof Element && menuElement.contains(target)

          if (isInsideToggle || isInsideMenu) {
            continue
          }
        }

        instance._scheduleHide({ source: 'hover' })
      }
    })

    EventHandler.on(navbar, 'mouseleave', () => {
      const openTriggers = navbar.querySelectorAll('.dropdown-toggle.show')

      for (const trigger of openTriggers) {
        const instance = Dropdown.getInstance(trigger)

        if (instance instanceof NavbarHoverDropdown) {
          if (instance.isClickOpen()) {
            continue
          }

          instance._scheduleHide({ source: 'navbar' })
          continue
        }

        instance?.hide()
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

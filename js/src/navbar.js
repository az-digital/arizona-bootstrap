/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'
import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'
import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'
const HIDE_DELAY_MS = 300
const RESIZE_DEBOUNCE_MS = 100

// Enable hover behavior only on fine-pointer devices to avoid touch conflicts.
const supportsPointerHover = () => typeof window !== 'undefined' && window.matchMedia?.(HOVER_MEDIA_QUERY)?.matches === true

/**
 * Calculate and set the max-width for dropdown menus in a navbar-az to half
 * the navbar width, and toggle `dropdown-menu-end` on dropdowns positioned
 * past the midpoint that would otherwise overflow.
 */
function updateDropdownAlignment(navbar) {
  const navbarWidth = navbar.offsetWidth
  const halfWidth = Math.floor(navbarWidth / 2)

  // Set the CSS custom property so dropdown-menu max-width stays in sync.
  navbar.style.setProperty('--az-navbar-dropdown-max-width', `${halfWidth}px`)

  const dropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown')

  for (const dropdown of dropdowns) {
    const menu = dropdown.querySelector(':scope > .dropdown-menu')
    if (!menu) {
      continue
    }

    // Determine this dropdown's horizontal position relative to the navbar.
    const navbarRect = navbar.getBoundingClientRect()
    const dropdownRect = dropdown.getBoundingClientRect()
    const dropdownStart = dropdownRect.left - navbarRect.left
    const remainingSpace = navbarRect.right - dropdownRect.left

    // Only right-align if the dropdown is past the midpoint AND its max-content
    // width would overflow the remaining space to the right of the navbar.
    // We temporarily measure the menu's natural width to make this determination.
    // The menu may be hidden (display:none), so we must briefly make it visible
    // off-screen to get an accurate measurement.
    const wasHidden = window.getComputedStyle(menu).display === 'none'
    if (wasHidden) {
      menu.style.display = 'block'
      menu.style.visibility = 'hidden'
      menu.style.position = 'absolute'
    }

    const savedMaxWidth = menu.style.maxWidth
    const savedWidth = menu.style.width
    menu.style.maxWidth = 'none'
    menu.style.width = 'max-content'
    const naturalWidth = menu.scrollWidth
    menu.style.maxWidth = savedMaxWidth
    menu.style.width = savedWidth

    if (wasHidden) {
      menu.style.display = ''
      menu.style.visibility = ''
      menu.style.position = ''
    }

    if (dropdownStart > halfWidth && naturalWidth > remainingSpace) {
      menu.classList.add('dropdown-menu-end')
    } else {
      menu.classList.remove('dropdown-menu-end')
    }
  }
}

/**
 * Set up a ResizeObserver to keep dropdown alignment in sync with the navbar
 * width (handles viewport changes, container resizing, etc.).
 */
function observeNavbarResize(navbar) {
  if (typeof ResizeObserver === 'undefined') {
    return
  }

  let resizeTimer = null

  const observer = new ResizeObserver(() => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }

    resizeTimer = setTimeout(() => {
      updateDropdownAlignment(navbar)
    }, RESIZE_DEBOUNCE_MS)
  })

  observer.observe(navbar)
}

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
    this._initialCollapseStates = this._captureCollapseStates()
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
    this._resetCollapseState()
    return super.hide()
  }

  _completeHide(relatedTarget) {
    this._hoverOpen = false
    this._clickOpen = false
    this._pendingClick = false
    this._ignoreNextToggle = false
    this._cancelScheduledHide()
    this._resetCollapseState()
    super._completeHide(relatedTarget)
  }

  /**
   * Snapshot the initial show/hide state of each `.collapse` submenu inside
   * this dropdown's menu, based on the server-rendered HTML at page load.
   */
  _captureCollapseStates() {
    const menu = this._menu || this._dropdownElement?.querySelector('.dropdown-menu')
    if (!menu) {
      return new Map()
    }

    const states = new Map()
    const collapses = menu.querySelectorAll('.collapse')
    for (const collapse of collapses) {
      states.set(collapse, collapse.classList.contains('show'))
    }

    return states
  }

  /**
   * Reset every `.collapse` submenu inside this dropdown's menu back to its
   * initial page-load state (determined by `.active` placement in the HTML).
   */
  _resetCollapseState() {
    if (!this._initialCollapseStates || this._initialCollapseStates.size === 0) {
      return
    }

    const menu = this._menu || this._dropdownElement?.querySelector('.dropdown-menu')
    const togglesByTarget = new Map()

    if (menu) {
      const toggles = menu.querySelectorAll('[data-bs-target]')
      for (const toggle of toggles) {
        const target = toggle.getAttribute('data-bs-target')
        if (target) {
          togglesByTarget.set(target, toggle)
        }
      }
    }

    for (const [collapse, wasShown] of this._initialCollapseStates) {
      const isShown = collapse.classList.contains('show')

      if (wasShown === isShown) {
        continue
      }

      const instance = Collapse.getOrCreateInstance(collapse, { toggle: false })

      if (wasShown) {
        instance.show()
      } else {
        instance.hide()
      }

      // Sync the toggle button's aria-expanded attribute.
      if (collapse.id) {
        const toggle = togglesByTarget.get(`#${collapse.id}`)
        if (toggle) {
          toggle.setAttribute('aria-expanded', String(wasShown))
        }
      }
    }
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
function enableAzNavbar() {
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
    // Set initial dropdown alignment and start observing resize changes.
    updateDropdownAlignment(navbar)
    observeNavbarResize(navbar)

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

export { enableAzNavbar as default }

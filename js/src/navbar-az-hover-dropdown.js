/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-hover-dropdown.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

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

function enableAzNavbarHoverDropdowns() {
  if (typeof document === 'undefined') {
    return
  }

  const navbars = document.querySelectorAll('.navbar-az')
  if (!navbars.length) {
    return
  }

  // Only apply hover behavior if device supports hover and fine pointer
  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? false
  if (!canHover) {
    return
  }

  const hideDelayMs = 300
  const hideTimers = new WeakMap()

  const cancelHide = dropdownElement => {
    const timer = hideTimers.get(dropdownElement)
    if (timer) {
      clearTimeout(timer)
    }

    hideTimers.delete(dropdownElement)
  }

  const scheduleHide = (dropdownElement, instance) => {
    cancelHide(dropdownElement)

    const timer = setTimeout(() => {
      // Force hide without checking for focus, as hover preference dictates closing on leave
      instance.hide()
    }, hideDelayMs)

    hideTimers.set(dropdownElement, timer)
  }

  for (const navbar of navbars) {
    const dropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown')

    for (const dropdownElement of dropdowns) {
      if (!(dropdownElement instanceof HTMLElement)) {
        continue
      }

      const triggerElement = getPrimaryDropdownTrigger(dropdownElement)
      if (!triggerElement) {
        continue
      }

      const menuElement = dropdownElement.querySelector(':scope > .dropdown-menu')
      const instance = Dropdown.getOrCreateInstance(triggerElement)

      const show = () => {
        cancelHide(dropdownElement)
        closeOtherDropdowns(navbar, dropdownElement)
        instance.show()
      }

      // Trigger hover events
      triggerElement.addEventListener('mouseenter', show)
      triggerElement.addEventListener('mouseleave', () => {
        scheduleHide(dropdownElement, instance)
      })

      // Menu hover events (keep open while hovering menu)
      if (menuElement) {
        menuElement.addEventListener('mouseenter', () => {
          cancelHide(dropdownElement)
        })
        menuElement.addEventListener('mouseleave', () => {
          scheduleHide(dropdownElement, instance)
        })
      }

      // Container catch-all (optional but safe)
      dropdownElement.addEventListener('mouseleave', () => {
        scheduleHide(dropdownElement, instance)
      })
    }
  }
}

export { enableAzNavbarHoverDropdowns as default }

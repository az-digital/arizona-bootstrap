/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-fullscreen.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../../node_modules/bootstrap/js/src/dom/event-handler.js'

const DESKTOP_MEDIA_QUERY = '(min-width: 992px)'
const RESIZE_DEBOUNCE_MS = 100
const FULLSCREEN_MODAL_SELECTOR = '.navbar-az-fullscreen-modal'
const FULLSCREEN_MODAL_RESET_EVENT = 'az.navbar-fullscreen.reset'
const NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-nav-col'
const COLLAPSE_SELECTOR = '.collapse[id]'
const COLLAPSE_TOGGLE_SELECTOR = '[data-bs-toggle="collapse"]'
const PRIMARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-nav-col-primary'
const PRIMARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-primary'
const SECONDARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-secondary'
const TERTIARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-tertiary'
const COLLAPSING_SUBMENU_SELECTOR = '.navbar-az-fullscreen-modal-menu-submenu.collapsing'
const ACTIVE_SECONDARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-primary-submenu.collapse.show .navbar-az-fullscreen-modal-menu-nav-col-secondary'
const ACTIVE_TERTIARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-secondary-submenu.collapse.show .navbar-az-fullscreen-modal-menu-nav-col-tertiary'

function isDesktopViewport() {
  return typeof window !== 'undefined' && window.matchMedia?.(DESKTOP_MEDIA_QUERY)?.matches === true
}

function isVisible(element) {
  if (!(element instanceof HTMLElement)) {
    return false
  }

  if (element.getClientRects().length === 0) {
    return false
  }

  const computedStyle = window.getComputedStyle(element)
  return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden'
}

function getDesktopVisibleNavColumns(modalElement) {
  const allColumns = modalElement.querySelectorAll(NAV_COL_SELECTOR)
  return [...allColumns].filter(isVisible)
}

function getVisibleNavTargets(modalElement) {
  const targets = []

  for (const column of getDesktopVisibleNavColumns(modalElement)) {
    const nav = column.querySelector(':scope > .nav')
    if (!(nav instanceof HTMLElement) || !isVisible(nav)) {
      continue
    }

    targets.push({ nav, column })
  }

  return targets
}

function getActiveDesktopNavTargets(modalElement) {
  const targets = []
  const seenColumns = new Set()

  const addTarget = nav => {
    if (!(nav instanceof HTMLElement) || !isVisible(nav)) {
      return
    }

    const column = nav.closest(NAV_COL_SELECTOR)
    if (!(column instanceof HTMLElement) || !isVisible(column) || seenColumns.has(column)) {
      return
    }

    seenColumns.add(column)
    targets.push({ nav, column })
  }

  addTarget(modalElement.querySelector(`${PRIMARY_NAV_COL_SELECTOR} > ${PRIMARY_NAV_SELECTOR}`))

  for (const nav of modalElement.querySelectorAll(`${ACTIVE_SECONDARY_NAV_COL_SELECTOR} > ${SECONDARY_NAV_SELECTOR}`)) {
    addTarget(nav)
  }

  for (const nav of modalElement.querySelectorAll(`${ACTIVE_TERTIARY_NAV_COL_SELECTOR} > ${TERTIARY_NAV_SELECTOR}`)) {
    addTarget(nav)
  }

  return targets.length > 0 ? targets : getVisibleNavTargets(modalElement)
}

function clearNavColumnHeights(modalElement) {
  const allColumns = modalElement.querySelectorAll(NAV_COL_SELECTOR)
  for (const column of allColumns) {
    if (column instanceof HTMLElement) {
      column.style.height = ''
      column.style.flexGrow = ''
      column.style.flexShrink = ''
      column.style.flexBasis = ''
    }
  }
}

function getNumericCssValue(value) {
  const numericValue = Number.parseFloat(value)
  return Number.isFinite(numericValue) ? numericValue : 0
}

function getNavContentHeight(navElement) {
  const navItems = navElement.querySelectorAll(':scope > .nav-item')
  if (!navItems.length) {
    return Math.ceil(navElement.getBoundingClientRect().height)
  }

  let totalHeight = 0
  for (const navItem of navItems) {
    if (navItem instanceof HTMLElement && isVisible(navItem)) {
      totalHeight += navItem.getBoundingClientRect().height
    }
  }

  const computedStyle = window.getComputedStyle(navElement)
  totalHeight += getNumericCssValue(computedStyle.paddingTop)
  totalHeight += getNumericCssValue(computedStyle.paddingBottom)
  totalHeight += getNumericCssValue(computedStyle.borderTopWidth)
  totalHeight += getNumericCssValue(computedStyle.borderBottomWidth)

  return Math.ceil(totalHeight)
}

function getUniqueColumns(targets) {
  const columns = []
  const seen = new Set()

  for (const target of targets) {
    const column = target?.column
    if (column instanceof HTMLElement && !seen.has(column)) {
      seen.add(column)
      columns.push(column)
    }
  }

  return columns
}

function synchronizeNavColumnHeights(modalElement) {
  if (!isDesktopViewport()) {
    clearNavColumnHeights(modalElement)
    return
  }

  const modalBody = modalElement.querySelector('.modal-body')
  if (!(modalBody instanceof HTMLElement)) {
    return
  }

  const isCollapseTransitioning = modalElement.querySelector(COLLAPSING_SUBMENU_SELECTOR) instanceof HTMLElement
  const activeTargets = isCollapseTransitioning ? getVisibleNavTargets(modalElement) : getActiveDesktopNavTargets(modalElement)
  if (activeTargets.length === 0) {
    return
  }

  clearNavColumnHeights(modalElement)

  let tallestVisibleContent = 0
  for (const target of activeTargets) {
    tallestVisibleContent = Math.max(tallestVisibleContent, getNavContentHeight(target.nav))
  }

  const maxAvailableHeight = modalBody.clientHeight
  const syncedHeight = Math.min(tallestVisibleContent, maxAvailableHeight)
  const visibleColumns = isCollapseTransitioning ? getDesktopVisibleNavColumns(modalElement) : getUniqueColumns(activeTargets)

  for (const column of visibleColumns) {
    // Secondary/tertiary columns can be flex-grown by CSS; lock flex sizing
    // during sync so inline height can consistently control divider length.
    column.style.flexGrow = '0'
    column.style.flexShrink = '0'
    column.style.flexBasis = 'auto'
    column.style.height = `${syncedHeight}px`
  }
}

function debounce(callback, waitMs) {
  let timerId = null

  return (...arguments_) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      callback(...arguments_)
    }, waitMs)
  }
}

function captureModalDefaultState(modalElement) {
  const collapseStates = []
  for (const collapseElement of modalElement.querySelectorAll(COLLAPSE_SELECTOR)) {
    if (collapseElement instanceof HTMLElement) {
      collapseStates.push({
        id: collapseElement.id,
        isShown: collapseElement.classList.contains('show')
      })
    }
  }

  const toggleStates = []
  for (const toggleElement of modalElement.querySelectorAll(COLLAPSE_TOGGLE_SELECTOR)) {
    if (toggleElement instanceof HTMLElement) {
      toggleStates.push({
        element: toggleElement,
        isCollapsed: toggleElement.classList.contains('collapsed'),
        isExpanded: toggleElement.getAttribute('aria-expanded') === 'true'
      })
    }
  }

  return {
    collapseStates,
    toggleStates
  }
}

function restoreModalDefaultState(modalElement, modalDefaultState) {
  if (!modalDefaultState) {
    return
  }

  for (const collapseState of modalDefaultState.collapseStates) {
    const collapseElement = modalElement.querySelector(`#${CSS.escape(collapseState.id)}`)
    if (!(collapseElement instanceof HTMLElement)) {
      continue
    }

    collapseElement.classList.remove('collapsing')
    collapseElement.style.height = ''

    if (collapseState.isShown) {
      collapseElement.classList.add('show')
    } else {
      collapseElement.classList.remove('show')
    }
  }

  for (const toggleState of modalDefaultState.toggleStates) {
    if (!(toggleState.element instanceof HTMLElement)) {
      continue
    }

    toggleState.element.classList.toggle('collapsed', toggleState.isCollapsed)
    toggleState.element.setAttribute('aria-expanded', String(toggleState.isExpanded))
  }

  modalElement.dispatchEvent(new CustomEvent(FULLSCREEN_MODAL_RESET_EVENT, {
    bubbles: true,
    detail: { modal: modalElement }
  }))
}

function scheduleRefresh(refresh, frameState) {
  if (frameState.isQueued) {
    return
  }

  frameState.isQueued = true

  Promise.resolve().then(() => {
    frameState.isQueued = false
    refresh()
  })
}

/**
 * Keep fullscreen nav columns equal-height to the tallest visible column while
 * preserving independent scrolling when available vertical space is limited.
 */
function enableNavbarAzFullscreen() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const fullscreenModals = document.querySelectorAll(FULLSCREEN_MODAL_SELECTOR)
  if (!fullscreenModals.length) {
    return
  }

  for (const modal of fullscreenModals) {
    if (!(modal instanceof HTMLElement)) {
      continue
    }

    const refresh = () => {
      synchronizeNavColumnHeights(modal)
    }

    const modalDefaultState = captureModalDefaultState(modal)
    const refreshFrameState = { isQueued: false }

    const refreshOnCollapseEvent = event => {
      const target = event?.target
      if (target instanceof HTMLElement && modal.contains(target)) {
        scheduleRefresh(refresh, refreshFrameState)
      }
    }

    const resetOnModalHidden = () => {
      restoreModalDefaultState(modal, modalDefaultState)
      refresh()
    }

    const debouncedRefresh = debounce(refresh, RESIZE_DEBOUNCE_MS)

    EventHandler.on(modal, 'shown.bs.modal', refresh)
    EventHandler.on(modal, 'hidden.bs.modal', resetOnModalHidden)
    EventHandler.on(modal, 'show.bs.collapse', refreshOnCollapseEvent)
    EventHandler.on(modal, 'hide.bs.collapse', refreshOnCollapseEvent)
    EventHandler.on(modal, 'shown.bs.collapse', refreshOnCollapseEvent)
    EventHandler.on(modal, 'hidden.bs.collapse', refreshOnCollapseEvent)

    window.addEventListener('resize', debouncedRefresh)

    // Sync once so initially shown states render correctly on first paint.
    refresh()
  }
}

export { enableNavbarAzFullscreen as default }

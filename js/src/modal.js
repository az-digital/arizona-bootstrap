/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: modal.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Temporary fix for blocked aria-hidden attribute on modals.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1602.
 */
function fixModalAriaHidden() {
  const modals = document.querySelectorAll('.modal')
  for (const modal of modals) {
    modal.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  }
}

export { fixModalAriaHidden as default }

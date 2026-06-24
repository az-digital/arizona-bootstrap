/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-fullscreen-scrollbar.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Align the fullscreen navbar modal-header navbar with the non-modal `.fixed-top`
 * navbar while a modal is open.
 *
 * When Bootstrap opens a modal it hides the document scrollbar and pads `body`
 * (and any `.fixed-top` siblings) by the scrollbar width to keep their contents
 * visually stable. Bootstrap's scrollbar helper skips elements nested inside
 * the modal itself, so the modal-header navbar ends up centered in the full
 * viewport while the non-modal navbar stays centered in `viewport - scrollbar`.
 * Mirroring the body's compensation onto the modal-header navbar keeps brand
 * and toggler positions identical across the two views.
 *
 * See https://github.com/az-digital/arizona-bootstrap/issues/2100.
 */
function syncNavbarAzFullscreenModalScrollbar() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners, { once: true })
  } else {
    attachListeners()
  }
}

function attachListeners() {
  const modals = document.querySelectorAll('.navbar-az-fullscreen-modal')
  for (const modal of modals) {
    const headerNavbar = modal.querySelector('.modal-header .navbar.navbar-az-fullscreen')
    if (!headerNavbar) {
      continue
    }

    modal.addEventListener('show.bs.modal', () => {
      // Measure the document scrollbar width before Bootstrap hides it. This
      // matches the inline `padding-right` Bootstrap applies to `body` and to
      // `.fixed-top` elements during modal open.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        headerNavbar.style.paddingRight = `${scrollbarWidth}px`
      }
    })

    modal.addEventListener('hidden.bs.modal', () => {
      headerNavbar.style.paddingRight = ''
    })
  }
}

export { syncNavbarAzFullscreenModalScrollbar as default }

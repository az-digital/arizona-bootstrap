/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: photogallery.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Fix slide-to functionality of photo gallery grid thumbnail buttons.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1705.
 */
function photoGalleryGridSlideToImage() {
  const gridButtons = document.querySelectorAll('.az-gallery-grid-btn')
  for (const gridButton of gridButtons) {
    const slideToEl = gridButton.querySelector('[data-bs-slide-to]')
    if (slideToEl) {
      gridButton.addEventListener('click', () => {
        slideToEl.click()
      })
    }
  }
}

export { photoGalleryGridSlideToImage as default }

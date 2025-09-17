/**
 * --------------------------------------------------------------------------
 * Bootstrap index.esm.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

export { default as Alert } from '../node_modules/bootstrap/js/src/alert.js'
export { default as Button } from '../node_modules/bootstrap/js/src/button.js'
export { default as Carousel } from '../node_modules/bootstrap/js/src/carousel.js'
export { default as Collapse } from '../node_modules/bootstrap/js/src/collapse.js'
export { default as Dropdown } from '../node_modules/bootstrap/js/src/dropdown.js'
export { default as Modal } from '../node_modules/bootstrap/js/src/modal.js'
export { default as Offcanvas } from '../node_modules/bootstrap/js/src/offcanvas.js'
export { default as Popover } from '../node_modules/bootstrap/js/src/popover.js'
export { default as ScrollSpy } from '../node_modules/bootstrap/js/src/scrollspy.js'
export { default as Tab } from '../node_modules/bootstrap/js/src/tab.js'
export { default as Toast } from '../node_modules/bootstrap/js/src/toast.js'
export { default as Tooltip } from '../node_modules/bootstrap/js/src/tooltip.js'
export { default as fixModalAriaHidden } from './src/modal.js'
export { default as photoGalleryGridSlideToImage } from './src/photogallery.js'

/**
 * Temporary fix for blocked aria-hidden attribute on modals.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1602.
 */
/* global fixModalAriaHidden */
fixModalAriaHidden()

/**
 * Fix slide-to functionality of photo gallery grid thumbnail buttons.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1705.
 */
/* global photoGalleryGridSlideToImage */
photoGalleryGridSlideToImage()

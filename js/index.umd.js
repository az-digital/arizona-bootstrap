/**
 * --------------------------------------------------------------------------
 * Bootstrap index.umd.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Alert from '../node_modules/bootstrap/js/src/alert.js'
import Button from '../node_modules/bootstrap/js/src/button.js'
import Carousel from '../node_modules/bootstrap/js/src/carousel.js'
import Collapse from '../node_modules/bootstrap/js/src/collapse.js'
import Dropdown from '../node_modules/bootstrap/js/src/dropdown.js'
import Modal from '../node_modules/bootstrap/js/src/modal.js'
import Offcanvas from '../node_modules/bootstrap/js/src/offcanvas.js'
import Popover from '../node_modules/bootstrap/js/src/popover.js'
import ScrollSpy from '../node_modules/bootstrap/js/src/scrollspy.js'
import Tab from '../node_modules/bootstrap/js/src/tab.js'
import Toast from '../node_modules/bootstrap/js/src/toast.js'
import Tooltip from '../node_modules/bootstrap/js/src/tooltip.js'
import fixModalAriaHidden from './src/modal.js'
import photoGalleryGridSlideToImage from './src/photogallery.js'

export default {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  fixModalAriaHidden,
  photoGalleryGridSlideToImage
}

/**
 * Temporary fix for blocked aria-hidden attribute on modals.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1602.
 */
fixModalAriaHidden()

/**
 * Fix slide-to functionality of photo gallery grid thumbnail buttons.
 * See https://github.com/az-digital/arizona-bootstrap/issues/1705.
 */
photoGalleryGridSlideToImage()

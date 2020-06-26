import {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Toast,
  Tooltip,
  Util
} from '../../node_modules/bootstrap/js/src/index.js'

import $ from 'jquery'

// Arizona Bootstrap offcanvas navigation menu toggle.
(function ($) {
  $('[data-toggle="offcanvas"]').on('click', () => {
    $('.offcanvas-collapse').toggleClass('open')
  })
}($))

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.5.0): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

export {
  Util,
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Toast,
  Tooltip
}

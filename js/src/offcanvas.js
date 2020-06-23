/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: offcanvas.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'

export default () =>  $('[data-toggle="offcanvas"]').on('click', () => $('.offcanvas-offcanvas').toggleClass('open'))

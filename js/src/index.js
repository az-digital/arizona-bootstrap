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
//(function ($) {
  //$('[data-toggle="offcanvas"]').on('click', () => {
    //console.log(this);
    //$('.offcanvas-collapse').toggleClass('open')
  //})
//}($))
$(function(){
  console.log("Page has loaded.");
  $('[data-toggle="offcanvas"]').on('click', function (){
    $('#navbarOffcanvasDemo').toggleClass('open');
    $(this).attr('aria-expanded', true);
  });
  $('#navbarOffcanvasDemoClose').on('cick', function(){
    console.log("Button clicked");
    $('#navbarOffcanvasDemo').toggleClass('open');
    $(this).attr('aria-expanded', false);
  });
});


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

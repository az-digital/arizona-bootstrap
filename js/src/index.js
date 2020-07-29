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
import Offcanvasmenu from './offcanvasmenu'

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
  Tooltip,
  Offcanvasmenu
}
$('.dropdown.keep-open').on({
  "shown.bs.dropdown": function() {
    $(this).attr('data-closable',false);
       console.log('dropdown');
  },
  "click": function() {
    $(this).attr('data-closable',true);
       console.log('click');
  },
  "hide.bs.dropdown": function(e) {
    let closable = $(this).attr('data-closable');
    if (closable == 'false') {
       e.stopPropagation();
       console.log('this after');
      return false;
    }
  }
});

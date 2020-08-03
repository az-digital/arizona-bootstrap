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

// Optimalisation: Store the references outside the event handler:
var $window = $(window);
//var $pane = $('#pane1');

function offCanvasDropdowns() {
  var windowsize = $window.width();
  if (windowsize < 768) {
    console.log(windowsize);
    $('.dropdown.keep-open .dropdown-toggle').on('click', function() {
      if ($(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').toggleClass("show").attr('aria-expanded','false');
      }
      if ($(this).attr('aria-expanded') == 'true') {
        $(this).attr('aria-expanded',false);
        $(this).parent().removeClass('show');
      }
      else {
        $(this).attr('aria-expanded',true);
        $(this).parent().addClass('show');
        //this._element.focus()
        console.log(this);
      }

      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      //$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      //console.log('hidden');
      //$('.dropdown-submenu .show').removeClass("show").attr('aria-expanded','false') ;
      //});


      return false;
    });
  }
}
// Bind event listener
$window.resize(offCanvasDropdowns);

//} );
//$('.dropdown.keep-open').off().on({
//"shown.bs.dropdown": function() {
//$(this).attr('data-closable','false');
//return false;
//},
//"click": function(event) {
//event.stopPropagation();
//console.log($(this));
//$(this).attr('data-closable','true');
//$(this).find('a.dropdown-toggle').dropdown('toggle');
////$(this).removeClass('show');
//return false;
//},
//"hide.bs.dropdown": function(event) {
//if (event.clickEvent) {
//$(this).attr('data-closable','false');
//return false;
//}
//if ($(this).attr('data-closable') == 'false') {
//event.stopPropagation();
//return false;
//}
//}
//});

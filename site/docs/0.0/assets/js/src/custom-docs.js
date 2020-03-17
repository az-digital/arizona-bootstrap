(function ($) {
  'use strict'

  // COLOR CONTRAST TABLE
  $('#hide-inaccessible').change(function () {
    if ($('#hide-inaccessible').is(':checked')) {
      $('.inaccessible').css('visibility', 'hidden')  // checked
      $('.inaccessible').parent().css('opacity', '0')
    } else {
      $('.inaccessible').css('visibility', 'visible')  // unchecked
      $('.inaccessible').parent().css('opacity', '1')
    }
  })
}(jQuery))

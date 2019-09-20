(function ($) {
  'use strict'

  // BACKGROUND COLOR
  $('.btn-background-wrapper-demo').click(function () {
    // store background color class
    var backgroundColor = $(this).data('bgcolor')
    var backgroundColorClass = 'bg-' + backgroundColor

    // remove background color if button already active
    if ($(this).hasClass('demo-active')) {
      $(this).removeClass('demo-active')
      $('#background-wrapper-live-demo').removeClass(backgroundColorClass)
    // else, apply new background color
    } else {
      // get information about current classes applied
      var wrapperClassList = $('#background-wrapper-live-demo').attr('class').split(' ')
      var classesToRemove = []

      // find background color class; only push .bg-{color} and not .bg-triangles-*
      var i
      for (i = 0; i < wrapperClassList.length; i++) {
        if (wrapperClassList[i].indexOf('bg-triangles') < 0 && wrapperClassList[i] !== 'background-wrapper' && wrapperClassList[i] !== 'bg-trilines') {
          classesToRemove.push(wrapperClassList[i])
        }
      }

      // toggle the active button
      $('.btn-background-wrapper-demo').removeClass('demo-active')
      $(this).addClass('demo-active')

      // remove any existing background color class
      if (classesToRemove.length > 0) {
        for (i = 0; i < classesToRemove.length; i++) {
          $('#background-wrapper-live-demo').removeClass(classesToRemove[i])
        }
      }
      // apply new background color
      $('#background-wrapper-live-demo').addClass(backgroundColorClass)
    }
  })

  // BACKGROUND TRIANGLES
  $('.btn-triangle-background-demo').click(function () {
    // store triangle class
    var trianglePattern = $(this).data('triangles')
    var backgroundPatternClass = 'bg-' + trianglePattern

    // remove background pattern if button already active
    if ($(this).hasClass('demo-active')) {
      $(this).removeClass('demo-active')
      $('#background-wrapper-live-demo').removeClass(backgroundPatternClass)
    // else, apply new background pattern
    } else {
      // get information about current classes applied
      var wrapperClassList = $('#background-wrapper-live-demo').attr('class').split(' ')
      var classesToRemove = []

      // find background pattern class; only push .bg-triangles-* and not .bg-{color}
      var i
      for (i = 0; i < wrapperClassList.length; i++) {
        if ((wrapperClassList[i].indexOf('bg-triangles') >= 0 || wrapperClassList[i] === 'bg-trilines') && wrapperClassList[i] !== 'background-wrapper') {
          classesToRemove.push(wrapperClassList[i])
        }
      }

      // toggle the active button
      $('.btn-triangle-background-demo').removeClass('demo-active')
      $(this).addClass('demo-active')

      // remove any existing background triangle classes
      if (classesToRemove.length > 0) {
        for (i = 0; i < classesToRemove.length; i++) {
          $('#background-wrapper-live-demo').removeClass(classesToRemove[i])
        }
      }
      // apply new background triangle class
      $('#background-wrapper-live-demo').addClass(backgroundPatternClass)
    }
  })
}(jQuery))


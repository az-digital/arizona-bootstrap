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

  var specimenButtons = document.querySelectorAll('.js-specimen-modal-trigger');
  [].forEach.call(specimenButtons, function (specimenButton) {
    specimenButton.addEventListener('click', specimenChangeFont)
  })
  var abcButtons = document.querySelectorAll('.js-abcButton-trigger');
  [].forEach.call(abcButtons, function (abcButton) {
    abcButton.addEventListener('click', abcSample)
  })
  var customSampleButtons = document.querySelectorAll('.js-custom-sample-trigger');
  [].forEach.call(customSampleButtons, function (customSampleButton) {
    customSampleButton.addEventListener('click', customSample)
  })

  function specimenChangeFont() {
    var fontClass = this.getAttribute('data-font-class')
    var fontName = this.getAttribute('data-font-name')
    var specimenModalFont = document.getElementById('js-specimen-modal-font')
    specimenModalFont.className = 'table-striped ' + fontClass
    var specimenModalFontName = document.getElementById('js-change-font-name')
    specimenModalFontName.textContent = fontName
  }

  const mySampleIds = ['big1', 'big2', 'big3', 'big4', 'big5', 'big6', 'big7']

  function updateSample(myText) {
    var i
    var sample
    for (i in mySampleIds) {
      if (mySampleIds[i]) {
        sample = document.getElementById(mySampleIds[i])
        sample.innerText = myText
        sample.firstChild.nodeValue = myText
      }
    }
    if (myText.match(unescape('%79%65%6C%6C%6F%77'))) {
      document.getElementsByTagName('h2')[0].style.backgroundColor = '#ffde00'
    }
  }

  function abcSample() {
    updateSample('A​B​C​D​E​F​G​H​I​J​K​L​M​N​O​P​Q​R​S​T​U​V​W​X​Y​Z a​b​c​d​e​f​g​h​i​j​k​l​m​n​o​p​q​r​s​t​u​v​w​x​y​z 0​1​2​3​4​5​6​7​8​9')
  }
  function customSample() {
    updateSample(document.bigcontrol.customSampleText.value)
  }
}(jQuery))


(() => {
  'use strict'

  const specimenButtons = document.querySelectorAll('.js-specimen-modal-trigger')
  Array.prototype.forEach.call(specimenButtons, specimenButton => {
    specimenButton.addEventListener('click', specimenChangeFont)
  })
  const abcButtons = document.querySelectorAll('.js-abcButton-trigger')
  Array.prototype.forEach.call(abcButtons, abcButton => {
    abcButton.addEventListener('click', abcSample)
  })
  const customSampleButtons = document.querySelectorAll('.js-custom-sample-trigger')
  Array.prototype.forEach.call(customSampleButtons, customSampleButton => {
    customSampleButton.addEventListener('click', customSample)
  })

  function specimenChangeFont() {
    const { fontClass, fontName } = this.dataset
    const specimenModalFont = document.querySelector('#js-specimen-modal-font')
    specimenModalFont.className = `table-striped ${fontClass}`
    const specimenModalFontName = document.querySelector('#js-change-font-name')
    specimenModalFontName.textContent = fontName
  }

  function updateSample(myText) {
    const mySampleIds = ['#big1', '#big2', '#big3', '#big4', '#big5', '#big6', '#big7']
    mySampleIds.forEach(sampleId => {
      const sample = document.querySelector(sampleId)
      if (sample) {
        sample.textContent = myText
        sample.firstChild.nodeValue = myText
      }
    })
  }

  function abcSample() {
    updateSample('A​B​C​D​E​F​G​H​I​J​K​L​M​N​O​P​Q​R​S​T​U​V​W​X​Y​Z a​b​c​d​e​f​g​h​i​j​k​l​m​n​o​p​q​r​s​t​u​v​w​x​y​z 0​1​2​3​4​5​6​7​8​9')
  }

  function customSample() {
    updateSample(document.bigcontrol.customSampleText.value)
  }
})()


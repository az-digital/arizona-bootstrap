// Support the control that toggles visibility of inaccessible color combinations.
(() => {
  'use strict'

  const hideBox = document.querySelector('#hide-inaccessible')

  if (!hideBox) {
    return
  }

  const flaggedAsInaccessible = document.querySelectorAll('.inaccessible')

  hideBox.addEventListener('change', () => {
    if (hideBox.checked) {
      Array.prototype.forEach.call(flaggedAsInaccessible, inaccessible => {
        const parent = inaccessible.parentElement
        if (parent) {
          parent.classList.add('invisible')
        }
      })
    } else {
      Array.prototype.forEach.call(flaggedAsInaccessible, inaccessible => {
        const parent = inaccessible.parentElement
        if (parent) {
          parent.classList.remove('invisible')
        }
      })
    }
  })
})()

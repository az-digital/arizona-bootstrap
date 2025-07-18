/*
 * JavaScript for the live demo on the Background Wrappers component page.
 */

(() => {
  'use strict'

  // Background Color
  document.querySelectorAll('.btn-background-wrapper-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      const backgroundColor = btn.dataset.bgcolor
      const backgroundColorClass = `text-bg-${backgroundColor}`
      const wrapper = document.getElementById('background-wrapper-live-demo')

      // remove background color if button already active
      if (btn.classList.contains('demo-active')) {
        btn.classList.remove('demo-active')
        wrapper.classList.remove(backgroundColorClass)
      } else {
        // get information about current classes applied
        const wrapperClassList = wrapper.className.split(' ')
        const classesToRemove = wrapperClassList.filter(cls =>
          cls !== 'background-wrapper' &&
          cls !== 'bg-trilines' &&
          !cls.startsWith('bg-triangles')
        )

        // toggle the active button
        document.querySelectorAll('.btn-background-wrapper-demo').forEach(b => b.classList.remove('demo-active'))
        btn.classList.add('demo-active')

        // remove any existing background color class
        classesToRemove.forEach(cls => wrapper.classList.remove(cls))

        // apply new background color
        wrapper.classList.add(backgroundColorClass)
      }
    })
  })

  // Background Patterns
  document.querySelectorAll('.btn-triangle-background-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      const trianglePattern = btn.dataset.triangles
      const backgroundPatternClass = `bg-${trianglePattern}`
      const wrapper = document.getElementById('background-wrapper-live-demo')

      // remove background pattern if button already active
      if (btn.classList.contains('demo-active')) {
        btn.classList.remove('demo-active')
        wrapper.classList.remove(backgroundPatternClass)
      } else {
        // get information about current classes applied
        const wrapperClassList = wrapper.className.split(' ')
        const classesToRemove = wrapperClassList.filter(cls =>
          cls !== 'background-wrapper' &&
          (cls.startsWith('bg-triangles') || cls === 'bg-trilines')
        )

        // toggle the active button
        document.querySelectorAll('.btn-triangle-background-demo').forEach(b => b.classList.remove('demo-active'))
        btn.classList.add('demo-active')

        // remove any existing background triangle classes
        classesToRemove.forEach(cls => wrapper.classList.remove(cls))

        // apply new background triangle class
        wrapper.classList.add(backgroundPatternClass)
      }
    })
  })
})()

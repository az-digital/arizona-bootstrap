/**
 * @file
 * Handle copy-to-clipboard functionality for accordion links.
 * On load, if an anchor link exists in the URL, handle
 * anchor link scrolling and expand the accordion content.
 */

/**
 * Copies anchor link when clicked.
 * @param event - the click event.
 * @param element - the clicked anchor element.
 */
const copyAnchor = (function () {
  'use strict'

  return function (event, element) {
    if (!element) {
      return
    }

    // Prevents URL changing and accordions opening on click
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    // Prefer the closest anchor (<a>) for href/hash information
    const anchorElement = element.closest('a') || (element.tagName === 'A' ? element : null)

    if (!anchorElement) {
      return
    }

    // Extract id from href (e.g. "#collapseAnchor1-link") or fall back to parent id
    const href = anchorElement.getAttribute('href') || ''
    const accordionId = href.startsWith('#') ? href.slice(1) : anchorElement.parentElement.id

    if (!accordionId) {
      return
    }

    // Get the current URL without any existing hash
    const baseUrl = window.location.href.split('#')[0]

    // Get the link span for visual feedback
    const copyAccordionLinkSpan = anchorElement.querySelector('span') || anchorElement.children[0]

    // Construct the URL using the ID
    const urlToCopy = `${baseUrl}#${accordionId}`

    // Copy URL to clipboard using the Clipboard API
    navigator.clipboard.writeText(urlToCopy).then(() => {
      // TODO: Update the tooltip text to say "copied"
      copyAccordionLinkSpan.innerHTML = 'check'
      setTimeout(() => {
        copyAccordionLinkSpan.innerHTML = 'link'
      }, 2000)
    })
  }
})()

/**
 * Expands accordion if its anchor link is in the URL.
 */
function checkAnchorAccordionOnLoad() {
  'use strict'
  // Get anchor link hash without the '#' sign
  const anchorTag = window.location.hash.slice(1)

  if (!anchorTag) {
    return false // No anchor link found, do nothing.
  }

  const parentAccordionHeading = document.getElementById(anchorTag)

  if (parentAccordionHeading !== null) {
    // Get button so we can re-enable the accordion
    const parentAccordion = parentAccordionHeading.children[1]
    // Un-collapse parent accordion if collapsed
    if (parentAccordion.classList.contains('collapsed')) {
      parentAccordion.classList.remove('collapsed')
      parentAccordion.setAttribute('aria-expanded', 'true')
      // Add 'show' to the disabled button by removing '-link' from tag to get ID
      const anchorTagNoLink = anchorTag.slice(0, -5)
      const accordionBodyElem = document.getElementById(anchorTagNoLink)
      accordionBodyElem.classList.add('show')
    }
  }

  return true
}

const anchors = document.getElementsByClassName('accordion-anchor')
Object.values(anchors).forEach(anchor => {
  'use strict'
  anchor.addEventListener('click', function (event) {
    copyAnchor(event, this)
  })
})

document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  checkAnchorAccordionOnLoad()
})
window.addEventListener('hashchange', () => {
  'use strict'
  checkAnchorAccordionOnLoad()
})

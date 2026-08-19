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
    const accordionElement = element || event?.currentTarget || event?.target

    if (!accordionElement) {
      return
    }

    // Prevents URL changing and accordions opening on click
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    const anchorElement = accordionElement.closest('a') || accordionElement
    const accordionId = anchorElement.getAttribute('href')?.replace('#', '') || anchorElement.parentElement?.id

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
const checkAnchorAccordionOnLoad = (function () {
  'use strict'
  // Get anchor link hash without the '#' sign
  const anchorTag = window.location.hash.slice(1)

  if (!anchorTag) {
    return // No anchor link found, do nothing.
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
})()

document.addEventListener('DOMContentLoaded', function (event) {
  checkAnchorAccordionOnLoad
})
window.addEventListener('hashchange', function (event) {
  checkAnchorAccordionOnLoad
})
document.getElementById('collapseAnchor1-link').querySelector('a').addEventListener('click', function (event) {
  copyAnchor(event, this)
})
document.getElementById('collapseAnchor2-link').querySelector('a').addEventListener('click', function (event) {
  copyAnchor(event, this)
})
document.getElementById('collapseAnchor3-link').querySelector('a').addEventListener('click', function (event) {
  copyAnchor(event, this)
})


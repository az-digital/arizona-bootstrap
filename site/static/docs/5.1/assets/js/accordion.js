/**
 * @file
 * Handle copy-to-clipboard functionality for accordion links.
 * On load, if an anchor link exists in the URL, handle
 * anchor link scrolling and expand the accordion content.
 */

/**
 * Expands accordion and scrolls to anchor link header with vertical offset.
 */
function scrollToAccordion() {
    const anchorTag = window.location.hash.substring(1); // Get anchor link hash without the '#'

    if (!anchorTag) { // No anchor link found, do nothing.
        return
    }

    const parentAccordionHeading = document.getElementById(anchorTag);

    if (parentAccordionHeading !== null) {
        // Get button so we can re-enable the accordion
        const parentAccordion = parentAccordionHeading.children[1];
        // Un-collapse parent accordion if collapsed
        if (parentAccordion.classList.contains('collapsed')) {
            parentAccordion.classList.remove('collapsed');
            parentAccordion.setAttribute('aria-expanded', 'true');
            const anchorTagNoLink = anchorTag.substring(0, anchorTag.length - 5); // remove '-link' from tag
            const accordionBodyElem = document.getElementById(anchorTagNoLink);
            accordionBodyElem.classList.add('show')
            // const bsCollapse = new bootstrap.Collapse('#'+anchorTagNoLink, {
            //     toggle: false
            // });
        }
    }
}

/**
 * Scroll when loading document and when changing the hash URL.
 */
document.addEventListener('DOMContentLoaded', scrollToAccordion);
window.addEventListener('hashchange', scrollToAccordion);

/**
 * Copies anchor link when clicked.
 * @param accordionId - the id of the accordion from Twig.
 * @param event - the onclick event.
 */

function copyAnchor(accordionElement, event) {
    // Prevents anchor link from activating on click (from sitting on top of another button)
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // Get the current URL without any existing hash
    const baseUrl = window.location.href.split('#')[0];

    // Get the accordion ID
    const accordionId = accordionElement.parentElement.id;

    // Get the span for visual feedback
    const copyAccordionLinkSpan = accordionElement.children[0];

    // Construct the URL with the accordion ID anchor
    const urlToCopy = `${baseUrl}#${accordionId}`;

    // Copy to clipboard using the Clipboard API
    navigator.clipboard.writeText(urlToCopy).then(() => {
        // TODO: Update the tooltip text to say "copied"
        console.log('URL copied to clipboard: ', urlToCopy);
        copyAccordionLinkSpan.innerHTML = "check";
        setTimeout(() => {
            copyAccordionLinkSpan.innerHTML = "link";
        }, 2000);
    }).catch((err) => {
        console.error('Failed to copy URL to clipboard: ', err);
    });
}
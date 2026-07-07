/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-fullscreen-mobile-nav.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Arizona Bootstrap Fullscreen Navbar Mobile Navigation (experimental)
 * Handles paged navigation for the mobile view of AZ Navbar Fullscreen.
 */

const IDS = {
  FOOTER_TOP: 'navbar-az-fullscreen-modal-footer-top',
  FOOTER_TOP_HEADING: 'resources-for-label',
  FOOTER_BOTTOM: 'navbar-az-fullscreen-modal-footer-bottom',
  FOOTER_BOTTOM_HEADING: 'helpful-links-label',
  MOBILE_COL: 'navbar-az-fullscreen-nav-mobile-col'
}
const LABELS = {
  FOOTER_TOP_HEADING: 'Resources For:',
  FOOTER_BOTTOM_HEADING: 'Helpful Links:',
  MAIN_MENU: 'Main'
}
const FULLSCREEN_MODAL_SELECTOR = '.navbar-az-fullscreen-modal'
const FULLSCREEN_MODAL_RESET_EVENT = 'az.navbar-fullscreen.reset'

class NavbarAzFullscreenMobileNav {
  constructor() {
    this.primaryNavElementId = '#az-navbar-az-fullscreen-primary-accordion'
    this.mobileCol = document.getElementById(IDS.MOBILE_COL)
    this.modalFooterTop = document.getElementById(IDS.FOOTER_TOP)
    this.modalFooterBottom = document.getElementById(IDS.FOOTER_BOTTOM)
    this.modalElement = this.mobileCol?.closest(FULLSCREEN_MODAL_SELECTOR)

    if (!document.querySelector(this.primaryNavElementId) || !this.mobileCol) {
      return
    }

    // Initialize variables for preserved DOM content
    this.mobileColInitialContent = this.mobileCol.cloneNode(true)
    this.mobileCtaNode = null
    this.primaryNavMenuNode = null

    // Initialize state variables
    this.navListenersInitialized = false
    this.currentNavLevel = 1
    this.currentMenuSourceId = this.primaryNavElementId
    this.currentMenuLabel = null
    this.currentMenuParentLabel = null
    this.currentMenuParentElementId = null
    this.initialNavLevel = 1
    this.initialMenuSourceId = this.primaryNavElementId
    this.initialMenuLabel = null
    this.initialMenuParentLabel = null
    this.initialMenuParentElementId = null

    this.init()
  }

  /**
   * Initialize the mobile navigation
   */
  init() {
    this.modalElement?.addEventListener(FULLSCREEN_MODAL_RESET_EVENT, () => {
      this.resetToInitialState()
    })

    // Save call-to-action items
    const ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions')
    if (ctaElement) {
      this.mobileCtaNode = ctaElement.cloneNode(true)
    }

    let activeLinkFound = false

    // Check active tertiary links for a match with the current pathname
    const activeTertiaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-tertiary a.nav-link.active')
    for (const link of activeTertiaryLinks) {
      if (link.href === window.location.href) {
        const tertiaryPanel = link.closest('.navbar-az-fullscreen-modal-menu-secondary-submenu')
        if (!tertiaryPanel) {
          continue
        }

        const tertiaryPanelId = tertiaryPanel?.getAttribute('id') ? `#${tertiaryPanel.getAttribute('id')}` : ''
        const secondaryContentButton = document.querySelector(`[data-bs-target="${tertiaryPanelId}"]`)
        const tertiaryLabel = secondaryContentButton?.previousElementSibling.textContent.trim() || ''
        const parentLabel = secondaryContentButton?.closest('.navbar-az-fullscreen-nav-secondary')?.getAttribute('aria-label') || ''
        const secondaryContent = secondaryContentButton?.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show')
        const secondaryContentId = secondaryContent?.getAttribute('id') || ''

        this.showNavMenu(3, tertiaryPanelId, tertiaryLabel, parentLabel, `#${secondaryContentId}`)
        activeLinkFound = true
      }
    }

    // Check active secondary links for a match with the current pathname
    if (!activeLinkFound) {
      const activeSecondaryLinks = document.querySelectorAll('.navbar-az-fullscreen-modal-menu-nav-col-secondary a.nav-link.active')
      for (const link of activeSecondaryLinks) {
        if (link.href === window.location.href) {
          const secondaryContent = link.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show')
          const targetId = secondaryContent?.getAttribute('id') || ''
          const label = link.closest('.navbar-az-fullscreen-nav-secondary')?.getAttribute('aria-label') || ''

          if (targetId) {
            this.showNavMenu(2, `#${targetId}`, label)
            activeLinkFound = true
            break
          }
        }
      }
    }

    // Set up mobile modal footers
    this.topFooterLinks = []
    this.bottomFooterLinks = []
    activeLinkFound = this.setupModalMobileFooter('top', activeLinkFound)
    activeLinkFound = this.setupModalMobileFooter('bottom', activeLinkFound)

    // Save DOM and state of initial mobile menu
    if (activeLinkFound) {
      this.mobileColInitialContent = this.mobileCol.cloneNode(true)
      this.initialNavLevel = this.currentNavLevel
      this.initialMenuSourceId = this.currentMenuSourceId
      this.initialMenuLabel = this.currentMenuLabel
      this.initialMenuParentLabel = this.currentMenuParentLabel
      this.initialMenuParentElementId = this.currentMenuParentElementId
    }

    this.setupNavListeners()
  }

  /**
   * Reset the mobile nav to its initial state upon page load.
   */
  resetToInitialState() {
    if (!(this.mobileCol instanceof HTMLElement) || !this.mobileColInitialContent) {
      return
    }

    const clone = this.mobileColInitialContent.cloneNode(true)
    this.mobileCol.replaceChildren(...Array.from(clone.childNodes))

    this.currentNavLevel = this.initialNavLevel
    this.currentMenuSourceId = this.initialMenuSourceId
    this.currentMenuLabel = this.initialMenuLabel
    this.currentMenuParentLabel = this.initialMenuParentLabel
    this.currentMenuParentElementId = this.initialMenuParentElementId

    this.toggleFooterDisplay(this.currentMenuSourceId)
  }

  /**
   * Set up the content and event listeners for a modal footer on mobile
   * @param {string} footerPosition - Which modal footer to update ('top' or 'bottom')
   * @param {boolean} activeLinkFound - Whether a matching active link was found prior to this footer's initialization
   * @returns {boolean} Whether an active link was found in this footer's links during initialization
   */
  setupModalMobileFooter(footerPosition, activeLinkFound = false) {
    const footer = footerPosition === 'top' ? this.modalFooterTop : this.modalFooterBottom
    if (!footer) {
      return
    }

    const firstNavItem = footer.querySelector('.navbar-nav .nav-item')
    if (!firstNavItem) {
      return
    }

    // Get the original heading element and extract its text and id
    const originalHeading = footer.querySelector('.nav-item > .navbar-brand')
    const headingText = originalHeading?.textContent.trim() || (footerPosition === 'top' ? LABELS.FOOTER_TOP_HEADING : LABELS.FOOTER_BOTTOM_HEADING)
    const headingId = originalHeading?.id || (footerPosition === 'top' ? IDS.FOOTER_TOP_HEADING : IDS.FOOTER_BOTTOM_HEADING)

    // Save footer nav links to an array
    const footerLinksProperty = footerPosition === 'top' ? 'topFooterLinks' : 'bottomFooterLinks'
    let found = false
    this[footerLinksProperty] = Array.from(document.querySelectorAll(`#${footer.id} .nav-link`)).map(link => {
      if (!activeLinkFound && !found && link.href === window.location.href) {
        found = true
      }

      return {
        href: link.href,
        text: link.textContent.trim()
      }
    })

    // If a match was found in the this footer's links, display the menu page
    if (!activeLinkFound && found) {
      this.showNavMenu(2, `#${footer.id}`, headingText)
    }

    // Clone the first nav item
    const clonedNavItem = firstNavItem.cloneNode(true)

    // Get the first 3 link texts
    const linkTexts = this[footerLinksProperty] ? this[footerLinksProperty].slice(0, 3).map(link => link.text) : []

    // Create the text with "and more..."
    const footerText = linkTexts.length > 0 ? `${linkTexts.join(', ')}, and more...` : 'View more...'

    // Create aria-label text for the button
    const ariaLabel = `Toggle ${headingText.replace(':', '').trim()} submenu`

    const primaryButton = document.createElement('button')
    primaryButton.type = 'button'
    primaryButton.className = 'btn navbar-az-fullscreen-mobile-footer-btn navbar-az-fullscreen-mobile-footer-btn-text'
    primaryButton.setAttribute('aria-controls', IDS.MOBILE_COL)
    primaryButton.setAttribute('aria-label', ariaLabel)
    primaryButton.setAttribute('data-az-menu-element', `#${footer.id}`)

    const heading = document.createElement('h2')
    heading.className = 'navbar-brand nav-link-text m-0'
    heading.setAttribute('id', headingId)
    heading.textContent = headingText
    primaryButton.append(heading)

    const footerTextNode = document.createElement('span')
    footerTextNode.className = 'text-white'
    footerTextNode.textContent = footerText
    primaryButton.append(footerTextNode)

    const toggleButton = document.createElement('button')
    toggleButton.type = 'button'
    toggleButton.className = 'btn nav-toggle collapsed navbar-az-fullscreen-mobile-footer-btn'
    toggleButton.setAttribute('aria-controls', IDS.MOBILE_COL)
    toggleButton.setAttribute('aria-label', ariaLabel)
    toggleButton.setAttribute('data-az-menu-element', `#${footer.id}`)

    const toggleIcon = document.createElement('span')
    toggleIcon.className = 'nav-toggle-icon'
    toggleIcon.setAttribute('aria-hidden', 'true')
    toggleButton.append(toggleIcon)

    clonedNavItem.replaceChildren(primaryButton, toggleButton)
    clonedNavItem.classList.add('d-lg-none')

    // Insert the cloned item as the first child of the parent
    const parentNav = firstNavItem.parentElement
    parentNav.insertBefore(clonedNavItem, parentNav.firstChild)

    // Set up event listeners for footer buttons
    const footerButtons = clonedNavItem.querySelectorAll(':scope .btn')
    for (const button of footerButtons) {
      button.addEventListener('click', e => {
        const targetId = button.getAttribute('data-az-menu-element')

        if (targetId) {
          // Extract the menu label from button aria-label text
          const toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
          this.showNavMenu(2, targetId, toggleLabel)
        }
      })
    }

    return activeLinkFound || found
  }

  /**
   * Display navigation menu page
   * @param {number} navLevel - Navigation level
   * @param {string} sourceElementId - ID of the source element containing the menu content
   * @param {string} label - The label for the menu heading (optional)
   * @param {string} parentLabel - Parent label to use for back navigation (optional)
   * @param {string} parentElementId - Parent element ID to use for back navigation (optional)
   */
  showNavMenu(navLevel, sourceElementId, label = null, parentLabel = null, parentElementId = null) {
    const element = document.querySelector(`${sourceElementId}`)
    if (!element) {
      return
    }

    if (navLevel === 2) {
      parentLabel = LABELS.MAIN_MENU
    }

    this.currentNavLevel = navLevel
    this.currentMenuSourceId = sourceElementId
    this.currentMenuLabel = label
    this.currentMenuParentLabel = parentLabel
    this.currentMenuParentElementId = parentElementId

    // Create the menu display
    const menuNode = sourceElementId.includes('footer') ? this.buildFooterMenuNode(element, label) : this.buildMenuNode(navLevel, element, label, parentLabel)

    // Update mobile column
    this.mobileCol.replaceChildren(...Array.from(menuNode.childNodes))

    this.toggleFooterDisplay(sourceElementId)
  }

  /**
   * Build HTML for menu page display
   * @param {number} navLevel - Navigation level
   * @param {Element} sourceElement - The source element for the menu page content
   * @param {string} label - The label for the menu heading (optional)
   * @param {string} parentLabel - The label of the parent menu (optional)
   * @returns {DocumentFragment} Document fragment for the menu
   */
  buildMenuNode(navLevel, sourceElement, label = null, parentLabel = null) {
    const fragment = document.createDocumentFragment()

    if (navLevel === 1) {
      if (this.primaryNavMenuNode) {
        return this.primaryNavMenuNode.cloneNode(true)
      }

      if (this.mobileCtaNode) {
        fragment.append(this.mobileCtaNode.cloneNode(true))
      }
    } else {
      fragment.append(this.createBackButtonElement(parentLabel))

      const heading = document.createElement('h2')
      heading.className = 'navbar-az-fullscreen-nav-mobile-menu-heading'
      heading.textContent = `${label} Menu`
      fragment.append(heading)
    }

    let nav
    switch (navLevel) {
      case 1: {
        nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col')
        break
      }

      case 2: {
        nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col-secondary')
        break
      }

      case 3: {
        nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col-tertiary')
        break
      }

      default: {
        break
      }
    }

    if (nav) {
      const navClone = nav.cloneNode(true)

      // Remove secondary panels if they exist
      const secondaryPanels = navClone.querySelectorAll(':scope .navbar-az-fullscreen-modal-menu-primary-submenu')
      for (const panel of secondaryPanels) {
        panel.remove()
      }

      // Remove tertiary panels if they exist
      const tertiaryPanels = navClone.querySelectorAll(':scope .navbar-az-fullscreen-modal-menu-secondary-submenu')
      for (const panel of tertiaryPanels) {
        panel.remove()
      }

      // Confirm if any active links are present
      const activeLinkExists = navClone.querySelectorAll(':scope .nav-link.active').length > 0

      // Process all buttons in the cloned nav
      let buttonCounter = 0
      const buttons = navClone.querySelectorAll(':scope button')
      for (const button of buttons) {
        // Store data-bs-target value before removing attributes
        const targetId = button.getAttribute('data-bs-target')

        // Remove Bootstrap attributes
        button.removeAttribute('data-bs-toggle')
        button.removeAttribute('data-bs-target')
        button.removeAttribute('aria-expanded')

        // Create dynamic id
        buttonCounter++
        button.setAttribute('id', `az-fullscreen-nav-mobile-${buttonCounter}`)

        // Update aria-controls
        button.setAttribute('aria-controls', IDS.MOBILE_COL)

        // Add data-az-menu-element attribute with original target value
        if (targetId) {
          button.setAttribute('data-az-menu-element', targetId)
        }

        // Add collapsed class if this menu page has an active link
        if (activeLinkExists) {
          button.classList.add('collapsed')
        }
      }

      fragment.append(navClone)
    } else {
      fragment.append(sourceElement.cloneNode(true))
    }

    if (navLevel === 1 && !this.primaryNavMenuNode) {
      this.primaryNavMenuNode = fragment.cloneNode(true)
    }

    return fragment
  }

  /**
   * Build HTML for footer menu page display
   * @param {Element} sourceElement - The source footer element
   * @param {string} label - The label for the menu heading (optional)
   * @returns {DocumentFragment} Document fragment for the footer menu
   */
  buildFooterMenuNode(sourceElement, label = null) {
    const fragment = document.createDocumentFragment()
    fragment.append(this.createBackButtonElement(LABELS.MAIN_MENU))

    const originalHeading = sourceElement.querySelector('h2.navbar-brand')
    const headingText = originalHeading?.textContent.trim() || label || 'Menu'

    const heading = document.createElement('h2')
    heading.className = 'navbar-az-fullscreen-nav-mobile-menu-heading'
    heading.textContent = headingText
    fragment.append(heading)

    const footerLinks = sourceElement.id === IDS.FOOTER_TOP ? this.topFooterLinks : this.bottomFooterLinks
    const navId = sourceElement.id === IDS.FOOTER_TOP ? 'az-navbar-az-fullscreen-footer-top-secondary-nav' : 'az-navbar-az-fullscreen-footer-bottom-secondary-nav'
    const ariaLabel = headingText.replace(':', '').trim()

    const column = document.createElement('div')
    column.className = 'col col-lg-6 navbar-az-fullscreen-modal-menu-nav-col navbar-az-fullscreen-modal-menu-nav-col-secondary'

    const list = document.createElement('ul')
    list.className = 'nav'
    list.setAttribute('id', navId)
    list.setAttribute('aria-label', ariaLabel)

    if (footerLinks && footerLinks.length > 0) {
      for (const link of footerLinks) {
        const item = document.createElement('li')
        item.className = 'nav-item'

        const anchor = document.createElement('a')
        anchor.className = 'nav-link'
        if (link.href === window.location.href) {
          anchor.classList.add('active')
        }

        anchor.href = link.href

        const anchorText = document.createElement('span')
        anchorText.className = 'nav-link-text'
        anchorText.textContent = link.text

        anchor.append(anchorText)
        item.append(anchor)
        list.append(item)
      }
    }

    column.append(list)
    fragment.append(column)

    return fragment
  }

  /**
   * Hide the footer for the current footer menu page
   *
   * @param {string} sourceElementId - The ID of the source element for the current menu page
   */
  toggleFooterDisplay(sourceElementId) {
    if (sourceElementId === `#${IDS.FOOTER_TOP}`) {
      this.modalFooterTop?.classList.add('d-none')
      this.modalFooterBottom?.classList.remove('d-none')
    } else if (sourceElementId === `#${IDS.FOOTER_BOTTOM}`) {
      this.modalFooterBottom?.classList.add('d-none')
      this.modalFooterTop?.classList.remove('d-none')
    } else {
      this.modalFooterTop?.classList.remove('d-none')
      this.modalFooterBottom?.classList.remove('d-none')
    }
  }

  /**
   * Set up event listeners for navigation menu pages
   */
  setupNavListeners() {
    if (this.navListenersInitialized || !(this.mobileCol instanceof HTMLElement)) {
      return
    }

    this.mobileCol.addEventListener('click', e => {
      const button = e.target
      if (!(button instanceof HTMLButtonElement)) {
        return
      }

      if (button.classList.contains('navbar-az-fullscreen-nav-back-btn')) {
        // Handle back button events
        if (this.currentNavLevel === 2) {
          this.showNavMenu(1, this.primaryNavElementId)
        } else if (this.currentNavLevel === 3) {
          this.showNavMenu(2, this.currentMenuParentElementId, this.currentMenuParentLabel)
        }
      } else if (button.classList.contains('nav-toggle')) {
        // Handle menu nav toggle button events
        const targetId = button.getAttribute('data-az-menu-element')

        if (targetId) {
          // Extract the menu label from button aria-label text
          const toggleLabel = button.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
          if (this.currentNavLevel === 1) {
            this.showNavMenu(2, targetId, toggleLabel)
          } else {
            this.showNavMenu(3, targetId, toggleLabel, this.currentMenuLabel, this.currentMenuSourceId)
          }
        }
      }
    })

    this.navListenersInitialized = true
  }

  /**
   * Create a back button element
   * @param {string} label - The label for the back button
   * @returns {Element} The new back button element
   */
  createBackButtonElement(label) {
    const wrapper = document.createElement('div')
    wrapper.className = 'navbar-az-fullscreen-nav-back'

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn navbar-az-fullscreen-nav-back-btn'
    button.setAttribute('aria-label', `Back to ${label} Menu`)

    const span = document.createElement('span')
    span.textContent = `Back to ${label} Menu`

    button.append(span)
    wrapper.append(button)

    return wrapper
  }
}

/**
 * Initialize Arizona Bootstrap fullscreen mobile navigation.
 * Initializes immediately if DOM is ready, otherwise defers until DOM is loaded.
 * @returns {NavbarAzFullscreenMobileNav} The created mobile navigation instance
 */
function enableNavbarAzFullscreenMobileNav() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  // Defer initialization until DOM is ready if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NavbarAzFullscreenMobileNav(), { once: true })
  } else {
    return new NavbarAzFullscreenMobileNav()
  }
}

export { enableNavbarAzFullscreenMobileNav as default }

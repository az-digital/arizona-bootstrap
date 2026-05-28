/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-fullscreen.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Arizona Bootstrap Fullscreen Navbar Mobile Navigation (experimental)
 * Handles paged navigation for mobile view of #navbar-az-fullscreen-nav-mobile-col.
 */

class NavbarAzFullscreenMobileNav {
  constructor() {
    this.primaryNavElementId = '#az-navbar-az-fullscreen-primary-accordion'
    this.primaryNavContainer = document.querySelector(this.primaryNavElementId)
    this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col')

    if (!this.primaryNavContainer || !this.mobileCol) {
      // One or more required containers not found
      return
    }

    // Save call-to-action items
    const ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions')
    this.mobileCtaHTML = null
    if (ctaElement) {
      this.mobileCtaHTML = ctaElement.cloneNode(true).outerHTML
    }

    this.init()
  }

  /**
   * Initialize the mobile navigation
   */
  init() {
    let found = false

    // Check tertiary links for match with current pathname
    const tertiaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-tertiary-panel a.nav-link.active')
    for (const link of tertiaryLinks) {
      if (link.href === window.location.href) {
        const tertiaryPanel = link.closest('.navbar-az-fullscreen-nav-tertiary-panel')
        if (!tertiaryPanel) {
          continue
        }

        const tertiaryPanelId = tertiaryPanel?.getAttribute('id') ? `#${tertiaryPanel.getAttribute('id')}` : ''
        const tertiaryLabel = link.textContent.trim()
        // Extract parent label from the secondary menu containing this tertiary panel
        const secondaryContentButton = document.querySelector(`[data-bs-target="${tertiaryPanelId}"]`)
        const parentLabel = secondaryContentButton?.previousElementSibling.previousElementSibling.textContent || ''
        const secondaryContent = secondaryContentButton?.closest('.tab-pane.active')
        const secondaryContentId = secondaryContent?.getAttribute('id') || ''

        this.showTertiaryNav(tertiaryPanelId, tertiaryLabel, parentLabel, `#${secondaryContentId}`)
        found = true
      }
    }

    // Check secondary links for match with current pathname
    if (!found) {
      const secondaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-secondary-scroll a.nav-link.active')
      for (const link of secondaryLinks) {
        if (link.href === window.location.href) {
          const secondaryContent = link.closest('.tab-pane.active')
          const targetId = secondaryContent?.getAttribute('id') || ''
          const label = link.textContent.trim()

          if (targetId) {
            this.showSecondaryNav(`#${targetId}`, label)
            found = true
            break
          }
        }
      }
    }

    // If no matching links found, display primary navigation
    if (!found) {
      this.setupNavListeners(1, this.primaryNavElementId)
    }

    // Set up mobile modal footers

    // Save top footer label
    this.topFooter = document.getElementById('navbar-az-fullscreen-modal-footer-top')
    if (this.topFooter) {
      // Save top footer nav links to an array
      this.topFooterLinks = Array.from(document.querySelectorAll('#navbar-az-fullscreen-modal-footer-top .nav-link')).map(link => {
        return {
          href: link.href,
          text: link.textContent.trim()
        }
      })
    }

    // Save bottom footer label
    this.bottomFooter = document.getElementById('navbar-az-fullscreen-modal-footer-bottom')
    if (this.bottomFooter) {
      // Save bottom footer nav links to an array
      this.bottomFooterLinks = Array.from(document.querySelectorAll('#navbar-az-fullscreen-modal-footer-bottom .nav-link')).map(link => {
        return {
          href: link.href,
          text: link.textContent.trim()
        }
      })
    }

    this.setupModalMobileFooter('navbar-az-fullscreen-modal-footer-top')
    this.setupModalMobileFooter('navbar-az-fullscreen-modal-footer-bottom')
  }

  /**
   * Set up the content and event listeners for a modal footer on mobile
   * @param {string} id - The ID of the modal footer to update
   */
  setupModalMobileFooter(id) {
    const footer = document.getElementById(id)
    if (!footer) {
      return
    }

    const firstFooterNavItem = footer.querySelector('.navbar-nav .nav-item')
    if (!firstFooterNavItem) {
      return
    }

    // Clone the first nav item
    const clonedNavItem = firstFooterNavItem.cloneNode(true)

    // Get the original heading element and extract its text and id
    const originalHeading = footer.querySelector('h2.navbar-brand')
    const headingText = originalHeading?.textContent.trim() || 'Resources for:'
    const headingId = originalHeading?.id || 'resources-for-label'

    // Determine which footer links to use based on the id parameter
    const footerLinks = id === 'navbar-az-fullscreen-modal-footer-top' ? this.topFooterLinks : this.bottomFooterLinks

    // Get the first 3 link texts
    const linkTexts = footerLinks ? footerLinks.slice(0, 3).map(link => link.text) : []

    // Create the text with "and more..."
    const footerText = linkTexts.length > 0 ? `${linkTexts.join(', ')}, and more...` : 'View more...'

    // Determine the data-az-menu-element and other attributes based on which footer this is
    const menuElementId = id === 'navbar-az-fullscreen-modal-footer-top' ? '#navbar-az-fullscreen-modal-footer-top' : '#navbar-az-fullscreen-modal-footer-bottom'
    const ariaLabel = `Toggle ${headingText.replace(':', '').trim()} submenu`

    let html = `<button class="btn navbar-az-fullscreen-mobile-footer-btn navbar-az-fullscreen-mobile-footer-btn-text" type="button" aria-controls="navbar-az-fullscreen-nav-mobile-col" aria-label="${ariaLabel}" data-az-menu-element="${menuElementId}"><h2 class="navbar-brand nav-link-text m-0" id="${headingId}">${headingText}</h2><span class="text-white">${footerText}</span></button>`

    html += `<button class="btn nav-toggle navbar-az-fullscreen-mobile-footer-btn" type="button" aria-controls="navbar-az-fullscreen-nav-mobile-col" aria-label="${ariaLabel}" data-az-menu-element="${menuElementId}">`
    html += '<span class="nav-toggle-icon" aria-hidden="true"></span>'
    html += '</button>'

    clonedNavItem.innerHTML = html
    clonedNavItem.classList.add('d-lg-none')

    // Insert the cloned item as the first child of the parent
    const parentNav = firstFooterNavItem.parentElement
    parentNav.insertBefore(clonedNavItem, parentNav.firstChild)

    // Set up event listeners for footer buttons
    const footerButtons = clonedNavItem.querySelectorAll('.btn')
    for (const button of footerButtons) {
      button.addEventListener('click', e => {
        const targetId = button.getAttribute('data-az-menu-element')

        if (targetId) {
          // Extract the menu label from button aria-label text
          const toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
          this.showSecondaryNav(targetId, toggleLabel)
        }
      })
    }
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

    // Create the menu display
    let menuHtml = ''
    menuHtml = sourceElementId.includes('footer') ? this.buildFooterMenuHtml(element, label) : this.buildMenuHtml(navLevel, element, label, parentLabel)

    // Update mobile column
    this.mobileCol.innerHTML = menuHtml

    // Set up listeners for the new menu
    this.setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId)
  }

  /**
   * Display primary navigation
   * @param {string} sourceElementId - The ID of the source primary content element
   */
  showPrimaryNav(sourceElementId) {
    this.showNavMenu(1, sourceElementId)
  }

  /**
   * Display secondary navigation for a primary menu item
   * @param {string} sourceElementId - The ID of the source secondary content element
   * @param {string} label - The label of the secondary menu
   */
  showSecondaryNav(sourceElementId, label) {
    this.showNavMenu(2, sourceElementId, label, 'Main Menu')
  }

  /**
   * Display tertiary navigation
   * @param {string} sourceElementId - The ID of the source tertiary content element
   * @param {string} label - The label of the tertiary menu
   * @param {string} parentLabel - The label of the parent secondary menu
   * @param {string} parentElementId - The ID of the parent secondary content element (optional)
   */
  showTertiaryNav(sourceElementId, label, parentLabel, parentElementId = null) {
    this.showNavMenu(3, sourceElementId, label, parentLabel, parentElementId)
  }

  /**
   * Build HTML for menu page display
   * @param {number} navLevel - Navigation level
   * @param {Element} sourceElement - The source element for the menu page content
   * @param {string} label - The label for the menu heading (optional)
   * @param {string} parentLabel - The label of the parent menu (optional)
   * @returns {string} HTML string for the menu
   */
  buildMenuHtml(navLevel, sourceElement, label = null, parentLabel = null) {
    let html = '<div class="navbar-az-fullscreen-nav-menu-mobile">'

    if (navLevel === 1) {
      // Add call-to-action items
      if (this.mobileCtaHTML) {
        html += this.mobileCtaHTML
      }
    } else {
      // Add back button
      html += this.createBackButton(parentLabel)

      // Add menu heading
      html += `<h2 class="navbar-az-fullscreen-nav-mobile-menu-heading">${label} Menu</h2>`
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
      // Clone the nav element to avoid modifying the original
      const navClone = nav.cloneNode(true)

      // Remove secondary panels if they exist
      const secondaryPanels = navClone.querySelectorAll('.navbar-az-fullscreen-modal-menu-primary-submenu')
      if (secondaryPanels) {
        for (const panel of secondaryPanels) {
          panel.remove()
        }
      }

      // Remove tertiary panels if they exist
      const tertiaryPanel = navClone.querySelectorAll('.navbar-az-fullscreen-modal-menu-secondary-submenu')
      if (tertiaryPanel) {
        for (const panel of tertiaryPanel) {
          panel.remove()
        }
      }

      // Process all buttons in the cloned nav
      let buttonCounter = 0
      const buttons = navClone.querySelectorAll('button')
      for (const button of buttons) {
        // Store data-bs-target value before removing attributes
        const targetId = button.getAttribute('data-bs-target')

        // Remove Bootstrap attributes
        button.removeAttribute('data-bs-toggle')
        button.removeAttribute('data-bs-target')
        button.removeAttribute('aria-expanded')

        // Create dynamic id
        buttonCounter++
        button.id = `az-fullscreen-nav-mobile-${buttonCounter}`

        // Update aria-controls
        button.setAttribute('aria-controls', 'navbar-az-fullscreen-nav-mobile-col')

        // Add data-az-menu-element attribute with original target value
        if (targetId) {
          button.setAttribute('data-az-menu-element', targetId)
        }
      }

      html += navClone.outerHTML
    } else {
      // Fallback: use the entire source element if no nav element found
      html += sourceElement.outerHTML
    }

    html += '</div>'
    return html
  }

  /**
   * Build HTML for footer menu page display
   * @param {Element} sourceElement - The source footer element
   * @param {string} label - The label for the menu heading (optional)
   * @returns {string} HTML string for the footer menu
   */
  buildFooterMenuHtml(sourceElement, label = null) {
    let html = '<div class="navbar-az-fullscreen-nav-menu-mobile">'

    // Add back button
    html += this.createBackButton('Main Menu')

    // Get the original heading element and extract its text
    const originalHeading = sourceElement.querySelector('h2.navbar-brand')
    const headingText = originalHeading?.textContent.trim() || label || 'Menu'

    // Add menu heading
    html += `<h2 class="navbar-az-fullscreen-nav-mobile-menu-heading">${headingText}</h2>`

    // Determine which footer links to use
    const footerId = sourceElement.id
    const footerLinks = footerId === 'navbar-az-fullscreen-modal-footer-top' ? this.topFooterLinks : this.bottomFooterLinks
    const navId = footerId === 'navbar-az-fullscreen-modal-footer-top' ? 'az-navbar-az-fullscreen-footer-top-secondary-nav' : 'az-navbar-az-fullscreen-footer-bottom-secondary-nav'
    const ariaLabel = headingText.replace(':', '').trim()

    // Build the nav structure with all footer links
    html += '<div class="col col-lg-6 navbar-az-fullscreen-modal-menu-nav-col navbar-az-fullscreen-modal-menu-nav-col-secondary">'
    html += `<ul class="nav" id="${navId}" aria-label="${ariaLabel}">`

    if (footerLinks && footerLinks.length > 0) {
      for (const link of footerLinks) {
        html += '<li class="nav-item">'
        html += `<a class="nav-link" href="${link.href}">`
        html += `<span class="nav-link-text">${link.text}</span>`
        html += '</a>'
        html += '</li>'
      }
    }

    html += '</ul>'
    html += '</div>'
    html += '</div>'

    return html
  }

  /**
   * Set up event listeners for navigation menu pages
   * @param {number} navLevel - Navigation level
   * @param {string} sourceElementId - ID of the source element for the current menu content
   * @param {string} label - The label for the menu heading (optional)
   * @param {string} parentLabel - The label of the parent menu (optional)
   * @param {string} parentElementId - The ID of the parent element (optional)
   */
  setupNavListeners(navLevel, sourceElementId, label = null, parentLabel = null, parentElementId = null) {
    if (navLevel !== 1) {
      // Back button
      const backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn')
      if (backButton) {
        backButton.addEventListener('click', () => {
          if (navLevel === 2) {
            this.showPrimaryNav(this.primaryNavElementId)
          } else {
            this.showSecondaryNav(
              parentElementId,
              parentLabel
            )
          }
        })
      }
    }

    // Toggle buttons for secondary menu navigation
    if (navLevel !== 3) {
      const toggleButtons = this.mobileCol.querySelectorAll('.nav-toggle')
      for (const button of toggleButtons) {
        button.addEventListener('click', e => {
          const targetId = button.getAttribute('data-az-menu-element')

          if (targetId) {
            // Extract the menu label from button aria-label text
            const toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
            if (navLevel === 1) {
              this.showSecondaryNav(targetId, toggleLabel)
            } else {
              this.showTertiaryNav(targetId, toggleLabel, label, sourceElementId)
            }
          }
        })
      }
    }
  }

  /**
   * Create a back button element
   * @param {string} label - The label for the back button
   * @returns {string} HTML string for the back button
   */
  createBackButton(label) {
    return `
      <div class="navbar-az-fullscreen-nav-back">
        <button type="button" class="btn navbar-az-fullscreen-nav-back-btn" aria-label="Back to ${label}">
          Back to ${label}
        </button>
      </div>
    `
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

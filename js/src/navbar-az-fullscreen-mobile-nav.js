/**
 * --------------------------------------------------------------------------
 * Arizona Bootstrap: navbar-az-fullscreen.js
 * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Arizona Bootstrap Fullscreen Navbar Mobile Navigation
 * Handles paged navigation for mobile view of #navbar-az-fullscreen-nav-mobile-col.
 */

class NavbarAzFullscreenMobileNav {
  constructor() {
    this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col')
    this.desktopSecondaryContainer = document.querySelector('.navbar-az-fullscreen-nav-secondary-tertiary-cols')
    this.primaryNavContainer = document.querySelector('.navbar-az-fullscreen-nav-primary-col')

    if (!this.mobileCol) {
      // Mobile navbar column not found
      return
    }

    this.navigationStack = [] // Stack to track navigation history
    this.init()
  }

  /**
   * Initialize the mobile navigation
   */
  init() {
    // Set up event listeners for primary navigation items in mobile view
    this.setupPrimaryNavListeners()
  }

  /**
   * Set up click listeners on primary navigation items
   */
  setupPrimaryNavListeners() {
    const primaryButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-primary .nav-link')

    for (const button of primaryButtons) {
      button.addEventListener('click', e => {
        e.preventDefault()
        const targetId = button.getAttribute('data-bs-target')
        const label = button.textContent.trim()

        if (targetId) {
          this.showSecondaryNav(targetId, label)
        }
      })
    }
  }

  /**
   * Display secondary navigation for a primary menu item
   * @param {string} targetId - The ID of the secondary content to display
   * @param {string} label - The label of the primary menu item
   */
  showSecondaryNav(targetId, label) {
    // Extract the menu content from desktop view
    const desktopContent = document.querySelector(targetId)
    if (!desktopContent) {
      // Secondary content not found for ${targetId}
      return
    }

    // Create the secondary menu display
    const secondaryMenuHtml = this.buildSecondaryMenuHtml(desktopContent)

    // Update navigation stack
    this.navigationStack.push({
      type: 'primary',
      label
    })

    // Update mobile column
    this.mobileCol.innerHTML = secondaryMenuHtml

    // Set up listeners for the new secondary menu
    this.setupSecondaryNavListeners(label)
  }

  /**
   * Build HTML for secondary menu display
   * @param {Element} desktopContent - The desktop secondary content element
   * @returns {string} HTML string for the secondary menu
   */
  buildSecondaryMenuHtml(desktopContent) {
    let html = '<div class="navbar-az-fullscreen-nav-secondary-mobile">'

    // Add back button
    html += this.createBackButton('Main Menu')

    // Extract secondary nav content from desktop
    const secondaryNav = desktopContent.querySelector('.navbar-az-fullscreen-nav-secondary')
    if (secondaryNav) {
      // Clone the secondary nav structure
      const navContent = secondaryNav.innerHTML
      html += '<nav class="nav flex-column navbar-az-fullscreen-nav-secondary">'
      html += navContent
      html += '</nav>'
    }

    html += '</div>'
    return html
  }

  /**
   * Set up event listeners for secondary navigation items
   * @param {string} parentLabel - The label of the parent menu
   */
  setupSecondaryNavListeners(parentLabel) {
    // Back button
    const backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn')
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.goBack()
      })
    }

    // Secondary menu toggle buttons (for tertiary menus)
    const toggleButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-toggle')
    for (const button of toggleButtons) {
      button.addEventListener('click', e => {
        e.preventDefault()
        const tertiaryId = button.getAttribute('data-bs-target')
        const tertiaryContent = document.querySelector(tertiaryId)

        if (tertiaryContent) {
          // Extract the tertiary label from the parent link
          const parentLink = button.previousElementSibling?.textContent?.trim() || parentLabel
          this.showTertiaryNav(tertiaryContent, parentLink, parentLabel)
        }
      })
    }
  }

  /**
   * Display tertiary navigation
   * @param {Element} tertiaryContent - The tertiary content element
   * @param {string} label - The label of the tertiary menu
   * @param {string} parentLabel - The label of the parent secondary menu
   */
  showTertiaryNav(tertiaryContent, label, parentLabel) {
    const tertiaryMenuHtml = this.buildTertiaryMenuHtml(tertiaryContent, label, parentLabel)

    // Update navigation stack
    this.navigationStack.push({
      type: 'secondary',
      label,
      parentLabel
    })

    // Update mobile column
    this.mobileCol.innerHTML = tertiaryMenuHtml

    // Set up listeners for back button
    const backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn')
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.goBack()
      })
    }
  }

  /**
   * Build HTML for tertiary menu display
   * @param {Element} tertiaryContent - The tertiary content element
   * @param {string} label - The label of the menu
   * @param {string} parentLabel - The label of the parent menu
   * @returns {string} HTML string for the tertiary menu
   */
  buildTertiaryMenuHtml(tertiaryContent, label, parentLabel) {
    let html = '<div class="navbar-az-fullscreen-nav-tertiary-mobile">'

    // Add back button
    html += this.createBackButton(`${parentLabel}`)

    // Extract tertiary nav content
    const tertiaryNav = tertiaryContent.querySelector('.navbar-az-fullscreen-nav-secondary')
    if (tertiaryNav) {
      const navContent = tertiaryNav.innerHTML
      html += '<nav class="nav flex-column navbar-az-fullscreen-nav-secondary">'
      html += navContent
      html += '</nav>'
    } else {
      // Fallback: use the entire content if no nav element found
      html += tertiaryContent.innerHTML
    }

    html += '</div>'
    return html
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
        <hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation">
      </div>
    `
  }

  /**
   * Navigate back to the previous menu
   */
  goBack() {
    // Remove current level from stack
    this.navigationStack.pop()

    if (this.navigationStack.length === 0) {
      // Back to primary menu
      this.resetToPrimaryNav()
    } else {
      const previousLevel = this.navigationStack[this.navigationStack.length - 1]
      if (previousLevel.type === 'primary') {
        // Back to secondary menu
        this.navigationStack.pop()
        this.showSecondaryNav(
          this.getTargetIdForLabel(previousLevel.label),
          previousLevel.label
        )
      }
    }
  }

  /**
   * Reset to primary navigation
   */
  resetToPrimaryNav() {
    const primaryNav = document.querySelector('.navbar-az-fullscreen-nav-primary')
    if (primaryNav) {
      this.mobileCol.innerHTML = primaryNav.outerHTML
      this.setupPrimaryNavListeners()
    }
  }

  /**
   * Get the target ID for a primary menu label
   * @param {string} label - The menu label
   * @returns {string} The target ID
   */
  getTargetIdForLabel(label) {
    const labelMap = {
      Admissions: '#az-navbar-az-fullscreen-primary-admissions-content',
      Academics: '#az-navbar-az-fullscreen-primary-academics-content',
      Research: '#az-navbar-az-fullscreen-primary-research-content',
      'Campus Life': '#az-navbar-az-fullscreen-primary-campus-life-content',
      About: '#az-navbar-az-fullscreen-primary-about-content'
    }
    return labelMap[label] || ''
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const _navbarAzFullscreenMobileNav = new NavbarAzFullscreenMobileNav()
  })
} else {
  const _navbarAzFullscreenMobileNav = new NavbarAzFullscreenMobileNav()
}

if (typeof window !== 'undefined') {
  window.NavbarAzFullscreenMobileNav = NavbarAzFullscreenMobileNav
}

export default NavbarAzFullscreenMobileNav

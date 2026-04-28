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

    // Save call-to-action items as a fragment
    const ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions')
    this.ctaFragment = null
    if (ctaElement) {
      const fragment = document.createDocumentFragment()
      fragment.append(ctaElement.cloneNode(true))
      this.ctaFragment = fragment
    }

    this.navigationStack = [] // Stack to track navigation history
    this.labelToTargetMap = {} // Map to store label-to-targetId mappings from page content
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
      const targetId = button.getAttribute('data-az-menu-element')
      const label = button.textContent.trim()

      // Build dynamic mapping from page content
      if (targetId && label) {
        this.labelToTargetMap[label] = targetId
      }

      button.addEventListener('click', e => {
        e.preventDefault()

        if (targetId) {
          this.showSecondaryNav(targetId, label)
        }
      })
    }
  }

  /**
   * Display navigation menu (secondary or tertiary)
   * @param {Element|string} content - The content element or target ID to display
   * @param {string} label - The label of the menu item
   * @param {string} navType - Navigation type: 'primary' (secondary menu) or 'secondary' (tertiary menu)
   * @param {string} backButtonLabel - Label for the back button
   * @param {string} parentLabel - Parent label (used for tertiary navigation)
   */
  showNavMenu(content, label, navType, backButtonLabel, parentLabel = null) {
    // Handle both targetId (string) and Element
    let element = content
    if (typeof content === 'string') {
      element = document.querySelector(content)
      if (!element) {
        return
      }
    }

    // Create the menu display
    const menuHtml = this.buildMenuHtml(element, label, backButtonLabel)

    // Update navigation stack
    const stackEntry = { type: navType, label }
    if (parentLabel) {
      stackEntry.parentLabel = parentLabel
    }

    this.navigationStack.push(stackEntry)

    // Update mobile column
    this.mobileCol.innerHTML = menuHtml

    // Set up listeners for the new menu
    this.setupNavListeners(label, navType)
  }

  /**
   * Display secondary navigation for a primary menu item
   * @param {string} targetId - The ID of the secondary content to display
   * @param {string} label - The label of the primary menu item
   */
  showSecondaryNav(targetId, label) {
    this.showNavMenu(targetId, label, 'primary', 'Main Menu')
  }

  /**
   * Display tertiary navigation
   * @param {Element} tertiaryContent - The tertiary content element
   * @param {string} label - The label of the tertiary menu
   * @param {string} parentLabel - The label of the parent secondary menu
   */
  showTertiaryNav(tertiaryContent, label, parentLabel) {
    this.showNavMenu(tertiaryContent, label, 'secondary', parentLabel, parentLabel)
  }

  /**
   * Build HTML for menu display
   * @param {Element} content - The content element to display
   * @param {string} label - The label of the menu item that was clicked
   * @param {string} backButtonLabel - Label for the back button
   * @returns {string} HTML string for the menu
   */
  buildMenuHtml(content, label, backButtonLabel) {
    let html = '<div class="navbar-az-fullscreen-nav-menu-mobile">'

    // Add back button
    html += this.createBackButton(backButtonLabel)

    // Add menu heading
    html += `<h2 class="navbar-az-fullscreen-nav-mobile-menu-heading">${label} Menu</h2>`

    // Extract nav content from content
    const nav = content.querySelector('.navbar-az-fullscreen-nav-secondary')
    if (nav) {
      // Clone the nav element to avoid modifying the original
      const navClone = nav.cloneNode(true)
      // Remove tertiary panel if it exists
      const tertiaryPanel = navClone.querySelector('.navbar-az-fullscreen-nav-tertiary-panel')
      if (tertiaryPanel) {
        tertiaryPanel.remove()
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

      const navContent = navClone.innerHTML
      html += '<nav class="nav flex-column navbar-az-fullscreen-nav-secondary"><hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation">'
      html += navContent
      html += '<hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation"></nav>'
    } else {
      // Fallback: use the entire content if no nav element found
      html += content.innerHTML
    }

    html += '</div>'
    return html
  }

  /**
   * Set up event listeners for navigation menu
   * @param {string} parentLabel - The label of the parent/current menu
   * @param {string} parentNavType - Navigation type: 'primary' (secondary menu) or 'secondary' (tertiary menu)
   */
  setupNavListeners(parentLabel, parentNavType) {
    // Back button
    const backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn')
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.goBack()
      })
    }

    // Toggle buttons for secondary menu navigation
    if (parentNavType === 'primary') {
      const toggleButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-toggle')
      for (const button of toggleButtons) {
        button.addEventListener('click', e => {
          const tertiaryId = button.getAttribute('data-az-menu-element')
          const tertiaryContent = document.querySelector(tertiaryId)

          if (tertiaryContent) {
            // Extract the tertiary label from button aria-label text
            const toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
            this.showTertiaryNav(tertiaryContent, toggleLabel, parentLabel)
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
      // Clear the mobile column
      this.mobileCol.innerHTML = ''

      // Add call-to-action items
      if (this.ctaFragment) {
        const ctaClone = this.ctaFragment.cloneNode(true)
        this.mobileCol.append(ctaClone)
      }

      // Add primary navigation
      const primaryClone = primaryNav.cloneNode(true)

      // Update the tablist id for mobile
      const tablist = primaryClone.querySelector('#az-navbar-az-fullscreen-primary-tablist')
      if (tablist) {
        tablist.id = 'az-navbar-az-fullscreen-primary-tablist-mobile'
      }

      // Process all buttons in the cloned primary nav
      const buttons = primaryClone.querySelectorAll('button')
      for (const button of buttons) {
        // Replace data-bs-target with data-az-menu-element
        const targetId = button.getAttribute('data-bs-target')
        if (targetId) {
          button.setAttribute('data-az-menu-element', targetId)
          button.removeAttribute('data-bs-target')
        }

        // Remove specific attributes
        button.removeAttribute('id')
        button.removeAttribute('data-bs-toggle')
        button.removeAttribute('role')
        button.removeAttribute('aria-selected')

        // Update aria-controls
        button.setAttribute('aria-controls', 'navbar-az-fullscreen-nav-mobile-col')
      }

      this.mobileCol.append(primaryClone)

      this.setupPrimaryNavListeners()
    }
  }

  /**
   * Get the target ID for a primary menu label
   * @param {string} label - The menu label
   * @returns {string} The target ID
   */
  getTargetIdForLabel(label) {
    return this.labelToTargetMap[label] || ''
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

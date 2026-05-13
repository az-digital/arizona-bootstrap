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
    this.primaryNavContainer = document.querySelector('.navbar-az-fullscreen-nav-primary-col')
    this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col')

    if (!this.primaryNavContainer || !this.mobileCol) {
      // One or more required containers not found
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
      this.setupNavListeners(1, '', 'Main Menu', '')
    }
  }

  /**
   * Display secondary or tertiary navigation menu page
   * @param {number} navLevel - Navigation level
   * @param {string} sourceElementId - The source element ID to use
   * @param {string} label - The label of the menu item
   * @param {string} parentLabel - Parent label
   * @param {string} parentElementId - The parent element ID to use for back navigation (optional)
   */
  showNavMenu(navLevel, sourceElementId, label, parentLabel, parentElementId = null) {
    const element = document.querySelector(`${sourceElementId}`)
    if (!element) {
      return
    }

    // Create the menu display
    const menuHtml = this.buildMenuHtml(element, label, parentLabel)

    // Update mobile column
    this.mobileCol.innerHTML = menuHtml

    // Set up listeners for the new menu
    this.setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId)
  }

  /**
   * Display secondary navigation for a primary menu item
   * @param {string} sourceElementId - The ID of the source secondary content element
   * @param {string} label - The label of the primary menu item
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
   * @param {Element} sourceElement - The source element for the menu page content
   * @param {string} label - The label of the menu item that was clicked
   * @param {string} parentLabel - The label of the parent menu
   * @returns {string} HTML string for the menu
   */
  buildMenuHtml(sourceElement, label, parentLabel) {
    let html = '<div class="navbar-az-fullscreen-nav-menu-mobile">'

    // Add back button
    html += this.createBackButton(parentLabel)

    // Add menu heading
    html += `<h2 class="navbar-az-fullscreen-nav-mobile-menu-heading">${label} Menu</h2>`

    // Extract nav content from source element
    const nav = sourceElement.querySelector('.navbar-az-fullscreen-nav-secondary')
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

      let navContent = navClone.innerHTML
      navContent = navContent.replaceAll('class="vr"', 'class="vr my-2"')
      html += '<nav class="nav flex-column navbar-az-fullscreen-nav-secondary"><hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation">'
      html += navContent
      html += '<hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation"></nav>'
    } else {
      // Fallback: use the entire source element if no nav element found
      html += sourceElement.innerHTML
    }

    html += '</div>'
    return html
  }

  /**
   * Set up event listeners for navigation menu pages
   * @param {number} navLevel - Navigation level
   * @param {string} sourceElementId - The ID of the source element
   * @param {string} label - The label of the menu
   * @param {string} parentLabel - The label of the parent menu
   * @param {string} parentElementId - The ID of the parent element (optional)
   */
  setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId = null) {
    if (navLevel === 1) {
      const primaryButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-primary .nav-link')
      for (const button of primaryButtons) {
        const targetId = button.getAttribute('data-az-menu-element')
        const label = button.textContent.trim()
        button.addEventListener('click', e => {
          e.preventDefault()
          if (targetId) {
            this.showSecondaryNav(targetId, label)
          }
        })
      }

      return
    }

    // Back button
    const backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn')
    if (backButton) {
      backButton.addEventListener('click', () => {
        if (navLevel === 2) {
          this.resetToPrimaryNav()
        } else {
          this.showSecondaryNav(
            parentElementId,
            parentLabel
          )
        }
      })
    }

    // Toggle buttons for secondary menu navigation
    if (navLevel === 2) {
      const toggleButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-toggle')
      for (const button of toggleButtons) {
        button.addEventListener('click', e => {
          const tertiaryId = button.getAttribute('data-az-menu-element')

          if (tertiaryId) {
            // Extract the tertiary label from button aria-label text
            const toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '')
            this.showTertiaryNav(tertiaryId, toggleLabel, label, sourceElementId)
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

      this.setupNavListeners(1, '', 'Main Menu', '')
    }
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

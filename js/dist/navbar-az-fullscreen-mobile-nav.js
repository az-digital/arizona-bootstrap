/*!
  * Arizona Bootstrap navbar-az-fullscreen-mobile-nav.js v5.1.3 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2026 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.NavbarAzFullscreenMobileNav = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _createForOfIteratorHelperLoose(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var o = 0;
      return function () {
        return o >= r.length ? {
          done: true
        } : {
          done: false,
          value: r[o++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

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
  var NavbarAzFullscreenMobileNav = /*#__PURE__*/function () {
    function NavbarAzFullscreenMobileNav() {
      this.primaryNavElementId = '#az-navbar-az-fullscreen-primary-accordion';
      this.primaryNavContainer = document.querySelector(this.primaryNavElementId);
      this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col');
      if (!this.primaryNavContainer || !this.mobileCol) {
        // One or more required containers not found
        return;
      }

      // Save call-to-action items
      var ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions');
      this.mobileCtaHTML = null;
      if (ctaElement) {
        this.mobileCtaHTML = ctaElement.cloneNode(true).outerHTML;
      }
      this.init();
    }

    /**
     * Initialize the mobile navigation
     */
    var _proto = NavbarAzFullscreenMobileNav.prototype;
    _proto.init = function init() {
      var found = false;

      // Check tertiary links for match with current pathname
      var tertiaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-tertiary a.nav-link.active');
      for (var _iterator = _createForOfIteratorHelperLoose(tertiaryLinks), _step; !(_step = _iterator()).done;) {
        var _link = _step.value;
        if (_link.href === window.location.href) {
          var tertiaryPanel = _link.closest('.navbar-az-fullscreen-modal-menu-secondary-submenu');
          if (!tertiaryPanel) {
            continue;
          }
          var tertiaryPanelId = tertiaryPanel != null && tertiaryPanel.getAttribute('id') ? "#" + tertiaryPanel.getAttribute('id') : '';
          var tertiaryLabel = _link.textContent.trim();
          // Extract parent label from the secondary menu containing this tertiary panel
          var secondaryContentButton = document.querySelector("[data-bs-target=\"" + tertiaryPanelId + "\"]");
          var parentLabel = (secondaryContentButton == null ? void 0 : secondaryContentButton.previousElementSibling.textContent) || '';
          var _secondaryContent = secondaryContentButton == null ? void 0 : secondaryContentButton.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show');
          var secondaryContentId = (_secondaryContent == null ? void 0 : _secondaryContent.getAttribute('id')) || '';
          this.showTertiaryNav(tertiaryPanelId, tertiaryLabel, parentLabel, "#" + secondaryContentId);
          found = true;
        }
      }

      // Check secondary links for match with current pathname
      if (!found) {
        var secondaryLinks = document.querySelectorAll('.navbar-az-fullscreen-modal-menu-nav-col-secondary a.nav-link.active');
        for (var _iterator2 = _createForOfIteratorHelperLoose(secondaryLinks), _step2; !(_step2 = _iterator2()).done;) {
          var link = _step2.value;
          if (link.href === window.location.href) {
            var secondaryContent = link.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show');
            var targetId = (secondaryContent == null ? void 0 : secondaryContent.getAttribute('id')) || '';
            var label = link.textContent.trim();
            if (targetId) {
              this.showSecondaryNav("#" + targetId, label);
              found = true;
              break;
            }
          }
        }
      }

      // If no matching links found, display primary navigation
      if (!found) {
        this.setupNavListeners(1, this.primaryNavElementId);
      }

      // Set up mobile modal footers

      // Save top footer label
      this.topFooter = document.getElementById('navbar-az-fullscreen-modal-footer-top');
      if (this.topFooter) {
        // Save top footer nav links to an array
        this.topFooterLinks = Array.from(document.querySelectorAll('#navbar-az-fullscreen-modal-footer-top .nav-link')).map(function (link) {
          return {
            href: link.href,
            text: link.textContent.trim()
          };
        });
      }

      // Save bottom footer label
      this.bottomFooter = document.getElementById('navbar-az-fullscreen-modal-footer-bottom');
      if (this.bottomFooter) {
        // Save bottom footer nav links to an array
        this.bottomFooterLinks = Array.from(document.querySelectorAll('#navbar-az-fullscreen-modal-footer-bottom .nav-link')).map(function (link) {
          return {
            href: link.href,
            text: link.textContent.trim()
          };
        });
      }
      this.setupModalMobileFooter('navbar-az-fullscreen-modal-footer-top');
      this.setupModalMobileFooter('navbar-az-fullscreen-modal-footer-bottom');
    }

    /**
     * Set up the content and event listeners for a modal footer on mobile
     * @param {string} id - The ID of the modal footer to update
     */;
    _proto.setupModalMobileFooter = function setupModalMobileFooter(id) {
      var _this = this;
      var footer = document.getElementById(id);
      if (!footer) {
        return;
      }
      var firstFooterNavItem = footer.querySelector('.navbar-nav .nav-item');
      if (!firstFooterNavItem) {
        return;
      }

      // Clone the first nav item
      var clonedNavItem = firstFooterNavItem.cloneNode(true);

      // Get the original heading element and extract its text and id
      var originalHeading = footer.querySelector('h2.navbar-brand');
      var headingText = (originalHeading == null ? void 0 : originalHeading.textContent.trim()) || 'Resources for:';
      var headingId = (originalHeading == null ? void 0 : originalHeading.id) || 'resources-for-label';

      // Determine which footer links to use based on the id parameter
      var footerLinks = id === 'navbar-az-fullscreen-modal-footer-top' ? this.topFooterLinks : this.bottomFooterLinks;

      // Get the first 3 link texts
      var linkTexts = footerLinks ? footerLinks.slice(0, 3).map(function (link) {
        return link.text;
      }) : [];

      // Create the text with "and more..."
      var footerText = linkTexts.length > 0 ? linkTexts.join(', ') + ", and more..." : 'View more...';

      // Determine the data-az-menu-element and other attributes based on which footer this is
      var menuElementId = id === 'navbar-az-fullscreen-modal-footer-top' ? '#navbar-az-fullscreen-modal-footer-top' : '#navbar-az-fullscreen-modal-footer-bottom';
      var ariaLabel = "Toggle " + headingText.replace(':', '').trim() + " submenu";
      var html = "<button class=\"btn navbar-az-fullscreen-mobile-footer-btn navbar-az-fullscreen-mobile-footer-btn-text\" type=\"button\" aria-controls=\"navbar-az-fullscreen-nav-mobile-col\" aria-label=\"" + ariaLabel + "\" data-az-menu-element=\"" + menuElementId + "\"><h2 class=\"navbar-brand nav-link-text m-0\" id=\"" + headingId + "\">" + headingText + "</h2><span class=\"text-white\">" + footerText + "</span></button>";
      html += "<button class=\"btn nav-toggle collapsed navbar-az-fullscreen-mobile-footer-btn\" type=\"button\" aria-controls=\"navbar-az-fullscreen-nav-mobile-col\" aria-label=\"" + ariaLabel + "\" data-az-menu-element=\"" + menuElementId + "\">";
      html += '<span class="nav-toggle-icon" aria-hidden="true"></span>';
      html += '</button>';
      clonedNavItem.innerHTML = html;
      clonedNavItem.classList.add('d-lg-none');

      // Insert the cloned item as the first child of the parent
      var parentNav = firstFooterNavItem.parentElement;
      parentNav.insertBefore(clonedNavItem, parentNav.firstChild);

      // Set up event listeners for footer buttons
      var footerButtons = clonedNavItem.querySelectorAll('.btn');
      var _loop = function _loop() {
        var button = _step3.value;
        button.addEventListener('click', function (e) {
          var targetId = button.getAttribute('data-az-menu-element');
          if (targetId) {
            // Extract the menu label from button aria-label text
            var toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '');
            _this.showSecondaryNav(targetId, toggleLabel);
          }
        });
      };
      for (var _iterator3 = _createForOfIteratorHelperLoose(footerButtons), _step3; !(_step3 = _iterator3()).done;) {
        _loop();
      }
    }

    /**
     * Display navigation menu page
     * @param {number} navLevel - Navigation level
     * @param {string} sourceElementId - ID of the source element containing the menu content
     * @param {string} label - The label for the menu heading (optional)
     * @param {string} parentLabel - Parent label to use for back navigation (optional)
     * @param {string} parentElementId - Parent element ID to use for back navigation (optional)
     */;
    _proto.showNavMenu = function showNavMenu(navLevel, sourceElementId, label, parentLabel, parentElementId) {
      if (label === void 0) {
        label = null;
      }
      if (parentLabel === void 0) {
        parentLabel = null;
      }
      if (parentElementId === void 0) {
        parentElementId = null;
      }
      var element = document.querySelector("" + sourceElementId);
      if (!element) {
        return;
      }

      // Create the menu display
      var menuHtml = '';
      menuHtml = sourceElementId.includes('footer') ? this.buildFooterMenuHtml(element, label) : this.buildMenuHtml(navLevel, element, label, parentLabel);

      // Update mobile column
      this.mobileCol.innerHTML = menuHtml;

      // Set up listeners for the new menu
      this.setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId);
    }

    /**
     * Display primary navigation
     * @param {string} sourceElementId - The ID of the source primary content element
     */;
    _proto.showPrimaryNav = function showPrimaryNav(sourceElementId) {
      this.showNavMenu(1, sourceElementId);
    }

    /**
     * Display secondary navigation for a primary menu item
     * @param {string} sourceElementId - The ID of the source secondary content element
     * @param {string} label - The label of the secondary menu
     */;
    _proto.showSecondaryNav = function showSecondaryNav(sourceElementId, label) {
      this.showNavMenu(2, sourceElementId, label, 'Main Menu');
    }

    /**
     * Display tertiary navigation
     * @param {string} sourceElementId - The ID of the source tertiary content element
     * @param {string} label - The label of the tertiary menu
     * @param {string} parentLabel - The label of the parent secondary menu
     * @param {string} parentElementId - The ID of the parent secondary content element (optional)
     */;
    _proto.showTertiaryNav = function showTertiaryNav(sourceElementId, label, parentLabel, parentElementId) {
      if (parentElementId === void 0) {
        parentElementId = null;
      }
      this.showNavMenu(3, sourceElementId, label, parentLabel, parentElementId);
    }

    /**
     * Build HTML for menu page display
     * @param {number} navLevel - Navigation level
     * @param {Element} sourceElement - The source element for the menu page content
     * @param {string} label - The label for the menu heading (optional)
     * @param {string} parentLabel - The label of the parent menu (optional)
     * @returns {string} HTML string for the menu
     */;
    _proto.buildMenuHtml = function buildMenuHtml(navLevel, sourceElement, label, parentLabel) {
      if (label === void 0) {
        label = null;
      }
      if (parentLabel === void 0) {
        parentLabel = null;
      }
      var html = '<div class="navbar-az-fullscreen-nav-menu-mobile">';
      if (navLevel === 1) {
        // Add call-to-action items
        if (this.mobileCtaHTML) {
          html += this.mobileCtaHTML;
        }
      } else {
        // Add back button
        html += this.createBackButton(parentLabel);

        // Add menu heading
        html += "<h2 class=\"navbar-az-fullscreen-nav-mobile-menu-heading\">" + label + " Menu</h2>";
      }
      var nav;
      switch (navLevel) {
        case 1:
          {
            nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col');
            break;
          }
        case 2:
          {
            nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col-secondary');
            break;
          }
        case 3:
          {
            nav = sourceElement.querySelector('.navbar-az-fullscreen-modal-menu-nav-col-tertiary');
            break;
          }
      }
      if (nav) {
        // Clone the nav element to avoid modifying the original
        var navClone = nav.cloneNode(true);

        // Remove secondary panels if they exist
        var secondaryPanels = navClone.querySelectorAll('.navbar-az-fullscreen-modal-menu-primary-submenu');
        if (secondaryPanels) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(secondaryPanels), _step4; !(_step4 = _iterator4()).done;) {
            var panel = _step4.value;
            panel.remove();
          }
        }

        // Remove tertiary panels if they exist
        var tertiaryPanel = navClone.querySelectorAll('.navbar-az-fullscreen-modal-menu-secondary-submenu');
        if (tertiaryPanel) {
          for (var _iterator5 = _createForOfIteratorHelperLoose(tertiaryPanel), _step5; !(_step5 = _iterator5()).done;) {
            var _panel = _step5.value;
            _panel.remove();
          }
        }

        // Confirm if any active links are present
        var activeLinkExists = navClone.querySelectorAll('.nav-link.active').length > 0;

        // Process all buttons in the cloned nav
        var buttonCounter = 0;
        var buttons = navClone.querySelectorAll('button');
        for (var _iterator6 = _createForOfIteratorHelperLoose(buttons), _step6; !(_step6 = _iterator6()).done;) {
          var button = _step6.value;
          // Store data-bs-target value before removing attributes
          var targetId = button.getAttribute('data-bs-target');

          // Remove Bootstrap attributes
          button.removeAttribute('data-bs-toggle');
          button.removeAttribute('data-bs-target');
          button.removeAttribute('aria-expanded');

          // Create dynamic id
          buttonCounter++;
          button.id = "az-fullscreen-nav-mobile-" + buttonCounter;

          // Update aria-controls
          button.setAttribute('aria-controls', 'navbar-az-fullscreen-nav-mobile-col');

          // Add data-az-menu-element attribute with original target value
          if (targetId) {
            button.setAttribute('data-az-menu-element', targetId);
          }

          // Add collapsed class if this menu page has an active link
          if (activeLinkExists) {
            button.classList.add('collapsed');
          }
        }
        html += navClone.outerHTML;
      } else {
        // Fallback: use the entire source element if no nav element found
        html += sourceElement.outerHTML;
      }
      html += '</div>';
      return html;
    }

    /**
     * Build HTML for footer menu page display
     * @param {Element} sourceElement - The source footer element
     * @param {string} label - The label for the menu heading (optional)
     * @returns {string} HTML string for the footer menu
     */;
    _proto.buildFooterMenuHtml = function buildFooterMenuHtml(sourceElement, label) {
      if (label === void 0) {
        label = null;
      }
      var html = '<div class="navbar-az-fullscreen-nav-menu-mobile">';

      // Add back button
      html += this.createBackButton('Main Menu');

      // Get the original heading element and extract its text
      var originalHeading = sourceElement.querySelector('h2.navbar-brand');
      var headingText = (originalHeading == null ? void 0 : originalHeading.textContent.trim()) || label || 'Menu';

      // Add menu heading
      html += "<h2 class=\"navbar-az-fullscreen-nav-mobile-menu-heading\">" + headingText + "</h2>";

      // Determine which footer links to use
      var footerId = sourceElement.id;
      var footerLinks = footerId === 'navbar-az-fullscreen-modal-footer-top' ? this.topFooterLinks : this.bottomFooterLinks;
      var navId = footerId === 'navbar-az-fullscreen-modal-footer-top' ? 'az-navbar-az-fullscreen-footer-top-secondary-nav' : 'az-navbar-az-fullscreen-footer-bottom-secondary-nav';
      var ariaLabel = headingText.replace(':', '').trim();

      // Build the nav structure with all footer links
      html += '<div class="col col-lg-6 navbar-az-fullscreen-modal-menu-nav-col navbar-az-fullscreen-modal-menu-nav-col-secondary">';
      html += "<ul class=\"nav\" id=\"" + navId + "\" aria-label=\"" + ariaLabel + "\">";
      if (footerLinks && footerLinks.length > 0) {
        for (var _iterator7 = _createForOfIteratorHelperLoose(footerLinks), _step7; !(_step7 = _iterator7()).done;) {
          var link = _step7.value;
          html += '<li class="nav-item">';
          html += "<a class=\"nav-link\" href=\"" + link.href + "\">";
          html += "<span class=\"nav-link-text\">" + link.text + "</span>";
          html += '</a>';
          html += '</li>';
        }
      }
      html += '</ul>';
      html += '</div>';
      html += '</div>';
      return html;
    }

    /**
     * Set up event listeners for navigation menu pages
     * @param {number} navLevel - Navigation level
     * @param {string} sourceElementId - ID of the source element for the current menu content
     * @param {string} label - The label for the menu heading (optional)
     * @param {string} parentLabel - The label of the parent menu (optional)
     * @param {string} parentElementId - The ID of the parent element (optional)
     */;
    _proto.setupNavListeners = function setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId) {
      var _this2 = this;
      if (label === void 0) {
        label = null;
      }
      if (parentLabel === void 0) {
        parentLabel = null;
      }
      if (parentElementId === void 0) {
        parentElementId = null;
      }
      if (navLevel !== 1) {
        // Back button
        var backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn');
        if (backButton) {
          backButton.addEventListener('click', function () {
            if (navLevel === 2) {
              _this2.showPrimaryNav(_this2.primaryNavElementId);
            } else {
              _this2.showSecondaryNav(parentElementId, parentLabel);
            }
          });
        }
      }

      // Toggle buttons for secondary menu navigation
      if (navLevel !== 3) {
        var toggleButtons = this.mobileCol.querySelectorAll('.nav-toggle');
        var _loop2 = function _loop2() {
          var button = _step8.value;
          button.addEventListener('click', function (e) {
            var targetId = button.getAttribute('data-az-menu-element');
            if (targetId) {
              // Extract the menu label from button aria-label text
              var toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '');
              if (navLevel === 1) {
                _this2.showSecondaryNav(targetId, toggleLabel);
              } else {
                _this2.showTertiaryNav(targetId, toggleLabel, label, sourceElementId);
              }
            }
          });
        };
        for (var _iterator8 = _createForOfIteratorHelperLoose(toggleButtons), _step8; !(_step8 = _iterator8()).done;) {
          _loop2();
        }
      }
    }

    /**
     * Create a back button element
     * @param {string} label - The label for the back button
     * @returns {string} HTML string for the back button
     */;
    _proto.createBackButton = function createBackButton(label) {
      return "\n      <div class=\"navbar-az-fullscreen-nav-back\">\n        <button type=\"button\" class=\"btn navbar-az-fullscreen-nav-back-btn\" aria-label=\"Back to " + label + "\">\n          Back to " + label + "\n        </button>\n      </div>\n    ";
    };
    return NavbarAzFullscreenMobileNav;
  }();
  /**
   * Initialize Arizona Bootstrap fullscreen mobile navigation.
   * Initializes immediately if DOM is ready, otherwise defers until DOM is loaded.
   * @returns {NavbarAzFullscreenMobileNav} The created mobile navigation instance
   */
  function enableNavbarAzFullscreenMobileNav() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    // Defer initialization until DOM is ready if needed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        return new NavbarAzFullscreenMobileNav();
      }, {
        once: true
      });
    } else {
      return new NavbarAzFullscreenMobileNav();
    }
  }

  return enableNavbarAzFullscreenMobileNav;

}));
//# sourceMappingURL=navbar-az-fullscreen-mobile-nav.js.map

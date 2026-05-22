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
      this.primaryNavContainer = document.querySelector('.navbar-az-fullscreen-nav-primary-col');
      this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col');
      if (!this.primaryNavContainer || !this.mobileCol) {
        // One or more required containers not found
        return;
      }

      // Save call-to-action items as a fragment
      var ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions');
      this.ctaFragment = null;
      if (ctaElement) {
        var fragment = document.createDocumentFragment();
        fragment.append(ctaElement.cloneNode(true));
        this.ctaFragment = fragment;
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
      var tertiaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-tertiary-panel a.nav-link.active');
      for (var _iterator = _createForOfIteratorHelperLoose(tertiaryLinks), _step; !(_step = _iterator()).done;) {
        var _link = _step.value;
        if (_link.href === window.location.href) {
          var tertiaryPanel = _link.closest('.navbar-az-fullscreen-nav-tertiary-panel');
          if (!tertiaryPanel) {
            continue;
          }
          var tertiaryPanelId = tertiaryPanel != null && tertiaryPanel.getAttribute('id') ? "#" + tertiaryPanel.getAttribute('id') : '';
          var tertiaryLabel = _link.textContent.trim();
          // Extract parent label from the secondary menu containing this tertiary panel
          var secondaryContentButton = document.querySelector("[data-bs-target=\"" + tertiaryPanelId + "\"]");
          var parentLabel = (secondaryContentButton == null ? void 0 : secondaryContentButton.previousElementSibling.previousElementSibling.textContent) || '';
          var _secondaryContent = secondaryContentButton == null ? void 0 : secondaryContentButton.closest('.tab-pane.active');
          var secondaryContentId = (_secondaryContent == null ? void 0 : _secondaryContent.getAttribute('id')) || '';
          this.showTertiaryNav(tertiaryPanelId, tertiaryLabel, parentLabel, "#" + secondaryContentId);
          found = true;
        }
      }

      // Check secondary links for match with current pathname
      if (!found) {
        var secondaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-secondary-scroll a.nav-link.active');
        for (var _iterator2 = _createForOfIteratorHelperLoose(secondaryLinks), _step2; !(_step2 = _iterator2()).done;) {
          var link = _step2.value;
          if (link.href === window.location.href) {
            var secondaryContent = link.closest('.tab-pane.active');
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
        this.setupNavListeners(1, '', 'Main Menu', '');
      }
    }

    /**
     * Display secondary or tertiary navigation menu page
     * @param {number} navLevel - Navigation level
     * @param {string} sourceElementId - The source element ID to use
     * @param {string} label - The label of the menu item
     * @param {string} parentLabel - Parent label
     * @param {string} parentElementId - The parent element ID to use for back navigation (optional)
     */;
    _proto.showNavMenu = function showNavMenu(navLevel, sourceElementId, label, parentLabel, parentElementId) {
      if (parentElementId === void 0) {
        parentElementId = null;
      }
      var element = document.querySelector("" + sourceElementId);
      if (!element) {
        return;
      }

      // Create the menu display
      var menuHtml = this.buildMenuHtml(element, label, parentLabel);

      // Update mobile column
      this.mobileCol.innerHTML = menuHtml;

      // Set up listeners for the new menu
      this.setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId);
    }

    /**
     * Display secondary navigation for a primary menu item
     * @param {string} sourceElementId - The ID of the source secondary content element
     * @param {string} label - The label of the primary menu item
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
     * @param {Element} sourceElement - The source element for the menu page content
     * @param {string} label - The label of the menu item that was clicked
     * @param {string} parentLabel - The label of the parent menu
     * @returns {string} HTML string for the menu
     */;
    _proto.buildMenuHtml = function buildMenuHtml(sourceElement, label, parentLabel) {
      var html = '<div class="navbar-az-fullscreen-nav-menu-mobile">';

      // Add back button
      html += this.createBackButton(parentLabel);

      // Add menu heading
      html += "<h2 class=\"navbar-az-fullscreen-nav-mobile-menu-heading\">" + label + " Menu</h2>";

      // Extract nav content from source element
      var nav = sourceElement.querySelector('.navbar-az-fullscreen-nav-secondary');
      if (nav) {
        // Clone the nav element to avoid modifying the original
        var navClone = nav.cloneNode(true);
        // Remove tertiary panel if it exists
        var tertiaryPanel = navClone.querySelector('.navbar-az-fullscreen-nav-tertiary-panel');
        if (tertiaryPanel) {
          tertiaryPanel.remove();
        }

        // Process all buttons in the cloned nav
        var buttonCounter = 0;
        var buttons = navClone.querySelectorAll('button');
        for (var _iterator3 = _createForOfIteratorHelperLoose(buttons), _step3; !(_step3 = _iterator3()).done;) {
          var button = _step3.value;
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
        }
        var navContent = navClone.innerHTML;
        navContent = navContent.replaceAll('class="vr"', 'class="vr my-2"');
        html += '<nav class="nav flex-column navbar-az-fullscreen-nav-secondary"><hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation">';
        html += navContent;
        html += '<hr class="border-top border-azurite opacity-100" aria-hidden="true" role="presentation"></nav>';
      } else {
        // Fallback: use the entire source element if no nav element found
        html += sourceElement.innerHTML;
      }
      html += '</div>';
      return html;
    }

    /**
     * Set up event listeners for navigation menu pages
     * @param {number} navLevel - Navigation level
     * @param {string} sourceElementId - The ID of the source element
     * @param {string} label - The label of the menu
     * @param {string} parentLabel - The label of the parent menu
     * @param {string} parentElementId - The ID of the parent element (optional)
     */;
    _proto.setupNavListeners = function setupNavListeners(navLevel, sourceElementId, label, parentLabel, parentElementId) {
      var _this = this;
      if (parentElementId === void 0) {
        parentElementId = null;
      }
      if (navLevel === 1) {
        var primaryButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-primary .nav-link');
        var _loop = function _loop() {
          var button = _step4.value;
          var targetId = button.getAttribute('data-az-menu-element');
          var label = button.textContent.trim();
          button.addEventListener('click', function (e) {
            e.preventDefault();
            if (targetId) {
              _this.showSecondaryNav(targetId, label);
            }
          });
        };
        for (var _iterator4 = _createForOfIteratorHelperLoose(primaryButtons), _step4; !(_step4 = _iterator4()).done;) {
          _loop();
        }
        return;
      }

      // Back button
      var backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn');
      if (backButton) {
        backButton.addEventListener('click', function () {
          if (navLevel === 2) {
            _this.resetToPrimaryNav();
          } else {
            _this.showSecondaryNav(parentElementId, parentLabel);
          }
        });
      }

      // Toggle buttons for secondary menu navigation
      if (navLevel === 2) {
        var toggleButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-toggle');
        var _loop2 = function _loop2() {
          var button = _step5.value;
          button.addEventListener('click', function (e) {
            var tertiaryId = button.getAttribute('data-az-menu-element');
            if (tertiaryId) {
              // Extract the tertiary label from button aria-label text
              var toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '');
              _this.showTertiaryNav(tertiaryId, toggleLabel, label, sourceElementId);
            }
          });
        };
        for (var _iterator5 = _createForOfIteratorHelperLoose(toggleButtons), _step5; !(_step5 = _iterator5()).done;) {
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
    }

    /**
     * Reset to primary navigation
     */;
    _proto.resetToPrimaryNav = function resetToPrimaryNav() {
      var primaryNav = document.querySelector('.navbar-az-fullscreen-nav-primary');
      if (primaryNav) {
        // Clear the mobile column
        this.mobileCol.innerHTML = '';

        // Add call-to-action items
        if (this.ctaFragment) {
          var ctaClone = this.ctaFragment.cloneNode(true);
          this.mobileCol.append(ctaClone);
        }

        // Add primary navigation
        var primaryClone = primaryNav.cloneNode(true);

        // Update the tablist id for mobile
        var tablist = primaryClone.querySelector('#az-navbar-az-fullscreen-primary-tablist');
        if (tablist) {
          tablist.id = 'az-navbar-az-fullscreen-primary-tablist-mobile';
        }

        // Process all buttons in the cloned primary nav
        var buttons = primaryClone.querySelectorAll('button');
        for (var _iterator6 = _createForOfIteratorHelperLoose(buttons), _step6; !(_step6 = _iterator6()).done;) {
          var button = _step6.value;
          // Replace data-bs-target with data-az-menu-element
          var targetId = button.getAttribute('data-bs-target');
          if (targetId) {
            button.setAttribute('data-az-menu-element', targetId);
            button.removeAttribute('data-bs-target');
          }

          // Remove specific attributes
          button.removeAttribute('id');
          button.removeAttribute('data-bs-toggle');
          button.removeAttribute('role');
          button.removeAttribute('aria-selected');

          // Update aria-controls
          button.setAttribute('aria-controls', 'navbar-az-fullscreen-nav-mobile-col');
        }
        this.mobileCol.append(primaryClone);
        this.setupNavListeners(1, '', 'Main Menu', '');
      }
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

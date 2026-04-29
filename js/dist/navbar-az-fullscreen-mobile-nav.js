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
      this.mobileCol = document.querySelector('#navbar-az-fullscreen-nav-mobile-col');
      this.desktopSecondaryContainer = document.querySelector('.navbar-az-fullscreen-nav-secondary-tertiary-cols');
      this.primaryNavContainer = document.querySelector('.navbar-az-fullscreen-nav-primary-col');
      if (!this.mobileCol) {
        // Mobile navbar column not found
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
      this.navigationStack = []; // Stack to track navigation history
      this.labelToTargetMap = {}; // Map to store label-to-targetId mappings from page content
      this.init();
    }

    /**
     * Initialize the mobile navigation
     */
    var _proto = NavbarAzFullscreenMobileNav.prototype;
    _proto.init = function init() {
      // Set up event listeners for primary navigation items in mobile view
      this.setupPrimaryNavListeners();
    }

    /**
     * Set up click listeners on primary navigation items
     */;
    _proto.setupPrimaryNavListeners = function setupPrimaryNavListeners() {
      var _this = this;
      var primaryButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-primary .nav-link');
      var _loop = function _loop() {
        var button = _step.value;
        var targetId = button.getAttribute('data-az-menu-element');
        var label = button.textContent.trim();

        // Build dynamic mapping from page content
        if (targetId && label) {
          _this.labelToTargetMap[label] = targetId;
        }
        button.addEventListener('click', function (e) {
          e.preventDefault();
          if (targetId) {
            _this.showSecondaryNav(targetId, label);
          }
        });
      };
      for (var _iterator = _createForOfIteratorHelperLoose(primaryButtons), _step; !(_step = _iterator()).done;) {
        _loop();
      }
    }

    /**
     * Display navigation menu (secondary or tertiary)
     * @param {Element|string} content - The content element or target ID to display
     * @param {string} label - The label of the menu item
     * @param {string} navType - Navigation type: 'primary' (secondary menu) or 'secondary' (tertiary menu)
     * @param {string} backButtonLabel - Label for the back button
     * @param {string} parentLabel - Parent label (used for tertiary navigation)
     */;
    _proto.showNavMenu = function showNavMenu(content, label, navType, backButtonLabel, parentLabel) {
      if (parentLabel === void 0) {
        parentLabel = null;
      }
      // Handle both targetId (string) and Element
      var element = content;
      if (typeof content === 'string') {
        element = document.querySelector(content);
        if (!element) {
          return;
        }
      }

      // Create the menu display
      var menuHtml = this.buildMenuHtml(element, label, backButtonLabel);

      // Update navigation stack
      var stackEntry = {
        type: navType,
        label: label
      };
      if (parentLabel) {
        stackEntry.parentLabel = parentLabel;
      }
      this.navigationStack.push(stackEntry);

      // Update mobile column
      this.mobileCol.innerHTML = menuHtml;

      // Set up listeners for the new menu
      this.setupNavListeners(label, navType);
    }

    /**
     * Display secondary navigation for a primary menu item
     * @param {string} targetId - The ID of the secondary content to display
     * @param {string} label - The label of the primary menu item
     */;
    _proto.showSecondaryNav = function showSecondaryNav(targetId, label) {
      this.showNavMenu(targetId, label, 'primary', 'Main Menu');
    }

    /**
     * Display tertiary navigation
     * @param {Element} tertiaryContent - The tertiary content element
     * @param {string} label - The label of the tertiary menu
     * @param {string} parentLabel - The label of the parent secondary menu
     */;
    _proto.showTertiaryNav = function showTertiaryNav(tertiaryContent, label, parentLabel) {
      this.showNavMenu(tertiaryContent, label, 'secondary', parentLabel, parentLabel);
    }

    /**
     * Build HTML for menu display
     * @param {Element} content - The content element to display
     * @param {string} label - The label of the menu item that was clicked
     * @param {string} backButtonLabel - Label for the back button
     * @returns {string} HTML string for the menu
     */;
    _proto.buildMenuHtml = function buildMenuHtml(content, label, backButtonLabel) {
      var html = '<div class="navbar-az-fullscreen-nav-menu-mobile">';

      // Add back button
      html += this.createBackButton(backButtonLabel);

      // Add menu heading
      html += "<h2 class=\"navbar-az-fullscreen-nav-mobile-menu-heading\">" + label + " Menu</h2>";

      // Extract nav content from content
      var nav = content.querySelector('.navbar-az-fullscreen-nav-secondary');
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
        for (var _iterator2 = _createForOfIteratorHelperLoose(buttons), _step2; !(_step2 = _iterator2()).done;) {
          var button = _step2.value;
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
        // Fallback: use the entire content if no nav element found
        html += content.innerHTML;
      }
      html += '</div>';
      return html;
    }

    /**
     * Set up event listeners for navigation menu
     * @param {string} parentLabel - The label of the parent/current menu
     * @param {string} parentNavType - Navigation type: 'primary' (secondary menu) or 'secondary' (tertiary menu)
     */;
    _proto.setupNavListeners = function setupNavListeners(parentLabel, parentNavType) {
      var _this2 = this;
      // Back button
      var backButton = this.mobileCol.querySelector('.navbar-az-fullscreen-nav-back-btn');
      if (backButton) {
        backButton.addEventListener('click', function () {
          _this2.goBack();
        });
      }

      // Toggle buttons for secondary menu navigation
      if (parentNavType === 'primary') {
        var toggleButtons = this.mobileCol.querySelectorAll('.navbar-az-fullscreen-nav-toggle');
        var _loop2 = function _loop2() {
          var button = _step3.value;
          button.addEventListener('click', function (e) {
            var tertiaryId = button.getAttribute('data-az-menu-element');
            var tertiaryContent = document.querySelector(tertiaryId);
            if (tertiaryContent) {
              // Extract the tertiary label from button aria-label text
              var toggleLabel = e.target.ariaLabel.replace('Toggle ', '').replace(' submenu', '');
              _this2.showTertiaryNav(tertiaryContent, toggleLabel, parentLabel);
            }
          });
        };
        for (var _iterator3 = _createForOfIteratorHelperLoose(toggleButtons), _step3; !(_step3 = _iterator3()).done;) {
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
     * Navigate back to the previous menu
     */;
    _proto.goBack = function goBack() {
      // Remove current level from stack
      this.navigationStack.pop();
      if (this.navigationStack.length === 0) {
        // Back to primary menu
        this.resetToPrimaryNav();
      } else {
        var previousLevel = this.navigationStack[this.navigationStack.length - 1];
        if (previousLevel.type === 'primary') {
          // Back to secondary menu
          this.navigationStack.pop();
          this.showSecondaryNav(this.getTargetIdForLabel(previousLevel.label), previousLevel.label);
        }
      }
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
        for (var _iterator4 = _createForOfIteratorHelperLoose(buttons), _step4; !(_step4 = _iterator4()).done;) {
          var button = _step4.value;
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
        this.setupPrimaryNavListeners();
      }
    }

    /**
     * Get the target ID for a primary menu label
     * @param {string} label - The menu label
     * @returns {string} The target ID
     */;
    _proto.getTargetIdForLabel = function getTargetIdForLabel(label) {
      return this.labelToTargetMap[label] || '';
    };
    return NavbarAzFullscreenMobileNav;
  }(); // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      new NavbarAzFullscreenMobileNav();
    });
  } else {
    new NavbarAzFullscreenMobileNav();
  }
  if (typeof window !== 'undefined') {
    window.NavbarAzFullscreenMobileNav = NavbarAzFullscreenMobileNav;
  }

  return NavbarAzFullscreenMobileNav;

}));
//# sourceMappingURL=navbar-az-fullscreen-mobile-nav.js.map

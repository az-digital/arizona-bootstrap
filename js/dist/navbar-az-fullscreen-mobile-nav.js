/*!
  * Arizona Bootstrap navbar-az-fullscreen-mobile-nav.js v5.1.5 (https://github.com/az-digital/arizona-bootstrap)
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
   * Arizona Bootstrap: navbar-az-fullscreen-mobile-nav.js
   * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Arizona Bootstrap Fullscreen Navbar Mobile Navigation (experimental)
   * Handles paged navigation for the mobile view of AZ Navbar Fullscreen.
   */

  var IDS = {
    FOOTER_TOP: 'navbar-az-fullscreen-modal-footer-top',
    FOOTER_BOTTOM: 'navbar-az-fullscreen-modal-footer-bottom',
    MOBILE_COL: 'navbar-az-fullscreen-nav-mobile-col'
  };
  var LABELS = {
    MAIN_MENU: 'Main'
  };
  var FULLSCREEN_MODAL_SELECTOR = '.navbar-az-fullscreen-modal';
  var FULLSCREEN_MODAL_RESET_EVENT = 'az.navbar-fullscreen.reset';
  var NavbarAzFullscreenMobileNav = /*#__PURE__*/function () {
    function NavbarAzFullscreenMobileNav() {
      var _this$mobileCol;
      this.primaryNavElementId = '#az-navbar-az-fullscreen-primary-accordion';
      this.mobileCol = document.getElementById(IDS.MOBILE_COL);
      this.modalFooterTop = document.getElementById(IDS.FOOTER_TOP);
      this.modalFooterBottom = document.getElementById(IDS.FOOTER_BOTTOM);
      this.modalElement = (_this$mobileCol = this.mobileCol) == null ? void 0 : _this$mobileCol.closest(FULLSCREEN_MODAL_SELECTOR);
      if (!document.querySelector(this.primaryNavElementId) || !this.mobileCol) {
        return;
      }

      // Initialize variables for preserved DOM content
      this.mobileColInitialContent = this.mobileCol.cloneNode(true);
      this.mobileCtaNode = null;
      this.primaryNavMenuNode = null;

      // Initialize state variables
      this.navListenersInitialized = false;
      this.currentNavLevel = 1;
      this.currentMenuSourceId = this.primaryNavElementId;
      this.currentMenuLabel = null;
      this.currentMenuParentLabel = null;
      this.currentMenuParentElementId = null;
      this.initialNavLevel = 1;
      this.initialMenuSourceId = this.primaryNavElementId;
      this.initialMenuLabel = null;
      this.initialMenuParentLabel = null;
      this.initialMenuParentElementId = null;

      // Initialize window location variable
      this.cleanWindowLocation = new URL(window.location.href);
      this.cleanWindowLocation.search = '';
      this.cleanWindowLocation.hash = '';
      this.init();
    }

    /**
     * Initialize the mobile navigation
     */
    var _proto = NavbarAzFullscreenMobileNav.prototype;
    _proto.init = function init() {
      var _this$modalElement,
        _this = this;
      (_this$modalElement = this.modalElement) == null || _this$modalElement.addEventListener(FULLSCREEN_MODAL_RESET_EVENT, function () {
        _this.resetToInitialState();
      });

      // Save call-to-action items
      var ctaElement = this.mobileCol.querySelector('.navbar-az-fullscreen-actions');
      if (ctaElement) {
        this.mobileCtaNode = ctaElement.cloneNode(true);
      }
      var activeLinkFound = false;

      // Check active tertiary links for a match with the current pathname
      var activeTertiaryLinks = document.querySelectorAll('.navbar-az-fullscreen-nav-tertiary a.nav-link.active');
      for (var _iterator = _createForOfIteratorHelperLoose(activeTertiaryLinks), _step; !(_step = _iterator()).done;) {
        var _link = _step.value;
        if (_link.href === this.cleanWindowLocation.href) {
          var _secondaryContentButt;
          var tertiaryPanel = _link.closest('.navbar-az-fullscreen-modal-menu-secondary-submenu');
          if (!tertiaryPanel) {
            continue;
          }
          var tertiaryPanelId = tertiaryPanel != null && tertiaryPanel.getAttribute('id') ? "#" + tertiaryPanel.getAttribute('id') : '';
          var secondaryContentButton = document.querySelector("[data-bs-target=\"" + tertiaryPanelId + "\"]");
          var tertiaryLabel = (secondaryContentButton == null ? void 0 : secondaryContentButton.previousElementSibling.textContent.trim()) || '';
          var parentLabel = (secondaryContentButton == null || (_secondaryContentButt = secondaryContentButton.closest('.navbar-az-fullscreen-nav-secondary')) == null ? void 0 : _secondaryContentButt.getAttribute('aria-label')) || '';
          var _secondaryContent = secondaryContentButton == null ? void 0 : secondaryContentButton.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show');
          var secondaryContentId = (_secondaryContent == null ? void 0 : _secondaryContent.getAttribute('id')) || '';
          this.showNavMenu(3, tertiaryPanelId, tertiaryLabel, parentLabel, "#" + secondaryContentId);
          activeLinkFound = true;
        }
      }

      // Check active secondary links for a match with the current pathname
      if (!activeLinkFound) {
        var activeSecondaryLinks = document.querySelectorAll('.navbar-az-fullscreen-modal-menu-nav-col-secondary a.nav-link.active');
        for (var _iterator2 = _createForOfIteratorHelperLoose(activeSecondaryLinks), _step2; !(_step2 = _iterator2()).done;) {
          var link = _step2.value;
          if (link.href === this.cleanWindowLocation.href) {
            var _link$closest;
            var secondaryContent = link.closest('.navbar-az-fullscreen-modal-menu-primary-submenu.show');
            var targetId = (secondaryContent == null ? void 0 : secondaryContent.getAttribute('id')) || '';
            var label = ((_link$closest = link.closest('.navbar-az-fullscreen-nav-secondary')) == null ? void 0 : _link$closest.getAttribute('aria-label')) || '';
            if (targetId) {
              this.showNavMenu(2, "#" + targetId, label);
              activeLinkFound = true;
              break;
            }
          }
        }
      }

      // Set up mobile modal footers
      this.topFooterLinks = [];
      this.bottomFooterLinks = [];
      activeLinkFound = this.setupModalMobileFooter('top', activeLinkFound);
      activeLinkFound = this.setupModalMobileFooter('bottom', activeLinkFound);

      // Save DOM and state of initial mobile menu
      if (activeLinkFound) {
        this.mobileColInitialContent = this.mobileCol.cloneNode(true);
        this.initialNavLevel = this.currentNavLevel;
        this.initialMenuSourceId = this.currentMenuSourceId;
        this.initialMenuLabel = this.currentMenuLabel;
        this.initialMenuParentLabel = this.currentMenuParentLabel;
        this.initialMenuParentElementId = this.currentMenuParentElementId;
      }
      this.setupNavListeners();
    }

    /**
     * Reset the mobile nav to its initial state upon page load.
     */;
    _proto.resetToInitialState = function resetToInitialState() {
      var _this$mobileCol2;
      if (!(this.mobileCol instanceof HTMLElement) || !this.mobileColInitialContent) {
        return;
      }
      var clone = this.mobileColInitialContent.cloneNode(true);
      (_this$mobileCol2 = this.mobileCol).replaceChildren.apply(_this$mobileCol2, Array.from(clone.childNodes));
      this.currentNavLevel = this.initialNavLevel;
      this.currentMenuSourceId = this.initialMenuSourceId;
      this.currentMenuLabel = this.initialMenuLabel;
      this.currentMenuParentLabel = this.initialMenuParentLabel;
      this.currentMenuParentElementId = this.initialMenuParentElementId;
      this.toggleFooterDisplay(this.currentMenuSourceId);
    }

    /**
     * Set up the content and event listeners for a modal footer on mobile
     * @param {string} footerPosition - Which modal footer to update ('top' or 'bottom')
     * @param {boolean} activeLinkFound - Whether a matching active link was found prior to this footer's initialization
     * @returns {boolean} Whether an active link was found in this footer's links during initialization
     */;
    _proto.setupModalMobileFooter = function setupModalMobileFooter(footerPosition, activeLinkFound) {
      var _this2 = this;
      if (activeLinkFound === void 0) {
        activeLinkFound = false;
      }
      var footer = footerPosition === 'top' ? this.modalFooterTop : this.modalFooterBottom;
      if (!footer) {
        return;
      }

      // Get the mobile footer button and extract its heading text
      var mobileFooterHeading = footer.querySelector('.navbar-az-fullscreen-mobile-footer-btn-text .navbar-brand');
      var headingText = mobileFooterHeading == null ? void 0 : mobileFooterHeading.textContent.trim();

      // Save footer nav links to an array
      var footerLinksProperty = footerPosition === 'top' ? 'topFooterLinks' : 'bottomFooterLinks';
      var found = false;
      this[footerLinksProperty] = Array.from(document.querySelectorAll("#" + footer.id + " .nav-link")).map(function (link) {
        if (!activeLinkFound && !found && link.href === _this2.cleanWindowLocation.href) {
          found = true;
        }
        return {
          href: link.href,
          text: link.textContent.trim()
        };
      });

      // If a match was found in this footer's links, display the menu page
      if (!activeLinkFound && found) {
        this.showNavMenu(2, "#" + footer.id, headingText);
      }

      // Set up event listeners for footer buttons
      var footerButtons = footer.querySelectorAll(':scope .btn');
      var _loop = function _loop() {
        var button = _step3.value;
        button.addEventListener('click', function () {
          var targetId = button.getAttribute('data-az-menu-element');
          if (targetId) {
            _this2.showNavMenu(2, targetId, headingText);
          }
        });
      };
      for (var _iterator3 = _createForOfIteratorHelperLoose(footerButtons), _step3; !(_step3 = _iterator3()).done;) {
        _loop();
      }
      return activeLinkFound || found;
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
      var _this$mobileCol3;
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
      if (navLevel === 2) {
        parentLabel = LABELS.MAIN_MENU;
      }
      this.currentNavLevel = navLevel;
      this.currentMenuSourceId = sourceElementId;
      this.currentMenuLabel = label;
      this.currentMenuParentLabel = parentLabel;
      this.currentMenuParentElementId = parentElementId;

      // Create the menu display
      var menuNode = sourceElementId.includes('footer') ? this.buildFooterMenuNode(element, label) : this.buildMenuNode(navLevel, element, label, parentLabel);

      // Update mobile column
      (_this$mobileCol3 = this.mobileCol).replaceChildren.apply(_this$mobileCol3, Array.from(menuNode.childNodes));
      this.toggleFooterDisplay(sourceElementId);
    }

    /**
     * Build HTML for menu page display
     * @param {number} navLevel - Navigation level
     * @param {Element} sourceElement - The source element for the menu page content
     * @param {string} label - The label for the menu heading (optional)
     * @param {string} parentLabel - The label of the parent menu (optional)
     * @returns {DocumentFragment} Document fragment for the menu
     */;
    _proto.buildMenuNode = function buildMenuNode(navLevel, sourceElement, label, parentLabel) {
      if (label === void 0) {
        label = null;
      }
      if (parentLabel === void 0) {
        parentLabel = null;
      }
      var fragment = document.createDocumentFragment();
      if (navLevel === 1) {
        if (this.primaryNavMenuNode) {
          return this.primaryNavMenuNode.cloneNode(true);
        }
        if (this.mobileCtaNode) {
          fragment.append(this.mobileCtaNode.cloneNode(true));
        }
      } else {
        fragment.append(this.createBackButtonElement(parentLabel));
        var heading = document.createElement('h2');
        heading.className = 'navbar-az-fullscreen-nav-mobile-menu-heading';
        heading.textContent = label + " Menu";
        fragment.append(heading);
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
        var navClone = nav.cloneNode(true);

        // Remove secondary panels if they exist
        var secondaryPanels = navClone.querySelectorAll(':scope .navbar-az-fullscreen-modal-menu-primary-submenu');
        for (var _iterator4 = _createForOfIteratorHelperLoose(secondaryPanels), _step4; !(_step4 = _iterator4()).done;) {
          var panel = _step4.value;
          panel.remove();
        }

        // Remove tertiary panels if they exist
        var tertiaryPanels = navClone.querySelectorAll(':scope .navbar-az-fullscreen-modal-menu-secondary-submenu');
        for (var _iterator5 = _createForOfIteratorHelperLoose(tertiaryPanels), _step5; !(_step5 = _iterator5()).done;) {
          var _panel = _step5.value;
          _panel.remove();
        }

        // Confirm if any active links are present
        var activeLinkExists = navClone.querySelectorAll(':scope .nav-link.active').length > 0;

        // Process all buttons in the cloned nav
        var buttonCounter = 0;
        var buttons = navClone.querySelectorAll(':scope button');
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
          button.setAttribute('id', "az-fullscreen-nav-mobile-" + buttonCounter);

          // Update aria-controls
          button.setAttribute('aria-controls', IDS.MOBILE_COL);

          // Add data-az-menu-element attribute with original target value
          if (targetId) {
            button.setAttribute('data-az-menu-element', targetId);
          }

          // Add collapsed class if this menu page has an active link
          if (activeLinkExists) {
            button.classList.add('collapsed');
          }
        }
        fragment.append(navClone);
      } else {
        fragment.append(sourceElement.cloneNode(true));
      }
      if (navLevel === 1 && !this.primaryNavMenuNode) {
        this.primaryNavMenuNode = fragment.cloneNode(true);
      }
      return fragment;
    }

    /**
     * Build HTML for footer menu page display
     * @param {Element} sourceElement - The source footer element
     * @param {string} label - The label for the menu heading
     * @returns {DocumentFragment} Document fragment for the footer menu
     */;
    _proto.buildFooterMenuNode = function buildFooterMenuNode(sourceElement, label) {
      if (label === void 0) {
        label = '';
      }
      var fragment = document.createDocumentFragment();
      fragment.append(this.createBackButtonElement(LABELS.MAIN_MENU));
      var heading = document.createElement('h2');
      heading.className = 'navbar-az-fullscreen-nav-mobile-menu-heading';
      heading.textContent = label;
      fragment.append(heading);
      var footerLinks = sourceElement.id === IDS.FOOTER_TOP ? this.topFooterLinks : this.bottomFooterLinks;
      var navId = sourceElement.id === IDS.FOOTER_TOP ? 'az-navbar-az-fullscreen-footer-top-secondary-nav' : 'az-navbar-az-fullscreen-footer-bottom-secondary-nav';
      var column = document.createElement('div');
      column.className = 'col col-lg-6 navbar-az-fullscreen-modal-menu-nav-col navbar-az-fullscreen-modal-menu-nav-col-secondary';
      var list = document.createElement('ul');
      list.className = 'nav';
      list.setAttribute('id', navId);
      list.setAttribute('aria-label', label);
      if (footerLinks && footerLinks.length > 0) {
        for (var _iterator7 = _createForOfIteratorHelperLoose(footerLinks), _step7; !(_step7 = _iterator7()).done;) {
          var link = _step7.value;
          var item = document.createElement('li');
          item.className = 'nav-item';
          var anchor = document.createElement('a');
          anchor.className = 'nav-link';
          if (link.href === this.cleanWindowLocation.href) {
            anchor.classList.add('active');
          }
          anchor.href = link.href;
          var anchorText = document.createElement('span');
          anchorText.className = 'nav-link-text';
          anchorText.textContent = link.text;
          anchor.append(anchorText);
          item.append(anchor);
          list.append(item);
        }
      }
      column.append(list);
      fragment.append(column);
      return fragment;
    }

    /**
     * Hide the footer for the current footer menu page
     *
     * @param {string} sourceElementId - The ID of the source element for the current menu page
     */;
    _proto.toggleFooterDisplay = function toggleFooterDisplay(sourceElementId) {
      if (sourceElementId === "#" + IDS.FOOTER_TOP) {
        var _this$modalFooterTop, _this$modalFooterBott;
        (_this$modalFooterTop = this.modalFooterTop) == null || _this$modalFooterTop.classList.add('d-none');
        (_this$modalFooterBott = this.modalFooterBottom) == null || _this$modalFooterBott.classList.remove('d-none');
      } else if (sourceElementId === "#" + IDS.FOOTER_BOTTOM) {
        var _this$modalFooterBott2, _this$modalFooterTop2;
        (_this$modalFooterBott2 = this.modalFooterBottom) == null || _this$modalFooterBott2.classList.add('d-none');
        (_this$modalFooterTop2 = this.modalFooterTop) == null || _this$modalFooterTop2.classList.remove('d-none');
      } else {
        var _this$modalFooterTop3, _this$modalFooterBott3;
        (_this$modalFooterTop3 = this.modalFooterTop) == null || _this$modalFooterTop3.classList.remove('d-none');
        (_this$modalFooterBott3 = this.modalFooterBottom) == null || _this$modalFooterBott3.classList.remove('d-none');
      }
    }

    /**
     * Set up event listeners for navigation menu pages
     */;
    _proto.setupNavListeners = function setupNavListeners() {
      var _this3 = this;
      if (this.navListenersInitialized || !(this.mobileCol instanceof HTMLElement)) {
        return;
      }
      this.mobileCol.addEventListener('click', function (e) {
        var button = e.target;
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        if (button.classList.contains('navbar-az-fullscreen-nav-back-btn')) {
          // Handle back button events
          if (_this3.currentNavLevel === 2) {
            _this3.showNavMenu(1, _this3.primaryNavElementId);
          } else if (_this3.currentNavLevel === 3) {
            _this3.showNavMenu(2, _this3.currentMenuParentElementId, _this3.currentMenuParentLabel);
          }
        } else if (button.classList.contains('nav-toggle')) {
          // Handle menu nav toggle button events
          var targetId = button.getAttribute('data-az-menu-element');
          if (targetId) {
            // Extract the menu label from button aria-label text
            var toggleLabel = button.ariaLabel.replace('Toggle ', '').replace(' submenu', '');
            if (_this3.currentNavLevel === 1) {
              _this3.showNavMenu(2, targetId, toggleLabel);
            } else {
              _this3.showNavMenu(3, targetId, toggleLabel, _this3.currentMenuLabel, _this3.currentMenuSourceId);
            }
          }
        }
      });
      this.navListenersInitialized = true;
    }

    /**
     * Create a back button element
     * @param {string} label - The label for the back button
     * @returns {Element} The new back button element
     */;
    _proto.createBackButtonElement = function createBackButtonElement(label) {
      var wrapper = document.createElement('div');
      wrapper.className = 'navbar-az-fullscreen-nav-back';
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn navbar-az-fullscreen-nav-back-btn';
      button.setAttribute('aria-label', "Back to " + label + " Menu");
      var span = document.createElement('span');
      span.textContent = "Back to " + label + " Menu";
      button.append(span);
      wrapper.append(button);
      return wrapper;
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

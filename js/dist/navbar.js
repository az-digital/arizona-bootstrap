/*!
  * Arizona Bootstrap navbar.js v5.1.0 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2026 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../node_modules/bootstrap/js/src/collapse.js'), require('../../node_modules/bootstrap/js/src/dropdown.js'), require('../../node_modules/bootstrap/js/src/dom/event-handler.js')) :
  typeof define === 'function' && define.amd ? define(['../../node_modules/bootstrap/js/src/collapse', '../../node_modules/bootstrap/js/src/dropdown', '../../node_modules/bootstrap/js/src/dom/event-handler'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Navbar = factory(global.Collapse, global.Dropdown, global.EventHandler));
})(this, (function (Collapse, Dropdown, EventHandler) { 'use strict';

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
  function _inheritsLoose(t, o) {
    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';
  var HIDE_DELAY_MS = 300;
  var RESIZE_DEBOUNCE_MS = 100;

  // Enable hover behavior only on fine-pointer devices to avoid touch conflicts.
  var supportsPointerHover = function supportsPointerHover() {
    var _window$matchMedia;
    return typeof window !== 'undefined' && (window.matchMedia == null || (_window$matchMedia = window.matchMedia(HOVER_MEDIA_QUERY)) == null ? void 0 : _window$matchMedia.matches) === true;
  };

  /**
   * Calculate and set the max-width for dropdown menus in a navbar-az to half
   * the navbar width, and toggle `dropdown-menu-end` on dropdowns positioned
   * past the midpoint that would otherwise overflow.
   */
  function updateDropdownAlignment(navbar) {
    var navbarWidth = navbar.offsetWidth;
    var halfWidth = Math.floor(navbarWidth / 2);

    // Set the CSS custom property so dropdown-menu max-width stays in sync.
    navbar.style.setProperty('--az-navbar-dropdown-max-width', halfWidth + "px");
    var dropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown');
    for (var _iterator = _createForOfIteratorHelperLoose(dropdowns), _step; !(_step = _iterator()).done;) {
      var dropdown = _step.value;
      var menu = dropdown.querySelector(':scope > .dropdown-menu');
      if (!menu) {
        continue;
      }

      // Determine this dropdown's horizontal position relative to the navbar.
      var navbarRect = navbar.getBoundingClientRect();
      var dropdownRect = dropdown.getBoundingClientRect();
      var dropdownStart = dropdownRect.left - navbarRect.left;
      var remainingSpace = navbarRect.right - dropdownRect.left;

      // Only right-align if the dropdown is past the midpoint AND its max-content
      // width would overflow the remaining space to the right of the navbar.
      // We temporarily measure the menu's natural width to make this determination.
      // The menu may be hidden (display:none), so we must briefly make it visible
      // off-screen to get an accurate measurement.
      var wasHidden = window.getComputedStyle(menu).display === 'none';
      if (wasHidden) {
        menu.style.display = 'block';
        menu.style.visibility = 'hidden';
        menu.style.position = 'absolute';
      }
      var savedMaxWidth = menu.style.maxWidth;
      var savedWidth = menu.style.width;
      menu.style.maxWidth = 'none';
      menu.style.width = 'max-content';
      var naturalWidth = menu.scrollWidth;
      menu.style.maxWidth = savedMaxWidth;
      menu.style.width = savedWidth;
      if (wasHidden) {
        menu.style.display = '';
        menu.style.visibility = '';
        menu.style.position = '';
      }
      if (dropdownStart > halfWidth && naturalWidth > remainingSpace) {
        menu.classList.add('dropdown-menu-end');
      } else {
        menu.classList.remove('dropdown-menu-end');
      }
    }
  }

  /**
   * Set up a ResizeObserver to keep dropdown alignment in sync with the navbar
   * width (handles viewport changes, container resizing, etc.).
   */
  function observeNavbarResize(navbar) {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    var resizeTimer = null;
    var observer = new ResizeObserver(function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        updateDropdownAlignment(navbar);
      }, RESIZE_DEBOUNCE_MS);
    });
    observer.observe(navbar);
  }
  function getPrimaryDropdownTrigger(dropdownElement) {
    var toggle = dropdownElement.querySelector(':scope > .dropdown-toggle');
    return toggle instanceof HTMLElement ? toggle : null;
  }

  // Close sibling dropdowns unless they were opened via click.
  function closeOtherDropdowns(navbar, currentDropdownElement) {
    var openTriggers = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown .dropdown-toggle.show');
    for (var _iterator2 = _createForOfIteratorHelperLoose(openTriggers), _step2; !(_step2 = _iterator2()).done;) {
      var trigger = _step2.value;
      if (!(trigger instanceof HTMLElement)) {
        continue;
      }
      var dropdownElement = trigger.closest('.navbar-nav > .nav-item.dropdown');
      if (!dropdownElement || dropdownElement === currentDropdownElement) {
        continue;
      }
      var instance = Dropdown.getInstance(trigger);
      if (instance != null && instance.isClickOpen != null && instance.isClickOpen()) {
        continue;
      }
      instance == null || instance.hide();
    }
  }
  var NavbarHoverDropdown = /*#__PURE__*/function (_Dropdown) {
    function NavbarHoverDropdown(element, dropdownElement, navbar, config) {
      var _this;
      _this = _Dropdown.call(this, element, config) || this;
      _this._dropdownElement = dropdownElement;
      _this._navbar = navbar;
      _this._hideTimer = null;
      _this._shouldCloseSiblings = dropdownElement.matches('.navbar-nav > .nav-item.dropdown');
      _this._initialCollapseStates = _this._captureCollapseStates();
      // State flags for hover/click coordination.
      _this._hoverTriggered = false;
      _this._suppressNextBlur = false;
      _this._suppressNextFocus = false;
      _this._hoverOpen = false;
      _this._clickOpen = false;
      _this._pendingClick = false;
      _this._wasHoverOpened = false;
      _this._suppressHover = false;
      _this._ignoreNextToggle = false;
      if (supportsPointerHover()) {
        _this._addHoverListeners();
      }
      return _this;
    }
    _inheritsLoose(NavbarHoverDropdown, _Dropdown);
    var _proto = NavbarHoverDropdown.prototype;
    _proto.dispose = function dispose() {
      this._removeHoverListeners();
      _Dropdown.prototype.dispose.call(this);
    };
    _proto._addHoverListeners = function _addHoverListeners() {
      var _this2 = this;
      if (!this._dropdownElement) {
        return;
      }
      this._boundOnEnter = function () {
        return _this2._handleHoverEnter();
      };
      this._boundOnLeave = function () {
        return _this2._handleHoverLeave();
      };
      this._boundMenuEnter = function () {
        return _this2._cancelScheduledHide();
      };
      this._boundMenuLeave = function () {
        return _this2._handleHoverLeave();
      };
      this._boundOnFocus = function (event) {
        return _this2._handleFocus(event);
      };
      this._boundOnBlur = function (event) {
        return _this2._handleBlur(event);
      };
      this._boundOnMouseDown = function () {
        return _this2._handleMouseDown();
      };
      this._boundOnClick = function (event) {
        return _this2._handleClick(event);
      };
      EventHandler.on(this._element, 'mouseenter', this._boundOnEnter);
      EventHandler.on(this._element, 'mouseleave', this._boundOnLeave);
      EventHandler.on(this._element, 'focus', this._boundOnFocus);
      EventHandler.on(this._element, 'blur', this._boundOnBlur);
      EventHandler.on(this._element, 'mousedown', this._boundOnMouseDown);
      EventHandler.on(this._element, 'click', this._boundOnClick);
      EventHandler.on(this._dropdownElement, 'mouseleave', this._boundOnLeave);
      if (this._menu) {
        EventHandler.on(this._menu, 'mouseenter', this._boundMenuEnter);
        EventHandler.on(this._menu, 'mouseleave', this._boundMenuLeave);
      }
    };
    _proto._removeHoverListeners = function _removeHoverListeners() {
      if (!this._dropdownElement || !supportsPointerHover()) {
        return;
      }
      EventHandler.off(this._element, 'mouseenter', this._boundOnEnter);
      EventHandler.off(this._element, 'mouseleave', this._boundOnLeave);
      EventHandler.off(this._element, 'focus', this._boundOnFocus);
      EventHandler.off(this._element, 'blur', this._boundOnBlur);
      EventHandler.off(this._element, 'mousedown', this._boundOnMouseDown);
      EventHandler.off(this._element, 'click', this._boundOnClick);
      EventHandler.off(this._dropdownElement, 'mouseleave', this._boundOnLeave);
      if (this._menu) {
        EventHandler.off(this._menu, 'mouseenter', this._boundMenuEnter);
        EventHandler.off(this._menu, 'mouseleave', this._boundMenuLeave);
      }
    }

    // Hover opens the menu and closes hover-open siblings.
  ;
    _proto._handleHoverEnter = function _handleHoverEnter() {
      if (this._suppressHover) {
        return;
      }
      this._cancelScheduledHide();
      this._hoverTriggered = true;
      this._hoverOpen = true;
      this._wasHoverOpened = true;
      if (this._shouldCloseSiblings && this._navbar && this._dropdownElement) {
        closeOtherDropdowns(this._navbar, this._dropdownElement);
      }
      this._suppressNextFocus = true;
      this.show();
      if (this._suppressNextFocus) {
        this._suppressNextFocus = false;
      }
      this._removePointerFocus();
    };
    _proto._handleHoverLeave = function _handleHoverLeave() {
      this._suppressHover = false;
      this._scheduleHide({
        source: 'hover'
      });
    }

    // Focus opens the menu, but skips focus transitions into the menu.
  ;
    _proto._handleFocus = function _handleFocus(event) {
      var _this$_menu;
      // Suppress focus triggered by click - the click handler manages that interaction
      if (this._suppressNextFocus) {
        this._suppressNextFocus = false;
        return;
      }
      if (event.relatedTarget && (_this$_menu = this._menu) != null && _this$_menu.contains(event.relatedTarget)) {
        return;
      }
      this._cancelScheduledHide();
      if (this._isShown()) {
        return;
      }
      this._hoverOpen = false;
      this._wasHoverOpened = false;
      this.show();
    }

    // Blur schedules a hide unless focus moved into the menu.
  ;
    _proto._handleBlur = function _handleBlur(event) {
      var _this$_menu2;
      if (this._suppressNextBlur) {
        this._suppressNextBlur = false;
        return;
      }
      if (event.relatedTarget && (_this$_menu2 = this._menu) != null && _this$_menu2.contains(event.relatedTarget)) {
        return;
      }
      this._scheduleHide();
    };
    _proto._handleMouseDown = function _handleMouseDown() {
      // Set flag before focus fires (event order: mousedown → focus → click)
      this._suppressNextFocus = true;
    }

    // Click is handled here to prevent Bootstrap's delegated double-toggle.
  ;
    _proto._handleClick = function _handleClick(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._pendingClick = true;
      this._cancelScheduledHide();
      this.toggle();
    }

    // Hide on hover-out, but never when the menu is click-open.
  ;
    _proto._scheduleHide = function _scheduleHide(_temp) {
      var _this3 = this;
      var _ref = _temp === void 0 ? {} : _temp,
        source = _ref.source;
      this._cancelScheduledHide();
      if (this._clickOpen) {
        return;
      }
      if (source === 'hover' && !this._hoverOpen) {
        return;
      }
      this._hideTimer = window.setTimeout(function () {
        _this3.hide();
      }, HIDE_DELAY_MS);
    };
    _proto._cancelScheduledHide = function _cancelScheduledHide() {
      if (this._hideTimer) {
        window.clearTimeout(this._hideTimer);
        this._hideTimer = null;
      }
    }

    /**
     * Handles click-driven toggling while preserving independent hover state.
     * The click handler sets `_pendingClick`, and this method processes that
     * click before Bootstrap's delegated toggle runs.
     *
     * Behavior:
     * - If a click occurs while the menu is hover-open, convert it to click-open.
     * - If already open via click, close and suppress immediate re-toggle.
     * - Otherwise open via click and mark `_clickOpen`.
     * - Ignore the next delegated `toggle()` invoked by Bootstrap after a handled click.
     */;
    _proto.toggle = function toggle() {
      if (this._pendingClick) {
        this._pendingClick = false;
        this._ignoreNextToggle = true; // Ignore Bootstrap's subsequent toggle call

        if (this._isShown()) {
          if (this._wasHoverOpened && !this._clickOpen) {
            this._clickOpen = true;
            this._hoverOpen = false;
            this._wasHoverOpened = false;
            this._cancelScheduledHide();
            return;
          }
          this._hoverOpen = false;
          this._wasHoverOpened = false;
          this._suppressHover = true;
          _Dropdown.prototype.hide.call(this);
          this._ignoreNextToggle = true;
          this._clickOpen = this._isShown();
          return;
        }
        this._hoverOpen = false;
        this._wasHoverOpened = false;
        this._cancelScheduledHide();
        _Dropdown.prototype.show.call(this);
        this._clickOpen = this._isShown();
        return;
      }

      // Ignore toggle calls from Bootstrap's delegated handler after we already processed the click
      if (this._ignoreNextToggle) {
        this._ignoreNextToggle = false;
        return;
      }
      return _Dropdown.prototype.toggle.call(this);
    };
    _proto.hide = function hide() {
      this._hoverOpen = false;
      this._clickOpen = false;
      this._pendingClick = false;
      this._ignoreNextToggle = false;
      this._cancelScheduledHide();
      this._resetCollapseState();
      return _Dropdown.prototype.hide.call(this);
    };
    _proto._completeHide = function _completeHide(relatedTarget) {
      this._hoverOpen = false;
      this._clickOpen = false;
      this._pendingClick = false;
      this._ignoreNextToggle = false;
      this._cancelScheduledHide();
      this._resetCollapseState();
      _Dropdown.prototype._completeHide.call(this, relatedTarget);
    }

    /**
     * Snapshot the initial show/hide state of each `.collapse` submenu inside
     * this dropdown's menu, based on the server-rendered HTML at page load.
     */;
    _proto._captureCollapseStates = function _captureCollapseStates() {
      var _this$_dropdownElemen;
      var menu = this._menu || ((_this$_dropdownElemen = this._dropdownElement) == null ? void 0 : _this$_dropdownElemen.querySelector('.dropdown-menu'));
      if (!menu) {
        return new Map();
      }
      var states = new Map();
      var collapses = menu.querySelectorAll('.collapse');
      for (var _iterator3 = _createForOfIteratorHelperLoose(collapses), _step3; !(_step3 = _iterator3()).done;) {
        var collapse = _step3.value;
        states.set(collapse, collapse.classList.contains('show'));
      }
      return states;
    }

    /**
     * Reset every `.collapse` submenu inside this dropdown's menu back to its
     * initial page-load state (determined by `.active` placement in the HTML).
     */;
    _proto._resetCollapseState = function _resetCollapseState() {
      var _this$_dropdownElemen2;
      if (!this._initialCollapseStates || this._initialCollapseStates.size === 0) {
        return;
      }
      var menu = this._menu || ((_this$_dropdownElemen2 = this._dropdownElement) == null ? void 0 : _this$_dropdownElemen2.querySelector('.dropdown-menu'));
      var togglesByTarget = new Map();
      if (menu) {
        var toggles = menu.querySelectorAll('[data-bs-target]');
        for (var _iterator4 = _createForOfIteratorHelperLoose(toggles), _step4; !(_step4 = _iterator4()).done;) {
          var toggle = _step4.value;
          var target = toggle.getAttribute('data-bs-target');
          if (target) {
            togglesByTarget.set(target, toggle);
          }
        }
      }
      for (var _iterator5 = _createForOfIteratorHelperLoose(this._initialCollapseStates), _step5; !(_step5 = _iterator5()).done;) {
        var _step5$value = _step5.value,
          collapse = _step5$value[0],
          wasShown = _step5$value[1];
        var isShown = collapse.classList.contains('show');
        if (wasShown === isShown) {
          continue;
        }
        var instance = Collapse.getOrCreateInstance(collapse, {
          toggle: false
        });
        if (wasShown) {
          instance.show();
        } else {
          instance.hide();
        }

        // Sync the toggle button's aria-expanded attribute.
        if (collapse.id) {
          var _toggle = togglesByTarget.get("#" + collapse.id);
          if (_toggle) {
            _toggle.setAttribute('aria-expanded', String(wasShown));
          }
        }
      }
    }

    // Remove focus after hover to avoid sticky focus rings.
  ;
    _proto._removePointerFocus = function _removePointerFocus() {
      if (!this._hoverTriggered) {
        return;
      }
      if (document.activeElement === this._element) {
        this._suppressNextBlur = true;
        this._element.blur();
      }
      this._hoverTriggered = false;
    };
    _proto.isClickOpen = function isClickOpen() {
      return this._clickOpen;
    };
    return NavbarHoverDropdown;
  }(Dropdown); // Wire up hover dropdowns for AZ navbars and global outside interactions.
  function enableAzNavbar() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }
    var navbars = document.querySelectorAll('.navbar-az');
    if (!navbars.length) {
      return;
    }
    if (!supportsPointerHover()) {
      return;
    }
    var handleOutsideInteraction = function handleOutsideInteraction(event) {
      var target = event == null ? void 0 : event.target;
      if (!(target instanceof Node)) {
        return;
      }
      for (var _iterator6 = _createForOfIteratorHelperLoose(navbars), _step6; !(_step6 = _iterator6()).done;) {
        var navbar = _step6.value;
        var openTriggers = navbar.querySelectorAll('.dropdown-toggle.show');
        for (var _iterator7 = _createForOfIteratorHelperLoose(openTriggers), _step7; !(_step7 = _iterator7()).done;) {
          var trigger = _step7.value;
          var instance = Dropdown.getInstance(trigger);
          if (!(instance instanceof NavbarHoverDropdown) || !instance.isClickOpen()) {
            continue;
          }
          var dropdownElement = trigger.closest('.navbar-nav > .nav-item.dropdown');
          if (!dropdownElement || dropdownElement.contains(target)) {
            continue;
          }
          instance.hide();
        }
      }
    };
    EventHandler.on(document, 'click', handleOutsideInteraction);
    EventHandler.on(document, 'focusin', handleOutsideInteraction);
    var _loop = function _loop() {
      var navbar = _step8.value;
      // Set initial dropdown alignment and start observing resize changes.
      updateDropdownAlignment(navbar);
      observeNavbarResize(navbar);
      EventHandler.on(navbar, 'mouseover', function (event) {
        var target = event == null ? void 0 : event.target;
        if (!(target instanceof Element)) {
          return;
        }
        var navList = target.closest('.navbar-nav');
        if (!navList) {
          return;
        }
        var openTriggers = navbar.querySelectorAll('.dropdown-toggle.show');
        for (var _iterator9 = _createForOfIteratorHelperLoose(openTriggers), _step9; !(_step9 = _iterator9()).done;) {
          var trigger = _step9.value;
          var instance = Dropdown.getInstance(trigger);
          if (!(instance instanceof NavbarHoverDropdown) || instance.isClickOpen()) {
            continue;
          }
          if (!instance._hoverOpen) {
            continue;
          }
          var dropdownElement = trigger.closest('.navbar-nav .nav-item.dropdown');
          if (dropdownElement) {
            var menuElement = instance._menu || dropdownElement.querySelector('.dropdown-menu');
            var isInsideToggle = trigger.contains(target);
            var isInsideMenu = menuElement instanceof Element && menuElement.contains(target);
            if (isInsideToggle || isInsideMenu) {
              continue;
            }
          }
          instance._scheduleHide({
            source: 'hover'
          });
        }
      });
      EventHandler.on(navbar, 'mouseleave', function () {
        var openTriggers = navbar.querySelectorAll('.dropdown-toggle.show');
        for (var _iterator0 = _createForOfIteratorHelperLoose(openTriggers), _step0; !(_step0 = _iterator0()).done;) {
          var trigger = _step0.value;
          var instance = Dropdown.getInstance(trigger);
          if (instance instanceof NavbarHoverDropdown) {
            if (instance.isClickOpen()) {
              continue;
            }
            instance._scheduleHide({
              source: 'navbar'
            });
            continue;
          }
          instance == null || instance.hide();
        }
      });
      var dropdowns = navbar.querySelectorAll('.navbar-nav > .nav-item.dropdown');
      for (var _iterator1 = _createForOfIteratorHelperLoose(dropdowns), _step1; !(_step1 = _iterator1()).done;) {
        var dropdownElement = _step1.value;
        if (!(dropdownElement instanceof HTMLElement)) {
          continue;
        }
        var triggerElement = getPrimaryDropdownTrigger(dropdownElement);
        if (!triggerElement) {
          continue;
        }
        var existingInstance = Dropdown.getInstance(triggerElement);
        if (existingInstance && !(existingInstance instanceof NavbarHoverDropdown)) {
          existingInstance.dispose();
        }
        if (existingInstance instanceof NavbarHoverDropdown) {
          continue;
        }
        createNavbarHoverDropdown(triggerElement, dropdownElement, navbar);
      }
    };
    for (var _iterator8 = _createForOfIteratorHelperLoose(navbars), _step8; !(_step8 = _iterator8()).done;) {
      _loop();
    }
  }
  function createNavbarHoverDropdown(triggerElement, dropdownElement, navbar) {
    return new NavbarHoverDropdown(triggerElement, dropdownElement, navbar);
  }

  return enableAzNavbar;

}));
//# sourceMappingURL=navbar.js.map

/*!
  * Arizona Bootstrap navbar-az-fullscreen.js v5.1.4 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2026 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../node_modules/bootstrap/js/src/dom/event-handler.js')) :
  typeof define === 'function' && define.amd ? define(['../../node_modules/bootstrap/js/src/dom/event-handler'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.NavbarAzFullscreen = factory(global.EventHandler));
})(this, (function (EventHandler) { 'use strict';

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

  var DESKTOP_MEDIA_QUERY = '(min-width: 992px)';
  var RESIZE_DEBOUNCE_MS = 100;
  var FULLSCREEN_MODAL_SELECTOR = '.navbar-az-fullscreen-modal';
  var NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-nav-col';
  var PRIMARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-nav-col-primary';
  var PRIMARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-primary';
  var SECONDARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-secondary';
  var TERTIARY_NAV_SELECTOR = '.navbar-az-fullscreen-nav-tertiary';
  var COLLAPSING_SUBMENU_SELECTOR = '.navbar-az-fullscreen-modal-menu-submenu.collapsing';
  var ACTIVE_SECONDARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-primary-submenu.collapse.show .navbar-az-fullscreen-modal-menu-nav-col-secondary';
  var ACTIVE_TERTIARY_NAV_COL_SELECTOR = '.navbar-az-fullscreen-modal-menu-secondary-submenu.collapse.show .navbar-az-fullscreen-modal-menu-nav-col-tertiary';
  function isDesktopViewport() {
    var _window$matchMedia;
    return typeof window !== 'undefined' && (window.matchMedia == null || (_window$matchMedia = window.matchMedia(DESKTOP_MEDIA_QUERY)) == null ? void 0 : _window$matchMedia.matches) === true;
  }
  function isVisible(element) {
    if (!(element instanceof HTMLElement)) {
      return false;
    }
    if (element.getClientRects().length === 0) {
      return false;
    }
    var computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
  }
  function getDesktopVisibleNavColumns(modalElement) {
    var allColumns = modalElement.querySelectorAll(NAV_COL_SELECTOR);
    return [].concat(allColumns).filter(isVisible);
  }
  function getVisibleNavTargets(modalElement) {
    var targets = [];
    for (var _iterator = _createForOfIteratorHelperLoose(getDesktopVisibleNavColumns(modalElement)), _step; !(_step = _iterator()).done;) {
      var column = _step.value;
      var nav = column.querySelector(':scope > .nav');
      if (!(nav instanceof HTMLElement) || !isVisible(nav)) {
        continue;
      }
      targets.push({
        nav: nav,
        column: column
      });
    }
    return targets;
  }
  function getActiveDesktopNavTargets(modalElement) {
    var targets = [];
    var seenColumns = new Set();
    var addTarget = function addTarget(nav) {
      if (!(nav instanceof HTMLElement) || !isVisible(nav)) {
        return;
      }
      var column = nav.closest(NAV_COL_SELECTOR);
      if (!(column instanceof HTMLElement) || !isVisible(column) || seenColumns.has(column)) {
        return;
      }
      seenColumns.add(column);
      targets.push({
        nav: nav,
        column: column
      });
    };
    addTarget(modalElement.querySelector(PRIMARY_NAV_COL_SELECTOR + " > " + PRIMARY_NAV_SELECTOR));
    for (var _iterator2 = _createForOfIteratorHelperLoose(modalElement.querySelectorAll(ACTIVE_SECONDARY_NAV_COL_SELECTOR + " > " + SECONDARY_NAV_SELECTOR)), _step2; !(_step2 = _iterator2()).done;) {
      var nav = _step2.value;
      addTarget(nav);
    }
    for (var _iterator3 = _createForOfIteratorHelperLoose(modalElement.querySelectorAll(ACTIVE_TERTIARY_NAV_COL_SELECTOR + " > " + TERTIARY_NAV_SELECTOR)), _step3; !(_step3 = _iterator3()).done;) {
      var _nav = _step3.value;
      addTarget(_nav);
    }
    return targets.length > 0 ? targets : getVisibleNavTargets(modalElement);
  }
  function clearNavColumnHeights(modalElement) {
    var allColumns = modalElement.querySelectorAll(NAV_COL_SELECTOR);
    for (var _iterator4 = _createForOfIteratorHelperLoose(allColumns), _step4; !(_step4 = _iterator4()).done;) {
      var column = _step4.value;
      if (column instanceof HTMLElement) {
        column.style.height = '';
        column.style.flexGrow = '';
        column.style.flexShrink = '';
        column.style.flexBasis = '';
      }
    }
  }
  function getNumericCssValue(value) {
    var numericValue = Number.parseFloat(value);
    return Number.isFinite(numericValue) ? numericValue : 0;
  }
  function getNavContentHeight(navElement) {
    var navItems = navElement.querySelectorAll(':scope > .nav-item');
    if (!navItems.length) {
      return Math.ceil(navElement.getBoundingClientRect().height);
    }
    var totalHeight = 0;
    for (var _iterator5 = _createForOfIteratorHelperLoose(navItems), _step5; !(_step5 = _iterator5()).done;) {
      var navItem = _step5.value;
      if (navItem instanceof HTMLElement && isVisible(navItem)) {
        totalHeight += navItem.getBoundingClientRect().height;
      }
    }
    var computedStyle = window.getComputedStyle(navElement);
    totalHeight += getNumericCssValue(computedStyle.paddingTop);
    totalHeight += getNumericCssValue(computedStyle.paddingBottom);
    totalHeight += getNumericCssValue(computedStyle.borderTopWidth);
    totalHeight += getNumericCssValue(computedStyle.borderBottomWidth);
    return Math.ceil(totalHeight);
  }
  function getUniqueColumns(targets) {
    var columns = [];
    var seen = new Set();
    for (var _iterator6 = _createForOfIteratorHelperLoose(targets), _step6; !(_step6 = _iterator6()).done;) {
      var target = _step6.value;
      var column = target == null ? void 0 : target.column;
      if (column instanceof HTMLElement && !seen.has(column)) {
        seen.add(column);
        columns.push(column);
      }
    }
    return columns;
  }
  function synchronizeNavColumnHeights(modalElement) {
    if (!isDesktopViewport()) {
      clearNavColumnHeights(modalElement);
      return;
    }
    var modalBody = modalElement.querySelector('.modal-body');
    if (!(modalBody instanceof HTMLElement)) {
      return;
    }
    var isCollapseTransitioning = modalElement.querySelector(COLLAPSING_SUBMENU_SELECTOR) instanceof HTMLElement;
    var activeTargets = isCollapseTransitioning ? getVisibleNavTargets(modalElement) : getActiveDesktopNavTargets(modalElement);
    if (activeTargets.length === 0) {
      return;
    }
    clearNavColumnHeights(modalElement);
    var tallestVisibleContent = 0;
    for (var _iterator7 = _createForOfIteratorHelperLoose(activeTargets), _step7; !(_step7 = _iterator7()).done;) {
      var target = _step7.value;
      tallestVisibleContent = Math.max(tallestVisibleContent, getNavContentHeight(target.nav));
    }
    var maxAvailableHeight = modalBody.clientHeight;
    var syncedHeight = Math.min(tallestVisibleContent, maxAvailableHeight);
    var visibleColumns = isCollapseTransitioning ? getDesktopVisibleNavColumns(modalElement) : getUniqueColumns(activeTargets);
    for (var _iterator8 = _createForOfIteratorHelperLoose(visibleColumns), _step8; !(_step8 = _iterator8()).done;) {
      var column = _step8.value;
      // Secondary/tertiary columns can be flex-grown by CSS; lock flex sizing
      // during sync so inline height can consistently control divider length.
      column.style.flexGrow = '0';
      column.style.flexShrink = '0';
      column.style.flexBasis = 'auto';
      column.style.height = syncedHeight + "px";
    }
  }
  function debounce(callback, waitMs) {
    var timerId = null;
    return function () {
      for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
        arguments_[_key] = arguments[_key];
      }
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(function () {
        callback.apply(void 0, arguments_);
      }, waitMs);
    };
  }
  function scheduleRefresh(refresh, frameState) {
    if (frameState.isQueued) {
      return;
    }
    frameState.isQueued = true;
    Promise.resolve().then(function () {
      frameState.isQueued = false;
      refresh();
    });
  }

  /**
   * Keep fullscreen nav columns equal-height to the tallest visible column while
   * preserving independent scrolling when available vertical space is limited.
   */
  function enableNavbarAzFullscreen() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }
    var fullscreenModals = document.querySelectorAll(FULLSCREEN_MODAL_SELECTOR);
    if (!fullscreenModals.length) {
      return;
    }
    var _loop = function _loop() {
      var modal = _step9.value;
      if (!(modal instanceof HTMLElement)) {
        return 1; // continue
      }
      var refresh = function refresh() {
        synchronizeNavColumnHeights(modal);
      };
      var refreshFrameState = {
        isQueued: false
      };
      var refreshOnCollapseEvent = function refreshOnCollapseEvent(event) {
        var target = event == null ? void 0 : event.target;
        if (target instanceof HTMLElement && modal.contains(target)) {
          scheduleRefresh(refresh, refreshFrameState);
        }
      };
      var debouncedRefresh = debounce(refresh, RESIZE_DEBOUNCE_MS);
      EventHandler.on(modal, 'shown.bs.modal', refresh);
      EventHandler.on(modal, 'show.bs.collapse', refreshOnCollapseEvent);
      EventHandler.on(modal, 'hide.bs.collapse', refreshOnCollapseEvent);
      EventHandler.on(modal, 'shown.bs.collapse', refreshOnCollapseEvent);
      EventHandler.on(modal, 'hidden.bs.collapse', refreshOnCollapseEvent);
      window.addEventListener('resize', debouncedRefresh);

      // Sync once so initially shown states render correctly on first paint.
      refresh();
    };
    for (var _iterator9 = _createForOfIteratorHelperLoose(fullscreenModals), _step9; !(_step9 = _iterator9()).done;) {
      if (_loop()) continue;
    }
  }

  return enableNavbarAzFullscreen;

}));
//# sourceMappingURL=navbar-az-fullscreen.js.map

/*!
  * Arizona Bootstrap az-tab.js v5.1.2 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2026 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../node_modules/bootstrap/js/src/tab.js'), require('../../node_modules/bootstrap/js/src/dom/event-handler.js'), require('../../node_modules/bootstrap/js/src/dom/selector-engine.js'), require('../../node_modules/bootstrap/js/src/util/index.js')) :
  typeof define === 'function' && define.amd ? define(['../../node_modules/bootstrap/js/src/tab', '../../node_modules/bootstrap/js/src/dom/event-handler', '../../node_modules/bootstrap/js/src/dom/selector-engine', '../../node_modules/bootstrap/js/src/util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AzTab = factory(global.Tab, global.EventHandler, global.SelectorEngine, global.Index));
})(this, (function (Tab, EventHandler, SelectorEngine, index_js) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
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
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * Constants
   */

  var NAME = 'az-tab';
  var DATA_KEY = "bs." + NAME;
  var EVENT_KEY = "." + DATA_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY;
  var EVENT_MOUSEENTER_DATA_API = "mouseenter" + EVENT_KEY;
  var EVENT_FOCUSIN_DATA_API = "focusin" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY;
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var HOME_KEY = 'Home';
  var END_KEY = 'End';
  var HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="pill-hover"]';
  var SELECTOR_DATA_TOGGLE_ACTIVE = '.active[data-bs-toggle="pill-hover"]';
  var supportsPointerHover = function supportsPointerHover() {
    var _window$matchMedia;
    return typeof window !== 'undefined' && (window.matchMedia == null || (_window$matchMedia = window.matchMedia(HOVER_MEDIA_QUERY)) == null ? void 0 : _window$matchMedia.matches) === true;
  };

  /**
   * Class definition
   */
  var AzTab = /*#__PURE__*/function (_Tab) {
    function AzTab() {
      return _Tab.apply(this, arguments) || this;
    }
    _inheritsLoose(AzTab, _Tab);
    var _proto = AzTab.prototype;
    _proto._keydown = function _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      var children = this._getChildren().filter(function (element) {
        return !index_js.isDisabled(element);
      });
      var nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        var isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = index_js.getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        AzTab.getOrCreateInstance(nextActiveElement).show();
      }
    };
    return _createClass(AzTab, null, [{
      key: "NAME",
      get:
      // Getters
      function get() {
        return NAME;
      }
    }]);
  }(Tab);
  /**
   * Data API implementation
   */
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (index_js.isDisabled(this)) {
      return;
    }
    AzTab.getOrCreateInstance(this).show();
  });

  // Limit hover activation to devices that actually support hover with a fine pointer.
  EventHandler.on(document, EVENT_MOUSEENTER_DATA_API, SELECTOR_DATA_TOGGLE, function () {
    if (!supportsPointerHover() || index_js.isDisabled(this)) {
      return;
    }
    AzTab.getOrCreateInstance(this).show();
  });

  // Activate on focus so keyboard navigation into the trigger opens the matching panel.
  EventHandler.on(document, EVENT_FOCUSIN_DATA_API, SELECTOR_DATA_TOGGLE, function () {
    if (index_js.isDisabled(this)) {
      return;
    }
    AzTab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
      AzTab.getOrCreateInstance(element);
    }
  });

  return AzTab;

}));
//# sourceMappingURL=az-tab.js.map

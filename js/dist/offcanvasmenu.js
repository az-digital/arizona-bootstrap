/*!
  * Arizona Bootstrap offcanvasmenu.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../node_modules/bootstrap/js/src/base-component.js'), require('../../node_modules/bootstrap/js/src/dom/event-handler.js'), require('../../node_modules/bootstrap/js/src/dom/selector-engine.js'), require('../../node_modules/bootstrap/js/src/util/backdrop.js'), require('../../node_modules/bootstrap/js/src/util/index.js')) :
  typeof define === 'function' && define.amd ? define(['../../node_modules/bootstrap/js/src/base-component', '../../node_modules/bootstrap/js/src/dom/event-handler', '../../node_modules/bootstrap/js/src/dom/selector-engine', '../../node_modules/bootstrap/js/src/util/backdrop', '../../node_modules/bootstrap/js/src/util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Offcanvasmenu = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Backdrop, global.Index));
})(this, (function (BaseComponent, EventHandler, SelectorEngine, Backdrop, index_js) { 'use strict';

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

  var NAME = 'offcanvasmenu';
  var AZ_VERSION = 'v0.0.4';
  var DATA_KEY = 'az.offcanvasmenu';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_OPEN = "open" + EVENT_KEY;
  var EVENT_OPENED = "opened" + EVENT_KEY;
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_OPEN = 'open';
  var CLASS_NAME_CLOSE = 'offcanvasmenu-toggle';
  var CLASS_NAME_CLOSING = 'closing';
  var CLASS_NAME_CLOSED = 'closed';
  var CLASS_NAME_DEEPER_CHILDREN = ":scope ." + CLASS_NAME_CLOSE + " ." + CLASS_NAME_CLOSE;
  var CLASS_NAME_FREEZE = 'offcanvasmenu-toggle-body-freeze';
  var CLASS_NAME_BACKDROP = 'offcanvasmenu-backdrop';
  var SELECTOR_ACTIVES = '.open, .closing';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvasmenu"]';
  var Default = {
    toggle: true,
    parent: null
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(null|element)'
  };

  /**
   * Class definition
   */
  var Offcanvasmenu = /*#__PURE__*/function (_BaseComponent) {
    function Offcanvasmenu(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._isTransitioning = false;
      _this._triggerArray = [];
      _this._backdrop = _this._initializeBackDrop();
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);
      for (var _iterator = _createForOfIteratorHelperLoose(toggleList), _step; !(_step = _iterator()).done;) {
        var elem = _step.value;
        var selector = SelectorEngine.getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElement) {
          return foundElement === _this._element;
        });
        if (selector !== null && filterElement.length) {
          _this._triggerArray.push(elem);
        }
      }
      _this._initializeChildren();
      if (!_this._config.parent) {
        _this._addAriaAndClosedClass(_this._triggerArray, _this._isOpen());
      }
      if (_this._config.toggle) {
        _this.toggle();
      }
      return _this;
    }

    // Getters
    _inheritsLoose(Offcanvasmenu, _BaseComponent);
    var _proto = Offcanvasmenu.prototype;
    // Public
    _proto.toggle = function toggle() {
      if (this._isOpen()) {
        this.close();
      } else {
        this.open();
      }
    };
    _proto.open = function open() {
      var _this2 = this;
      if (this._isTransitioning || this._isOpen()) {
        return;
      }
      var activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) {
          return element !== _this2._element;
        }).map(function (element) {
          return Offcanvasmenu.getOrCreateInstance(element, {
            toggle: false
          });
        });
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_OPEN);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (var _iterator2 = _createForOfIteratorHelperLoose(activeChildren), _step2; !(_step2 = _iterator2()).done;) {
        var activeInstance = _step2.value;
        activeInstance.close();
      }
      this._backdrop.show();
      this._element.classList.remove(CLASS_NAME_CLOSE);
      this._element.classList.add(CLASS_NAME_CLOSING);
      this._addAriaAndClosedClass(this._triggerArray, true);
      this._isTransitioning = true;
      var complete = function complete() {
        _this2._isTransitioning = false;
        _this2._element.classList.remove(CLASS_NAME_CLOSING);
        _this2._element.classList.add(CLASS_NAME_CLOSE, CLASS_NAME_OPEN);
        document.body.classList.add(CLASS_NAME_FREEZE);
        EventHandler.trigger(_this2._element, EVENT_OPENED);
      };
      this._queueCallback(complete, this._element);
    };
    _proto.close = function close() {
      var _this3 = this;
      if (this._isTransitioning || !this._isOpen()) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (startEvent.defaultPrevented) {
        return;
      }
      index_js.reflow(this._element);
      this._element.classList.add(CLASS_NAME_CLOSING);
      this._element.classList.remove(CLASS_NAME_CLOSE, CLASS_NAME_OPEN);
      for (var _iterator3 = _createForOfIteratorHelperLoose(this._triggerArray), _step3; !(_step3 = _iterator3()).done;) {
        var trigger = _step3.value;
        var element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isOpen(element)) {
          this._addAriaAndClosedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      var complete = function complete() {
        _this3._isTransitioning = false;
        _this3._backdrop.hide();
        document.body.classList.remove(CLASS_NAME_FREEZE);
        _this3._element.classList.remove(CLASS_NAME_CLOSING);
        _this3._element.classList.add(CLASS_NAME_CLOSE);
        EventHandler.trigger(_this3._element, EVENT_CLOSED);
      };
      this._queueCallback(complete, this._element);
    };
    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };
    _proto.dispose = function dispose() {
      this._backdrop.dispose();
      _BaseComponent.prototype.dispose.call(this);
    }

    // Private
    ;
    _proto._isOpen = function _isOpen(element) {
      if (element === void 0) {
        element = this._element;
      }
      return element.classList.contains(CLASS_NAME_OPEN);
    };
    _proto._initializeBackDrop = function _initializeBackDrop() {
      return new Backdrop({
        className: CLASS_NAME_BACKDROP
      });
    };
    _proto._configAfterMerge = function _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = index_js.getElement(config.parent);
      return config;
    };
    _proto._initializeChildren = function _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      var children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
      for (var _iterator4 = _createForOfIteratorHelperLoose(children), _step4; !(_step4 = _iterator4()).done;) {
        var element = _step4.value;
        var selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndClosedClass([element], this._isOpen(selected));
        }
      }
    };
    _proto._getFirstLevelChildren = function _getFirstLevelChildren(selector) {
      var children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(function (element) {
        return !children.includes(element);
      });
    };
    _proto._addAriaAndClosedClass = function _addAriaAndClosedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (var _iterator5 = _createForOfIteratorHelperLoose(triggerArray), _step5; !(_step5 = _iterator5()).done;) {
        var element = _step5.value;
        element.classList.toggle(CLASS_NAME_CLOSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    ;
    Offcanvasmenu.jQueryInterface = function jQueryInterface(config) {
      var _config = {};
      if (typeof config === 'string' && /open|close/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        var data = Offcanvasmenu.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    return _createClass(Offcanvasmenu, null, [{
      key: "AZ_VERSION",
      get: function get() {
        return AZ_VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }]);
  }(BaseComponent);
  /**
   * Viewport conditional dropdown menu override for offcanvas menu.
   */
  var VIEWPORT_WIDTH = false;
  var XS_BREAKPOINT_MAX = 767;

  // @TODO Use CSS breakpoint info, rather than seemingly arbitrary window width.
  // Get the viewportWidth value.
  function getViewportWidth() {
    VIEWPORT_WIDTH = window.innerWidth || document.documentElement.clientWidth;
  }
  for (var _iterator6 = _createForOfIteratorHelperLoose(SelectorEngine.find('.dropdown.keep-open .dropdown-toggle')), _step6; !(_step6 = _iterator6()).done;) {
    var element = _step6.value;
    EventHandler.on(element, 'click', function (event) {
      getViewportWidth();
      if (VIEWPORT_WIDTH < XS_BREAKPOINT_MAX) {
        if (event.target.hasAttribute('aria-expanded')) {
          event.target.parentElement.classList.remove('show');
          event.target.setAttribute('aria-expanded', false);
        } else {
          event.target.parentElement.classList.add('show');
          event.target.setAttribute('aria-expanded', true);
        }
        event.target.nextElementSibling.matches('.dropdown-menu').toggle();
        event.stopPropagation();
      }
    });
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (var _iterator7 = _createForOfIteratorHelperLoose(SelectorEngine.getMultipleElementsFromSelector(this)), _step7; !(_step7 = _iterator7()).done;) {
      var element = _step7.value;
      Offcanvasmenu.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Offcanvasmenu);

  return Offcanvasmenu;

}));
//# sourceMappingURL=offcanvasmenu.js.map

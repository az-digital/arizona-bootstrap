/*!
  * Arizona Bootstrap collapse.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/selector-engine.js'), require('./util/index.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './dom/selector-engine', './util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Index));
})(this, (function (BaseComponent, EventHandler, SelectorEngine, index_js) { 'use strict';

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

  var NAME = 'collapse';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var CLASS_NAME_DEEPER_CHILDREN = ":scope ." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE;
  var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
  var Default = {
    parent: null,
    toggle: true
  };
  var DefaultType = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */
  var Collapse = /*#__PURE__*/function (_BaseComponent) {
    function Collapse(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._isTransitioning = false;
      _this._triggerArray = [];
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
        _this._addAriaAndCollapsedClass(_this._triggerArray, _this._isShown());
      }
      if (_this._config.toggle) {
        _this.toggle();
      }
      return _this;
    }

    // Getters
    _inheritsLoose(Collapse, _BaseComponent);
    var _proto = Collapse.prototype;
    // Public
    _proto.toggle = function toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    };
    _proto.show = function show() {
      var _this2 = this;
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      var activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) {
          return element !== _this2._element;
        }).map(function (element) {
          return Collapse.getOrCreateInstance(element, {
            toggle: false
          });
        });
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (var _iterator2 = _createForOfIteratorHelperLoose(activeChildren), _step2; !(_step2 = _iterator2()).done;) {
        var activeInstance = _step2.value;
        activeInstance.hide();
      }
      var dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      var complete = function complete() {
        _this2._isTransitioning = false;
        _this2._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
        _this2._element.style[dimension] = '';
        EventHandler.trigger(_this2._element, EVENT_SHOWN);
      };
      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };
    _proto.hide = function hide() {
      var _this3 = this;
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (startEvent.defaultPrevented) {
        return;
      }
      var dimension = this._getDimension();
      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      index_js.reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
      for (var _iterator3 = _createForOfIteratorHelperLoose(this._triggerArray), _step3; !(_step3 = _iterator3()).done;) {
        var trigger = _step3.value;
        var element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      var complete = function complete() {
        _this3._isTransitioning = false;
        _this3._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this3._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(_this3._element, EVENT_HIDDEN);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    };
    _proto._isShown = function _isShown(element) {
      if (element === void 0) {
        element = this._element;
      }
      return element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private
    ;
    _proto._configAfterMerge = function _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = index_js.getElement(config.parent);
      return config;
    };
    _proto._getDimension = function _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
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
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
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
    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (var _iterator5 = _createForOfIteratorHelperLoose(triggerArray), _step5; !(_step5 = _iterator5()).done;) {
        var element = _step5.value;
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    ;
    Collapse.jQueryInterface = function jQueryInterface(config) {
      var _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        var data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    return _createClass(Collapse, null, [{
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
   * Data API implementation
   */
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (var _iterator6 = _createForOfIteratorHelperLoose(SelectorEngine.getMultipleElementsFromSelector(this)), _step6; !(_step6 = _iterator6()).done;) {
      var element = _step6.value;
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Collapse);

  return Collapse;

}));
//# sourceMappingURL=collapse.js.map

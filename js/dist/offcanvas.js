/*!
  * Arizona Bootstrap offcanvas.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/selector-engine.js'), require('./util/backdrop.js'), require('./util/component-functions.js'), require('./util/focustrap.js'), require('./util/index.js'), require('./util/scrollbar.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './dom/selector-engine', './util/backdrop', './util/component-functions', './util/focustrap', './util/index', './util/scrollbar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Offcanvas = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Backdrop, global.ComponentFunctions, global.Focustrap, global.Index, global.Scrollbar));
})(this, (function (BaseComponent, EventHandler, SelectorEngine, Backdrop, componentFunctions_js, FocusTrap, index_js, ScrollBarHelper) { 'use strict';

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

  var NAME = 'offcanvas';
  var DATA_KEY = 'bs.offcanvas';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var ESCAPE_KEY = 'Escape';
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var CLASS_NAME_HIDING = 'hiding';
  var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  var OPEN_SELECTOR = '.offcanvas.show';
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_RESIZE = "resize" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY;
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
  var Default = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */
  var Offcanvas = /*#__PURE__*/function (_BaseComponent) {
    function Offcanvas(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._isShown = false;
      _this._backdrop = _this._initializeBackDrop();
      _this._focustrap = _this._initializeFocusTrap();
      _this._addEventListeners();
      return _this;
    }

    // Getters
    _inheritsLoose(Offcanvas, _BaseComponent);
    var _proto = Offcanvas.prototype;
    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };
    _proto.show = function show(relatedTarget) {
      var _this2 = this;
      if (this._isShown) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
        relatedTarget: relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING);
      var completeCallBack = function completeCallBack() {
        if (!_this2._config.scroll || _this2._config.backdrop) {
          _this2._focustrap.activate();
        }
        _this2._element.classList.add(CLASS_NAME_SHOW);
        _this2._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(_this2._element, EVENT_SHOWN, {
          relatedTarget: relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    };
    _proto.hide = function hide() {
      var _this3 = this;
      if (!this._isShown) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      var completeCallback = function completeCallback() {
        _this3._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
        _this3._element.removeAttribute('aria-modal');
        _this3._element.removeAttribute('role');
        if (!_this3._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(_this3._element, EVENT_HIDDEN);
      };
      this._queueCallback(completeCallback, this._element, true);
    };
    _proto.dispose = function dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      _BaseComponent.prototype.dispose.call(this);
    }

    // Private
    ;
    _proto._initializeBackDrop = function _initializeBackDrop() {
      var _this4 = this;
      var clickCallback = function clickCallback() {
        if (_this4._config.backdrop === 'static') {
          EventHandler.trigger(_this4._element, EVENT_HIDE_PREVENTED);
          return;
        }
        _this4.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      var isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    };
    _proto._initializeFocusTrap = function _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    };
    _proto._addEventListeners = function _addEventListeners() {
      var _this5 = this;
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (_this5._config.keyboard) {
          _this5.hide();
          return;
        }
        EventHandler.trigger(_this5._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    ;
    Offcanvas.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config](this);
      });
    };
    return _createClass(Offcanvas, null, [{
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
    var _this6 = this;
    var target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (index_js.isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN, function () {
      // focus on trigger when it is closed
      if (index_js.isVisible(_this6)) {
        _this6.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    var data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(OPEN_SELECTOR)), _step; !(_step = _iterator()).done;) {
      var selector = _step.value;
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, function () {
    for (var _iterator2 = _createForOfIteratorHelperLoose(SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')), _step2; !(_step2 = _iterator2()).done;) {
      var element = _step2.value;
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  componentFunctions_js.enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Offcanvas);

  return Offcanvas;

}));
//# sourceMappingURL=offcanvas.js.map

/*!
  * Arizona Bootstrap swipe.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../dom/event-handler.js'), require('./config.js'), require('./index.js')) :
  typeof define === 'function' && define.amd ? define(['../dom/event-handler', './config', './index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Swipe = factory(global.EventHandler, global.Config, global.Index));
})(this, (function (EventHandler, Config, index_js) { 'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
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

  /**
   * Constants
   */

  var NAME = 'swipe';
  var EVENT_KEY = '.bs.swipe';
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY;
  var POINTER_TYPE_TOUCH = 'touch';
  var POINTER_TYPE_PEN = 'pen';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SWIPE_THRESHOLD = 40;
  var Default = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  var DefaultType = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */
  var Swipe = /*#__PURE__*/function (_Config) {
    function Swipe(element, config) {
      var _this;
      _this = _Config.call(this) || this;
      _this._element = element;
      if (!element || !Swipe.isSupported()) {
        return _assertThisInitialized(_this);
      }
      _this._config = _this._getConfig(config);
      _this._deltaX = 0;
      _this._supportPointerEvents = Boolean(window.PointerEvent);
      _this._initEvents();
      return _this;
    }

    // Getters
    _inheritsLoose(Swipe, _Config);
    var _proto = Swipe.prototype;
    // Public
    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY);
    }

    // Private
    ;
    _proto._start = function _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    };
    _proto._end = function _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      index_js.execute(this._config.endCallback);
    };
    _proto._move = function _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    };
    _proto._handleSwipe = function _handleSwipe() {
      var absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      var direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      index_js.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    };
    _proto._initEvents = function _initEvents() {
      var _this2 = this;
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return _this2._start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return _this2._end(event);
        });
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return _this2._start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return _this2._move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return _this2._end(event);
        });
      }
    };
    _proto._eventIsPointerPenTouch = function _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    ;
    Swipe.isSupported = function isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    };
    return _createClass(Swipe, null, [{
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
  }(Config);

  return Swipe;

}));
//# sourceMappingURL=swipe.js.map

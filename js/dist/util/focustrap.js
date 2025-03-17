/*!
  * Arizona Bootstrap focustrap.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../dom/event-handler.js'), require('../dom/selector-engine.js'), require('./config.js')) :
  typeof define === 'function' && define.amd ? define(['../dom/event-handler', '../dom/selector-engine', './config'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Focustrap = factory(global.EventHandler, global.SelectorEngine, global.Config));
})(this, (function (EventHandler, SelectorEngine, Config) { 'use strict';

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

  var NAME = 'focustrap';
  var DATA_KEY = 'bs.focustrap';
  var EVENT_KEY = "." + DATA_KEY;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
  var EVENT_KEYDOWN_TAB = "keydown.tab" + EVENT_KEY;
  var TAB_KEY = 'Tab';
  var TAB_NAV_FORWARD = 'forward';
  var TAB_NAV_BACKWARD = 'backward';
  var Default = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };
  var DefaultType = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */
  var FocusTrap = /*#__PURE__*/function (_Config) {
    function FocusTrap(config) {
      var _this;
      _this = _Config.call(this) || this;
      _this._config = _this._getConfig(config);
      _this._isActive = false;
      _this._lastTabNavDirection = null;
      return _this;
    }

    // Getters
    _inheritsLoose(FocusTrap, _Config);
    var _proto = FocusTrap.prototype;
    // Public
    _proto.activate = function activate() {
      var _this2 = this;
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN, function (event) {
        return _this2._handleFocusin(event);
      });
      EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) {
        return _this2._handleKeydown(event);
      });
      this._isActive = true;
    };
    _proto.deactivate = function deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY);
    }

    // Private
    ;
    _proto._handleFocusin = function _handleFocusin(event) {
      var trapElement = this._config.trapElement;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      var elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    };
    _proto._handleKeydown = function _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    };
    return _createClass(FocusTrap, null, [{
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

  return FocusTrap;

}));
//# sourceMappingURL=focustrap.js.map

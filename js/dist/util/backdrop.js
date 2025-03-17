/*!
  * Arizona Bootstrap backdrop.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../dom/event-handler.js'), require('./config.js'), require('./index.js')) :
  typeof define === 'function' && define.amd ? define(['../dom/event-handler', './config', './index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Backdrop = factory(global.EventHandler, global.Config, global.Index));
})(this, (function (EventHandler, Config, index_js) { 'use strict';

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

  var NAME = 'backdrop';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var EVENT_MOUSEDOWN = "mousedown.bs." + NAME;
  var Default = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };
  var DefaultType = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */
  var Backdrop = /*#__PURE__*/function (_Config) {
    function Backdrop(config) {
      var _this;
      _this = _Config.call(this) || this;
      _this._config = _this._getConfig(config);
      _this._isAppended = false;
      _this._element = null;
      return _this;
    }

    // Getters
    _inheritsLoose(Backdrop, _Config);
    var _proto = Backdrop.prototype;
    // Public
    _proto.show = function show(callback) {
      if (!this._config.isVisible) {
        index_js.execute(callback);
        return;
      }
      this._append();
      var element = this._getElement();
      if (this._config.isAnimated) {
        index_js.reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW);
      this._emulateAnimation(function () {
        index_js.execute(callback);
      });
    };
    _proto.hide = function hide(callback) {
      var _this2 = this;
      if (!this._config.isVisible) {
        index_js.execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW);
      this._emulateAnimation(function () {
        _this2.dispose();
        index_js.execute(callback);
      });
    };
    _proto.dispose = function dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    ;
    _proto._getElement = function _getElement() {
      if (!this._element) {
        var backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE);
        }
        this._element = backdrop;
      }
      return this._element;
    };
    _proto._configAfterMerge = function _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = index_js.getElement(config.rootElement);
      return config;
    };
    _proto._append = function _append() {
      var _this3 = this;
      if (this._isAppended) {
        return;
      }
      var element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, function () {
        index_js.execute(_this3._config.clickCallback);
      });
      this._isAppended = true;
    };
    _proto._emulateAnimation = function _emulateAnimation(callback) {
      index_js.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    };
    return _createClass(Backdrop, null, [{
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

  return Backdrop;

}));
//# sourceMappingURL=backdrop.js.map

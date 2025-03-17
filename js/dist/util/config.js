/*!
  * Arizona Bootstrap config.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../dom/manipulator.js'), require('./index.js')) :
  typeof define === 'function' && define.amd ? define(['../dom/manipulator', './index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Config = factory(global.Manipulator, global.Index));
})(this, (function (Manipulator, index_js) { 'use strict';

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
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
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
   * Class definition
   */
  var Config = /*#__PURE__*/function () {
    function Config() {}
    var _proto = Config.prototype;
    _proto._getConfig = function _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    };
    _proto._configAfterMerge = function _configAfterMerge(config) {
      return config;
    };
    _proto._mergeConfigObj = function _mergeConfigObj(config, element) {
      var jsonConfig = index_js.isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return _extends({}, this.constructor.Default, typeof jsonConfig === 'object' ? jsonConfig : {}, index_js.isElement(element) ? Manipulator.getDataAttributes(element) : {}, typeof config === 'object' ? config : {});
    };
    _proto._typeCheckConfig = function _typeCheckConfig(config, configTypes) {
      if (configTypes === void 0) {
        configTypes = this.constructor.DefaultType;
      }
      for (var _i = 0, _Object$entries = Object.entries(configTypes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
          property = _Object$entries$_i[0],
          expectedTypes = _Object$entries$_i[1];
        var value = config[property];
        var valueType = index_js.isElement(value) ? 'element' : index_js.toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(this.constructor.NAME.toUpperCase() + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\".");
        }
      }
    };
    return _createClass(Config, null, [{
      key: "Default",
      get:
      // Getters
      function get() {
        return {};
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return {};
      }
    }, {
      key: "NAME",
      get: function get() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
    }]);
  }();

  return Config;

}));
//# sourceMappingURL=config.js.map

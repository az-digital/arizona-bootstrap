/*!
  * Arizona Bootstrap template-factory.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../dom/selector-engine.js'), require('./config.js'), require('./sanitizer.js'), require('./index.js')) :
  typeof define === 'function' && define.amd ? define(['../dom/selector-engine', './config', './sanitizer', './index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TemplateFactory = factory(global.SelectorEngine, global.Config, global.Sanitizer, global.Index));
})(this, (function (SelectorEngine, Config, sanitizer_js, index_js) { 'use strict';

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

  var NAME = 'TemplateFactory';
  var Default = {
    allowList: sanitizer_js.DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  var DefaultType = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  var DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */
  var TemplateFactory = /*#__PURE__*/function (_Config) {
    function TemplateFactory(config) {
      var _this;
      _this = _Config.call(this) || this;
      _this._config = _this._getConfig(config);
      return _this;
    }

    // Getters
    _inheritsLoose(TemplateFactory, _Config);
    var _proto = TemplateFactory.prototype;
    // Public
    _proto.getContent = function getContent() {
      var _this2 = this;
      return Object.values(this._config.content).map(function (config) {
        return _this2._resolvePossibleFunction(config);
      }).filter(Boolean);
    };
    _proto.hasContent = function hasContent() {
      return this.getContent().length > 0;
    };
    _proto.changeContent = function changeContent(content) {
      this._checkContent(content);
      this._config.content = _extends({}, this._config.content, content);
      return this;
    };
    _proto.toHtml = function toHtml() {
      var templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (var _i = 0, _Object$entries = Object.entries(this._config.content); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
          selector = _Object$entries$_i[0],
          text = _Object$entries$_i[1];
        this._setContent(templateWrapper, text, selector);
      }
      var template = templateWrapper.children[0];
      var extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        var _template$classList;
        (_template$classList = template.classList).add.apply(_template$classList, extraClass.split(' '));
      }
      return template;
    }

    // Private
    ;
    _proto._typeCheckConfig = function _typeCheckConfig(config) {
      _Config.prototype._typeCheckConfig.call(this, config);
      this._checkContent(config.content);
    };
    _proto._checkContent = function _checkContent(arg) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(arg); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _Object$entries2[_i2],
          selector = _Object$entries2$_i[0],
          content = _Object$entries2$_i[1];
        _Config.prototype._typeCheckConfig.call(this, {
          selector: selector,
          entry: content
        }, DefaultContentType);
      }
    };
    _proto._setContent = function _setContent(template, content, selector) {
      var templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (index_js.isElement(content)) {
        this._putElementInTemplate(index_js.getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    };
    _proto._maybeSanitize = function _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizer_js.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    };
    _proto._resolvePossibleFunction = function _resolvePossibleFunction(arg) {
      return index_js.execute(arg, [undefined, this]);
    };
    _proto._putElementInTemplate = function _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    };
    return _createClass(TemplateFactory, null, [{
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

  return TemplateFactory;

}));
//# sourceMappingURL=template-factory.js.map

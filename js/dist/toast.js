/*!
  * Arizona Bootstrap toast.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./util/component-functions.js'), require('./util/index.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './util/component-functions', './util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Toast = factory(global.BaseComponent, global.EventHandler, global.ComponentFunctions, global.Index));
})(this, (function (BaseComponent, EventHandler, componentFunctions_js, index_js) { 'use strict';

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

  var NAME = 'toast';
  var DATA_KEY = 'bs.toast';
  var EVENT_KEY = "." + DATA_KEY;
  var EVENT_MOUSEOVER = "mouseover" + EVENT_KEY;
  var EVENT_MOUSEOUT = "mouseout" + EVENT_KEY;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
  var EVENT_FOCUSOUT = "focusout" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */
  var Toast = /*#__PURE__*/function (_BaseComponent) {
    function Toast(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._timeout = null;
      _this._hasMouseInteraction = false;
      _this._hasKeyboardInteraction = false;
      _this._setListeners();
      return _this;
    }

    // Getters
    _inheritsLoose(Toast, _BaseComponent);
    var _proto = Toast.prototype;
    // Public
    _proto.show = function show() {
      var _this2 = this;
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      var complete = function complete() {
        _this2._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(_this2._element, EVENT_SHOWN);
        _this2._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      index_js.reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    };
    _proto.hide = function hide() {
      var _this3 = this;
      if (!this.isShown()) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        _this3._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(_this3._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    };
    _proto.dispose = function dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      _BaseComponent.prototype.dispose.call(this);
    };
    _proto.isShown = function isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private
    ;
    _proto._maybeScheduleHide = function _maybeScheduleHide() {
      var _this4 = this;
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(function () {
        _this4.hide();
      }, this._config.delay);
    };
    _proto._onInteraction = function _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      var nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    };
    _proto._setListeners = function _setListeners() {
      var _this5 = this;
      EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
        return _this5._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
        return _this5._onInteraction(event, false);
      });
      EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
        return _this5._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
        return _this5._onInteraction(event, false);
      });
    };
    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    ;
    Toast.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config](this);
        }
      });
    };
    return _createClass(Toast, null, [{
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
  componentFunctions_js.enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Toast);

  return Toast;

}));
//# sourceMappingURL=toast.js.map

/*!
  * Arizona Bootstrap modal.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/selector-engine.js'), require('./util/backdrop.js'), require('./util/component-functions.js'), require('./util/focustrap.js'), require('./util/index.js'), require('./util/scrollbar.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './dom/selector-engine', './util/backdrop', './util/component-functions', './util/focustrap', './util/index', './util/scrollbar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Modal = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Backdrop, global.ComponentFunctions, global.Focustrap, global.Index, global.Scrollbar));
})(this, (function (BaseComponent, EventHandler, SelectorEngine, Backdrop, componentFunctions_js, FocusTrap, index_js, ScrollBarHelper) { 'use strict';

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

  var NAME = 'modal';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var ESCAPE_KEY = 'Escape';
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_RESIZE = "resize" + EVENT_KEY;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var OPEN_SELECTOR = '.modal.show';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
  var Default = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */
  var Modal = /*#__PURE__*/function (_BaseComponent) {
    function Modal(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this._element);
      _this._backdrop = _this._initializeBackDrop();
      _this._focustrap = _this._initializeFocusTrap();
      _this._isShown = false;
      _this._isTransitioning = false;
      _this._scrollBar = new ScrollBarHelper();
      _this._addEventListeners();
      return _this;
    }

    // Getters
    _inheritsLoose(Modal, _BaseComponent);
    var _proto = Modal.prototype;
    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };
    _proto.show = function show(relatedTarget) {
      var _this2 = this;
      if (this._isShown || this._isTransitioning) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
        relatedTarget: relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(function () {
        return _this2._showElement(relatedTarget);
      });
    };
    _proto.hide = function hide() {
      var _this3 = this;
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW);
      this._queueCallback(function () {
        return _this3._hideModal();
      }, this._element, this._isAnimated());
    };
    _proto.dispose = function dispose() {
      EventHandler.off(window, EVENT_KEY);
      EventHandler.off(this._dialog, EVENT_KEY);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      _BaseComponent.prototype.dispose.call(this);
    };
    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    }

    // Private
    ;
    _proto._initializeBackDrop = function _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    };
    _proto._initializeFocusTrap = function _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    };
    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      index_js.reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW);
      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._focustrap.activate();
        }
        _this4._isTransitioning = false;
        EventHandler.trigger(_this4._element, EVENT_SHOWN, {
          relatedTarget: relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
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
        _this5._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE, function () {
        if (_this5._isShown && !_this5._isTransitioning) {
          _this5._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(_this5._element, EVENT_CLICK_DISMISS, function (event2) {
          if (_this5._element !== event.target || _this5._element !== event2.target) {
            return;
          }
          if (_this5._config.backdrop === 'static') {
            _this5._triggerBackdropTransition();
            return;
          }
          if (_this5._config.backdrop) {
            _this5.hide();
          }
        });
      });
    };
    _proto._hideModal = function _hideModal() {
      var _this6 = this;
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);
        _this6._resetAdjustments();
        _this6._scrollBar.reset();
        EventHandler.trigger(_this6._element, EVENT_HIDDEN);
      });
    };
    _proto._isAnimated = function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE);
    };
    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this7 = this;
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      if (hideEvent.defaultPrevented) {
        return;
      }
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      var initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(function () {
        _this7._element.classList.remove(CLASS_NAME_STATIC);
        _this7._queueCallback(function () {
          _this7._element.style.overflowY = initialOverflowY;
        }, _this7._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */;
    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      var scrollbarWidth = this._scrollBar.getWidth();
      var isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        var property = index_js.isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = scrollbarWidth + "px";
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        var _property = index_js.isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[_property] = scrollbarWidth + "px";
      }
    };
    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    ;
    Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config](relatedTarget);
      });
    };
    return _createClass(Modal, null, [{
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
    var _this8 = this;
    var target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN, function () {
        if (index_js.isVisible(_this8)) {
          _this8.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    var data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  componentFunctions_js.enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Modal);

  return Modal;

}));
//# sourceMappingURL=modal.js.map

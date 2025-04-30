/*!
  * Arizona Bootstrap tooltip.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core'), require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/manipulator.js'), require('./util/index.js'), require('./util/sanitizer.js'), require('./util/template-factory.js')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core', './base-component', './dom/event-handler', './dom/manipulator', './util/index', './util/sanitizer', './util/template-factory'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory(global["@popperjs/core"], global.BaseComponent, global.EventHandler, global.Manipulator, global.Index, global.Sanitizer, global.TemplateFactory));
})(this, (function (Popper, BaseComponent, EventHandler, Manipulator, index_js, sanitizer_js, TemplateFactory) { 'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

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

  var NAME = 'tooltip';
  var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_MODAL = "." + CLASS_NAME_MODAL;
  var EVENT_MODAL_HIDE = 'hide.bs.modal';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  var EVENT_HIDE = 'hide';
  var EVENT_HIDDEN = 'hidden';
  var EVENT_SHOW = 'show';
  var EVENT_SHOWN = 'shown';
  var EVENT_INSERTED = 'inserted';
  var EVENT_CLICK = 'click';
  var EVENT_FOCUSIN = 'focusin';
  var EVENT_FOCUSOUT = 'focusout';
  var EVENT_MOUSEENTER = 'mouseenter';
  var EVENT_MOUSELEAVE = 'mouseleave';
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: index_js.isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: index_js.isRTL() ? 'right' : 'left'
  };
  var Default = {
    allowList: sanitizer_js.DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  var DefaultType = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */
  var Tooltip = /*#__PURE__*/function (_BaseComponent) {
    function Tooltip(element, config) {
      var _this;
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)');
      }
      _this = _BaseComponent.call(this, element, config) || this;

      // Private
      _this._isEnabled = true;
      _this._timeout = 0;
      _this._isHovered = null;
      _this._activeTrigger = {};
      _this._popper = null;
      _this._templateFactory = null;
      _this._newContent = null;

      // Protected
      _this.tip = null;
      _this._setListeners();
      if (!_this._config.selector) {
        _this._fixTitle();
      }
      return _this;
    }

    // Getters
    _inheritsLoose(Tooltip, _BaseComponent);
    var _proto = Tooltip.prototype;
    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };
    _proto.disable = function disable() {
      this._isEnabled = false;
    };
    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };
    _proto.toggle = function toggle() {
      if (!this._isEnabled) {
        return;
      }
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    };
    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      _BaseComponent.prototype.dispose.call(this);
    };
    _proto.show = function show() {
      var _this2 = this;
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
      var shadowRoot = index_js.findShadowRoot(this._element);
      var isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      var tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      var container = this._config.container;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (var _iterator = _createForOfIteratorHelperLoose((_ref = []).concat.apply(_ref, document.body.children)), _step; !(_step = _iterator()).done;) {
          var _ref;
          var element = _step.value;
          EventHandler.on(element, 'mouseover', index_js.noop);
        }
      }
      var complete = function complete() {
        EventHandler.trigger(_this2._element, _this2.constructor.eventName(EVENT_SHOWN));
        if (_this2._isHovered === false) {
          _this2._leave();
        }
        _this2._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    };
    _proto.hide = function hide() {
      var _this3 = this;
      if (!this._isShown()) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
      if (hideEvent.defaultPrevented) {
        return;
      }
      var tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (var _iterator2 = _createForOfIteratorHelperLoose((_ref2 = []).concat.apply(_ref2, document.body.children)), _step2; !(_step2 = _iterator2()).done;) {
          var _ref2;
          var element = _step2.value;
          EventHandler.off(element, 'mouseover', index_js.noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      var complete = function complete() {
        if (_this3._isWithActiveTrigger()) {
          return;
        }
        if (!_this3._isHovered) {
          _this3._disposePopper();
        }
        _this3._element.removeAttribute('aria-describedby');
        EventHandler.trigger(_this3._element, _this3.constructor.eventName(EVENT_HIDDEN));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    };
    _proto.update = function update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    ;
    _proto._isWithContent = function _isWithContent() {
      return Boolean(this._getTitle());
    };
    _proto._getTipElement = function _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    };
    _proto._createTipElement = function _createTipElement(content) {
      var tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add("bs-" + this.constructor.NAME + "-auto");
      var tipId = index_js.getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE);
      }
      return tip;
    };
    _proto.setContent = function setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    };
    _proto._getTemplateFactory = function _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory(_extends({}, this._config, {
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content: content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        }));
      }
      return this._templateFactory;
    };
    _proto._getContentForTemplate = function _getContentForTemplate() {
      var _ref3;
      return _ref3 = {}, _ref3[SELECTOR_TOOLTIP_INNER] = this._getTitle(), _ref3;
    };
    _proto._getTitle = function _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    ;
    _proto._initializeOnDelegatedTarget = function _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    };
    _proto._isAnimated = function _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
    };
    _proto._isShown = function _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
    };
    _proto._createPopper = function _createPopper(tip) {
      var placement = index_js.execute(this._config.placement, [this, tip, this._element]);
      var attachment = AttachmentMap[placement.toUpperCase()];
      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    };
    _proto._getOffset = function _getOffset() {
      var _this4 = this;
      var offset = this._config.offset;
      if (typeof offset === 'string') {
        return offset.split(',').map(function (value) {
          return Number.parseInt(value, 10);
        });
      }
      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this4._element);
        };
      }
      return offset;
    };
    _proto._resolvePossibleFunction = function _resolvePossibleFunction(arg) {
      return index_js.execute(arg, [this._element, this._element]);
    };
    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this5 = this;
      var defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: "." + this.constructor.NAME + "-arrow"
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: function fn(data) {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            _this5._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return _extends({}, defaultBsPopperConfig, index_js.execute(this._config.popperConfig, [undefined, defaultBsPopperConfig]));
    };
    _proto._setListeners = function _setListeners() {
      var _this6 = this;
      var triggers = this._config.trigger.split(' ');
      for (var _iterator3 = _createForOfIteratorHelperLoose(triggers), _step3; !(_step3 = _iterator3()).done;) {
        var trigger = _step3.value;
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, function (event) {
            var context = _this6._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
          var eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
          EventHandler.on(this._element, eventIn, this._config.selector, function (event) {
            var context = _this6._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, function (event) {
            var context = _this6._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = function () {
        if (_this6._element) {
          _this6.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    };
    _proto._fixTitle = function _fixTitle() {
      var title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    };
    _proto._enter = function _enter() {
      var _this7 = this;
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(function () {
        if (_this7._isHovered) {
          _this7.show();
        }
      }, this._config.delay.show);
    };
    _proto._leave = function _leave() {
      var _this8 = this;
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(function () {
        if (!_this8._isHovered) {
          _this8.hide();
        }
      }, this._config.delay.hide);
    };
    _proto._setTimeout = function _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    };
    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    };
    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this._element);
      for (var _i = 0, _Object$keys = Object.keys(dataAttributes); _i < _Object$keys.length; _i++) {
        var dataAttribute = _Object$keys[_i];
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = _extends({}, dataAttributes, typeof config === 'object' && config ? config : {});
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    };
    _proto._configAfterMerge = function _configAfterMerge(config) {
      config.container = config.container === false ? document.body : index_js.getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    };
    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};
      for (var _i2 = 0, _Object$entries = Object.entries(this._config); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _Object$entries[_i2],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    };
    _proto._disposePopper = function _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    ;
    Tooltip.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config]();
      });
    };
    return _createClass(Tooltip, null, [{
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
   * jQuery
   */
  index_js.defineJQueryPlugin(Tooltip);

  return Tooltip;

}));
//# sourceMappingURL=tooltip.js.map

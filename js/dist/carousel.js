/*!
  * Arizona Bootstrap carousel.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/manipulator.js'), require('./dom/selector-engine.js'), require('./util/index.js'), require('./util/swipe.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './dom/manipulator', './dom/selector-engine', './util/index', './util/swipe'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Carousel = factory(global.BaseComponent, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Index, global.Swipe));
})(this, (function (BaseComponent, EventHandler, Manipulator, SelectorEngine, index_js, Swipe) { 'use strict';

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

  var _KEY_TO_DIRECTION;

  /**
   * Constants
   */

  var NAME = 'carousel';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var ORDER_NEXT = 'next';
  var ORDER_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY;
  var EVENT_SLID = "slid" + EVENT_KEY;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_END = 'carousel-item-end';
  var CLASS_NAME_START = 'carousel-item-start';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _KEY_TO_DIRECTION[ARROW_LEFT_KEY] = DIRECTION_RIGHT, _KEY_TO_DIRECTION[ARROW_RIGHT_KEY] = DIRECTION_LEFT, _KEY_TO_DIRECTION);
  var Default = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */
  var Carousel = /*#__PURE__*/function (_BaseComponent) {
    function Carousel(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;
      _this._interval = null;
      _this._activeElement = null;
      _this._isSliding = false;
      _this.touchTimeout = null;
      _this._swipeHelper = null;
      _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
      _this._addEventListeners();
      if (_this._config.ride === CLASS_NAME_CAROUSEL) {
        _this.cycle();
      }
      return _this;
    }

    // Getters
    _inheritsLoose(Carousel, _BaseComponent);
    var _proto = Carousel.prototype;
    // Public
    _proto.next = function next() {
      this._slide(ORDER_NEXT);
    };
    _proto.nextWhenVisible = function nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && index_js.isVisible(this._element)) {
        this.next();
      }
    };
    _proto.prev = function prev() {
      this._slide(ORDER_PREV);
    };
    _proto.pause = function pause() {
      if (this._isSliding) {
        index_js.triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    };
    _proto.cycle = function cycle() {
      var _this2 = this;
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(function () {
        return _this2.nextWhenVisible();
      }, this._config.interval);
    };
    _proto._maybeEnableCycle = function _maybeEnableCycle() {
      var _this3 = this;
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this3.cycle();
        });
        return;
      }
      this.cycle();
    };
    _proto.to = function to(index) {
      var _this4 = this;
      var items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this4.to(index);
        });
        return;
      }
      var activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    };
    _proto.dispose = function dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      _BaseComponent.prototype.dispose.call(this);
    }

    // Private
    ;
    _proto._configAfterMerge = function _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    };
    _proto._addEventListeners = function _addEventListeners() {
      var _this5 = this;
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this5._keydown(event);
        });
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function () {
          return _this5.pause();
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function () {
          return _this5._maybeEnableCycle();
        });
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    };
    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this6 = this;
      for (var _iterator = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)), _step; !(_step = _iterator()).done;) {
        var img = _step.value;
        EventHandler.on(img, EVENT_DRAG_START, function (event) {
          return event.preventDefault();
        });
      }
      var endCallBack = function endCallBack() {
        if (_this6._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        _this6.pause();
        if (_this6.touchTimeout) {
          clearTimeout(_this6.touchTimeout);
        }
        _this6.touchTimeout = setTimeout(function () {
          return _this6._maybeEnableCycle();
        }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
      };
      var swipeConfig = {
        leftCallback: function leftCallback() {
          return _this6._slide(_this6._directionToOrder(DIRECTION_LEFT));
        },
        rightCallback: function rightCallback() {
          return _this6._slide(_this6._directionToOrder(DIRECTION_RIGHT));
        },
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    };
    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      var direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    };
    _proto._getItemIndex = function _getItemIndex(element) {
      return this._getItems().indexOf(element);
    };
    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
      activeIndicator.removeAttribute('aria-current');
      var newActiveIndicator = SelectorEngine.findOne("[data-bs-slide-to=\"" + index + "\"]", this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    };
    _proto._updateInterval = function _updateInterval() {
      var element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    };
    _proto._slide = function _slide(order, element) {
      var _this7 = this;
      if (element === void 0) {
        element = null;
      }
      if (this._isSliding) {
        return;
      }
      var activeElement = this._getActive();
      var isNext = order === ORDER_NEXT;
      var nextElement = element || index_js.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      var nextElementIndex = this._getItemIndex(nextElement);
      var triggerEvent = function triggerEvent(eventName) {
        return EventHandler.trigger(_this7._element, eventName, {
          relatedTarget: nextElement,
          direction: _this7._orderToDirection(order),
          from: _this7._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      var slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      var isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      index_js.reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      var completeCallBack = function completeCallBack() {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE);
        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
        _this7._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    };
    _proto._isAnimated = function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    };
    _proto._getActive = function _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    };
    _proto._getItems = function _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    };
    _proto._clearInterval = function _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    };
    _proto._directionToOrder = function _directionToOrder(direction) {
      if (index_js.isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    };
    _proto._orderToDirection = function _orderToDirection(order) {
      if (index_js.isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    ;
    Carousel.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    return _createClass(Carousel, null, [{
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
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
    var target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    var carousel = Carousel.getOrCreateInstance(target);
    var slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (var _iterator2 = _createForOfIteratorHelperLoose(carousels), _step2; !(_step2 = _iterator2()).done;) {
      var carousel = _step2.value;
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Carousel);

  return Carousel;

}));
//# sourceMappingURL=carousel.js.map

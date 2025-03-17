/*!
  * Arizona Bootstrap scrollspy.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./base-component.js'), require('./dom/event-handler.js'), require('./dom/selector-engine.js'), require('./util/index.js')) :
  typeof define === 'function' && define.amd ? define(['./base-component', './dom/event-handler', './dom/selector-engine', './util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Scrollspy = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Index));
})(this, (function (BaseComponent, EventHandler, SelectorEngine, index_js) { 'use strict';

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

  var NAME = 'scrollspy';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_ACTIVATE = "activate" + EVENT_KEY;
  var EVENT_CLICK = "click" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_TARGET_LINKS = '[href]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_LINK_ITEMS = SELECTOR_NAV_LINKS + ", " + SELECTOR_NAV_ITEMS + " > " + SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS;
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var Default = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  var DefaultType = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */
  var ScrollSpy = /*#__PURE__*/function (_BaseComponent) {
    function ScrollSpy(element, config) {
      var _this;
      _this = _BaseComponent.call(this, element, config) || this;

      // this._element is the observablesContainer and config.target the menu links wrapper
      _this._targetLinks = new Map();
      _this._observableSections = new Map();
      _this._rootElement = getComputedStyle(_this._element).overflowY === 'visible' ? null : _this._element;
      _this._activeTarget = null;
      _this._observer = null;
      _this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      _this.refresh(); // initialize
      return _this;
    }

    // Getters
    _inheritsLoose(ScrollSpy, _BaseComponent);
    var _proto = ScrollSpy.prototype;
    // Public
    _proto.refresh = function refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (var _iterator = _createForOfIteratorHelperLoose(this._observableSections.values()), _step; !(_step = _iterator()).done;) {
        var section = _step.value;
        this._observer.observe(section);
      }
    };
    _proto.dispose = function dispose() {
      this._observer.disconnect();
      _BaseComponent.prototype.dispose.call(this);
    }

    // Private
    ;
    _proto._configAfterMerge = function _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = index_js.getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? config.offset + "px 0px -30%" : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(function (value) {
          return Number.parseFloat(value);
        });
      }
      return config;
    };
    _proto._maybeEnableSmoothScroll = function _maybeEnableSmoothScroll() {
      var _this2 = this;
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, function (event) {
        var observableSection = _this2._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          var root = _this2._rootElement || window;
          var height = observableSection.offsetTop - _this2._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    };
    _proto._getNewObserver = function _getNewObserver() {
      var _this3 = this;
      var options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(function (entries) {
        return _this3._observerCallback(entries);
      }, options);
    }

    // The logic of selection
    ;
    _proto._observerCallback = function _observerCallback(entries) {
      var _this4 = this;
      var targetElement = function targetElement(entry) {
        return _this4._targetLinks.get("#" + entry.target.id);
      };
      var activate = function activate(entry) {
        _this4._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        _this4._process(targetElement(entry));
      };
      var parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      var userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (var _iterator2 = _createForOfIteratorHelperLoose(entries), _step2; !(_step2 = _iterator2()).done;) {
        var entry = _step2.value;
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        var entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    };
    _proto._initializeTargetsAndObservables = function _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      var targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (var _iterator3 = _createForOfIteratorHelperLoose(targetLinks), _step3; !(_step3 = _iterator3()).done;) {
        var anchor = _step3.value;
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || index_js.isDisabled(anchor)) {
          continue;
        }
        var observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (index_js.isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    };
    _proto._process = function _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };
    _proto._activateParents = function _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
        return;
      }
      for (var _iterator4 = _createForOfIteratorHelperLoose(SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)), _step4; !(_step4 = _iterator4()).done;) {
        var listGroup = _step4.value;
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (var _iterator5 = _createForOfIteratorHelperLoose(SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)), _step5; !(_step5 = _iterator5()).done;) {
          var item = _step5.value;
          item.classList.add(CLASS_NAME_ACTIVE);
        }
      }
    };
    _proto._clearActiveClass = function _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE);
      var activeNodes = SelectorEngine.find(SELECTOR_TARGET_LINKS + "." + CLASS_NAME_ACTIVE, parent);
      for (var _iterator6 = _createForOfIteratorHelperLoose(activeNodes), _step6; !(_step6 = _iterator6()).done;) {
        var node = _step6.value;
        node.classList.remove(CLASS_NAME_ACTIVE);
      }
    }

    // Static
    ;
    ScrollSpy.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config]();
      });
    };
    return _createClass(ScrollSpy, null, [{
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
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    for (var _iterator7 = _createForOfIteratorHelperLoose(SelectorEngine.find(SELECTOR_DATA_SPY)), _step7; !(_step7 = _iterator7()).done;) {
      var spy = _step7.value;
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(ScrollSpy);

  return ScrollSpy;

}));
//# sourceMappingURL=scrollspy.js.map

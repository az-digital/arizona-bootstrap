/*!
  * Arizona Bootstrap selector-engine.js v5.0.0-alpha1 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../util/index.js')) :
  typeof define === 'function' && define.amd ? define(['../util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SelectorEngine = factory(global.Index));
})(this, (function (index_js) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      var hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = "#" + hrefAttribute.split('#')[1];
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(',').map(function (sel) {
      return index_js.parseSelector(sel);
    }).join(',') : null;
  };
  var SelectorEngine = {
    find: function find(selector, element) {
      var _ref;
      if (element === void 0) {
        element = document.documentElement;
      }
      return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne: function findOne(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }
      return Element.prototype.querySelector.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;
      return (_ref2 = []).concat.apply(_ref2, element.children).filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next: function next(element, selector) {
      var next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren: function focusableChildren(element) {
      var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) {
        return selector + ":not([tabindex^=\"-\"])";
      }).join(',');
      return this.find(focusables, element).filter(function (el) {
        return !index_js.isDisabled(el) && index_js.isVisible(el);
      });
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector: function getElementFromSelector(element) {
      var selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector: function getMultipleElementsFromSelector(element) {
      var selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  return SelectorEngine;

}));
//# sourceMappingURL=selector-engine.js.map

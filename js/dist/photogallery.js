/*!
  * Arizona Bootstrap photogallery.js v5.0.0 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2025 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Photogallery = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
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
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Arizona Bootstrap: photogallery.js
   * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Fix slide-to functionality of photo gallery grid thumbnail buttons.
   * See https://github.com/az-digital/arizona-bootstrap/issues/1705.
   */
  function photoGalleryGridSlideToImage() {
    var gridButtons = document.querySelectorAll('.az-gallery-grid-btn');
    var _loop = function _loop() {
      var gridButton = _step.value;
      var slideToEl = gridButton.querySelector('[data-bs-slide-to]');
      if (slideToEl) {
        gridButton.addEventListener('click', function () {
          slideToEl.click();
        });
      }
    };
    for (var _iterator = _createForOfIteratorHelperLoose(gridButtons), _step; !(_step = _iterator()).done;) {
      _loop();
    }
  }

  return photoGalleryGridSlideToImage;

}));
//# sourceMappingURL=photogallery.js.map

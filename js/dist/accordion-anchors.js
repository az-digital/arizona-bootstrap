/*!
  * Arizona Bootstrap accordion-anchors.js v5.2.0 (https://github.com/az-digital/arizona-bootstrap)
  * Copyright 2026 The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../node_modules/bootstrap/js/src/collapse.js'), require('../../node_modules/bootstrap/js/src/tooltip.js')) :
  typeof define === 'function' && define.amd ? define(['../../node_modules/bootstrap/js/src/collapse', '../../node_modules/bootstrap/js/src/tooltip'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AccordionAnchors = factory(global.Collapse, global.Tooltip));
})(this, (function (Collapse, Tooltip) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Arizona Bootstrap: accordion-anchors.js
   * Licensed under MIT (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ANCHOR_SELECTOR = '.az-accordion-anchor';
  var COLLAPSE_TOGGLE_SELECTOR = '[data-bs-toggle="collapse"]';
  var COPY_FEEDBACK_MS = 3000;
  var COPY_ICON = 'link';
  var COPIED_ICON = 'check';

  // Copy the accordion's direct link to the clipboard and give visual feedback,
  // without navigating or toggling the panel on click.
  function copyAnchorLink(event, anchor) {
    var _anchor$parentElement;
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    var href = anchor.getAttribute('href') || '';
    var anchorId = href.startsWith('#') ? href.slice(1) : (_anchor$parentElement = anchor.parentElement) == null ? void 0 : _anchor$parentElement.id;
    if (!anchorId) {
      return;
    }
    var baseUrl = window.location.href.split('#')[0];
    var urlToCopy = baseUrl + "#" + anchorId;
    var feedbackSpan = anchor.querySelector('span') || anchor.children[0];
    var feedbackTooltip = Tooltip.getInstance(anchor);
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(urlToCopy).then(function () {
      if (!feedbackSpan) {
        return;
      }
      feedbackSpan.innerHTML = COPIED_ICON;
      setTimeout(function () {
        feedbackSpan.innerHTML = COPY_ICON;
        feedbackTooltip.hide();
      }, COPY_FEEDBACK_MS);
    });
  }

  // Resolve the collapsible panel referenced by a URL hash. The hash may point at
  // the panel itself or at an accordion heading whose toggle targets the panel.
  function resolvePanelFromHash(hash) {
    var id = (hash || '').replace(/^#/, '');
    if (!id) {
      return null;
    }
    var target = document.getElementById(id);
    if (!target) {
      return null;
    }
    if (target.classList.contains('accordion-collapse')) {
      return target;
    }

    // Check accordion dropdown
    var targetButton = target.querySelectorAll('button');
    if (targetButton[0] === null) {
      return null;
    }
    if (!targetButton[0].classList.contains('collapsed')) {
      return null; // Do nothing if the panel is already opened.
    }
    var toggle = target.matches(COLLAPSE_TOGGLE_SELECTOR) ? target : target.querySelector(COLLAPSE_TOGGLE_SELECTOR);
    if (!toggle) {
      return null;
    }
    var ariaControls = toggle.getAttribute('aria-controls');
    var selector = toggle.getAttribute('data-bs-target') || (ariaControls ? "#" + ariaControls : '');
    return selector ? document.querySelector(selector) : null;
  }

  // Expand the panel referenced by the current URL hash, then scroll its
  // heading into view once the show transition actually finishes. On a fresh
  // page load, the browser's native fragment-scroll fires immediately, before
  // this panel's sibling (if one was open, per data-bs-parent) has finished
  // collapsing - so it commits to a resting position based on stale layout,
  // holds there for the whole ~350ms transition, then gets corrected in a
  // separate hop once this function's own scroll runs. That jump-pause-hop
  // sequence reads as a stutter even when the correction itself is small.
  function openPanelFromHash() {
    var _panel$closest, _document$querySelect;
    var panel = resolvePanelFromHash(window.location.hash);
    if (!panel) {
      return;
    }
    var header = (_panel$closest = panel.closest('.accordion-item')) == null ? void 0 : _panel$closest.querySelector('.accordion-header');
    var scrollHeaderIntoView = function scrollHeaderIntoView() {
      return header == null ? void 0 : header.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };
    if (panel.classList.contains('show')) {
      scrollHeaderIntoView();
      return;
    }

    // data-bs-parent means opening this panel also closes whichever sibling is
    // currently open. That sibling's hide transition is a separate Collapse
    // instance with its own independently-queued completion callback, so this
    // panel's shown.bs.collapse firing doesn't guarantee the sibling's own
    // hidden.bs.collapse has too - scrolling before it has can mean the page
    // is still settling underneath the scroll animation. Wait for both.
    var parentSelector = panel.getAttribute('data-bs-parent');
    var openSibling = parentSelector ? (_document$querySelect = document.querySelector(parentSelector)) == null ? void 0 : _document$querySelect.querySelector('.accordion-collapse.show') : null;
    var awaitedTransitions = openSibling && openSibling !== panel ? 2 : 1;
    var settledTransitions = 0;
    var onTransitionSettled = function onTransitionSettled() {
      settledTransitions += 1;
      if (settledTransitions >= awaitedTransitions) {
        scrollHeaderIntoView();
      }
    };
    panel.addEventListener('shown.bs.collapse', onTransitionSettled, {
      once: true
    });
    if (openSibling && openSibling !== panel) {
      openSibling.addEventListener('hidden.bs.collapse', onTransitionSettled, {
        once: true
      });
    }
    Collapse.getOrCreateInstance(panel).show();
  }

  // Deferred a frame: the browser's own native fragment-scroll on a fresh load
  // can otherwise race this code and run after it, undoing the reset in
  // openPanelFromHash() before it has any effect.
  function openInitialPanelFromHash() {
    requestAnimationFrame(function () {
      return openPanelFromHash();
    });
  }

  /**
   * Enable accordion anchor links: copy-to-clipboard on the anchor, plus
   * open-and-scroll-to the referenced panel when its link is in the URL.
   */
  function enableAccordionAnchors() {
    if (typeof document === 'undefined') {
      return;
    }

    // Delegate so anchors added after init still work and timing is not an issue.
    document.addEventListener('click', function (event) {
      var anchor = event.target.closest(ANCHOR_SELECTOR);
      if (anchor) {
        copyAnchorLink(event, anchor);
      }
    });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', openInitialPanelFromHash, {
        once: true
      });
    } else {
      openInitialPanelFromHash();
    }
    window.addEventListener('hashchange', function () {
      return openPanelFromHash();
    });
  }

  return enableAccordionAnchors;

}));
//# sourceMappingURL=accordion-anchors.js.map

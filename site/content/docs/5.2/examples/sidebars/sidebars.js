/* global arizonaBootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new arizonaBootstrap.Tooltip(tooltipTriggerEl)
  })
})()

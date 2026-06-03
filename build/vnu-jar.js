#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017-2022 The Bootstrap Authors
 * Copyright 2017-2022 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

'use strict'

const { execFile, spawn } = require('node:child_process')
const vnu = require('vnu-jar')

execFile('java', ['-version'], (error, stdout, stderr) => {
  if (error) {
    console.error('Skipping vnu-jar test; Java is missing.')
    return
  }

  const is32bitJava = !/64-Bit/.test(stderr)

  // vnu-jar accepts multiple ignores joined with a `|`.
  // Also note that the ignores are string regular expressions.
  const ignores = [
    // "autocomplete" is included in <button> and checkboxes and radio <input>s due to
    // Firefox's non-standard autocomplete behavior - see https://bugzilla.mozilla.org/show_bug.cgi?id=654072
    'Attribute “autocomplete” is only allowed when the input type is.*',
    'Attribute “autocomplete” not allowed on element “button” at this point.',
    // IE11 doesn't recognise <main> / give the element an implicit "main" landmark.
    // Explicit role="main" is redundant for other modern browsers, but still valid.
    'The “main” role is unnecessary for element “main”.',
    'Self-closing tag syntax in text/html documents is widely discouraged;.*',
    'Trailing slash on void elements has no effect and interacts badly with unquoted attribute values.',
    // Per https://www.w3.org/TR/html-aria/#docconformance having "aria-disabled" on a link is
    // NOT RECOMMENDED, but it's still valid - we explain in the docs that it's not ideal,
    // and offer more robust alternatives, but also need to show a less-than-ideal example
    'An “aria-disabled” attribute whose value is “true” should not be specified on an “a” element that has an “href” attribute.',
    // Un-ignore to fix heading level hierarchy issues throughout the docs
    // eslint-disable-next-line unicorn/prefer-string-raw
    'The heading “h\\d+” \\(with computed level \\d+\\) follows the heading “h\\d+” \\(with computed level \\d+\\), skipping \\d+ heading levels?\\.',
    // Un-ignore to fix <li> elements with roles other than listitem inside list elements
    'An “li” element that is a descendant of a “ul”, “ol”, or “menu” element with no explicit “role” value, or a descendant of a “role=list” element, must not have any “role” value other than “listitem”.',
    // Un-ignore to ensure every active role=tab element has a corresponding role=tabpanel element
    'Every active “role=tab” element must have a corresponding “role=tabpanel” element.',
    // Un-ignore to fix aria-labelledby usage on div elements without an appropriate role
    'The “aria-labelledby” attribute must not be specified on any “div” element unless the element has a “role” value other than “caption”, “code”, “deletion”, “emphasis”, “generic”, “insertion”, “paragraph”, “presentation”, “strong”, “subscript”, or “superscript”.',
    // Un-ignore to fix aria-describedby usage on "label" elements associated with labelable elements
    'The “aria-describedby” attribute must not be used on any “label” element that is associated with a labelable element.',
    // Un-ignore to fix the missing heading level 1
    'This document has heading elements but none of them has a computed heading level of 1.'
  ].join('|')

  const args = [
    '-jar',
    `"${vnu}"`,
    '--asciiquotes',
    '--skip-non-html',
    '--Werror',
    `--filterpattern "${ignores}"`,
    '_site/',
    'js/tests/'
  ]

  // For the 32-bit Java we need to pass `-Xss512k`
  if (is32bitJava) {
    args.splice(0, 0, '-Xss512k')
  }

  return spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})

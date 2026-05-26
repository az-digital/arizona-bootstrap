#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017-2024 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

import { execFile, spawn } from 'node:child_process'
import vnu from 'vnu-jar'

execFile('java', ['-version'], (error, stdout, stderr) => {
  if (error) {
    console.error('Skipping vnu-jar test; Java is probably missing.')
    console.error(error)
    return
  }

  console.log('Running vnu-jar validation...')

  const is32bitJava = !/64-Bit/.test(stderr)

  // vnu-jar accepts multiple ignores joined with a `|`.
  // Also note that the ignores are string regular expressions.
  const ignores = [
    '.*our_.*_hash_here.*',
    // "autocomplete" is included in <button> and checkboxes and radio <input>s due to
    // Firefox's non-standard autocomplete behavior - see https://bugzilla.mozilla.org/show_bug.cgi?id=654072
    'Attribute “autocomplete” is only allowed when the input type is.*',
    'Attribute “autocomplete” not allowed on element “button” at this point.',
    // Per https://www.w3.org/TR/html-aria/#docconformance having "aria-disabled" on a link is
    // NOT RECOMMENDED, but it's still valid - we explain in the docs that it's not ideal,
    // and offer more robust alternatives, but also need to show a less-than-ideal example
    'An “aria-disabled” attribute whose value is “true” should not be specified on an “a” element that has an “href” attribute.',
    // TODO: fix heading level hierarchy issues throughout the docs
    'The heading “h\\d+” \\(with computed level \\d+\\) follows the heading “h\\d+” \\(with computed level \\d+\\), skipping \\d+ heading levels?\\.',
    // TODO: fix <li> elements with roles other than listitem inside list elements
    'An “li” element that is a descendant of a “ul”, “ol”, or “menu” element with no explicit “role” value, or a descendant of a “role=list” element, must not have any “role” value other than “listitem”.',
    // TODO: ensure every active role=tab element has a corresponding role=tabpanel element
    'Every active “role=tab” element must have a corresponding “role=tabpanel” element.',
    // TODO: fix aria-labelledby usage on div elements without an appropriate role
    'The “aria-labelledby” attribute must not be specified on any “div” element unless the element has a “role” value other than “caption”, “code”, “deletion”, “emphasis”, “generic”, “insertion”, “paragraph”, “presentation”, “strong”, “subscript”, or “superscript”.'
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

  console.log(`command used: java ${args.join(' ')}`)

  return spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})

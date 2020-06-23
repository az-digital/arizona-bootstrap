#!/bin/sh

set -ex

cd /arizona-bootstrap
npm install
bundle install
npm run css-main
npm run js-lint-main
npm run js-compile
npm run js-minify-main

npm run docs-review

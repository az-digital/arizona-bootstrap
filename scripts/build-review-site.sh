#!/bin/sh

set -ex

cd /arizona-bootstrap
npm install
bundle install
npm run css-main
npm run js-main
npm run docs-review

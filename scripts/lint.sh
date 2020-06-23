#!/bin/sh

set -ex

cd /arizona-bootstrap
npm install
bundle install
npm run lint
npm run dist
npm run docs

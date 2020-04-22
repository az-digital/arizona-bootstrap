#!/bin/sh

set -ex

bundle config gemfile '/rubytooling/Gemfile'
bundle install
npm install

export UAZ_REVIEW_BASEURL=$2
npm run $1

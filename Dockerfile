FROM --platform=linux/amd64 node:16.20.0-bullseye-slim

ENV LANG C.UTF-8

COPY scripts/build-cdn-assets.sh /usr/local/bin/build-cdn-assets
COPY scripts/build-review-site.sh /usr/local/bin/build-review-site
COPY scripts/copy-npm-config.sh /usr/local/bin/copy-npm-config
COPY scripts/create-hugo-config.sh /usr/local/bin/create-hugo-config
COPY scripts/create-release.sh /usr/local/bin/create-release
COPY scripts/expose-review-site.sh /usr/local/bin/expose-review-site
COPY scripts/lint.sh /usr/local/bin/lint
COPY scripts/serve-review-site.sh /usr/local/bin/serve-review-site

# Build args don't normally persist as environment variables.
ARG AZ_BOOTSTRAP_FROZEN_DIR
ENV AZ_BOOTSTRAP_FROZEN_DIR ${AZ_BOOTSTRAP_FROZEN_DIR:-/azbuild/arizona-bootstrap}
ARG AZ_BOOTSTRAP_SOURCE_DIR
ENV AZ_BOOTSTRAP_SOURCE_DIR ${AZ_BOOTSTRAP_SOURCE_DIR:-/arizona-bootstrap-source}

# Silence warnings from the update-notifier npm package.
ENV NO_UPDATE_NOTIFIER 1

WORKDIR $AZ_BOOTSTRAP_SOURCE_DIR

COPY "package.json" "$AZ_BOOTSTRAP_FROZEN_DIR"/

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    ca-certificates \
    curl \
    git \
    jq \
    openjdk-11-jre-headless \
    openssl \
    rsync \
    unzip \
  && rm -rf /var/lib/apt/lists/* \
  && chmod 755 /root \
  && touch /root/.npmrc \
  && chmod 644 /root/.npmrc \
  && npm install --location=global npm-check-updates@16.6.2 \
  && curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o /tmp/awscliv2.zip \
  && unzip -d /tmp /tmp/awscliv2.zip \
  && /tmp/aws/install \
  && rm /tmp/awscliv2.zip \
  && rm -Rf /tmp/aws

WORKDIR $AZ_BOOTSTRAP_FROZEN_DIR

RUN mkdir /home/node/.npm \
  && chown node:node /home/node/.npm \
  && npm config set cache='/home/node/.npm' \
  && npm install \
  && find node_modules -name '.DS_Store' -exec rm {} \; \ 
  && chown -R node:node "$AZ_BOOTSTRAP_FROZEN_DIR"

USER node:node

WORKDIR $AZ_BOOTSTRAP_SOURCE_DIR

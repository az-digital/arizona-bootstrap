FROM node:16.15.1-bullseye-slim

ENV LANG C.UTF-8
ENV JAVA_HOME /usr/local/openjdk-11
ENV PATH ${JAVA_HOME}/bin:${PATH}

COPY --from=openjdk:11.0.15-jre-slim-bullseye "$JAVA_HOME" "$JAVA_HOME"
COPY --from=openjdk:11.0.15-jre-slim-bullseye /etc/ca-certificates/update.d/docker-openjdk /etc/ca-certificates/update.d/docker-openjdk

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
ENV AZ_BOOTSTRAP_SOURCE_DIR ${AZ_BOOTSTRAP_SOURCE_DIR:-/arizona-bootstrap-src}

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
    openssl \
    rsync \
    unzip \
  && rm -rf /var/lib/apt/lists/* \
  && curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o /tmp/awscliv2.zip \
  && unzip -d /tmp /tmp/awscliv2.zip \
  && /tmp/aws/install \
  && rm /tmp/awscliv2.zip \
  && rm -Rf /tmp/aws ; \
  find "${JAVA_HOME}/lib" -name '*.so' -exec dirname '{}' ';' | sort -u > /etc/ld.so.conf.d/docker-openjdk.conf; \
	ldconfig

WORKDIR $AZ_BOOTSTRAP_FROZEN_DIR

RUN mkdir /home/node/.npm \
  && chown node:node /home/node/.npm \
  && npm config set cache='/home/node/.npm' \
  && chmod 755 /root \
  && chmod 644 /root/.npmrc \
  && npm install -g npm-check-updates@14.0.1 \
  && npm install \
  && find node_modules -name '.DS_Store' -exec rm {} \;

WORKDIR $AZ_BOOTSTRAP_SOURCE_DIR

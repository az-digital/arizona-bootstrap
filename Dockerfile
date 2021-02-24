FROM debian:buster-20200803-slim as fulldevenv

WORKDIR /build

COPY Gemfile Gemfile.lock /build/

RUN apt-get update \
  && apt-get install -y \
    git \
    ruby-dev \
    gcc \
    g++ \
    make \
    libc6-dev \
    zlib1g-dev \
  && rm -rf /var/lib/apt/lists/* \
  && gem install -N bundler -v 2.1.4 \
  && bundle install --deployment

FROM node:12.18.3-buster-slim

ENV LANG C.UTF-8
ENV JAVA_HOME /usr/local/openjdk-11
ENV PATH ${JAVA_HOME}/bin:${PATH}

COPY --from=fulldevenv /build /rubytooling/

COPY --from=openjdk:11.0.8-jre-slim-buster "$JAVA_HOME" "$JAVA_HOME"
COPY --from=openjdk:11.0.8-jre-slim-buster /etc/ca-certificates/update.d/docker-openjdk /etc/ca-certificates/update.d/docker-openjdk

COPY scripts/build-cdn-assets.sh /usr/local/bin/build-cdn-assets
COPY scripts/build-review-site.sh /usr/local/bin/build-review-site
COPY scripts/create-release.sh /usr/local/bin/create-release
COPY scripts/create-source-links.sh /usr/local/bin/create-source-links
COPY scripts/create-jekyll-config.sh /usr/local/bin/create-jekyll-config
COPY scripts/expose-review-site.sh /usr/local/bin/expose-review-site
COPY scripts/lint.sh /usr/local/bin/lint
COPY scripts/serve-review-site.sh /usr/local/bin/serve-review-site
COPY scripts/sync-static-site-dir.sh /usr/local/bin/sync-static-site-dir

# Build args don't normally persist as environment variables.
ARG AZ_BOOTSTRAP_DEST_DIR
ENV AZ_BOOTSTRAP_DEST_DIR ${AZ_BOOTSTRAP_DEST_DIR:-/azbuild/arizona-bootstrap}
ARG AZ_BOOTSTRAP_SOURCE_DIR
ENV AZ_BOOTSTRAP_SOURCE_DIR ${AZ_BOOTSTRAP_SOURCE_DIR:-/arizona-bootstrap-src}

WORKDIR $AZ_BOOTSTRAP_DEST_DIR

COPY "package.json" "package-lock.json" "$AZ_BOOTSTRAP_DEST_DIR"/

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    git \
    jq \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    rsync \
    ruby \
  && rm -rf /var/lib/apt/lists/* \
  && gem install -N bundler -v 2.1.4 \
  && bundle config gemfile '/rubytooling/Gemfile' \
  && pip3 install 'awscli~=1.18.115'; \
  find "${JAVA_HOME}/lib" -name '*.so' -exec dirname '{}' ';' | sort -u > /etc/ld.so.conf.d/docker-openjdk.conf; \
	ldconfig \
  && bundle install \
  && npm install

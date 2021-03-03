---
layout: docs
title: Build tools
description: Learn how to use Arizona Bootstrap's included npm scripts to build our documentation, compile source code, run tests, and more.
group: getting-started
toc: true
---

## Ways to Change and Build Arizona Bootstrap

If you are one of the developers who can make changes to the main [Arizona Bootstrap repository]({{ site.repo }}), the built-in continuous integration feature called GitHub Actions takes care of building a new version including your suggested changes and presenting it on a generally visible review web site. See the [CONTRIBUTING]({{ site.repo}}/blob/main/CONTRIBUTING.md) document for more details about how to do this. If you're working from a fork of the main Arizona Bootstrap repository elsewhere on GitHub, the GitHub Actions automated builds should still work, but will require extensive initial setup on your part, and in particular you will have to establish your own arrangements for hosting the review sites, since the main repository is using AWS with some very specific access arrangements.

Docker simplifies building Arizona Bootstrap locally, either in advance of changing the main repository, or if you want some independent customizations, and makes it easy to view the changes in a web browser through a local link.

If you are unable to use Docker in your local development environment, or are already comfortable with the suggestions that Twitter Bootstrap Version 4 makes for a local tooling setup, you cam still follow these, but Arizona Bootstrap makes one or two minor changes that will require your attention first.

## Docker for local development

A custom local Docker image provides the complete development environment.

### Building the Docker image

You can build the image from a shell command line after changing to the directory that includes the `Dockerfile` by running

```sh
scripts/build-container.sh
```

The script tries to discover if you have already built an image using the current versions of several important configuration files, and doesn't try to re-build this if it already exists.

The initial build will be relatively slow, and may require reasonably fast Internet access. If you see errors that complain about failing to download various resources, and these errors aren't consistent from one build attempt to the next, you may be suffering a connection speed problem.

The build environment uses two different packaging systems: Gems for Ruby (the language the Jekyll static web site building software uses), and the huge set of Node.js packages (that `npm` uses for practically everything else). Setting these packages up causes most of the delay, but ideally the image will provide you with Docker containers that start up quickly pre-configured with the build environment you need.

If the image build succeeds, it should finish by showing the image ID code, which you should note (copy) as the most convenirnt means of referring to the image, since the usual tagged name will be very long (it includes the full hex checksum hash of the configuration files). In the examples that follow, this code is `f855e50fb65e`, but you should substitute the ID from your own image build.

### Viewing the locally built documentation review site

In a command-line shell, make sure you're in the top-level directory of your local working Arizona Bootstrap copy (the one containing the `Dockerfile`), then enter a command like

```sh
docker run -t -i --rm -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-src f855e50fb65e serve-review-site
```

- The `-t` and `-i` flags are the usual additions for a container that will be at least semi-interactive.
- `--rm` makes sure the container will not persist after it has stopped.
- A web server will be running on port 9001 inside the container, showing the newly built review site using the documentation; the `-p 9001:9001` specifies that this will be reachable on the same port outside the container as well (you can change the number if you run into port conflicts).
- `-v "$(pwd)":/arizona-bootstrap-src` sets up sharing of the current directory (`$(pwd)` is a shortcut notaton for this, but you can enter it some other way if necessary); inside the container this directory will appear as `/arizona-bootstrap-src`.
- `f855e50fb65e` is the image ID is in the case of the example, but as already noted you should substitute the ID from your own Docker image build for this.
- `serve-review-site` is the command that runs inside the container, building the static documentation web site based on your local version of Arizona Bootstrap and starting a little web server to make it visible.

If everything works, you should see a message telling you the static web site is available at a particular URL. This might be specific to the interior of the Docker container, so you should point your local web browser at a similar URL, but specify it starting with something like `http://localhost:9001...` if you used the `-p 9001:9001` option with the `docker run` command, or choose whatever port you specified there if you modified this option.

### Other Docker commands to help local development

The usual local development environment hides the final fully built static documentation web site within the Docker container, but you might need to move this to a web server elsewhere the command

```sh
docker run -t -i --rm -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-src f855e50fb65e expose-review-site
```

copies the completed site out to a subdirectory called `_site`.

You can specify a prefix to include in all the URLs of the static site by setting an environment variable within the container. For example to include the prefix `/bootstrap/localwip` the command would be

```sh
docker run -t -i --rm -e "AZ_SITE_BASE_URL=/bootstrap/localwip" -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-src f855e50fb65e serve-review-site
```

There are a few more convenience commands to use with `docker run` in addition to `serve-review-site` and `expose-review-site`.
- `build-review-site` rebuilds the files without providing a live view of the changes.
- `build-cdn-assets` rebuilds the files with the options suitable for uploading them to a CDN.
- `lint` runs code quality (linting) checks on the newly built documentation site.

However for maximum flexibility,the easiest option is to run a full interactive shell within the container, specifying just `/bin/bash` (this will not only have access to all the convenience shell commands, but all of the npm scripts as well).

The examples here assume you have access to a POSIX-compatible shell, like the ones built in to Linux and MacOS, or included as part of Git for Windows, but if this is inconvenient for you and you're happy running command-line Docker commands in some other way, the Docker-specific parts should still work if you simply copy them out of the examples or scripts and make the small changes necessary for them to work the way you expect.

## Traditional Twitter Bootstrap Tooling Setup

Twitter Bootstrap provides a configuration file for called `_config.yml` for the static site builing software (Jekyll), but Arizona Bootstrap omits this, providing instead a template that must have various placeholders filled in to produce the usable version of this file. The script `scripts/create-jekyll-config` automates this process, and can pull some settings like the current version number directly from the `package.json` file, but depends on the `jq` JSON parsing utility to do this. The environment variables that can modify its behavior are
- `AZ_SHORT_VERSION` Short (generally two-digit) documentation version
- `AZ_SITE_BASE_URL` Pefix to add after the host to all URLs served locally
- `AZ_SITE_HOST` Name or IP address at which to serve the documentation site
- `AZ_VERSION` Full current Arizona Bootstrap version number

{{< ourname >}} uses [npm scripts](https://docs.npmjs.com/misc/scripts) for its build system. Our [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json) includes convenient methods for working with the framework, including compiling code, running tests, and more.

To use our build system and run our documentation locally, you'll need a copy of {{< ourname >}}'s source files and Node. Follow these steps and you should be ready to rock:

1. [Download and install Node.js](https://nodejs.org/en/download/), which we use to manage our dependencies.
2. Navigate to the root `/arizona-bootstrap` directory and run `npm install` to install our local dependencies listed in [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json).
3. [Install Ruby][install-ruby], install [Bundler][gembundler] with `gem install bundler`, and finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.
  - **Windows users:** Read [this guide](https://jekyllrb.com/docs/windows/) to get Jekyll up and running without problems.

When completed, you'll be able to run the various commands provided from the command line.

[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[gembundler]: https://bundler.io/

## Using npm Scripts

Our [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json) includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `npm run dist` | `npm run dist` creates the `/dist/` directory with compiled files. **Uses [Sass](https://sass-lang.com/), [Autoprefixer][autoprefixer], and and [terser](https://github.com/terser-js/terser).** |
| `npm test` | Same as `npm run dist` plus it runs tests locally |
| `npm run docs` | Builds and lints CSS and JavaScript for docs. You can then run the documentation locally via `npm run docs-serve`. |

Run `npm run` to see all the npm scripts.

## Autoprefixer

{{< ourname >}} uses [Autoprefixer][autoprefixer] (included in our build process) to automatically add vendor prefixes to some CSS properties at build time. Doing so saves us time and code by allowing us to write key parts of our CSS a single time while eliminating the need for vendor mixins like those found in v3.

We maintain the list of browsers supported through Autoprefixer in a separate file within our GitHub repository. See [.browserslistrc]({{ site.repo }}/raw/v{{ site.current_version }}/.browserslistrc) for details.

## Local Documentation

Running our documentation locally requires the use of Jekyll, a decently flexible static site generator that provides us: basic includes, Markdown-based files, templates, and more. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install Jekyll (the site builder) and other Ruby dependencies with `bundle install`.
2. From the root `/arizona-bootstrap` directory, run `npm run docs-serve` in the command line.
3. Open `http://localhost:9001` in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](https://jekyllrb.com/docs/).

## Troubleshooting

Should you encounter problems with installing dependencies, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

[autoprefixer]: https://github.com/postcss/autoprefixer

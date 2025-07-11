---
layout: docs
title: Contribute
description: Help develop Arizona Bootstrap with our documentation build scripts and tests.
group: getting-started
toc: true
aliases: "/docs/5.0/getting-started/build-tools/"
added:
  show_badge: false
  version: "5.0"
---

## Ways to change and build Arizona Bootstrap

If you are one of the developers who can make changes to the main [Arizona Bootstrap repository]({{< param "repo" >}}), the built-in continuous integration feature called GitHub Actions takes care of building a new version including your suggested changes and presenting it on a generally visible review web site. See the [CONTRIBUTING]({{< param "repo" >}}/blob/main/CONTRIBUTING.md) document for more details about how to do this. If you're working from a fork of the main Arizona Bootstrap repository elsewhere on GitHub, the GitHub Actions automated builds should still work, but will require extensive initial setup on your part, and in particular you will have to establish your own arrangements for hosting the review sites, since the main repository is using AWS with some very specific access arrangements.

Docker simplifies building Arizona Bootstrap locally, either in advance of changing the main repository, or if you want some independent customizations, and makes it easy to view the changes in a web browser through a local link.

If you are unable to use Docker in your local development environment, or are already comfortable with the suggestions that upstream Bootstrap makes for a local tooling setup, you can still follow these, but Arizona Bootstrap makes one or two minor changes that will require your attention first.

## Docker for local development

A custom local Docker image provides the complete development environment. Running our documentation locally requires the use of Hugo, which gets installed via the [hugo-bin](https://www.npmjs.com/package/hugo-bin) npm package. Learn more about using Hugo by reading its [documentation](https://gohugo.io/documentation/).

### Building the Docker image

You can build the image from a shell command line after changing to the directory that includes the `Dockerfile` by running

```sh
scripts/build-container.sh
```
<p></p>

The script tries to discover if you have already built an image using the current versions of several important configuration files, and doesn't try to re-build this if it already exists.

The initial build will be relatively slow, and may require reasonably fast Internet access. If you see errors that complain about failing to download various resources, and these errors aren't consistent from one build attempt to the next, you may be suffering a connection speed problem.

The build environment uses a huge set of Node.js packages (under the control of the commonly used `npm` utility). Setting these packages up causes most of the delay, but ideally the image will provide you with Docker containers that start up quickly pre-configured with the build environment you need.

### Viewing the local documentation review site

If everything works, the script should spin up a review site showing the {{< ourname >}} documentation at a local URL. It should display something like:

```text
> hugo server --bind '0.0.0.0' --port 9001 --disableFastRender

Start building sites … 

                  │ EN  
──────────────────┼─────
 Pages            │ 164 
 Paginator pages  │   0 
 Non-page files   │  42 
 Static files     │ 160 
 Processed images │   0 
 Aliases          │  22 
 Cleaned          │   0 

Built in 13127 ms
Environment: "development"
Serving pages from disk
Web Server is available at http://localhost:9001/ (bind address 0.0.0.0) 
Press Ctrl+C to stop
```
<p></p>

To view this, just point a web browser at the URL it gives, here: `http://localhost:9001/`.

### Other Docker commands to help local development

If the image build succeeds, you can re-use it to run additional development steps within a Docker container. The build should finish by showing the image ID code, which you should note (copy) as the most convenient means of referring to the image, since the usual tagged name will be very long (it includes the full hex checksum hash of the configuration files). In the examples that follow, this code is `f855e50fb65e`, but you should substitute the ID from your own image build.

The following command duplicates what happens in the container-building script, but lets you see the additional details that you might want to modify. In a command-line shell, make sure you're in the top-level directory of your local working Arizona Bootstrap copy (the one containing the `Dockerfile`), then enter a command like

```sh
docker run -t -i --rm -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-source f855e50fb65e serve-review-site
```

- The `-t` and `-i` flags are the usual additions for a container that will be at least semi-interactive.
- `--rm` makes sure the container will not persist after it has stopped.
- A web server will be running on port 9001 inside the container, showing the newly built review site using the documentation; the `-p 9001:9001` specifies that this will be reachable on the same port outside the container as well (you can change the number if you run into port conflicts).
- `-v "$(pwd)":/arizona-bootstrap-source` sets up sharing of the current directory (`$(pwd)` is a shortcut notaton for this, but you can enter it some other way if necessary); inside the container this directory will appear as `/arizona-bootstrap-source`.
- `f855e50fb65e` is the image ID is in the case of the example, but as already noted you should substitute the ID from your own Docker image build for this.
- `serve-review-site` is the command that runs inside the container, building the static documentation web site based on your local version of Arizona Bootstrap and starting a little web server to make it visible.

If everything works, you should see the message telling you the static web site is available at a particular URL, something like `http://localhost:9001...` if you used the `-p 9001:9001` option with the `docker run` command, or choose whatever port you specified there if you modified this option.

You can specify a prefix to include in all the URLs of the static site by setting an environment variable within the container. For example to include the prefix `/bootstrap/localwip` the command would be

```sh
docker run -t -i --rm -e "AZ_SITE_BASE_URL=/bootstrap/localwip" -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-source f855e50fb65e serve-review-site
```

There are a few more convenience commands to use with `docker run` in addition to `serve-review-site`
- `expose-review-site` saves the built files of the documentation review site to the `_site` directory subtree.
- `build-review-site` rebuilds the files without providing a live view of the changes.
- `build-cdn-assets` rebuilds the files in the dist subdirectory with the options suitable for uploading them to a CDN.
- `lint` runs code quality (linting) checks on the newly built documentation site.

However for maximum flexibility,the easiest option is to run a full interactive shell within the container, specifying just `/bin/bash` (this will not only have access to all the convenience shell commands, but all of the npm scripts as well).

The examples here assume you have access to a POSIX-compatible shell, like the ones built in to Linux and MacOS, or included as part of Git for Windows, but if this is inconvenient for you and you're happy running command-line Docker commands in some other way, the Docker-specific parts should still work if you simply copy them out of the examples or scripts and make the small changes necessary for them to work the way you expect.

## Upstream Bootstrap tooling setup

Upstream Bootstrap provides a configuration file for called `config.yml` for the static site building software (Hugo), but Arizona Bootstrap omits this, providing instead a template that must have various placeholders filled in to produce the usable version of this file. The script `scripts/create-hugo-config` automates this process, and can pull some settings like the current version number directly from the `package.json` file, but depends on the `jq` JSON parsing utility to do this. The environment variables that can modify its behavior are
- `AZ_SHORT_VERSION` Short (generally two-digit) documentation version
- `AZ_SITE_BASE_URL` Prefix to add after the host to all URLs served locally
- `AZ_SITE_HOST` Name or IP address at which to serve the documentation site
- `AZ_VERSION` Full current Arizona Bootstrap version number

{{< ourname >}} uses [npm scripts](https://docs.npmjs.com/misc/scripts/) to build the documentation and compile source files. Our [package.json]({{< param repo >}}/blob/v{{< param current_version >}}/package.json) houses these scripts for compiling code, running tests, and more. These aren't intended for use outside our repository and documentation.

To use our build system and run our documentation locally, you'll need a copy of {{< ourname >}}'s source files and Node. Follow these steps and you should be ready to rock:

1. [Download and install Node.js](https://nodejs.org/en/download/), which we use to manage our dependencies.
2. Navigate to the root `/arizona-bootstrap` directory and run `npm install` to install our local dependencies listed in [package.json]({{< param "repo" >}}/blob/v{{< param "current_version" >}}/package.json).

## Using npm scripts

Our [package.json]({{< param repo >}}/blob/v{{< param current_version >}}/package.json) includes numerous tasks for developing the project. Run `npm run` to see all the npm scripts in your terminal. **Primary tasks include:**

{{< bs-table >}}
| Task | Description |
| --- | --- |
| `npm start` | Compiles CSS and JavaScript, builds the documentation, and starts a local server. |
| `npm run dist` | Creates the `dist/` directory with compiled files. Uses [Sass](https://sass-lang.com/), [Autoprefixer](https://github.com/postcss/autoprefixer), and [terser](https://github.com/terser/terser). |
| `npm test` | Runs tests locally after running `npm run dist` |
| `npm run docs-serve` | Builds and runs the documentation locally. |
{{< /bs-table >}}

## Autoprefixer

Bootstrap uses [Autoprefixer](https://github.com/postcss/autoprefixer) (included in our build process) to automatically add vendor prefixes to some CSS properties at build time. Doing so saves us time and code by allowing us to write key parts of our CSS a single time while eliminating the need for vendor mixins like those found in v3.

We maintain the list of browsers supported through Autoprefixer in a separate file within our GitHub repository. See [.browserslistrc]({{< param repo >}}/blob/v{{< param current_version >}}/.browserslistrc) for details.

## Troubleshooting

Should you encounter problems with installing dependencies, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

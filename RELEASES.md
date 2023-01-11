# Arizona Bootstrap Releases
This release policy ensures that developers know what to expect when they use
Arizona Bootstrap on their websites. Arizona Bootstrap has adopted
[semantic versioning](https://semver.org/) to allow site maintainers to keep
websites up to date with security updates and other critical improvements
without having to track the ongoing feature development of Arizona Bootstrap.

## Release Overview
Arizona Digital development proceeds in the `main` branch of the
[GitHub repository](https://github.com/az-digital/arizona-bootstrap) applying
bug fixes and adding new features. Although the repository contains other
branches, these are not intended for use elsewhere. Releases correspond to a Git
tag in the repository, and fully built CSS and JavaScript files in a CDN, where
they are available for immediate use or downloading. The CDN contains versions
of the assets from all releases, all prefixed by
`https://cdn.digital.arizona.edu/lib/arizona-bootstrap/`_releasenumber_
(ensuring that anything using a particular release from the CDN does not receive
unexpected changes). A
[documentation site](https://digital.arizona.edu/arizona-bootstrap/) tracks the
latest release of Arizona Bootstrap, but not previous versions. Security issues
and major bug fixes rarely affect the built assets for a particular release, so
there is no organized backporting workflow. The developer tooling used to build
those assets does receive frequent updates, but those initially modify only the
`main` branch in the repository. Development tools are derived from those that
Bootstrap uses, mainly based on NodeJS and the Hugo static site builder for
generating the documentation, and developers can use those in their own local
environments. Continuous Integration (CI) software can use the same tools, but
also make changes to the main Git repository and CDN; GitHub actions are the
primary CI mechanism, with a configuration that is specific to Arizona
Bootstrap.

## Interdependencies
Arizona Bootstrap is a customized version of
[Bootstrap](https://getbootstrap.com/), tracking the `v4-dev` branch that by
2022 is only seeing minor maintenance, not active development. However the
automated update and security monitoring on GitHub (_dependabot_) covers
development tools in Arizona Bootstrap, suggesting changes that generally
correspond to the current development version of Bootstrap. Arizona Bootstrap
releases are not synchronizied with upstream Bootstrap releases (and are
generally more frequent).

The University of Arizona Drupal distribution,
[AZ Quickstart](https://quickstart.arizona.edu/), cannot work without Arizona
Bootstrap (and has been the most significant influence in determining the
features it provides). When an addition to AZ Quickstart requires a new Arizona
Bootstrap feature, that will generally prompt a new Arizona Bootstrap release.
Automation on GitHub generates a pull request in the
[AZ Quickstart repository](https://github.com/az-digital/az_quickstart) as part
of an Arizona Bootstrap release (proposing a bump to the version number AZ
Quickstart references), but still requires manual approval and merging for this.

## Semantic Versioning Numbers

### Patch Releases (x.y.Z)
Patch releases will be released as necessary and limited to:
- Arizona Bootstrap build artifacts
  - Bug fixes
  - Accessibility improvements
  - Performance improvements
  - Security improvements
  - Code changes to satisfy automated linting checks
  - Documentation clarifications
  - Critical institutional link changes
  - Critical brand changes
- Development dependencies
  - Version number bumps that _dependabot_ suggests
  - Changes matching minor upstream Bootstrap maintenance
  - Minor improvements to local development and CI environments

### Minor Releases (x.Y.z)
The following types of changes are allowed for minor releases in addition to those allowed for patch releases.
- Arizona Bootstrap build artifacts
  - New features
  - Changes to behavior that existing sites might rely on
  - Changes that risk regressions
  - Non-critical institutional link changes
  - Non-critical brand changes
  - Risky or disruptive cleanups to comply with coding standards
  - Tracking significant upstream Bootstrap updates
- Development dependencies
  - Significant refactoring of the build environment
  - Major changes to CI configuration (such as GitHub actions)

### Major Releases (X.y.z)
Incompatible changes to the CSS and JavaScript (for example, moving to Bootstrap v5).

## Triggering a Patch Release
An Arizona Digital developer with appropriate access rights in the main Arizona
Bootstrap repository triggers a release by manually running the `Create Release`
GitHub Action (currently at
`https://github.com/az-digital/arizona-bootstrap/actions/workflows/release.yml`)
omitting the “v” prefix when specifying the version number, and can generate the
text to insert in the release notes with a command-line Git command of the form
```
git log v5.2.15..HEAD --pretty='format:- %s'
```

## Triggering a Patch Release for Version 2.x

Same as a patch release, but you must switch to the `2.x` branch when running the
action.

## Triggering a Minor Release

Same as a patch release, except you must change the minor verson number folder at:
- `/site/content/docs/5.x`
- `/site/static/docs/5.x`

Once the folder name has been changed, update the `version_short` config within package.json prior to making the release.

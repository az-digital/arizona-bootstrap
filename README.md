# Arizona Bootstrap

Build responsive, mobile-first projects on the web with the University of Arizona's theme for Bootstrap 4.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

A team of web-focused volunteers known as Arizona Digital meets weekly to build and test products like Arizona Bootstrap and Arizona Quickstart. Contributions are what keep Arizona Bootstrap moving and improving, and are in everyone's best interest.

[Explore Arizona Bootstrap Docs](https://digital.arizona.edu/arizona-bootstrap/)

## Contributing

Please refer to the [Contributing doc](./CONTRIBUTING.md).

## Arizona Bootstrap vs. UA Bootstrap

Arizona Bootstrap is built off of Bootstrap 4, and UA Bootstrap is built off of Bootstrap 3.

- [Learn about migrating from Bootstrap 3 to Bootstrap 4](https://digital.arizona.edu/arizona-bootstrap/docs/0.0/migration/)
- [Learn about backwards compatibility between UA Bootstrap and Arizona Bootstrap](https://digital.arizona.edu/arizona-bootstrap/docs/0.0/backwards-compatibility/)

## Testing Tools

<a href="https://www.browserstack.com/">
  <img src="https://live.browserstack.com/images/opensource/browserstack-logo.svg" alt="BrowserStack" width="192" height="42">
</a>

This project is tested with BrowserStack.

## Content Delivery Network (CDN)
Arizona Digital maintains a CDN for easy inclusion of Arizona Bootstrap assets
in your project.

### How the CDN is updated

The CDN is updated automatically during the following scenarios:

- A pull request is merged into the `main` branch of this repository
- A pull request is merged into the `2.x` branch of this repository
- A new release is created on the `main` or `2.x` branch.

The URL structure for the CDN is as follows:
```
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/<version bucket>/<asset type>/<filename>
```

#### The `<version bucket>` parameter can be any of the following
- `main` Deprecated as of `2.0.20`
- `2.x` Development version of Arizona Bootstrap 2
- `5.x` Development version of Arizona Bootstrap 5
- A release version number, Example: `2.0.19` See [the release
page](https://github.com/az-digital/arizona-bootstrap/releases) for a full list
of possible options. Remove the `v` from the version number.
- `latest-2.x` The latest tagged version of Arizona Bootstrap 2
- `latest-5.x` The latest tagged version of Arizona Bootstrap 5
- `latest` Deprecated as of `2.0.20`


**NOTE: `main` is deprecated and will no longer be updated as of `v2.0.20` - to
use the latest development version of the `2.x` branch use `2.x`**

**NOTE: `latest` is deprecated and will no longer be updated as of `v2.0.20` -
to use the latest tagged version of the `2.x` branch use `latest-2.x`**

### Release is tagged on the `main` branch
All tagged releases on the `main` branch will:
- Update `latest-5.x` bucket
- Create a new bucket for the version that was released. Example: `5.0.0`

### Release is tagged on the `2.x` branch
All tagged releases on the `2.x` branch will:
- Update `latest-2.x` bucket
- Create a new bucket for the version that was released. Example: `2.0.20`

### Pull request is merged into `main` branch
All code merged into the `main` branch will update `5.x` bucket.

### Pull request is merged into `2.x` branch
All code merged into the `2.x` branch will update the `2.x` bucket.

#### The `<asset type>` parameter can be any of the following
- `css`
- `js`

#### The `<filename>` parameter is the specific file you are attempting to use.
**Examples**:
- `arizona-bootstrap.min.css`
- `arizona-bootstrap.css`

See the [docs](https://digital.arizona.edu/arizona-bootstrap) for more
information about the recommended version for your projects.

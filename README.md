# Arizona Bootstrap

Build responsive, mobile-first projects on the web with the University of Arizona's customized Bootstrap.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.

A team of web-focused volunteers known as Arizona Digital meets weekly to build and test products like Arizona Bootstrap and Arizona Quickstart. Contributions are what keep Arizona Bootstrap moving and improving, and are in everyone's best interest.

## Contributing

Please refer to the [Contributing doc](./CONTRIBUTING.md).

## Versions, Documentation and Review

Arizona Bootstrap is a customization of the [Bootstrap](https://getbootstrap.com/) frontend toolkit,
organized as two different versions.

### Arizona Bootstrap 5

The version under active development is based on [upstream Bootstrap v5](https://github.com/twbs/bootstrap/tree/main)

- The code is on the [main](https://github.com/az-digital/arizona-bootstrap/tree/main) branch in the repository.
- A review site showing the latest build (generally more recent than any release) is at <https://review.digital.arizona.edu/arizona-bootstrap/main/>

### Arizona Bootstrap 2

A version of Arizona Bootstrap supporting many currently active uses is based on [upstream Bootstrap v4](https://github.com/twbs/bootstrap/tree/v4-dev) (the numbering of Arizona Bootstrap versions changed, so this is version 2, and there is no Arizona Bootstrap 4)

- The code is on the [2.x](https://github.com/az-digital/arizona-bootstrap/tree/2.x) branch in the repository.
- A review site with fully functional documentation is at <https://review.digital.arizona.edu/arizona-bootstrap/2.x/>

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
All code merged into the `main` branch will update the `5.x` bucket.

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

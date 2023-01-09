# Arizona Bootstrap

Build responsive, mobile-first projects on the web with the University of Arizona's theme for Bootstrap 5.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

A team of web-focused volunteers known as Arizona Digital meets weekly to build and test products like Arizona Bootstrap and Arizona Quickstart. Contributions are what keep Arizona Bootstrap moving and improving, and are in everyone's best interest.

[Explore Arizona Bootstrap Docs](https://digital.arizona.edu/arizona-bootstrap/)

## Content Delivery Network (CDN)
Arizona Digital maintains a CDN for easy inclusion of Arizona Bootstrap assets
in your project.

### How the CDN is updated

The CDN is updated automatically during the following scenarios:

- A pull request is merged into the `main` branch of this repository
- A pull request is merged into the `2.x` branch of this repository
- A new release is created on the `main` or `2.x` branch.

**NOTE: https://cdn.digital.arizona.edu/lib/arizona-bootstrap/main is
deprecated and will no longer be updated as of `v2.0.20` - to use the
latest development version of the `2.x` branch use
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/2.x**

**NOTE: https://cdn.digital.arizona.edu/lib/arizona-bootstrap/latest is
deprecated and will no longer be updated as of `v2.0.20` - to use the
latest stable version of the `2.x` branch use
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/latest-2x**

### Merges into `main` branch
All code merged into the `main` branch will update
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/5.x

### Merges into `2.x` branch
All code merged into the `2.x` branch will update
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/2.x

### Releases on the `main` branch
All releases on the `main` branch will update
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/latest-5x
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/<version>

### Releases on the `2.x` branch
All releases on the `2.x` branch will update
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/latest-2x
https://cdn.digital.arizona.edu/lib/arizona-bootstrap/<version>

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
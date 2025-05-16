---
layout: docs
title: Navbar Off Canvas
description: Documentation and examples for Arizona Bootstrap's main menu navigation component
group: components
toc: true
---

### Off-Canvas Mobile Nav

Adding the `.navbar-offcanvas` class to your `<nav>` will incorporate an off-canvas experience for mobile devices.

{{< example >}}
<div class="d-lg-none d-flex justify-content-end">
  <button data-bs-toggle="offcanvasmenu" type="button" data-bs-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red btn-menu">
    <span class="material-icons-round">search</span>
    <span>Search</span>
  </button>
  <button data-bs-toggle="offcanvasmenu" type="button" data-bs-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red btn-menu">
    <span class="material-icons-round">menu</span>
    <span>Menu</span>
  </button>
</div>
<nav class="navbar-offcanvas" id="navbarOffcanvasDemo">
  <div class="navbar-offcanvas-header">
    <div class="bg-chili d-flex justify-content-between align-items-center">
      <a href="/" class="btn btn-menu-offcanvas-nav btn-red d-flex flex-column justify-content-center navbar-offcanvas-home">
        <span class="material-icons-round">home</span>
        <span>Home</span>
      </a>
      <button id="navbarOffcanvasDemoClose" data-bs-toggle="offcanvasmenu" data-bs-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-menu-offcanvas-nav btn-red d-flex flex-column justify-content-center navbar-offcanvas-home">
        <span class="material-icons-round mx-auto">close</span>
        <span class="mx-auto">Close</span>
      </button>
    </div>
    <form class="navbar-offcanvas-search bg-white">
      <div class="input-group">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-search" type="submit"><span class="material-icons-round">search</span></button>
        </div>
      </div>
    </form>
  </div>
  <ul class="navbar-nav flex-lg-row">
    <li class="nav-item nav-item-parent active">
      <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item nav-item-parent">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <button class="nav-link dropdown-toggle" id="navbarDropdown4" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
        Admissions
      </button>
      <div class="dropdown-menu" role="menu" aria-labelledby="navbarDropdown4">
        <a class="dropdown-item" href="#">Admissions Overview</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <button class="nav-link dropdown-toggle" id="navbarDropdown5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
        Dropdown
      </button>
      <div class="dropdown-menu" role="menu" aria-labelledby="navbarDropdown5">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <li class="nav-item nav-item-parent">
      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    </li>
  </ul>
</nav>
{{< /example >}}

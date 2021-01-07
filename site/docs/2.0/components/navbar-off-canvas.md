---
layout: docs
title: Navbar Off Canvas
description: Documentation and examples for Arizona Bootstrap's main menu navigation component
group: components
toc: true
---

### Off-Canvas Mobile Nav

Adding the `.navbar-offcanvas` class to your `<nav>` will incorporate an off-canvas experience for mobile devices.

{% capture example %}
<div class="d-lg-none d-flex justify-content-end">
<<<<<<< HEAD
  <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red btn-menu">
    <span class="material-icons-sharp">search</span>
    <span>Search</span>
  </button>
  <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red btn-menu">
    <span class="material-icons-sharp">menu</span>
    <span>Menu</span>
=======
  <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red">
    <span class="material-icons-sharp"> menu </span>
>>>>>>> parent of 3dfdab4... Update button styles when menu is closed
  </button>
</div>
<nav class="navbar-offcanvas" id="navbarOffcanvasDemo">
  <div class="navbar-offcanvas-header">
    <div class="bg-chili d-flex justify-content-between align-items-center">
      <button href="/" class="navbar-offcanvas-home btn btn-red btn-menu">
        <span class="material-icons-sharp">home</span>
        <span>Home</span>
      </button>
      <button id="navbarOffcanvasDemoClose" data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red btn-menu">
        <span class="material-icons-sharp">close</span>
        <span>Close</span>
      </button>
    </div>
    <form class="navbar-offcanvas-search bg-white">
      <div class="input-group">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn" type="submit"><span class="material-icons-sharp">search</span></button>
        </div>
      </div>
    </form>
  </div>
  <ul class="navbar-nav flex-lg-row">
    <li class="nav-item nav-item-parent active">
      <button class="nav-link" href="#">Home <span class="sr-only">(current)</span></button>
    </li>
    <li class="nav-item nav-item-parent">
      <button class="nav-link" href="#">Link</button>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <button class="nav-link dropdown-toggle" id="navbarDropdown4" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
        Admissions
      </button>
      <div class="dropdown-menu" role="menu" aria-labelledby="navbarDropdown4">
        <a class="dropdown-item" href="https://www.arizona.edu/admissions-overview">Admissions Overview</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <button class="nav-link dropdown-toggle" id="navbarDropdown5" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
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
      <button class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</button>
    </li>
  </ul>
</nav>
{% endcapture %}
{% include example.html content=example %}

---
layout: docs
title: Navbar Off-Canvas
description: Documentation and examples for Arizona Bootstrap's main menu navigation component
group: components
toc: true
---

### Off-Canvas Mobile Nav

Adding the `.navbar-off-canvas` class to your `<nav>` will incorporate an off-canvas experience for mobile devices.

{% capture example %}
<div class="d-lg-none d-flex justify-content-end justify-content-lg-start">
  <button data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="btn btn-red">
    <span class="material-icons"> menu </span>
  </button>
</div>
<nav class="navbar-off-canvas" id="navbarOffcanvasDemo">
  <div class="navbar-offcanvas-header">
    <div class="bg-chili py-1 px-3 d-flex justify-content-between align-items-center">
      <a href="/" class="navbar-offcanvas-home d-flex flex-column align-items-center btn btn-red">
        <span class="material-icons">home</span>
        <span>HOME</span>
      </a>
      <button id="navbarOffcanvasDemoClose" data-toggle="offcanvas" type="button" data-target="#navbarOffcanvasDemo" aria-controls="navbarOffcanvasDemo" class="d-flex flex-column align-items-center btn btn-default">
        <span class="material-icons">close</span>
        <span>CLOSE</span>
      </button>
    </div>
    <form class="navbar-offcanvas-search bg-white pr-3">
      <div class="input-group">
        <input class="form-control p-3" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn" type="submit"><span class="material-icons">search</span></button>
        </div>
      </div>
    </form>
  </div>
  <ul class="navbar-nav flex-lg-row">
    <li class="nav-item nav-item-parent active">
      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </a>
      <div class="dropdown-menu" role="menu" aria-labelledby="navbarDropdown4">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <li class="nav-item nav-item-parent dropdown keep-open">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </a>
      <div class="dropdown-menu" role="menu" aria-labelledby="navbarDropdown5">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    </li>
  </ul>
</nav>
{% endcapture %}
{% include example.html content=example %}

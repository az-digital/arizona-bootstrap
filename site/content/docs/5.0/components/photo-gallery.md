---
layout: docs
title: Photo Gallery
description: The photo gallery provides a convenient way to display a collection of images.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---

## About

The custom Photo Gallery component uses Bootstrap carousel and modal components to allow users to browse a collection of images. The Photo Gallery has two display options: Grid and Slider.

## Grid

With the Grid display, all images in the gallery are presented in a grid layout. Each image can be clicked on to open a modal and view a large version of the image. The carousel in the modal allows users to scroll through the entire gallery.

{{< example >}}
<div class="bd-example">
  <div class="container az-gallery-container">
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 px-min pb-min pb-lg-0" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="0">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}} 1x">
            <img class="mw-100" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 px-min pb-min pb-lg-0" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="1">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2-thumb.jpg` >}} 1x">
            <img class="mw-100" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" alt="A hand holding a little mirror">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 px-min pb-min pb-lg-0" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="2">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3-thumb.jpg` >}} 1x">
            <img class="mw-100" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" alt="University graduate on stage wearing cap and gown">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 px-min pb-min pb-lg-0" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="3">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4-thumb.jpg` >}} 1x">
            <img class="mw-100" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" alt="Ceiling tiles">
          </picture>
        </a>
      </div>
    </div>
    <!-- Modal -->
    <div id="gridGalleryModal" class="modal fade az-gallery-modal" tabindex="-1" role="dialog" aria-label="Photo Gallery Modal" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content text-bg-transparent-black">
          <div class="modal-header border-0">
            <button type="button" data-bs-theme="dark" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="gridGallery" class="carousel slide az-gallery">
              <div class="carousel-inner h-100">
                <div class="carousel-item az-gallery-item h-100 active">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <div class="h-100">
                        <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item az-gallery-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <div class="h-100">
                        <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="A hand holding a little mirror">
                      </div>
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <h2 class="text-sky mt-0 h5">Second slide label</h2>
                      <p class="mb-0">A hand holding a little mirror</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item az-gallery-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <div class="h-100">
                        <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University graduate on stage wearing cap and gown">
                      </div>
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <h2 class="text-sky mt-0 h5">Third slide label</h2>
                      <p class="mb-0">University graduate on stage<br>wearing cap and gown</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item az-gallery-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <div class="h-100">
                        <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
                      </div>
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <h2 class="text-sky mt-0 h5">Fourth slide label</h2>
                      <p class="mb-0">Ceiling tiles<br>This caption is multiple lines.<br>The image size should adjust automatically.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#gridGallery" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#gridGallery" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{{< /example >}}

## Slider

With the Slider display, a carousel allows users to scroll through the gallery of images. In the example below, note that the inner border with rounded corners is part of the component styling.

{{< example >}}
<div class="az-gallery-container border p-2">
  <div class="ratio ratio-4x3">
    <div id="sliderGallery" class="carousel slide az-gallery">
      <div class="carousel-inner h-100">
        <div class="carousel-item az-gallery-item h-100 active">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <div class="h-100">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item az-gallery-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <div class="h-100">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="A hand holding a little mirror">
              </div>
            </div>
            <div class="carousel-caption az-gallery-caption">
              <h3 class="h5 mt-0">Second slide label</h3>
              <p class="mb-0">A hand holding a little mirror</p>
            </div>
          </div>
        </div>
        <div class="carousel-item az-gallery-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <div class="h-100">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University graduate on stage wearing cap and gown">
              </div>
            </div>
            <div class="carousel-caption az-gallery-caption">
              <h3 class="h5 mt-0">Third slide label</h3>
              <p class="mb-0">University graduate on stage<br>wearing cap and gown</p>
            </div>
          </div>
        </div>
        <div class="carousel-item az-gallery-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <div class="h-100">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
              </div>
            </div>
            <div class="carousel-caption az-gallery-caption">
              <h3 class="h5 mt-0">Fourth slide label</h3>
              <p class="mb-0">Ceiling tiles<br>This caption is multiple lines.<br>The image size should adjust automatically.</p>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#sliderGallery" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#sliderGallery" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>
{{< /example >}}

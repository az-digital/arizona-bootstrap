---
layout: docs
title: Photo Gallery
description: The photo gallery provides a convenient way to display a collection of images.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---

## About

The custom Photo Gallery component uses Bootstrap [carousel]({{< docsref "/components/carousel" >}}) and [modal]({{< docsref "/components/modal" >}}) components to allow users to browse a collection of images. The Photo Gallery has two display options: Grid and Slider.

{{< callout warning >}}
**Heads up!** The Photo Gallery CSS and markup has changed due to breaking changes with carousels and modals in Bootstrap 5, along with styling updates for Arizona Bootstrap 5. Implementations of the Photo Gallery should be updated to use the new markup as shown in the examples below.
{{< /callout >}}

## Grid

With the Grid display, all images in the gallery are presented in a grid layout. Each image can be clicked on to open a modal and view a large version of the full image. The carousel in the modal allows users to scroll through the entire gallery. Images are displayed without cropping and captions will not cover any part of the image, just like the <a href="#full-image-style">Slider Full Image Style</a> below.

{{< example >}}
<div class="bd-example">
  <div class="container az-gallery-container">
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="0">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="1">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" alt="A hand holding a little mirror">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="2">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" alt="University graduate on stage wearing cap and gown">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="3">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" alt="Ceiling tiles">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="4">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="University of Arizona Spring Fling">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="5">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" alt="A hand holding a little mirror">
          </picture>
        </a>
      </div>
      <div class="col-6 col-md-4 col-lg-3 p-min" data-bs-toggle="modal" data-bs-target="#gridGalleryModal">
        <a role="button" data-bs-target="#gridGallery" data-bs-slide-to="6">
          <picture class="card-img img-fluid">
            <source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3-thumb.jpg` >}} 1x">
            <img class="mw-100 rounded-0" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" alt="University graduate on stage wearing cap and gown">
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
            <div id="gridGallery" class="carousel slide az-gallery az-gallery-grid">
              <div class="carousel-inner h-100">
                <div class="carousel-item h-100 active">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="University of Arizona Spring Fling">
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="A hand holding a little mirror">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Second slide caption<br>A hand holding a little mirror</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="University graduate on stage wearing cap and gown">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Third slide caption<br>University graduate on stage<br>wearing cap and gown</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="Ceiling tiles">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Fourth slide caption<br>Ceiling tiles<br>With a larger caption, the image is resized<br>as needed to fill the remaining space.</p>
                      <cite class="small">Image credits can be included below the caption text.</cite>
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="University of Arizona Spring Fling">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Fifth slide caption<br>University of Arizona Spring Fling</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="A hand holding a little mirror">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Sixth slide caption<br>A hand holding a little mirror</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item h-100">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="carousel-image az-gallery-image">
                      <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain rounded-0" alt="University graduate on stage wearing cap and gown">
                    </div>
                    <div class="carousel-caption az-gallery-caption">
                      <p class="mb-0">Seventh slide caption<br>University graduate on stage wearing cap and gown</p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#gridGallery" data-bs-slide="prev">
                <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_back_ios</span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#gridGallery" data-bs-slide="next">
                <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_forward_ios</span>
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

With the Slider display, a carousel allows users to scroll through the gallery of images.

### Full Image Style

Slider Photo Galleries using the "full image style" make use of the [object fit utilities]({{< docsref "/utilities/object-fit" >}}) to ensure that each image is shown in its entirety, without cropping or being covered by any caption text.

{{< example >}}
<div class="az-gallery-container">
  <div class="ratio ratio-4x3">
    <div id="sliderGallery" class="carousel slide az-gallery az-gallery-slider-full">
      <div class="carousel-inner h-100">
        <div class="carousel-item h-100 active">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="A hand holding a little mirror">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Second slide caption<br>A hand holding a little mirror</p>
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University graduate on stage wearing cap and gown">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Third slide caption<br>University graduate on stage<br>wearing cap and gown</p>
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Fourth slide caption<br>Ceiling tiles<br>With a larger caption, the image is resized<br>as needed to fill the remaining space.</p>
              <cite class="small">Image credits can be included below the caption text.</cite>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#sliderGallery" data-bs-slide="prev">
        <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_back_ios</span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#sliderGallery" data-bs-slide="next">
        <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_forward_ios</span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>
{{< /example >}}

The aspect ratio of the Slider Photo Gallery can be changed by simply setting a different `ratio-*` class (see the [ratio helper classes]({{< docsref "/helpers/ratio" >}})). The photo gallery example above uses the `ratio-4x3` class. The photo gallery below uses the `ratio-16x9` class instead.

<div class="bd-example-snippet bd-example">
  <div class="az-gallery-container">
    <div class="ratio ratio-16x9">
      <div id="sliderGallery16x9" class="carousel slide az-gallery az-gallery-slider-full">
        <div class="carousel-inner h-100">
          <div class="carousel-item h-100 active">
            <div class="d-flex flex-column h-100 justify-content-center">
              <div class="carousel-image az-gallery-image">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
              </div>
            </div>
          </div>
          <div class="carousel-item h-100">
            <div class="d-flex flex-column h-100 justify-content-center">
              <div class="carousel-image az-gallery-image">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="A hand holding a little mirror">
              </div>
              <div class="carousel-caption az-gallery-caption">
                <p class="mb-0">Second slide caption<br>A hand holding a little mirror</p>
              </div>
            </div>
          </div>
          <div class="carousel-item h-100">
            <div class="d-flex flex-column h-100 justify-content-center">
              <div class="carousel-image az-gallery-image">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University graduate on stage wearing cap and gown">
              </div>
              <div class="carousel-caption az-gallery-caption">
                <p class="mb-0">Third slide caption<br>University graduate on stage<br>wearing cap and gown</p>
              </div>
            </div>
          </div>
          <div class="carousel-item h-100">
            <div class="d-flex flex-column h-100 justify-content-center">
              <div class="carousel-image az-gallery-image">
                <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-contain" alt="University of Arizona Spring Fling">
              </div>
              <div class="carousel-caption az-gallery-caption">
                <p class="mb-0">Fourth slide caption<br>Ceiling tiles<br>With a larger caption, the image is resized<br>as needed to fill the remaining space.</p>
                <cite class="small">Image credits can be included below the caption text.</cite>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#sliderGallery16x9" data-bs-slide="prev">
          <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_back_ios</span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#sliderGallery16x9" data-bs-slide="next">
          <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_forward_ios</span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</div>

### Crop Image Style

As an alternative Slider style, the "crop image style" uses the `object-fit-cover` class to have the images fill the gallery container, with cropping as needed either horizontally or vertically. This style also allows caption text to overlay the image.

{{< example >}}
<div class="az-gallery-container">
  <div class="ratio ratio-4x3">
    <div id="sliderGalleryCrop" class="carousel slide az-gallery az-gallery-slider-crop">
      <div class="carousel-inner h-100 rounded">
        <div class="carousel-item h-100 active">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="h-100 w-100 object-fit-cover" alt="University of Arizona Spring Fling">
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="h-100 w-100 object-fit-cover" alt="A hand holding a little mirror">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Second slide caption<br>A hand holding a little mirror</p>
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="h-100 w-100 object-fit-cover" alt="University graduate on stage wearing cap and gown">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Third slide caption<br>University graduate on stage<br>wearing cap and gown</p>
            </div>
          </div>
        </div>
        <div class="carousel-item h-100">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="carousel-image az-gallery-image">
              <img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="h-100 w-100 object-fit-cover" alt="University of Arizona Spring Fling">
            </div>
            <div class="carousel-caption az-gallery-caption">
              <p class="mb-0">Fourth slide caption<br>Ceiling tiles<br>With the Crop Image Style, the caption<br>covers the bottom of the image.</p>
              <cite class="small">Image credits can be included below the caption text.</cite>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#sliderGalleryCrop" data-bs-slide="prev">
        <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_back_ios</span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#sliderGalleryCrop" data-bs-slide="next">
        <span class="material-symbols-rounded display-5" aria-hidden="true">arrow_forward_ios</span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>
{{< /example >}}

---
layout: docs
title: Photo Gallery
description: Bootstrap's photo gallery provides a convenient way to display a collection of images.<br><span class="badge badge-az-custom mt-3">Custom Arizona Bootstrap Component</span>
group: components
toc: true
---

## About

The Photo Gallery component displays a collection of images in a grid layout. Individual images can be clicked on to view a larger version of that image. Once an image is clicked, the entire gallery opens in a modal slideshow, where users can scroll through the images.

## Example

<div class="bd-example">
	<div class="container">
		<div class="row">
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="0">
		            <picture class="card-img img-responsive">
		             	<source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1-thumb.jpg` >}} 1x">
		              	<img class="photo-gallery-grid-img" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" alt="A hand holding a little mirror" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="1">
		            <picture class="card-img img-responsive">
		             	<source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2-thumb.jpg` >}} 1x">
		              	<img class="photo-gallery-grid-img" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" alt="University of Arizona Spring Fling" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="2">
		            <picture class="card-img img-responsive">
		             	<source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3-thumb.jpg` >}} 1x">
		              	<img class="photo-gallery-grid-img" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" alt="University graduate on stage wearing cap and gown" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="3">
		            <picture class="card-img img-responsive">
		             	<source srcset="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4-thumb.jpg` >}} 1x">
		              	<img class="photo-gallery-grid-img" src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" alt="Ceiling tiles" title="">
		        	</picture>
		        </a>
			</div>
		</div>
		<!-- Modal -->
		<div id="myGalleryModal" class="modal bg-transparent-black az-gallery-modal" tabindex="-1" role="dialog">
			<div id="myGallery" class="carousel az-gallery slide" data-ride="carousel" data-interval="false">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		         	<span aria-hidden="true">&times;</span>
		        </button>
				<div class="carousel-inner az-gallery-inner">
					<div class="carousel-item az-gallery-item active">
						<div class="carousel-image">
							<img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-1.jpg` >}}" class="d-block az-gallery-img" alt="A hand holding a little mirror">
						</div>
						<div class="carousel-caption az-gallery-caption d-block">
				        	<h5 class="text-sky">First slide label</h5>
				        	<p>A hand holding a little mirror</p>
				        </div>
					</div>
					<div class="carousel-item az-gallery-item">
						<div class="carousel-image">
							<img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-2.jpg` >}}" class="d-block az-gallery-img" alt="University of Arizona Spring Fling">
						</div>
						<div class="carousel-caption az-gallery-caption d-block">
				        	<h5 class="text-sky">Second slide label</h5>
				        	<p>University of Arizona Spring Fling</p>
				        </div>
					</div>
					<div class="carousel-item az-gallery-item">
						<div class="carousel-image">
							<img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-3.jpg` >}}" class="d-block az-gallery-img" alt="University graduate on stage wearing cap and gown">
						</div>
						<div class="carousel-caption az-gallery-caption d-block">
				        	<h5 class="text-sky">Third slide label</h5>
				        	<p>University graduate on stage wearing cap and gown</p>
				        </div>
					</div>
					<div class="carousel-item az-gallery-item">
						<div class="carousel-image">
							<img src="{{< docsrefazold `/assets/img/photo-gallery-demo/gallery-img-4.jpg` >}}" class="d-block az-gallery-img" alt="Ceiling tiles">
						</div>
						<div class="carousel-caption az-gallery-caption d-block">
				        	<h5 class="text-sky">Fourth slide label</h5>
				        	<p>Ceiling tiles</p>
				        </div>
					</div>
				</div>
				<a class="carousel-control-prev" href="#myGallery" role="button" data-slide="prev">
				    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#myGallery" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				</a>
			</div>
		</div>
	</div>
</div>




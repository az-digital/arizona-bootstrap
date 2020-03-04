---
layout: docs
title: Photo Gallery
description: Bootstrap's photo gallery provides a convenient way to display a colletion of images.
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
		             	<source srcset="../../dist/css/img/photo-gallery-demo/gallery-img-1-thumb.jpg 1x">
		              	<img class="photo-gallery-grid-img" src="../../dist/css/img/photo-gallery-demo/gallery-img-1.jpg" alt="A hand holding a little mirror" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="0">
		            <picture class="card-img img-responsive">
		             	<source srcset="../../dist/css/img/photo-gallery-demo/gallery-img-2-thumb.jpg 1x">
		              	<img class="photo-gallery-grid-img" src="../../dist/css/img/photo-gallery-demo/gallery-img-2.jpg" alt="University of Arizona Spring Fling" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="0">
		            <picture class="card-img img-responsive">
		             	<source srcset="../../dist/css/img/photo-gallery-demo/gallery-img-3-thumb.jpg 1x">
		              	<img class="photo-gallery-grid-img" src="../../dist/css/img/photo-gallery-demo/gallery-img-3.jpg" alt="University graduate on stage wearing cap and gown" title="">
		        	</picture>
		        </a>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 px-min" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="0">
		            <picture class="card-img img-responsive">
		             	<source srcset="../../dist/css/img/photo-gallery-demo/gallery-img-4-thumb.jpg 1x">
		              	<img class="photo-gallery-grid-img" src="../../dist/css/img/photo-gallery-demo/gallery-img-4.jpg" alt="Ceiling tiles" title="">
		        	</picture>
		        </a>
			</div>
		</div>
		<div id="myGalleryModal" class="modal bg-dark" tabindex="-1" role="dialog" aria-labelledby="myGalleryModalLabel">
			<div id="myGallery" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img src="../../dist/css/img/photo-gallery-demo/gallery-img-1.jpg" class="d-block w-100" alt="A hand holding a little mirror">
						<div class="carousel-caption d-none d-md-block">
				        	<h5 class="text-sky">First slide label</h5>
				        	<p>A hand holding a little mirror</p>
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




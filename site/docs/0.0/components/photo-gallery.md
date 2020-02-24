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
	</div>
</div>
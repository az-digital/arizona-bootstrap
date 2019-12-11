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
			<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" data-toggle="modal" data-target="#myGalleryModal">
				<a href="#myGallery" data-slide-to="0">
		            <picture class="card-img img-responsive">
		             	<source srcset="img/gallery-demo/gallery-img-1-sm.jpg 1x">
		              	<img src="img/gallery-demo/gallery-img-1.jpg" alt="AHand holding a little mirror" title="">
		        	</picture>
		        </a>
			</div>
		</div>
	</div>
</div>
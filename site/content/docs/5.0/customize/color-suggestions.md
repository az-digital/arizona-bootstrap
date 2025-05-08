---
layout: docs
title: Suggestions for `.text-warning`
description:
group: customize
toc: true
---
## The Problem:
The current warning color: <p class="fs-3 text text-warning">.text-warning (`#f19e1f`)</p> does not meet WCAG 2.0 AA standards when it's a text on white backgrounds. It yields a contrast ratio of <span class="fs-4">2.18:1</span> on white backgrounds, whereas a <span class="fs-4">4.5:1</span> minimum is needed.

### Some examples where it's being used:
https://2130a1-azs-quickstart.pantheonsite.io/site-admin/enterprise-integrations/trellis-events-import
<div class="callout border-warning"><h3 class="text-warning mt-0">Note</h3><p><span>Trellis Event Organizers must ensure that Events intended to be imported are Published, have a status of active on the Basic Info tab, and are set to "Broadcast to all Platforms" on the Promotion tab. If an event is imported without the proper settings, it will not display consistently on the webpage.</span></p></div>

https://2130a1-azs-quickstart.pantheonsite.io/site-admin/enterprise-integrations/digital-asset-library
<div class="callout border-warning">
<h3 class="text-warning mt-0">Quickstart Digital Asset Library is an Experimental Module</h3>

<p>There is no risk in using images downloaded from the Digital Asset Library, but we expect the process of logging in to access these digital assets to improve over time.</p>

<p>The <strong>Quickstart Digital Asset Library</strong> is not enabled in Quickstart by default. To enable the module, an Admin needs to go to&nbsp;<strong>Manage&nbsp;</strong>&gt;&nbsp;<strong>Extend&nbsp;</strong>and search for&nbsp;<strong>Quickstart Digital Asset Library</strong>&nbsp;and install it.</p>
</div>

## The Goal:
In my opinion, the goal of "warnings" are to draw attention to something that, if overlooked, will have negative consequences.

The current yellowish `warning` color helps this goal because:

1. It's not a brand, neutral, or complimentary color. If it was Arizona red or midnight or chili, it might become easily overlooked--since brand colors blend in with a page with other brand colors rather than stand out, as warnings should.

2. Even though it's not a brand color, it doesn't jar with them. If the warning color was bright purple imagine how bad that would look with both Arizona red and blue.

3. It's a vivid color. Warning colors should be vivid as opposed to dark or gray.
    - This is where the challenge is: we want both a vivid color AND a color that has a higher than 4.5:1 contrast ratio with white backgrounds.

### Here are two candidate colors:
<div class="col-md-4">
      <div class="p-3 mb-3 text-bg-mesa rounded-3">Mesa | HEX #A95C42</div>
</div>
Passes on white backgrounds: <strong><span class="text-leaf">4.89:1</span> Contrast Ratio against white</strong><br>
Fails on black backgrounds: <strong><span class="text-bloom">4.30:1</span> Contrast Ratio against black</strong>
<br><br>
<div>Since our current warning color is not an Arizona color anyway, here's something slightly brighter (at least to my eye). Let's call it Alt Mesa</div>
<div class="col-md-4">
      <div class="p-3 mb-3 rounded-3" style="color: white; background-color: #B85C00; ">Alt Mesa | HEX #B85C00</div>
</div>
Passes on white backgrounds: <strong><span class="text-leaf">4.60:1</span> Contrast Ratio against white</strong><br>
Passes on black backgrounds: <strong><span class="text-leaf">4.57:1</span> Contrast Ratio against black</strong>

The advantage of this color is that it is slightly brighter and it passes WCAG 2.0 AA on both white and black backgrounds (considering dark mode in the future).

#### Putting them right side by side:
<p class="fs-5 text">Current <code>#f19e1f</code></p>
<div class="callout border-warning">
<h3 class="text-warning mt-0">Quickstart Digital Asset Library is an Experimental Module</h3><p>There is no risk in using images downloaded from the Digital Asset Library, but we expect the process of logging in to access these digital assets to improve over time.</p>...</div>

<p class="fs-5 text">Mesa <code>#A95C42</code></p>
<div class="callout" style="border-color: #A95C42">
<h3 class="text-mesa mt-0">Quickstart Digital Asset Library is an Experimental Module</h3><p>There is no risk in using images downloaded from the Digital Asset Library, but we expect the process of logging in to access these digital assets to improve over time.</p>...</div>

<p class="fs-5 text">Alt Mesa <code>#B85C00</code></p>
<div class="callout" style="border-color: #B85C00">
<h3 class="mt-0" style="color: #B85C00">Quickstart Digital Asset Library is an Experimental Module</h3><p>There is no risk in using images downloaded from the Digital Asset Library, but we expect the process of logging in to access these digital assets to improve over time.</p>...</div>


## Three Different Options/Approaches:

Ordered from Option 1 (easiest and least impact) to Option 3 (most work and largest impact)

### Option 1: Change `warning` color only for text (`.text-warning`).
#### Pros:
- the easiest option.
#### Cons:
- `text-warning` would have a different color than `bg-warning` and `border-warning`. If we chose Alt Mesa, existing quickstart code would look like this:
<div class="callout border-warning">
<h3 class="mt-0" style="color: #B85C00">Quickstart Digital Asset Library is an Experimental Module</h3><p>There is no risk in using images downloaded from the Digital Asset Library, but we expect the process of logging in to access these digital assets to improve over time.</p>...</div>
In this example, the border has a different color than the warning text. Some people won't like this.


### Option 2: Change `warning` in `$theme-color` altogether.
#### Pros:
- streamlines `warning` color.
#### Cons:
- we need to think through the impact this broad change makes. If we changed `warning` color throughout to a version of mesa, for example, our `$theme-colors` would look like this:

<div class="row">
    <div class="col-md-4">
      <div class="p-3 mb-3 text-bg-success rounded-3">Success</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 text-bg-danger rounded-3">Danger</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 text-white rounded-3" style="background-color: #B85C00">Warning</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 text-bg-info rounded-3">Info</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 text-bg-light rounded-3">Light</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 text-bg-dark rounded-3">Dark</div>
    </div>
</div>

In this case `warning` and `danger` are almost the same color. In which case, we might want to change `danger` to `bloom` or something else? This would have further impact.

### Option 3: Change callout styling to have a background, like in upstream bootstrap:

<span class="fs-5">like this:</span>
<div>
{{< callout warning>}}
**Note:** Trellis Event Organizers must ensure that Events intended to be imported are Published, have a status of active on the Basic Info tab, and are set to "Broadcast to all Platforms" on the Promotion tab. If an event is imported without the proper settings, it will not display consistently on the webpage.
{{< /callout >}}
</div>
<span class="fs-5">as compared to what it looks like now:</span>

<div class="callout border-warning"><h3 class="text-warning mt-0">Note</h3><p><span>Trellis Event Organizers must ensure that Events intended to be imported are Published, have a status of active on the Basic Info tab, and are set to "Broadcast to all Platforms" on the Promotion tab. If an event is imported without the proper settings, it will not display consistently on the webpage.</span></p></div>

#### Pros:
If we did this, we can use whatever color we want, because we'll be controlling the text <strong>AND</strong> background color.

#### Cons:
More work. All sites who use callouts would be impacted to look pretty different.

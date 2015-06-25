# Sleeping Bear Heritage Trail Interactive Map

![SBHT map screenshot](https://github.com/abettermap/sleeping-bear-interactive-map/blob/development/src/assets/img/raster/sbht-screenshot.jpg "SBHT map screenshot")

## Background
>The paved, multi-use Sleeping Bear Heritage Trail is the only trail in
>Sleeping Bear Dunes that allows bicycles. The trail runs 17.5 miles from
>Empire past the Dune Climb, through the historic town of Glen Haven and winds
>through Glen Arbor, and finally ends up in the Port Oneida Rural Historic
>District.

***

This interactive map was a collaborative effort between [A Better Map](https://abettermap.com) and [Friends of Sleeping Bear Dunes](http://friendsofsleepingbear.org/). More information can be found at the [project landing page](http://friendsofsleepingbear.org/projects/sleeping-bear-heritage-trail/).

## The Map's Home
The actual map lives at [http://friendsofsleepingbear.org/sbht-i-map/](http://friendsofsleepingbear.org/sbht-i-map/). Feedback welcome, so please **[email me](mailto:jason@abettermap.com)**.

## Credits
This map would not be possible without a whole bunch of existing repos, tools, forums, blog posts, APIs, etc. Thanks to all the smarties out there who make this stuff!

### Framework

![AngularJS logo](http://upload.wikimedia.org/wikipedia/commons/c/ca/AngularJS_logo.svg "By AngularJS [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons at http://commons.wikimedia.org/wiki/File%3AAngularJS_logo.svg")

This is an [AngularJS](https://angularjs.org "AngularJS") party. Angular is Google's very powerful (and very challenging) open-source single-page application framework that can be used for super sweetness like custom directives and data binding.

Certain Angular modules were used as well, including:

*   [AngularUI Router](https://github.com/angular-ui/ui-router "AngularUI Router - Github") for the dynamic data-driven URLs
*   A [pagination directive](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination "Angular pagination directive") to switch between popup images
*   [Angular Animate](http://ajax.googleapis.com/ajax/libs/angularjs/1.4.0-rc.1/angular-animate.js "Angular Animate source code") for the fancy animations between certain views.
*   [ngDialog](https://github.com/likeastore/ngDialog "ngDialog source code - Github") for the temporary fullscreen disclaimer we used for awhile.

### The Map

![CartoDB logo](http://cartodb-libs.global.ssl.fastly.net/cartodb.com/static/logos_full_cartodb_light.svg "CartoDB")

The map itself is powered by:

*   [CartoDB](http://cartodb.com/ "CartoDB") on the back end (and a bit of their JS API for the front)
*   [LeafletJS](http://leafletjs.com "LeafletJS") on the front end (it's actually included in the CartoDB code)
*   [Leaflet GPS](https://github.com/stefanocudini/leaflet-gps "Leaflet GPS") to handle the geolocation icon and functionality
*   [Leaflet History](https://github.com/cscott530/leaflet-history "Leaflet History") to give you the "zoom to previous position" option in the map tools
*   [ESRI Leaflet tools](https://github.com/Esri/esri-leaflet "Leaflet ESRI Basemaps") for using ArcGIS services with Leaflet

### Styling

[Sass](http://sass-lang.com/) all the way.

### Workflow

These tools and applications made the workflow a lot smoother:

*   There are a lot of great text editors out there, but [Sublime Text 3](http://www.sublimetext.com/3) is my weapon of choice.
*   [Grunt](http://gruntjs.com/) simplifies just about every tedious web development task you can think of. From JavaScript minification to image optimization to Sass compiling, Grunt is a lifesaver!
*   There are too many Grunt plugins to list here, but [Browsersync](http://www.browsersync.io/ "Browsersync") deserves special mention. Basically it allows you to fire up a development website on your local network and access it from any device on that network. It even shows real-time updates and it syncs your scrolling movements on all devices. Creepy and incredibly useful at the same time!
*   [FileZilla](https://filezilla-project.org/) is an FTP client that allowed us to upload our code and images to the live server.

### Source Control

Keeping track of changes in the code is a crucial part of any project, and for this one I used [Git](https://git-scm.com/ "Git website"). And, while I'm comfortable using some Git commands from the terminal, [SourceTree](https://www.sourcetreeapp.com/ "SourceTree website") is immensely valuable when it comes to visualizing Git actions and results.

### Icons & Graphics

Most of the icons in this application came from sources much more talented at graphics production than myself, and the ones I customized were based off of them as well. Here are my main sources:

*   [The Noun Project](https://thenounproject.com/ "The Noun Project")
*   [iconmonstr](http://iconmonstr.com/ "iconmonstr")
*   [Clker](http://www.clker.com/ "Clker")

### Image & Graphics Editing

These programs came in handy for various image editing and processing tasks:

*   Google's [Picasa](https://picasa.google.com/ "Picasa") for enhancing photos.
*   [Inkscape](https://inkscape.org/en/ "Inkscape") for editing and creating SVG vector graphics. If you're looking for a decent free alternative to Adobe Illustrator, look no further!
*   [FastStone Photo Resizer](http://www.faststone.org/FSResizerDetail.htm "FastStone Photo Resizer") for optimizing and resizing photos (and this map has A LOT of them).

## Usage
Feel free to clone this, but most of the images are not included.

## Licensing
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

For the complete terms of the GNU General Public License, please see this URL:
http://www.gnu.org/licenses/gpl-2.0.html

All the dependencies have their own licensing, so refer to their sources for that (basically anything in the `vendors` folders) using the links in the **Credits** section above.

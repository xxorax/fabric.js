### Fabric 
[![Build Status](https://secure.travis-ci.org/kangax/fabric.js.png?branch=master)](http://travis-ci.org/#!/kangax/fabric.js)
<a href="https://npmjs.org/package/fabric"><img src="https://badge.fury.io/js/fabric.png"></a>

**Fabric.js** is a framework that makes it easy to work with HTML5 canvas element. It is an **interactive object model** on top of canvas element. It is also an **SVG-to-canvas parser**.

<a href="http://fabricjs.com/kitchensink/" target="_blank"><img src="https://github.com/kangax/fabric.js/raw/master/lib/screenshot.png" style="width:300px;box-shadow:rgba(0,0,0,0.3) 0 0 5px"></a>

Using Fabric.js, you can create and populate objects on canvas; objects like simple geometrical shapes — rectangles, circles, ellipses, polygons, or more complex shapes consisting of hundreds or thousands of simple paths. You can then scale, move, and rotate these objects with the mouse; modify their properties — color, transparency, z-index, etc. You can also manipulate these objects altogether — grouping them with a simple mouse selection.

[Contributions](https://github.com/kangax/fabric.js/wiki/Love-Fabric%3F-Help-us-by...) are very much welcome!

### Goals

- Unit tested (1500+ tests at the moment)
- Modular (~40 small "classes", modules, mixins)
- Cross-browser
- [Fast](https://github.com/kangax/fabric.js/wiki/Focus-on-speed)
- Encapsulated in one object
- No browser sniffing for critical functionality
- Runs under ES5 strict mode
- Runs on a server under [Node.js](http://nodejs.org/)

### Supported browsers

- Firefox 2+
- Safari 3+
- Opera 9.64+
- Chrome (all versions should work)
- IE9+

#### With help of [Explorer Canvas](http://code.google.com/p/explorercanvas/)

- IE8 (incomplete — about 17 failing tests at the moment)
- IE7,6 (incomplete - about 27 failing tests at the moment)

See [Fabric limitations in Old IE](https://github.com/kangax/fabric.js/wiki/Fabric-limitations-in-oldIE).

You can [run automated unit tests](http://fabricjs.com/test/unit/) right in the browser.

### History

Fabric.js started as a foundation for design editor on [printio.ru](http://printio.ru) — interactive online store with ability to create your own designs. The idea was to create [Javascript-based editor](http://printio.ru/ringer_man_tees/new), which would make it easy to manipulate vector shapes and images on T-Shirts. Since performance was one of the most critical requirements, we chose canvas over SVG. While SVG is excellent with static shapes, it's not as performant as canvas when it comes to dynamic manipulation of objects (movement, scaling, rotation, etc.). Fabric.js was heavily inspired by [Ernest Delgado's canvas experiment](http://www.ernestdelgado.com/public-tests/canvasphoto/demo/canvas.html). In fact, code from Ernest's experiment was the foundation of an entire framework. Later, Fabric.js grew into a collection of distinct object types and got an SVG-to-canvas parser.

<h3 id="fabric-building">Building</h3>

1. [Install Node.js](https://github.com/joyent/node/wiki/Installation)

2. Build distribution file  **[~76K minified, ~22K gzipped]**

        $ node build.js

    - Or build a custom distribution file, by passing (comma separated) module names to be included.

            $ node build.js modules=text,serialization,parser
            // or
            $ node build.js modules=text
            // or
            $ node build.js modules=parser,text
            // etc.

      By default (when none of the modules are specified) only basic functionality is included.
      See the list of modules below for more information on each one of them.
      Note that default distribution has support for **static canvases** only.

      To get minimal distribution with interactivity, make sure to include corresponding module:

            $ node build.js modules=interaction

    - You can also include all modules like so:

            $ node build.js modules=ALL

3. Create a minified distribution file

        # Using YUICompressor (default option)
        $ node build.js modules=... minifier=yui

        # or Google Closure Compiler
        $ node build.js modules=... minifier=closure

### Demos

- [Demos](http://fabricjs.com/demos/)
- [Kitchensink demo](http://fabricjs.com/kitchensink/)
- [Benchmarks](http://fabricjs.com/benchmarks/)

### Documentation

Documentation is always available at [http://fabricjs.com/docs/](http://fabricjs.com/docs/).

Also see [official 4-part intro series](http://fabricjs.com/articles), [presentation from BK.js](http://www.slideshare.net/kangax/fabricjs-building-acanvaslibrarybk) and [presentation from Falsy Values](http://www.slideshare.net/kangax/fabric-falsy-values-8067834) for an overview of fabric.js, how it works, and its features.

### Optional modules

These are the optional modules that could be specified for inclusion, when building custom version of fabric:

- **text** — Adds support for `fabric.Text`
- **serialization** — Adds support for `loadFromJSON`, `loadFromDatalessJSON`, and `clone` methods on `fabric.Canvas`
- **interaction** — Adds support for interactive features of fabric — selecting/transforming objects/groups via mouse/touch devices.
- **parser** — Adds support for `fabric.parseSVGDocument`, `fabric.loadSVGFromURL`, and `fabric.loadSVGFromString`
- **image_filters** — Adds support for image filters, such as grayscale of white removal.
- **easing** — Adds support for animation easing functions
- **node** — Adds support for running fabric under node.js, with help of [jsdom](https://github.com/tmpvar/jsdom) and [node-canvas](https://github.com/learnboost/node-canvas) libraries.
- **freedrawing** — Adds support for free drawing
- **gestures** — Adds support for multitouch gestures with help of [Event.js](https://github.com/mudcube/Event.js)
- **object_straightening** — Adds support for rotating an object to one of 0, 90, 180, 270, etc. depending on which is angle is closer.

### Examples of use

#### Adding red rectangle to canvas

    <canvas id="canvas" width="300" height="300"></canvas>
    ...
    var canvas = new fabric.Canvas('canvas');

    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: 'red'
    });

    canvas.add(rect);

### Staying in touch

Follow [@fabric.js](http://twitter.com/fabricjs) or [@kangax](http://twitter.com/kangax) on twitter. Questions, suggestions — [fabric.js on Google Groups](http://groups.google.com/group/fabricjs).

### Credits

- Ernest Delgado for the original idea of [manipulating images on canvas](http://www.ernestdelgado.com/archive/canvas/).
- [Maxim "hakunin" Chernyak](http://twitter.com/hakunin) for ideas, and help with various parts of the library throughout its life.
- [Sergey Nisnevich](http://nisnya.com) for help with geometry logic.
- [Stefan Kienzle](https://twitter.com/kienzle_s) for help with bugs, features, documentation, github issues
- Github contributors: @Kingsquare, @cleercode, @jarek-itmore, @sunrei, @khronnuz, @ollym, @garg, @sjpemberton09, @willmcneilly, @davidjrice, @coulix, and [more](https://github.com/kangax/fabric.js/graphs/contributors)

### MIT License

Copyright (c) 2008-2013 Printio (Juriy Zaytsev, Maxim Chernyak)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

(function() {

  /**
   * @class Object
   * @memberOf fabric
   */
  fabric.Pattern = fabric.util.createClass(/** @scope fabric.Pattern.prototype */ {

    initialize: function(objects, options) {

      options || (options = { });

      //this.viewBox = options.x1 || 0;
      this.x = options.x || 0;
      this.y = options.y || 0;

      this.width = options.width || 0;
      this.height = options.height;

      this.viewBox = options.viewBox;

      //this.transform
      this.objects = objects;
    },

    toObject: function() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        objects: this.objects,
        viewBox: this.viewBox
      };
    },

    toLivePattern: function(ctx) {
      var c = fabric.document.createElement('canvas'), tmpFabric, obj;
      c.width = this.width;
      c.height = this.height;
      tmpFabric = new fabric.StaticCanvas(c);

      obj = fabric.util.groupSVGElements(this.objects);
      obj.set({
        left: obj.getLeft() + this.x,
        top: obj.getTop() + this.y
      });

      tmpFabric.add(obj).centerObject(obj).renderAll();
      return ctx.createPattern(c, 'repeat');
    }
  });

  fabric.util.object.extend(fabric.Pattern, {

    /**
     * @method fromElement
     * @static
     * @see http://www.w3.org/TR/SVG/pservers.html#LinearGradientElement
     */
    fromElement: function(el, instance, callback) {

      /**
       *  @example:
       *
       *  <pattern id="pattern1" x="0" y="0" width="100" height="100" viewBox="...">
       *
       *  </pattern>
       *
       */

      var coords = {
          x: el.getAttribute('x') || 0,
          y: el.getAttribute('y') || 0,
          w: el.getAttribute('width') || 0,
          h: el.getAttribute('height') || 0
        },
        descendants = fabric.util.toArray(el.getElementsByTagName('*')),
        reAllowedSVGTagNames = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/;

      function hasAncestorWithNodeName(element, nodeName) {
        while (element && (element = element.parentNode)) {
          if (nodeName.test(element.nodeName)) {
            return true;
          }
        }
        return false;
      }

      if (descendants.length === 0) {
        // we're likely in node, where "o3-xml" library fails to gEBTN("*")
        // https://github.com/ajaxorg/node-o3-xml/issues/21
        descendants = el.selectNodes("//*[name(.)!='svg']");
        var arr = [ ];
        for (var i = 0, len = descendants.length; i < len; i++) {
          arr[i] = descendants[i];
        }
        descendants = arr;
      }

      var elements = descendants.filter(function(el) {
        return reAllowedSVGTagNames.test(el.tagName); // http://www.w3.org/TR/SVG/struct.html#DefsElement
      });

      fabric.parseElements(elements, function(instances) {
        var newPattern = new fabric.Pattern(instances, {
          x: coords.x,
          y: coords.y,
          width: coords.w,
          height: coords.h,
          viewBox: el.getAttribute('viewBox')
        });
        if (callback) {
          callback(instance, newPattern);
        }
      });
    },

    /**
     * @method forObject
     * @static
     */
    forObject: function(obj, options) {
      options || (options = { });

      return new fabric.Pattern(objects, options);
    }
  });

  /**
   * Parses an SVG document, returning all of the pattern declarations found in it
   * @static
   * @function
   * @memberOf fabric
   * @method getPatternDefs
   * @param {SVGDocument} doc SVG document to parse
   * @return {Object} Pattern definitions; key corresponds to element id, value -- to Pattern definition element
   */
  function getPatternDefs(doc) {
    var patternEls = doc.getElementsByTagName('pattern'),
      el, i,
      patternDefs = { };

    i = patternEls.length;
    for (; i--; ) {
      el = patternEls[i];
      patternDefs[el.getAttribute('id')] = el;
    }

    return patternDefs;
  }

  fabric.getPatternDefs = getPatternDefs;

})();
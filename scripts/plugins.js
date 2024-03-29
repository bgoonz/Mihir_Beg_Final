function moveParallax( a ) {
  var b = jQuery( a ).visible( !0 );
  if ( b ) {
    var c = jQuery( a ).data( "imagewidth" ),
      d = jQuery( a ).data( "imageheight" ),
      e = jQuery( a ).data( "speed" ),
      f = jQuery( a ).width(),
      g = jQuery( a ).offset().left,
      h = jQuery( window ).width(),
      i = jQuery( window ).height();
    c && h - 200 > f ? ( preLeft = g - Math.round( h / 2 ) + Math.round( f / 2 ), leftPos = Math.round( ( c - h ) / 2 ), leftPos = preLeft + -leftPos + "px" ) : leftPos = "50%", d && d > i ? topPos = Math.ceil( ( d - i ) / 2 ) : topPos = "0", e || ( e = .3 );
    var j = parseInt( jQuery( a ).offset().top ),
      k = j - jQuery( window ).scrollTop(),
      l = k * e - topPos,
      e = leftPos + " " + l + "px";
    jQuery( a ).css( {
      backgroundPosition: e
    } )
  }
}! function ( a, b ) {
  function c( a ) {
    var b = a.length,
      c = ia.type( a );
    return ia.isWindow( a ) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && ( 0 === b || "number" == typeof b && b > 0 && b - 1 in a )
  }

  function d( a ) {
    var b = xa[ a ] = {};
    return ia.each( a.match( ka ) || [], function ( a, c ) {
      b[ c ] = !0
    } ), b
  }

  function e( a, c, d, e ) {
    if ( ia.acceptData( a ) ) {
      var f, g, h = ia.expando,
        i = "string" == typeof c,
        j = a.nodeType,
        k = j ? ia.cache : a,
        l = j ? a[ h ] : a[ h ] && h;
      if ( l && k[ l ] && ( e || k[ l ].data ) || !i || d !== b ) return l || ( j ? a[ h ] = l = _.pop() || ia.guid++ : l = h ), k[ l ] || ( k[ l ] = {}, j || ( k[ l ].toJSON = ia.noop ) ), ( "object" == typeof c || "function" == typeof c ) && ( e ? k[ l ] = ia.extend( k[ l ], c ) : k[ l ].data = ia.extend( k[ l ].data, c ) ), f = k[ l ], e || ( f.data || ( f.data = {} ), f = f.data ), d !== b && ( f[ ia.camelCase( c ) ] = d ), i ? ( g = f[ c ], null == g && ( g = f[ ia.camelCase( c ) ] ) ) : g = f, g
    }
  }

  function f( a, b, c ) {
    if ( ia.acceptData( a ) ) {
      var d, e, f, g = a.nodeType,
        i = g ? ia.cache : a,
        j = g ? a[ ia.expando ] : ia.expando;
      if ( i[ j ] ) {
        if ( b && ( f = c ? i[ j ] : i[ j ].data ) ) {
          ia.isArray( b ) ? b = b.concat( ia.map( b, ia.camelCase ) ) : b in f ? b = [ b ] : ( b = ia.camelCase( b ), b = b in f ? [ b ] : b.split( " " ) );
          for ( d = 0, e = b.length; e > d; d++ ) delete f[ b[ d ] ];
          if ( !( c ? h : ia.isEmptyObject )( f ) ) return
        }( c || ( delete i[ j ].data, h( i[ j ] ) ) ) && ( g ? ia.cleanData( [ a ], !0 ) : ia.support.deleteExpando || i != i.window ? delete i[ j ] : i[ j ] = null )
      }
    }
  }

  function g( a, c, d ) {
    if ( d === b && 1 === a.nodeType ) {
      var e = "data-" + c.replace( za, "-$1" ).toLowerCase();
      if ( d = a.getAttribute( e ), "string" == typeof d ) {
        try {
          d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : ya.test( d ) ? ia.parseJSON( d ) : d
        } catch ( f ) {}
        ia.data( a, c, d )
      } else d = b
    }
    return d
  }

  function h( a ) {
    var b;
    for ( b in a )
      if ( ( "data" !== b || !ia.isEmptyObject( a[ b ] ) ) && "toJSON" !== b ) return !1;
    return !0
  }

  function i() {
    return !0
  }

  function j() {
    return !1
  }

  function k( a, b ) {
    do a = a[ b ]; while ( a && 1 !== a.nodeType );
    return a
  }

  function l( a, b, c ) {
    if ( b = b || 0, ia.isFunction( b ) ) return ia.grep( a, function ( a, d ) {
      var e = !!b.call( a, d, a );
      return e === c
    } );
    if ( b.nodeType ) return ia.grep( a, function ( a ) {
      return a === b === c
    } );
    if ( "string" == typeof b ) {
      var d = ia.grep( a, function ( a ) {
        return 1 === a.nodeType
      } );
      if ( Ra.test( b ) ) return ia.filter( b, d, !c );
      b = ia.filter( b, d )
    }
    return ia.grep( a, function ( a ) {
      return ia.inArray( a, b ) >= 0 === c
    } )
  }

  function m( a ) {
    var b = Ua.split( "|" ),
      c = a.createDocumentFragment();
    if ( c.createElement )
      for ( ; b.length; ) c.createElement( b.pop() );
    return c
  }

  function n( a, b ) {
    return a.getElementsByTagName( b )[ 0 ] || a.appendChild( a.ownerDocument.createElement( b ) )
  }

  function o( a ) {
    var b = a.getAttributeNode( "type" );
    return a.type = ( b && b.specified ) + "/" + a.type, a
  }

  function p( a ) {
    var b = eb.exec( a.type );
    return b ? a.type = b[ 1 ] : a.removeAttribute( "type" ), a
  }

  function q( a, b ) {
    for ( var c, d = 0; null != ( c = a[ d ] ); d++ ) ia._data( c, "globalEval", !b || ia._data( b[ d ], "globalEval" ) )
  }

  function r( a, b ) {
    if ( 1 === b.nodeType && ia.hasData( a ) ) {
      var c, d, e, f = ia._data( a ),
        g = ia._data( b, f ),
        h = f.events;
      if ( h ) {
        delete g.handle, g.events = {};
        for ( c in h )
          for ( d = 0, e = h[ c ].length; e > d; d++ ) ia.event.add( b, c, h[ c ][ d ] )
      }
      g.data && ( g.data = ia.extend( {}, g.data ) )
    }
  }

  function s( a, b ) {
    var c, d, e;
    if ( 1 === b.nodeType ) {
      if ( c = b.nodeName.toLowerCase(), !ia.support.noCloneEvent && b[ ia.expando ] ) {
        e = ia._data( b );
        for ( d in e.events ) ia.removeEvent( b, d, e.handle );
        b.removeAttribute( ia.expando )
      }
      "script" === c && b.text !== a.text ? ( o( b ).text = a.text, p( b ) ) : "object" === c ? ( b.parentNode && ( b.outerHTML = a.outerHTML ), ia.support.html5Clone && a.innerHTML && !ia.trim( b.innerHTML ) && ( b.innerHTML = a.innerHTML ) ) : "input" === c && bb.test( a.type ) ? ( b.defaultChecked = b.checked = a.checked, b.value !== a.value && ( b.value = a.value ) ) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ( "input" === c || "textarea" === c ) && ( b.defaultValue = a.defaultValue )
    }
  }

  function t( a, c ) {
    var d, e, f = 0,
      g = typeof a.getElementsByTagName !== V ? a.getElementsByTagName( c || "*" ) : typeof a.querySelectorAll !== V ? a.querySelectorAll( c || "*" ) : b;
    if ( !g )
      for ( g = [], d = a.childNodes || a; null != ( e = d[ f ] ); f++ ) !c || ia.nodeName( e, c ) ? g.push( e ) : ia.merge( g, t( e, c ) );
    return c === b || c && ia.nodeName( a, c ) ? ia.merge( [ a ], g ) : g
  }

  function u( a ) {
    bb.test( a.type ) && ( a.defaultChecked = a.checked )
  }

  function v( a, b ) {
    if ( b in a ) return b;
    for ( var c = b.charAt( 0 ).toUpperCase() + b.slice( 1 ), d = b, e = yb.length; e--; )
      if ( b = yb[ e ] + c, b in a ) return b;
    return d
  }

  function w( a, b ) {
    return a = b || a, "none" === ia.css( a, "display" ) || !ia.contains( a.ownerDocument, a )
  }

  function x( a, b ) {
    for ( var c, d, e, f = [], g = 0, h = a.length; h > g; g++ ) d = a[ g ], d.style && ( f[ g ] = ia._data( d, "olddisplay" ), c = d.style.display, b ? ( f[ g ] || "none" !== c || ( d.style.display = "" ), "" === d.style.display && w( d ) && ( f[ g ] = ia._data( d, "olddisplay", B( d.nodeName ) ) ) ) : f[ g ] || ( e = w( d ), ( c && "none" !== c || !e ) && ia._data( d, "olddisplay", e ? c : ia.css( d, "display" ) ) ) );
    for ( g = 0; h > g; g++ ) d = a[ g ], d.style && ( b && "none" !== d.style.display && "" !== d.style.display || ( d.style.display = b ? f[ g ] || "" : "none" ) );
    return a
  }

  function y( a, b, c ) {
    var d = rb.exec( b );
    return d ? Math.max( 0, d[ 1 ] - ( c || 0 ) ) + ( d[ 2 ] || "px" ) : b
  }

  function z( a, b, c, d, e ) {
    for ( var f = c === ( d ? "border" : "content" ) ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2 ) "margin" === c && ( g += ia.css( a, c + xb[ f ], !0, e ) ), d ? ( "content" === c && ( g -= ia.css( a, "padding" + xb[ f ], !0, e ) ), "margin" !== c && ( g -= ia.css( a, "border" + xb[ f ] + "Width", !0, e ) ) ) : ( g += ia.css( a, "padding" + xb[ f ], !0, e ), "padding" !== c && ( g += ia.css( a, "border" + xb[ f ] + "Width", !0, e ) ) );
    return g
  }

  function A( a, b, c ) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = kb( a ),
      g = ia.support.boxSizing && "border-box" === ia.css( a, "boxSizing", !1, f );
    if ( 0 >= e || null == e ) {
      if ( e = lb( a, b, f ), ( 0 > e || null == e ) && ( e = a.style[ b ] ), sb.test( e ) ) return e;
      d = g && ( ia.support.boxSizingReliable || e === a.style[ b ] ), e = parseFloat( e ) || 0
    }
    return e + z( a, b, c || ( g ? "border" : "content" ), d, f ) + "px"
  }

  function B( a ) {
    var b = W,
      c = ub[ a ];
    return c || ( c = C( a, b ), "none" !== c && c || ( jb = ( jb || ia( "<iframe frameborder='0' width='0' height='0'/>" ).css( "cssText", "display:block !important" ) ).appendTo( b.documentElement ), b = ( jb[ 0 ].contentWindow || jb[ 0 ].contentDocument ).document, b.write( "<!doctype html><html><body>" ), b.close(), c = C( a, b ), jb.detach() ), ub[ a ] = c ), c
  }

  function C( a, b ) {
    var c = ia( b.createElement( a ) ).appendTo( b.body ),
      d = ia.css( c[ 0 ], "display" );
    return c.remove(), d
  }

  function D( a, b, c, d ) {
    var e;
    if ( ia.isArray( b ) ) ia.each( b, function ( b, e ) {
      c || Ab.test( a ) ? d( a, e ) : D( a + "[" + ( "object" == typeof e ? b : "" ) + "]", e, c, d )
    } );
    else if ( c || "object" !== ia.type( b ) ) d( a, b );
    else
      for ( e in b ) D( a + "[" + e + "]", b[ e ], c, d )
  }

  function E( a ) {
    return function ( b, c ) {
      "string" != typeof b && ( c = b, b = "*" );
      var d, e = 0,
        f = b.toLowerCase().match( ka ) || [];
      if ( ia.isFunction( c ) )
        for ( ; d = f[ e++ ]; ) "+" === d[ 0 ] ? ( d = d.slice( 1 ) || "*", ( a[ d ] = a[ d ] || [] ).unshift( c ) ) : ( a[ d ] = a[ d ] || [] ).push( c )
    }
  }

  function F( a, b, c, d ) {
    function e( h ) {
      var i;
      return f[ h ] = !0, ia.each( a[ h ] || [], function ( a, h ) {
        var j = h( b, c, d );
        return "string" != typeof j || g || f[ j ] ? g ? !( i = j ) : void 0 : ( b.dataTypes.unshift( j ), e( j ), !1 )
      } ), i
    }
    var f = {},
      g = a === Rb;
    return e( b.dataTypes[ 0 ] ) || !f[ "*" ] && e( "*" )
  }

  function G( a, c ) {
    var d, e, f = ia.ajaxSettings.flatOptions || {};
    for ( e in c ) c[ e ] !== b && ( ( f[ e ] ? a : d || ( d = {} ) )[ e ] = c[ e ] );
    return d && ia.extend( !0, a, d ), a
  }

  function H( a, c, d ) {
    var e, f, g, h, i = a.contents,
      j = a.dataTypes,
      k = a.responseFields;
    for ( h in k ) h in d && ( c[ k[ h ] ] = d[ h ] );
    for ( ;
      "*" === j[ 0 ]; ) j.shift(), f === b && ( f = a.mimeType || c.getResponseHeader( "Content-Type" ) );
    if ( f )
      for ( h in i )
        if ( i[ h ] && i[ h ].test( f ) ) {
          j.unshift( h );
          break
        } if ( j[ 0 ] in d ) g = j[ 0 ];
    else {
      for ( h in d ) {
        if ( !j[ 0 ] || a.converters[ h + " " + j[ 0 ] ] ) {
          g = h;
          break
        }
        e || ( e = h )
      }
      g = g || e
    }
    return g ? ( g !== j[ 0 ] && j.unshift( g ), d[ g ] ) : void 0
  }

  function I( a, b ) {
    var c, d, e, f, g = {},
      h = 0,
      i = a.dataTypes.slice(),
      j = i[ 0 ];
    if ( a.dataFilter && ( b = a.dataFilter( b, a.dataType ) ), i[ 1 ] )
      for ( e in a.converters ) g[ e.toLowerCase() ] = a.converters[ e ];
    for ( ; d = i[ ++h ]; )
      if ( "*" !== d ) {
        if ( "*" !== j && j !== d ) {
          if ( e = g[ j + " " + d ] || g[ "* " + d ], !e )
            for ( c in g )
              if ( f = c.split( " " ), f[ 1 ] === d && ( e = g[ j + " " + f[ 0 ] ] || g[ "* " + f[ 0 ] ] ) ) {
                e === !0 ? e = g[ c ] : g[ c ] !== !0 && ( d = f[ 0 ], i.splice( h--, 0, d ) );
                break
              } if ( e !== !0 )
            if ( e && a[ "throws" ] ) b = e( b );
            else try {
              b = e( b )
            } catch ( k ) {
              return {
                state: "parsererror",
                error: e ? k : "No conversion from " + j + " to " + d
              }
            }
        }
        j = d
      } return {
      state: "success",
      data: b
    }
  }

  function J() {
    try {
      return new a.XMLHttpRequest
    } catch ( b ) {}
  }

  function K() {
    try {
      return new a.ActiveXObject( "Microsoft.XMLHTTP" )
    } catch ( b ) {}
  }

  function L() {
    return setTimeout( function () {
      $b = b
    } ), $b = ia.now()
  }

  function M( a, b ) {
    ia.each( b, function ( b, c ) {
      for ( var d = ( ec[ b ] || [] ).concat( ec[ "*" ] ), e = 0, f = d.length; f > e; e++ )
        if ( d[ e ].call( a, b, c ) ) return
    } )
  }

  function N( a, b, c ) {
    var d, e, f = 0,
      g = dc.length,
      h = ia.Deferred().always( function () {
        delete i.elem
      } ),
      i = function () {
        if ( e ) return !1;
        for ( var b = $b || L(), c = Math.max( 0, j.startTime + j.duration - b ), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++ ) j.tweens[ g ].run( f );
        return h.notifyWith( a, [ j, f, c ] ), 1 > f && i ? c : ( h.resolveWith( a, [ j ] ), !1 )
      },
      j = h.promise( {
        elem: a,
        props: ia.extend( {}, b ),
        opts: ia.extend( !0, {
          specialEasing: {}
        }, c ),
        originalProperties: b,
        originalOptions: c,
        startTime: $b || L(),
        duration: c.duration,
        tweens: [],
        createTween: function ( b, c ) {
          var d = ia.Tween( a, j.opts, b, c, j.opts.specialEasing[ b ] || j.opts.easing );
          return j.tweens.push( d ), d
        },
        stop: function ( b ) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if ( e ) return this;
          for ( e = !0; d > c; c++ ) j.tweens[ c ].run( 1 );
          return b ? h.resolveWith( a, [ j, b ] ) : h.rejectWith( a, [ j, b ] ), this
        }
      } ),
      k = j.props;
    for ( O( k, j.opts.specialEasing ); g > f; f++ )
      if ( d = dc[ f ].call( j, a, k, j.opts ) ) return d;
    return M( j, k ), ia.isFunction( j.opts.start ) && j.opts.start.call( a, j ), ia.fx.timer( ia.extend( i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    } ) ), j.progress( j.opts.progress ).done( j.opts.done, j.opts.complete ).fail( j.opts.fail ).always( j.opts.always )
  }

  function O( a, b ) {
    var c, d, e, f, g;
    for ( e in a )
      if ( d = ia.camelCase( e ), f = b[ d ], c = a[ e ], ia.isArray( c ) && ( f = c[ 1 ], c = a[ e ] = c[ 0 ] ), e !== d && ( a[ d ] = c, delete a[ e ] ), g = ia.cssHooks[ d ], g && "expand" in g ) {
        c = g.expand( c ), delete a[ d ];
        for ( e in c ) e in a || ( a[ e ] = c[ e ], b[ e ] = f )
      } else b[ d ] = f
  }

  function P( a, b, c ) {
    var d, e, f, g, h, i, j, k, l, m = this,
      n = a.style,
      o = {},
      p = [],
      q = a.nodeType && w( a );
    c.queue || ( k = ia._queueHooks( a, "fx" ), null == k.unqueued && ( k.unqueued = 0, l = k.empty.fire, k.empty.fire = function () {
      k.unqueued || l()
    } ), k.unqueued++, m.always( function () {
      m.always( function () {
        k.unqueued--, ia.queue( a, "fx" ).length || k.empty.fire()
      } )
    } ) ), 1 === a.nodeType && ( "height" in b || "width" in b ) && ( c.overflow = [ n.overflow, n.overflowX, n.overflowY ], "inline" === ia.css( a, "display" ) && "none" === ia.css( a, "float" ) && ( ia.support.inlineBlockNeedsLayout && "inline" !== B( a.nodeName ) ? n.zoom = 1 : n.display = "inline-block" ) ), c.overflow && ( n.overflow = "hidden", ia.support.shrinkWrapBlocks || m.always( function () {
      n.overflow = c.overflow[ 0 ], n.overflowX = c.overflow[ 1 ], n.overflowY = c.overflow[ 2 ]
    } ) );
    for ( e in b )
      if ( g = b[ e ], ac.exec( g ) ) {
        if ( delete b[ e ], i = i || "toggle" === g, g === ( q ? "hide" : "show" ) ) continue;
        p.push( e )
      } if ( f = p.length ) {
      h = ia._data( a, "fxshow" ) || ia._data( a, "fxshow", {} ), "hidden" in h && ( q = h.hidden ), i && ( h.hidden = !q ), q ? ia( a ).show() : m.done( function () {
        ia( a ).hide()
      } ), m.done( function () {
        var b;
        ia._removeData( a, "fxshow" );
        for ( b in o ) ia.style( a, b, o[ b ] )
      } );
      for ( e = 0; f > e; e++ ) d = p[ e ], j = m.createTween( d, q ? h[ d ] : 0 ), o[ d ] = h[ d ] || ia.style( a, d ), d in h || ( h[ d ] = j.start, q && ( j.end = j.start, j.start = "width" === d || "height" === d ? 1 : 0 ) )
    }
  }

  function Q( a, b, c, d, e ) {
    return new Q.prototype.init( a, b, c, d, e )
  }

  function R( a, b ) {
    var c, d = {
        height: a
      },
      e = 0;
    for ( b = b ? 1 : 0; 4 > e; e += 2 - b ) c = xb[ e ], d[ "margin" + c ] = d[ "padding" + c ] = a;
    return b && ( d.opacity = d.width = a ), d
  }

  function S( a ) {
    return ia.isWindow( a ) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
  }
  var T, U, V = typeof b,
    W = a.document,
    X = a.location,
    Y = a.jQuery,
    Z = a.$,
    $ = {},
    _ = [],
    aa = "1.9.1",
    ba = _.concat,
    ca = _.push,
    da = _.slice,
    ea = _.indexOf,
    fa = $.toString,
    ga = $.hasOwnProperty,
    ha = aa.trim,
    ia = function ( a, b ) {
      return new ia.fn.init( a, b, U )
    },
    ja = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ka = /\S+/g,
    la = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    ma = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    na = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    oa = /^[\],:{}\s]*$/,
    pa = /(?:^|:|,)(?:\s*\[)+/g,
    qa = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    ra = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    sa = /^-ms-/,
    ta = /-([\da-z])/gi,
    ua = function ( a, b ) {
      return b.toUpperCase()
    },
    va = function ( a ) {
      ( W.addEventListener || "load" === a.type || "complete" === W.readyState ) && ( wa(), ia.ready() )
    },
    wa = function () {
      W.addEventListener ? ( W.removeEventListener( "DOMContentLoaded", va, !1 ), a.removeEventListener( "load", va, !1 ) ) : ( W.detachEvent( "onreadystatechange", va ), a.detachEvent( "onload", va ) )
    };
  ia.fn = ia.prototype = {
    jquery: aa,
    constructor: ia,
    init: function ( a, c, d ) {
      var e, f;
      if ( !a ) return this;
      if ( "string" == typeof a ) {
        if ( e = "<" === a.charAt( 0 ) && ">" === a.charAt( a.length - 1 ) && a.length >= 3 ? [ null, a, null ] : ma.exec( a ), !e || !e[ 1 ] && c ) return !c || c.jquery ? ( c || d ).find( a ) : this.constructor( c ).find( a );
        if ( e[ 1 ] ) {
          if ( c = c instanceof ia ? c[ 0 ] : c, ia.merge( this, ia.parseHTML( e[ 1 ], c && c.nodeType ? c.ownerDocument || c : W, !0 ) ), na.test( e[ 1 ] ) && ia.isPlainObject( c ) )
            for ( e in c ) ia.isFunction( this[ e ] ) ? this[ e ]( c[ e ] ) : this.attr( e, c[ e ] );
          return this
        }
        if ( f = W.getElementById( e[ 2 ] ), f && f.parentNode ) {
          if ( f.id !== e[ 2 ] ) return d.find( a );
          this.length = 1, this[ 0 ] = f
        }
        return this.context = W, this.selector = a, this
      }
      return a.nodeType ? ( this.context = this[ 0 ] = a, this.length = 1, this ) : ia.isFunction( a ) ? d.ready( a ) : ( a.selector !== b && ( this.selector = a.selector, this.context = a.context ), ia.makeArray( a, this ) )
    },
    selector: "",
    length: 0,
    size: function () {
      return this.length
    },
    toArray: function () {
      return da.call( this )
    },
    get: function ( a ) {
      return null == a ? this.toArray() : 0 > a ? this[ this.length + a ] : this[ a ]
    },
    pushStack: function ( a ) {
      var b = ia.merge( this.constructor(), a );
      return b.prevObject = this, b.context = this.context, b
    },
    each: function ( a, b ) {
      return ia.each( this, a, b )
    },
    ready: function ( a ) {
      return ia.ready.promise().done( a ), this
    },
    slice: function () {
      return this.pushStack( da.apply( this, arguments ) )
    },
    first: function () {
      return this.eq( 0 )
    },
    last: function () {
      return this.eq( -1 )
    },
    eq: function ( a ) {
      var b = this.length,
        c = +a + ( 0 > a ? b : 0 );
      return this.pushStack( c >= 0 && b > c ? [ this[ c ] ] : [] )
    },
    map: function ( a ) {
      return this.pushStack( ia.map( this, function ( b, c ) {
        return a.call( b, c, b )
      } ) )
    },
    end: function () {
      return this.prevObject || this.constructor( null )
    },
    push: ca,
    sort: [].sort,
    splice: [].splice
  }, ia.fn.init.prototype = ia.fn, ia.extend = ia.fn.extend = function () {
    var a, c, d, e, f, g, h = arguments[ 0 ] || {},
      i = 1,
      j = arguments.length,
      k = !1;
    for ( "boolean" == typeof h && ( k = h, h = arguments[ 1 ] || {}, i = 2 ), "object" == typeof h || ia.isFunction( h ) || ( h = {} ), j === i && ( h = this, --i ); j > i; i++ )
      if ( null != ( f = arguments[ i ] ) )
        for ( e in f ) a = h[ e ], d = f[ e ], h !== d && ( k && d && ( ia.isPlainObject( d ) || ( c = ia.isArray( d ) ) ) ? ( c ? ( c = !1, g = a && ia.isArray( a ) ? a : [] ) : g = a && ia.isPlainObject( a ) ? a : {}, h[ e ] = ia.extend( k, g, d ) ) : d !== b && ( h[ e ] = d ) );
    return h
  }, ia.extend( {
    noConflict: function ( b ) {
      return a.$ === ia && ( a.$ = Z ), b && a.jQuery === ia && ( a.jQuery = Y ), ia
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function ( a ) {
      a ? ia.readyWait++ : ia.ready( !0 )
    },
    ready: function ( a ) {
      if ( a === !0 ? !--ia.readyWait : !ia.isReady ) {
        if ( !W.body ) return setTimeout( ia.ready );
        ia.isReady = !0, a !== !0 && --ia.readyWait > 0 || ( T.resolveWith( W, [ ia ] ), ia.fn.trigger && ia( W ).trigger( "ready" ).off( "ready" ) )
      }
    },
    isFunction: function ( a ) {
      return "function" === ia.type( a )
    },
    isArray: Array.isArray || function ( a ) {
      return "array" === ia.type( a )
    },
    isWindow: function ( a ) {
      return null != a && a == a.window
    },
    isNumeric: function ( a ) {
      return !isNaN( parseFloat( a ) ) && isFinite( a )
    },
    type: function ( a ) {
      return null == a ? String( a ) : "object" == typeof a || "function" == typeof a ? $[ fa.call( a ) ] || "object" : typeof a
    },
    isPlainObject: function ( a ) {
      if ( !a || "object" !== ia.type( a ) || a.nodeType || ia.isWindow( a ) ) return !1;
      try {
        if ( a.constructor && !ga.call( a, "constructor" ) && !ga.call( a.constructor.prototype, "isPrototypeOf" ) ) return !1
      } catch ( c ) {
        return !1
      }
      var d;
      for ( d in a );
      return d === b || ga.call( a, d )
    },
    isEmptyObject: function ( a ) {
      var b;
      for ( b in a ) return !1;
      return !0
    },
    error: function ( a ) {
      throw new Error( a )
    },
    parseHTML: function ( a, b, c ) {
      if ( !a || "string" != typeof a ) return null;
      "boolean" == typeof b && ( c = b, b = !1 ), b = b || W;
      var d = na.exec( a ),
        e = !c && [];
      return d ? [ b.createElement( d[ 1 ] ) ] : ( d = ia.buildFragment( [ a ], b, e ), e && ia( e ).remove(), ia.merge( [], d.childNodes ) )
    },
    parseJSON: function ( b ) {
      return a.JSON && a.JSON.parse ? a.JSON.parse( b ) : null === b ? b : "string" == typeof b && ( b = ia.trim( b ), b && oa.test( b.replace( qa, "@" ).replace( ra, "]" ).replace( pa, "" ) ) ) ? new Function( "return " + b )() : void ia.error( "Invalid JSON: " + b )
    },
    parseXML: function ( c ) {
      var d, e;
      if ( !c || "string" != typeof c ) return null;
      try {
        a.DOMParser ? ( e = new DOMParser, d = e.parseFromString( c, "text/xml" ) ) : ( d = new ActiveXObject( "Microsoft.XMLDOM" ), d.async = "false", d.loadXML( c ) )
      } catch ( f ) {
        d = b
      }
      return d && d.documentElement && !d.getElementsByTagName( "parsererror" ).length || ia.error( "Invalid XML: " + c ), d
    },
    noop: function () {},
    globalEval: function ( b ) {
      b && ia.trim( b ) && ( a.execScript || function ( b ) {
        a.eval.call( a, b )
      } )( b )
    },
    camelCase: function ( a ) {
      return a.replace( sa, "ms-" ).replace( ta, ua )
    },
    nodeName: function ( a, b ) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function ( a, b, d ) {
      var e, f = 0,
        g = a.length,
        h = c( a );
      if ( d ) {
        if ( h )
          for ( ; g > f && ( e = b.apply( a[ f ], d ), e !== !1 ); f++ );
        else
          for ( f in a )
            if ( e = b.apply( a[ f ], d ), e === !1 ) break
      } else if ( h )
        for ( ; g > f && ( e = b.call( a[ f ], f, a[ f ] ), e !== !1 ); f++ );
      else
        for ( f in a )
          if ( e = b.call( a[ f ], f, a[ f ] ), e === !1 ) break;
      return a
    },
    trim: ha && !ha.call( "\ufeff " ) ? function ( a ) {
      return null == a ? "" : ha.call( a )
    } : function ( a ) {
      return null == a ? "" : ( a + "" ).replace( la, "" )
    },
    makeArray: function ( a, b ) {
      var d = b || [];
      return null != a && ( c( Object( a ) ) ? ia.merge( d, "string" == typeof a ? [ a ] : a ) : ca.call( d, a ) ), d
    },
    inArray: function ( a, b, c ) {
      var d;
      if ( b ) {
        if ( ea ) return ea.call( b, a, c );
        for ( d = b.length, c = c ? 0 > c ? Math.max( 0, d + c ) : c : 0; d > c; c++ )
          if ( c in b && b[ c ] === a ) return c
      }
      return -1
    },
    merge: function ( a, c ) {
      var d = c.length,
        e = a.length,
        f = 0;
      if ( "number" == typeof d )
        for ( ; d > f; f++ ) a[ e++ ] = c[ f ];
      else
        for ( ; c[ f ] !== b; ) a[ e++ ] = c[ f++ ];
      return a.length = e, a
    },
    grep: function ( a, b, c ) {
      var d, e = [],
        f = 0,
        g = a.length;
      for ( c = !!c; g > f; f++ ) d = !!b( a[ f ], f ), c !== d && e.push( a[ f ] );
      return e
    },
    map: function ( a, b, d ) {
      var e, f = 0,
        g = a.length,
        h = c( a ),
        i = [];
      if ( h )
        for ( ; g > f; f++ ) e = b( a[ f ], f, d ), null != e && ( i[ i.length ] = e );
      else
        for ( f in a ) e = b( a[ f ], f, d ), null != e && ( i[ i.length ] = e );
      return ba.apply( [], i )
    },
    guid: 1,
    proxy: function ( a, c ) {
      var d, e, f;
      return "string" == typeof c && ( f = a[ c ], c = a, a = f ), ia.isFunction( a ) ? ( d = da.call( arguments, 2 ), e = function () {
        return a.apply( c || this, d.concat( da.call( arguments ) ) )
      }, e.guid = a.guid = a.guid || ia.guid++, e ) : b
    },
    access: function ( a, c, d, e, f, g, h ) {
      var i = 0,
        j = a.length,
        k = null == d;
      if ( "object" === ia.type( d ) ) {
        f = !0;
        for ( i in d ) ia.access( a, c, i, d[ i ], !0, g, h )
      } else if ( e !== b && ( f = !0, ia.isFunction( e ) || ( h = !0 ), k && ( h ? ( c.call( a, e ), c = null ) : ( k = c, c = function ( a, b, c ) {
          return k.call( ia( a ), c )
        } ) ), c ) )
        for ( ; j > i; i++ ) c( a[ i ], d, h ? e : e.call( a[ i ], i, c( a[ i ], d ) ) );
      return f ? a : k ? c.call( a ) : j ? c( a[ 0 ], d ) : g
    },
    now: function () {
      return ( new Date ).getTime()
    }
  } ), ia.ready.promise = function ( b ) {
    if ( !T )
      if ( T = ia.Deferred(), "complete" === W.readyState ) setTimeout( ia.ready );
      else if ( W.addEventListener ) W.addEventListener( "DOMContentLoaded", va, !1 ), a.addEventListener( "load", va, !1 );
    else {
      W.attachEvent( "onreadystatechange", va ), a.attachEvent( "onload", va );
      var c = !1;
      try {
        c = null == a.frameElement && W.documentElement
      } catch ( d ) {}
      c && c.doScroll && ! function e() {
        if ( !ia.isReady ) {
          try {
            c.doScroll( "left" )
          } catch ( a ) {
            return setTimeout( e, 50 )
          }
          wa(), ia.ready()
        }
      }()
    }
    return T.promise( b )
  }, ia.each( "Boolean Number String Function Array Date RegExp Object Error".split( " " ), function ( a, b ) {
    $[ "[object " + b + "]" ] = b.toLowerCase()
  } ), U = ia( W );
  var xa = {};
  ia.Callbacks = function ( a ) {
    a = "string" == typeof a ? xa[ a ] || d( a ) : ia.extend( {}, a );
    var c, e, f, g, h, i, j = [],
      k = !a.once && [],
      l = function ( b ) {
        for ( e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++ )
          if ( j[ h ].apply( b[ 0 ], b[ 1 ] ) === !1 && a.stopOnFalse ) {
            e = !1;
            break
          } c = !1, j && ( k ? k.length && l( k.shift() ) : e ? j = [] : m.disable() )
      },
      m = {
        add: function () {
          if ( j ) {
            var b = j.length;
            ! function d( b ) {
              ia.each( b, function ( b, c ) {
                var e = ia.type( c );
                "function" === e ? a.unique && m.has( c ) || j.push( c ) : c && c.length && "string" !== e && d( c )
              } )
            }( arguments ), c ? g = j.length : e && ( i = b, l( e ) )
          }
          return this
        },
        remove: function () {
          return j && ia.each( arguments, function ( a, b ) {
            for ( var d;
              ( d = ia.inArray( b, j, d ) ) > -1; ) j.splice( d, 1 ), c && ( g >= d && g--, h >= d && h-- )
          } ), this
        },
        has: function ( a ) {
          return a ? ia.inArray( a, j ) > -1 : !( !j || !j.length )
        },
        empty: function () {
          return j = [], this
        },
        disable: function () {
          return j = k = e = b, this
        },
        disabled: function () {
          return !j
        },
        lock: function () {
          return k = b, e || m.disable(), this
        },
        locked: function () {
          return !k
        },
        fireWith: function ( a, b ) {
          return b = b || [], b = [ a, b.slice ? b.slice() : b ], !j || f && !k || ( c ? k.push( b ) : l( b ) ), this
        },
        fire: function () {
          return m.fireWith( this, arguments ), this
        },
        fired: function () {
          return !!f
        }
      };
    return m
  }, ia.extend( {
    Deferred: function ( a ) {
      var b = [
          [ "resolve", "done", ia.Callbacks( "once memory" ), "resolved" ],
          [ "reject", "fail", ia.Callbacks( "once memory" ), "rejected" ],
          [ "notify", "progress", ia.Callbacks( "memory" ) ]
        ],
        c = "pending",
        d = {
          state: function () {
            return c
          },
          always: function () {
            return e.done( arguments ).fail( arguments ), this
          },
          then: function () {
            var a = arguments;
            return ia.Deferred( function ( c ) {
              ia.each( b, function ( b, f ) {
                var g = f[ 0 ],
                  h = ia.isFunction( a[ b ] ) && a[ b ];
                e[ f[ 1 ] ]( function () {
                  var a = h && h.apply( this, arguments );
                  a && ia.isFunction( a.promise ) ? a.promise().done( c.resolve ).fail( c.reject ).progress( c.notify ) : c[ g + "With" ]( this === d ? c.promise() : this, h ? [ a ] : arguments )
                } )
              } ), a = null
            } ).promise()
          },
          promise: function ( a ) {
            return null != a ? ia.extend( a, d ) : d
          }
        },
        e = {};
      return d.pipe = d.then, ia.each( b, function ( a, f ) {
        var g = f[ 2 ],
          h = f[ 3 ];
        d[ f[ 1 ] ] = g.add, h && g.add( function () {
          c = h
        }, b[ 1 ^ a ][ 2 ].disable, b[ 2 ][ 2 ].lock ), e[ f[ 0 ] ] = function () {
          return e[ f[ 0 ] + "With" ]( this === e ? d : this, arguments ), this
        }, e[ f[ 0 ] + "With" ] = g.fireWith
      } ), d.promise( e ), a && a.call( e, e ), e
    },
    when: function ( a ) {
      var b, c, d, e = 0,
        f = da.call( arguments ),
        g = f.length,
        h = 1 !== g || a && ia.isFunction( a.promise ) ? g : 0,
        i = 1 === h ? a : ia.Deferred(),
        j = function ( a, c, d ) {
          return function ( e ) {
            c[ a ] = this, d[ a ] = arguments.length > 1 ? da.call( arguments ) : e, d === b ? i.notifyWith( c, d ) : --h || i.resolveWith( c, d )
          }
        };
      if ( g > 1 )
        for ( b = new Array( g ), c = new Array( g ), d = new Array( g ); g > e; e++ ) f[ e ] && ia.isFunction( f[ e ].promise ) ? f[ e ].promise().done( j( e, d, f ) ).fail( i.reject ).progress( j( e, c, b ) ) : --h;
      return h || i.resolveWith( d, f ), i.promise()
    }
  } ), ia.support = function () {
    var b, c, d, e, f, g, h, i, j, k, l = W.createElement( "div" );
    if ( l.setAttribute( "className", "t" ), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName( "*" ), d = l.getElementsByTagName( "a" )[ 0 ], !c || !d || !c.length ) return {};
    f = W.createElement( "select" ), h = f.appendChild( W.createElement( "option" ) ), e = l.getElementsByTagName( "input" )[ 0 ], d.style.cssText = "top:1px;float:left;opacity:.5", b = {
      getSetAttribute: "t" !== l.className,
      leadingWhitespace: 3 === l.firstChild.nodeType,
      tbody: !l.getElementsByTagName( "tbody" ).length,
      htmlSerialize: !!l.getElementsByTagName( "link" ).length,
      style: /top/.test( d.getAttribute( "style" ) ),
      hrefNormalized: "/a" === d.getAttribute( "href" ),
      opacity: /^0.5/.test( d.style.opacity ),
      cssFloat: !!d.style.cssFloat,
      checkOn: !!e.value,
      optSelected: h.selected,
      enctype: !!W.createElement( "form" ).enctype,
      html5Clone: "<:nav></:nav>" !== W.createElement( "nav" ).cloneNode( !0 ).outerHTML,
      boxModel: "CSS1Compat" === W.compatMode,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      boxSizingReliable: !0,
      pixelPosition: !1
    }, e.checked = !0, b.noCloneChecked = e.cloneNode( !0 ).checked, f.disabled = !0, b.optDisabled = !h.disabled;
    try {
      delete l.test
    } catch ( m ) {
      b.deleteExpando = !1
    }
    e = W.createElement( "input" ), e.setAttribute( "value", "" ), b.input = "" === e.getAttribute( "value" ), e.value = "t", e.setAttribute( "type", "radio" ), b.radioValue = "t" === e.value, e.setAttribute( "checked", "t" ), e.setAttribute( "name", "t" ), g = W.createDocumentFragment(), g.appendChild( e ), b.appendChecked = e.checked, b.checkClone = g.cloneNode( !0 ).cloneNode( !0 ).lastChild.checked, l.attachEvent && ( l.attachEvent( "onclick", function () {
      b.noCloneEvent = !1
    } ), l.cloneNode( !0 ).click() );
    for ( k in {
        submit: !0,
        change: !0,
        focusin: !0
      } ) l.setAttribute( i = "on" + k, "t" ), b[ k + "Bubbles" ] = i in a || l.attributes[ i ].expando === !1;
    return l.style.backgroundClip = "content-box", l.cloneNode( !0 ).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip, ia( function () {
      var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
        g = W.getElementsByTagName( "body" )[ 0 ];
      g && ( c = W.createElement( "div" ), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild( c ).appendChild( l ), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName( "td" ), e[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[ 0 ].offsetHeight, e[ 0 ].style.display = "", e[ 1 ].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[ 0 ].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === l.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== g.offsetTop, a.getComputedStyle && ( b.pixelPosition = "1%" !== ( a.getComputedStyle( l, null ) || {} ).top, b.boxSizingReliable = "4px" === ( a.getComputedStyle( l, null ) || {
        width: "4px"
      } ).width, d = l.appendChild( W.createElement( "div" ) ), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat( ( a.getComputedStyle( d, null ) || {} ).marginRight ) ), typeof l.style.zoom !== V && ( l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && ( g.style.zoom = 1 ) ), g.removeChild( c ), c = l = e = d = null )
    } ), c = f = g = h = d = e = null, b
  }();
  var ya = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    za = /([A-Z])/g;
  ia.extend( {
    cache: {},
    expando: "jQuery" + ( aa + Math.random() ).replace( /\D/g, "" ),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function ( a ) {
      return a = a.nodeType ? ia.cache[ a[ ia.expando ] ] : a[ ia.expando ], !!a && !h( a )
    },
    data: function ( a, b, c ) {
      return e( a, b, c )
    },
    removeData: function ( a, b ) {
      return f( a, b )
    },
    _data: function ( a, b, c ) {
      return e( a, b, c, !0 )
    },
    _removeData: function ( a, b ) {
      return f( a, b, !0 )
    },
    acceptData: function ( a ) {
      if ( a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType ) return !1;
      var b = a.nodeName && ia.noData[ a.nodeName.toLowerCase() ];
      return !b || b !== !0 && a.getAttribute( "classid" ) === b
    }
  } ), ia.fn.extend( {
    data: function ( a, c ) {
      var d, e, f = this[ 0 ],
        h = 0,
        i = null;
      if ( a === b ) {
        if ( this.length && ( i = ia.data( f ), 1 === f.nodeType && !ia._data( f, "parsedAttrs" ) ) ) {
          for ( d = f.attributes; h < d.length; h++ ) e = d[ h ].name, e.indexOf( "data-" ) || ( e = ia.camelCase( e.slice( 5 ) ), g( f, e, i[ e ] ) );
          ia._data( f, "parsedAttrs", !0 )
        }
        return i
      }
      return "object" == typeof a ? this.each( function () {
        ia.data( this, a )
      } ) : ia.access( this, function ( c ) {
        return c === b ? f ? g( f, a, ia.data( f, a ) ) : null : void this.each( function () {
          ia.data( this, a, c )
        } )
      }, null, c, arguments.length > 1, null, !0 )
    },
    removeData: function ( a ) {
      return this.each( function () {
        ia.removeData( this, a )
      } )
    }
  } ), ia.extend( {
    queue: function ( a, b, c ) {
      var d;
      return a ? ( b = ( b || "fx" ) + "queue", d = ia._data( a, b ), c && ( !d || ia.isArray( c ) ? d = ia._data( a, b, ia.makeArray( c ) ) : d.push( c ) ), d || [] ) : void 0
    },
    dequeue: function ( a, b ) {
      b = b || "fx";
      var c = ia.queue( a, b ),
        d = c.length,
        e = c.shift(),
        f = ia._queueHooks( a, b ),
        g = function () {
          ia.dequeue( a, b )
        };
      "inprogress" === e && ( e = c.shift(), d-- ), f.cur = e, e && ( "fx" === b && c.unshift( "inprogress" ), delete f.stop, e.call( a, g, f ) ), !d && f && f.empty.fire()
    },
    _queueHooks: function ( a, b ) {
      var c = b + "queueHooks";
      return ia._data( a, c ) || ia._data( a, c, {
        empty: ia.Callbacks( "once memory" ).add( function () {
          ia._removeData( a, b + "queue" ), ia._removeData( a, c )
        } )
      } )
    }
  } ), ia.fn.extend( {
    queue: function ( a, c ) {
      var d = 2;
      return "string" != typeof a && ( c = a, a = "fx", d-- ), arguments.length < d ? ia.queue( this[ 0 ], a ) : c === b ? this : this.each( function () {
        var b = ia.queue( this, a, c );
        ia._queueHooks( this, a ), "fx" === a && "inprogress" !== b[ 0 ] && ia.dequeue( this, a )
      } )
    },
    dequeue: function ( a ) {
      return this.each( function () {
        ia.dequeue( this, a )
      } )
    },
    delay: function ( a, b ) {
      return a = ia.fx ? ia.fx.speeds[ a ] || a : a, b = b || "fx", this.queue( b, function ( b, c ) {
        var d = setTimeout( b, a );
        c.stop = function () {
          clearTimeout( d )
        }
      } )
    },
    clearQueue: function ( a ) {
      return this.queue( a || "fx", [] )
    },
    promise: function ( a, c ) {
      var d, e = 1,
        f = ia.Deferred(),
        g = this,
        h = this.length,
        i = function () {
          --e || f.resolveWith( g, [ g ] )
        };
      for ( "string" != typeof a && ( c = a, a = b ), a = a || "fx"; h--; ) d = ia._data( g[ h ], a + "queueHooks" ), d && d.empty && ( e++, d.empty.add( i ) );
      return i(), f.promise( c )
    }
  } );
  var Aa, Ba, Ca = /[\t\r\n]/g,
    Da = /\r/g,
    Ea = /^(?:input|select|textarea|button|object)$/i,
    Fa = /^(?:a|area)$/i,
    Ga = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
    Ha = /^(?:checked|selected)$/i,
    Ia = ia.support.getSetAttribute,
    Ja = ia.support.input;
  ia.fn.extend( {
    attr: function ( a, b ) {
      return ia.access( this, ia.attr, a, b, arguments.length > 1 )
    },
    removeAttr: function ( a ) {
      return this.each( function () {
        ia.removeAttr( this, a )
      } )
    },
    prop: function ( a, b ) {
      return ia.access( this, ia.prop, a, b, arguments.length > 1 )
    },
    removeProp: function ( a ) {
      return a = ia.propFix[ a ] || a, this.each( function () {
        try {
          this[ a ] = b, delete this[ a ]
        } catch ( c ) {}
      } )
    },
    addClass: function ( a ) {
      var b, c, d, e, f, g = 0,
        h = this.length,
        i = "string" == typeof a && a;
      if ( ia.isFunction( a ) ) return this.each( function ( b ) {
        ia( this ).addClass( a.call( this, b, this.className ) )
      } );
      if ( i )
        for ( b = ( a || "" ).match( ka ) || []; h > g; g++ )
          if ( c = this[ g ], d = 1 === c.nodeType && ( c.className ? ( " " + c.className + " " ).replace( Ca, " " ) : " " ) ) {
            for ( f = 0; e = b[ f++ ]; ) d.indexOf( " " + e + " " ) < 0 && ( d += e + " " );
            c.className = ia.trim( d )
          } return this
    },
    removeClass: function ( a ) {
      var b, c, d, e, f, g = 0,
        h = this.length,
        i = 0 === arguments.length || "string" == typeof a && a;
      if ( ia.isFunction( a ) ) return this.each( function ( b ) {
        ia( this ).removeClass( a.call( this, b, this.className ) )
      } );
      if ( i )
        for ( b = ( a || "" ).match( ka ) || []; h > g; g++ )
          if ( c = this[ g ], d = 1 === c.nodeType && ( c.className ? ( " " + c.className + " " ).replace( Ca, " " ) : "" ) ) {
            for ( f = 0; e = b[ f++ ]; )
              for ( ; d.indexOf( " " + e + " " ) >= 0; ) d = d.replace( " " + e + " ", " " );
            c.className = a ? ia.trim( d ) : ""
          } return this
    },
    toggleClass: function ( a, b ) {
      var c = typeof a,
        d = "boolean" == typeof b;
      return ia.isFunction( a ) ? this.each( function ( c ) {
        ia( this ).toggleClass( a.call( this, c, this.className, b ), b )
      } ) : this.each( function () {
        if ( "string" === c )
          for ( var e, f = 0, g = ia( this ), h = b, i = a.match( ka ) || []; e = i[ f++ ]; ) h = d ? h : !g.hasClass( e ), g[ h ? "addClass" : "removeClass" ]( e );
        else( c === V || "boolean" === c ) && ( this.className && ia._data( this, "__className__", this.className ), this.className = this.className || a === !1 ? "" : ia._data( this, "__className__" ) || "" )
      } )
    },
    hasClass: function ( a ) {
      for ( var b = " " + a + " ", c = 0, d = this.length; d > c; c++ )
        if ( 1 === this[ c ].nodeType && ( " " + this[ c ].className + " " ).replace( Ca, " " ).indexOf( b ) >= 0 ) return !0;
      return !1
    },
    val: function ( a ) {
      var c, d, e, f = this[ 0 ]; {
        if ( arguments.length ) return e = ia.isFunction( a ), this.each( function ( c ) {
          var f, g = ia( this );
          1 === this.nodeType && ( f = e ? a.call( this, c, g.val() ) : a, null == f ? f = "" : "number" == typeof f ? f += "" : ia.isArray( f ) && ( f = ia.map( f, function ( a ) {
            return null == a ? "" : a + ""
          } ) ), d = ia.valHooks[ this.type ] || ia.valHooks[ this.nodeName.toLowerCase() ], d && "set" in d && d.set( this, f, "value" ) !== b || ( this.value = f ) )
        } );
        if ( f ) return d = ia.valHooks[ f.type ] || ia.valHooks[ f.nodeName.toLowerCase() ], d && "get" in d && ( c = d.get( f, "value" ) ) !== b ? c : ( c = f.value, "string" == typeof c ? c.replace( Da, "" ) : null == c ? "" : c )
      }
    }
  } ), ia.extend( {
    valHooks: {
      option: {
        get: function ( a ) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text
        }
      },
      select: {
        get: function ( a ) {
          for ( var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++ )
            if ( c = d[ i ], ( c.selected || i === e ) && ( ia.support.optDisabled ? !c.disabled : null === c.getAttribute( "disabled" ) ) && ( !c.parentNode.disabled || !ia.nodeName( c.parentNode, "optgroup" ) ) ) {
              if ( b = ia( c ).val(), f ) return b;
              g.push( b )
            } return g
        },
        set: function ( a, b ) {
          var c = ia.makeArray( b );
          return ia( a ).find( "option" ).each( function () {
            this.selected = ia.inArray( ia( this ).val(), c ) >= 0
          } ), c.length || ( a.selectedIndex = -1 ), c
        }
      }
    },
    attr: function ( a, c, d ) {
      var e, f, g, h = a.nodeType;
      if ( a && 3 !== h && 8 !== h && 2 !== h ) return typeof a.getAttribute === V ? ia.prop( a, c, d ) : ( f = 1 !== h || !ia.isXMLDoc( a ), f && ( c = c.toLowerCase(), e = ia.attrHooks[ c ] || ( Ga.test( c ) ? Ba : Aa ) ), d === b ? e && f && "get" in e && null !== ( g = e.get( a, c ) ) ? g : ( typeof a.getAttribute !== V && ( g = a.getAttribute( c ) ), null == g ? b : g ) : null !== d ? e && f && "set" in e && ( g = e.set( a, d, c ) ) !== b ? g : ( a.setAttribute( c, d + "" ), d ) : void ia.removeAttr( a, c ) )
    },
    removeAttr: function ( a, b ) {
      var c, d, e = 0,
        f = b && b.match( ka );
      if ( f && 1 === a.nodeType )
        for ( ; c = f[ e++ ]; ) d = ia.propFix[ c ] || c, Ga.test( c ) ? !Ia && Ha.test( c ) ? a[ ia.camelCase( "default-" + c ) ] = a[ d ] = !1 : a[ d ] = !1 : ia.attr( a, c, "" ), a.removeAttribute( Ia ? c : d )
    },
    attrHooks: {
      type: {
        set: function ( a, b ) {
          if ( !ia.support.radioValue && "radio" === b && ia.nodeName( a, "input" ) ) {
            var c = a.value;
            return a.setAttribute( "type", b ), c && ( a.value = c ), b
          }
        }
      }
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    prop: function ( a, c, d ) {
      var e, f, g, h = a.nodeType;
      if ( a && 3 !== h && 8 !== h && 2 !== h ) return g = 1 !== h || !ia.isXMLDoc( a ), g && ( c = ia.propFix[ c ] || c, f = ia.propHooks[ c ] ), d !== b ? f && "set" in f && ( e = f.set( a, d, c ) ) !== b ? e : a[ c ] = d : f && "get" in f && null !== ( e = f.get( a, c ) ) ? e : a[ c ]
    },
    propHooks: {
      tabIndex: {
        get: function ( a ) {
          var c = a.getAttributeNode( "tabindex" );
          return c && c.specified ? parseInt( c.value, 10 ) : Ea.test( a.nodeName ) || Fa.test( a.nodeName ) && a.href ? 0 : b
        }
      }
    }
  } ), Ba = {
    get: function ( a, c ) {
      var d = ia.prop( a, c ),
        e = "boolean" == typeof d && a.getAttribute( c ),
        f = "boolean" == typeof d ? Ja && Ia ? null != e : Ha.test( c ) ? a[ ia.camelCase( "default-" + c ) ] : !!e : a.getAttributeNode( c );
      return f && f.value !== !1 ? c.toLowerCase() : b
    },
    set: function ( a, b, c ) {
      return b === !1 ? ia.removeAttr( a, c ) : Ja && Ia || !Ha.test( c ) ? a.setAttribute( !Ia && ia.propFix[ c ] || c, c ) : a[ ia.camelCase( "default-" + c ) ] = a[ c ] = !0, c
    }
  }, Ja && Ia || ( ia.attrHooks.value = {
    get: function ( a, c ) {
      var d = a.getAttributeNode( c );
      return ia.nodeName( a, "input" ) ? a.defaultValue : d && d.specified ? d.value : b
    },
    set: function ( a, b, c ) {
      return ia.nodeName( a, "input" ) ? void( a.defaultValue = b ) : Aa && Aa.set( a, b, c )
    }
  } ), Ia || ( Aa = ia.valHooks.button = {
    get: function ( a, c ) {
      var d = a.getAttributeNode( c );
      return d && ( "id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified ) ? d.value : b
    },
    set: function ( a, c, d ) {
      var e = a.getAttributeNode( d );
      return e || a.setAttributeNode( e = a.ownerDocument.createAttribute( d ) ), e.value = c += "", "value" === d || c === a.getAttribute( d ) ? c : b
    }
  }, ia.attrHooks.contenteditable = {
    get: Aa.get,
    set: function ( a, b, c ) {
      Aa.set( a, "" === b ? !1 : b, c )
    }
  }, ia.each( [ "width", "height" ], function ( a, b ) {
    ia.attrHooks[ b ] = ia.extend( ia.attrHooks[ b ], {
      set: function ( a, c ) {
        return "" === c ? ( a.setAttribute( b, "auto" ), c ) : void 0
      }
    } )
  } ) ), ia.support.hrefNormalized || ( ia.each( [ "href", "src", "width", "height" ], function ( a, c ) {
    ia.attrHooks[ c ] = ia.extend( ia.attrHooks[ c ], {
      get: function ( a ) {
        var d = a.getAttribute( c, 2 );
        return null == d ? b : d
      }
    } )
  } ), ia.each( [ "href", "src" ], function ( a, b ) {
    ia.propHooks[ b ] = {
      get: function ( a ) {
        return a.getAttribute( b, 4 )
      }
    }
  } ) ), ia.support.style || ( ia.attrHooks.style = {
    get: function ( a ) {
      return a.style.cssText || b
    },
    set: function ( a, b ) {
      return a.style.cssText = b + ""
    }
  } ), ia.support.optSelected || ( ia.propHooks.selected = ia.extend( ia.propHooks.selected, {
    get: function ( a ) {
      var b = a.parentNode;
      return b && ( b.selectedIndex, b.parentNode && b.parentNode.selectedIndex ), null
    }
  } ) ), ia.support.enctype || ( ia.propFix.enctype = "encoding" ), ia.support.checkOn || ia.each( [ "radio", "checkbox" ], function () {
    ia.valHooks[ this ] = {
      get: function ( a ) {
        return null === a.getAttribute( "value" ) ? "on" : a.value
      }
    }
  } ), ia.each( [ "radio", "checkbox" ], function () {
    ia.valHooks[ this ] = ia.extend( ia.valHooks[ this ], {
      set: function ( a, b ) {
        return ia.isArray( b ) ? a.checked = ia.inArray( ia( a ).val(), b ) >= 0 : void 0
      }
    } )
  } );
  var Ka = /^(?:input|select|textarea)$/i,
    La = /^key/,
    Ma = /^(?:mouse|contextmenu)|click/,
    Na = /^(?:focusinfocus|focusoutblur)$/,
    Oa = /^([^.]*)(?:\.(.+)|)$/;
  ia.event = {
      global: {},
      add: function ( a, c, d, e, f ) {
        var g, h, i, j, k, l, m, n, o, p, q, r = ia._data( a );
        if ( r ) {
          for ( d.handler && ( j = d, d = j.handler, f = j.selector ), d.guid || ( d.guid = ia.guid++ ), ( h = r.events ) || ( h = r.events = {} ), ( l = r.handle ) || ( l = r.handle = function ( a ) {
              return typeof ia === V || a && ia.event.triggered === a.type ? b : ia.event.dispatch.apply( l.elem, arguments )
            }, l.elem = a ), c = ( c || "" ).match( ka ) || [ "" ], i = c.length; i--; ) g = Oa.exec( c[ i ] ) || [], o = q = g[ 1 ], p = ( g[ 2 ] || "" ).split( "." ).sort(), k = ia.event.special[ o ] || {}, o = ( f ? k.delegateType : k.bindType ) || o, k = ia.event.special[ o ] || {}, m = ia.extend( {
            type: o,
            origType: q,
            data: e,
            handler: d,
            guid: d.guid,
            selector: f,
            needsContext: f && ia.expr.match.needsContext.test( f ),
            namespace: p.join( "." )
          }, j ), ( n = h[ o ] ) || ( n = h[ o ] = [], n.delegateCount = 0, k.setup && k.setup.call( a, e, p, l ) !== !1 || ( a.addEventListener ? a.addEventListener( o, l, !1 ) : a.attachEvent && a.attachEvent( "on" + o, l ) ) ), k.add && ( k.add.call( a, m ), m.handler.guid || ( m.handler.guid = d.guid ) ), f ? n.splice( n.delegateCount++, 0, m ) : n.push( m ), ia.event.global[ o ] = !0;
          a = null
        }
      },
      remove: function ( a, b, c, d, e ) {
        var f, g, h, i, j, k, l, m, n, o, p, q = ia.hasData( a ) && ia._data( a );
        if ( q && ( k = q.events ) ) {
          for ( b = ( b || "" ).match( ka ) || [ "" ], j = b.length; j--; )
            if ( h = Oa.exec( b[ j ] ) || [], n = p = h[ 1 ], o = ( h[ 2 ] || "" ).split( "." ).sort(), n ) {
              for ( l = ia.event.special[ n ] || {}, n = ( d ? l.delegateType : l.bindType ) || n, m = k[ n ] || [], h = h[ 2 ] && new RegExp( "(^|\\.)" + o.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ), i = f = m.length; f--; ) g = m[ f ], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test( g.namespace ) || d && d !== g.selector && ( "**" !== d || !g.selector ) || ( m.splice( f, 1 ), g.selector && m.delegateCount--, l.remove && l.remove.call( a, g ) );
              i && !m.length && ( l.teardown && l.teardown.call( a, o, q.handle ) !== !1 || ia.removeEvent( a, n, q.handle ), delete k[ n ] )
            } else
              for ( n in k ) ia.event.remove( a, n + b[ j ], c, d, !0 );
          ia.isEmptyObject( k ) && ( delete q.handle, ia._removeData( a, "events" ) )
        }
      },
      trigger: function ( c, d, e, f ) {
        var g, h, i, j, k, l, m, n = [ e || W ],
          o = ga.call( c, "type" ) ? c.type : c,
          p = ga.call( c, "namespace" ) ? c.namespace.split( "." ) : [];
        if ( i = l = e = e || W, 3 !== e.nodeType && 8 !== e.nodeType && !Na.test( o + ia.event.triggered ) && ( o.indexOf( "." ) >= 0 && ( p = o.split( "." ), o = p.shift(), p.sort() ), h = o.indexOf( ":" ) < 0 && "on" + o, c = c[ ia.expando ] ? c : new ia.Event( o, "object" == typeof c && c ), c.isTrigger = !0, c.namespace = p.join( "." ), c.namespace_re = c.namespace ? new RegExp( "(^|\\.)" + p.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) : null, c.result = b, c.target || ( c.target = e ), d = null == d ? [ c ] : ia.makeArray( d, [ c ] ), k = ia.event.special[ o ] || {}, f || !k.trigger || k.trigger.apply( e, d ) !== !1 ) ) {
          if ( !f && !k.noBubble && !ia.isWindow( e ) ) {
            for ( j = k.delegateType || o, Na.test( j + o ) || ( i = i.parentNode ); i; i = i.parentNode ) n.push( i ), l = i;
            l === ( e.ownerDocument || W ) && n.push( l.defaultView || l.parentWindow || a )
          }
          for ( m = 0;
            ( i = n[ m++ ] ) && !c.isPropagationStopped(); ) c.type = m > 1 ? j : k.bindType || o, g = ( ia._data( i, "events" ) || {} )[ c.type ] && ia._data( i, "handle" ), g && g.apply( i, d ), g = h && i[ h ], g && ia.acceptData( i ) && g.apply && g.apply( i, d ) === !1 && c.preventDefault();
          if ( c.type = o, !f && !c.isDefaultPrevented() && ( !k._default || k._default.apply( e.ownerDocument, d ) === !1 ) && ( "click" !== o || !ia.nodeName( e, "a" ) ) && ia.acceptData( e ) && h && e[ o ] && !ia.isWindow( e ) ) {
            l = e[ h ], l && ( e[ h ] = null ), ia.event.triggered = o;
            try {
              e[ o ]()
            } catch ( q ) {}
            ia.event.triggered = b, l && ( e[ h ] = l )
          }
          return c.result
        }
      },
      dispatch: function ( a ) {
        a = ia.event.fix( a );
        var c, d, e, f, g, h = [],
          i = da.call( arguments ),
          j = ( ia._data( this, "events" ) || {} )[ a.type ] || [],
          k = ia.event.special[ a.type ] || {};
        if ( i[ 0 ] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call( this, a ) !== !1 ) {
          for ( h = ia.event.handlers.call( this, a, j ), c = 0;
            ( f = h[ c++ ] ) && !a.isPropagationStopped(); )
            for ( a.currentTarget = f.elem, g = 0;
              ( e = f.handlers[ g++ ] ) && !a.isImmediatePropagationStopped(); )( !a.namespace_re || a.namespace_re.test( e.namespace ) ) && ( a.handleObj = e, a.data = e.data, d = ( ( ia.event.special[ e.origType ] || {} ).handle || e.handler ).apply( f.elem, i ), d !== b && ( a.result = d ) === !1 && ( a.preventDefault(), a.stopPropagation() ) );
          return k.postDispatch && k.postDispatch.call( this, a ), a.result
        }
      },
      handlers: function ( a, c ) {
        var d, e, f, g, h = [],
          i = c.delegateCount,
          j = a.target;
        if ( i && j.nodeType && ( !a.button || "click" !== a.type ) )
          for ( ; j != this; j = j.parentNode || this )
            if ( 1 === j.nodeType && ( j.disabled !== !0 || "click" !== a.type ) ) {
              for ( f = [], g = 0; i > g; g++ ) e = c[ g ], d = e.selector + " ", f[ d ] === b && ( f[ d ] = e.needsContext ? ia( d, this ).index( j ) >= 0 : ia.find( d, this, null, [ j ] ).length ), f[ d ] && f.push( e );
              f.length && h.push( {
                elem: j,
                handlers: f
              } )
            } return i < c.length && h.push( {
          elem: this,
          handlers: c.slice( i )
        } ), h
      },
      fix: function ( a ) {
        if ( a[ ia.expando ] ) return a;
        var b, c, d, e = a.type,
          f = a,
          g = this.fixHooks[ e ];
        for ( g || ( this.fixHooks[ e ] = g = Ma.test( e ) ? this.mouseHooks : La.test( e ) ? this.keyHooks : {} ), d = g.props ? this.props.concat( g.props ) : this.props, a = new ia.Event( f ), b = d.length; b--; ) c = d[ b ], a[ c ] = f[ c ];
        return a.target || ( a.target = f.srcElement || W ), 3 === a.target.nodeType && ( a.target = a.target.parentNode ), a.metaKey = !!a.metaKey, g.filter ? g.filter( a, f ) : a
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split( " " ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split( " " ),
        filter: function ( a, b ) {
          return null == a.which && ( a.which = null != b.charCode ? b.charCode : b.keyCode ), a
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split( " " ),
        filter: function ( a, c ) {
          var d, e, f, g = c.button,
            h = c.fromElement;
          return null == a.pageX && null != c.clientX && ( e = a.target.ownerDocument || W, f = e.documentElement, d = e.body, a.pageX = c.clientX + ( f && f.scrollLeft || d && d.scrollLeft || 0 ) - ( f && f.clientLeft || d && d.clientLeft || 0 ), a.pageY = c.clientY + ( f && f.scrollTop || d && d.scrollTop || 0 ) - ( f && f.clientTop || d && d.clientTop || 0 ) ), !a.relatedTarget && h && ( a.relatedTarget = h === a.target ? c.toElement : h ), a.which || g === b || ( a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0 ), a
        }
      },
      special: {
        load: {
          noBubble: !0
        },
        click: {
          trigger: function () {
            return ia.nodeName( this, "input" ) && "checkbox" === this.type && this.click ? ( this.click(), !1 ) : void 0
          }
        },
        focus: {
          trigger: function () {
            if ( this !== W.activeElement && this.focus ) try {
              return this.focus(), !1
            } catch ( a ) {}
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function () {
            return this === W.activeElement && this.blur ? ( this.blur(), !1 ) : void 0
          },
          delegateType: "focusout"
        },
        beforeunload: {
          postDispatch: function ( a ) {
            a.result !== b && ( a.originalEvent.returnValue = a.result )
          }
        }
      },
      simulate: function ( a, b, c, d ) {
        var e = ia.extend( new ia.Event, c, {
          type: a,
          isSimulated: !0,
          originalEvent: {}
        } );
        d ? ia.event.trigger( e, null, b ) : ia.event.dispatch.call( b, e ), e.isDefaultPrevented() && c.preventDefault()
      }
    }, ia.removeEvent = W.removeEventListener ? function ( a, b, c ) {
      a.removeEventListener && a.removeEventListener( b, c, !1 )
    } : function ( a, b, c ) {
      var d = "on" + b;
      a.detachEvent && ( typeof a[ d ] === V && ( a[ d ] = null ), a.detachEvent( d, c ) )
    }, ia.Event = function ( a, b ) {
      return this instanceof ia.Event ? ( a && a.type ? ( this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j ) : this.type = a, b && ia.extend( this, b ), this.timeStamp = a && a.timeStamp || ia.now(), void( this[ ia.expando ] = !0 ) ) : new ia.Event( a, b )
    }, ia.Event.prototype = {
      isDefaultPrevented: j,
      isPropagationStopped: j,
      isImmediatePropagationStopped: j,
      preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = i, a && ( a.preventDefault ? a.preventDefault() : a.returnValue = !1 )
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = i, a && ( a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0 )
      },
      stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = i, this.stopPropagation()
      }
    }, ia.each( {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    }, function ( a, b ) {
      ia.event.special[ a ] = {
        delegateType: b,
        bindType: b,
        handle: function ( a ) {
          var c, d = this,
            e = a.relatedTarget,
            f = a.handleObj;
          return ( !e || e !== d && !ia.contains( d, e ) ) && ( a.type = f.origType, c = f.handler.apply( this, arguments ), a.type = b ), c
        }
      }
    } ), ia.support.submitBubbles || ( ia.event.special.submit = {
      setup: function () {
        return ia.nodeName( this, "form" ) ? !1 : void ia.event.add( this, "click._submit keypress._submit", function ( a ) {
          var c = a.target,
            d = ia.nodeName( c, "input" ) || ia.nodeName( c, "button" ) ? c.form : b;
          d && !ia._data( d, "submitBubbles" ) && ( ia.event.add( d, "submit._submit", function ( a ) {
            a._submit_bubble = !0
          } ), ia._data( d, "submitBubbles", !0 ) )
        } )
      },
      postDispatch: function ( a ) {
        a._submit_bubble && ( delete a._submit_bubble, this.parentNode && !a.isTrigger && ia.event.simulate( "submit", this.parentNode, a, !0 ) )
      },
      teardown: function () {
        return ia.nodeName( this, "form" ) ? !1 : void ia.event.remove( this, "._submit" )
      }
    } ), ia.support.changeBubbles || ( ia.event.special.change = {
      setup: function () {
        return Ka.test( this.nodeName ) ? ( ( "checkbox" === this.type || "radio" === this.type ) && ( ia.event.add( this, "propertychange._change", function ( a ) {
          "checked" === a.originalEvent.propertyName && ( this._just_changed = !0 )
        } ), ia.event.add( this, "click._change", function ( a ) {
          this._just_changed && !a.isTrigger && ( this._just_changed = !1 ), ia.event.simulate( "change", this, a, !0 )
        } ) ), !1 ) : void ia.event.add( this, "beforeactivate._change", function ( a ) {
          var b = a.target;
          Ka.test( b.nodeName ) && !ia._data( b, "changeBubbles" ) && ( ia.event.add( b, "change._change", function ( a ) {
            !this.parentNode || a.isSimulated || a.isTrigger || ia.event.simulate( "change", this.parentNode, a, !0 )
          } ), ia._data( b, "changeBubbles", !0 ) )
        } )
      },
      handle: function ( a ) {
        var b = a.target;
        return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply( this, arguments ) : void 0
      },
      teardown: function () {
        return ia.event.remove( this, "._change" ), !Ka.test( this.nodeName )
      }
    } ), ia.support.focusinBubbles || ia.each( {
      focus: "focusin",
      blur: "focusout"
    }, function ( a, b ) {
      var c = 0,
        d = function ( a ) {
          ia.event.simulate( b, a.target, ia.event.fix( a ), !0 )
        };
      ia.event.special[ b ] = {
        setup: function () {
          0 === c++ && W.addEventListener( a, d, !0 )
        },
        teardown: function () {
          0 === --c && W.removeEventListener( a, d, !0 )
        }
      }
    } ), ia.fn.extend( {
      on: function ( a, c, d, e, f ) {
        var g, h;
        if ( "object" == typeof a ) {
          "string" != typeof c && ( d = d || c, c = b );
          for ( g in a ) this.on( g, c, d, a[ g ], f );
          return this
        }
        if ( null == d && null == e ? ( e = c, d = c = b ) : null == e && ( "string" == typeof c ? ( e = d, d = b ) : ( e = d, d = c, c = b ) ), e === !1 ) e = j;
        else if ( !e ) return this;
        return 1 === f && ( h = e, e = function ( a ) {
          return ia().off( a ), h.apply( this, arguments )
        }, e.guid = h.guid || ( h.guid = ia.guid++ ) ), this.each( function () {
          ia.event.add( this, a, e, d, c )
        } )
      },
      one: function ( a, b, c, d ) {
        return this.on( a, b, c, d, 1 )
      },
      off: function ( a, c, d ) {
        var e, f;
        if ( a && a.preventDefault && a.handleObj ) return e = a.handleObj, ia( a.delegateTarget ).off( e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler ), this;
        if ( "object" == typeof a ) {
          for ( f in a ) this.off( f, c, a[ f ] );
          return this
        }
        return ( c === !1 || "function" == typeof c ) && ( d = c, c = b ), d === !1 && ( d = j ), this.each( function () {
          ia.event.remove( this, a, d, c )
        } )
      },
      bind: function ( a, b, c ) {
        return this.on( a, null, b, c )
      },
      unbind: function ( a, b ) {
        return this.off( a, null, b )
      },
      delegate: function ( a, b, c, d ) {
        return this.on( b, a, c, d )
      },
      undelegate: function ( a, b, c ) {
        return 1 === arguments.length ? this.off( a, "**" ) : this.off( b, a || "**", c )
      },
      trigger: function ( a, b ) {
        return this.each( function () {
          ia.event.trigger( a, b, this )
        } )
      },
      triggerHandler: function ( a, b ) {
        var c = this[ 0 ];
        return c ? ia.event.trigger( a, b, c, !0 ) : void 0
      }
    } ),
    function ( a, b ) {
      function c( a ) {
        return oa.test( a + "" )
      }

      function d() {
        var a, b = [];
        return a = function ( c, d ) {
          return b.push( c += " " ) > y.cacheLength && delete a[ b.shift() ], a[ c ] = d
        }
      }

      function e( a ) {
        return a[ N ] = !0, a
      }

      function f( a ) {
        var b = F.createElement( "div" );
        try {
          return a( b )
        } catch ( c ) {
          return !1
        } finally {
          b = null
        }
      }

      function g( a, b, c, d ) {
        var e, f, g, h, i, j, k, n, o, p;
        if ( ( b ? b.ownerDocument || b : O ) !== F && E( b ), b = b || F, c = c || [], !a || "string" != typeof a ) return c;
        if ( 1 !== ( h = b.nodeType ) && 9 !== h ) return [];
        if ( !H && !d ) {
          if ( e = pa.exec( a ) )
            if ( g = e[ 1 ] ) {
              if ( 9 === h ) {
                if ( f = b.getElementById( g ), !f || !f.parentNode ) return c;
                if ( f.id === g ) return c.push( f ), c
              } else if ( b.ownerDocument && ( f = b.ownerDocument.getElementById( g ) ) && L( b, f ) && f.id === g ) return c.push( f ), c
            } else {
              if ( e[ 2 ] ) return Z.apply( c, $.call( b.getElementsByTagName( a ), 0 ) ), c;
              if ( ( g = e[ 3 ] ) && P.getByClassName && b.getElementsByClassName ) return Z.apply( c, $.call( b.getElementsByClassName( g ), 0 ) ), c
            } if ( P.qsa && !I.test( a ) ) {
            if ( k = !0, n = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase() ) {
              for ( j = l( a ), ( k = b.getAttribute( "id" ) ) ? n = k.replace( sa, "\\$&" ) : b.setAttribute( "id", n ), n = "[id='" + n + "'] ", i = j.length; i--; ) j[ i ] = n + m( j[ i ] );
              o = na.test( a ) && b.parentNode || b, p = j.join( "," )
            }
            if ( p ) try {
              return Z.apply( c, $.call( o.querySelectorAll( p ), 0 ) ), c
            } catch ( q ) {} finally {
              k || b.removeAttribute( "id" )
            }
          }
        }
        return u( a.replace( ga, "$1" ), b, c, d )
      }

      function h( a, b ) {
        var c = b && a,
          d = c && ( ~b.sourceIndex || W ) - ( ~a.sourceIndex || W );
        if ( d ) return d;
        if ( c )
          for ( ; c = c.nextSibling; )
            if ( c === b ) return -1;
        return a ? 1 : -1
      }

      function i( a ) {
        return function ( b ) {
          var c = b.nodeName.toLowerCase();
          return "input" === c && b.type === a
        }
      }

      function j( a ) {
        return function ( b ) {
          var c = b.nodeName.toLowerCase();
          return ( "input" === c || "button" === c ) && b.type === a
        }
      }

      function k( a ) {
        return e( function ( b ) {
          return b = +b, e( function ( c, d ) {
            for ( var e, f = a( [], c.length, b ), g = f.length; g--; ) c[ e = f[ g ] ] && ( c[ e ] = !( d[ e ] = c[ e ] ) )
          } )
        } )
      }

      function l( a, b ) {
        var c, d, e, f, h, i, j, k = T[ a + " " ];
        if ( k ) return b ? 0 : k.slice( 0 );
        for ( h = a, i = [], j = y.preFilter; h; ) {
          ( !c || ( d = ha.exec( h ) ) ) && ( d && ( h = h.slice( d[ 0 ].length ) || h ), i.push( e = [] ) ), c = !1, ( d = ja.exec( h ) ) && ( c = d.shift(), e.push( {
            value: c,
            type: d[ 0 ].replace( ga, " " )
          } ), h = h.slice( c.length ) );
          for ( f in y.filter ) !( d = ma[ f ].exec( h ) ) || j[ f ] && !( d = j[ f ]( d ) ) || ( c = d.shift(), e.push( {
            value: c,
            type: f,
            matches: d
          } ), h = h.slice( c.length ) );
          if ( !c ) break
        }
        return b ? h.length : h ? g.error( a ) : T( a, i ).slice( 0 )
      }

      function m( a ) {
        for ( var b = 0, c = a.length, d = ""; c > b; b++ ) d += a[ b ].value;
        return d
      }

      function n( a, b, c ) {
        var d = b.dir,
          e = c && "parentNode" === d,
          f = R++;
        return b.first ? function ( b, c, f ) {
          for ( ; b = b[ d ]; )
            if ( 1 === b.nodeType || e ) return a( b, c, f )
        } : function ( b, c, g ) {
          var h, i, j, k = Q + " " + f;
          if ( g ) {
            for ( ; b = b[ d ]; )
              if ( ( 1 === b.nodeType || e ) && a( b, c, g ) ) return !0
          } else
            for ( ; b = b[ d ]; )
              if ( 1 === b.nodeType || e )
                if ( j = b[ N ] || ( b[ N ] = {} ), ( i = j[ d ] ) && i[ 0 ] === k ) {
                  if ( ( h = i[ 1 ] ) === !0 || h === x ) return h === !0
                } else if ( i = j[ d ] = [ k ], i[ 1 ] = a( b, c, g ) || x, i[ 1 ] === !0 ) return !0
        }
      }

      function o( a ) {
        return a.length > 1 ? function ( b, c, d ) {
          for ( var e = a.length; e--; )
            if ( !a[ e ]( b, c, d ) ) return !1;
          return !0
        } : a[ 0 ]
      }

      function p( a, b, c, d, e ) {
        for ( var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++ )( f = a[ h ] ) && ( !c || c( f, d, e ) ) && ( g.push( f ), j && b.push( h ) );
        return g
      }

      function q( a, b, c, d, f, g ) {
        return d && !d[ N ] && ( d = q( d ) ), f && !f[ N ] && ( f = q( f, g ) ), e( function ( e, g, h, i ) {
          var j, k, l, m = [],
            n = [],
            o = g.length,
            q = e || t( b || "*", h.nodeType ? [ h ] : h, [] ),
            r = !a || !e && b ? q : p( q, m, a, h, i ),
            s = c ? f || ( e ? a : o || d ) ? [] : g : r;
          if ( c && c( r, s, h, i ), d )
            for ( j = p( s, n ), d( j, [], h, i ), k = j.length; k--; )( l = j[ k ] ) && ( s[ n[ k ] ] = !( r[ n[ k ] ] = l ) );
          if ( e ) {
            if ( f || a ) {
              if ( f ) {
                for ( j = [], k = s.length; k--; )( l = s[ k ] ) && j.push( r[ k ] = l );
                f( null, s = [], j, i )
              }
              for ( k = s.length; k--; )( l = s[ k ] ) && ( j = f ? _.call( e, l ) : m[ k ] ) > -1 && ( e[ j ] = !( g[ j ] = l ) )
            }
          } else s = p( s === g ? s.splice( o, s.length ) : s ), f ? f( null, g, s, i ) : Z.apply( g, s )
        } )
      }

      function r( a ) {
        for ( var b, c, d, e = a.length, f = y.relative[ a[ 0 ].type ], g = f || y.relative[ " " ], h = f ? 1 : 0, i = n( function ( a ) {
            return a === b
          }, g, !0 ), j = n( function ( a ) {
            return _.call( b, a ) > -1
          }, g, !0 ), k = [ function ( a, c, d ) {
            return !f && ( d || c !== D ) || ( ( b = c ).nodeType ? i( a, c, d ) : j( a, c, d ) )
          } ]; e > h; h++ )
          if ( c = y.relative[ a[ h ].type ] ) k = [ n( o( k ), c ) ];
          else {
            if ( c = y.filter[ a[ h ].type ].apply( null, a[ h ].matches ), c[ N ] ) {
              for ( d = ++h; e > d && !y.relative[ a[ d ].type ]; d++ );
              return q( h > 1 && o( k ), h > 1 && m( a.slice( 0, h - 1 ) ).replace( ga, "$1" ), c, d > h && r( a.slice( h, d ) ), e > d && r( a = a.slice( d ) ), e > d && m( a ) )
            }
            k.push( c )
          } return o( k )
      }

      function s( a, b ) {
        var c = 0,
          d = b.length > 0,
          f = a.length > 0,
          h = function ( e, h, i, j, k ) {
            var l, m, n, o = [],
              q = 0,
              r = "0",
              s = e && [],
              t = null != k,
              u = D,
              v = e || f && y.find.TAG( "*", k && h.parentNode || h ),
              w = Q += null == u ? 1 : Math.random() || .1;
            for ( t && ( D = h !== F && h, x = c ); null != ( l = v[ r ] ); r++ ) {
              if ( f && l ) {
                for ( m = 0; n = a[ m++ ]; )
                  if ( n( l, h, i ) ) {
                    j.push( l );
                    break
                  } t && ( Q = w, x = ++c )
              }
              d && ( ( l = !n && l ) && q--, e && s.push( l ) )
            }
            if ( q += r, d && r !== q ) {
              for ( m = 0; n = b[ m++ ]; ) n( s, o, h, i );
              if ( e ) {
                if ( q > 0 )
                  for ( ; r--; ) s[ r ] || o[ r ] || ( o[ r ] = Y.call( j ) );
                o = p( o )
              }
              Z.apply( j, o ), t && !e && o.length > 0 && q + b.length > 1 && g.uniqueSort( j )
            }
            return t && ( Q = w, D = u ), s
          };
        return d ? e( h ) : h
      }

      function t( a, b, c ) {
        for ( var d = 0, e = b.length; e > d; d++ ) g( a, b[ d ], c );
        return c
      }

      function u( a, b, c, d ) {
        var e, f, g, h, i, j = l( a );
        if ( !d && 1 === j.length ) {
          if ( f = j[ 0 ] = j[ 0 ].slice( 0 ), f.length > 2 && "ID" === ( g = f[ 0 ] ).type && 9 === b.nodeType && !H && y.relative[ f[ 1 ].type ] ) {
            if ( b = y.find.ID( g.matches[ 0 ].replace( ua, va ), b )[ 0 ], !b ) return c;
            a = a.slice( f.shift().value.length )
          }
          for ( e = ma.needsContext.test( a ) ? 0 : f.length; e-- && ( g = f[ e ], !y.relative[ h = g.type ] ); )
            if ( ( i = y.find[ h ] ) && ( d = i( g.matches[ 0 ].replace( ua, va ), na.test( f[ 0 ].type ) && b.parentNode || b ) ) ) {
              if ( f.splice( e, 1 ), a = d.length && m( f ), !a ) return Z.apply( c, $.call( d, 0 ) ), c;
              break
            }
        }
        return B( a, j )( d, b, H, c, na.test( a ) ), c
      }

      function v() {}
      var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
        O = a.document,
        P = {},
        Q = 0,
        R = 0,
        S = d(),
        T = d(),
        U = d(),
        V = typeof b,
        W = 1 << 31,
        X = [],
        Y = X.pop,
        Z = X.push,
        $ = X.slice,
        _ = X.indexOf || function ( a ) {
          for ( var b = 0, c = this.length; c > b; b++ )
            if ( this[ b ] === a ) return b;
          return -1
        },
        aa = "[\\x20\\t\\r\\n\\f]",
        ba = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ca = ba.replace( "w", "w#" ),
        da = "([*^$|!~]?=)",
        ea = "\\[" + aa + "*(" + ba + ")" + aa + "*(?:" + da + aa + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ca + ")|)|)" + aa + "*\\]",
        fa = ":(" + ba + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ea.replace( 3, 8 ) + ")*)|.*)\\)|)",
        ga = new RegExp( "^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$", "g" ),
        ha = new RegExp( "^" + aa + "*," + aa + "*" ),
        ja = new RegExp( "^" + aa + "*([\\x20\\t\\r\\n\\f>+~])" + aa + "*" ),
        ka = new RegExp( fa ),
        la = new RegExp( "^" + ca + "$" ),
        ma = {
          ID: new RegExp( "^#(" + ba + ")" ),
          CLASS: new RegExp( "^\\.(" + ba + ")" ),
          NAME: new RegExp( "^\\[name=['\"]?(" + ba + ")['\"]?\\]" ),
          TAG: new RegExp( "^(" + ba.replace( "w", "w*" ) + ")" ),
          ATTR: new RegExp( "^" + ea ),
          PSEUDO: new RegExp( "^" + fa ),
          CHILD: new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)", "i" ),
          needsContext: new RegExp( "^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)", "i" )
        },
        na = /[\x20\t\r\n\f]*[+~]/,
        oa = /^[^{]+\{\s*\[native code/,
        pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        qa = /^(?:input|select|textarea|button)$/i,
        ra = /^h\d$/i,
        sa = /'|\\/g,
        ta = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
        ua = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
        va = function ( a, b ) {
          var c = "0x" + b - 65536;
          return c !== c ? b : 0 > c ? String.fromCharCode( c + 65536 ) : String.fromCharCode( c >> 10 | 55296, 1023 & c | 56320 )
        };
      try {
        $.call( O.documentElement.childNodes, 0 )[ 0 ].nodeType
      } catch ( wa ) {
        $ = function ( a ) {
          for ( var b, c = []; b = this[ a++ ]; ) c.push( b );
          return c
        }
      }
      A = g.isXML = function ( a ) {
        var b = a && ( a.ownerDocument || a ).documentElement;
        return b ? "HTML" !== b.nodeName : !1
      }, E = g.setDocument = function ( a ) {
        var d = a ? a.ownerDocument || a : O;
        return d !== F && 9 === d.nodeType && d.documentElement ? ( F = d, G = d.documentElement, H = A( d ), P.tagNameNoComments = f( function ( a ) {
          return a.appendChild( d.createComment( "" ) ), !a.getElementsByTagName( "*" ).length
        } ), P.attributes = f( function ( a ) {
          a.innerHTML = "<select></select>";
          var b = typeof a.lastChild.getAttribute( "multiple" );
          return "boolean" !== b && "string" !== b
        } ), P.getByClassName = f( function ( a ) {
          return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName( "e" ).length ? ( a.lastChild.className = "e", 2 === a.getElementsByClassName( "e" ).length ) : !1
        } ), P.getByName = f( function ( a ) {
          a.id = N + 0, a.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", G.insertBefore( a, G.firstChild );
          var b = d.getElementsByName && d.getElementsByName( N ).length === 2 + d.getElementsByName( N + 0 ).length;
          return P.getIdNotName = !d.getElementById( N ), G.removeChild( a ), b
        } ), y.attrHandle = f( function ( a ) {
          return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== V && "#" === a.firstChild.getAttribute( "href" )
        } ) ? {} : {
          href: function ( a ) {
            return a.getAttribute( "href", 2 )
          },
          type: function ( a ) {
            return a.getAttribute( "type" )
          }
        }, P.getIdNotName ? ( y.find.ID = function ( a, b ) {
          if ( typeof b.getElementById !== V && !H ) {
            var c = b.getElementById( a );
            return c && c.parentNode ? [ c ] : []
          }
        }, y.filter.ID = function ( a ) {
          var b = a.replace( ua, va );
          return function ( a ) {
            return a.getAttribute( "id" ) === b
          }
        } ) : ( y.find.ID = function ( a, c ) {
          if ( typeof c.getElementById !== V && !H ) {
            var d = c.getElementById( a );
            return d ? d.id === a || typeof d.getAttributeNode !== V && d.getAttributeNode( "id" ).value === a ? [ d ] : b : []
          }
        }, y.filter.ID = function ( a ) {
          var b = a.replace( ua, va );
          return function ( a ) {
            var c = typeof a.getAttributeNode !== V && a.getAttributeNode( "id" );
            return c && c.value === b
          }
        } ), y.find.TAG = P.tagNameNoComments ? function ( a, b ) {
          return typeof b.getElementsByTagName !== V ? b.getElementsByTagName( a ) : void 0
        } : function ( a, b ) {
          var c, d = [],
            e = 0,
            f = b.getElementsByTagName( a );
          if ( "*" === a ) {
            for ( ; c = f[ e++ ]; ) 1 === c.nodeType && d.push( c );
            return d
          }
          return f
        }, y.find.NAME = P.getByName && function ( a, b ) {
          return typeof b.getElementsByName !== V ? b.getElementsByName( name ) : void 0
        }, y.find.CLASS = P.getByClassName && function ( a, b ) {
          return typeof b.getElementsByClassName === V || H ? void 0 : b.getElementsByClassName( a )
        }, J = [], I = [ ":focus" ], ( P.qsa = c( d.querySelectorAll ) ) && ( f( function ( a ) {
          a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll( "[selected]" ).length || I.push( "\\[" + aa + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" ), a.querySelectorAll( ":checked" ).length || I.push( ":checked" )
        } ), f( function ( a ) {
          a.innerHTML = "<input type='hidden' i=''/>", a.querySelectorAll( "[i^='']" ).length && I.push( "[*^$]=" + aa + "*(?:\"\"|'')" ), a.querySelectorAll( ":enabled" ).length || I.push( ":enabled", ":disabled" ), a.querySelectorAll( "*,:x" ), I.push( ",.*:" )
        } ) ), ( P.matchesSelector = c( K = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector ) ) && f( function ( a ) {
          P.disconnectedMatch = K.call( a, "div" ), K.call( a, "[s!='']:x" ), J.push( "!=", fa )
        } ), I = new RegExp( I.join( "|" ) ), J = new RegExp( J.join( "|" ) ), L = c( G.contains ) || G.compareDocumentPosition ? function ( a, b ) {
          var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;
          return a === d || !( !d || 1 !== d.nodeType || !( c.contains ? c.contains( d ) : a.compareDocumentPosition && 16 & a.compareDocumentPosition( d ) ) )
        } : function ( a, b ) {
          if ( b )
            for ( ; b = b.parentNode; )
              if ( b === a ) return !0;
          return !1
        }, M = G.compareDocumentPosition ? function ( a, b ) {
          var c;
          return a === b ? ( C = !0, 0 ) : ( c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b ) ) ? 1 & c || a.parentNode && 11 === a.parentNode.nodeType ? a === d || L( O, a ) ? -1 : b === d || L( O, b ) ? 1 : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
        } : function ( a, b ) {
          var c, e = 0,
            f = a.parentNode,
            g = b.parentNode,
            i = [ a ],
            j = [ b ];
          if ( a === b ) return C = !0, 0;
          if ( !f || !g ) return a === d ? -1 : b === d ? 1 : f ? -1 : g ? 1 : 0;
          if ( f === g ) return h( a, b );
          for ( c = a; c = c.parentNode; ) i.unshift( c );
          for ( c = b; c = c.parentNode; ) j.unshift( c );
          for ( ; i[ e ] === j[ e ]; ) e++;
          return e ? h( i[ e ], j[ e ] ) : i[ e ] === O ? -1 : j[ e ] === O ? 1 : 0
        }, C = !1, [ 0, 0 ].sort( M ), P.detectDuplicates = C, F ) : F
      }, g.matches = function ( a, b ) {
        return g( a, null, null, b )
      }, g.matchesSelector = function ( a, b ) {
        if ( ( a.ownerDocument || a ) !== F && E( a ), b = b.replace( ta, "='$1']" ), P.matchesSelector && !H && ( !J || !J.test( b ) ) && !I.test( b ) ) try {
          var c = K.call( a, b );
          if ( c || P.disconnectedMatch || a.document && 11 !== a.document.nodeType ) return c
        } catch ( d ) {}
        return g( b, F, null, [ a ] ).length > 0
      }, g.contains = function ( a, b ) {
        return ( a.ownerDocument || a ) !== F && E( a ), L( a, b )
      }, g.attr = function ( a, b ) {
        var c;
        return ( a.ownerDocument || a ) !== F && E( a ), H || ( b = b.toLowerCase() ), ( c = y.attrHandle[ b ] ) ? c( a ) : H || P.attributes ? a.getAttribute( b ) : ( ( c = a.getAttributeNode( b ) ) || a.getAttribute( b ) ) && a[ b ] === !0 ? b : c && c.specified ? c.value : null
      }, g.error = function ( a ) {
        throw new Error( "Syntax error, unrecognized expression: " + a )
      }, g.uniqueSort = function ( a ) {
        var b, c = [],
          d = 1,
          e = 0;
        if ( C = !P.detectDuplicates, a.sort( M ), C ) {
          for ( ; b = a[ d ]; d++ ) b === a[ d - 1 ] && ( e = c.push( d ) );
          for ( ; e--; ) a.splice( c[ e ], 1 )
        }
        return a
      }, z = g.getText = function ( a ) {
        var b, c = "",
          d = 0,
          e = a.nodeType;
        if ( e ) {
          if ( 1 === e || 9 === e || 11 === e ) {
            if ( "string" == typeof a.textContent ) return a.textContent;
            for ( a = a.firstChild; a; a = a.nextSibling ) c += z( a )
          } else if ( 3 === e || 4 === e ) return a.nodeValue
        } else
          for ( ; b = a[ d ]; d++ ) c += z( b );
        return c
      }, y = g.selectors = {
        cacheLength: 50,
        createPseudo: e,
        match: ma,
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function ( a ) {
            return a[ 1 ] = a[ 1 ].replace( ua, va ), a[ 3 ] = ( a[ 4 ] || a[ 5 ] || "" ).replace( ua, va ), "~=" === a[ 2 ] && ( a[ 3 ] = " " + a[ 3 ] + " " ), a.slice( 0, 4 )
          },
          CHILD: function ( a ) {
            return a[ 1 ] = a[ 1 ].toLowerCase(), "nth" === a[ 1 ].slice( 0, 3 ) ? ( a[ 3 ] || g.error( a[ 0 ] ), a[ 4 ] = +( a[ 4 ] ? a[ 5 ] + ( a[ 6 ] || 1 ) : 2 * ( "even" === a[ 3 ] || "odd" === a[ 3 ] ) ), a[ 5 ] = +( a[ 7 ] + a[ 8 ] || "odd" === a[ 3 ] ) ) : a[ 3 ] && g.error( a[ 0 ] ), a
          },
          PSEUDO: function ( a ) {
            var b, c = !a[ 5 ] && a[ 2 ];
            return ma.CHILD.test( a[ 0 ] ) ? null : ( a[ 4 ] ? a[ 2 ] = a[ 4 ] : c && ka.test( c ) && ( b = l( c, !0 ) ) && ( b = c.indexOf( ")", c.length - b ) - c.length ) && ( a[ 0 ] = a[ 0 ].slice( 0, b ), a[ 2 ] = c.slice( 0, b ) ), a.slice( 0, 3 ) )
          }
        },
        filter: {
          TAG: function ( a ) {
            return "*" === a ? function () {
              return !0
            } : ( a = a.replace( ua, va ).toLowerCase(), function ( b ) {
              return b.nodeName && b.nodeName.toLowerCase() === a
            } )
          },
          CLASS: function ( a ) {
            var b = S[ a + " " ];
            return b || ( b = new RegExp( "(^|" + aa + ")" + a + "(" + aa + "|$)" ) ) && S( a, function ( a ) {
              return b.test( a.className || typeof a.getAttribute !== V && a.getAttribute( "class" ) || "" )
            } )
          },
          ATTR: function ( a, b, c ) {
            return function ( d ) {
              var e = g.attr( d, a );
              return null == e ? "!=" === b : b ? ( e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf( c ) : "*=" === b ? c && e.indexOf( c ) > -1 : "$=" === b ? c && e.slice( -c.length ) === c : "~=" === b ? ( " " + e + " " ).indexOf( c ) > -1 : "|=" === b ? e === c || e.slice( 0, c.length + 1 ) === c + "-" : !1 ) : !0
            }
          },
          CHILD: function ( a, b, c, d, e ) {
            var f = "nth" !== a.slice( 0, 3 ),
              g = "last" !== a.slice( -4 ),
              h = "of-type" === b;
            return 1 === d && 0 === e ? function ( a ) {
              return !!a.parentNode
            } : function ( b, c, i ) {
              var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h;
              if ( q ) {
                if ( f ) {
                  for ( ; p; ) {
                    for ( l = b; l = l[ p ]; )
                      if ( h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType ) return !1;
                    o = p = "only" === a && !o && "nextSibling"
                  }
                  return !0
                }
                if ( o = [ g ? q.firstChild : q.lastChild ], g && s ) {
                  for ( k = q[ N ] || ( q[ N ] = {} ), j = k[ a ] || [], n = j[ 0 ] === Q && j[ 1 ], m = j[ 0 ] === Q && j[ 2 ], l = n && q.childNodes[ n ]; l = ++n && l && l[ p ] || ( m = n = 0 ) || o.pop(); )
                    if ( 1 === l.nodeType && ++m && l === b ) {
                      k[ a ] = [ Q, n, m ];
                      break
                    }
                } else if ( s && ( j = ( b[ N ] || ( b[ N ] = {} ) )[ a ] ) && j[ 0 ] === Q ) m = j[ 1 ];
                else
                  for ( ;
                    ( l = ++n && l && l[ p ] || ( m = n = 0 ) || o.pop() ) && ( ( h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType ) || !++m || ( s && ( ( l[ N ] || ( l[ N ] = {} ) )[ a ] = [ Q, m ] ), l !== b ) ); );
                return m -= e, m === d || m % d === 0 && m / d >= 0
              }
            }
          },
          PSEUDO: function ( a, b ) {
            var c, d = y.pseudos[ a ] || y.setFilters[ a.toLowerCase() ] || g.error( "unsupported pseudo: " + a );
            return d[ N ] ? d( b ) : d.length > 1 ? ( c = [ a, a, "", b ], y.setFilters.hasOwnProperty( a.toLowerCase() ) ? e( function ( a, c ) {
              for ( var e, f = d( a, b ), g = f.length; g--; ) e = _.call( a, f[ g ] ), a[ e ] = !( c[ e ] = f[ g ] )
            } ) : function ( a ) {
              return d( a, 0, c )
            } ) : d
          }
        },
        pseudos: {
          not: e( function ( a ) {
            var b = [],
              c = [],
              d = B( a.replace( ga, "$1" ) );
            return d[ N ] ? e( function ( a, b, c, e ) {
              for ( var f, g = d( a, null, e, [] ), h = a.length; h--; )( f = g[ h ] ) && ( a[ h ] = !( b[ h ] = f ) )
            } ) : function ( a, e, f ) {
              return b[ 0 ] = a, d( b, null, f, c ), !c.pop()
            }
          } ),
          has: e( function ( a ) {
            return function ( b ) {
              return g( a, b ).length > 0
            }
          } ),
          contains: e( function ( a ) {
            return function ( b ) {
              return ( b.textContent || b.innerText || z( b ) ).indexOf( a ) > -1
            }
          } ),
          lang: e( function ( a ) {
            return la.test( a || "" ) || g.error( "unsupported lang: " + a ), a = a.replace( ua, va ).toLowerCase(),
              function ( b ) {
                var c;
                do
                  if ( c = H ? b.getAttribute( "xml:lang" ) || b.getAttribute( "lang" ) : b.lang ) return c = c.toLowerCase(), c === a || 0 === c.indexOf( a + "-" ); while ( ( b = b.parentNode ) && 1 === b.nodeType );
                return !1
              }
          } ),
          target: function ( b ) {
            var c = a.location && a.location.hash;
            return c && c.slice( 1 ) === b.id
          },
          root: function ( a ) {
            return a === G
          },
          focus: function ( a ) {
            return a === F.activeElement && ( !F.hasFocus || F.hasFocus() ) && !!( a.type || a.href || ~a.tabIndex )
          },
          enabled: function ( a ) {
            return a.disabled === !1
          },
          disabled: function ( a ) {
            return a.disabled === !0
          },
          checked: function ( a ) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && !!a.checked || "option" === b && !!a.selected
          },
          selected: function ( a ) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
          },
          empty: function ( a ) {
            for ( a = a.firstChild; a; a = a.nextSibling )
              if ( a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType ) return !1;
            return !0
          },
          parent: function ( a ) {
            return !y.pseudos.empty( a )
          },
          header: function ( a ) {
            return ra.test( a.nodeName )
          },
          input: function ( a ) {
            return qa.test( a.nodeName )
          },
          button: function ( a ) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "button" === a.type || "button" === b
          },
          text: function ( a ) {
            var b;
            return "input" === a.nodeName.toLowerCase() && "text" === a.type && ( null == ( b = a.getAttribute( "type" ) ) || b.toLowerCase() === a.type )
          },
          first: k( function () {
            return [ 0 ]
          } ),
          last: k( function ( a, b ) {
            return [ b - 1 ]
          } ),
          eq: k( function ( a, b, c ) {
            return [ 0 > c ? c + b : c ]
          } ),
          even: k( function ( a, b ) {
            for ( var c = 0; b > c; c += 2 ) a.push( c );
            return a
          } ),
          odd: k( function ( a, b ) {
            for ( var c = 1; b > c; c += 2 ) a.push( c );
            return a
          } ),
          lt: k( function ( a, b, c ) {
            for ( var d = 0 > c ? c + b : c; --d >= 0; ) a.push( d );
            return a
          } ),
          gt: k( function ( a, b, c ) {
            for ( var d = 0 > c ? c + b : c; ++d < b; ) a.push( d );
            return a
          } )
        }
      };
      for ( w in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        } ) y.pseudos[ w ] = i( w );
      for ( w in {
          submit: !0,
          reset: !0
        } ) y.pseudos[ w ] = j( w );
      B = g.compile = function ( a, b ) {
        var c, d = [],
          e = [],
          f = U[ a + " " ];
        if ( !f ) {
          for ( b || ( b = l( a ) ), c = b.length; c--; ) f = r( b[ c ] ), f[ N ] ? d.push( f ) : e.push( f );
          f = U( a, s( e, d ) )
        }
        return f
      }, y.pseudos.nth = y.pseudos.eq, y.filters = v.prototype = y.pseudos, y.setFilters = new v, E(), g.attr = ia.attr, ia.find = g, ia.expr = g.selectors, ia.expr[ ":" ] = ia.expr.pseudos, ia.unique = g.uniqueSort, ia.text = g.getText, ia.isXMLDoc = g.isXML, ia.contains = g.contains
    }( a );
  var Pa = /Until$/,
    Qa = /^(?:parents|prev(?:Until|All))/,
    Ra = /^.[^:#\[\.,]*$/,
    Sa = ia.expr.match.needsContext,
    Ta = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  ia.fn.extend( {
    find: function ( a ) {
      var b, c, d, e = this.length;
      if ( "string" != typeof a ) return d = this, this.pushStack( ia( a ).filter( function () {
        for ( b = 0; e > b; b++ )
          if ( ia.contains( d[ b ], this ) ) return !0
      } ) );
      for ( c = [], b = 0; e > b; b++ ) ia.find( a, this[ b ], c );
      return c = this.pushStack( e > 1 ? ia.unique( c ) : c ), c.selector = ( this.selector ? this.selector + " " : "" ) + a, c
    },
    has: function ( a ) {
      var b, c = ia( a, this ),
        d = c.length;
      return this.filter( function () {
        for ( b = 0; d > b; b++ )
          if ( ia.contains( this, c[ b ] ) ) return !0
      } )
    },
    not: function ( a ) {
      return this.pushStack( l( this, a, !1 ) )
    },
    filter: function ( a ) {
      return this.pushStack( l( this, a, !0 ) )
    },
    is: function ( a ) {
      return !!a && ( "string" == typeof a ? Sa.test( a ) ? ia( a, this.context ).index( this[ 0 ] ) >= 0 : ia.filter( a, this ).length > 0 : this.filter( a ).length > 0 )
    },
    closest: function ( a, b ) {
      for ( var c, d = 0, e = this.length, f = [], g = Sa.test( a ) || "string" != typeof a ? ia( a, b || this.context ) : 0; e > d; d++ )
        for ( c = this[ d ]; c && c.ownerDocument && c !== b && 11 !== c.nodeType; ) {
          if ( g ? g.index( c ) > -1 : ia.find.matchesSelector( c, a ) ) {
            f.push( c );
            break
          }
          c = c.parentNode
        }
      return this.pushStack( f.length > 1 ? ia.unique( f ) : f )
    },
    index: function ( a ) {
      return a ? "string" == typeof a ? ia.inArray( this[ 0 ], ia( a ) ) : ia.inArray( a.jquery ? a[ 0 ] : a, this ) : this[ 0 ] && this[ 0 ].parentNode ? this.first().prevAll().length : -1;
    },
    add: function ( a, b ) {
      var c = "string" == typeof a ? ia( a, b ) : ia.makeArray( a && a.nodeType ? [ a ] : a ),
        d = ia.merge( this.get(), c );
      return this.pushStack( ia.unique( d ) )
    },
    addBack: function ( a ) {
      return this.add( null == a ? this.prevObject : this.prevObject.filter( a ) )
    }
  } ), ia.fn.andSelf = ia.fn.addBack, ia.each( {
    parent: function ( a ) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function ( a ) {
      return ia.dir( a, "parentNode" )
    },
    parentsUntil: function ( a, b, c ) {
      return ia.dir( a, "parentNode", c )
    },
    next: function ( a ) {
      return k( a, "nextSibling" )
    },
    prev: function ( a ) {
      return k( a, "previousSibling" )
    },
    nextAll: function ( a ) {
      return ia.dir( a, "nextSibling" )
    },
    prevAll: function ( a ) {
      return ia.dir( a, "previousSibling" )
    },
    nextUntil: function ( a, b, c ) {
      return ia.dir( a, "nextSibling", c )
    },
    prevUntil: function ( a, b, c ) {
      return ia.dir( a, "previousSibling", c )
    },
    siblings: function ( a ) {
      return ia.sibling( ( a.parentNode || {} ).firstChild, a )
    },
    children: function ( a ) {
      return ia.sibling( a.firstChild )
    },
    contents: function ( a ) {
      return ia.nodeName( a, "iframe" ) ? a.contentDocument || a.contentWindow.document : ia.merge( [], a.childNodes )
    }
  }, function ( a, b ) {
    ia.fn[ a ] = function ( c, d ) {
      var e = ia.map( this, b, c );
      return Pa.test( a ) || ( d = c ), d && "string" == typeof d && ( e = ia.filter( d, e ) ), e = this.length > 1 && !Ta[ a ] ? ia.unique( e ) : e, this.length > 1 && Qa.test( a ) && ( e = e.reverse() ), this.pushStack( e )
    }
  } ), ia.extend( {
    filter: function ( a, b, c ) {
      return c && ( a = ":not(" + a + ")" ), 1 === b.length ? ia.find.matchesSelector( b[ 0 ], a ) ? [ b[ 0 ] ] : [] : ia.find.matches( a, b )
    },
    dir: function ( a, c, d ) {
      for ( var e = [], f = a[ c ]; f && 9 !== f.nodeType && ( d === b || 1 !== f.nodeType || !ia( f ).is( d ) ); ) 1 === f.nodeType && e.push( f ), f = f[ c ];
      return e
    },
    sibling: function ( a, b ) {
      for ( var c = []; a; a = a.nextSibling ) 1 === a.nodeType && a !== b && c.push( a );
      return c
    }
  } );
  var Ua = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Va = / jQuery\d+="(?:null|\d+)"/g,
    Wa = new RegExp( "<(?:" + Ua + ")[\\s/>]", "i" ),
    Xa = /^\s+/,
    Ya = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Za = /<([\w:]+)/,
    $a = /<tbody/i,
    _a = /<|&#?\w+;/,
    ab = /<(?:script|style|link)/i,
    bb = /^(?:checkbox|radio)$/i,
    cb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    db = /^$|\/(?:java|ecma)script/i,
    eb = /^true\/(.*)/,
    fb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    gb = {
      option: [ 1, "<select multiple='multiple'>", "</select>" ],
      legend: [ 1, "<fieldset>", "</fieldset>" ],
      area: [ 1, "<map>", "</map>" ],
      param: [ 1, "<object>", "</object>" ],
      thead: [ 1, "<table>", "</table>" ],
      tr: [ 2, "<table><tbody>", "</tbody></table>" ],
      col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
      td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
      _default: ia.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    },
    hb = m( W ),
    ib = hb.appendChild( W.createElement( "div" ) );
  gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, gb.th = gb.td, ia.fn.extend( {
    text: function ( a ) {
      return ia.access( this, function ( a ) {
        return a === b ? ia.text( this ) : this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || W ).createTextNode( a ) )
      }, null, a, arguments.length )
    },
    wrapAll: function ( a ) {
      if ( ia.isFunction( a ) ) return this.each( function ( b ) {
        ia( this ).wrapAll( a.call( this, b ) )
      } );
      if ( this[ 0 ] ) {
        var b = ia( a, this[ 0 ].ownerDocument ).eq( 0 ).clone( !0 );
        this[ 0 ].parentNode && b.insertBefore( this[ 0 ] ), b.map( function () {
          for ( var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
          return a
        } ).append( this )
      }
      return this
    },
    wrapInner: function ( a ) {
      return ia.isFunction( a ) ? this.each( function ( b ) {
        ia( this ).wrapInner( a.call( this, b ) )
      } ) : this.each( function () {
        var b = ia( this ),
          c = b.contents();
        c.length ? c.wrapAll( a ) : b.append( a )
      } )
    },
    wrap: function ( a ) {
      var b = ia.isFunction( a );
      return this.each( function ( c ) {
        ia( this ).wrapAll( b ? a.call( this, c ) : a )
      } )
    },
    unwrap: function () {
      return this.parent().each( function () {
        ia.nodeName( this, "body" ) || ia( this ).replaceWith( this.childNodes )
      } ).end()
    },
    append: function () {
      return this.domManip( arguments, !0, function ( a ) {
        ( 1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType ) && this.appendChild( a )
      } )
    },
    prepend: function () {
      return this.domManip( arguments, !0, function ( a ) {
        ( 1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType ) && this.insertBefore( a, this.firstChild )
      } )
    },
    before: function () {
      return this.domManip( arguments, !1, function ( a ) {
        this.parentNode && this.parentNode.insertBefore( a, this )
      } )
    },
    after: function () {
      return this.domManip( arguments, !1, function ( a ) {
        this.parentNode && this.parentNode.insertBefore( a, this.nextSibling )
      } )
    },
    remove: function ( a, b ) {
      for ( var c, d = 0; null != ( c = this[ d ] ); d++ )( !a || ia.filter( a, [ c ] ).length > 0 ) && ( b || 1 !== c.nodeType || ia.cleanData( t( c ) ), c.parentNode && ( b && ia.contains( c.ownerDocument, c ) && q( t( c, "script" ) ), c.parentNode.removeChild( c ) ) );
      return this
    },
    empty: function () {
      for ( var a, b = 0; null != ( a = this[ b ] ); b++ ) {
        for ( 1 === a.nodeType && ia.cleanData( t( a, !1 ) ); a.firstChild; ) a.removeChild( a.firstChild );
        a.options && ia.nodeName( a, "select" ) && ( a.options.length = 0 )
      }
      return this
    },
    clone: function ( a, b ) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map( function () {
        return ia.clone( this, a, b )
      } )
    },
    html: function ( a ) {
      return ia.access( this, function ( a ) {
        var c = this[ 0 ] || {},
          d = 0,
          e = this.length;
        if ( a === b ) return 1 === c.nodeType ? c.innerHTML.replace( Va, "" ) : b;
        if ( "string" == typeof a && !ab.test( a ) && ( ia.support.htmlSerialize || !Wa.test( a ) ) && ( ia.support.leadingWhitespace || !Xa.test( a ) ) && !gb[ ( Za.exec( a ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
          a = a.replace( Ya, "<$1></$2>" );
          try {
            for ( ; e > d; d++ ) c = this[ d ] || {}, 1 === c.nodeType && ( ia.cleanData( t( c, !1 ) ), c.innerHTML = a );
            c = 0
          } catch ( f ) {}
        }
        c && this.empty().append( a )
      }, null, a, arguments.length )
    },
    replaceWith: function ( a ) {
      var b = ia.isFunction( a );
      return b || "string" == typeof a || ( a = ia( a ).not( this ).detach() ), this.domManip( [ a ], !0, function ( a ) {
        var b = this.nextSibling,
          c = this.parentNode;
        c && ( ia( this ).remove(), c.insertBefore( a, b ) )
      } )
    },
    detach: function ( a ) {
      return this.remove( a, !0 )
    },
    domManip: function ( a, c, d ) {
      a = ba.apply( [], a );
      var e, f, g, h, i, j, k = 0,
        l = this.length,
        m = this,
        q = l - 1,
        r = a[ 0 ],
        s = ia.isFunction( r );
      if ( s || !( 1 >= l || "string" != typeof r || ia.support.checkClone ) && cb.test( r ) ) return this.each( function ( e ) {
        var f = m.eq( e );
        s && ( a[ 0 ] = r.call( this, e, c ? f.html() : b ) ), f.domManip( a, c, d )
      } );
      if ( l && ( j = ia.buildFragment( a, this[ 0 ].ownerDocument, !1, this ), e = j.firstChild, 1 === j.childNodes.length && ( j = e ), e ) ) {
        for ( c = c && ia.nodeName( e, "tr" ), h = ia.map( t( j, "script" ), o ), g = h.length; l > k; k++ ) f = j, k !== q && ( f = ia.clone( f, !0, !0 ), g && ia.merge( h, t( f, "script" ) ) ), d.call( c && ia.nodeName( this[ k ], "table" ) ? n( this[ k ], "tbody" ) : this[ k ], f, k );
        if ( g )
          for ( i = h[ h.length - 1 ].ownerDocument, ia.map( h, p ), k = 0; g > k; k++ ) f = h[ k ], db.test( f.type || "" ) && !ia._data( f, "globalEval" ) && ia.contains( i, f ) && ( f.src ? ia.ajax( {
            url: f.src,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
          } ) : ia.globalEval( ( f.text || f.textContent || f.innerHTML || "" ).replace( fb, "" ) ) );
        j = e = null
      }
      return this
    }
  } ), ia.each( {
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function ( a, b ) {
    ia.fn[ a ] = function ( a ) {
      for ( var c, d = 0, e = [], f = ia( a ), g = f.length - 1; g >= d; d++ ) c = d === g ? this : this.clone( !0 ), ia( f[ d ] )[ b ]( c ), ca.apply( e, c.get() );
      return this.pushStack( e )
    }
  } ), ia.extend( {
    clone: function ( a, b, c ) {
      var d, e, f, g, h, i = ia.contains( a.ownerDocument, a );
      if ( ia.support.html5Clone || ia.isXMLDoc( a ) || !Wa.test( "<" + a.nodeName + ">" ) ? f = a.cloneNode( !0 ) : ( ib.innerHTML = a.outerHTML, ib.removeChild( f = ib.firstChild ) ), !( ia.support.noCloneEvent && ia.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ia.isXMLDoc( a ) ) )
        for ( d = t( f ), h = t( a ), g = 0; null != ( e = h[ g ] ); ++g ) d[ g ] && s( e, d[ g ] );
      if ( b )
        if ( c )
          for ( h = h || t( a ), d = d || t( f ), g = 0; null != ( e = h[ g ] ); g++ ) r( e, d[ g ] );
        else r( a, f );
      return d = t( f, "script" ), d.length > 0 && q( d, !i && t( a, "script" ) ), d = h = e = null, f
    },
    buildFragment: function ( a, b, c, d ) {
      for ( var e, f, g, h, i, j, k, l = a.length, n = m( b ), o = [], p = 0; l > p; p++ )
        if ( f = a[ p ], f || 0 === f )
          if ( "object" === ia.type( f ) ) ia.merge( o, f.nodeType ? [ f ] : f );
          else if ( _a.test( f ) ) {
        for ( h = h || n.appendChild( b.createElement( "div" ) ), i = ( Za.exec( f ) || [ "", "" ] )[ 1 ].toLowerCase(), k = gb[ i ] || gb._default, h.innerHTML = k[ 1 ] + f.replace( Ya, "<$1></$2>" ) + k[ 2 ], e = k[ 0 ]; e--; ) h = h.lastChild;
        if ( !ia.support.leadingWhitespace && Xa.test( f ) && o.push( b.createTextNode( Xa.exec( f )[ 0 ] ) ), !ia.support.tbody )
          for ( f = "table" !== i || $a.test( f ) ? "<table>" !== k[ 1 ] || $a.test( f ) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--; ) ia.nodeName( j = f.childNodes[ e ], "tbody" ) && !j.childNodes.length && f.removeChild( j );
        for ( ia.merge( o, h.childNodes ), h.textContent = ""; h.firstChild; ) h.removeChild( h.firstChild );
        h = n.lastChild
      } else o.push( b.createTextNode( f ) );
      for ( h && n.removeChild( h ), ia.support.appendChecked || ia.grep( t( o, "input" ), u ), p = 0; f = o[ p++ ]; )
        if ( ( !d || -1 === ia.inArray( f, d ) ) && ( g = ia.contains( f.ownerDocument, f ), h = t( n.appendChild( f ), "script" ), g && q( h ), c ) )
          for ( e = 0; f = h[ e++ ]; ) db.test( f.type || "" ) && c.push( f );
      return h = null, n
    },
    cleanData: function ( a, b ) {
      for ( var c, d, e, f, g = 0, h = ia.expando, i = ia.cache, j = ia.support.deleteExpando, k = ia.event.special; null != ( c = a[ g ] ); g++ )
        if ( ( b || ia.acceptData( c ) ) && ( e = c[ h ], f = e && i[ e ] ) ) {
          if ( f.events )
            for ( d in f.events ) k[ d ] ? ia.event.remove( c, d ) : ia.removeEvent( c, d, f.handle );
          i[ e ] && ( delete i[ e ], j ? delete c[ h ] : typeof c.removeAttribute !== V ? c.removeAttribute( h ) : c[ h ] = null, _.push( e ) )
        }
    }
  } );
  var jb, kb, lb, mb = /alpha\([^)]*\)/i,
    nb = /opacity\s*=\s*([^)]*)/,
    ob = /^(top|right|bottom|left)$/,
    pb = /^(none|table(?!-c[ea]).+)/,
    qb = /^margin/,
    rb = new RegExp( "^(" + ja + ")(.*)$", "i" ),
    sb = new RegExp( "^(" + ja + ")(?!px)[a-z%]+$", "i" ),
    tb = new RegExp( "^([+-])=(" + ja + ")", "i" ),
    ub = {
      BODY: "block"
    },
    vb = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    wb = {
      letterSpacing: 0,
      fontWeight: 400
    },
    xb = [ "Top", "Right", "Bottom", "Left" ],
    yb = [ "Webkit", "O", "Moz", "ms" ];
  ia.fn.extend( {
    css: function ( a, c ) {
      return ia.access( this, function ( a, c, d ) {
        var e, f, g = {},
          h = 0;
        if ( ia.isArray( c ) ) {
          for ( f = kb( a ), e = c.length; e > h; h++ ) g[ c[ h ] ] = ia.css( a, c[ h ], !1, f );
          return g
        }
        return d !== b ? ia.style( a, c, d ) : ia.css( a, c )
      }, a, c, arguments.length > 1 )
    },
    show: function () {
      return x( this, !0 )
    },
    hide: function () {
      return x( this )
    },
    toggle: function ( a ) {
      var b = "boolean" == typeof a;
      return this.each( function () {
        ( b ? a : w( this ) ) ? ia( this ).show(): ia( this ).hide()
      } )
    }
  } ), ia.extend( {
    cssHooks: {
      opacity: {
        get: function ( a, b ) {
          if ( b ) {
            var c = lb( a, "opacity" );
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": ia.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function ( a, c, d, e ) {
      if ( a && 3 !== a.nodeType && 8 !== a.nodeType && a.style ) {
        var f, g, h, i = ia.camelCase( c ),
          j = a.style;
        if ( c = ia.cssProps[ i ] || ( ia.cssProps[ i ] = v( j, i ) ), h = ia.cssHooks[ c ] || ia.cssHooks[ i ], d === b ) return h && "get" in h && ( f = h.get( a, !1, e ) ) !== b ? f : j[ c ];
        if ( g = typeof d, "string" === g && ( f = tb.exec( d ) ) && ( d = ( f[ 1 ] + 1 ) * f[ 2 ] + parseFloat( ia.css( a, c ) ), g = "number" ), !( null == d || "number" === g && isNaN( d ) || ( "number" !== g || ia.cssNumber[ i ] || ( d += "px" ), ia.support.clearCloneStyle || "" !== d || 0 !== c.indexOf( "background" ) || ( j[ c ] = "inherit" ), h && "set" in h && ( d = h.set( a, d, e ) ) === b ) ) ) try {
          j[ c ] = d
        } catch ( k ) {}
      }
    },
    css: function ( a, c, d, e ) {
      var f, g, h, i = ia.camelCase( c );
      return c = ia.cssProps[ i ] || ( ia.cssProps[ i ] = v( a.style, i ) ), h = ia.cssHooks[ c ] || ia.cssHooks[ i ], h && "get" in h && ( g = h.get( a, !0, d ) ), g === b && ( g = lb( a, c, e ) ), "normal" === g && c in wb && ( g = wb[ c ] ), "" === d || d ? ( f = parseFloat( g ), d === !0 || ia.isNumeric( f ) ? f || 0 : g ) : g
    },
    swap: function ( a, b, c, d ) {
      var e, f, g = {};
      for ( f in b ) g[ f ] = a.style[ f ], a.style[ f ] = b[ f ];
      e = c.apply( a, d || [] );
      for ( f in b ) a.style[ f ] = g[ f ];
      return e
    }
  } ), a.getComputedStyle ? ( kb = function ( b ) {
    return a.getComputedStyle( b, null )
  }, lb = function ( a, c, d ) {
    var e, f, g, h = d || kb( a ),
      i = h ? h.getPropertyValue( c ) || h[ c ] : b,
      j = a.style;
    return h && ( "" !== i || ia.contains( a.ownerDocument, a ) || ( i = ia.style( a, c ) ), sb.test( i ) && qb.test( c ) && ( e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g ) ), i
  } ) : W.documentElement.currentStyle && ( kb = function ( a ) {
    return a.currentStyle
  }, lb = function ( a, c, d ) {
    var e, f, g, h = d || kb( a ),
      i = h ? h[ c ] : b,
      j = a.style;
    return null == i && j && j[ c ] && ( i = j[ c ] ), sb.test( i ) && !ob.test( c ) && ( e = j.left, f = a.runtimeStyle, g = f && f.left, g && ( f.left = a.currentStyle.left ), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && ( f.left = g ) ), "" === i ? "auto" : i
  } ), ia.each( [ "height", "width" ], function ( a, b ) {
    ia.cssHooks[ b ] = {
      get: function ( a, c, d ) {
        return c ? 0 === a.offsetWidth && pb.test( ia.css( a, "display" ) ) ? ia.swap( a, vb, function () {
          return A( a, b, d )
        } ) : A( a, b, d ) : void 0
      },
      set: function ( a, c, d ) {
        var e = d && kb( a );
        return y( a, c, d ? z( a, b, d, ia.support.boxSizing && "border-box" === ia.css( a, "boxSizing", !1, e ), e ) : 0 )
      }
    }
  } ), ia.support.opacity || ( ia.cssHooks.opacity = {
    get: function ( a, b ) {
      return nb.test( ( b && a.currentStyle ? a.currentStyle.filter : a.style.filter ) || "" ) ? .01 * parseFloat( RegExp.$1 ) + "" : b ? "1" : ""
    },
    set: function ( a, b ) {
      var c = a.style,
        d = a.currentStyle,
        e = ia.isNumeric( b ) ? "alpha(opacity=" + 100 * b + ")" : "",
        f = d && d.filter || c.filter || "";
      c.zoom = 1, ( b >= 1 || "" === b ) && "" === ia.trim( f.replace( mb, "" ) ) && c.removeAttribute && ( c.removeAttribute( "filter" ), "" === b || d && !d.filter ) || ( c.filter = mb.test( f ) ? f.replace( mb, e ) : f + " " + e )
    }
  } ), ia( function () {
    ia.support.reliableMarginRight || ( ia.cssHooks.marginRight = {
      get: function ( a, b ) {
        return b ? ia.swap( a, {
          display: "inline-block"
        }, lb, [ a, "marginRight" ] ) : void 0
      }
    } ), !ia.support.pixelPosition && ia.fn.position && ia.each( [ "top", "left" ], function ( a, b ) {
      ia.cssHooks[ b ] = {
        get: function ( a, c ) {
          return c ? ( c = lb( a, b ), sb.test( c ) ? ia( a ).position()[ b ] + "px" : c ) : void 0
        }
      }
    } )
  } ), ia.expr && ia.expr.filters && ( ia.expr.filters.hidden = function ( a ) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ia.support.reliableHiddenOffsets && "none" === ( a.style && a.style.display || ia.css( a, "display" ) )
  }, ia.expr.filters.visible = function ( a ) {
    return !ia.expr.filters.hidden( a )
  } ), ia.each( {
    margin: "",
    padding: "",
    border: "Width"
  }, function ( a, b ) {
    ia.cssHooks[ a + b ] = {
      expand: function ( c ) {
        for ( var d = 0, e = {}, f = "string" == typeof c ? c.split( " " ) : [ c ]; 4 > d; d++ ) e[ a + xb[ d ] + b ] = f[ d ] || f[ d - 2 ] || f[ 0 ];
        return e
      }
    }, qb.test( a ) || ( ia.cssHooks[ a + b ].set = y )
  } );
  var zb = /%20/g,
    Ab = /\[\]$/,
    Bb = /\r?\n/g,
    Cb = /^(?:submit|button|image|reset|file)$/i,
    Db = /^(?:input|select|textarea|keygen)/i;
  ia.fn.extend( {
    serialize: function () {
      return ia.param( this.serializeArray() )
    },
    serializeArray: function () {
      return this.map( function () {
        var a = ia.prop( this, "elements" );
        return a ? ia.makeArray( a ) : this
      } ).filter( function () {
        var a = this.type;
        return this.name && !ia( this ).is( ":disabled" ) && Db.test( this.nodeName ) && !Cb.test( a ) && ( this.checked || !bb.test( a ) )
      } ).map( function ( a, b ) {
        var c = ia( this ).val();
        return null == c ? null : ia.isArray( c ) ? ia.map( c, function ( a ) {
          return {
            name: b.name,
            value: a.replace( Bb, "\r\n" )
          }
        } ) : {
          name: b.name,
          value: c.replace( Bb, "\r\n" )
        }
      } ).get()
    }
  } ), ia.param = function ( a, c ) {
    var d, e = [],
      f = function ( a, b ) {
        b = ia.isFunction( b ) ? b() : null == b ? "" : b, e[ e.length ] = encodeURIComponent( a ) + "=" + encodeURIComponent( b )
      };
    if ( c === b && ( c = ia.ajaxSettings && ia.ajaxSettings.traditional ), ia.isArray( a ) || a.jquery && !ia.isPlainObject( a ) ) ia.each( a, function () {
      f( this.name, this.value )
    } );
    else
      for ( d in a ) D( d, a[ d ], c, f );
    return e.join( "&" ).replace( zb, "+" )
  }, ia.each( "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split( " " ), function ( a, b ) {
    ia.fn[ b ] = function ( a, c ) {
      return arguments.length > 0 ? this.on( b, null, a, c ) : this.trigger( b )
    }
  } ), ia.fn.hover = function ( a, b ) {
    return this.mouseenter( a ).mouseleave( b || a )
  };
  var Eb, Fb, Gb = ia.now(),
    Hb = /\?/,
    Ib = /#.*$/,
    Jb = /([?&])_=[^&]*/,
    Kb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Lb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Mb = /^(?:GET|HEAD)$/,
    Nb = /^\/\//,
    Ob = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    Pb = ia.fn.load,
    Qb = {},
    Rb = {},
    Sb = "*/".concat( "*" );
  try {
    Fb = X.href
  } catch ( Tb ) {
    Fb = W.createElement( "a" ), Fb.href = "", Fb = Fb.href
  }
  Eb = Ob.exec( Fb.toLowerCase() ) || [], ia.fn.load = function ( a, c, d ) {
    if ( "string" != typeof a && Pb ) return Pb.apply( this, arguments );
    var e, f, g, h = this,
      i = a.indexOf( " " );
    return i >= 0 && ( e = a.slice( i, a.length ), a = a.slice( 0, i ) ), ia.isFunction( c ) ? ( d = c, c = b ) : c && "object" == typeof c && ( g = "POST" ), h.length > 0 && ia.ajax( {
      url: a,
      type: g,
      dataType: "html",
      data: c
    } ).done( function ( a ) {
      f = arguments, h.html( e ? ia( "<div>" ).append( ia.parseHTML( a ) ).find( e ) : a )
    } ).complete( d && function ( a, b ) {
      h.each( d, f || [ a.responseText, b, a ] )
    } ), this
  }, ia.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function ( a, b ) {
    ia.fn[ b ] = function ( a ) {
      return this.on( b, a )
    }
  } ), ia.each( [ "get", "post" ], function ( a, c ) {
    ia[ c ] = function ( a, d, e, f ) {
      return ia.isFunction( d ) && ( f = f || e, e = d, d = b ), ia.ajax( {
        url: a,
        type: c,
        dataType: f,
        data: d,
        success: e
      } )
    }
  } ), ia.extend( {
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Fb,
      type: "GET",
      isLocal: Lb.test( Eb[ 1 ] ),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Sb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText"
      },
      converters: {
        "* text": a.String,
        "text html": !0,
        "text json": ia.parseJSON,
        "text xml": ia.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ( a, b ) {
      return b ? G( G( a, ia.ajaxSettings ), b ) : G( ia.ajaxSettings, a )
    },
    ajaxPrefilter: E( Qb ),
    ajaxTransport: E( Rb ),
    ajax: function ( a, c ) {
      function d( a, c, d, e ) {
        var f, l, s, t, v, x = c;
        2 !== u && ( u = 2, i && clearTimeout( i ), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, d && ( t = H( m, w, d ) ), a >= 200 && 300 > a || 304 === a ? ( m.ifModified && ( v = w.getResponseHeader( "Last-Modified" ), v && ( ia.lastModified[ g ] = v ), v = w.getResponseHeader( "etag" ), v && ( ia.etag[ g ] = v ) ), 204 === a ? ( f = !0, x = "nocontent" ) : 304 === a ? ( f = !0, x = "notmodified" ) : ( f = I( m, t ), x = f.state, l = f.data, s = f.error, f = !s ) ) : ( s = x, ( a || !x ) && ( x = "error", 0 > a && ( a = 0 ) ) ), w.status = a, w.statusText = ( c || x ) + "", f ? p.resolveWith( n, [ l, x, w ] ) : p.rejectWith( n, [ w, x, s ] ), w.statusCode( r ), r = b, j && o.trigger( f ? "ajaxSuccess" : "ajaxError", [ w, m, f ? l : s ] ), q.fireWith( n, [ w, x ] ), j && ( o.trigger( "ajaxComplete", [ w, m ] ), --ia.active || ia.event.trigger( "ajaxStop" ) ) )
      }
      "object" == typeof a && ( c = a, a = b ), c = c || {};
      var e, f, g, h, i, j, k, l, m = ia.ajaxSetup( {}, c ),
        n = m.context || m,
        o = m.context && ( n.nodeType || n.jquery ) ? ia( n ) : ia.event,
        p = ia.Deferred(),
        q = ia.Callbacks( "once memory" ),
        r = m.statusCode || {},
        s = {},
        t = {},
        u = 0,
        v = "canceled",
        w = {
          readyState: 0,
          getResponseHeader: function ( a ) {
            var b;
            if ( 2 === u ) {
              if ( !l )
                for ( l = {}; b = Kb.exec( h ); ) l[ b[ 1 ].toLowerCase() ] = b[ 2 ];
              b = l[ a.toLowerCase() ]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function () {
            return 2 === u ? h : null
          },
          setRequestHeader: function ( a, b ) {
            var c = a.toLowerCase();
            return u || ( a = t[ c ] = t[ c ] || a, s[ a ] = b ), this
          },
          overrideMimeType: function ( a ) {
            return u || ( m.mimeType = a ), this
          },
          statusCode: function ( a ) {
            var b;
            if ( a )
              if ( 2 > u )
                for ( b in a ) r[ b ] = [ r[ b ], a[ b ] ];
              else w.always( a[ w.status ] );
            return this
          },
          abort: function ( a ) {
            var b = a || v;
            return k && k.abort( b ), d( 0, b ), this
          }
        };
      if ( p.promise( w ).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ( ( a || m.url || Fb ) + "" ).replace( Ib, "" ).replace( Nb, Eb[ 1 ] + "//" ), m.type = c.method || c.type || m.method || m.type, m.dataTypes = ia.trim( m.dataType || "*" ).toLowerCase().match( ka ) || [ "" ], null == m.crossDomain && ( e = Ob.exec( m.url.toLowerCase() ), m.crossDomain = !( !e || e[ 1 ] === Eb[ 1 ] && e[ 2 ] === Eb[ 2 ] && ( e[ 3 ] || ( "http:" === e[ 1 ] ? 80 : 443 ) ) == ( Eb[ 3 ] || ( "http:" === Eb[ 1 ] ? 80 : 443 ) ) ) ), m.data && m.processData && "string" != typeof m.data && ( m.data = ia.param( m.data, m.traditional ) ), F( Qb, m, c, w ), 2 === u ) return w;
      j = m.global, j && 0 === ia.active++ && ia.event.trigger( "ajaxStart" ), m.type = m.type.toUpperCase(), m.hasContent = !Mb.test( m.type ), g = m.url, m.hasContent || ( m.data && ( g = m.url += ( Hb.test( g ) ? "&" : "?" ) + m.data, delete m.data ), m.cache === !1 && ( m.url = Jb.test( g ) ? g.replace( Jb, "$1_=" + Gb++ ) : g + ( Hb.test( g ) ? "&" : "?" ) + "_=" + Gb++ ) ), m.ifModified && ( ia.lastModified[ g ] && w.setRequestHeader( "If-Modified-Since", ia.lastModified[ g ] ), ia.etag[ g ] && w.setRequestHeader( "If-None-Match", ia.etag[ g ] ) ), ( m.data && m.hasContent && m.contentType !== !1 || c.contentType ) && w.setRequestHeader( "Content-Type", m.contentType ), w.setRequestHeader( "Accept", m.dataTypes[ 0 ] && m.accepts[ m.dataTypes[ 0 ] ] ? m.accepts[ m.dataTypes[ 0 ] ] + ( "*" !== m.dataTypes[ 0 ] ? ", " + Sb + "; q=0.01" : "" ) : m.accepts[ "*" ] );
      for ( f in m.headers ) w.setRequestHeader( f, m.headers[ f ] );
      if ( m.beforeSend && ( m.beforeSend.call( n, w, m ) === !1 || 2 === u ) ) return w.abort();
      v = "abort";
      for ( f in {
          success: 1,
          error: 1,
          complete: 1
        } ) w[ f ]( m[ f ] );
      if ( k = F( Rb, m, c, w ) ) {
        w.readyState = 1, j && o.trigger( "ajaxSend", [ w, m ] ), m.async && m.timeout > 0 && ( i = setTimeout( function () {
          w.abort( "timeout" )
        }, m.timeout ) );
        try {
          u = 1, k.send( s, d )
        } catch ( x ) {
          if ( !( 2 > u ) ) throw x;
          d( -1, x )
        }
      } else d( -1, "No Transport" );
      return w
    },
    getScript: function ( a, c ) {
      return ia.get( a, b, c, "script" )
    },
    getJSON: function ( a, b, c ) {
      return ia.get( a, b, c, "json" )
    }
  } ), ia.ajaxSetup( {
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function ( a ) {
        return ia.globalEval( a ), a
      }
    }
  } ), ia.ajaxPrefilter( "script", function ( a ) {
    a.cache === b && ( a.cache = !1 ), a.crossDomain && ( a.type = "GET", a.global = !1 )
  } ), ia.ajaxTransport( "script", function ( a ) {
    if ( a.crossDomain ) {
      var c, d = W.head || ia( "head" )[ 0 ] || W.documentElement;
      return {
        send: function ( b, e ) {
          c = W.createElement( "script" ), c.async = !0, a.scriptCharset && ( c.charset = a.scriptCharset ), c.src = a.url, c.onload = c.onreadystatechange = function ( a, b ) {
            ( b || !c.readyState || /loaded|complete/.test( c.readyState ) ) && ( c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild( c ), c = null, b || e( 200, "success" ) )
          }, d.insertBefore( c, d.firstChild )
        },
        abort: function () {
          c && c.onload( b, !0 )
        }
      }
    }
  } );
  var Ub = [],
    Vb = /(=)\?(?=&|$)|\?\?/;
  ia.ajaxSetup( {
    jsonp: "callback",
    jsonpCallback: function () {
      var a = Ub.pop() || ia.expando + "_" + Gb++;
      return this[ a ] = !0, a
    }
  } ), ia.ajaxPrefilter( "json jsonp", function ( c, d, e ) {
    var f, g, h, i = c.jsonp !== !1 && ( Vb.test( c.url ) ? "url" : "string" == typeof c.data && !( c.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) && Vb.test( c.data ) && "data" );
    return i || "jsonp" === c.dataTypes[ 0 ] ? ( f = c.jsonpCallback = ia.isFunction( c.jsonpCallback ) ? c.jsonpCallback() : c.jsonpCallback, i ? c[ i ] = c[ i ].replace( Vb, "$1" + f ) : c.jsonp !== !1 && ( c.url += ( Hb.test( c.url ) ? "&" : "?" ) + c.jsonp + "=" + f ), c.converters[ "script json" ] = function () {
      return h || ia.error( f + " was not called" ), h[ 0 ]
    }, c.dataTypes[ 0 ] = "json", g = a[ f ], a[ f ] = function () {
      h = arguments
    }, e.always( function () {
      a[ f ] = g, c[ f ] && ( c.jsonpCallback = d.jsonpCallback, Ub.push( f ) ), h && ia.isFunction( g ) && g( h[ 0 ] ), h = g = b
    } ), "script" ) : void 0
  } );
  var Wb, Xb, Yb = 0,
    Zb = a.ActiveXObject && function () {
      var a;
      for ( a in Wb ) Wb[ a ]( b, !0 )
    };
  ia.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && J() || K()
  } : J, Xb = ia.ajaxSettings.xhr(), ia.support.cors = !!Xb && "withCredentials" in Xb, Xb = ia.support.ajax = !!Xb, Xb && ia.ajaxTransport( function ( c ) {
    if ( !c.crossDomain || ia.support.cors ) {
      var d;
      return {
        send: function ( e, f ) {
          var g, h, i = c.xhr();
          if ( c.username ? i.open( c.type, c.url, c.async, c.username, c.password ) : i.open( c.type, c.url, c.async ), c.xhrFields )
            for ( h in c.xhrFields ) i[ h ] = c.xhrFields[ h ];
          c.mimeType && i.overrideMimeType && i.overrideMimeType( c.mimeType ), c.crossDomain || e[ "X-Requested-With" ] || ( e[ "X-Requested-With" ] = "XMLHttpRequest" );
          try {
            for ( h in e ) i.setRequestHeader( h, e[ h ] )
          } catch ( j ) {}
          i.send( c.hasContent && c.data || null ), d = function ( a, e ) {
            var h, j, k, l;
            try {
              if ( d && ( e || 4 === i.readyState ) )
                if ( d = b, g && ( i.onreadystatechange = ia.noop, Zb && delete Wb[ g ] ), e ) 4 !== i.readyState && i.abort();
                else {
                  l = {}, h = i.status, j = i.getAllResponseHeaders(), "string" == typeof i.responseText && ( l.text = i.responseText );
                  try {
                    k = i.statusText
                  } catch ( m ) {
                    k = ""
                  }
                  h || !c.isLocal || c.crossDomain ? 1223 === h && ( h = 204 ) : h = l.text ? 200 : 404
                }
            } catch ( n ) {
              e || f( -1, n )
            }
            l && f( h, k, l, j )
          }, c.async ? 4 === i.readyState ? setTimeout( d ) : ( g = ++Yb, Zb && ( Wb || ( Wb = {}, ia( a ).unload( Zb ) ), Wb[ g ] = d ), i.onreadystatechange = d ) : d()
        },
        abort: function () {
          d && d( b, !0 )
        }
      }
    }
  } );
  var $b, _b, ac = /^(?:toggle|show|hide)$/,
    bc = new RegExp( "^(?:([+-])=|)(" + ja + ")([a-z%]*)$", "i" ),
    cc = /queueHooks$/,
    dc = [ P ],
    ec = {
      "*": [ function ( a, b ) {
        var c, d, e = this.createTween( a, b ),
          f = bc.exec( b ),
          g = e.cur(),
          h = +g || 0,
          i = 1,
          j = 20;
        if ( f ) {
          if ( c = +f[ 2 ], d = f[ 3 ] || ( ia.cssNumber[ a ] ? "" : "px" ), "px" !== d && h ) {
            h = ia.css( e.elem, a, !0 ) || c || 1;
            do i = i || ".5", h /= i, ia.style( e.elem, a, h + d ); while ( i !== ( i = e.cur() / g ) && 1 !== i && --j )
          }
          e.unit = d, e.start = h, e.end = f[ 1 ] ? h + ( f[ 1 ] + 1 ) * c : c
        }
        return e
      } ]
    };
  ia.Animation = ia.extend( N, {
    tweener: function ( a, b ) {
      ia.isFunction( a ) ? ( b = a, a = [ "*" ] ) : a = a.split( " " );
      for ( var c, d = 0, e = a.length; e > d; d++ ) c = a[ d ], ec[ c ] = ec[ c ] || [], ec[ c ].unshift( b )
    },
    prefilter: function ( a, b ) {
      b ? dc.unshift( a ) : dc.push( a )
    }
  } ), ia.Tween = Q, Q.prototype = {
    constructor: Q,
    init: function ( a, b, c, d, e, f ) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ( ia.cssNumber[ c ] ? "" : "px" )
    },
    cur: function () {
      var a = Q.propHooks[ this.prop ];
      return a && a.get ? a.get( this ) : Q.propHooks._default.get( this )
    },
    run: function ( a ) {
      var b, c = Q.propHooks[ this.prop ];
      return this.options.duration ? this.pos = b = ia.easing[ this.easing ]( a, this.options.duration * a, 0, 1, this.options.duration ) : this.pos = b = a, this.now = ( this.end - this.start ) * b + this.start, this.options.step && this.options.step.call( this.elem, this.now, this ), c && c.set ? c.set( this ) : Q.propHooks._default.set( this ), this
    }
  }, Q.prototype.init.prototype = Q.prototype, Q.propHooks = {
    _default: {
      get: function ( a ) {
        var b;
        return null == a.elem[ a.prop ] || a.elem.style && null != a.elem.style[ a.prop ] ? ( b = ia.css( a.elem, a.prop, "" ), b && "auto" !== b ? b : 0 ) : a.elem[ a.prop ]
      },
      set: function ( a ) {
        ia.fx.step[ a.prop ] ? ia.fx.step[ a.prop ]( a ) : a.elem.style && ( null != a.elem.style[ ia.cssProps[ a.prop ] ] || ia.cssHooks[ a.prop ] ) ? ia.style( a.elem, a.prop, a.now + a.unit ) : a.elem[ a.prop ] = a.now
      }
    }
  }, Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
    set: function ( a ) {
      a.elem.nodeType && a.elem.parentNode && ( a.elem[ a.prop ] = a.now )
    }
  }, ia.each( [ "toggle", "show", "hide" ], function ( a, b ) {
    var c = ia.fn[ b ];
    ia.fn[ b ] = function ( a, d, e ) {
      return null == a || "boolean" == typeof a ? c.apply( this, arguments ) : this.animate( R( b, !0 ), a, d, e )
    }
  } ), ia.fn.extend( {
    fadeTo: function ( a, b, c, d ) {
      return this.filter( w ).css( "opacity", 0 ).show().end().animate( {
        opacity: b
      }, a, c, d )
    },
    animate: function ( a, b, c, d ) {
      var e = ia.isEmptyObject( a ),
        f = ia.speed( b, c, d ),
        g = function () {
          var b = N( this, ia.extend( {}, a ), f );
          g.finish = function () {
            b.stop( !0 )
          }, ( e || ia._data( this, "finish" ) ) && b.stop( !0 )
        };
      return g.finish = g, e || f.queue === !1 ? this.each( g ) : this.queue( f.queue, g )
    },
    stop: function ( a, c, d ) {
      var e = function ( a ) {
        var b = a.stop;
        delete a.stop, b( d )
      };
      return "string" != typeof a && ( d = c, c = a, a = b ), c && a !== !1 && this.queue( a || "fx", [] ), this.each( function () {
        var b = !0,
          c = null != a && a + "queueHooks",
          f = ia.timers,
          g = ia._data( this );
        if ( c ) g[ c ] && g[ c ].stop && e( g[ c ] );
        else
          for ( c in g ) g[ c ] && g[ c ].stop && cc.test( c ) && e( g[ c ] );
        for ( c = f.length; c--; ) f[ c ].elem !== this || null != a && f[ c ].queue !== a || ( f[ c ].anim.stop( d ), b = !1, f.splice( c, 1 ) );
        ( b || !d ) && ia.dequeue( this, a )
      } )
    },
    finish: function ( a ) {
      return a !== !1 && ( a = a || "fx" ), this.each( function () {
        var b, c = ia._data( this ),
          d = c[ a + "queue" ],
          e = c[ a + "queueHooks" ],
          f = ia.timers,
          g = d ? d.length : 0;
        for ( c.finish = !0, ia.queue( this, a, [] ), e && e.cur && e.cur.finish && e.cur.finish.call( this ), b = f.length; b--; ) f[ b ].elem === this && f[ b ].queue === a && ( f[ b ].anim.stop( !0 ), f.splice( b, 1 ) );
        for ( b = 0; g > b; b++ ) d[ b ] && d[ b ].finish && d[ b ].finish.call( this );
        delete c.finish
      } )
    }
  } ), ia.each( {
    slideDown: R( "show" ),
    slideUp: R( "hide" ),
    slideToggle: R( "toggle" ),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function ( a, b ) {
    ia.fn[ a ] = function ( a, c, d ) {
      return this.animate( b, a, c, d )
    }
  } ), ia.speed = function ( a, b, c ) {
    var d = a && "object" == typeof a ? ia.extend( {}, a ) : {
      complete: c || !c && b || ia.isFunction( a ) && a,
      duration: a,
      easing: c && b || b && !ia.isFunction( b ) && b
    };
    return d.duration = ia.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ia.fx.speeds ? ia.fx.speeds[ d.duration ] : ia.fx.speeds._default, ( null == d.queue || d.queue === !0 ) && ( d.queue = "fx" ), d.old = d.complete, d.complete = function () {
      ia.isFunction( d.old ) && d.old.call( this ), d.queue && ia.dequeue( this, d.queue )
    }, d
  }, ia.easing = {
    linear: function ( a ) {
      return a
    },
    swing: function ( a ) {
      return .5 - Math.cos( a * Math.PI ) / 2
    }
  }, ia.timers = [], ia.fx = Q.prototype.init, ia.fx.tick = function () {
    var a, c = ia.timers,
      d = 0;
    for ( $b = ia.now(); d < c.length; d++ ) a = c[ d ], a() || c[ d ] !== a || c.splice( d--, 1 );
    c.length || ia.fx.stop(), $b = b
  }, ia.fx.timer = function ( a ) {
    a() && ia.timers.push( a ) && ia.fx.start()
  }, ia.fx.interval = 13, ia.fx.start = function () {
    _b || ( _b = setInterval( ia.fx.tick, ia.fx.interval ) )
  }, ia.fx.stop = function () {
    clearInterval( _b ), _b = null
  }, ia.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, ia.fx.step = {}, ia.expr && ia.expr.filters && ( ia.expr.filters.animated = function ( a ) {
    return ia.grep( ia.timers, function ( b ) {
      return a === b.elem
    } ).length
  } ), ia.fn.offset = function ( a ) {
    if ( arguments.length ) return a === b ? this : this.each( function ( b ) {
      ia.offset.setOffset( this, a, b )
    } );
    var c, d, e = {
        top: 0,
        left: 0
      },
      f = this[ 0 ],
      g = f && f.ownerDocument;
    if ( g ) return c = g.documentElement, ia.contains( c, f ) ? ( typeof f.getBoundingClientRect !== V && ( e = f.getBoundingClientRect() ), d = S( g ), {
      top: e.top + ( d.pageYOffset || c.scrollTop ) - ( c.clientTop || 0 ),
      left: e.left + ( d.pageXOffset || c.scrollLeft ) - ( c.clientLeft || 0 )
    } ) : e
  }, ia.offset = {
    setOffset: function ( a, b, c ) {
      var d = ia.css( a, "position" );
      "static" === d && ( a.style.position = "relative" );
      var e, f, g = ia( a ),
        h = g.offset(),
        i = ia.css( a, "top" ),
        j = ia.css( a, "left" ),
        k = ( "absolute" === d || "fixed" === d ) && ia.inArray( "auto", [ i, j ] ) > -1,
        l = {},
        m = {};
      k ? ( m = g.position(), e = m.top, f = m.left ) : ( e = parseFloat( i ) || 0, f = parseFloat( j ) || 0 ), ia.isFunction( b ) && ( b = b.call( a, c, h ) ), null != b.top && ( l.top = b.top - h.top + e ), null != b.left && ( l.left = b.left - h.left + f ), "using" in b ? b.using.call( a, l ) : g.css( l )
    }
  }, ia.fn.extend( {
    position: function () {
      if ( this[ 0 ] ) {
        var a, b, c = {
            top: 0,
            left: 0
          },
          d = this[ 0 ];
        return "fixed" === ia.css( d, "position" ) ? b = d.getBoundingClientRect() : ( a = this.offsetParent(), b = this.offset(), ia.nodeName( a[ 0 ], "html" ) || ( c = a.offset() ), c.top += ia.css( a[ 0 ], "borderTopWidth", !0 ), c.left += ia.css( a[ 0 ], "borderLeftWidth", !0 ) ), {
          top: b.top - c.top - ia.css( d, "marginTop", !0 ),
          left: b.left - c.left - ia.css( d, "marginLeft", !0 )
        }
      }
    },
    offsetParent: function () {
      return this.map( function () {
        for ( var a = this.offsetParent || W.documentElement; a && !ia.nodeName( a, "html" ) && "static" === ia.css( a, "position" ); ) a = a.offsetParent;
        return a || W.documentElement
      } )
    }
  } ), ia.each( {
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function ( a, c ) {
    var d = /Y/.test( c );
    ia.fn[ a ] = function ( e ) {
      return ia.access( this, function ( a, e, f ) {
        var g = S( a );
        return f === b ? g ? c in g ? g[ c ] : g.document.documentElement[ e ] : a[ e ] : void( g ? g.scrollTo( d ? ia( g ).scrollLeft() : f, d ? f : ia( g ).scrollTop() ) : a[ e ] = f )
      }, a, e, arguments.length, null )
    }
  } ), ia.each( {
    Height: "height",
    Width: "width"
  }, function ( a, c ) {
    ia.each( {
      padding: "inner" + a,
      content: c,
      "": "outer" + a
    }, function ( d, e ) {
      ia.fn[ e ] = function ( e, f ) {
        var g = arguments.length && ( d || "boolean" != typeof e ),
          h = d || ( e === !0 || f === !0 ? "margin" : "border" );
        return ia.access( this, function ( c, d, e ) {
          var f;
          return ia.isWindow( c ) ? c.document.documentElement[ "client" + a ] : 9 === c.nodeType ? ( f = c.documentElement, Math.max( c.body[ "scroll" + a ], f[ "scroll" + a ], c.body[ "offset" + a ], f[ "offset" + a ], f[ "client" + a ] ) ) : e === b ? ia.css( c, d, h ) : ia.style( c, d, e, h )
        }, c, g ? e : b, g, null )
      }
    } )
  } ), a.jQuery = a.$ = ia, "function" == typeof define && define.amd && define.amd.jQuery && define( "jquery", [], function () {
    return ia
  } )
}( window ),
function ( a, b ) {
  var c, d = "superslides";
  c = function ( c, d ) {
    this.options = b.extend( {
      play: !1,
      animation_speed: 600,
      animation_easing: "swing",
      animation: "slide",
      inherit_width_from: a,
      inherit_height_from: a,
      pagination: !0,
      hashchange: !1,
      scrollable: !0,
      elements: {
        preserve: ".preserve",
        nav: ".slides-navigation",
        container: ".slides-container",
        pagination: ".slides-pagination"
      }
    }, d );
    var e = this,
      f = b( "<div>", {
        "class": "slides-control"
      } ),
      g = 1;
    this.$el = b( c ), this.$container = this.$el.find( this.options.elements.container );
    var h = function () {
        return g = e._findMultiplier(), e.$el.on( "click", e.options.elements.nav + " a", function ( a ) {
          a.preventDefault(), e.stop(), b( this ).hasClass( "next" ) ? e.animate( "next", function () {
            e.start()
          } ) : e.animate( "prev", function () {
            e.start()
          } )
        } ), b( document ).on( "keyup", function ( a ) {
          37 === a.keyCode && e.animate( "prev" ), 39 === a.keyCode && e.animate( "next" )
        } ), b( a ).on( "resize", function () {
          setTimeout( function () {
            var a = e.$container.children();
            e.width = e._findWidth(), e.height = e._findHeight(), a.css( {
              width: e.width,
              left: e.width
            } ), e.css.containers(), e.css.images()
          }, 10 )
        } ), b( a ).on( "hashchange", function () {
          var a, b = e._parseHash();
          a = b && !isNaN( b ) ? e._upcomingSlide( b - 1 ) : e._upcomingSlide( b ), a >= 0 && a !== e.current && e.animate( a )
        } ), e.pagination._events(), e.start(), e
      },
      i = {
        containers: function () {
          e.init ? ( e.$el.css( {
            height: e.height
          } ), e.$control.css( {
            width: e.width * g,
            left: -e.width
          } ), e.$container.css( {} ) ) : ( b( "body" ).css( {
            margin: 0
          } ), e.$el.css( {
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: e.height
          } ), e.$control.css( {
            position: "relative",
            transform: "translate3d(0)",
            height: "100%",
            width: e.width * g,
            left: -e.width
          } ), e.$container.css( {
            display: "none",
            margin: "0",
            padding: "0",
            listStyle: "none",
            position: "relative",
            height: "100%"
          } ) ), 1 === e.size() && e.$el.find( e.options.elements.nav ).hide()
        },
        images: function () {
          var a = e.$container.find( "img" ).not( e.options.elements.preserve );
          a.removeAttr( "width" ).removeAttr( "height" ).css( {
            "-webkit-backface-visibility": "hidden",
            "-ms-interpolation-mode": "bicubic",
            position: "absolute",
            left: "0",
            top: "0",
            "z-index": "-1",
            "max-width": "none"
          } ), a.each( function () {
            var a = e.image._aspectRatio( this ),
              c = this;
            if ( b.data( this, "processed" ) ) e.image._scale( c, a ), e.image._center( c, a );
            else {
              var d = new Image;
              d.onload = function () {
                e.image._scale( c, a ), e.image._center( c, a ),
                  b.data( c, "processed", !0 )
              }, d.src = this.src
            }
          } )
        },
        children: function () {
          var a = e.$container.children();
          a.is( "img" ) && ( a.each( function () {
            if ( b( this ).is( "img" ) ) {
              b( this ).wrap( "<div>" );
              var a = b( this ).attr( "id" );
              b( this ).removeAttr( "id" ), b( this ).parent().attr( "id", a )
            }
          } ), a = e.$container.children() ), e.init || a.css( {
            display: "none",
            left: 2 * e.width
          } ), a.css( {
            position: "absolute",
            overflow: "hidden",
            height: "100%",
            width: e.width,
            top: 0,
            zIndex: 0
          } )
        }
      },
      j = {
        slide: function ( a, b ) {
          var c = e.$container.children(),
            d = c.eq( a.upcoming_slide );
          d.css( {
            left: a.upcoming_position,
            display: "block"
          } ), e.$control.animate( {
            left: a.offset
          }, e.options.animation_speed, e.options.animation_easing, function () {
            e.size() > 1 && ( e.$control.css( {
              left: -e.width
            } ), c.eq( a.upcoming_slide ).css( {
              left: e.width,
              zIndex: 2
            } ), a.outgoing_slide >= 0 && c.eq( a.outgoing_slide ).css( {
              left: e.width,
              display: "none",
              zIndex: 0
            } ) ), b()
          } )
        },
        fade: function ( a, b ) {
          var c = this,
            d = c.$container.children(),
            e = d.eq( a.outgoing_slide ),
            f = d.eq( a.upcoming_slide );
          f.css( {
            left: this.width,
            opacity: 1,
            display: "block"
          } ), a.outgoing_slide >= 0 ? e.animate( {
            opacity: 0
          }, c.options.animation_speed, c.options.animation_easing, function () {
            c.size() > 1 && ( d.eq( a.upcoming_slide ).css( {
              zIndex: 2
            } ), a.outgoing_slide >= 0 && d.eq( a.outgoing_slide ).css( {
              opacity: 1,
              display: "none",
              zIndex: 0
            } ) ), b()
          } ) : ( f.css( {
            zIndex: 2
          } ), b() )
        }
      };
    j = b.extend( j, b.fn.superslides.fx );
    var k = {
        _centerY: function ( a ) {
          var c = b( a );
          c.css( {
            top: ( e.height - c.height() ) / 2
          } )
        },
        _centerX: function ( a ) {
          var c = b( a );
          c.css( {
            left: ( e.width - c.width() ) / 2
          } )
        },
        _center: function ( a ) {
          e.image._centerX( a ), e.image._centerY( a )
        },
        _aspectRatio: function ( a ) {
          if ( !a.naturalHeight && !a.naturalWidth ) {
            var b = new Image;
            b.src = a.src, a.naturalHeight = b.height, a.naturalWidth = b.width
          }
          return a.naturalHeight / a.naturalWidth
        },
        _scale: function ( a, c ) {
          c = c || e.image._aspectRatio( a );
          var d = e.height / e.width,
            f = b( a );
          d > c ? f.css( {
            height: e.height,
            width: e.height / c
          } ) : f.css( {
            height: e.width * c,
            width: e.width
          } )
        }
      },
      l = {
        _setCurrent: function ( a ) {
          if ( e.$pagination ) {
            var b = e.$pagination.children();
            b.removeClass( "current" ), b.eq( a ).addClass( "current" )
          }
        },
        _addItem: function ( a ) {
          var c = a + 1,
            d = c,
            f = e.$container.children().eq( a ),
            g = f.attr( "id" );
          g && ( d = g );
          var h = b( "<a>", {
            href: "#" + d,
            text: d
          } );
          h.appendTo( e.$pagination )
        },
        _setup: function () {
          if ( e.options.pagination && 1 !== e.size() ) {
            var a = b( "<nav>", {
              "class": e.options.elements.pagination.replace( /^\./, "" )
            } );
            e.$pagination = a.appendTo( e.$el );
            for ( var c = 0; e.size() > c; c++ ) e.pagination._addItem( c )
          }
        },
        _events: function () {
          e.$el.on( "click", e.options.elements.pagination + " a", function ( a ) {
            a.preventDefault();
            var b = e._parseHash( this.hash ),
              c = e._upcomingSlide( b - 1 );
            c !== e.current && e.animate( c, function () {
              e.start()
            } )
          } )
        }
      };
    return this.css = i, this.image = k, this.pagination = l, this.fx = j, this.animation = this.fx[ this.options.animation ], this.$control = this.$container.wrap( f ).parent( ".slides-control" ), e._findPositions(), e.width = e._findWidth(), e.height = e._findHeight(), this.css.children(), this.css.containers(), this.css.images(), this.pagination._setup(), h()
  }, c.prototype = {
    _findWidth: function () {
      return b( this.options.inherit_width_from ).width()
    },
    _findHeight: function () {
      return b( this.options.inherit_height_from ).height()
    },
    _findMultiplier: function () {
      return 1 === this.size() ? 1 : 3
    },
    _upcomingSlide: function ( a ) {
      if ( /next/.test( a ) ) return this._nextInDom();
      if ( /prev/.test( a ) ) return this._prevInDom();
      if ( /\d/.test( a ) ) return +a;
      if ( a && /\w/.test( a ) ) {
        var b = this._findSlideById( a );
        return b >= 0 ? b : 0
      }
      return 0
    },
    _findSlideById: function ( a ) {
      return this.$container.find( "#" + a ).index()
    },
    _findPositions: function ( a, b ) {
      b = b || this, void 0 === a && ( a = -1 ), b.current = a, b.next = b._nextInDom(), b.prev = b._prevInDom()
    },
    _nextInDom: function () {
      var a = this.current + 1;
      return a === this.size() && ( a = 0 ), a
    },
    _prevInDom: function () {
      var a = this.current - 1;
      return 0 > a && ( a = this.size() - 1 ), a
    },
    _parseHash: function ( b ) {
      return b = b || a.location.hash, b = b.replace( /^#/, "" ), b && !isNaN( +b ) && ( b = +b ), b
    },
    size: function () {
      return this.$container.children().length
    },
    destroy: function () {
      return this.$el.removeData()
    },
    update: function () {
      this.css.children(), this.css.containers(), this.css.images(), this.pagination._addItem( this.size() ), this._findPositions( this.current ), this.$el.trigger( "updated.slides" )
    },
    stop: function () {
      clearInterval( this.play_id ), delete this.play_id, this.$el.trigger( "stopped.slides" )
    },
    start: function () {
      var c = this;
      c.options.hashchange ? b( a ).trigger( "hashchange" ) : this.animate(), this.options.play && ( this.play_id && this.stop(), this.play_id = setInterval( function () {
        c.animate()
      }, this.options.play ) ), this.$el.trigger( "started.slides" )
    },
    animate: function ( b, c ) {
      var d = this,
        e = {};
      if ( !( this.animating || ( this.animating = !0, void 0 === b && ( b = "next" ), e.upcoming_slide = this._upcomingSlide( b ), e.upcoming_slide >= this.size() ) ) ) {
        if ( e.outgoing_slide = this.current, e.upcoming_position = 2 * this.width, e.offset = -e.upcoming_position, ( "prev" === b || e.outgoing_slide > b ) && ( e.upcoming_position = 0, e.offset = 0 ), d.size() > 1 && d.pagination._setCurrent( e.upcoming_slide ), d.options.hashchange ) {
          var f = e.upcoming_slide + 1,
            g = d.$container.children( ":eq(" + e.upcoming_slide + ")" ).attr( "id" );
          a.location.hash = g ? g : f
        }
        d.$el.trigger( "animating.slides", [ e ] ), d.animation( e, function () {
          d._findPositions( e.upcoming_slide, d ), "function" == typeof c && c(), d.animating = !1, d.$el.trigger( "animated.slides" ), d.init || ( d.$el.trigger( "init.slides" ), d.init = !0, d.$container.fadeIn( "fast" ) )
        } )
      }
    }
  }, b.fn[ d ] = function ( a, e ) {
    var f = [];
    return this.each( function () {
      var g, h, i;
      return g = b( this ), h = g.data( d ), i = "object" == typeof a && a, h || ( f = g.data( d, h = new c( this, i ) ) ), "string" == typeof a && ( f = h[ a ], "function" == typeof f ) ? f = f.call( h, e ) : void 0
    } ), f
  }, b.fn[ d ].fx = {}
}( this, jQuery ),
function ( a ) {
  function b() {}

  function c( a ) {
    function c( b ) {
      b.prototype.option || ( b.prototype.option = function ( b ) {
        a.isPlainObject( b ) && ( this.options = a.extend( !0, this.options, b ) )
      } )
    }

    function e( b, c ) {
      a.fn[ b ] = function ( e ) {
        if ( "string" == typeof e ) {
          for ( var g = d.call( arguments, 1 ), h = 0, i = this.length; i > h; h++ ) {
            var j = this[ h ],
              k = a.data( j, b );
            if ( k )
              if ( a.isFunction( k[ e ] ) && "_" !== e.charAt( 0 ) ) {
                var l = k[ e ].apply( k, g );
                if ( void 0 !== l ) return l
              } else f( "no such method '" + e + "' for " + b + " instance" );
            else f( "cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'" )
          }
          return this
        }
        return this.each( function () {
          var d = a.data( this, b );
          d ? ( d.option( e ), d._init() ) : ( d = new c( this, e ), a.data( this, b, d ) )
        } )
      }
    }
    if ( a ) {
      var f = "undefined" == typeof console ? b : function ( a ) {
        console.error( a )
      };
      return a.bridget = function ( a, b ) {
        c( b ), e( a, b )
      }, a.bridget
    }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd ? define( "jquery-bridget/jquery.bridget", [ "jquery" ], c ) : c( "object" == typeof exports ? require( "jquery" ) : a.jQuery )
}( window ),
function ( a ) {
  function b( a ) {
    return new RegExp( "(^|\\s+)" + a + "(\\s+|$)" )
  }

  function c( a, b ) {
    var c = d( a, b ) ? f : e;
    c( a, b )
  }
  var d, e, f;
  "classList" in document.documentElement ? ( d = function ( a, b ) {
    return a.classList.contains( b )
  }, e = function ( a, b ) {
    a.classList.add( b )
  }, f = function ( a, b ) {
    a.classList.remove( b )
  } ) : ( d = function ( a, c ) {
    return b( c ).test( a.className )
  }, e = function ( a, b ) {
    d( a, b ) || ( a.className = a.className + " " + b )
  }, f = function ( a, c ) {
    a.className = a.className.replace( b( c ), " " )
  } );
  var g = {
    hasClass: d,
    addClass: e,
    removeClass: f,
    toggleClass: c,
    has: d,
    add: e,
    remove: f,
    toggle: c
  };
  "function" == typeof define && define.amd ? define( "classie/classie", g ) : "object" == typeof exports ? module.exports = g : a.classie = g
}( window ),
function () {
  "use strict";

  function a() {}

  function b( a, b ) {
    for ( var c = a.length; c--; )
      if ( a[ c ].listener === b ) return c;
    return -1
  }

  function c( a ) {
    return function () {
      return this[ a ].apply( this, arguments )
    }
  }
  var d = a.prototype,
    e = this,
    f = e.EventEmitter;
  d.getListeners = function ( a ) {
    var b, c, d = this._getEvents();
    if ( a instanceof RegExp ) {
      b = {};
      for ( c in d ) d.hasOwnProperty( c ) && a.test( c ) && ( b[ c ] = d[ c ] )
    } else b = d[ a ] || ( d[ a ] = [] );
    return b
  }, d.flattenListeners = function ( a ) {
    var b, c = [];
    for ( b = 0; b < a.length; b += 1 ) c.push( a[ b ].listener );
    return c
  }, d.getListenersAsObject = function ( a ) {
    var b, c = this.getListeners( a );
    return c instanceof Array && ( b = {}, b[ a ] = c ), b || c
  }, d.addListener = function ( a, c ) {
    var d, e = this.getListenersAsObject( a ),
      f = "object" == typeof c;
    for ( d in e ) e.hasOwnProperty( d ) && -1 === b( e[ d ], c ) && e[ d ].push( f ? c : {
      listener: c,
      once: !1
    } );
    return this
  }, d.on = c( "addListener" ), d.addOnceListener = function ( a, b ) {
    return this.addListener( a, {
      listener: b,
      once: !0
    } )
  }, d.once = c( "addOnceListener" ), d.defineEvent = function ( a ) {
    return this.getListeners( a ), this
  }, d.defineEvents = function ( a ) {
    for ( var b = 0; b < a.length; b += 1 ) this.defineEvent( a[ b ] );
    return this
  }, d.removeListener = function ( a, c ) {
    var d, e, f = this.getListenersAsObject( a );
    for ( e in f ) f.hasOwnProperty( e ) && ( d = b( f[ e ], c ), -1 !== d && f[ e ].splice( d, 1 ) );
    return this
  }, d.off = c( "removeListener" ), d.addListeners = function ( a, b ) {
    return this.manipulateListeners( !1, a, b )
  }, d.removeListeners = function ( a, b ) {
    return this.manipulateListeners( !0, a, b )
  }, d.manipulateListeners = function ( a, b, c ) {
    var d, e, f = a ? this.removeListener : this.addListener,
      g = a ? this.removeListeners : this.addListeners;
    if ( "object" != typeof b || b instanceof RegExp )
      for ( d = c.length; d--; ) f.call( this, b, c[ d ] );
    else
      for ( d in b ) b.hasOwnProperty( d ) && ( e = b[ d ] ) && ( "function" == typeof e ? f.call( this, d, e ) : g.call( this, d, e ) );
    return this
  }, d.removeEvent = function ( a ) {
    var b, c = typeof a,
      d = this._getEvents();
    if ( "string" === c ) delete d[ a ];
    else if ( a instanceof RegExp )
      for ( b in d ) d.hasOwnProperty( b ) && a.test( b ) && delete d[ b ];
    else delete this._events;
    return this
  }, d.removeAllListeners = c( "removeEvent" ), d.emitEvent = function ( a, b ) {
    var c, d, e, f, g = this.getListenersAsObject( a );
    for ( e in g )
      if ( g.hasOwnProperty( e ) )
        for ( d = g[ e ].length; d--; ) c = g[ e ][ d ], c.once === !0 && this.removeListener( a, c.listener ), f = c.listener.apply( this, b || [] ), f === this._getOnceReturnValue() && this.removeListener( a, c.listener );
    return this
  }, d.trigger = c( "emitEvent" ), d.emit = function ( a ) {
    var b = Array.prototype.slice.call( arguments, 1 );
    return this.emitEvent( a, b )
  }, d.setOnceReturnValue = function ( a ) {
    return this._onceReturnValue = a, this
  }, d._getOnceReturnValue = function () {
    return this.hasOwnProperty( "_onceReturnValue" ) ? this._onceReturnValue : !0
  }, d._getEvents = function () {
    return this._events || ( this._events = {} )
  }, a.noConflict = function () {
    return e.EventEmitter = f, a
  }, "function" == typeof define && define.amd ? define( "eventEmitter/EventEmitter", [], function () {
    return a
  } ) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call( this ),
  function ( a ) {
    function b( b ) {
      var c = a.event;
      return c.target = c.target || c.srcElement || b, c
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener ? d = function ( a, b, c ) {
      a.addEventListener( b, c, !1 )
    } : c.attachEvent && ( d = function ( a, c, d ) {
      a[ c + d ] = d.handleEvent ? function () {
        var c = b( a );
        d.handleEvent.call( d, c )
      } : function () {
        var c = b( a );
        d.call( a, c )
      }, a.attachEvent( "on" + c, a[ c + d ] )
    } );
    var e = function () {};
    c.removeEventListener ? e = function ( a, b, c ) {
      a.removeEventListener( b, c, !1 )
    } : c.detachEvent && ( e = function ( a, b, c ) {
      a.detachEvent( "on" + b, a[ b + c ] );
      try {
        delete a[ b + c ]
      } catch ( d ) {
        a[ b + c ] = void 0
      }
    } );
    var f = {
      bind: d,
      unbind: e
    };
    "function" == typeof define && define.amd ? define( "eventie/eventie", f ) : "object" == typeof exports ? module.exports = f : a.eventie = f
  }( window ),
  function ( a ) {
    function b( a ) {
      if ( a ) {
        if ( "string" == typeof d[ a ] ) return a;
        a = a.charAt( 0 ).toUpperCase() + a.slice( 1 );
        for ( var b, e = 0, f = c.length; f > e; e++ )
          if ( b = c[ e ] + a, "string" == typeof d[ b ] ) return b
      }
    }
    var c = "Webkit Moz ms Ms O".split( " " ),
      d = document.documentElement.style;
    "function" == typeof define && define.amd ? define( "get-style-property/get-style-property", [], function () {
      return b
    } ) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
  }( window ),
  function ( a, b ) {
    function c( a ) {
      var b = parseFloat( a ),
        c = -1 === a.indexOf( "%" ) && !isNaN( b );
      return c && b
    }

    function d() {}

    function e() {
      for ( var a = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, b = 0, c = h.length; c > b; b++ ) {
        var d = h[ b ];
        a[ d ] = 0
      }
      return a
    }

    function f( b ) {
      function d() {
        if ( !m ) {
          m = !0;
          var d = a.getComputedStyle;
          if ( j = function () {
              var a = d ? function ( a ) {
                return d( a, null )
              } : function ( a ) {
                return a.currentStyle
              };
              return function ( b ) {
                var c = a( b );
                return c || g( "Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1" ), c
              }
            }(), k = b( "boxSizing" ) ) {
            var e = document.createElement( "div" );
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[ k ] = "border-box";
            var f = document.body || document.documentElement;
            f.appendChild( e );
            var h = j( e );
            l = 200 === c( h.width ), f.removeChild( e )
          }
        }
      }

      function f( a ) {
        if ( d(), "string" == typeof a && ( a = document.querySelector( a ) ), a && "object" == typeof a && a.nodeType ) {
          var b = j( a );
          if ( "none" === b.display ) return e();
          var f = {};
          f.width = a.offsetWidth, f.height = a.offsetHeight;
          for ( var g = f.isBorderBox = !( !k || !b[ k ] || "border-box" !== b[ k ] ), m = 0, n = h.length; n > m; m++ ) {
            var o = h[ m ],
              p = b[ o ];
            p = i( a, p );
            var q = parseFloat( p );
            f[ o ] = isNaN( q ) ? 0 : q
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c( b.width );
          y !== !1 && ( f.width = y + ( x ? 0 : r + v ) );
          var z = c( b.height );
          return z !== !1 && ( f.height = z + ( x ? 0 : s + w ) ), f.innerWidth = f.width - ( r + v ), f.innerHeight = f.height - ( s + w ), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
        }
      }

      function i( b, c ) {
        if ( a.getComputedStyle || -1 === c.indexOf( "%" ) ) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return g && ( f.left = b.currentStyle.left ), d.left = c, c = d.pixelLeft, d.left = e, g && ( f.left = g ), c
      }
      var j, k, l, m = !1;
      return f
    }
    var g = "undefined" == typeof console ? d : function ( a ) {
        console.error( a )
      },
      h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define( "get-size/get-size", [ "get-style-property/get-style-property" ], f ) : "object" == typeof exports ? module.exports = f( require( "desandro-get-style-property" ) ) : a.getSize = f( a.getStyleProperty )
  }( window ),
  function ( a ) {
    function b( a ) {
      "function" == typeof a && ( b.isReady ? a() : g.push( a ) )
    }

    function c( a ) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d()
    }

    function d() {
      b.isReady = !0;
      for ( var a = 0, c = g.length; c > a; a++ ) {
        var d = g[ a ];
        d()
      }
    }

    function e( e ) {
      return "complete" === f.readyState ? d() : ( e.bind( f, "DOMContentLoaded", c ), e.bind( f, "readystatechange", c ), e.bind( a, "load", c ) ), b
    }
    var f = a.document,
      g = [];
    b.isReady = !1, "function" == typeof define && define.amd ? define( "doc-ready/doc-ready", [ "eventie/eventie" ], e ) : "object" == typeof exports ? module.exports = e( require( "eventie" ) ) : a.docReady = e( a.eventie )
  }( window ),
  function ( a ) {
    "use strict";

    function b( a, b ) {
      return a[ g ]( b )
    }

    function c( a ) {
      if ( !a.parentNode ) {
        var b = document.createDocumentFragment();
        b.appendChild( a )
      }
    }

    function d( a, b ) {
      c( a );
      for ( var d = a.parentNode.querySelectorAll( b ), e = 0, f = d.length; f > e; e++ )
        if ( d[ e ] === a ) return !0;
      return !1
    }

    function e( a, d ) {
      return c( a ), b( a, d )
    }
    var f, g = function () {
      if ( a.matches ) return "matches";
      if ( a.matchesSelector ) return "matchesSelector";
      for ( var b = [ "webkit", "moz", "ms", "o" ], c = 0, d = b.length; d > c; c++ ) {
        var e = b[ c ],
          f = e + "MatchesSelector";
        if ( a[ f ] ) return f
      }
    }();
    if ( g ) {
      var h = document.createElement( "div" ),
        i = b( h, "div" );
      f = i ? b : e
    } else f = d;
    "function" == typeof define && define.amd ? define( "matches-selector/matches-selector", [], function () {
      return f
    } ) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
  }( Element.prototype ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "fizzy-ui-utils/utils", [ "doc-ready/doc-ready", "matches-selector/matches-selector" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "doc-ready" ), require( "desandro-matches-selector" ) ) : a.fizzyUIUtils = b( a, a.docReady, a.matchesSelector )
  }( window, function ( a, b, c ) {
    var d = {};
    d.extend = function ( a, b ) {
      for ( var c in b ) a[ c ] = b[ c ];
      return a
    }, d.modulo = function ( a, b ) {
      return ( a % b + b ) % b
    };
    var e = Object.prototype.toString;
    d.isArray = function ( a ) {
      return "[object Array]" == e.call( a )
    }, d.makeArray = function ( a ) {
      var b = [];
      if ( d.isArray( a ) ) b = a;
      else if ( a && "number" == typeof a.length )
        for ( var c = 0, e = a.length; e > c; c++ ) b.push( a[ c ] );
      else b.push( a );
      return b
    }, d.indexOf = Array.prototype.indexOf ? function ( a, b ) {
      return a.indexOf( b )
    } : function ( a, b ) {
      for ( var c = 0, d = a.length; d > c; c++ )
        if ( a[ c ] === b ) return c;
      return -1
    }, d.removeFrom = function ( a, b ) {
      var c = d.indexOf( a, b ); - 1 != c && a.splice( c, 1 )
    }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function ( a ) {
      return a instanceof HTMLElement
    } : function ( a ) {
      return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
    }, d.setText = function () {
      function a( a, c ) {
        b = b || ( void 0 !== document.documentElement.textContent ? "textContent" : "innerText" ), a[ b ] = c
      }
      var b;
      return a
    }(), d.getParent = function ( a, b ) {
      for ( ; a != document.body; )
        if ( a = a.parentNode, c( a, b ) ) return a
    }, d.getQueryElement = function ( a ) {
      return "string" == typeof a ? document.querySelector( a ) : a
    }, d.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, d.filterFindElements = function ( a, b ) {
      a = d.makeArray( a );
      for ( var e = [], f = 0, g = a.length; g > f; f++ ) {
        var h = a[ f ];
        if ( d.isElement( h ) )
          if ( b ) {
            c( h, b ) && e.push( h );
            for ( var i = h.querySelectorAll( b ), j = 0, k = i.length; k > j; j++ ) e.push( i[ j ] )
          } else e.push( h )
      }
      return e
    }, d.debounceMethod = function ( a, b, c ) {
      var d = a.prototype[ b ],
        e = b + "Timeout";
      a.prototype[ b ] = function () {
        var a = this[ e ];
        a && clearTimeout( a );
        var b = arguments,
          f = this;
        this[ e ] = setTimeout( function () {
          d.apply( f, b ), delete f[ e ]
        }, c || 100 )
      }
    }, d.toDashed = function ( a ) {
      return a.replace( /(.)([A-Z])/g, function ( a, b, c ) {
        return b + "-" + c
      } ).toLowerCase()
    };
    var f = a.console;
    return d.htmlInit = function ( c, e ) {
      b( function () {
        for ( var b = d.toDashed( e ), g = document.querySelectorAll( ".js-" + b ), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++ ) {
          var k, l = g[ i ],
            m = l.getAttribute( h );
          try {
            k = m && JSON.parse( m )
          } catch ( n ) {
            f && f.error( "Error parsing " + h + " on " + l.nodeName.toLowerCase() + ( l.id ? "#" + l.id : "" ) + ": " + n );
            continue
          }
          var o = new c( l, k ),
            p = a.jQuery;
          p && p.data( l, e, o )
        }
      } )
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/cell", [ "get-size/get-size" ], function ( c ) {
      return b( a, c )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "get-size" ) ) : ( a.Flickity = a.Flickity || {}, a.Flickity.Cell = b( a, a.getSize ) )
  }( window, function ( a, b ) {
    function c( a, b ) {
      this.element = a, this.parent = b, this.create()
    }
    var d = "attachEvent" in a;
    return c.prototype.create = function () {
      this.element.style.position = "absolute", d && this.element.setAttribute( "unselectable", "on" ), this.x = 0, this.shift = 0
    }, c.prototype.destroy = function () {
      this.element.style.position = "";
      var a = this.parent.originSide;
      this.element.style[ a ] = ""
    }, c.prototype.getSize = function () {
      this.size = b( this.element )
    }, c.prototype.setPosition = function ( a ) {
      this.x = a, this.setDefaultTarget(), this.renderPosition( a )
    }, c.prototype.setDefaultTarget = function () {
      var a = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
      this.target = this.x + this.size[ a ] + this.size.width * this.parent.cellAlign
    }, c.prototype.renderPosition = function ( a ) {
      var b = this.parent.originSide;
      this.element.style[ b ] = this.parent.getPositionValue( a )
    }, c.prototype.wrapShift = function ( a ) {
      this.shift = a, this.renderPosition( this.x + this.parent.slideableWidth * a )
    }, c.prototype.remove = function () {
      this.element.parentNode.removeChild( this.element )
    }, c
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/animate", [ "get-style-property/get-style-property", "fizzy-ui-utils/utils" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "desandro-get-style-property" ), require( "fizzy-ui-utils" ) ) : ( a.Flickity = a.Flickity || {}, a.Flickity.animatePrototype = b( a, a.getStyleProperty, a.fizzyUIUtils ) )
  }( window, function ( a, b, c ) {
    for ( var d, e = 0, f = "webkit moz ms o".split( " " ), g = a.requestAnimationFrame, h = a.cancelAnimationFrame, i = 0; i < f.length && ( !g || !h ); i++ ) d = f[ i ], g = g || a[ d + "RequestAnimationFrame" ], h = h || a[ d + "CancelAnimationFrame" ] || a[ d + "CancelRequestAnimationFrame" ];
    g && h || ( g = function ( b ) {
      var c = ( new Date ).getTime(),
        d = Math.max( 0, 16 - ( c - e ) ),
        f = a.setTimeout( function () {
          b( c + d )
        }, d );
      return e = c + d, f
    }, h = function ( b ) {
      a.clearTimeout( b )
    } );
    var j = {};
    j.startAnimation = function () {
      this.isAnimating || ( this.isAnimating = !0, this.restingFrames = 0, this.animate() )
    }, j.animate = function () {
      this.applyDragForce(), this.applySelectedAttraction();
      var a = this.x;
      if ( this.integratePhysics(), this.positionSlider(), this.settle( a ), this.isAnimating ) {
        var b = this;
        g( function () {
          b.animate()
        } )
      }
    };
    var k = b( "transform" ),
      l = !!b( "perspective" );
    return j.positionSlider = function () {
      var a = this.x;
      this.options.wrapAround && this.cells.length > 1 && ( a = c.modulo( a, this.slideableWidth ), a -= this.slideableWidth, this.shiftWrapCells( a ) ), a += this.cursorPosition, a = this.options.rightToLeft && k ? -a : a;
      var b = this.getPositionValue( a );
      k ? this.slider.style[ k ] = l && this.isAnimating ? "translate3d(" + b + ",0,0)" : "translateX(" + b + ")" : this.slider.style[ this.originSide ] = b
    }, j.positionSliderAtSelected = function () {
      if ( this.cells.length ) {
        var a = this.cells[ this.selectedIndex ];
        this.x = -a.target, this.positionSlider()
      }
    }, j.getPositionValue = function ( a ) {
      return this.options.percentPosition ? .01 * Math.round( a / this.size.innerWidth * 1e4 ) + "%" : Math.round( a ) + "px"
    }, j.settle = function ( a ) {
      this.isPointerDown || Math.round( 100 * this.x ) != Math.round( 100 * a ) || this.restingFrames++, this.restingFrames > 2 && ( this.isAnimating = !1, delete this.isFreeScrolling, l && this.positionSlider(), this.dispatchEvent( "settle" ) )
    }, j.shiftWrapCells = function ( a ) {
      var b = this.cursorPosition + a;
      this._shiftCells( this.beforeShiftCells, b, -1 );
      var c = this.size.innerWidth - ( a + this.slideableWidth + this.cursorPosition );
      this._shiftCells( this.afterShiftCells, c, 1 )
    }, j._shiftCells = function ( a, b, c ) {
      for ( var d = 0, e = a.length; e > d; d++ ) {
        var f = a[ d ],
          g = b > 0 ? c : 0;
        f.wrapShift( g ), b -= f.size.outerWidth
      }
    }, j._unshiftCells = function ( a ) {
      if ( a && a.length )
        for ( var b = 0, c = a.length; c > b; b++ ) a[ b ].wrapShift( 0 )
    }, j.integratePhysics = function () {
      this.velocity += this.accel, this.x += this.velocity, this.velocity *= this.getFrictionFactor(), this.accel = 0
    }, j.applyForce = function ( a ) {
      this.accel += a
    }, j.getFrictionFactor = function () {
      return 1 - this.options[ this.isFreeScrolling ? "freeScrollFriction" : "friction" ]
    }, j.getRestingPosition = function () {
      return this.x + this.velocity / ( 1 - this.getFrictionFactor() )
    }, j.applyDragForce = function () {
      if ( this.isPointerDown ) {
        var a = this.dragX - this.x,
          b = a - this.velocity;
        this.applyForce( b )
      }
    }, j.applySelectedAttraction = function () {
      var a = this.cells.length;
      if ( !this.isPointerDown && !this.isFreeScrolling && a ) {
        var b = this.cells[ this.selectedIndex ],
          c = this.options.wrapAround && a > 1 ? this.slideableWidth * Math.floor( this.selectedIndex / a ) : 0,
          d = -1 * ( b.target + c ) - this.x,
          e = d * this.options.selectedAttraction;
        this.applyForce( e )
      }
    }, j
  } ),
  function ( a, b ) {
    "use strict";
    if ( "function" == typeof define && define.amd ) define( "flickity/js/flickity", [ "classie/classie", "eventEmitter/EventEmitter", "eventie/eventie", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./animate" ], function ( c, d, e, f, g, h, i ) {
      return b( a, c, d, e, f, g, h, i )
    } );
    else if ( "object" == typeof exports ) module.exports = b( a, require( "desandro-classie" ), require( "wolfy87-eventemitter" ), require( "eventie" ), require( "get-size" ), require( "fizzy-ui-utils" ), require( "./cell" ), require( "./animate" ) );
    else {
      var c = a.Flickity;
      a.Flickity = b( a, a.classie, a.EventEmitter, a.eventie, a.getSize, a.fizzyUIUtils, c.Cell, c.animatePrototype )
    }
  }( window, function ( a, b, c, d, e, f, g, h ) {
    function i( a, b ) {
      for ( a = f.makeArray( a ); a.length; ) b.appendChild( a.shift() )
    }

    function j( a, b ) {
      var c = f.getQueryElement( a );
      return c ? ( this.element = c, k && ( this.$element = k( this.element ) ), this.options = f.extend( {}, this.constructor.defaults ), this.option( b ), void this._create() ) : void( m && m.error( "Bad element for Flickity: " + ( c || a ) ) )
    }
    var k = a.jQuery,
      l = a.getComputedStyle,
      m = a.console,
      n = 0,
      o = {};
    j.defaults = {
      accessibility: !0,
      cellAlign: "center",
      freeScrollFriction: .075,
      friction: .28,
      percentPosition: !0,
      resize: !0,
      selectedAttraction: .025,
      setGallerySize: !0
    }, j.createMethods = [], f.extend( j.prototype, c.prototype ), j.prototype._create = function () {
      var b = this.guid = ++n;
      this.element.flickityGUID = b, o[ b ] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.accel = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement( "div" ), this.viewport.className = "flickity-viewport", j.setUnselectable( this.viewport ), this._createSlider(), ( this.options.resize || this.options.watchCSS ) && ( d.bind( a, "resize", this ), this.isResizeBound = !0 );
      for ( var c = 0, e = j.createMethods.length; e > c; c++ ) {
        var f = j.createMethods[ c ];
        this[ f ]()
      }
      this.options.watchCSS ? this.watchCSS() : this.activate()
    }, j.prototype.option = function ( a ) {
      f.extend( this.options, a )
    }, j.prototype.activate = function () {
      if ( !this.isActive ) {
        this.isActive = !0, b.add( this.element, "flickity-enabled" ), this.options.rightToLeft && b.add( this.element, "flickity-rtl" ), this.getSize();
        var a = this._filterFindCellElements( this.element.children );
        i( a, this.slider ), this.viewport.appendChild( this.slider ), this.element.appendChild( this.viewport ), this.reloadCells(), this.options.accessibility && ( this.element.tabIndex = 0, d.bind( this.element, "keydown", this ) ), this.emit( "activate" );
        var c, e = this.options.initialIndex;
        c = this.isInitActivated ? this.selectedIndex : void 0 !== e && this.cells[ e ] ? e : 0, this.select( c, !1, !0 ), this.isInitActivated = !0
      }
    }, j.prototype._createSlider = function () {
      var a = document.createElement( "div" );
      a.className = "flickity-slider", a.style[ this.originSide ] = 0, this.slider = a
    }, j.prototype._filterFindCellElements = function ( a ) {
      return f.filterFindElements( a, this.options.cellSelector )
    }, j.prototype.reloadCells = function () {
      this.cells = this._makeCells( this.slider.children ), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, j.prototype._makeCells = function ( a ) {
      for ( var b = this._filterFindCellElements( a ), c = [], d = 0, e = b.length; e > d; d++ ) {
        var f = b[ d ],
          h = new g( f, this );
        c.push( h )
      }
      return c
    }, j.prototype.getLastCell = function () {
      return this.cells[ this.cells.length - 1 ]
    }, j.prototype.positionCells = function () {
      this._sizeCells( this.cells ), this._positionCells( 0 )
    }, j.prototype._positionCells = function ( a ) {
      a = a || 0, this.maxCellHeight = a ? this.maxCellHeight || 0 : 0;
      var b = 0;
      if ( a > 0 ) {
        var c = this.cells[ a - 1 ];
        b = c.x + c.size.outerWidth
      }
      for ( var d, e = this.cells.length, f = a; e > f; f++ ) d = this.cells[ f ], d.setPosition( b ), b += d.size.outerWidth, this.maxCellHeight = Math.max( d.size.outerHeight, this.maxCellHeight );
      this.slideableWidth = b, this._containCells()
    }, j.prototype._sizeCells = function ( a ) {
      for ( var b = 0, c = a.length; c > b; b++ ) {
        var d = a[ b ];
        d.getSize()
      }
    }, j.prototype._init = j.prototype.reposition = function () {
      this.positionCells(), this.positionSliderAtSelected()
    }, j.prototype.getSize = function () {
      this.size = e( this.element ), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var p = {
      center: {
        left: .5,
        right: .5
      },
      left: {
        left: 0,
        right: 1
      },
      right: {
        right: 0,
        left: 1
      }
    };
    j.prototype.setCellAlign = function () {
      var a = p[ this.options.cellAlign ];
      this.cellAlign = a ? a[ this.originSide ] : this.options.cellAlign
    }, j.prototype.setGallerySize = function () {
      this.options.setGallerySize && ( this.viewport.style.height = this.maxCellHeight + "px" )
    }, j.prototype._getWrapShiftCells = function () {
      if ( this.options.wrapAround ) {
        this._unshiftCells( this.beforeShiftCells ), this._unshiftCells( this.afterShiftCells );
        var a = this.cursorPosition,
          b = this.cells.length - 1;
        this.beforeShiftCells = this._getGapCells( a, b, -1 ), a = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells( a, 0, 1 )
      }
    }, j.prototype._getGapCells = function ( a, b, c ) {
      for ( var d = []; a > 0; ) {
        var e = this.cells[ b ];
        if ( !e ) break;
        d.push( e ), b += c, a -= e.size.outerWidth
      }
      return d
    }, j.prototype._containCells = function () {
      if ( this.options.contain && !this.options.wrapAround && this.cells.length )
        for ( var a = this.options.rightToLeft ? "marginRight" : "marginLeft", b = this.options.rightToLeft ? "marginLeft" : "marginRight", c = this.cells[ 0 ].size[ a ], d = this.getLastCell(), e = this.slideableWidth - d.size[ b ], f = e - this.size.innerWidth * ( 1 - this.cellAlign ), g = e < this.size.innerWidth, h = 0, i = this.cells.length; i > h; h++ ) {
          var j = this.cells[ h ];
          j.setDefaultTarget(), g ? j.target = e * this.cellAlign : ( j.target = Math.max( j.target, this.cursorPosition + c ), j.target = Math.min( j.target, f ) )
        }
    }, j.prototype.dispatchEvent = function ( a, b, c ) {
      var d = [ b ].concat( c );
      if ( this.emitEvent( a, d ), k && this.$element )
        if ( b ) {
          var e = k.Event( b );
          e.type = a, this.$element.trigger( e, c )
        } else this.$element.trigger( a, c )
    }, j.prototype.select = function ( a, b, c ) {
      if ( this.isActive ) {
        a = parseInt( a, 10 );
        var d = this.cells.length;
        this.options.wrapAround && d > 1 && ( 0 > a ? this.x -= this.slideableWidth : a >= d && ( this.x += this.slideableWidth ) ), ( this.options.wrapAround || b ) && ( a = f.modulo( a, d ) ), this.cells[ a ] && ( this.selectedIndex = a, this.setSelectedCell(), c ? this.positionSliderAtSelected() : this.startAnimation(), this.dispatchEvent( "cellSelect" ) )
      }
    }, j.prototype.previous = function ( a ) {
      this.select( this.selectedIndex - 1, a )
    }, j.prototype.next = function ( a ) {
      this.select( this.selectedIndex + 1, a )
    }, j.prototype.setSelectedCell = function () {
      this._removeSelectedCellClass(), this.selectedCell = this.cells[ this.selectedIndex ], this.selectedElement = this.selectedCell.element, b.add( this.selectedElement, "is-selected" )
    }, j.prototype._removeSelectedCellClass = function () {
      this.selectedCell && b.remove( this.selectedCell.element, "is-selected" )
    }, j.prototype.getCell = function ( a ) {
      for ( var b = 0, c = this.cells.length; c > b; b++ ) {
        var d = this.cells[ b ];
        if ( d.element == a ) return d
      }
    }, j.prototype.getCells = function ( a ) {
      a = f.makeArray( a );
      for ( var b = [], c = 0, d = a.length; d > c; c++ ) {
        var e = a[ c ],
          g = this.getCell( e );
        g && b.push( g )
      }
      return b
    }, j.prototype.getCellElements = function () {
      for ( var a = [], b = 0, c = this.cells.length; c > b; b++ ) a.push( this.cells[ b ].element );
      return a
    }, j.prototype.getParentCell = function ( a ) {
      var b = this.getCell( a );
      return b ? b : ( a = f.getParent( a, ".flickity-slider > *" ), this.getCell( a ) )
    }, j.prototype.getAdjacentCellElements = function ( a, b ) {
      if ( !a ) return [ this.selectedElement ];
      b = void 0 === b ? this.selectedIndex : b;
      var c = this.cells.length;
      if ( 1 + 2 * a >= c ) return this.getCellElements();
      for ( var d = [], e = b - a; b + a >= e; e++ ) {
        var g = this.options.wrapAround ? f.modulo( e, c ) : e,
          h = this.cells[ g ];
        h && d.push( h.element )
      }
      return d
    }, j.prototype.uiChange = function () {
      this.emit( "uiChange" )
    }, j.prototype.childUIPointerDown = function ( a ) {
      this.emitEvent( "childUIPointerDown", [ a ] )
    }, j.prototype.onresize = function () {
      this.watchCSS(), this.resize()
    }, f.debounceMethod( j, "onresize", 150 ), j.prototype.resize = function () {
      this.isActive && ( this.getSize(), this.options.wrapAround && ( this.x = f.modulo( this.x, this.slideableWidth ) ), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.positionSliderAtSelected() )
    };
    var q = j.supportsConditionalCSS = function () {
      var a;
      return function () {
        if ( void 0 !== a ) return a;
        if ( !l ) return void( a = !1 );
        var b = document.createElement( "style" ),
          c = document.createTextNode( 'body:after { content: "foo"; display: none; }' );
        b.appendChild( c ), document.head.appendChild( b );
        var d = l( document.body, ":after" ).content;
        return a = -1 != d.indexOf( "foo" ), document.head.removeChild( b ), a
      }
    }();
    j.prototype.watchCSS = function () {
      var a = this.options.watchCSS;
      if ( a ) {
        var b = q();
        if ( !b ) {
          var c = "fallbackOn" == a ? "activate" : "deactivate";
          return void this[ c ]()
        }
        var d = l( this.element, ":after" ).content; - 1 != d.indexOf( "flickity" ) ? this.activate() : this.deactivate()
      }
    }, j.prototype.onkeydown = function ( a ) {
      if ( this.options.accessibility && ( !document.activeElement || document.activeElement == this.element ) )
        if ( 37 == a.keyCode ) {
          var b = this.options.rightToLeft ? "next" : "previous";
          this.uiChange(), this[ b ]()
        } else if ( 39 == a.keyCode ) {
        var c = this.options.rightToLeft ? "previous" : "next";
        this.uiChange(), this[ c ]()
      }
    }, j.prototype.deactivate = function () {
      if ( this.isActive ) {
        b.remove( this.element, "flickity-enabled" ), b.remove( this.element, "flickity-rtl" );
        for ( var a = 0, c = this.cells.length; c > a; a++ ) {
          var e = this.cells[ a ];
          e.destroy()
        }
        this._removeSelectedCellClass(), this.element.removeChild( this.viewport ), i( this.slider.children, this.element ), this.options.accessibility && ( this.element.removeAttribute( "tabIndex" ), d.unbind( this.element, "keydown", this ) ), this.isActive = !1, this.emit( "deactivate" )
      }
    }, j.prototype.destroy = function () {
      this.deactivate(), this.isResizeBound && d.unbind( a, "resize", this ), this.emit( "destroy" ), k && this.$element && k.removeData( this.element, "flickity" ), delete this.element.flickityGUID, delete o[ this.guid ]
    }, f.extend( j.prototype, h );
    var r = "attachEvent" in a;
    return j.setUnselectable = function ( a ) {
      r && a.setAttribute( "unselectable", "on" )
    }, j.data = function ( a ) {
      a = f.getQueryElement( a );
      var b = a && a.flickityGUID;
      return b && o[ b ]
    }, f.htmlInit( j, "flickity" ), k && k.bridget && k.bridget( "flickity", j ), j.Cell = g, j
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "unipointer/unipointer", [ "eventEmitter/EventEmitter", "eventie/eventie" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "wolfy87-eventemitter" ), require( "eventie" ) ) : a.Unipointer = b( a, a.EventEmitter, a.eventie )
  }( window, function ( a, b, c ) {
    function d() {}

    function e() {}
    e.prototype = new b, e.prototype.bindStartEvent = function ( a ) {
      this._bindStartEvent( a, !0 )
    }, e.prototype.unbindStartEvent = function ( a ) {
      this._bindStartEvent( a, !1 )
    }, e.prototype._bindStartEvent = function ( b, d ) {
      d = void 0 === d ? !0 : !!d;
      var e = d ? "bind" : "unbind";
      a.navigator.pointerEnabled ? c[ e ]( b, "pointerdown", this ) : a.navigator.msPointerEnabled ? c[ e ]( b, "MSPointerDown", this ) : ( c[ e ]( b, "mousedown", this ), c[ e ]( b, "touchstart", this ) )
    }, e.prototype.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, e.prototype.getTouch = function ( a ) {
      for ( var b = 0, c = a.length; c > b; b++ ) {
        var d = a[ b ];
        if ( d.identifier == this.pointerIdentifier ) return d
      }
    }, e.prototype.onmousedown = function ( a ) {
      var b = a.button;
      b && 0 !== b && 1 !== b || this._pointerDown( a, a )
    }, e.prototype.ontouchstart = function ( a ) {
      this._pointerDown( a, a.changedTouches[ 0 ] )
    }, e.prototype.onMSPointerDown = e.prototype.onpointerdown = function ( a ) {
      this._pointerDown( a, a )
    }, e.prototype._pointerDown = function ( a, b ) {
      this.isPointerDown || ( this.isPointerDown = !0, this.pointerIdentifier = void 0 !== b.pointerId ? b.pointerId : b.identifier, this.pointerDown( a, b ) )
    }, e.prototype.pointerDown = function ( a, b ) {
      this._bindPostStartEvents( a ), this.emitEvent( "pointerDown", [ a, b ] )
    };
    var f = {
      mousedown: [ "mousemove", "mouseup" ],
      touchstart: [ "touchmove", "touchend", "touchcancel" ],
      pointerdown: [ "pointermove", "pointerup", "pointercancel" ],
      MSPointerDown: [ "MSPointerMove", "MSPointerUp", "MSPointerCancel" ]
    };
    return e.prototype._bindPostStartEvents = function ( b ) {
      if ( b ) {
        for ( var d = f[ b.type ], e = b.preventDefault ? a : document, g = 0, h = d.length; h > g; g++ ) {
          var i = d[ g ];
          c.bind( e, i, this )
        }
        this._boundPointerEvents = {
          events: d,
          node: e
        }
      }
    }, e.prototype._unbindPostStartEvents = function () {
      var a = this._boundPointerEvents;
      if ( a && a.events ) {
        for ( var b = 0, d = a.events.length; d > b; b++ ) {
          var e = a.events[ b ];
          c.unbind( a.node, e, this )
        }
        delete this._boundPointerEvents
      }
    }, e.prototype.onmousemove = function ( a ) {
      this._pointerMove( a, a )
    }, e.prototype.onMSPointerMove = e.prototype.onpointermove = function ( a ) {
      a.pointerId == this.pointerIdentifier && this._pointerMove( a, a )
    }, e.prototype.ontouchmove = function ( a ) {
      var b = this.getTouch( a.changedTouches );
      b && this._pointerMove( a, b )
    }, e.prototype._pointerMove = function ( a, b ) {
      this.pointerMove( a, b )
    }, e.prototype.pointerMove = function ( a, b ) {
      this.emitEvent( "pointerMove", [ a, b ] )
    }, e.prototype.onmouseup = function ( a ) {
      this._pointerUp( a, a )
    }, e.prototype.onMSPointerUp = e.prototype.onpointerup = function ( a ) {
      a.pointerId == this.pointerIdentifier && this._pointerUp( a, a )
    }, e.prototype.ontouchend = function ( a ) {
      var b = this.getTouch( a.changedTouches );
      b && this._pointerUp( a, b )
    }, e.prototype._pointerUp = function ( a, b ) {
      this._pointerDone(), this.pointerUp( a, b )
    }, e.prototype.pointerUp = function ( a, b ) {
      this.emitEvent( "pointerUp", [ a, b ] )
    }, e.prototype._pointerDone = function () {
      this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
    }, e.prototype.pointerDone = d, e.prototype.onMSPointerCancel = e.prototype.onpointercancel = function ( a ) {
      a.pointerId == this.pointerIdentifier && this._pointerCancel( a, a )
    }, e.prototype.ontouchcancel = function ( a ) {
      var b = this.getTouch( a.changedTouches );
      b && this._pointerCancel( a, b )
    }, e.prototype._pointerCancel = function ( a, b ) {
      this._pointerDone(), this.pointerCancel( a, b )
    }, e.prototype.pointerCancel = function ( a, b ) {
      this.emitEvent( "pointerCancel", [ a, b ] )
    }, e.getPointerPoint = function ( a ) {
      return {
        x: void 0 !== a.pageX ? a.pageX : a.clientX,
        y: void 0 !== a.pageY ? a.pageY : a.clientY
      }
    }, e
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "unidragger/unidragger", [ "eventie/eventie", "unipointer/unipointer" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "eventie" ), require( "unipointer" ) ) : a.Unidragger = b( a, a.eventie, a.Unipointer )
  }( window, function ( a, b, c ) {
    function d() {}

    function e( a ) {
      a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    function f() {}

    function g() {
      return !1
    }
    f.prototype = new c, f.prototype.bindHandles = function () {
      this._bindHandles( !0 )
    }, f.prototype.unbindHandles = function () {
      this._bindHandles( !1 )
    };
    var h = a.navigator;
    f.prototype._bindHandles = function ( a ) {
      a = void 0 === a ? !0 : !!a;
      var c;
      c = h.pointerEnabled ? function ( b ) {
        b.style.touchAction = a ? "none" : ""
      } : h.msPointerEnabled ? function ( b ) {
        b.style.msTouchAction = a ? "none" : ""
      } : function () {
        a && j( g )
      };
      for ( var d = a ? "bind" : "unbind", e = 0, f = this.handles.length; f > e; e++ ) {
        var g = this.handles[ e ];
        this._bindStartEvent( g, a ), c( g ), b[ d ]( g, "click", this )
      }
    };
    var i = "attachEvent" in document.documentElement,
      j = i ? function ( a ) {
        "IMG" == a.nodeName && ( a.ondragstart = g );
        for ( var b = a.querySelectorAll( "img" ), c = 0, d = b.length; d > c; c++ ) {
          var e = b[ c ];
          e.ondragstart = g
        }
      } : d;
    f.prototype.pointerDown = function ( c, d ) {
      if ( "INPUT" == c.target.nodeName && "range" == c.target.type ) return this.isPointerDown = !1, void delete this.pointerIdentifier;
      this._dragPointerDown( c, d );
      var e = document.activeElement;
      e && e.blur && e.blur(), this._bindPostStartEvents( c ), this.pointerDownScroll = f.getScrollPosition(), b.bind( a, "scroll", this ), this.emitEvent( "pointerDown", [ c, d ] )
    }, f.prototype._dragPointerDown = function ( a, b ) {
      this.pointerDownPoint = c.getPointerPoint( b );
      var d = "touchstart" == a.type,
        f = a.target.nodeName;
      d || "SELECT" == f || e( a )
    }, f.prototype.pointerMove = function ( a, b ) {
      var c = this._dragPointerMove( a, b );
      this.emitEvent( "pointerMove", [ a, b, c ] ), this._dragMove( a, b, c )
    }, f.prototype._dragPointerMove = function ( a, b ) {
      var d = c.getPointerPoint( b ),
        e = {
          x: d.x - this.pointerDownPoint.x,
          y: d.y - this.pointerDownPoint.y
        };
      return !this.isDragging && this.hasDragStarted( e ) && this._dragStart( a, b ), e
    }, f.prototype.hasDragStarted = function ( a ) {
      return Math.abs( a.x ) > 3 || Math.abs( a.y ) > 3
    }, f.prototype.pointerUp = function ( a, b ) {
      this.emitEvent( "pointerUp", [ a, b ] ), this._dragPointerUp( a, b )
    }, f.prototype._dragPointerUp = function ( a, b ) {
      this.isDragging ? this._dragEnd( a, b ) : this._staticClick( a, b )
    }, f.prototype.pointerDone = function () {
      b.unbind( a, "scroll", this )
    }, f.prototype._dragStart = function ( a, b ) {
      this.isDragging = !0, this.dragStartPoint = f.getPointerPoint( b ), this.isPreventingClicks = !0, this.dragStart( a, b )
    }, f.prototype.dragStart = function ( a, b ) {
      this.emitEvent( "dragStart", [ a, b ] )
    }, f.prototype._dragMove = function ( a, b, c ) {
      this.isDragging && this.dragMove( a, b, c )
    }, f.prototype.dragMove = function ( a, b, c ) {
      e( a ), this.emitEvent( "dragMove", [ a, b, c ] )
    }, f.prototype._dragEnd = function ( a, b ) {
      this.isDragging = !1;
      var c = this;
      setTimeout( function () {
        delete c.isPreventingClicks
      } ), this.dragEnd( a, b )
    }, f.prototype.dragEnd = function ( a, b ) {
      this.emitEvent( "dragEnd", [ a, b ] )
    }, f.prototype.pointerDone = function () {
      b.unbind( a, "scroll", this ), delete this.pointerDownScroll
    }, f.prototype.onclick = function ( a ) {
      this.isPreventingClicks && e( a )
    }, f.prototype._staticClick = function ( a, b ) {
      if ( !this.isIgnoringMouseUp || "mouseup" != a.type ) {
        var c = a.target.nodeName;
        if ( ( "INPUT" == c || "TEXTAREA" == c ) && a.target.focus(), this.staticClick( a, b ), "mouseup" != a.type ) {
          this.isIgnoringMouseUp = !0;
          var d = this;
          setTimeout( function () {
            delete d.isIgnoringMouseUp
          }, 400 )
        }
      }
    }, f.prototype.staticClick = function ( a, b ) {
      this.emitEvent( "staticClick", [ a, b ] )
    }, f.prototype.onscroll = function () {
      var a = f.getScrollPosition(),
        b = this.pointerDownScroll.x - a.x,
        c = this.pointerDownScroll.y - a.y;
      ( Math.abs( b ) > 3 || Math.abs( c ) > 3 ) && this._pointerDone()
    }, f.getPointerPoint = function ( a ) {
      return {
        x: void 0 !== a.pageX ? a.pageX : a.clientX,
        y: void 0 !== a.pageY ? a.pageY : a.clientY
      }
    };
    var k = void 0 !== a.pageYOffset;
    return f.getScrollPosition = function () {
      return {
        x: k ? a.pageXOffset : document.body.scrollLeft,
        y: k ? a.pageYOffset : document.body.scrollTop
      }
    }, f.getPointerPoint = c.getPointerPoint, f
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/drag", [ "classie/classie", "eventie/eventie", "./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils" ], function ( c, d, e, f, g ) {
      return b( a, c, d, e, f, g )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "desandro-classie" ), require( "eventie" ), require( "./flickity" ), require( "unidragger" ), require( "fizzy-ui-utils" ) ) : a.Flickity = b( a, a.classie, a.eventie, a.Flickity, a.Unidragger, a.fizzyUIUtils )
  }( window, function ( a, b, c, d, e, f ) {
    function g( a ) {
      a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    function h( b ) {
      var c = e.getPointerPoint( b );
      return c.y - a.pageYOffset
    }
    f.extend( d.defaults, {
      draggable: !0,
      touchVerticalScroll: !0
    } ), d.createMethods.push( "_createDrag" ), f.extend( d.prototype, e.prototype ), d.prototype._createDrag = function () {
      this.on( "activate", this.bindDrag ), this.on( "uiChange", this._uiChangeDrag ), this.on( "childUIPointerDown", this._childUIPointerDownDrag ), this.on( "deactivate", this.unbindDrag )
    }, d.prototype.bindDrag = function () {
      this.options.draggable && !this.isDragBound && ( b.add( this.element, "is-draggable" ), this.handles = [ this.viewport ], this.bindHandles(), this.isDragBound = !0 )
    }, d.prototype.unbindDrag = function () {
      this.isDragBound && ( b.remove( this.element, "is-draggable" ), this.unbindHandles(), delete this.isDragBound )
    }, d.prototype._uiChangeDrag = function () {
      delete this.isFreeScrolling
    }, d.prototype._childUIPointerDownDrag = function ( a ) {
      g( a ), this.pointerDownFocus( a )
    }, d.prototype.pointerDown = function ( d, f ) {
      if ( "INPUT" == d.target.nodeName && "range" == d.target.type ) return this.isPointerDown = !1, void delete this.pointerIdentifier;
      this._dragPointerDown( d, f );
      var g = document.activeElement;
      g && g.blur && g != this.element && g != document.body && g.blur(), this.pointerDownFocus( d ), this.dragX = this.x, b.add( this.viewport, "is-pointer-down" ), this._bindPostStartEvents( d ), this.pointerDownScroll = e.getScrollPosition(), c.bind( a, "scroll", this ), this.dispatchEvent( "pointerDown", d, [ f ] )
    };
    var i = {
        touchstart: !0,
        MSPointerDown: !0
      },
      j = {
        INPUT: !0,
        SELECT: !0
      };
    d.prototype.pointerDownFocus = function ( b ) {
      if ( this.options.accessibility && !i[ b.type ] && !j[ b.target.nodeName ] ) {
        var c = a.pageYOffset;
        this.element.focus(), a.pageYOffset != c && a.scrollTo( a.pageXOffset, c )
      }
    }, d.prototype.pointerMove = function ( a, b ) {
      var c = this._dragPointerMove( a, b );
      this.touchVerticalScrollMove( a, b, c ), this._dragMove( a, b, c ), this.dispatchEvent( "pointerMove", a, [ b, c ] )
    }, d.prototype.hasDragStarted = function ( a ) {
      return !this.isTouchScrolling && Math.abs( a.x ) > 3
    }, d.prototype.pointerUp = function ( a, c ) {
      delete this.isTouchScrolling, b.remove( this.viewport, "is-pointer-down" ), this.dispatchEvent( "pointerUp", a, [ c ] ), this._dragPointerUp( a, c )
    };
    var k = {
      touchmove: !0,
      MSPointerMove: !0
    };
    return d.prototype.touchVerticalScrollMove = function ( b, c, d ) {
      var e = this.options.touchVerticalScroll,
        f = "withDrag" == e ? !e : this.isDragging || !e;
      !f && k[ b.type ] && !this.isTouchScrolling && Math.abs( d.y ) > 10 && ( this.startScrollY = a.pageYOffset, this.pointerWindowStartY = h( c ), this.isTouchScrolling = !0 )
    }, d.prototype.dragStart = function ( a, b ) {
      this.dragStartPosition = this.x, this.startAnimation(), this.dispatchEvent( "dragStart", a, [ b ] )
    }, d.prototype.dragMove = function ( a, b, c ) {
      g( a ), this.previousDragX = this.dragX;
      var d = this.options.rightToLeft ? -1 : 1,
        e = this.dragStartPosition + c.x * d;
      if ( !this.options.wrapAround && this.cells.length ) {
        var f = Math.max( -this.cells[ 0 ].target, this.dragStartPosition );
        e = e > f ? .5 * ( e + f ) : e;
        var h = Math.min( -this.getLastCell().target, this.dragStartPosition );
        e = h > e ? .5 * ( e + h ) : e
      }
      this.dragX = e, this.dragMoveTime = new Date, this.dispatchEvent( "dragMove", a, [ b, c ] )
    }, d.prototype.dragEnd = function ( a, b ) {
      this.options.freeScroll && ( this.isFreeScrolling = !0 );
      var c = this.dragEndRestingSelect();
      if ( this.options.freeScroll && !this.options.wrapAround ) {
        var d = this.getRestingPosition();
        this.isFreeScrolling = -d > this.cells[ 0 ].target && -d < this.getLastCell().target
      } else this.options.freeScroll || c != this.selectedIndex || ( c += this.dragEndBoostSelect() );
      delete this.previousDragX, this.select( c ), this.dispatchEvent( "dragEnd", a, [ b ] )
    }, d.prototype.dragEndRestingSelect = function () {
      var a = this.getRestingPosition(),
        b = Math.abs( this.getCellDistance( -a, this.selectedIndex ) ),
        c = this._getClosestResting( a, b, 1 ),
        d = this._getClosestResting( a, b, -1 ),
        e = c.distance < d.distance ? c.index : d.index;
      return e
    }, d.prototype._getClosestResting = function ( a, b, c ) {
      for ( var d = this.selectedIndex, e = 1 / 0, f = this.options.contain && !this.options.wrapAround ? function ( a, b ) {
          return b >= a
        } : function ( a, b ) {
          return b > a
        }; f( b, e ) && ( d += c, e = b, b = this.getCellDistance( -a, d ), null !== b ); ) b = Math.abs( b );
      return {
        distance: e,
        index: d - c
      }
    }, d.prototype.getCellDistance = function ( a, b ) {
      var c = this.cells.length,
        d = this.options.wrapAround && c > 1,
        e = d ? f.modulo( b, c ) : b,
        g = this.cells[ e ];
      if ( !g ) return null;
      var h = d ? this.slideableWidth * Math.floor( b / c ) : 0;
      return a - ( g.target + h )
    }, d.prototype.dragEndBoostSelect = function () {
      if ( void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100 ) return 0;
      var a = this.getCellDistance( -this.dragX, this.selectedIndex ),
        b = this.previousDragX - this.dragX;
      return a > 0 && b > 0 ? 1 : 0 > a && 0 > b ? -1 : 0
    }, d.prototype.staticClick = function ( a, b ) {
      var c = this.getParentCell( a.target ),
        d = c && c.element,
        e = c && f.indexOf( this.cells, c );
      this.dispatchEvent( "staticClick", a, [ b, d, e ] )
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "tap-listener/tap-listener", [ "unipointer/unipointer" ], function ( c ) {
      return b( a, c )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "unipointer" ) ) : a.TapListener = b( a, a.Unipointer )
  }( window, function ( a, b ) {
    function c( a ) {
      a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    function d( a ) {
      this.bindTap( a )
    }
    d.prototype = new b, d.prototype.bindTap = function ( a ) {
      a && ( this.unbindTap(), this.tapElement = a, this._bindStartEvent( a, !0 ) )
    }, d.prototype.unbindTap = function () {
      this.tapElement && ( this._bindStartEvent( this.tapElement, !0 ), delete this.tapElement )
    };
    var e = d.prototype.pointerDown;
    d.prototype.pointerDown = function ( a ) {
      "touchstart" == a.type && c( a ), e.apply( this, arguments )
    };
    var f = void 0 !== a.pageYOffset;
    return d.prototype.pointerUp = function ( c, d ) {
      var e = b.getPointerPoint( d ),
        g = this.tapElement.getBoundingClientRect(),
        h = f ? a.pageXOffset : document.body.scrollLeft,
        i = f ? a.pageYOffset : document.body.scrollTop,
        j = e.x >= g.left + h && e.x <= g.right + h && e.y >= g.top + i && e.y <= g.bottom + i;
      j && this.emitEvent( "tap", [ c, d ] )
    }, d.prototype.destroy = function () {
      this.pointerDone(), this.unbindTap()
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/prev-next-button", [ "eventie/eventie", "./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils" ], function ( c, d, e, f ) {
      return b( a, c, d, e, f )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "eventie" ), require( "./flickity" ), require( "tap-listener" ), require( "fizzy-ui-utils" ) ) : b( a, a.eventie, a.Flickity, a.TapListener, a.fizzyUIUtils )
  }( window, function ( a, b, c, d, e ) {
    function f( a, b ) {
      this.direction = a, this.parent = b, this._create()
    }

    function g( a ) {
      return "string" == typeof a ? a : "M " + a.x0 + ",50 L " + a.x1 + "," + ( a.y1 + 50 ) + " L " + a.x2 + "," + ( a.y2 + 50 ) + " L " + a.x3 + ",50  L " + a.x2 + "," + ( 50 - a.y2 ) + " L " + a.x1 + "," + ( 50 - a.y1 ) + " Z"
    }
    var h = "http://www.w3.org/2000/svg",
      i = function () {
        function a() {
          if ( void 0 !== b ) return b;
          var a = document.createElement( "div" );
          return a.innerHTML = "<svg/>", b = ( a.firstChild && a.firstChild.namespaceURI ) == h
        }
        var b;
        return a
      }();
    return f.prototype = new d, f.prototype._create = function () {
      this.isEnabled = !0, this.isPrevious = -1 == this.direction;
      var a = this.parent.options.rightToLeft ? 1 : -1;
      this.isLeft = this.direction == a;
      var b = this.element = document.createElement( "button" );
      if ( b.className = "flickity-prev-next-button", b.className += this.isPrevious ? " previous" : " next", b.setAttribute( "type", "button" ), this.disable(), c.setUnselectable( b ), i() ) {
        var d = this.createSVG();
        b.appendChild( d )
      } else this.setArrowText(), b.className += " no-svg";
      var e = this;
      this.onCellSelect = function () {
        e.update()
      }, this.parent.on( "cellSelect", this.onCellSelect ), this.on( "tap", this.onTap ), this.on( "pointerDown", function ( a, b ) {
        e.parent.childUIPointerDown( b )
      } )
    }, f.prototype.activate = function () {
      this.bindTap( this.element ), b.bind( this.element, "click", this ), this.parent.element.appendChild( this.element )
    }, f.prototype.deactivate = function () {
      this.parent.element.removeChild( this.element ), d.prototype.destroy.call( this ), b.unbind( this.element, "click", this )
    }, f.prototype.createSVG = function () {
      var a = document.createElementNS( h, "svg" );
      a.setAttribute( "viewBox", "0 0 100 100" );
      var b = document.createElementNS( h, "path" ),
        c = g( this.parent.options.arrowShape );
      return b.setAttribute( "d", c ), b.setAttribute( "class", "arrow" ), this.isLeft || b.setAttribute( "transform", "translate(100, 100) rotate(180) " ), a.appendChild( b ), a
    }, f.prototype.setArrowText = function () {
      var a = this.parent.options,
        b = this.isLeft ? a.leftArrowText : a.rightArrowText;
      e.setText( this.element, b )
    }, f.prototype.onTap = function () {
      if ( this.isEnabled ) {
        this.parent.uiChange();
        var a = this.isPrevious ? "previous" : "next";
        this.parent[ a ]()
      }
    }, f.prototype.handleEvent = e.handleEvent, f.prototype.onclick = function () {
      var a = document.activeElement;
      a && a == this.element && this.onTap()
    }, f.prototype.enable = function () {
      this.isEnabled || ( this.element.disabled = !1, this.isEnabled = !0 )
    }, f.prototype.disable = function () {
      this.isEnabled && ( this.element.disabled = !0, this.isEnabled = !1 )
    }, f.prototype.update = function () {
      var a = this.parent.cells;
      if ( this.parent.options.wrapAround && a.length > 1 ) return void this.enable();
      var b = a.length ? a.length - 1 : 0,
        c = this.isPrevious ? 0 : b,
        d = this.parent.selectedIndex == c ? "disable" : "enable";
      this[ d ]()
    }, f.prototype.destroy = function () {
      this.deactivate()
    }, e.extend( c.defaults, {
      prevNextButtons: !0,
      leftArrowText: "‹",
      rightArrowText: "›",
      arrowShape: {
        x0: 10,
        x1: 60,
        y1: 50,
        x2: 70,
        y2: 40,
        x3: 30
      }
    } ), c.createMethods.push( "_createPrevNextButtons" ), c.prototype._createPrevNextButtons = function () {
      this.options.prevNextButtons && ( this.prevButton = new f( -1, this ), this.nextButton = new f( 1, this ), this.on( "activate", this.activatePrevNextButtons ) )
    }, c.prototype.activatePrevNextButtons = function () {
      this.prevButton.activate(), this.nextButton.activate(), this.on( "deactivate", this.deactivatePrevNextButtons )
    }, c.prototype.deactivatePrevNextButtons = function () {
      this.prevButton.deactivate(), this.nextButton.deactivate(), this.off( "deactivate", this.deactivatePrevNextButtons )
    }, c.PrevNextButton = f, c
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/page-dots", [ "eventie/eventie", "./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils" ], function ( c, d, e, f ) {
      return b( a, c, d, e, f )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "eventie" ), require( "./flickity" ), require( "tap-listener" ), require( "fizzy-ui-utils" ) ) : b( a, a.eventie, a.Flickity, a.TapListener, a.fizzyUIUtils )
  }( window, function ( a, b, c, d, e ) {
    function f( a ) {
      this.parent = a, this._create()
    }
    return f.prototype = new d, f.prototype._create = function () {
      this.holder = document.createElement( "ol" ), this.holder.className = "flickity-page-dots", c.setUnselectable( this.holder ), this.dots = [];
      var a = this;
      this.onCellSelect = function () {
        a.updateSelected()
      }, this.parent.on( "cellSelect", this.onCellSelect ), this.on( "tap", this.onTap ), this.on( "pointerDown", function ( b, c ) {
        a.parent.childUIPointerDown( c )
      } )
    }, f.prototype.activate = function () {
      this.setDots(), this.bindTap( this.holder ), this.parent.element.appendChild( this.holder )
    }, f.prototype.deactivate = function () {
      this.parent.element.removeChild( this.holder ), d.prototype.destroy.call( this )
    }, f.prototype.setDots = function () {
      var a = this.parent.cells.length - this.dots.length;
      a > 0 ? this.addDots( a ) : 0 > a && this.removeDots( -a )
    }, f.prototype.addDots = function ( a ) {
      for ( var b = document.createDocumentFragment(), c = []; a; ) {
        var d = document.createElement( "li" );
        d.className = "dot", b.appendChild( d ), c.push( d ), a--
      }
      this.holder.appendChild( b ), this.dots = this.dots.concat( c )
    }, f.prototype.removeDots = function ( a ) {
      for ( var b = this.dots.splice( this.dots.length - a, a ), c = 0, d = b.length; d > c; c++ ) {
        var e = b[ c ];
        this.holder.removeChild( e )
      }
    }, f.prototype.updateSelected = function () {
      this.selectedDot && ( this.selectedDot.className = "dot" ), this.dots.length && ( this.selectedDot = this.dots[ this.parent.selectedIndex ], this.selectedDot.className = "dot is-selected" )
    }, f.prototype.onTap = function ( a ) {
      var b = a.target;
      if ( "LI" == b.nodeName ) {
        this.parent.uiChange();
        var c = e.indexOf( this.dots, b );
        this.parent.select( c )
      }
    }, f.prototype.destroy = function () {
      this.deactivate()
    }, c.PageDots = f, e.extend( c.defaults, {
      pageDots: !0
    } ), c.createMethods.push( "_createPageDots" ), c.prototype._createPageDots = function () {
      this.options.pageDots && ( this.pageDots = new f( this ), this.on( "activate", this.activatePageDots ), this.on( "cellAddedRemoved", this.onCellAddedRemovedPageDots ), this.on( "deactivate", this.deactivatePageDots ) )
    }, c.prototype.activatePageDots = function () {
      this.pageDots.activate()
    }, c.prototype.onCellAddedRemovedPageDots = function () {
      this.pageDots.setDots()
    }, c.prototype.deactivatePageDots = function () {
      this.pageDots.deactivate()
    }, c.PageDots = f, c
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/player", [ "eventEmitter/EventEmitter", "eventie/eventie", "fizzy-ui-utils/utils", "./flickity" ], function ( a, c, d, e ) {
      return b( a, c, d, e )
    } ) : "object" == typeof exports ? module.exports = b( require( "wolfy87-eventemitter" ), require( "eventie" ), require( "fizzy-ui-utils" ), require( "./flickity" ) ) : b( a.EventEmitter, a.eventie, a.fizzyUIUtils, a.Flickity )
  }( window, function ( a, b, c, d ) {
    function e( a ) {
      if ( this.isPlaying = !1, this.parent = a, g ) {
        var b = this;
        this.onVisibilityChange = function () {
          b.visibilityChange()
        }
      }
    }
    var f, g;
    return "hidden" in document ? ( f = "hidden", g = "visibilitychange" ) : "webkitHidden" in document && ( f = "webkitHidden", g = "webkitvisibilitychange" ), e.prototype = new a, e.prototype.play = function () {
      this.isPlaying = !0, delete this.isPaused, g && document.addEventListener( g, this.onVisibilityChange, !1 ), this.tick()
    }, e.prototype.tick = function () {
      if ( this.isPlaying && !this.isPaused ) {
        this.tickTime = new Date;
        var a = this.parent.options.autoPlay;
        a = "number" == typeof a ? a : 3e3;
        var b = this;
        this.timeout = setTimeout( function () {
          b.parent.next( !0 ), b.tick()
        }, a )
      }
    }, e.prototype.stop = function () {
      this.isPlaying = !1, delete this.isPaused, this.clear(), g && document.removeEventListener( g, this.onVisibilityChange, !1 )
    }, e.prototype.clear = function () {
      clearTimeout( this.timeout )
    }, e.prototype.pause = function () {
      this.isPlaying && ( this.isPaused = !0, this.clear() )
    }, e.prototype.unpause = function () {
      this.isPaused && this.play()
    }, e.prototype.visibilityChange = function () {
      var a = document[ f ];
      this[ a ? "pause" : "unpause" ]()
    }, c.extend( d.defaults, {
      pauseAutoPlayOnHover: !0
    } ), d.createMethods.push( "_createPlayer" ), d.prototype._createPlayer = function () {
      this.player = new e( this ), this.on( "activate", this.activatePlayer ), this.on( "uiChange", this.stopPlayer ), this.on( "pointerDown", this.stopPlayer ), this.on( "deactivate", this.deactivatePlayer )
    }, d.prototype.activatePlayer = function () {
      this.options.autoPlay && ( this.player.play(), b.bind( this.element, "mouseenter", this ), this.isMouseenterBound = !0 )
    }, d.prototype.stopPlayer = function () {
      this.player.stop()
    }, d.prototype.deactivatePlayer = function () {
      this.player.stop(), this.isMouseenterBound && ( b.unbind( this.element, "mouseenter", this ), delete this.isMouseenterBound )
    }, d.prototype.onmouseenter = function () {
      this.options.pauseAutoPlayOnHover && ( this.player.pause(), b.bind( this.element, "mouseleave", this ) )
    }, d.prototype.onmouseleave = function () {
      this.player.unpause(), b.unbind( this.element, "mouseleave", this )
    }, d.Player = e, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/add-remove-cell", [ "./flickity", "fizzy-ui-utils/utils" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "./flickity" ), require( "fizzy-ui-utils" ) ) : b( a, a.Flickity, a.fizzyUIUtils )
  }( window, function ( a, b, c ) {
    function d( a ) {
      for ( var b = document.createDocumentFragment(), c = 0, d = a.length; d > c; c++ ) {
        var e = a[ c ];
        b.appendChild( e.element )
      }
      return b
    }
    return b.prototype.insert = function ( a, b ) {
      var c = this._makeCells( a );
      if ( c && c.length ) {
        var e = this.cells.length;
        b = void 0 === b ? e : b;
        var f = d( c ),
          g = b == e;
        if ( g ) this.slider.appendChild( f );
        else {
          var h = this.cells[ b ].element;
          this.slider.insertBefore( f, h )
        }
        if ( 0 === b ) this.cells = c.concat( this.cells );
        else if ( g ) this.cells = this.cells.concat( c );
        else {
          var i = this.cells.splice( b, e - b );
          this.cells = this.cells.concat( c ).concat( i )
        }
        this._sizeCells( c );
        var j = b > this.selectedIndex ? 0 : c.length;
        this._cellAddedRemoved( b, j )
      }
    }, b.prototype.append = function ( a ) {
      this.insert( a, this.cells.length )
    }, b.prototype.prepend = function ( a ) {
      this.insert( a, 0 )
    }, b.prototype.remove = function ( a ) {
      var b, d, e, f = this.getCells( a ),
        g = 0;
      for ( b = 0, d = f.length; d > b; b++ ) {
        e = f[ b ];
        var h = c.indexOf( this.cells, e ) < this.selectedIndex;
        g -= h ? 1 : 0
      }
      for ( b = 0, d = f.length; d > b; b++ ) e = f[ b ], e.remove(), c.removeFrom( this.cells, e );
      f.length && this._cellAddedRemoved( 0, g )
    }, b.prototype._cellAddedRemoved = function ( a, b ) {
      b = b || 0, this.selectedIndex += b, this.selectedIndex = Math.max( 0, Math.min( this.cells.length - 1, this.selectedIndex ) ), this.emitEvent( "cellAddedRemoved", [ a, b ] ), this.cellChange( a, !0 )
    }, b.prototype.cellSizeChange = function ( a ) {
      var b = this.getCell( a );
      if ( b ) {
        b.getSize();
        var d = c.indexOf( this.cells, b );
        this.cellChange( d )
      }
    }, b.prototype.cellChange = function ( a, b ) {
      var c = this.slideableWidth;
      this._positionCells( a ), this._getWrapShiftCells(), this.setGallerySize(), this.options.freeScroll ? ( this.x += c - this.slideableWidth, this.positionSlider() ) : ( b && this.positionSliderAtSelected(), this.select( this.selectedIndex ) )
    }, b
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/lazyload", [ "classie/classie", "eventie/eventie", "./flickity", "fizzy-ui-utils/utils" ], function ( c, d, e, f ) {
      return b( a, c, d, e, f )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "desandro-classie" ), require( "eventie" ), require( "./flickity" ), require( "fizzy-ui-utils" ) ) : b( a, a.classie, a.eventie, a.Flickity, a.fizzyUIUtils )
  }( window, function ( a, b, c, d, e ) {
    "use strict";

    function f( a ) {
      if ( "IMG" == a.nodeName && a.getAttribute( "data-flickity-lazyload" ) ) return [ a ];
      var b = a.querySelectorAll( "img[data-flickity-lazyload]" );
      return e.makeArray( b )
    }

    function g( a, b ) {
      this.img = a, this.flickity = b, this.load()
    }
    return d.createMethods.push( "_createLazyload" ), d.prototype._createLazyload = function () {
      this.on( "cellSelect", this.lazyLoad )
    }, d.prototype.lazyLoad = function () {
      var a = this.options.lazyLoad;
      if ( a ) {
        for ( var b = "number" == typeof a ? a : 0, c = this.getAdjacentCellElements( b ), d = [], e = 0, h = c.length; h > e; e++ ) {
          var i = c[ e ],
            j = f( i );
          d = d.concat( j )
        }
        for ( e = 0, h = d.length; h > e; e++ ) {
          var k = d[ e ];
          new g( k, this )
        }
      }
    }, g.prototype.handleEvent = e.handleEvent, g.prototype.load = function () {
      c.bind( this.img, "load", this ), c.bind( this.img, "error", this ), this.img.src = this.img.getAttribute( "data-flickity-lazyload" ), this.img.removeAttribute( "data-flickity-lazyload" )
    }, g.prototype.onload = function ( a ) {
      this.complete( a, "flickity-lazyloaded" )
    }, g.prototype.onerror = function ( a ) {
      this.complete( a, "flickity-lazyerror" )
    }, g.prototype.complete = function ( a, d ) {
      c.unbind( this.img, "load", this ), c.unbind( this.img, "error", this );
      var e = this.flickity.getParentCell( this.img ),
        f = e && e.element;
      this.flickity.cellSizeChange( f ), b.add( this.img, d ), this.flickity.dispatchEvent( "lazyLoad", a, f )
    }, d.LazyLoader = g, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity/js/index", [ "./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload" ], b ) : "object" == typeof exports && ( module.exports = b( require( "./flickity" ), require( "./drag" ), require( "./prev-next-button" ), require( "./page-dots" ), require( "./player" ), require( "./add-remove-cell" ), require( "./lazyload" ) ) )
  }( window, function ( a ) {
    return a
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "flickity-as-nav-for/as-nav-for", [ "classie/classie", "flickity/js/index", "fizzy-ui-utils/utils" ], function ( c, d, e ) {
      return b( a, c, d, e )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "desandro-classie" ), require( "flickity" ), require( "fizzy-ui-utils" ) ) : a.Flickity = b( a, a.classie, a.Flickity, a.fizzyUIUtils )
  }( window, function ( a, b, c, d ) {
    return c.createMethods.push( "_createAsNavFor" ), c.prototype._createAsNavFor = function () {
      this.on( "activate", this.activateAsNavFor ), this.on( "deactivate", this.deactivateAsNavFor ), this.on( "destroy", this.destroyAsNavFor );
      var a = this.options.asNavFor;
      if ( a ) {
        var b = this;
        setTimeout( function () {
          b.setNavCompanion( a )
        } )
      }
    }, c.prototype.setNavCompanion = function ( a ) {
      a = d.getQueryElement( a );
      var b = c.data( a );
      if ( b && b != this ) {
        this.navCompanion = b;
        var e = this;
        this.onNavCompanionSelect = function () {
          e.navCompanionSelect()
        }, b.on( "cellSelect", this.onNavCompanionSelect ), this.on( "staticClick", this.onNavStaticClick ), this.navCompanionSelect()
      }
    }, c.prototype.navCompanionSelect = function () {
      if ( this.navCompanion ) {
        var a = this.navCompanion.selectedIndex;
        this.select( a ), this.removeNavSelectedElement(), this.selectedIndex == a && ( this.navSelectedElement = this.cells[ a ].element, b.add( this.navSelectedElement, "is-nav-selected" ) )
      }
    }, c.prototype.activateAsNavFor = function () {
      this.navCompanionSelect()
    }, c.prototype.removeNavSelectedElement = function () {
      this.navSelectedElement && ( b.remove( this.navSelectedElement, "is-nav-selected" ), delete this.navSelectedElement )
    }, c.prototype.onNavStaticClick = function ( a, b, c, d ) {
      "number" == typeof d && this.navCompanion.select( d )
    }, c.prototype.deactivateAsNavFor = function () {
      this.removeNavSelectedElement()
    }, c.prototype.destroyAsNavFor = function () {
      this.navCompanion && ( this.navCompanion.off( "cellSelect", this.onNavCompanionSelect ), this.off( "staticClick", this.onNavStaticClick ), delete this.navCompanion )
    }, c
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "imagesloaded/imagesloaded", [ "eventEmitter/EventEmitter", "eventie/eventie" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof module && module.exports ? module.exports = b( a, require( "wolfy87-eventemitter" ), require( "eventie" ) ) : a.imagesLoaded = b( a, a.EventEmitter, a.eventie )
  }( window, function ( a, b, c ) {
    function d( a, b ) {
      for ( var c in b ) a[ c ] = b[ c ];
      return a
    }

    function e( a ) {
      return "[object Array]" == l.call( a )
    }

    function f( a ) {
      var b = [];
      if ( e( a ) ) b = a;
      else if ( "number" == typeof a.length )
        for ( var c = 0; c < a.length; c++ ) b.push( a[ c ] );
      else b.push( a );
      return b
    }

    function g( a, b, c ) {
      if ( !( this instanceof g ) ) return new g( a, b, c );
      "string" == typeof a && ( a = document.querySelectorAll( a ) ), this.elements = f( a ), this.options = d( {}, this.options ), "function" == typeof b ? c = b : d( this.options, b ), c && this.on( "always", c ), this.getImages(), j && ( this.jqDeferred = new j.Deferred );
      var e = this;
      setTimeout( function () {
        e.check()
      } )
    }

    function h( a ) {
      this.img = a
    }

    function i( a, b ) {
      this.url = a, this.element = b, this.img = new Image
    }
    var j = a.jQuery,
      k = a.console,
      l = Object.prototype.toString;
    g.prototype = new b, g.prototype.options = {}, g.prototype.getImages = function () {
      this.images = [];
      for ( var a = 0; a < this.elements.length; a++ ) {
        var b = this.elements[ a ];
        this.addElementImages( b )
      }
    }, g.prototype.addElementImages = function ( a ) {
      "IMG" == a.nodeName && this.addImage( a ), this.options.background === !0 && this.addElementBackgroundImages( a );
      var b = a.nodeType;
      if ( b && m[ b ] ) {
        for ( var c = a.querySelectorAll( "img" ), d = 0; d < c.length; d++ ) {
          var e = c[ d ];
          this.addImage( e )
        }
        if ( "string" == typeof this.options.background ) {
          var f = a.querySelectorAll( this.options.background );
          for ( d = 0; d < f.length; d++ ) {
            var g = f[ d ];
            this.addElementBackgroundImages( g )
          }
        }
      }
    };
    var m = {
      1: !0,
      9: !0,
      11: !0
    };
    g.prototype.addElementBackgroundImages = function ( a ) {
      for ( var b = n( a ), c = /url\(['"]*([^'"\)]+)['"]*\)/gi, d = c.exec( b.backgroundImage ); null !== d; ) {
        var e = d && d[ 1 ];
        e && this.addBackground( e, a ), d = c.exec( b.backgroundImage )
      }
    };
    var n = a.getComputedStyle || function ( a ) {
      return a.currentStyle
    };
    return g.prototype.addImage = function ( a ) {
      var b = new h( a );
      this.images.push( b )
    }, g.prototype.addBackground = function ( a, b ) {
      var c = new i( a, b );
      this.images.push( c )
    }, g.prototype.check = function () {
      function a( a, c, d ) {
        setTimeout( function () {
          b.progress( a, c, d )
        } )
      }
      var b = this;
      if ( this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length ) return void this.complete();
      for ( var c = 0; c < this.images.length; c++ ) {
        var d = this.images[ c ];
        d.once( "progress", a ), d.check()
      }
    }, g.prototype.progress = function ( a, b, c ) {
      this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emit( "progress", this, a, b ), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify( this, a ), this.progressedCount == this.images.length && this.complete(), this.options.debug && k && k.log( "progress: " + c, a, b )
    }, g.prototype.complete = function () {
      var a = this.hasAnyBroken ? "fail" : "done";
      if ( this.isComplete = !0, this.emit( a, this ), this.emit( "always", this ), this.jqDeferred ) {
        var b = this.hasAnyBroken ? "reject" : "resolve";
        this.jqDeferred[ b ]( this )
      }
    }, h.prototype = new b, h.prototype.check = function () {
      var a = this.getIsImageComplete();
      return a ? void this.confirm( 0 !== this.img.naturalWidth, "naturalWidth" ) : ( this.proxyImage = new Image, c.bind( this.proxyImage, "load", this ), c.bind( this.proxyImage, "error", this ), c.bind( this.img, "load", this ), c.bind( this.img, "error", this ), void( this.proxyImage.src = this.img.src ) )
    }, h.prototype.getIsImageComplete = function () {
      return this.img.complete && void 0 !== this.img.naturalWidth
    }, h.prototype.confirm = function ( a, b ) {
      this.isLoaded = a, this.emit( "progress", this, this.img, b )
    }, h.prototype.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, h.prototype.onload = function () {
      this.confirm( !0, "onload" ), this.unbindEvents()
    }, h.prototype.onerror = function () {
      this.confirm( !1, "onerror" ), this.unbindEvents()
    }, h.prototype.unbindEvents = function () {
      c.unbind( this.proxyImage, "load", this ), c.unbind( this.proxyImage, "error", this ), c.unbind( this.img, "load", this ), c.unbind( this.img, "error", this )
    }, i.prototype = new h, i.prototype.check = function () {
      c.bind( this.img, "load", this ), c.bind( this.img, "error", this ), this.img.src = this.url;
      var a = this.getIsImageComplete();
      a && ( this.confirm( 0 !== this.img.naturalWidth, "naturalWidth" ),
        this.unbindEvents() )
    }, i.prototype.unbindEvents = function () {
      c.unbind( this.img, "load", this ), c.unbind( this.img, "error", this )
    }, i.prototype.confirm = function ( a, b ) {
      this.isLoaded = a, this.emit( "progress", this, this.element, b )
    }, g.makeJQueryPlugin = function ( b ) {
      b = b || a.jQuery, b && ( j = b, j.fn.imagesLoaded = function ( a, b ) {
        var c = new g( this, a, b );
        return c.jqDeferred.promise( j( this ) )
      } )
    }, g.makeJQueryPlugin(), g
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( [ "flickity/js/index", "imagesloaded/imagesloaded" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "flickity" ), require( "imagesloaded" ) ) : a.Flickity = b( a, a.Flickity, a.imagesLoaded )
  }( window, function ( a, b, c ) {
    "use strict";
    return b.createMethods.push( "_createImagesLoaded" ), b.prototype._createImagesLoaded = function () {
      this.on( "activate", this.imagesLoaded )
    }, b.prototype.imagesLoaded = function () {
      function a( a, c ) {
        var d = b.getParentCell( c.img );
        b.cellSizeChange( d && d.element ), b.options.freeScroll || b.positionSliderAtSelected()
      }
      if ( this.options.imagesLoaded ) {
        var b = this;
        c( this.slider ).on( "progress", a )
      }
    }, b
  } ),
  function ( a, b, c ) {
    var d = function () {
      for ( var a = /audio(.min)?.js.*/, b = document.getElementsByTagName( "script" ), c = 0, d = b.length; d > c; c++ ) {
        var e = b[ c ].getAttribute( "src" );
        if ( a.test( e ) ) return e.replace( a, "" )
      }
    }();
    c[ a ] = {
      instanceCount: 0,
      instances: {},
      flashSource: '      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance=' + a + '.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance=' + a + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',
      settings: {
        autoplay: !1,
        loop: !1,
        preload: !0,
        imageLocation: d + "player-graphics.gif",
        swfLocation: d + "audiojs.swf",
        useFlash: function () {
          var a = document.createElement( "audio" );
          return !( a.canPlayType && a.canPlayType( "audio/mpeg;" ).replace( /no/, "" ) )
        }(),
        hasFlash: function () {
          if ( navigator.plugins && navigator.plugins.length && navigator.plugins[ "Shockwave Flash" ] ) return !0;
          if ( navigator.mimeTypes && navigator.mimeTypes.length ) {
            var a = navigator.mimeTypes[ "application/x-shockwave-flash" ];
            return a && a.enabledPlugin
          }
          try {
            return new ActiveXObject( "ShockwaveFlash.ShockwaveFlash" ), !0
          } catch ( b ) {}
          return !1
        }(),
        createPlayer: {
          markup: '          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em>/<strong class="duration">00:00</strong>           </div>           <div class="error-message"></div>',
          playPauseClass: "play-pause",
          scrubberClass: "scrubber",
          progressClass: "progress",
          loaderClass: "loaded",
          timeClass: "time",
          durationClass: "duration",
          playedClass: "played",
          errorMessageClass: "error-message",
          playingClass: "playing",
          loadingClass: "loading",
          errorClass: "error"
        },
        css: '        .audiojs audio { position: absolute; left: -1px; }         .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444));           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%);           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); }         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; }         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; }         .audiojs .play { display: block; }         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); }         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url("$1") -2px -1px no-repeat; }         .audiojs .loading { background: url("$1") -2px -31px no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url("$1") -2px -91px no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',
        trackEnded: function () {},
        flashError: function () {
          var b = this.settings.createPlayer,
            d = e( b.errorMessageClass, this.wrapper ),
            f = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
          this.mp3 && ( f += ' <a href="' + this.mp3 + '">Download audio file</a>.' ), c[ a ].helpers.removeClass( this.wrapper, b.loadingClass ), c[ a ].helpers.addClass( this.wrapper, b.errorClass ), d.innerHTML = f
        },
        loadError: function () {
          var b = this.settings.createPlayer,
            d = e( b.errorMessageClass, this.wrapper );
          c[ a ].helpers.removeClass( this.wrapper, b.loadingClass ), c[ a ].helpers.addClass( this.wrapper, b.errorClass ), d.innerHTML = 'Error loading: "' + this.mp3 + '"'
        },
        init: function () {
          c[ a ].helpers.addClass( this.wrapper, this.settings.createPlayer.loadingClass )
        },
        loadStarted: function () {
          var b = this.settings.createPlayer,
            d = e( b.durationClass, this.wrapper ),
            f = Math.floor( this.duration / 60 ),
            g = Math.floor( this.duration % 60 );
          c[ a ].helpers.removeClass( this.wrapper, b.loadingClass ), d.innerHTML = ( 10 > f ? "0" : "" ) + f + ":" + ( 10 > g ? "0" : "" ) + g
        },
        loadProgress: function ( a ) {
          var b = this.settings.createPlayer,
            c = e( b.scrubberClass, this.wrapper );
          e( b.loaderClass, this.wrapper ).style.width = c.offsetWidth * a + "px"
        },
        playPause: function () {
          this.playing ? this.settings.play() : this.settings.pause()
        },
        play: function () {
          c[ a ].helpers.addClass( this.wrapper, this.settings.createPlayer.playingClass )
        },
        pause: function () {
          c[ a ].helpers.removeClass( this.wrapper, this.settings.createPlayer.playingClass )
        },
        updatePlayhead: function ( a ) {
          var b = this.settings.createPlayer,
            c = e( b.scrubberClass, this.wrapper );
          e( b.progressClass, this.wrapper ).style.width = c.offsetWidth * a + "px", b = e( b.playedClass, this.wrapper ), c = this.duration * a, a = Math.floor( c / 60 ), c = Math.floor( c % 60 ), b.innerHTML = ( 10 > a ? "0" : "" ) + a + ":" + ( 10 > c ? "0" : "" ) + c
        }
      },
      create: function ( a, b ) {
        return b = b || {}, a.length ? this.createAll( b, a ) : this.newInstance( a, b )
      },
      createAll: function ( a, b ) {
        var c = b || document.getElementsByTagName( "audio" ),
          d = [];
        a = a || {};
        for ( var e = 0, f = c.length; f > e; e++ ) d.push( this.newInstance( c[ e ], a ) );
        return d
      },
      newInstance: function ( a, d ) {
        var e = this.helpers.clone( this.settings ),
          f = "audiojs" + this.instanceCount,
          g = "audiojs_wrapper" + this.instanceCount;
        return this.instanceCount++, null != a.getAttribute( "autoplay" ) && ( e.autoplay = !0 ), null != a.getAttribute( "loop" ) && ( e.loop = !0 ), "none" == a.getAttribute( "preload" ) && ( e.preload = !1 ), d && this.helpers.merge( e, d ), e.createPlayer.markup ? a = this.createPlayer( a, e.createPlayer, g ) : a.parentNode.setAttribute( "id", g ), g = new c[ b ]( a, e ), e.css && this.helpers.injectCss( g, e.css ), e.useFlash && e.hasFlash ? ( this.injectFlash( g, f ), this.attachFlashEvents( g.wrapper, g ) ) : e.useFlash && !e.hasFlash && this.settings.flashError.apply( g ), ( !e.useFlash || e.useFlash && e.hasFlash ) && this.attachEvents( g.wrapper, g ), this.instances[ f ] = g
      },
      createPlayer: function ( a, b, c ) {
        var d = document.createElement( "div" ),
          e = a.cloneNode( !0 );
        return d.setAttribute( "class", "audiojs" ), d.setAttribute( "className", "audiojs" ), d.setAttribute( "id", c ), e.outerHTML && !document.createElement( "audio" ).canPlayType ? ( e = this.helpers.cloneHtml5Node( a ), d.innerHTML = b.markup, d.appendChild( e ), a.outerHTML = d.outerHTML, d = document.getElementById( c ) ) : ( d.appendChild( e ), d.innerHTML += b.markup, a.parentNode.replaceChild( d, a ) ), d.getElementsByTagName( "audio" )[ 0 ]
      },
      attachEvents: function ( b, d ) {
        if ( d.settings.createPlayer ) {
          var f = d.settings.createPlayer,
            g = e( f.playPauseClass, b ),
            h = e( f.scrubberClass, b );
          c[ a ].events.addListener( g, "click", function () {
            d.playPause.apply( d )
          } ), c[ a ].events.addListener( h, "click", function ( a ) {
            a = a.clientX;
            var b = this,
              c = 0;
            if ( b.offsetParent )
              do c += b.offsetLeft; while ( b = b.offsetParent );
            d.skipTo( ( a - c ) / h.offsetWidth )
          } ), d.settings.useFlash || ( c[ a ].events.trackLoadProgress( d ), c[ a ].events.addListener( d.element, "timeupdate", function () {
            d.updatePlayhead.apply( d )
          } ), c[ a ].events.addListener( d.element, "ended", function () {
            d.trackEnded.apply( d )
          } ), c[ a ].events.addListener( d.source, "error", function () {
            clearInterval( d.readyTimer ), clearInterval( d.loadTimer ), d.settings.loadError.apply( d )
          } ) )
        }
      },
      attachFlashEvents: function ( a, b ) {
        b.swfReady = !1, b.load = function ( a ) {
          b.mp3 = a, b.swfReady && b.element.load( a )
        }, b.loadProgress = function ( a, c ) {
          b.loadedPercent = a, b.duration = c, b.settings.loadStarted.apply( b ), b.settings.loadProgress.apply( b, [ a ] )
        }, b.skipTo = function ( a ) {
          a > b.loadedPercent || ( b.updatePlayhead.call( b, [ a ] ), b.element.skipTo( a ) )
        }, b.updatePlayhead = function ( a ) {
          b.settings.updatePlayhead.apply( b, [ a ] )
        }, b.play = function () {
          b.settings.preload || ( b.settings.preload = !0, b.element.init( b.mp3 ) ), b.playing = !0, b.element.pplay(), b.settings.play.apply( b )
        }, b.pause = function () {
          b.playing = !1, b.element.ppause(), b.settings.pause.apply( b )
        }, b.setVolume = function ( a ) {
          b.element.setVolume( a )
        }, b.loadStarted = function () {
          b.swfReady = !0, b.settings.preload && b.element.init( b.mp3 ), b.settings.autoplay && b.play.apply( b )
        }
      },
      injectFlash: function ( a, b ) {
        var c = this.flashSource.replace( /\$1/g, b );
        c = c.replace( /\$2/g, a.settings.swfLocation ), c = c.replace( /\$3/g, +new Date + Math.random() );
        var d = a.wrapper.innerHTML,
          e = document.createElement( "div" );
        e.innerHTML = c + d, a.wrapper.innerHTML = e.innerHTML, a.element = this.helpers.getSwf( b )
      },
      helpers: {
        merge: function ( a, b ) {
          for ( attr in b )( a.hasOwnProperty( attr ) || b.hasOwnProperty( attr ) ) && ( a[ attr ] = b[ attr ] )
        },
        clone: function ( a ) {
          if ( null == a || "object" != typeof a ) return a;
          var b, c = new a.constructor;
          for ( b in a ) c[ b ] = arguments.callee( a[ b ] );
          return c
        },
        addClass: function ( a, b ) {
          RegExp( "(\\s|^)" + b + "(\\s|$)" ).test( a.className ) || ( a.className += " " + b )
        },
        removeClass: function ( a, b ) {
          a.className = a.className.replace( RegExp( "(\\s|^)" + b + "(\\s|$)" ), " " )
        },
        injectCss: function ( a, b ) {
          for ( var c = "", d = document.getElementsByTagName( "style" ), e = b.replace( /\$1/g, a.settings.imageLocation ), f = 0, g = d.length; g > f; f++ ) {
            var h = d[ f ].getAttribute( "title" );
            if ( h && ~h.indexOf( "audiojs" ) ) {
              if ( g = d[ f ], g.innerHTML === e ) return;
              c = g.innerHTML;
              break
            }
          }
          d = document.getElementsByTagName( "head" )[ 0 ], f = d.firstChild, g = document.createElement( "style" ), d && ( g.setAttribute( "type", "text/css" ), g.setAttribute( "title", "audiojs" ), g.styleSheet ? g.styleSheet.cssText = c + e : g.appendChild( document.createTextNode( c + e ) ), f ? d.insertBefore( g, f ) : d.appendChild( styleElement ) )
        },
        cloneHtml5Node: function ( a ) {
          var b = document.createDocumentFragment(),
            c = b.createElement ? b : document;
          return c.createElement( "audio" ), c = c.createElement( "div" ), b.appendChild( c ), c.innerHTML = a.outerHTML, c.firstChild
        },
        getSwf: function ( a ) {
          return a = document[ a ] || window[ a ], a.length > 1 ? a[ a.length - 1 ] : a
        }
      },
      events: {
        memoryLeaking: !1,
        listeners: [],
        addListener: function ( b, d, e ) {
          b.addEventListener ? b.addEventListener( d, e, !1 ) : b.attachEvent && ( this.listeners.push( b ), this.memoryLeaking || ( window.attachEvent( "onunload", function () {
            if ( this.listeners )
              for ( var b = 0, d = this.listeners.length; d > b; b++ ) c[ a ].events.purge( this.listeners[ b ] )
          } ), this.memoryLeaking = !0 ), b.attachEvent( "on" + d, function () {
            e.call( b, window.event )
          } ) )
        },
        trackLoadProgress: function ( a ) {
          if ( a.settings.preload ) {
            var b, c;
            a = a;
            var d = /(ipod|iphone|ipad)/i.test( navigator.userAgent );
            b = setInterval( function () {
              a.element.readyState > -1 && ( d || a.init.apply( a ) ), a.element.readyState > 1 && ( a.settings.autoplay && a.play.apply( a ), clearInterval( b ), c = setInterval( function () {
                a.loadProgress.apply( a ), a.loadedPercent >= 1 && clearInterval( c )
              } ) )
            }, 10 ), a.readyTimer = b, a.loadTimer = c
          }
        },
        purge: function ( a ) {
          var b, c = a.attributes;
          if ( c )
            for ( b = 0; b < c.length; b += 1 ) "function" == typeof a[ c[ b ].name ] && ( a[ c[ b ].name ] = null );
          if ( c = a.childNodes )
            for ( b = 0; b < c.length; b += 1 ) purge( a.childNodes[ b ] )
        },
        ready: function () {
          return function ( a ) {
            var b = window,
              c = !1,
              d = !0,
              e = b.document,
              f = e.documentElement,
              g = e.addEventListener ? "addEventListener" : "attachEvent",
              h = e.addEventListener ? "removeEventListener" : "detachEvent",
              i = e.addEventListener ? "" : "on",
              j = function ( d ) {
                ( "readystatechange" != d.type || "complete" == e.readyState ) && ( ( "load" == d.type ? b : e )[ h ]( i + d.type, j, !1 ), !c && ( c = !0 ) && a.call( b, d.type || d ) )
              },
              k = function () {
                try {
                  f.doScroll( "left" )
                } catch ( a ) {
                  return void setTimeout( k, 50 )
                }
                j( "poll" )
              };
            if ( "complete" == e.readyState ) a.call( b, "lazy" );
            else {
              if ( e.createEventObject && f.doScroll ) {
                try {
                  d = !b.frameElement
                } catch ( l ) {}
                d && k()
              }
              e[ g ]( i + "DOMContentLoaded", j, !1 ), e[ g ]( i + "readystatechange", j, !1 ), b[ g ]( i + "load", j, !1 )
            }
          }
        }()
      }
    }, c[ b ] = function ( a, b ) {
      this.element = a, this.wrapper = a.parentNode, this.source = a.getElementsByTagName( "source" )[ 0 ] || a, this.mp3 = function ( a ) {
        var b = a.getElementsByTagName( "source" )[ 0 ];
        return a.getAttribute( "src" ) || ( b ? b.getAttribute( "src" ) : null )
      }( a ), this.settings = b, this.loadStartedCalled = !1, this.loadedPercent = 0, this.duration = 1, this.playing = !1
    }, c[ b ].prototype = {
      updatePlayhead: function () {
        this.settings.updatePlayhead.apply( this, [ this.element.currentTime / this.duration ] )
      },
      skipTo: function ( a ) {
        a > this.loadedPercent || ( this.element.currentTime = this.duration * a, this.updatePlayhead() )
      },
      load: function ( b ) {
        this.loadStartedCalled = !1, this.source.setAttribute( "src", b ), this.element.load(), this.mp3 = b, c[ a ].events.trackLoadProgress( this )
      },
      loadError: function () {
        this.settings.loadError.apply( this )
      },
      init: function () {
        this.settings.init.apply( this )
      },
      loadStarted: function () {
        return this.element.duration ? ( this.duration = this.element.duration, this.updatePlayhead(), void this.settings.loadStarted.apply( this ) ) : !1
      },
      loadProgress: function () {
        null != this.element.buffered && this.element.buffered.length && ( this.loadStartedCalled || ( this.loadStartedCalled = this.loadStarted() ), this.loadedPercent = this.element.buffered.end( this.element.buffered.length - 1 ) / this.duration, this.settings.loadProgress.apply( this, [ this.loadedPercent ] ) )
      },
      playPause: function () {
        this.playing ? this.pause() : this.play()
      },
      play: function () {
        /(ipod|iphone|ipad)/i.test( navigator.userAgent ) && 0 == this.element.readyState && this.init.apply( this ), this.settings.preload || ( this.settings.preload = !0, this.element.setAttribute( "preload", "auto" ), c[ a ].events.trackLoadProgress( this ) ), this.playing = !0, this.element.play(), this.settings.play.apply( this )
      },
      pause: function () {
        this.playing = !1, this.element.pause(), this.settings.pause.apply( this )
      },
      setVolume: function ( a ) {
        this.element.volume = a
      },
      trackEnded: function () {
        this.skipTo.apply( this, [ 0 ] ), this.settings.loop || this.pause.apply( this ), this.settings.trackEnded.apply( this )
      }
    };
    var e = function ( a, b ) {
      var c = [];
      if ( b = b || document, b.getElementsByClassName ) c = b.getElementsByClassName( a );
      else {
        var d, e, f = b.getElementsByTagName( "*" ),
          g = RegExp( "(^|\\s)" + a + "(\\s|$)" );
        for ( d = 0, e = f.length; e > d; d++ ) g.test( f[ d ].className ) && c.push( f[ d ] )
      }
      return c.length > 1 ? c : c[ 0 ]
    }
  }( "audiojs", "audiojsInstance", this ),
  function ( a, b ) {
    "function" == typeof define && define.amd ? define( [], b ) : "object" == typeof exports ? module.exports = b() : b()
  }( this, function () {
    function a( a ) {
      if ( null === p ) {
        for ( var b = a.length, c = 0, d = document.getElementById( f ), e = "<ul>"; b > c; ) e += "<li>" + a[ c ] + "</li>", c++;
        e += "</ul>", d.innerHTML = e
      } else p( a )
    }

    function b( a ) {
      return a.replace( /<b[^>]*>(.*?)<\/b>/gi, function ( a, b ) {
        return b
      } ).replace( /class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "" )
    }

    function c( a ) {
      for ( var b = a.getElementsByTagName( "a" ), c = b.length - 1; c >= 0; c-- ) b[ c ].setAttribute( "target", "_blank" )
    }

    function d( a, b ) {
      for ( var c = [], d = new RegExp( "(^| )" + b + "( |$)" ), e = a.getElementsByTagName( "*" ), f = 0, g = e.length; g > f; f++ ) d.test( e[ f ].className ) && c.push( e[ f ] );
      return c
    }

    function e( a ) {
      if ( void 0 !== a && a.innerHTML.indexOf( "data-srcset" ) >= 0 ) {
        var b = a.innerHTML.match( /data-srcset="([A-z0-9%_\.-]+)/i )[ 0 ];
        return decodeURIComponent( b ).split( '"' )[ 1 ]
      }
    }
    var f = "",
      g = 20,
      h = !0,
      i = [],
      j = !1,
      k = !0,
      l = !0,
      m = null,
      n = !0,
      o = !0,
      p = null,
      q = !0,
      r = !1,
      s = !0,
      t = "en",
      u = !0,
      v = !1,
      w = null,
      x = {
        fetch: function ( a ) {
          if ( void 0 === a.maxTweets && ( a.maxTweets = 20 ), void 0 === a.enableLinks && ( a.enableLinks = !0 ), void 0 === a.showUser && ( a.showUser = !0 ), void 0 === a.showTime && ( a.showTime = !0 ), void 0 === a.dateFunction && ( a.dateFunction = "default" ), void 0 === a.showRetweet && ( a.showRetweet = !0 ), void 0 === a.customCallback && ( a.customCallback = null ), void 0 === a.showInteraction && ( a.showInteraction = !0 ), void 0 === a.showImages && ( a.showImages = !1 ), void 0 === a.linksInNewWindow && ( a.linksInNewWindow = !0 ), void 0 === a.showPermalinks && ( a.showPermalinks = !0 ), void 0 === a.dataOnly && ( a.dataOnly = !1 ), j ) i.push( a );
          else {
            j = !0, f = a.domId, g = a.maxTweets, h = a.enableLinks, l = a.showUser, k = a.showTime, o = a.showRetweet, m = a.dateFunction, p = a.customCallback, q = a.showInteraction, r = a.showImages, s = a.linksInNewWindow, u = a.showPermalinks, v = a.dataOnly;
            var b = document.getElementsByTagName( "head" )[ 0 ];
            null !== w && b.removeChild( w ), w = document.createElement( "script" ), w.type = "text/javascript", void 0 !== a.list ? w.src = "https://syndication.twitter.com/timeline/list?callback=__twttrf.callback&dnt=false&list_slug=" + a.list.listSlug + "&screen_name=" + a.list.screenName + "&suppress_response_codes=true&lang=" + ( a.lang || t ) + "&rnd=" + Math.random() : void 0 !== a.profile ? w.src = "https://syndication.twitter.com/timeline/profile?callback=__twttrf.callback&dnt=false&screen_name=" + a.profile.screenName + "&suppress_response_codes=true&lang=" + ( a.lang || t ) + "&rnd=" + Math.random() : void 0 !== a.likes ? w.src = "https://syndication.twitter.com/timeline/likes?callback=__twttrf.callback&dnt=false&screen_name=" + a.likes.screenName + "&suppress_response_codes=true&lang=" + ( a.lang || t ) + "&rnd=" + Math.random() : w.src = "https://cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + ( a.lang || t ) + "&callback=__twttrf.callback&suppress_response_codes=true&rnd=" + Math.random(), b.appendChild( w )
          }
        },
        callback: function ( f ) {
          function p( a ) {
            var b = a.getElementsByTagName( "img" )[ 0 ];
            return b.src = b.getAttribute( "data-src-2x" ), a
          }
          if ( void 0 === f || void 0 === f.body ) return j = !1, void( i.length > 0 && ( x.fetch( i[ 0 ] ), i.splice( 0, 1 ) ) );
          f.body = f.body.replace( /(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, "" ), r || ( f.body = f.body.replace( /(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, "" ) ), l || ( f.body = f.body.replace( /(<img[^c]*class="Avatar"[^>]*>)/g, "" ) );
          var t = document.createElement( "div" );
          t.innerHTML = f.body, "undefined" == typeof t.getElementsByClassName && ( n = !1 );
          var w = [],
            y = [],
            z = [],
            A = [],
            B = [],
            C = [],
            D = [],
            E = 0;
          if ( n )
            for ( var F = t.getElementsByClassName( "timeline-Tweet" ); E < F.length; ) F[ E ].getElementsByClassName( "timeline-Tweet-retweetCredit" ).length > 0 ? B.push( !0 ) : B.push( !1 ), ( !B[ E ] || B[ E ] && o ) && ( w.push( F[ E ].getElementsByClassName( "timeline-Tweet-text" )[ 0 ] ), C.push( F[ E ].getAttribute( "data-tweet-id" ) ), l && y.push( p( F[ E ].getElementsByClassName( "timeline-Tweet-author" )[ 0 ] ) ), z.push( F[ E ].getElementsByClassName( "dt-updated" )[ 0 ] ), D.push( F[ E ].getElementsByClassName( "timeline-Tweet-timestamp" )[ 0 ] ), void 0 !== F[ E ].getElementsByClassName( "timeline-Tweet-media" )[ 0 ] ? A.push( F[ E ].getElementsByClassName( "timeline-Tweet-media" )[ 0 ] ) : A.push( void 0 ) ), E++;
          else
            for ( var F = d( t, "timeline-Tweet" ); E < F.length; ) d( F[ E ], "timeline-Tweet-retweetCredit" ).length > 0 ? B.push( !0 ) : B.push( !1 ), ( !B[ E ] || B[ E ] && o ) && ( w.push( d( F[ E ], "timeline-Tweet-text" )[ 0 ] ), C.push( F[ E ].getAttribute( "data-tweet-id" ) ), l && y.push( p( d( F[ E ], "timeline-Tweet-author" )[ 0 ] ) ), z.push( d( F[ E ], "dt-updated" )[ 0 ] ), D.push( d( F[ E ], "timeline-Tweet-timestamp" )[ 0 ] ), void 0 !== d( F[ E ], "timeline-Tweet-media" )[ 0 ] ? A.push( d( F[ E ], "timeline-Tweet-media" )[ 0 ] ) : A.push( void 0 ) ), E++;
          w.length > g && ( w.splice( g, w.length - g ), y.splice( g, y.length - g ), z.splice( g, z.length - g ), B.splice( g, B.length - g ), A.splice( g, A.length - g ), D.splice( g, D.length - g ) );
          var G = [],
            E = w.length,
            H = 0;
          if ( v )
            for ( ; E > H; ) G.push( {
              tweet: w[ H ].innerHTML,
              author: y[ H ] ? y[ H ].innerHTML : "Unknown Author",
              time: z[ H ].textContent,
              timestamp: z[ H ].getAttribute( "datetime" ).replace( "+0000", "Z" ).replace( /([\+\-])(\d\d)(\d\d)/, "$1$2:$3" ),
              image: e( A[ H ] ),
              rt: B[ H ],
              tid: C[ H ],
              permalinkURL: void 0 === D[ H ] ? "" : D[ H ].href
            } ), H++;
          else
            for ( ; E > H; ) {
              if ( "string" != typeof m ) {
                var I = z[ H ].getAttribute( "datetime" ),
                  J = new Date( z[ H ].getAttribute( "datetime" ).replace( /-/g, "/" ).replace( "T", " " ).split( "+" )[ 0 ] ),
                  K = m( J, I );
                if ( z[ H ].setAttribute( "aria-label", K ), w[ H ].textContent )
                  if ( n ) z[ H ].textContent = K;
                  else {
                    var L = document.createElement( "p" ),
                      M = document.createTextNode( K );
                    L.appendChild( M ), L.setAttribute( "aria-label", K ), z[ H ] = L
                  }
                else z[ H ].textContent = K
              }
              var N = "";
              h ? ( s && ( c( w[ H ] ), l && c( y[ H ] ) ), l && ( N += '<div class="user">' + b( y[ H ].innerHTML ) + "</div>" ), N += '<p class="tweet">' + b( w[ H ].innerHTML ) + "</p>", k && ( N += u ? '<p class="timePosted"><a href="' + D[ H ] + '">' + z[ H ].getAttribute( "aria-label" ) + "</a></p>" : '<p class="timePosted">' + z[ H ].getAttribute( "aria-label" ) + "</p>" ) ) : w[ H ].textContent ? ( l && ( N += '<p class="user">' + y[ H ].textContent + "</p>" ), N += '<p class="tweet">' + w[ H ].textContent + "</p>", k && ( N += '<p class="timePosted">' + z[ H ].textContent + "</p>" ) ) : ( l && ( N += '<p class="user">' + y[ H ].textContent + "</p>" ), N += '<p class="tweet">' + w[ H ].textContent + "</p>", k && ( N += '<p class="timePosted">' + z[ H ].textContent + "</p>" ) ), q && ( N += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + C[ H ] + '" class="twitter_reply_icon"' + ( s ? ' target="_blank">' : ">" ) + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + C[ H ] + '" class="twitter_retweet_icon"' + ( s ? ' target="_blank">' : ">" ) + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + C[ H ] + '" class="twitter_fav_icon"' + ( s ? ' target="_blank">' : ">" ) + "Favorite</a></p>" ), r && void 0 !== A[ H ] && void 0 !== e( A[ H ] ) && ( N += '<div class="media"><img src="' + e( A[ H ] ) + '" alt="Image from tweet" /></div>' ), r ? G.push( N ) : !r && w[ H ].textContent.length && G.push( N ), H++
            }
          a( G ), j = !1, i.length > 0 && ( x.fetch( i[ 0 ] ), i.splice( 0, 1 ) )
        }
      };
    return window.__twttrf = x, window.twitterFetcher = x, x
  } ), ! function ( a ) {
    function b() {}

    function c( a ) {
      function c( b ) {
        b.prototype.option || ( b.prototype.option = function ( b ) {
          a.isPlainObject( b ) && ( this.options = a.extend( !0, this.options, b ) )
        } )
      }

      function e( b, c ) {
        a.fn[ b ] = function ( e ) {
          if ( "string" == typeof e ) {
            for ( var g = d.call( arguments, 1 ), h = 0, i = this.length; i > h; h++ ) {
              var j = this[ h ],
                k = a.data( j, b );
              if ( k )
                if ( a.isFunction( k[ e ] ) && "_" !== e.charAt( 0 ) ) {
                  var l = k[ e ].apply( k, g );
                  if ( void 0 !== l ) return l
                } else f( "no such method '" + e + "' for " + b + " instance" );
              else f( "cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'" )
            }
            return this
          }
          return this.each( function () {
            var d = a.data( this, b );
            d ? ( d.option( e ), d._init() ) : ( d = new c( this, e ), a.data( this, b, d ) )
          } )
        }
      }
      if ( a ) {
        var f = "undefined" == typeof console ? b : function ( a ) {
          console.error( a )
        };
        return a.bridget = function ( a, b ) {
          c( b ), e( a, b )
        }, a.bridget
      }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define( "jquery-bridget/jquery.bridget", [ "jquery" ], c ) : c( "object" == typeof exports ? require( "jquery" ) : a.jQuery )
  }( window ),
  function ( a ) {
    function b( b ) {
      var c = a.event;
      return c.target = c.target || c.srcElement || b, c
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener ? d = function ( a, b, c ) {
      a.addEventListener( b, c, !1 )
    } : c.attachEvent && ( d = function ( a, c, d ) {
      a[ c + d ] = d.handleEvent ? function () {
        var c = b( a );
        d.handleEvent.call( d, c )
      } : function () {
        var c = b( a );
        d.call( a, c )
      }, a.attachEvent( "on" + c, a[ c + d ] )
    } );
    var e = function () {};
    c.removeEventListener ? e = function ( a, b, c ) {
      a.removeEventListener( b, c, !1 )
    } : c.detachEvent && ( e = function ( a, b, c ) {
      a.detachEvent( "on" + b, a[ b + c ] );
      try {
        delete a[ b + c ]
      } catch ( d ) {
        a[ b + c ] = void 0
      }
    } );
    var f = {
      bind: d,
      unbind: e
    };
    "function" == typeof define && define.amd ? define( "eventie/eventie", f ) : "object" == typeof exports ? module.exports = f : a.eventie = f
  }( window ),
  function () {
    "use strict";

    function a() {}

    function b( a, b ) {
      for ( var c = a.length; c--; )
        if ( a[ c ].listener === b ) return c;
      return -1
    }

    function c( a ) {
      return function () {
        return this[ a ].apply( this, arguments )
      }
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    d.getListeners = function ( a ) {
      var b, c, d = this._getEvents();
      if ( a instanceof RegExp ) {
        b = {};
        for ( c in d ) d.hasOwnProperty( c ) && a.test( c ) && ( b[ c ] = d[ c ] )
      } else b = d[ a ] || ( d[ a ] = [] );
      return b
    }, d.flattenListeners = function ( a ) {
      var b, c = [];
      for ( b = 0; b < a.length; b += 1 ) c.push( a[ b ].listener );
      return c
    }, d.getListenersAsObject = function ( a ) {
      var b, c = this.getListeners( a );
      return c instanceof Array && ( b = {}, b[ a ] = c ), b || c
    }, d.addListener = function ( a, c ) {
      var d, e = this.getListenersAsObject( a ),
        f = "object" == typeof c;
      for ( d in e ) e.hasOwnProperty( d ) && -1 === b( e[ d ], c ) && e[ d ].push( f ? c : {
        listener: c,
        once: !1
      } );
      return this
    }, d.on = c( "addListener" ), d.addOnceListener = function ( a, b ) {
      return this.addListener( a, {
        listener: b,
        once: !0
      } )
    }, d.once = c( "addOnceListener" ), d.defineEvent = function ( a ) {
      return this.getListeners( a ), this
    }, d.defineEvents = function ( a ) {
      for ( var b = 0; b < a.length; b += 1 ) this.defineEvent( a[ b ] );
      return this
    }, d.removeListener = function ( a, c ) {
      var d, e, f = this.getListenersAsObject( a );
      for ( e in f ) f.hasOwnProperty( e ) && ( d = b( f[ e ], c ), -1 !== d && f[ e ].splice( d, 1 ) );
      return this
    }, d.off = c( "removeListener" ), d.addListeners = function ( a, b ) {
      return this.manipulateListeners( !1, a, b )
    }, d.removeListeners = function ( a, b ) {
      return this.manipulateListeners( !0, a, b )
    }, d.manipulateListeners = function ( a, b, c ) {
      var d, e, f = a ? this.removeListener : this.addListener,
        g = a ? this.removeListeners : this.addListeners;
      if ( "object" != typeof b || b instanceof RegExp )
        for ( d = c.length; d--; ) f.call( this, b, c[ d ] );
      else
        for ( d in b ) b.hasOwnProperty( d ) && ( e = b[ d ] ) && ( "function" == typeof e ? f.call( this, d, e ) : g.call( this, d, e ) );
      return this
    }, d.removeEvent = function ( a ) {
      var b, c = typeof a,
        d = this._getEvents();
      if ( "string" === c ) delete d[ a ];
      else if ( a instanceof RegExp )
        for ( b in d ) d.hasOwnProperty( b ) && a.test( b ) && delete d[ b ];
      else delete this._events;
      return this
    }, d.removeAllListeners = c( "removeEvent" ), d.emitEvent = function ( a, b ) {
      var c, d, e, f, g = this.getListenersAsObject( a );
      for ( e in g )
        if ( g.hasOwnProperty( e ) )
          for ( d = g[ e ].length; d--; ) c = g[ e ][ d ], c.once === !0 && this.removeListener( a, c.listener ), f = c.listener.apply( this, b || [] ), f === this._getOnceReturnValue() && this.removeListener( a, c.listener );
      return this
    }, d.trigger = c( "emitEvent" ), d.emit = function ( a ) {
      var b = Array.prototype.slice.call( arguments, 1 );
      return this.emitEvent( a, b )
    }, d.setOnceReturnValue = function ( a ) {
      return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function () {
      return this.hasOwnProperty( "_onceReturnValue" ) ? this._onceReturnValue : !0
    }, d._getEvents = function () {
      return this._events || ( this._events = {} )
    }, a.noConflict = function () {
      return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define( "eventEmitter/EventEmitter", [], function () {
      return a
    } ) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
  }.call( this ),
  function ( a ) {
    function b( a ) {
      if ( a ) {
        if ( "string" == typeof d[ a ] ) return a;
        a = a.charAt( 0 ).toUpperCase() + a.slice( 1 );
        for ( var b, e = 0, f = c.length; f > e; e++ )
          if ( b = c[ e ] + a, "string" == typeof d[ b ] ) return b
      }
    }
    var c = "Webkit Moz ms Ms O".split( " " ),
      d = document.documentElement.style;
    "function" == typeof define && define.amd ? define( "get-style-property/get-style-property", [], function () {
      return b
    } ) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
  }( window ),
  function ( a, b ) {
    function c( a ) {
      var b = parseFloat( a ),
        c = -1 === a.indexOf( "%" ) && !isNaN( b );
      return c && b
    }

    function d() {}

    function e() {
      for ( var a = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, b = 0, c = h.length; c > b; b++ ) {
        var d = h[ b ];
        a[ d ] = 0
      }
      return a
    }

    function f( b ) {
      function d() {
        if ( !m ) {
          m = !0;
          var d = a.getComputedStyle;
          if ( j = function () {
              var a = d ? function ( a ) {
                return d( a, null )
              } : function ( a ) {
                return a.currentStyle
              };
              return function ( b ) {
                var c = a( b );
                return c || g( "Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1" ), c
              }
            }(), k = b( "boxSizing" ) ) {
            var e = document.createElement( "div" );
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[ k ] = "border-box";
            var f = document.body || document.documentElement;
            f.appendChild( e );
            var h = j( e );
            l = 200 === c( h.width ), f.removeChild( e )
          }
        }
      }

      function f( a ) {
        if ( d(), "string" == typeof a && ( a = document.querySelector( a ) ), a && "object" == typeof a && a.nodeType ) {
          var b = j( a );
          if ( "none" === b.display ) return e();
          var f = {};
          f.width = a.offsetWidth, f.height = a.offsetHeight;
          for ( var g = f.isBorderBox = !( !k || !b[ k ] || "border-box" !== b[ k ] ), m = 0, n = h.length; n > m; m++ ) {
            var o = h[ m ],
              p = b[ o ];
            p = i( a, p );
            var q = parseFloat( p );
            f[ o ] = isNaN( q ) ? 0 : q
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c( b.width );
          y !== !1 && ( f.width = y + ( x ? 0 : r + v ) );
          var z = c( b.height );
          return z !== !1 && ( f.height = z + ( x ? 0 : s + w ) ), f.innerWidth = f.width - ( r + v ), f.innerHeight = f.height - ( s + w ), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
        }
      }

      function i( b, c ) {
        if ( a.getComputedStyle || -1 === c.indexOf( "%" ) ) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return g && ( f.left = b.currentStyle.left ), d.left = c, c = d.pixelLeft, d.left = e, g && ( f.left = g ), c
      }
      var j, k, l, m = !1;
      return f
    }
    var g = "undefined" == typeof console ? d : function ( a ) {
        console.error( a )
      },
      h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define( "get-size/get-size", [ "get-style-property/get-style-property" ], f ) : "object" == typeof exports ? module.exports = f( require( "desandro-get-style-property" ) ) : a.getSize = f( a.getStyleProperty )
  }( window ),
  function ( a ) {
    function b( a ) {
      "function" == typeof a && ( b.isReady ? a() : g.push( a ) )
    }

    function c( a ) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d()
    }

    function d() {
      b.isReady = !0;
      for ( var a = 0, c = g.length; c > a; a++ ) {
        var d = g[ a ];
        d()
      }
    }

    function e( e ) {
      return "complete" === f.readyState ? d() : ( e.bind( f, "DOMContentLoaded", c ), e.bind( f, "readystatechange", c ), e.bind( a, "load", c ) ), b
    }
    var f = a.document,
      g = [];
    b.isReady = !1, "function" == typeof define && define.amd ? define( "doc-ready/doc-ready", [ "eventie/eventie" ], e ) : "object" == typeof exports ? module.exports = e( require( "eventie" ) ) : a.docReady = e( a.eventie )
  }( window ),
  function ( a ) {
    "use strict";

    function b( a, b ) {
      return a[ g ]( b )
    }

    function c( a ) {
      if ( !a.parentNode ) {
        var b = document.createDocumentFragment();
        b.appendChild( a )
      }
    }

    function d( a, b ) {
      c( a );
      for ( var d = a.parentNode.querySelectorAll( b ), e = 0, f = d.length; f > e; e++ )
        if ( d[ e ] === a ) return !0;
      return !1
    }

    function e( a, d ) {
      return c( a ), b( a, d )
    }
    var f, g = function () {
      if ( a.matches ) return "matches";
      if ( a.matchesSelector ) return "matchesSelector";
      for ( var b = [ "webkit", "moz", "ms", "o" ], c = 0, d = b.length; d > c; c++ ) {
        var e = b[ c ],
          f = e + "MatchesSelector";
        if ( a[ f ] ) return f
      }
    }();
    if ( g ) {
      var h = document.createElement( "div" ),
        i = b( h, "div" );
      f = i ? b : e
    } else f = d;
    "function" == typeof define && define.amd ? define( "matches-selector/matches-selector", [], function () {
      return f
    } ) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
  }( Element.prototype ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "fizzy-ui-utils/utils", [ "doc-ready/doc-ready", "matches-selector/matches-selector" ], function ( c, d ) {
      return b( a, c, d )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "doc-ready" ), require( "desandro-matches-selector" ) ) : a.fizzyUIUtils = b( a, a.docReady, a.matchesSelector )
  }( window, function ( a, b, c ) {
    var d = {};
    d.extend = function ( a, b ) {
      for ( var c in b ) a[ c ] = b[ c ];
      return a
    }, d.modulo = function ( a, b ) {
      return ( a % b + b ) % b
    };
    var e = Object.prototype.toString;
    d.isArray = function ( a ) {
      return "[object Array]" == e.call( a )
    }, d.makeArray = function ( a ) {
      var b = [];
      if ( d.isArray( a ) ) b = a;
      else if ( a && "number" == typeof a.length )
        for ( var c = 0, e = a.length; e > c; c++ ) b.push( a[ c ] );
      else b.push( a );
      return b
    }, d.indexOf = Array.prototype.indexOf ? function ( a, b ) {
      return a.indexOf( b )
    } : function ( a, b ) {
      for ( var c = 0, d = a.length; d > c; c++ )
        if ( a[ c ] === b ) return c;
      return -1
    }, d.removeFrom = function ( a, b ) {
      var c = d.indexOf( a, b ); - 1 != c && a.splice( c, 1 )
    }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function ( a ) {
      return a instanceof HTMLElement
    } : function ( a ) {
      return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
    }, d.setText = function () {
      function a( a, c ) {
        b = b || ( void 0 !== document.documentElement.textContent ? "textContent" : "innerText" ), a[ b ] = c
      }
      var b;
      return a
    }(), d.getParent = function ( a, b ) {
      for ( ; a != document.body; )
        if ( a = a.parentNode, c( a, b ) ) return a
    }, d.getQueryElement = function ( a ) {
      return "string" == typeof a ? document.querySelector( a ) : a
    }, d.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, d.filterFindElements = function ( a, b ) {
      a = d.makeArray( a );
      for ( var e = [], f = 0, g = a.length; g > f; f++ ) {
        var h = a[ f ];
        if ( d.isElement( h ) )
          if ( b ) {
            c( h, b ) && e.push( h );
            for ( var i = h.querySelectorAll( b ), j = 0, k = i.length; k > j; j++ ) e.push( i[ j ] )
          } else e.push( h )
      }
      return e
    }, d.debounceMethod = function ( a, b, c ) {
      var d = a.prototype[ b ],
        e = b + "Timeout";
      a.prototype[ b ] = function () {
        var a = this[ e ];
        a && clearTimeout( a );
        var b = arguments,
          f = this;
        this[ e ] = setTimeout( function () {
          d.apply( f, b ), delete f[ e ]
        }, c || 100 )
      }
    }, d.toDashed = function ( a ) {
      return a.replace( /(.)([A-Z])/g, function ( a, b, c ) {
        return b + "-" + c
      } ).toLowerCase()
    };
    var f = a.console;
    return d.htmlInit = function ( c, e ) {
      b( function () {
        for ( var b = d.toDashed( e ), g = document.querySelectorAll( ".js-" + b ), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++ ) {
          var k, l = g[ i ],
            m = l.getAttribute( h );
          try {
            k = m && JSON.parse( m )
          } catch ( n ) {
            f && f.error( "Error parsing " + h + " on " + l.nodeName.toLowerCase() + ( l.id ? "#" + l.id : "" ) + ": " + n );
            continue
          }
          var o = new c( l, k ),
            p = a.jQuery;
          p && p.data( l, e, o )
        }
      } )
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "outlayer/item", [ "eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils" ], function ( c, d, e, f ) {
      return b( a, c, d, e, f )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "wolfy87-eventemitter" ), require( "get-size" ), require( "desandro-get-style-property" ), require( "fizzy-ui-utils" ) ) : ( a.Outlayer = {}, a.Outlayer.Item = b( a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils ) )
  }( window, function ( a, b, c, d, e ) {
    "use strict";

    function f( a ) {
      for ( var b in a ) return !1;
      return b = null, !0
    }

    function g( a, b ) {
      a && ( this.element = a, this.layout = b, this.position = {
        x: 0,
        y: 0
      }, this._create() )
    }

    function h( a ) {
      return a.replace( /([A-Z])/g, function ( a ) {
        return "-" + a.toLowerCase()
      } )
    }
    var i = a.getComputedStyle,
      j = i ? function ( a ) {
        return i( a, null )
      } : function ( a ) {
        return a.currentStyle
      },
      k = d( "transition" ),
      l = d( "transform" ),
      m = k && l,
      n = !!d( "perspective" ),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
      } [ k ],
      p = [ "transform", "transition", "transitionDuration", "transitionProperty" ],
      q = function () {
        for ( var a = {}, b = 0, c = p.length; c > b; b++ ) {
          var e = p[ b ],
            f = d( e );
          f && f !== e && ( a[ e ] = f )
        }
        return a
      }();
    e.extend( g.prototype, b.prototype ), g.prototype._create = function () {
      this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
      }, this.css( {
        position: "absolute"
      } )
    }, g.prototype.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, g.prototype.getSize = function () {
      this.size = c( this.element )
    }, g.prototype.css = function ( a ) {
      var b = this.element.style;
      for ( var c in a ) {
        var d = q[ c ] || c;
        b[ d ] = a[ c ]
      }
    }, g.prototype.getPosition = function () {
      var a = j( this.element ),
        b = this.layout.options,
        c = b.isOriginLeft,
        d = b.isOriginTop,
        e = a[ c ? "left" : "right" ],
        f = a[ d ? "top" : "bottom" ],
        g = this.layout.size,
        h = -1 != e.indexOf( "%" ) ? parseFloat( e ) / 100 * g.width : parseInt( e, 10 ),
        i = -1 != f.indexOf( "%" ) ? parseFloat( f ) / 100 * g.height : parseInt( f, 10 );
      h = isNaN( h ) ? 0 : h, i = isNaN( i ) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i
    }, g.prototype.layoutPosition = function () {
      var a = this.layout.size,
        b = this.layout.options,
        c = {},
        d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
        e = b.isOriginLeft ? "left" : "right",
        f = b.isOriginLeft ? "right" : "left",
        g = this.position.x + a[ d ];
      c[ e ] = this.getXValue( g ), c[ f ] = "";
      var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
        i = b.isOriginTop ? "top" : "bottom",
        j = b.isOriginTop ? "bottom" : "top",
        k = this.position.y + a[ h ];
      c[ i ] = this.getYValue( k ), c[ j ] = "", this.css( c ), this.emitEvent( "layout", [ this ] )
    }, g.prototype.getXValue = function ( a ) {
      var b = this.layout.options;
      return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px"
    }, g.prototype.getYValue = function ( a ) {
      var b = this.layout.options;
      return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px"
    }, g.prototype._transitionTo = function ( a, b ) {
      this.getPosition();
      var c = this.position.x,
        d = this.position.y,
        e = parseInt( a, 10 ),
        f = parseInt( b, 10 ),
        g = e === this.position.x && f === this.position.y;
      if ( this.setPosition( a, b ), g && !this.isTransitioning ) return void this.layoutPosition();
      var h = a - c,
        i = b - d,
        j = {};
      j.transform = this.getTranslate( h, i ), this.transition( {
        to: j,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: !0
      } )
    }, g.prototype.getTranslate = function ( a, b ) {
      var c = this.layout.options;
      return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)"
    }, g.prototype.goTo = function ( a, b ) {
      this.setPosition( a, b ), this.layoutPosition()
    }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function ( a, b ) {
      this.position.x = parseInt( a, 10 ), this.position.y = parseInt( b, 10 )
    }, g.prototype._nonTransition = function ( a ) {
      this.css( a.to ), a.isCleaning && this._removeStyles( a.to );
      for ( var b in a.onTransitionEnd ) a.onTransitionEnd[ b ].call( this )
    }, g.prototype._transition = function ( a ) {
      if ( !parseFloat( this.layout.options.transitionDuration ) ) return void this._nonTransition( a );
      var b = this._transn;
      for ( var c in a.onTransitionEnd ) b.onEnd[ c ] = a.onTransitionEnd[ c ];
      for ( c in a.to ) b.ingProperties[ c ] = !0, a.isCleaning && ( b.clean[ c ] = !0 );
      if ( a.from ) {
        this.css( a.from );
        var d = this.element.offsetHeight;
        d = null
      }
      this.enableTransition( a.to ), this.css( a.to ), this.isTransitioning = !0
    };
    var r = "opacity," + h( q.transform || "transform" );
    g.prototype.enableTransition = function () {
      this.isTransitioning || ( this.css( {
        transitionProperty: r,
        transitionDuration: this.layout.options.transitionDuration
      } ), this.element.addEventListener( o, this, !1 ) )
    }, g.prototype.transition = g.prototype[ k ? "_transition" : "_nonTransition" ], g.prototype.onwebkitTransitionEnd = function ( a ) {
      this.ontransitionend( a )
    }, g.prototype.onotransitionend = function ( a ) {
      this.ontransitionend( a )
    };
    var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform"
    };
    g.prototype.ontransitionend = function ( a ) {
      if ( a.target === this.element ) {
        var b = this._transn,
          c = s[ a.propertyName ] || a.propertyName;
        if ( delete b.ingProperties[ c ], f( b.ingProperties ) && this.disableTransition(), c in b.clean && ( this.element.style[ a.propertyName ] = "", delete b.clean[ c ] ), c in b.onEnd ) {
          var d = b.onEnd[ c ];
          d.call( this ), delete b.onEnd[ c ]
        }
        this.emitEvent( "transitionEnd", [ this ] )
      }
    }, g.prototype.disableTransition = function () {
      this.removeTransitionStyles(), this.element.removeEventListener( o, this, !1 ), this.isTransitioning = !1
    }, g.prototype._removeStyles = function ( a ) {
      var b = {};
      for ( var c in a ) b[ c ] = "";
      this.css( b )
    };
    var t = {
      transitionProperty: "",
      transitionDuration: ""
    };
    return g.prototype.removeTransitionStyles = function () {
      this.css( t )
    }, g.prototype.removeElem = function () {
      this.element.parentNode.removeChild( this.element ), this.css( {
        display: ""
      } ), this.emitEvent( "remove", [ this ] )
    }, g.prototype.remove = function () {
      if ( !k || !parseFloat( this.layout.options.transitionDuration ) ) return void this.removeElem();
      var a = this;
      this.once( "transitionEnd", function () {
        a.removeElem()
      } ), this.hide()
    }, g.prototype.reveal = function () {
      delete this.isHidden, this.css( {
        display: ""
      } );
      var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty( "visibleStyle" );
      b[ c ] = this.onRevealTransitionEnd, this.transition( {
        from: a.hiddenStyle,
        to: a.visibleStyle,
        isCleaning: !0,
        onTransitionEnd: b
      } )
    }, g.prototype.onRevealTransitionEnd = function () {
      this.isHidden || this.emitEvent( "reveal" )
    }, g.prototype.getHideRevealTransitionEndProperty = function ( a ) {
      var b = this.layout.options[ a ];
      if ( b.opacity ) return "opacity";
      for ( var c in b ) return c
    }, g.prototype.hide = function () {
      this.isHidden = !0, this.css( {
        display: ""
      } );
      var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty( "hiddenStyle" );
      b[ c ] = this.onHideTransitionEnd, this.transition( {
        from: a.visibleStyle,
        to: a.hiddenStyle,
        isCleaning: !0,
        onTransitionEnd: b
      } )
    }, g.prototype.onHideTransitionEnd = function () {
      this.isHidden && ( this.css( {
        display: "none"
      } ), this.emitEvent( "hide" ) )
    }, g.prototype.destroy = function () {
      this.css( {
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        transition: "",
        transform: ""
      } )
    }, g
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "outlayer/outlayer", [ "eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function ( c, d, e, f, g ) {
      return b( a, c, d, e, f, g )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "eventie" ), require( "wolfy87-eventemitter" ), require( "get-size" ), require( "fizzy-ui-utils" ), require( "./item" ) ) : a.Outlayer = b( a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item )
  }( window, function ( a, b, c, d, e, f ) {
    "use strict";

    function g( a, b ) {
      var c = e.getQueryElement( a );
      if ( !c ) return void( h && h.error( "Bad element for " + this.constructor.namespace + ": " + ( c || a ) ) );
      this.element = c, i && ( this.$element = i( this.element ) ), this.options = e.extend( {}, this.constructor.defaults ), this.option( b );
      var d = ++k;
      this.element.outlayerGUID = d, l[ d ] = this, this._create(), this.options.isInitLayout && this.layout()
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    return g.namespace = "outlayer", g.Item = f, g.defaults = {
      containerStyle: {
        position: "relative"
      },
      isInitLayout: !0,
      isOriginLeft: !0,
      isOriginTop: !0,
      isResizeBound: !0,
      isResizingContainer: !0,
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.001)"
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      }
    }, e.extend( g.prototype, c.prototype ), g.prototype.option = function ( a ) {
      e.extend( this.options, a )
    }, g.prototype._create = function () {
      this.reloadItems(), this.stamps = [], this.stamp( this.options.stamp ), e.extend( this.element.style, this.options.containerStyle ), this.options.isResizeBound && this.bindResize()
    }, g.prototype.reloadItems = function () {
      this.items = this._itemize( this.element.children )
    }, g.prototype._itemize = function ( a ) {
      for ( var b = this._filterFindItemElements( a ), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++ ) {
        var g = b[ e ],
          h = new c( g, this );
        d.push( h )
      }
      return d
    }, g.prototype._filterFindItemElements = function ( a ) {
      return e.filterFindElements( a, this.options.itemSelector )
    }, g.prototype.getItemElements = function () {
      for ( var a = [], b = 0, c = this.items.length; c > b; b++ ) a.push( this.items[ b ].element );
      return a
    }, g.prototype.layout = function () {
      this._resetLayout(), this._manageStamps();
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      this.layoutItems( this.items, a ), this._isLayoutInited = !0
    }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () {
      this.getSize()
    }, g.prototype.getSize = function () {
      this.size = d( this.element )
    }, g.prototype._getMeasurement = function ( a, b ) {
      var c, f = this.options[ a ];
      f ? ( "string" == typeof f ? c = this.element.querySelector( f ) : e.isElement( f ) && ( c = f ), this[ a ] = c ? d( c )[ b ] : f ) : this[ a ] = 0
    }, g.prototype.layoutItems = function ( a, b ) {
      a = this._getItemsForLayout( a ), this._layoutItems( a, b ), this._postLayout()
    }, g.prototype._getItemsForLayout = function ( a ) {
      for ( var b = [], c = 0, d = a.length; d > c; c++ ) {
        var e = a[ c ];
        e.isIgnored || b.push( e )
      }
      return b
    }, g.prototype._layoutItems = function ( a, b ) {
      if ( this._emitCompleteOnItems( "layout", a ), a && a.length ) {
        for ( var c = [], d = 0, e = a.length; e > d; d++ ) {
          var f = a[ d ],
            g = this._getItemLayoutPosition( f );
          g.item = f, g.isInstant = b || f.isLayoutInstant, c.push( g )
        }
        this._processLayoutQueue( c )
      }
    }, g.prototype._getItemLayoutPosition = function () {
      return {
        x: 0,
        y: 0
      }
    }, g.prototype._processLayoutQueue = function ( a ) {
      for ( var b = 0, c = a.length; c > b; b++ ) {
        var d = a[ b ];
        this._positionItem( d.item, d.x, d.y, d.isInstant )
      }
    }, g.prototype._positionItem = function ( a, b, c, d ) {
      d ? a.goTo( b, c ) : a.moveTo( b, c )
    }, g.prototype._postLayout = function () {
      this.resizeContainer()
    }, g.prototype.resizeContainer = function () {
      if ( this.options.isResizingContainer ) {
        var a = this._getContainerSize();
        a && ( this._setContainerMeasure( a.width, !0 ), this._setContainerMeasure( a.height, !1 ) )
      }
    }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function ( a, b ) {
      if ( void 0 !== a ) {
        var c = this.size;
        c.isBorderBox && ( a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth ), a = Math.max( a, 0 ), this.element.style[ b ? "width" : "height" ] = a + "px"
      }
    }, g.prototype._emitCompleteOnItems = function ( a, b ) {
      function c() {
        e.dispatchEvent( a + "Complete", null, [ b ] )
      }

      function d() {
        g++, g === f && c()
      }
      var e = this,
        f = b.length;
      if ( !b || !f ) return void c();
      for ( var g = 0, h = 0, i = b.length; i > h; h++ ) {
        var j = b[ h ];
        j.once( a, d )
      }
    }, g.prototype.dispatchEvent = function ( a, b, c ) {
      var d = b ? [ b ].concat( c ) : c;
      if ( this.emitEvent( a, d ), i )
        if ( this.$element = this.$element || i( this.element ), b ) {
          var e = i.Event( b );
          e.type = a, this.$element.trigger( e, c )
        } else this.$element.trigger( a, c )
    }, g.prototype.ignore = function ( a ) {
      var b = this.getItem( a );
      b && ( b.isIgnored = !0 )
    }, g.prototype.unignore = function ( a ) {
      var b = this.getItem( a );
      b && delete b.isIgnored
    }, g.prototype.stamp = function ( a ) {
      if ( a = this._find( a ) ) {
        this.stamps = this.stamps.concat( a );
        for ( var b = 0, c = a.length; c > b; b++ ) {
          var d = a[ b ];
          this.ignore( d )
        }
      }
    }, g.prototype.unstamp = function ( a ) {
      if ( a = this._find( a ) )
        for ( var b = 0, c = a.length; c > b; b++ ) {
          var d = a[ b ];
          e.removeFrom( this.stamps, d ), this.unignore( d )
        }
    }, g.prototype._find = function ( a ) {
      return a ? ( "string" == typeof a && ( a = this.element.querySelectorAll( a ) ), a = e.makeArray( a ) ) : void 0
    }, g.prototype._manageStamps = function () {
      if ( this.stamps && this.stamps.length ) {
        this._getBoundingRect();
        for ( var a = 0, b = this.stamps.length; b > a; a++ ) {
          var c = this.stamps[ a ];
          this._manageStamp( c )
        }
      }
    }, g.prototype._getBoundingRect = function () {
      var a = this.element.getBoundingClientRect(),
        b = this.size;
      this._boundingRect = {
        left: a.left + b.paddingLeft + b.borderLeftWidth,
        top: a.top + b.paddingTop + b.borderTopWidth,
        right: a.right - ( b.paddingRight + b.borderRightWidth ),
        bottom: a.bottom - ( b.paddingBottom + b.borderBottomWidth )
      }
    }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function ( a ) {
      var b = a.getBoundingClientRect(),
        c = this._boundingRect,
        e = d( a ),
        f = {
          left: b.left - c.left - e.marginLeft,
          top: b.top - c.top - e.marginTop,
          right: c.right - b.right - e.marginRight,
          bottom: c.bottom - b.bottom - e.marginBottom
        };
      return f
    }, g.prototype.handleEvent = function ( a ) {
      var b = "on" + a.type;
      this[ b ] && this[ b ]( a )
    }, g.prototype.bindResize = function () {
      this.isResizeBound || ( b.bind( a, "resize", this ), this.isResizeBound = !0 )
    }, g.prototype.unbindResize = function () {
      this.isResizeBound && b.unbind( a, "resize", this ), this.isResizeBound = !1
    }, g.prototype.onresize = function () {
      function a() {
        b.resize(), delete b.resizeTimeout
      }
      this.resizeTimeout && clearTimeout( this.resizeTimeout );
      var b = this;
      this.resizeTimeout = setTimeout( a, 100 )
    }, g.prototype.resize = function () {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, g.prototype.needsResizeLayout = function () {
      var a = d( this.element ),
        b = this.size && a;
      return b && a.innerWidth !== this.size.innerWidth
    }, g.prototype.addItems = function ( a ) {
      var b = this._itemize( a );
      return b.length && ( this.items = this.items.concat( b ) ), b
    }, g.prototype.appended = function ( a ) {
      var b = this.addItems( a );
      b.length && ( this.layoutItems( b, !0 ), this.reveal( b ) )
    }, g.prototype.prepended = function ( a ) {
      var b = this._itemize( a );
      if ( b.length ) {
        var c = this.items.slice( 0 );
        this.items = b.concat( c ), this._resetLayout(), this._manageStamps(), this.layoutItems( b, !0 ), this.reveal( b ), this.layoutItems( c )
      }
    }, g.prototype.reveal = function ( a ) {
      this._emitCompleteOnItems( "reveal", a );
      for ( var b = a && a.length, c = 0; b && b > c; c++ ) {
        var d = a[ c ];
        d.reveal()
      }
    }, g.prototype.hide = function ( a ) {
      this._emitCompleteOnItems( "hide", a );
      for ( var b = a && a.length, c = 0; b && b > c; c++ ) {
        var d = a[ c ];
        d.hide()
      }
    }, g.prototype.revealItemElements = function ( a ) {
      var b = this.getItems( a );
      this.reveal( b )
    }, g.prototype.hideItemElements = function ( a ) {
      var b = this.getItems( a );
      this.hide( b )
    }, g.prototype.getItem = function ( a ) {
      for ( var b = 0, c = this.items.length; c > b; b++ ) {
        var d = this.items[ b ];
        if ( d.element === a ) return d
      }
    }, g.prototype.getItems = function ( a ) {
      a = e.makeArray( a );
      for ( var b = [], c = 0, d = a.length; d > c; c++ ) {
        var f = a[ c ],
          g = this.getItem( f );
        g && b.push( g )
      }
      return b
    }, g.prototype.remove = function ( a ) {
      var b = this.getItems( a );
      if ( this._emitCompleteOnItems( "remove", b ), b && b.length )
        for ( var c = 0, d = b.length; d > c; c++ ) {
          var f = b[ c ];
          f.remove(), e.removeFrom( this.items, f )
        }
    }, g.prototype.destroy = function () {
      var a = this.element.style;
      a.height = "", a.position = "", a.width = "";
      for ( var b = 0, c = this.items.length; c > b; b++ ) {
        var d = this.items[ b ];
        d.destroy()
      }
      this.unbindResize();
      var e = this.element.outlayerGUID;
      delete l[ e ], delete this.element.outlayerGUID, i && i.removeData( this.element, this.constructor.namespace )
    }, g.data = function ( a ) {
      a = e.getQueryElement( a );
      var b = a && a.outlayerGUID;
      return b && l[ b ]
    }, g.create = function ( a, b ) {
      function c() {
        g.apply( this, arguments )
      }
      return Object.create ? c.prototype = Object.create( g.prototype ) : e.extend( c.prototype, g.prototype ), c.prototype.constructor = c, c.defaults = e.extend( {}, g.defaults ), e.extend( c.defaults, b ), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function () {
        f.apply( this, arguments )
      }, c.Item.prototype = new f, e.htmlInit( c, a ), i && i.bridget && i.bridget( a, c ), c
    }, g.Item = f, g
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "isotope/js/item", [ "outlayer/outlayer" ], b ) : "object" == typeof exports ? module.exports = b( require( "outlayer" ) ) : ( a.Isotope = a.Isotope || {}, a.Isotope.Item = b( a.Outlayer ) )
  }( window, function ( a ) {
    "use strict";

    function b() {
      a.Item.apply( this, arguments )
    }
    b.prototype = new a.Item, b.prototype._create = function () {
      this.id = this.layout.itemGUID++, a.Item.prototype._create.call( this ), this.sortData = {}
    }, b.prototype.updateSortData = function () {
      if ( !this.isIgnored ) {
        this.sortData.id = this.id, this.sortData[ "original-order" ] = this.id, this.sortData.random = Math.random();
        var a = this.layout.options.getSortData,
          b = this.layout._sorters;
        for ( var c in a ) {
          var d = b[ c ];
          this.sortData[ c ] = d( this.element, this )
        }
      }
    };
    var c = b.prototype.destroy;
    return b.prototype.destroy = function () {
      c.apply( this, arguments ), this.css( {
        display: ""
      } )
    }, b
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "isotope/js/layout-mode", [ "get-size/get-size", "outlayer/outlayer" ], b ) : "object" == typeof exports ? module.exports = b( require( "get-size" ), require( "outlayer" ) ) : ( a.Isotope = a.Isotope || {}, a.Isotope.LayoutMode = b( a.getSize, a.Outlayer ) )
  }( window, function ( a, b ) {
    "use strict";

    function c( a ) {
      this.isotope = a, a && ( this.options = a.options[ this.namespace ], this.element = a.element, this.items = a.filteredItems, this.size = a.size )
    }
    return function () {
      function a( a ) {
        return function () {
          return b.prototype[ a ].apply( this.isotope, arguments )
        }
      }
      for ( var d = [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout" ], e = 0, f = d.length; f > e; e++ ) {
        var g = d[ e ];
        c.prototype[ g ] = a( g )
      }
    }(), c.prototype.needsVerticalResizeLayout = function () {
      var b = a( this.isotope.element ),
        c = this.isotope.size && b;
      return c && b.innerHeight != this.isotope.size.innerHeight
    }, c.prototype._getMeasurement = function () {
      this.isotope._getMeasurement.apply( this, arguments )
    }, c.prototype.getColumnWidth = function () {
      this.getSegmentSize( "column", "Width" )
    }, c.prototype.getRowHeight = function () {
      this.getSegmentSize( "row", "Height" )
    }, c.prototype.getSegmentSize = function ( a, b ) {
      var c = a + b,
        d = "outer" + b;
      if ( this._getMeasurement( c, d ), !this[ c ] ) {
        var e = this.getFirstItemSize();
        this[ c ] = e && e[ d ] || this.isotope.size[ "inner" + b ]
      }
    }, c.prototype.getFirstItemSize = function () {
      var b = this.isotope.filteredItems[ 0 ];
      return b && b.element && a( b.element )
    }, c.prototype.layout = function () {
      this.isotope.layout.apply( this.isotope, arguments )
    }, c.prototype.getSize = function () {
      this.isotope.getSize(), this.size = this.isotope.size
    }, c.modes = {}, c.create = function ( a, b ) {
      function d() {
        c.apply( this, arguments )
      }
      return d.prototype = new c, b && ( d.options = b ), d.prototype.namespace = a, c.modes[ a ] = d, d
    }, c
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "masonry/masonry", [ "outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils" ], b ) : "object" == typeof exports ? module.exports = b( require( "outlayer" ), require( "get-size" ), require( "fizzy-ui-utils" ) ) : a.Masonry = b( a.Outlayer, a.getSize, a.fizzyUIUtils )
  }( window, function ( a, b, c ) {
    var d = a.create( "masonry" );
    return d.prototype._resetLayout = function () {
      this.getSize(), this._getMeasurement( "columnWidth", "outerWidth" ), this._getMeasurement( "gutter", "outerWidth" ), this.measureColumns();
      var a = this.cols;
      for ( this.colYs = []; a--; ) this.colYs.push( 0 );
      this.maxY = 0
    }, d.prototype.measureColumns = function () {
      if ( this.getContainerWidth(), !this.columnWidth ) {
        var a = this.items[ 0 ],
          c = a && a.element;
        this.columnWidth = c && b( c ).outerWidth || this.containerWidth
      }
      var d = this.columnWidth += this.gutter,
        e = this.containerWidth + this.gutter,
        f = e / d,
        g = d - e % d,
        h = g && 1 > g ? "round" : "floor";
      f = Math[ h ]( f ), this.cols = Math.max( f, 1 )
    }, d.prototype.getContainerWidth = function () {
      var a = this.options.isFitWidth ? this.element.parentNode : this.element,
        c = b( a );
      this.containerWidth = c && c.innerWidth
    }, d.prototype._getItemLayoutPosition = function ( a ) {
      a.getSize();
      var b = a.size.outerWidth % this.columnWidth,
        d = b && 1 > b ? "round" : "ceil",
        e = Math[ d ]( a.size.outerWidth / this.columnWidth );
      e = Math.min( e, this.cols );
      for ( var f = this._getColGroup( e ), g = Math.min.apply( Math, f ), h = c.indexOf( f, g ), i = {
          x: this.columnWidth * h,
          y: g
        }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++ ) this.colYs[ h + l ] = j;
      return i
    }, d.prototype._getColGroup = function ( a ) {
      if ( 2 > a ) return this.colYs;
      for ( var b = [], c = this.cols + 1 - a, d = 0; c > d; d++ ) {
        var e = this.colYs.slice( d, d + a );
        b[ d ] = Math.max.apply( Math, e )
      }
      return b
    }, d.prototype._manageStamp = function ( a ) {
      var c = b( a ),
        d = this._getElementOffset( a ),
        e = this.options.isOriginLeft ? d.left : d.right,
        f = e + c.outerWidth,
        g = Math.floor( e / this.columnWidth );
      g = Math.max( 0, g );
      var h = Math.floor( f / this.columnWidth );
      h -= f % this.columnWidth ? 0 : 1, h = Math.min( this.cols - 1, h );
      for ( var i = ( this.options.isOriginTop ? d.top : d.bottom ) + c.outerHeight, j = g; h >= j; j++ ) this.colYs[ j ] = Math.max( i, this.colYs[ j ] )
    }, d.prototype._getContainerSize = function () {
      this.maxY = Math.max.apply( Math, this.colYs );
      var a = {
        height: this.maxY
      };
      return this.options.isFitWidth && ( a.width = this._getContainerFitWidth() ), a
    }, d.prototype._getContainerFitWidth = function () {
      for ( var a = 0, b = this.cols; --b && 0 === this.colYs[ b ]; ) a++;
      return ( this.cols - a ) * this.columnWidth - this.gutter
    }, d.prototype.needsResizeLayout = function () {
      var a = this.containerWidth;
      return this.getContainerWidth(), a !== this.containerWidth
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "isotope/js/layout-modes/masonry", [ "../layout-mode", "masonry/masonry" ], b ) : "object" == typeof exports ? module.exports = b( require( "../layout-mode" ), require( "masonry-layout" ) ) : b( a.Isotope.LayoutMode, a.Masonry )
  }( window, function ( a, b ) {
    "use strict";

    function c( a, b ) {
      for ( var c in b ) a[ c ] = b[ c ];
      return a
    }
    var d = a.create( "masonry" ),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;
    c( d.prototype, b.prototype ), d.prototype._getElementOffset = e, d.prototype.layout = f, d.prototype._getMeasurement = g;
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function () {
      this.items = this.isotope.filteredItems, h.call( this )
    };
    var i = d.prototype._manageStamp;
    return d.prototype._manageStamp = function () {
      this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, i.apply( this, arguments )
    }, d
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "isotope/js/layout-modes/fit-rows", [ "../layout-mode" ], b ) : "object" == typeof exports ? module.exports = b( require( "../layout-mode" ) ) : b( a.Isotope.LayoutMode )
  }( window, function ( a ) {
    "use strict";
    var b = a.create( "fitRows" );
    return b.prototype._resetLayout = function () {
      this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement( "gutter", "outerWidth" )
    }, b.prototype._getItemLayoutPosition = function ( a ) {
      a.getSize();
      var b = a.size.outerWidth + this.gutter,
        c = this.isotope.size.innerWidth + this.gutter;
      0 !== this.x && b + this.x > c && ( this.x = 0, this.y = this.maxY );
      var d = {
        x: this.x,
        y: this.y
      };
      return this.maxY = Math.max( this.maxY, this.y + a.size.outerHeight ), this.x += b, d
    }, b.prototype._getContainerSize = function () {
      return {
        height: this.maxY
      }
    }, b
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( "isotope/js/layout-modes/vertical", [ "../layout-mode" ], b ) : "object" == typeof exports ? module.exports = b( require( "../layout-mode" ) ) : b( a.Isotope.LayoutMode )
  }( window, function ( a ) {
    "use strict";
    var b = a.create( "vertical", {
      horizontalAlignment: 0
    } );
    return b.prototype._resetLayout = function () {
      this.y = 0
    }, b.prototype._getItemLayoutPosition = function ( a ) {
      a.getSize();
      var b = ( this.isotope.size.innerWidth - a.size.outerWidth ) * this.options.horizontalAlignment,
        c = this.y;
      return this.y += a.size.outerHeight, {
        x: b,
        y: c
      }
    }, b.prototype._getContainerSize = function () {
      return {
        height: this.y
      }
    }, b
  } ),
  function ( a, b ) {
    "use strict";
    "function" == typeof define && define.amd ? define( [ "outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical" ], function ( c, d, e, f, g, h ) {
      return b( a, c, d, e, f, g, h )
    } ) : "object" == typeof exports ? module.exports = b( a, require( "outlayer" ), require( "get-size" ), require( "desandro-matches-selector" ), require( "fizzy-ui-utils" ), require( "./item" ), require( "./layout-mode" ), require( "./layout-modes/masonry" ), require( "./layout-modes/fit-rows" ), require( "./layout-modes/vertical" ) ) : a.Isotope = b( a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode )
  }( window, function ( a, b, c, d, e, f, g ) {
    function h( a, b ) {
      return function ( c, d ) {
        for ( var e = 0, f = a.length; f > e; e++ ) {
          var g = a[ e ],
            h = c.sortData[ g ],
            i = d.sortData[ g ];
          if ( h > i || i > h ) {
            var j = void 0 !== b[ g ] ? b[ g ] : b,
              k = j ? 1 : -1;
            return ( h > i ? 1 : -1 ) * k
          }
        }
        return 0
      }
    }
    var i = a.jQuery,
      j = String.prototype.trim ? function ( a ) {
        return a.trim()
      } : function ( a ) {
        return a.replace( /^\s+|\s+$/g, "" )
      },
      k = document.documentElement,
      l = k.textContent ? function ( a ) {
        return a.textContent
      } : function ( a ) {
        return a.innerText
      },
      m = b.create( "isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
      } );
    m.Item = f, m.LayoutMode = g, m.prototype._create = function () {
      this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call( this ), this.modes = {}, this.filteredItems = this.items, this.sortHistory = [ "original-order" ];
      for ( var a in g.modes ) this._initLayoutMode( a )
    }, m.prototype.reloadItems = function () {
      this.itemGUID = 0, b.prototype.reloadItems.call( this )
    }, m.prototype._itemize = function () {
      for ( var a = b.prototype._itemize.apply( this, arguments ), c = 0, d = a.length; d > c; c++ ) {
        var e = a[ c ];
        e.id = this.itemGUID++
      }
      return this._updateItemsSortData( a ), a
    }, m.prototype._initLayoutMode = function ( a ) {
      var b = g.modes[ a ],
        c = this.options[ a ] || {};
      this.options[ a ] = b.options ? e.extend( b.options, c ) : c, this.modes[ a ] = new b( this )
    }, m.prototype.layout = function () {
      return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
    }, m.prototype._layout = function () {
      var a = this._getIsInstant();
      this._resetLayout(), this._manageStamps(), this.layoutItems( this.filteredItems, a ), this._isLayoutInited = !0
    }, m.prototype.arrange = function ( a ) {
      function b() {
        d.reveal( c.needReveal ), d.hide( c.needHide )
      }
      this.option( a ), this._getIsInstant();
      var c = this._filter( this.items );
      this.filteredItems = c.matches;
      var d = this;
      this._bindArrangeComplete(), this._isInstant ? this._noTransition( b ) : b(), this._sort(), this._layout()
    }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function () {
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      return this._isInstant = a, a
    }, m.prototype._bindArrangeComplete = function () {
      function a() {
        b && c && d && e.dispatchEvent( "arrangeComplete", null, [ e.filteredItems ] )
      }
      var b, c, d, e = this;
      this.once( "layoutComplete", function () {
        b = !0, a()
      } ), this.once( "hideComplete", function () {
        c = !0, a()
      } ), this.once( "revealComplete", function () {
        d = !0, a()
      } )
    }, m.prototype._filter = function ( a ) {
      var b = this.options.filter;
      b = b || "*";
      for ( var c = [], d = [], e = [], f = this._getFilterTest( b ), g = 0, h = a.length; h > g; g++ ) {
        var i = a[ g ];
        if ( !i.isIgnored ) {
          var j = f( i );
          j && c.push( i ), j && i.isHidden ? d.push( i ) : j || i.isHidden || e.push( i )
        }
      }
      return {
        matches: c,
        needReveal: d,
        needHide: e
      }
    }, m.prototype._getFilterTest = function ( a ) {
      return i && this.options.isJQueryFiltering ? function ( b ) {
        return i( b.element ).is( a )
      } : "function" == typeof a ? function ( b ) {
        return a( b.element )
      } : function ( b ) {
        return d( b.element, a )
      }
    }, m.prototype.updateSortData = function ( a ) {
      var b;
      a ? ( a = e.makeArray( a ), b = this.getItems( a ) ) : b = this.items, this._getSorters(), this._updateItemsSortData( b )
    }, m.prototype._getSorters = function () {
      var a = this.options.getSortData;
      for ( var b in a ) {
        var c = a[ b ];
        this._sorters[ b ] = n( c )
      }
    }, m.prototype._updateItemsSortData = function ( a ) {
      for ( var b = a && a.length, c = 0; b && b > c; c++ ) {
        var d = a[ c ];
        d.updateSortData()
      }
    };
    var n = function () {
      function a( a ) {
        if ( "string" != typeof a ) return a;
        var c = j( a ).split( " " ),
          d = c[ 0 ],
          e = d.match( /^\[(.+)\]$/ ),
          f = e && e[ 1 ],
          g = b( f, d ),
          h = m.sortDataParsers[ c[ 1 ] ];
        return a = h ? function ( a ) {
          return a && h( g( a ) )
        } : function ( a ) {
          return a && g( a )
        }
      }

      function b( a, b ) {
        var c;
        return c = a ? function ( b ) {
          return b.getAttribute( a )
        } : function ( a ) {
          var c = a.querySelector( b );
          return c && l( c )
        }
      }
      return a
    }();
    m.sortDataParsers = {
      parseInt: function ( a ) {
        return parseInt( a, 10 )
      },
      parseFloat: function ( a ) {
        return parseFloat( a )
      }
    }, m.prototype._sort = function () {
      var a = this.options.sortBy;
      if ( a ) {
        var b = [].concat.apply( a, this.sortHistory ),
          c = h( b, this.options.sortAscending );
        this.filteredItems.sort( c ), a != this.sortHistory[ 0 ] && this.sortHistory.unshift( a )
      }
    }, m.prototype._mode = function () {
      var a = this.options.layoutMode,
        b = this.modes[ a ];
      if ( !b ) throw new Error( "No layout mode: " + a );
      return b.options = this.options[ a ], b
    }, m.prototype._resetLayout = function () {
      b.prototype._resetLayout.call( this ), this._mode()._resetLayout()
    }, m.prototype._getItemLayoutPosition = function ( a ) {
      return this._mode()._getItemLayoutPosition( a )
    }, m.prototype._manageStamp = function ( a ) {
      this._mode()._manageStamp( a )
    }, m.prototype._getContainerSize = function () {
      return this._mode()._getContainerSize()
    }, m.prototype.needsResizeLayout = function () {
      return this._mode().needsResizeLayout()
    }, m.prototype.appended = function ( a ) {
      var b = this.addItems( a );
      if ( b.length ) {
        var c = this._filterRevealAdded( b );
        this.filteredItems = this.filteredItems.concat( c )
      }
    }, m.prototype.prepended = function ( a ) {
      var b = this._itemize( a );
      if ( b.length ) {
        this._resetLayout(), this._manageStamps();
        var c = this._filterRevealAdded( b );
        this.layoutItems( this.filteredItems ), this.filteredItems = c.concat( this.filteredItems ), this.items = b.concat( this.items )
      }
    }, m.prototype._filterRevealAdded = function ( a ) {
      var b = this._filter( a );
      return this.hide( b.needHide ), this.reveal( b.matches ), this.layoutItems( b.matches, !0 ), b.matches
    }, m.prototype.insert = function ( a ) {
      var b = this.addItems( a );
      if ( b.length ) {
        var c, d, e = b.length;
        for ( c = 0; e > c; c++ ) d = b[ c ], this.element.appendChild( d.element );
        var f = this._filter( b ).matches;
        for ( c = 0; e > c; c++ ) b[ c ].isLayoutInstant = !0;
        for ( this.arrange(), c = 0; e > c; c++ ) delete b[ c ].isLayoutInstant;
        this.reveal( f )
      }
    };
    var o = m.prototype.remove;
    return m.prototype.remove = function ( a ) {
      a = e.makeArray( a );
      var b = this.getItems( a );
      o.call( this, a );
      var c = b && b.length;
      if ( c )
        for ( var d = 0; c > d; d++ ) {
          var f = b[ d ];
          e.removeFrom( this.filteredItems, f )
        }
    }, m.prototype.shuffle = function () {
      for ( var a = 0, b = this.items.length; b > a; a++ ) {
        var c = this.items[ a ];
        c.sortData.random = Math.random()
      }
      this.options.sortBy = "random", this._sort(), this._layout()
    }, m.prototype._noTransition = function ( a ) {
      var b = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var c = a.call( this );
      return this.options.transitionDuration = b, c
    }, m.prototype.getFilteredItemElements = function () {
      for ( var a = [], b = 0, c = this.filteredItems.length; c > b; b++ ) a.push( this.filteredItems[ b ].element );
      return a
    }, m
  } ), ! function ( a, b, c, d ) {
    c.swipebox = function ( e, f ) {
      var g, h, i = {
          useCSS: !0,
          useSVG: !0,
          initialIndexOnArray: 0,
          removeBarsOnMobile: !0,
          hideCloseButtonOnMobile: !1,
          hideBarsDelay: 3e3,
          videoMaxWidth: 1140,
          vimeoColor: "cccccc",
          beforeOpen: null,
          afterOpen: null,
          afterClose: null,
          nextSlide: null,
          prevSlide: null,
          loopAtEnd: !1,
          autoplayVideos: !1,
          queryStringData: {},
          toggleClassOnLoad: ""
        },
        j = this,
        k = [],
        l = e.selector,
        m = c( l ),
        n = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
        o = null !== n || b.createTouch !== d || "ontouchstart" in a || "onmsgesturechange" in a || navigator.msMaxTouchPoints,
        p = !!b.createElementNS && !!b.createElementNS( "http://www.w3.org/2000/svg", "svg" ).createSVGRect,
        q = a.innerWidth ? a.innerWidth : c( a ).width(),
        r = a.innerHeight ? a.innerHeight : c( a ).height(),
        s = 0,
        t = '<div id="swipebox-overlay">					<div id="swipebox-container">						<div id="swipebox-slider"></div>						<div id="swipebox-top-bar">							<div id="swipebox-title"></div>						</div>						<div id="swipebox-bottom-bar">							<div id="swipebox-arrows">								<a id="swipebox-prev"></a>								<a id="swipebox-next"></a>							</div>						</div>						<a id="swipebox-close"></a>					</div>			</div>';
      j.settings = {}, c.swipebox.close = function () {
        g.closeSlide()
      }, c.swipebox.extend = function () {
        return g
      }, j.init = function () {
        j.settings = c.extend( {}, i, f ), c.isArray( e ) ? ( k = e, g.target = c( a ), g.init( j.settings.initialIndexOnArray ) ) : c( b ).on( "click", l, function ( a ) {
          if ( "slide current" === a.target.parentNode.className ) return !1;
          c.isArray( e ) || ( g.destroy(), h = c( l ), g.actions() ), k = [];
          var b, d, f;
          f || ( d = "data-rel", f = c( this ).attr( d ) ), f || ( d = "rel", f = c( this ).attr( d ) ), h = f && "" !== f && "nofollow" !== f ? m.filter( "[" + d + '="' + f + '"]' ) : c( l ), h.each( function () {
            var a = null,
              b = null;
            c( this ).attr( "title" ) && ( a = c( this ).attr( "title" ) ), c( this ).attr( "href" ) && ( b = c( this ).attr( "href" ) ), k.push( {
              href: b,
              title: a
            } )
          } ), b = h.index( c( this ) ), a.preventDefault(), a.stopPropagation(), g.target = c( a.target ), g.init( b )
        } )
      }, g = {
        init: function ( a ) {
          j.settings.beforeOpen && j.settings.beforeOpen(), this.target.trigger( "swipebox-start" ), c.swipebox.isOpen = !0, this.build(), this.openSlide( a ), this.openMedia( a ), this.preloadMedia( a + 1 ), this.preloadMedia( a - 1 ), j.settings.afterOpen && j.settings.afterOpen()
        },
        build: function () {
          var a, b = this;
          c( "body" ).append( t ), p && j.settings.useSVG === !0 && ( a = c( "#swipebox-close" ).css( "background-image" ), a = a.replace( "png", "svg" ), c( "#swipebox-prev, #swipebox-next, #swipebox-close" ).css( {
            "background-image": a
          } ) ), n && j.settings.removeBarsOnMobile && c( "#swipebox-bottom-bar, #swipebox-top-bar" ).remove(), c.each( k, function () {
            c( "#swipebox-slider" ).append( '<div class="slide"></div>' )
          } ), b.setDim(), b.actions(), o && b.gesture(), b.keyboard(), b.animBars(), b.resize()
        },
        setDim: function () {
          var b, d, e = {};
          "onorientationchange" in a ? a.addEventListener( "orientationchange", function () {
            0 === a.orientation ? ( b = q, d = r ) : ( 90 === a.orientation || -90 === a.orientation ) && ( b = r, d = q )
          }, !1 ) : ( b = a.innerWidth ? a.innerWidth : c( a ).width(), d = a.innerHeight ? a.innerHeight : c( a ).height() ), e = {
            width: b,
            height: d
          }, c( "#swipebox-overlay" ).css( e )
        },
        resize: function () {
          var b = this;
          c( a ).resize( function () {
            b.setDim()
          } ).resize()
        },
        supportTransition: function () {
          var a, c = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split( " " );
          for ( a = 0; a < c.length; a++ )
            if ( b.createElement( "div" ).style[ c[ a ] ] !== d ) return c[ a ];
          return !1
        },
        doCssTrans: function () {
          return j.settings.useCSS && this.supportTransition() ? !0 : void 0
        },
        gesture: function () {
          var a, b, d, e, f, g, h = this,
            i = !1,
            j = !1,
            l = 10,
            m = 50,
            n = {},
            o = {},
            p = c( "#swipebox-top-bar, #swipebox-bottom-bar" ),
            r = c( "#swipebox-slider" );
          p.addClass( "visible-bars" ), h.setTimeout(), c( "body" ).bind( "touchstart", function ( h ) {
            return c( this ).addClass( "touching" ), a = c( "#swipebox-slider .slide" ).index( c( "#swipebox-slider .slide.current" ) ), o = h.originalEvent.targetTouches[ 0 ], n.pageX = h.originalEvent.targetTouches[ 0 ].pageX, n.pageY = h.originalEvent.targetTouches[ 0 ].pageY, c( "#swipebox-slider" ).css( {
              "-webkit-transform": "translate3d(" + s + "%, 0, 0)",
              transform: "translate3d(" + s + "%, 0, 0)"
            } ), c( ".touching" ).bind( "touchmove", function ( h ) {
              if ( h.preventDefault(), h.stopPropagation(), o = h.originalEvent.targetTouches[ 0 ], !j && ( f = d, d = o.pageY - n.pageY, Math.abs( d ) >= m || i ) ) {
                var p = .75 - Math.abs( d ) / r.height();
                r.css( {
                  top: d + "px"
                } ), r.css( {
                  opacity: p
                } ), i = !0
              }
              e = b, b = o.pageX - n.pageX, g = 100 * b / q, !j && !i && Math.abs( b ) >= l && ( c( "#swipebox-slider" ).css( {
                "-webkit-transition": "",
                transition: ""
              } ), j = !0 ), j && ( b > 0 ? 0 === a ? c( "#swipebox-overlay" ).addClass( "leftSpringTouch" ) : ( c( "#swipebox-overlay" ).removeClass( "leftSpringTouch" ).removeClass( "rightSpringTouch" ), c( "#swipebox-slider" ).css( {
                "-webkit-transform": "translate3d(" + ( s + g ) + "%, 0, 0)",
                transform: "translate3d(" + ( s + g ) + "%, 0, 0)"
              } ) ) : 0 > b && ( k.length === a + 1 ? c( "#swipebox-overlay" ).addClass( "rightSpringTouch" ) : ( c( "#swipebox-overlay" ).removeClass( "leftSpringTouch" ).removeClass( "rightSpringTouch" ), c( "#swipebox-slider" ).css( {
                "-webkit-transform": "translate3d(" + ( s + g ) + "%, 0, 0)",
                transform: "translate3d(" + ( s + g ) + "%, 0, 0)"
              } ) ) ) )
            } ), !1
          } ).bind( "touchend", function ( a ) {
            if ( a.preventDefault(), a.stopPropagation(), c( "#swipebox-slider" ).css( {
                "-webkit-transition": "-webkit-transform 0.4s ease",
                transition: "transform 0.4s ease"
              } ), d = o.pageY - n.pageY, b = o.pageX - n.pageX, g = 100 * b / q, i )
              if ( i = !1, Math.abs( d ) >= 2 * m && Math.abs( d ) > Math.abs( f ) ) {
                var k = d > 0 ? r.height() : -r.height();
                r.animate( {
                  top: k + "px",
                  opacity: 0
                }, 300, function () {
                  h.closeSlide()
                } )
              } else r.animate( {
                top: 0,
                opacity: 1
              }, 300 );
            else j ? ( j = !1, b >= l && b >= e ? h.getPrev() : -l >= b && e >= b && h.getNext() ) : p.hasClass( "visible-bars" ) ? ( h.clearTimeout(), h.hideBars() ) : ( h.showBars(), h.setTimeout() );
            c( "#swipebox-slider" ).css( {
              "-webkit-transform": "translate3d(" + s + "%, 0, 0)",
              transform: "translate3d(" + s + "%, 0, 0)"
            } ), c( "#swipebox-overlay" ).removeClass( "leftSpringTouch" ).removeClass( "rightSpringTouch" ), c( ".touching" ).off( "touchmove" ).removeClass( "touching" )
          } )
        },
        setTimeout: function () {
          if ( j.settings.hideBarsDelay > 0 ) {
            var b = this;
            b.clearTimeout(), b.timeout = a.setTimeout( function () {
              b.hideBars()
            }, j.settings.hideBarsDelay )
          }
        },
        clearTimeout: function () {
          a.clearTimeout( this.timeout ), this.timeout = null
        },
        showBars: function () {
          var a = c( "#swipebox-top-bar, #swipebox-bottom-bar" );
          this.doCssTrans() ? a.addClass( "visible-bars" ) : ( c( "#swipebox-top-bar" ).animate( {
            top: 0
          }, 500 ), c( "#swipebox-bottom-bar" ).animate( {
            bottom: 0
          }, 500 ), setTimeout( function () {
            a.addClass( "visible-bars" )
          }, 1e3 ) )
        },
        hideBars: function () {
          var a = c( "#swipebox-top-bar, #swipebox-bottom-bar" );
          this.doCssTrans() ? a.removeClass( "visible-bars" ) : ( c( "#swipebox-top-bar" ).animate( {
            top: "-50px"
          }, 500 ), c( "#swipebox-bottom-bar" ).animate( {
            bottom: "-50px"
          }, 500 ), setTimeout( function () {
            a.removeClass( "visible-bars" )
          }, 1e3 ) )
        },
        animBars: function () {
          var a = this,
            b = c( "#swipebox-top-bar, #swipebox-bottom-bar" );
          b.addClass( "visible-bars" ), a.setTimeout(), c( "#swipebox-slider" ).click( function () {
            b.hasClass( "visible-bars" ) || ( a.showBars(), a.setTimeout() )
          } ), c( "#swipebox-bottom-bar" ).hover( function () {
            a.showBars(), b.addClass( "visible-bars" ), a.clearTimeout()
          }, function () {
            j.settings.hideBarsDelay > 0 && ( b.removeClass( "visible-bars" ), a.setTimeout() )
          } )
        },
        keyboard: function () {
          var b = this;
          c( a ).bind( "keyup", function ( a ) {
            a.preventDefault(), a.stopPropagation(), 37 === a.keyCode ? b.getPrev() : 39 === a.keyCode ? b.getNext() : 27 === a.keyCode && b.closeSlide()
          } )
        },
        actions: function () {
          var a = this,
            b = "touchend click";
          k.length < 2 ? ( c( "#swipebox-bottom-bar" ).hide(), d === k[ 1 ] && c( "#swipebox-top-bar" ).hide() ) : ( c( "#swipebox-prev" ).bind( b, function ( b ) {
            b.preventDefault(), b.stopPropagation(), a.getPrev(), a.setTimeout()
          } ), c( "#swipebox-next" ).bind( b, function ( b ) {
            b.preventDefault(), b.stopPropagation(), a.getNext(), a.setTimeout()
          } ) ), c( "#swipebox-close" ).bind( b, function () {
            a.closeSlide()
          } )
        },
        setSlide: function ( a, b ) {
          b = b || !1;
          var d = c( "#swipebox-slider" );
          s = 100 * -a, this.doCssTrans() ? d.css( {
            "-webkit-transform": "translate3d(" + 100 * -a + "%, 0, 0)",
            transform: "translate3d(" + 100 * -a + "%, 0, 0)"
          } ) : d.animate( {
            left: 100 * -a + "%"
          } ), c( "#swipebox-slider .slide" ).removeClass( "current" ), c( "#swipebox-slider .slide" ).eq( a ).addClass( "current" ), this.setTitle( a ), b && d.fadeIn(), c( "#swipebox-prev, #swipebox-next" ).removeClass( "disabled" ), 0 === a ? c( "#swipebox-prev" ).addClass( "disabled" ) : a === k.length - 1 && j.settings.loopAtEnd !== !0 && c( "#swipebox-next" ).addClass( "disabled" )
        },
        openSlide: function ( b ) {
          c( "html" ).addClass( "swipebox-html" ), o ? ( c( "html" ).addClass( "swipebox-touch" ), j.settings.hideCloseButtonOnMobile && c( "html" ).addClass( "swipebox-no-close-button" ) ) : c( "html" ).addClass( "swipebox-no-touch" ), c( a ).trigger( "resize" ), this.setSlide( b, !0 )
        },
        preloadMedia: function ( a ) {
          var b = this,
            c = null;
          k[ a ] !== d && ( c = k[ a ].href ), b.isVideo( c ) ? b.openMedia( a ) : setTimeout( function () {
            b.openMedia( a )
          }, 1e3 )
        },
        openMedia: function ( a ) {
          var b, e, f = this;
          return k[ a ] !== d && ( b = k[ a ].href ), 0 > a || a >= k.length ? !1 : ( e = c( "#swipebox-slider .slide" ).eq( a ), void( f.isVideo( b ) ? e.html( f.getVideo( b ) ) : ( e.addClass( "slide-loading" ), f.loadMedia( b, function () {
            e.removeClass( "slide-loading" ), e.html( this )
          } ) ) ) )
        },
        setTitle: function ( a ) {
          var b = null;
          c( "#swipebox-title" ).empty(), k[ a ] !== d && ( b = k[ a ].title ), b ? ( c( "#swipebox-top-bar" ).show(), c( "#swipebox-title" ).append( b ) ) : c( "#swipebox-top-bar" ).hide()
        },
        isVideo: function ( a ) {
          if ( a ) {
            if ( a.match( /(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/ ) || a.match( /vimeo\.com\/([0-9]*)/ ) || a.match( /youtu\.be\/([a-zA-Z0-9\-_]+)/ ) ) return !0;
            if ( a.toLowerCase().indexOf( "swipeboxvideo=1" ) >= 0 ) return !0
          }
        },
        parseUri: function ( a, d ) {
          var e = b.createElement( "a" ),
            f = {};
          return e.href = decodeURIComponent( a ), e.search && ( f = JSON.parse( '{"' + e.search.toLowerCase().replace( "?", "" ).replace( /&/g, '","' ).replace( /=/g, '":"' ) + '"}' ) ), c.isPlainObject( d ) && ( f = c.extend( f, d, j.settings.queryStringData ) ), c.map( f, function ( a, b ) {
            return a && a > "" ? encodeURIComponent( b ) + "=" + encodeURIComponent( a ) : void 0
          } ).join( "&" )
        },
        getVideo: function ( a ) {
          var b = "",
            c = a.match( /((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/ ),
            d = a.match( /(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/ ),
            e = a.match( /(?:www\.)?vimeo\.com\/([0-9]*)/ ),
            f = "";
          return c || d ? ( d && ( c = d ), f = g.parseUri( a, {
            autoplay: j.settings.autoplayVideos ? "1" : "0",
            v: ""
          } ), b = '<iframe width="560" height="315" src="//' + c[ 1 ] + "/embed/" + c[ 2 ] + "?" + f + '" frameborder="0" allowfullscreen></iframe>' ) : e ? ( f = g.parseUri( a, {
            autoplay: j.settings.autoplayVideos ? "1" : "0",
            byline: "0",
            portrait: "0",
            color: j.settings.vimeoColor
          } ), b = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + e[ 1 ] + "?" + f + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>' ) : b = '<iframe width="560" height="315" src="' + a + '" frameborder="0" allowfullscreen></iframe>', '<div class="swipebox-video-container" style="max-width:' + j.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + b + "</div></div>"
        },
        loadMedia: function ( a, b ) {
          if ( 0 === a.trim().indexOf( "#" ) ) b.call( c( "<div>", {
            "class": "swipebox-inline-container"
          } ).append( c( a ).clone().toggleClass( j.settings.toggleClassOnLoad ) ) );
          else if ( !this.isVideo( a ) ) {
            var d = c( "<img>" ).on( "load", function () {
              b.call( d )
            } );
            d.attr( "src", a )
          }
        },
        getNext: function () {
          var a, b = this,
            d = c( "#swipebox-slider .slide" ).index( c( "#swipebox-slider .slide.current" ) );
          d + 1 < k.length ? ( a = c( "#swipebox-slider .slide" ).eq( d ).contents().find( "iframe" ).attr( "src" ), c( "#swipebox-slider .slide" ).eq( d ).contents().find( "iframe" ).attr( "src", a ), d++, b.setSlide( d ), b.preloadMedia( d + 1 ), j.settings.nextSlide && j.settings.nextSlide() ) : j.settings.loopAtEnd === !0 ? ( a = c( "#swipebox-slider .slide" ).eq( d ).contents().find( "iframe" ).attr( "src" ), c( "#swipebox-slider .slide" ).eq( d ).contents().find( "iframe" ).attr( "src", a ), d = 0, b.preloadMedia( d ), b.setSlide( d ), b.preloadMedia( d + 1 ), j.settings.nextSlide && j.settings.nextSlide() ) : ( c( "#swipebox-overlay" ).addClass( "rightSpring" ), setTimeout( function () {
            c( "#swipebox-overlay" ).removeClass( "rightSpring" )
          }, 500 ) )
        },
        getPrev: function () {
          var a, b = c( "#swipebox-slider .slide" ).index( c( "#swipebox-slider .slide.current" ) );
          b > 0 ? ( a = c( "#swipebox-slider .slide" ).eq( b ).contents().find( "iframe" ).attr( "src" ), c( "#swipebox-slider .slide" ).eq( b ).contents().find( "iframe" ).attr( "src", a ), b--, this.setSlide( b ), this.preloadMedia( b - 1 ), j.settings.prevSlide && j.settings.prevSlide() ) : ( c( "#swipebox-overlay" ).addClass( "leftSpring" ), setTimeout( function () {
            c( "#swipebox-overlay" ).removeClass( "leftSpring" )
          }, 500 ) )
        },
        nextSlide: function () {},
        prevSlide: function () {},
        closeSlide: function () {
          c( "html" ).removeClass( "swipebox-html" ), c( "html" ).removeClass( "swipebox-touch" ), c( a ).trigger( "resize" ), this.destroy()
        },
        destroy: function () {
          c( a ).unbind( "keyup" ), c( "body" ).unbind( "touchstart" ), c( "body" ).unbind( "touchmove" ), c( "body" ).unbind( "touchend" ), c( "#swipebox-slider" ).unbind(), c( "#swipebox-overlay" ).remove(), c.isArray( e ) || e.removeData( "_swipebox" ), this.target && this.target.trigger( "swipebox-destroy" ), c.swipebox.isOpen = !1, j.settings.afterClose && j.settings.afterClose()
        }
      }, j.init()
    }, c.fn.swipebox = function ( a ) {
      if ( !c.data( this, "_swipebox" ) ) {
        var b = new c.swipebox( this, a );
        this.data( "_swipebox", b )
      }
      return this.data( "_swipebox" )
    }
  }( window, document, jQuery ),
  function ( a ) {
    function b( a ) {
      var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      a = a.replace( b, function ( a, b, c, d ) {
        return b + b + c + c + d + d
      } );
      var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( a );
      return c ? {
        r: parseInt( c[ 1 ], 16 ),
        g: parseInt( c[ 2 ], 16 ),
        b: parseInt( c[ 3 ], 16 )
      } : null
    }

    function c() {
      var a = document.createElement( "canvas" );
      return !( !a.getContext || !a.getContext( "2d" ) )
    }

    function d() {
      return Math.floor( 65536 * ( 1 + Math.random() ) ).toString( 16 ).substring( 1 )
    }

    function e() {
      return d() + d() + "-" + d() + "-" + d() + "-" + d() + "-" + d() + d() + d()
    }

    function f( a ) {
      var b = a.match( /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/ );
      if ( null !== b && b.length > 0 ) {
        var c = a.split( " " ),
          d = c[ 0 ].split( "-" ),
          e = c[ 1 ].split( ":" );
        return new Date( d[ 0 ], d[ 1 ] - 1, d[ 2 ], e[ 0 ], e[ 1 ], e[ 2 ] )
      }
      var f = Date.parse( a );
      return isNaN( f ) ? ( f = Date.parse( a.replace( /-/g, "/" ).replace( "T", " " ) ), isNaN( f ) ? new Date : f ) : f
    }

    function g( a, b, c, d, e ) {
      for ( var f = {}, g = {}, h = {}, i = {}, j = {}, k = {}, l = null, m = 0; m < d.length; m++ ) {
        var n, p = d[ m ];
        n = null === l ? c / o[ p ] : o[ l ] / o[ p ];
        var q = a / o[ p ],
          r = b / o[ p ];
        e && ( q = q > 0 ? Math.floor( q ) : Math.ceil( q ), r = r > 0 ? Math.floor( r ) : Math.ceil( r ) ), "Days" !== p && ( q %= n, r %= n ), f[ p ] = q, h[ p ] = Math.abs( q ), g[ p ] = r, k[ p ] = Math.abs( r ), i[ p ] = Math.abs( q ) / n, j[ p ] = Math.abs( r ) / n, l = p
      }
      return {
        raw_time: f,
        raw_old_time: g,
        time: h,
        old_time: k,
        pct: i,
        old_pct: j
      }
    }

    function h() {
      "undefined" != typeof j.TC_Instance_List ? p = j.TC_Instance_List : j.TC_Instance_List = p, i( j )
    }

    function i( a ) {
      for ( var b = [ "webkit", "moz" ], c = 0; c < b.length && !a.requestAnimationFrame; ++c ) a.requestAnimationFrame = a[ b[ c ] + "RequestAnimationFrame" ], a.cancelAnimationFrame = a[ b[ c ] + "CancelAnimationFrame" ];
      a.requestAnimationFrame && a.cancelAnimationFrame || ( a.requestAnimationFrame = function ( b, c, d ) {
        "undefined" == typeof d && ( d = {
          data: {
            last_frame: 0
          }
        } );
        var e = ( new Date ).getTime(),
          f = Math.max( 0, 16 - ( e - d.data.last_frame ) ),
          g = a.setTimeout( function () {
            b( e + f )
          }, f );
        return d.data.last_frame = e + f, g
      }, a.cancelAnimationFrame = function ( a ) {
        clearTimeout( a )
      } )
    }
    var j = window;
    Object.keys || ( Object.keys = function () {
      "use strict";
      var a = Object.prototype.hasOwnProperty,
        b = !{
          toString: null
        }.propertyIsEnumerable( "toString" ),
        c = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ],
        d = c.length;
      return function ( e ) {
        if ( "object" != typeof e && ( "function" != typeof e || null === e ) ) throw new TypeError( "Object.keys called on non-object" );
        var f, g, h = [];
        for ( f in e ) a.call( e, f ) && h.push( f );
        if ( b )
          for ( g = 0; d > g; g++ ) a.call( e, c[ g ] ) && h.push( c[ g ] );
        return h
      }
    }() );
    var k = !1,
      l = 200,
      m = ( "#debug" === location.hash, [ "Days", "Hours", "Minutes", "Seconds" ] ),
      n = {
        Seconds: "Minutes",
        Minutes: "Hours",
        Hours: "Days",
        Days: "Years"
      },
      o = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
        Months: 2678400,
        Years: 31536e3
      };
    Array.prototype.indexOf || ( Array.prototype.indexOf = function ( a ) {
      var b = this.length >>> 0,
        c = Number( arguments[ 1 ] ) || 0;
      for ( c = 0 > c ? Math.ceil( c ) : Math.floor( c ), 0 > c && ( c += b ); b > c; c++ )
        if ( c in this && this[ c ] === a ) return c;
      return -1
    } );
    var p = {},
      q = function ( a, b ) {
        this.element = a, this.container, this.listeners = null, this.data = {
          paused: !1,
          last_frame: 0,
          animation_frame: null,
          interval_fallback: null,
          timer: !1,
          total_duration: null,
          prev_time: null,
          drawn_units: [],
          text_elements: {
            Days: null,
            Hours: null,
            Minutes: null,
            Seconds: null
          },
          attributes: {
            canvas: null,
            context: null,
            item_size: null,
            line_width: null,
            radius: null,
            outer_radius: null
          },
          state: {
            fading: {
              Days: !1,
              Hours: !1,
              Minutes: !1,
              Seconds: !1
            }
          }
        }, this.config = null, this.setOptions( b ), this.initialize()
      };
    q.prototype.clearListeners = function () {
      this.listeners = {
        all: [],
        visible: []
      }
    }, q.prototype.addTime = function ( a ) {
      if ( this.data.attributes.ref_date instanceof Date ) {
        var b = this.data.attributes.ref_date;
        b.setSeconds( b.getSeconds() + a )
      } else isNaN( this.data.attributes.ref_date ) || ( this.data.attributes.ref_date += 1e3 * a )
    }, q.prototype.initialize = function ( b ) {
      this.data.drawn_units = [];
      for ( var d = 0; d < Object.keys( this.config.time ).length; d++ ) {
        var e = Object.keys( this.config.time )[ d ];
        this.config.time[ e ].show && this.data.drawn_units.push( e )
      }
      a( this.element ).children( "div.time_circles" ).remove(), "undefined" == typeof b && ( b = !0 ), ( b || null === this.listeners ) && this.clearListeners(), this.container = a( "<div>" ), this.container.addClass( "time_circles" ), this.container.appendTo( this.element );
      var f = this.element.offsetHeight,
        g = this.element.offsetWidth;
      0 === f && ( f = a( this.element ).height() ), 0 === g && ( g = a( this.element ).width() ), 0 === f && g > 0 ? f = g / this.data.drawn_units.length : 0 === g && f > 0 && ( g = f * this.data.drawn_units.length );
      var h = document.createElement( "canvas" );
      h.width = g, h.height = f, this.data.attributes.canvas = a( h ), this.data.attributes.canvas.appendTo( this.container );
      var i = c();
      i || "undefined" == typeof G_vmlCanvasManager || ( G_vmlCanvasManager.initElement( h ), k = !0, i = !0 ), i && ( this.data.attributes.context = h.getContext( "2d" ) ), this.data.attributes.item_size = Math.min( g / this.data.drawn_units.length, f ), this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width, this.data.attributes.radius = ( .8 * this.data.attributes.item_size - this.data.attributes.line_width ) / 2, this.data.attributes.outer_radius = this.data.attributes.radius + .5 * Math.max( this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width );
      var d = 0;
      for ( var l in this.data.text_elements )
        if ( this.config.time[ l ].show ) {
          var m = a( "<div>" );
          m.addClass( "textDiv_" + l ), m.css( "top", Math.round( .35 * this.data.attributes.item_size ) ), m.css( "left", Math.round( d++ * this.data.attributes.item_size ) ), m.css( "width", this.data.attributes.item_size ), m.appendTo( this.container );
          var n = a( "<h4>" );
          n.text( this.config.time[ l ].text ), n.css( "font-size", Math.round( this.config.text_size * this.data.attributes.item_size ) ), n.css( "line-height", Math.round( this.config.text_size * this.data.attributes.item_size ) + "px" ), n.appendTo( m );
          var o = a( "<span>" );
          o.css( "font-size", Math.round( 3 * this.config.text_size * this.data.attributes.item_size ) ), o.css( "line-height", Math.round( this.config.text_size * this.data.attributes.item_size ) + "px" ), o.appendTo( m ), this.data.text_elements[ l ] = o
        } this.start(), this.config.start || ( this.data.paused = !0 );
      var p = this;
      this.data.interval_fallback = j.setInterval( function () {
        p.update.call( p, !0 )
      }, 100 )
    }, q.prototype.update = function ( a ) {
      if ( "undefined" == typeof a ) a = !1;
      else if ( a && this.data.paused ) return;
      k && this.data.attributes.context.clearRect( 0, 0, this.data.attributes.canvas[ 0 ].width, this.data.attributes.canvas[ 0 ].hright );
      var b, c, d = this.data.prev_time,
        e = new Date;
      if ( this.data.prev_time = e, null === d && ( d = e ), !this.config.count_past_zero && e > this.data.attributes.ref_date ) {
        for ( var f = 0; f < this.data.drawn_units.length; f++ ) {
          var h = this.data.drawn_units[ f ];
          this.data.text_elements[ h ].text( "0" );
          var i = f * this.data.attributes.item_size + this.data.attributes.item_size / 2,
            n = this.data.attributes.item_size / 2,
            p = this.config.time[ h ].color;
          this.drawArc( i, n, p, 0 )
        }
        return void this.stop()
      }
      b = ( this.data.attributes.ref_date - e ) / 1e3, c = ( this.data.attributes.ref_date - d ) / 1e3;
      var q = "smooth" !== this.config.animation,
        r = g( b, c, this.data.total_duration, this.data.drawn_units, q ),
        s = g( b, c, o.Years, m, q ),
        f = 0,
        t = 0,
        u = null,
        v = this.data.drawn_units.slice();
      for ( var f in m ) {
        var h = m[ f ];
        if ( Math.floor( s.raw_time[ h ] ) !== Math.floor( s.raw_old_time[ h ] ) && this.notifyListeners( h, Math.floor( s.time[ h ] ), Math.floor( b ), "all" ), !( v.indexOf( h ) < 0 ) ) {
          if ( Math.floor( r.raw_time[ h ] ) !== Math.floor( r.raw_old_time[ h ] ) && this.notifyListeners( h, Math.floor( r.time[ h ] ), Math.floor( b ), "visible" ), !a ) {
            this.data.text_elements[ h ].text( Math.floor( Math.abs( r.time[ h ] ) ) );
            var i = t * this.data.attributes.item_size + this.data.attributes.item_size / 2,
              n = this.data.attributes.item_size / 2,
              p = this.config.time[ h ].color;
            "smooth" === this.config.animation ? ( null === u || k || ( Math.floor( r.time[ u ] ) > Math.floor( r.old_time[ u ] ) ? ( this.radialFade( i, n, p, 1, h ), this.data.state.fading[ h ] = !0 ) : Math.floor( r.time[ u ] ) < Math.floor( r.old_time[ u ] ) && ( this.radialFade( i, n, p, 0, h ), this.data.state.fading[ h ] = !0 ) ), this.data.state.fading[ h ] || this.drawArc( i, n, p, r.pct[ h ] ) ) : this.animateArc( i, n, p, r.pct[ h ], r.old_pct[ h ], ( new Date ).getTime() + l )
          }
          u = h, t++
        }
      }
      if ( !this.data.paused && !a ) {
        var w = this,
          x = function () {
            w.update.call( w )
          };
        if ( "smooth" === this.config.animation ) this.data.animation_frame = j.requestAnimationFrame( x, w.element, w );
        else {
          var y = b % 1 * 1e3;
          0 > y && ( y = 1e3 + y ), y += 50, w.data.animation_frame = j.setTimeout( function () {
            w.data.animation_frame = j.requestAnimationFrame( x, w.element, w )
          }, y )
        }
      }
    }, q.prototype.animateArc = function ( a, b, c, d, e, f ) {
      if ( null !== this.data.attributes.context ) {
        var g = e - d;
        if ( Math.abs( g ) > .5 ) 0 === d ? this.radialFade( a, b, c, 1 ) : this.radialFade( a, b, c, 0 );
        else {
          var h = ( l - ( f - ( new Date ).getTime() ) ) / l;
          h > 1 && ( h = 1 );
          var i = e * ( 1 - h ) + d * h;
          if ( this.drawArc( a, b, c, i ), h >= 1 ) return;
          var k = this;
          j.requestAnimationFrame( function () {
            k.animateArc( a, b, c, d, e, f )
          }, this.element )
        }
      }
    }, q.prototype.drawArc = function ( a, b, c, d ) {
      if ( null !== this.data.attributes.context ) {
        var e = Math.max( this.data.attributes.outer_radius, this.data.attributes.item_size / 2 );
        k || this.data.attributes.context.clearRect( a - e, b - e, 2 * e, 2 * e ), this.config.use_background && ( this.data.attributes.context.beginPath(), this.data.attributes.context.arc( a, b, this.data.attributes.radius, 0, 2 * Math.PI, !1 ), this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width, this.data.attributes.context.strokeStyle = this.config.circle_bg_color, this.data.attributes.context.stroke() );
        var f, g, h, i = -.5 * Math.PI,
          j = 2 * Math.PI;
        f = i + this.config.start_angle / 360 * j;
        var l = 2 * d * Math.PI;
        "Both" === this.config.direction ? ( h = !1, f -= l / 2, g = f + l ) : "Clockwise" === this.config.direction ? ( h = !1, g = f + l ) : ( h = !0, g = f - l ), this.data.attributes.context.beginPath(), this.data.attributes.context.arc( a, b, this.data.attributes.radius, f, g, h ), this.data.attributes.context.lineWidth = this.data.attributes.line_width, this.data.attributes.context.strokeStyle = c, this.data.attributes.context.stroke()
      }
    }, q.prototype.radialFade = function ( a, c, d, e, f ) {
      var g, h = b( d ),
        i = this,
        k = .2 * ( 1 === e ? -1 : 1 );
      for ( g = 0; 1 >= e && e >= 0; g++ ) ! function () {
        var b = 50 * g,
          d = "rgba(" + h.r + ", " + h.g + ", " + h.b + ", " + Math.round( 10 * e ) / 10 + ")";
        j.setTimeout( function () {
          i.drawArc( a, c, d, 1 )
        }, b )
      }(), e += k;
      void 0 !== typeof f && j.setTimeout( function () {
        i.data.state.fading[ f ] = !1
      }, 50 * g )
    }, q.prototype.timeLeft = function () {
      if ( this.data.paused && "number" == typeof this.data.timer ) return this.data.timer;
      var a = new Date;
      return ( this.data.attributes.ref_date - a ) / 1e3
    }, q.prototype.start = function () {
      j.cancelAnimationFrame( this.data.animation_frame ), j.clearTimeout( this.data.animation_frame );
      var b = a( this.element ).data( "date" );
      if ( "undefined" == typeof b && ( b = a( this.element ).attr( "data-date" ) ), "string" == typeof b ) this.data.attributes.ref_date = f( b );
      else if ( "number" == typeof this.data.timer ) this.data.paused && ( this.data.attributes.ref_date = ( new Date ).getTime() + 1e3 * this.data.timer );
      else {
        var c = a( this.element ).data( "timer" );
        "undefined" == typeof c && ( c = a( this.element ).attr( "data-timer" ) ), "string" == typeof c && ( c = parseFloat( c ) ), "number" == typeof c ? ( this.data.timer = c, this.data.attributes.ref_date = ( new Date ).getTime() + 1e3 * c ) : this.data.attributes.ref_date = this.config.ref_date
      }
      this.data.paused = !1, this.update.call( this )
    }, q.prototype.restart = function () {
      this.data.timer = !1, this.start()
    }, q.prototype.stop = function () {
      "number" == typeof this.data.timer && ( this.data.timer = this.timeLeft( this ) ), this.data.paused = !0, j.cancelAnimationFrame( this.data.animation_frame )
    }, q.prototype.destroy = function () {
      this.clearListeners(), this.stop(), j.clearInterval( this.data.interval_fallback ), this.data.interval_fallback = null, this.container.remove(), a( this.element ).removeAttr( "data-tc-id" ), a( this.element ).removeData( "tc-id" )
    }, q.prototype.setOptions = function ( b ) {
      if ( null === this.config && ( this.default_options.ref_date = new Date, this.config = a.extend( !0, {}, this.default_options ) ), a.extend( !0, this.config, b ), j = this.config.use_top_frame ? window.top : window, h(), this.data.total_duration = this.config.total_duration, "string" == typeof this.data.total_duration )
        if ( "undefined" != typeof o[ this.data.total_duration ] ) this.data.total_duration = o[ this.data.total_duration ];
        else if ( "Auto" === this.data.total_duration )
        for ( var c = 0; c < Object.keys( this.config.time ).length; c++ ) {
          var d = Object.keys( this.config.time )[ c ];
          if ( this.config.time[ d ].show ) {
            this.data.total_duration = o[ n[ d ] ];
            break
          }
        } else this.data.total_duration = o.Years, console.error( "Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto" )
    }, q.prototype.addListener = function ( a, b, c ) {
      "function" == typeof a && ( "undefined" == typeof c && ( c = "visible" ), this.listeners[ c ].push( {
        func: a,
        scope: b
      } ) )
    }, q.prototype.notifyListeners = function ( a, b, c, d ) {
      for ( var e = 0; e < this.listeners[ d ].length; e++ ) {
        var f = this.listeners[ d ][ e ];
        f.func.apply( f.scope, [ a, b, c ] )
      }
    }, q.prototype.default_options = {
      ref_date: new Date,
      start: !0,
      animation: "smooth",
      count_past_zero: !0,
      circle_bg_color: "#60686F",
      use_background: !0,
      fg_width: .1,
      bg_width: 1.2,
      text_size: .07,
      total_duration: "Auto",
      direction: "Clockwise",
      use_top_frame: !1,
      start_angle: 0,
      time: {
        Days: {
          show: !0,
          text: "Days",
          color: "#FC6"
        },
        Hours: {
          show: !0,
          text: "Hours",
          color: "#9CF"
        },
        Minutes: {
          show: !0,
          text: "Minutes",
          color: "#BFB"
        },
        Seconds: {
          show: !0,
          text: "Seconds",
          color: "#F99"
        }
      }
    };
    var r = function ( a, b ) {
      this.elements = a, this.options = b, this.foreach()
    };
    r.prototype.getInstance = function ( b ) {
      var c, d = a( b ).data( "tc-id" );
      if ( "undefined" == typeof d && ( d = e(), a( b ).attr( "data-tc-id", d ) ), "undefined" == typeof p[ d ] ) {
        var f = this.options,
          g = a( b ).data( "options" );
        "string" == typeof g && ( g = JSON.parse( g ) ), "object" == typeof g && ( f = a.extend( !0, {}, this.options, g ) ), c = new q( b, f ), p[ d ] = c
      } else c = p[ d ], "undefined" != typeof this.options && c.setOptions( this.options );
      return c
    }, r.prototype.addTime = function ( a ) {
      this.foreach( function ( b ) {
        b.addTime( a )
      } )
    }, r.prototype.foreach = function ( a ) {
      var b = this;
      return this.elements.each( function () {
        var c = b.getInstance( this );
        "function" == typeof a && a( c )
      } ), this
    }, r.prototype.start = function () {
      return this.foreach( function ( a ) {
        a.start()
      } ), this
    }, r.prototype.stop = function () {
      return this.foreach( function ( a ) {
        a.stop()
      } ), this
    }, r.prototype.restart = function () {
      return this.foreach( function ( a ) {
        a.restart()
      } ), this
    }, r.prototype.rebuild = function () {
      return this.foreach( function ( a ) {
        a.initialize( !1 )
      } ), this
    }, r.prototype.getTime = function () {
      return this.getInstance( this.elements[ 0 ] ).timeLeft()
    }, r.prototype.addListener = function ( a, b ) {
      "undefined" == typeof b && ( b = "visible" );
      var c = this;
      return this.foreach( function ( d ) {
        d.addListener( a, c.elements, b )
      } ), this
    }, r.prototype.destroy = function () {
      return this.foreach( function ( a ) {
        a.destroy()
      } ), this
    }, r.prototype.end = function () {
      return this.elements
    }, a.fn.TimeCircles = function ( a ) {
      return new r( this, a )
    }
  }( jQuery ),
  function ( a ) {
    a.fn.visible = function ( b, c ) {
      var d = a( this ).eq( 0 ),
        e = d.get( 0 ),
        f = a( window ),
        g = f.scrollTop();
      f = g + f.height();
      var h = d.offset().top,
        i = h + d.height();
      return d = b === !0 ? i : h, h = b === !0 ? h : i, !!( c === !0 ? e.offsetWidth * e.offsetHeight : !0 ) && f >= h && d >= g
    }
  }( jQuery ), jQuery( window ).load( function () {
    setTimeout( function () {
      jQuery( "html,body" ).animate( {
        scrollTop: jQuery( window ).scrollTop() + 1
      }, 5, function () {
        jQuery( "html,body" ).animate( {
          scrollTop: jQuery( window ).scrollTop() - 1
        }, 5 )
      } )
    }, 2e3 )
  } ),
  function ( a ) {
    a.fn.extend( {
      parallax: function ( a ) {
        return this.each( function () {
          var a = jQuery( this );
          setTimeout( function () {
            var b = new Image;
            b.onload = function () {
              imgH = this.height, imgW = this.width, a.data( "imagewidth", imgW ), a.data( "imageheight", imgH )
            }, b.src = a.data( "parallax-image" )
          }, 500 ), jQuery( window ).width() > 1024 ? ( a.css( {
            background: "url(" + a.data( "parallax-image" ) + ") center center",
            "background-attachment": "fixed"
          } ), setTimeout( function () {
            moveParallax( a )
          }, 500 ), jQuery( window ).scroll( function () {
            moveParallax( a )
          } ) ) : a.css( {
            background: "url(" + a.data( "parallax-image" ) + ") center center",
            "background-attachment": "inherit",
            "background-size": "cover"
          } )
        } )
      }
    } )
  }( jQuery ), eval( function ( a, b, c, d, e, f ) {
    if ( e = function ( a ) {
        return ( b > a ? "" : e( parseInt( a / b ) ) ) + ( ( a %= b ) > 35 ? String.fromCharCode( a + 29 ) : a.toString( 36 ) )
      }, !"".replace( /^/, String ) ) {
      for ( ; c--; ) f[ e( c ) ] = d[ c ] || e( c );
      d = [ function ( a ) {
        return f[ a ]
      } ], e = function () {
        return "\\w+"
      }, c = 1
    }
    for ( ; c--; ) d[ c ] && ( a = a.replace( new RegExp( "\\b" + e( c ) + "\\b", "g" ), d[ c ] ) );
    return a
  }( '7(A 3c.3q!=="9"){3c.3q=9(e){9 t(){}t.5S=e;p 5R t}}(9(e,t,n){h r={1N:9(t,n){h r=c;r.$k=e(n);r.6=e.4M({},e.37.2B.6,r.$k.v(),t);r.2A=t;r.4L()},4L:9(){9 r(e){h n,r="";7(A t.6.33==="9"){t.6.33.R(c,[e])}l{1A(n 38 e.d){7(e.d.5M(n)){r+=e.d[n].1K}}t.$k.2y(r)}t.3t()}h t=c,n;7(A t.6.2H==="9"){t.6.2H.R(c,[t.$k])}7(A t.6.2O==="2Y"){n=t.6.2O;e.5K(n,r)}l{t.3t()}},3t:9(){h e=c;e.$k.v("d-4I",e.$k.2x("2w")).v("d-4F",e.$k.2x("H"));e.$k.z({2u:0});e.2t=e.6.q;e.4E();e.5v=0;e.1X=14;e.23()},23:9(){h e=c;7(e.$k.25().N===0){p b}e.1M();e.4C();e.$S=e.$k.25();e.E=e.$S.N;e.4B();e.$G=e.$k.17(".d-1K");e.$K=e.$k.17(".d-1p");e.3u="U";e.13=0;e.26=[0];e.m=0;e.4A();e.4z()},4z:9(){h e=c;e.2V();e.2W();e.4t();e.30();e.4r();e.4q();e.2p();e.4o();7(e.6.2o!==b){e.4n(e.6.2o)}7(e.6.O===j){e.6.O=4Q}e.19();e.$k.17(".d-1p").z("4i","4h");7(!e.$k.2m(":3n")){e.3o()}l{e.$k.z("2u",1)}e.5O=b;e.2l();7(A e.6.3s==="9"){e.6.3s.R(c,[e.$k])}},2l:9(){h e=c;7(e.6.1Z===j){e.1Z()}7(e.6.1B===j){e.1B()}e.4g();7(A e.6.3w==="9"){e.6.3w.R(c,[e.$k])}},3x:9(){h e=c;7(A e.6.3B==="9"){e.6.3B.R(c,[e.$k])}e.3o();e.2V();e.2W();e.4f();e.30();e.2l();7(A e.6.3D==="9"){e.6.3D.R(c,[e.$k])}},3F:9(){h e=c;t.1c(9(){e.3x()},0)},3o:9(){h e=c;7(e.$k.2m(":3n")===b){e.$k.z({2u:0});t.18(e.1C);t.18(e.1X)}l{p b}e.1X=t.4d(9(){7(e.$k.2m(":3n")){e.3F();e.$k.4b({2u:1},2M);t.18(e.1X)}},5x)},4B:9(){h e=c;e.$S.5n(\'<L H="d-1p">\').4a(\'<L H="d-1K"></L>\');e.$k.17(".d-1p").4a(\'<L H="d-1p-49">\');e.1H=e.$k.17(".d-1p-49");e.$k.z("4i","4h")},1M:9(){h e=c,t=e.$k.1I(e.6.1M),n=e.$k.1I(e.6.2i);7(!t){e.$k.I(e.6.1M)}7(!n){e.$k.I(e.6.2i)}},2V:9(){h t=c,n,r;7(t.6.2Z===b){p b}7(t.6.48===j){t.6.q=t.2t=1;t.6.1h=b;t.6.1s=b;t.6.1O=b;t.6.22=b;t.6.1Q=b;t.6.1R=b;p b}n=e(t.6.47).1f();7(n>(t.6.1s[0]||t.2t)){t.6.q=t.2t}7(t.6.1h!==b){t.6.1h.5g(9(e,t){p e[0]-t[0]});1A(r=0;r<t.6.1h.N;r+=1){7(t.6.1h[r][0]<=n){t.6.q=t.6.1h[r][1]}}}l{7(n<=t.6.1s[0]&&t.6.1s!==b){t.6.q=t.6.1s[1]}7(n<=t.6.1O[0]&&t.6.1O!==b){t.6.q=t.6.1O[1]}7(n<=t.6.22[0]&&t.6.22!==b){t.6.q=t.6.22[1]}7(n<=t.6.1Q[0]&&t.6.1Q!==b){t.6.q=t.6.1Q[1]}7(n<=t.6.1R[0]&&t.6.1R!==b){t.6.q=t.6.1R[1]}}7(t.6.q>t.E&&t.6.46===j){t.6.q=t.E}},4r:9(){h n=c,r,i;7(n.6.2Z!==j){p b}i=e(t).1f();n.3d=9(){7(e(t).1f()!==i){7(n.6.O!==b){t.18(n.1C)}t.5d(r);r=t.1c(9(){i=e(t).1f();n.3x()},n.6.45)}};e(t).44(n.3d)},4f:9(){h e=c;e.2g(e.m);7(e.6.O!==b){e.3j()}},43:9(){h t=c,n=0,r=t.E-t.6.q;t.$G.2f(9(i){h s=e(c);s.z({1f:t.M}).v("d-1K",3p(i));7(i%t.6.q===0||i===r){7(!(i>r)){n+=1}}s.v("d-24",n)})},42:9(){h e=c,t=e.$G.N*e.M;e.$K.z({1f:t*2,T:0});e.43()},2W:9(){h e=c;e.40();e.42();e.3Z();e.3v()},40:9(){h e=c;e.M=1F.4O(e.$k.1f()/e.6.q)},3v:9(){h e=c,t=(e.E*e.M-e.6.q*e.M)*-1;7(e.6.q>e.E){e.D=0;t=0;e.3z=0}l{e.D=e.E-e.6.q;e.3z=t}p t},3Y:9(){p 0},3Z:9(){h t=c,n=0,r=0,i,s,o;t.J=[0];t.3E=[];1A(i=0;i<t.E;i+=1){r+=t.M;t.J.2D(-r);7(t.6.12===j){s=e(t.$G[i]);o=s.v("d-24");7(o!==n){t.3E[n]=t.J[i];n=o}}}},4t:9(){h t=c;7(t.6.2a===j||t.6.1v===j){t.B=e(\'<L H="d-5A"/>\').5m("5l",!t.F.15).5c(t.$k)}7(t.6.1v===j){t.3T()}7(t.6.2a===j){t.3S()}},3S:9(){h t=c,n=e(\'<L H="d-4U"/>\');t.B.1o(n);t.1u=e("<L/>",{"H":"d-1n",2y:t.6.2U[0]||""});t.1q=e("<L/>",{"H":"d-U",2y:t.6.2U[1]||""});n.1o(t.1u).1o(t.1q);n.w("2X.B 21.B",\'L[H^="d"]\',9(e){e.1l()});n.w("2n.B 28.B",\'L[H^="d"]\',9(n){n.1l();7(e(c).1I("d-U")){t.U()}l{t.1n()}})},3T:9(){h t=c;t.1k=e(\'<L H="d-1v"/>\');t.B.1o(t.1k);t.1k.w("2n.B 28.B",".d-1j",9(n){n.1l();7(3p(e(c).v("d-1j"))!==t.m){t.1g(3p(e(c).v("d-1j")),j)}})},3P:9(){h t=c,n,r,i,s,o,u;7(t.6.1v===b){p b}t.1k.2y("");n=0;r=t.E-t.E%t.6.q;1A(s=0;s<t.E;s+=1){7(s%t.6.q===0){n+=1;7(r===s){i=t.E-t.6.q}o=e("<L/>",{"H":"d-1j"});u=e("<3N></3N>",{4R:t.6.39===j?n:"","H":t.6.39===j?"d-59":""});o.1o(u);o.v("d-1j",r===s?i:s);o.v("d-24",n);t.1k.1o(o)}}t.35()},35:9(){h t=c;7(t.6.1v===b){p b}t.1k.17(".d-1j").2f(9(){7(e(c).v("d-24")===e(t.$G[t.m]).v("d-24")){t.1k.17(".d-1j").Z("2d");e(c).I("2d")}})},3e:9(){h e=c;7(e.6.2a===b){p b}7(e.6.2e===b){7(e.m===0&&e.D===0){e.1u.I("1b");e.1q.I("1b")}l 7(e.m===0&&e.D!==0){e.1u.I("1b");e.1q.Z("1b")}l 7(e.m===e.D){e.1u.Z("1b");e.1q.I("1b")}l 7(e.m!==0&&e.m!==e.D){e.1u.Z("1b");e.1q.Z("1b")}}},30:9(){h e=c;e.3P();e.3e();7(e.B){7(e.6.q>=e.E){e.B.3K()}l{e.B.3J()}}},55:9(){h e=c;7(e.B){e.B.3k()}},U:9(e){h t=c;7(t.1E){p b}t.m+=t.6.12===j?t.6.q:1;7(t.m>t.D+(t.6.12===j?t.6.q-1:0)){7(t.6.2e===j){t.m=0;e="2k"}l{t.m=t.D;p b}}t.1g(t.m,e)},1n:9(e){h t=c;7(t.1E){p b}7(t.6.12===j&&t.m>0&&t.m<t.6.q){t.m=0}l{t.m-=t.6.12===j?t.6.q:1}7(t.m<0){7(t.6.2e===j){t.m=t.D;e="2k"}l{t.m=0;p b}}t.1g(t.m,e)},1g:9(e,n,r){h i=c,s;7(i.1E){p b}7(A i.6.1Y==="9"){i.6.1Y.R(c,[i.$k])}7(e>=i.D){e=i.D}l 7(e<=0){e=0}i.m=i.d.m=e;7(i.6.2o!==b&&r!=="4e"&&i.6.q===1&&i.F.1x===j){i.1t(0);7(i.F.1x===j){i.1L(i.J[e])}l{i.1r(i.J[e],1)}i.2r();i.4l();p b}s=i.J[e];7(i.F.1x===j){i.1T=b;7(n===j){i.1t("1w");t.1c(9(){i.1T=j},i.6.1w)}l 7(n==="2k"){i.1t(i.6.2v);t.1c(9(){i.1T=j},i.6.2v)}l{i.1t("1m");t.1c(9(){i.1T=j},i.6.1m)}i.1L(s)}l{7(n===j){i.1r(s,i.6.1w)}l 7(n==="2k"){i.1r(s,i.6.2v)}l{i.1r(s,i.6.1m)}}i.2r()},2g:9(e){h t=c;7(A t.6.1Y==="9"){t.6.1Y.R(c,[t.$k])}7(e>=t.D||e===-1){e=t.D}l 7(e<=0){e=0}t.1t(0);7(t.F.1x===j){t.1L(t.J[e])}l{t.1r(t.J[e],1)}t.m=t.d.m=e;t.2r()},2r:9(){h e=c;e.26.2D(e.m);e.13=e.d.13=e.26[e.26.N-2];e.26.5f(0);7(e.13!==e.m){e.35();e.3e();e.2l();7(e.6.O!==b){e.3j()}}7(A e.6.3y==="9"&&e.13!==e.m){e.6.3y.R(c,[e.$k])}},X:9(){h e=c;e.3A="X";t.18(e.1C)},3j:9(){h e=c;7(e.3A!=="X"){e.19()}},19:9(){h e=c;e.3A="19";7(e.6.O===b){p b}t.18(e.1C);e.1C=t.4d(9(){e.U(j)},e.6.O)},1t:9(e){h t=c;7(e==="1m"){t.$K.z(t.2z(t.6.1m))}l 7(e==="1w"){t.$K.z(t.2z(t.6.1w))}l 7(A e!=="2Y"){t.$K.z(t.2z(e))}},2z:9(e){p{"-1G-1a":"2C "+e+"1z 2s","-1W-1a":"2C "+e+"1z 2s","-o-1a":"2C "+e+"1z 2s",1a:"2C "+e+"1z 2s"}},3H:9(){p{"-1G-1a":"","-1W-1a":"","-o-1a":"",1a:""}},3I:9(e){p{"-1G-P":"1i("+e+"V, C, C)","-1W-P":"1i("+e+"V, C, C)","-o-P":"1i("+e+"V, C, C)","-1z-P":"1i("+e+"V, C, C)",P:"1i("+e+"V, C,C)"}},1L:9(e){h t=c;t.$K.z(t.3I(e))},3L:9(e){h t=c;t.$K.z({T:e})},1r:9(e,t){h n=c;n.29=b;n.$K.X(j,j).4b({T:e},{54:t||n.6.1m,3M:9(){n.29=j}})},4E:9(){h e=c,r="1i(C, C, C)",i=n.56("L"),s,o,u,a;i.2w.3O="  -1W-P:"+r+"; -1z-P:"+r+"; -o-P:"+r+"; -1G-P:"+r+"; P:"+r;s=/1i\\(C, C, C\\)/g;o=i.2w.3O.5i(s);u=o!==14&&o.N===1;a="5z"38 t||t.5Q.4P;e.F={1x:u,15:a}},4q:9(){h e=c;7(e.6.27!==b||e.6.1U!==b){e.3Q();e.3R()}},4C:9(){h e=c,t=["s","e","x"];e.16={};7(e.6.27===j&&e.6.1U===j){t=["2X.d 21.d","2N.d 3U.d","2n.d 3V.d 28.d"]}l 7(e.6.27===b&&e.6.1U===j){t=["2X.d","2N.d","2n.d 3V.d"]}l 7(e.6.27===j&&e.6.1U===b){t=["21.d","3U.d","28.d"]}e.16.3W=t[0];e.16.2K=t[1];e.16.2J=t[2]},3R:9(){h t=c;t.$k.w("5y.d",9(e){e.1l()});t.$k.w("21.3X",9(t){p e(t.1d).2m("5C, 5E, 5F, 5N")})},3Q:9(){9 s(e){7(e.2b!==W){p{x:e.2b[0].2c,y:e.2b[0].41}}7(e.2b===W){7(e.2c!==W){p{x:e.2c,y:e.41}}7(e.2c===W){p{x:e.52,y:e.53}}}}9 o(t){7(t==="w"){e(n).w(r.16.2K,a);e(n).w(r.16.2J,f)}l 7(t==="Q"){e(n).Q(r.16.2K);e(n).Q(r.16.2J)}}9 u(n){h u=n.3h||n||t.3g,a;7(u.5a===3){p b}7(r.E<=r.6.q){p}7(r.29===b&&!r.6.3f){p b}7(r.1T===b&&!r.6.3f){p b}7(r.6.O!==b){t.18(r.1C)}7(r.F.15!==j&&!r.$K.1I("3b")){r.$K.I("3b")}r.11=0;r.Y=0;e(c).z(r.3H());a=e(c).2h();i.2S=a.T;i.2R=s(u).x-a.T;i.2P=s(u).y-a.5o;o("w");i.2j=b;i.2L=u.1d||u.4c}9 a(o){h u=o.3h||o||t.3g,a,f;r.11=s(u).x-i.2R;r.2I=s(u).y-i.2P;r.Y=r.11-i.2S;7(A r.6.2E==="9"&&i.3C!==j&&r.Y!==0){i.3C=j;r.6.2E.R(r,[r.$k])}7((r.Y>8||r.Y<-8)&&r.F.15===j){7(u.1l!==W){u.1l()}l{u.5L=b}i.2j=j}7((r.2I>10||r.2I<-10)&&i.2j===b){e(n).Q("2N.d")}a=9(){p r.Y/5};f=9(){p r.3z+r.Y/5};r.11=1F.3v(1F.3Y(r.11,a()),f());7(r.F.1x===j){r.1L(r.11)}l{r.3L(r.11)}}9 f(n){h s=n.3h||n||t.3g,u,a,f;s.1d=s.1d||s.4c;i.3C=b;7(r.F.15!==j){r.$K.Z("3b")}7(r.Y<0){r.1y=r.d.1y="T"}l{r.1y=r.d.1y="3i"}7(r.Y!==0){u=r.4j();r.1g(u,b,"4e");7(i.2L===s.1d&&r.F.15!==j){e(s.1d).w("3a.4k",9(t){t.4S();t.4T();t.1l();e(t.1d).Q("3a.4k")});a=e.4N(s.1d,"4V").3a;f=a.4W();a.4X(0,0,f)}}o("Q")}h r=c,i={2R:0,2P:0,4Y:0,2S:0,2h:14,4Z:14,50:14,2j:14,51:14,2L:14};r.29=j;r.$k.w(r.16.3W,".d-1p",u)},4j:9(){h e=c,t=e.4m();7(t>e.D){e.m=e.D;t=e.D}l 7(e.11>=0){t=0;e.m=0}p t},4m:9(){h t=c,n=t.6.12===j?t.3E:t.J,r=t.11,i=14;e.2f(n,9(s,o){7(r-t.M/20>n[s+1]&&r-t.M/20<o&&t.34()==="T"){i=o;7(t.6.12===j){t.m=e.4p(i,t.J)}l{t.m=s}}l 7(r+t.M/20<o&&r+t.M/20>(n[s+1]||n[s]-t.M)&&t.34()==="3i"){7(t.6.12===j){i=n[s+1]||n[n.N-1];t.m=e.4p(i,t.J)}l{i=n[s+1];t.m=s+1}}});p t.m},34:9(){h e=c,t;7(e.Y<0){t="3i";e.3u="U"}l{t="T";e.3u="1n"}p t},4A:9(){h e=c;e.$k.w("d.U",9(){e.U()});e.$k.w("d.1n",9(){e.1n()});e.$k.w("d.19",9(t,n){e.6.O=n;e.19();e.32="19"});e.$k.w("d.X",9(){e.X();e.32="X"});e.$k.w("d.1g",9(t,n){e.1g(n)});e.$k.w("d.2g",9(t,n){e.2g(n)})},2p:9(){h e=c;7(e.6.2p===j&&e.F.15!==j&&e.6.O!==b){e.$k.w("57",9(){e.X()});e.$k.w("58",9(){7(e.32!=="X"){e.19()}})}},1Z:9(){h t=c,n,r,i,s,o;7(t.6.1Z===b){p b}1A(n=0;n<t.E;n+=1){r=e(t.$G[n]);7(r.v("d-1e")==="1e"){4s}i=r.v("d-1K");s=r.17(".5b");7(A s.v("1J")!=="2Y"){r.v("d-1e","1e");4s}7(r.v("d-1e")===W){s.3K();r.I("4u").v("d-1e","5e")}7(t.6.4v===j){o=i>=t.m}l{o=j}7(o&&i<t.m+t.6.q&&s.N){t.4w(r,s)}}},4w:9(e,n){9 o(){e.v("d-1e","1e").Z("4u");n.5h("v-1J");7(r.6.4x==="4y"){n.5j(5k)}l{n.3J()}7(A r.6.2T==="9"){r.6.2T.R(c,[r.$k])}}9 u(){i+=1;7(r.2Q(n.3l(0))||s===j){o()}l 7(i<=2q){t.1c(u,2q)}l{o()}}h r=c,i=0,s;7(n.5p("5q")==="5r"){n.z("5s-5t","5u("+n.v("1J")+")");s=j}l{n[0].1J=n.v("1J")}u()},1B:9(){9 s(){h r=e(n.$G[n.m]).2G();n.1H.z("2G",r+"V");7(!n.1H.1I("1B")){t.1c(9(){n.1H.I("1B")},0)}}9 o(){i+=1;7(n.2Q(r.3l(0))){s()}l 7(i<=2q){t.1c(o,2q)}l{n.1H.z("2G","")}}h n=c,r=e(n.$G[n.m]).17("5w"),i;7(r.3l(0)!==W){i=0;o()}l{s()}},2Q:9(e){h t;7(!e.3M){p b}t=A e.4D;7(t!=="W"&&e.4D===0){p b}p j},4g:9(){h t=c,n;7(t.6.2F===j){t.$G.Z("2d")}t.1D=[];1A(n=t.m;n<t.m+t.6.q;n+=1){t.1D.2D(n);7(t.6.2F===j){e(t.$G[n]).I("2d")}}t.d.1D=t.1D},4n:9(e){h t=c;t.4G="d-"+e+"-5B";t.4H="d-"+e+"-38"},4l:9(){9 a(e){p{2h:"5D",T:e+"V"}}h e=c,t=e.4G,n=e.4H,r=e.$G.1S(e.m),i=e.$G.1S(e.13),s=1F.4J(e.J[e.m])+e.J[e.13],o=1F.4J(e.J[e.m])+e.M/2,u="5G 5H 5I 5J";e.1E=j;e.$K.I("d-1P").z({"-1G-P-1P":o+"V","-1W-4K-1P":o+"V","4K-1P":o+"V"});i.z(a(s,10)).I(t).w(u,9(){e.3m=j;i.Q(u);e.31(i,t)});r.I(n).w(u,9(){e.36=j;r.Q(u);e.31(r,n)})},31:9(e,t){h n=c;e.z({2h:"",T:""}).Z(t);7(n.3m&&n.36){n.$K.Z("d-1P");n.3m=b;n.36=b;n.1E=b}},4o:9(){h e=c;e.d={2A:e.2A,5P:e.$k,S:e.$S,G:e.$G,m:e.m,13:e.13,1D:e.1D,15:e.F.15,F:e.F,1y:e.1y}},3G:9(){h r=c;r.$k.Q(".d d 21.3X");e(n).Q(".d d");e(t).Q("44",r.3d)},1V:9(){h e=c;7(e.$k.25().N!==0){e.$K.3r();e.$S.3r().3r();7(e.B){e.B.3k()}}e.3G();e.$k.2x("2w",e.$k.v("d-4I")||"").2x("H",e.$k.v("d-4F"))},5T:9(){h e=c;e.X();t.18(e.1X);e.1V();e.$k.5U()},5V:9(t){h n=c,r=e.4M({},n.2A,t);n.1V();n.1N(r,n.$k)},5W:9(e,t){h n=c,r;7(!e){p b}7(n.$k.25().N===0){n.$k.1o(e);n.23();p b}n.1V();7(t===W||t===-1){r=-1}l{r=t}7(r>=n.$S.N||r===-1){n.$S.1S(-1).5X(e)}l{n.$S.1S(r).5Y(e)}n.23()},5Z:9(e){h t=c,n;7(t.$k.25().N===0){p b}7(e===W||e===-1){n=-1}l{n=e}t.1V();t.$S.1S(n).3k();t.23()}};e.37.2B=9(t){p c.2f(9(){7(e(c).v("d-1N")===j){p b}e(c).v("d-1N",j);h n=3c.3q(r);n.1N(t,c);e.v(c,"2B",n)})};e.37.2B.6={q:5,1h:b,1s:[60,4],1O:[61,3],22:[62,2],1Q:b,1R:[63,1],48:b,46:b,1m:2M,1w:64,2v:65,O:b,2p:b,2a:b,2U:["1n","U"],2e:j,12:b,1v:j,39:b,2Z:j,45:2M,47:t,1M:"d-66",2i:"d-2i",1Z:b,4v:j,4x:"4y",1B:b,2O:b,33:b,3f:j,27:j,1U:j,2F:b,2o:b,3B:b,3D:b,2H:b,3s:b,1Y:b,3y:b,3w:b,2E:b,2T:b}})(67,68,69)', 62, 382, "||||||options|if||function||false|this|owl||||var||true|elem|else|currentItem|||return|items|||||data|on|||css|typeof|owlControls|0px|maximumItem|itemsAmount|browser|owlItems|class|addClass|positionsInArray|owlWrapper|div|itemWidth|length|autoPlay|transform|off|apply|userItems|left|next|px|undefined|stop|newRelativeX|removeClass||newPosX|scrollPerPage|prevItem|null|isTouch|ev_types|find|clearInterval|play|transition|disabled|setTimeout|target|loaded|width|goTo|itemsCustom|translate3d|page|paginationWrapper|preventDefault|slideSpeed|prev|append|wrapper|buttonNext|css2slide|itemsDesktop|swapSpeed|buttonPrev|pagination|paginationSpeed|support3d|dragDirection|ms|for|autoHeight|autoPlayInterval|visibleItems|isTransition|Math|webkit|wrapperOuter|hasClass|src|item|transition3d|baseClass|init|itemsDesktopSmall|origin|itemsTabletSmall|itemsMobile|eq|isCss3Finish|touchDrag|unWrap|moz|checkVisible|beforeMove|lazyLoad||mousedown|itemsTablet|setVars|roundPages|children|prevArr|mouseDrag|mouseup|isCssFinish|navigation|touches|pageX|active|rewindNav|each|jumpTo|position|theme|sliding|rewind|eachMoveUpdate|is|touchend|transitionStyle|stopOnHover|100|afterGo|ease|orignalItems|opacity|rewindSpeed|style|attr|html|addCssSpeed|userOptions|owlCarousel|all|push|startDragging|addClassActive|height|beforeInit|newPosY|end|move|targetElement|200|touchmove|jsonPath|offsetY|completeImg|offsetX|relativePos|afterLazyLoad|navigationText|updateItems|calculateAll|touchstart|string|responsive|updateControls|clearTransStyle|hoverStatus|jsonSuccess|moveDirection|checkPagination|endCurrent|fn|in|paginationNumbers|click|grabbing|Object|resizer|checkNavigation|dragBeforeAnimFinish|event|originalEvent|right|checkAp|remove|get|endPrev|visible|watchVisibility|Number|create|unwrap|afterInit|logIn|playDirection|max|afterAction|updateVars|afterMove|maximumPixels|apStatus|beforeUpdate|dragging|afterUpdate|pagesInArray|reload|clearEvents|removeTransition|doTranslate|show|hide|css2move|complete|span|cssText|updatePagination|gestures|disabledEvents|buildButtons|buildPagination|mousemove|touchcancel|start|disableTextSelect|min|loops|calculateWidth|pageY|appendWrapperSizes|appendItemsSizes|resize|responsiveRefreshRate|itemsScaleUp|responsiveBaseWidth|singleItem|outer|wrap|animate|srcElement|setInterval|drag|updatePosition|onVisibleItems|block|display|getNewPosition|disable|singleItemTransition|closestItem|transitionTypes|owlStatus|inArray|moveEvents|response|continue|buildControls|loading|lazyFollow|lazyPreload|lazyEffect|fade|onStartup|customEvents|wrapItems|eventTypes|naturalWidth|checkBrowser|originalClasses|outClass|inClass|originalStyles|abs|perspective|loadContent|extend|_data|round|msMaxTouchPoints|5e3|text|stopImmediatePropagation|stopPropagation|buttons|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clientX|clientY|duration|destroyControls|createElement|mouseover|mouseout|numbers|which|lazyOwl|appendTo|clearTimeout|checked|shift|sort|removeAttr|match|fadeIn|400|clickable|toggleClass|wrapAll|top|prop|tagName|DIV|background|image|url|wrapperWidth|img|500|dragstart|ontouchstart|controls|out|input|relative|textarea|select|webkitAnimationEnd|oAnimationEnd|MSAnimationEnd|animationend|getJSON|returnValue|hasOwnProperty|option|onstartup|baseElement|navigator|new|prototype|destroy|removeData|reinit|addItem|after|before|removeItem|1199|979|768|479|800|1e3|carousel|jQuery|window|document".split( "|" ), 0, {} ) );

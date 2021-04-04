/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.2.3

window.Platform = window.Platform || {}, window.logFlags = window.logFlags || {},
  function ( a ) {
    var b = a.flags || {};
    location.search.slice( 1 ).split( "&" ).forEach( function ( a ) {
      a = a.split( "=" ), a[ 0 ] && ( b[ a[ 0 ] ] = a[ 1 ] || !0 )
    } );
    var c = document.currentScript || document.querySelector( 'script[src*="platform.js"]' );
    if ( c )
      for ( var d, e = c.attributes, f = 0; f < e.length; f++ ) d = e[ f ], "src" !== d.name && ( b[ d.name ] = d.value || !0 );
    b.log && b.log.split( "," ).forEach( function ( a ) {
      window.logFlags[ a ] = !0
    } ), b.shadow = b.shadow || b.shadowdom || b.polyfill, b.shadow = "native" === b.shadow ? !1 : b.shadow || !HTMLElement.prototype.createShadowRoot, b.shadow && document.querySelectorAll( "script" ).length > 1 && console.warn( "platform.js is not the first script on the page. See http://www.polymer-project.org/docs/start/platform.html#setup for details." ), b.register && ( window.CustomElements = window.CustomElements || {
      flags: {}
    }, window.CustomElements.flags.register = b.register ), b.imports && ( window.HTMLImports = window.HTMLImports || {
      flags: {}
    }, window.HTMLImports.flags.imports = b.imports ), a.flags = b
  }( Platform ), "undefined" == typeof WeakMap && ! function () {
    var a = Object.defineProperty,
      b = Date.now() % 1e9,
      c = function () {
        this.name = "__st" + ( 1e9 * Math.random() >>> 0 ) + ( b++ + "__" )
      };
    c.prototype = {
      set: function ( b, c ) {
        var d = b[ this.name ];
        d && d[ 0 ] === b ? d[ 1 ] = c : a( b, this.name, {
          value: [ b, c ],
          writable: !0
        } )
      },
      get: function ( a ) {
        var b;
        return ( b = a[ this.name ] ) && b[ 0 ] === a ? b[ 1 ] : void 0
      },
      "delete": function ( a ) {
        this.set( a, void 0 )
      }
    }, window.WeakMap = c
  }(),
  function ( global ) {
    "use strict";

    function detectObjectObserve() {
      function a( a ) {
        b = a
      }
      if ( "function" != typeof Object.observe || "function" != typeof Array.observe ) return !1;
      var b = [],
        c = {},
        d = [];
      return Object.observe( c, a ), Array.observe( d, a ), c.id = 1, c.id = 2, delete c.id, d.push( 1, 2 ), d.length = 0, Object.deliverChangeRecords( a ), 5 !== b.length ? !1 : "add" != b[ 0 ].type || "update" != b[ 1 ].type || "delete" != b[ 2 ].type || "splice" != b[ 3 ].type || "splice" != b[ 4 ].type ? !1 : ( Object.unobserve( c, a ), Array.unobserve( d, a ), !0 )
    }

    function detectEval() {
      if ( global.document && "securityPolicy" in global.document && !global.document.securityPolicy.allowsEval ) return !1;
      if ( "undefined" != typeof chrome && chrome.app && chrome.app.runtime ) return !1;
      try {
        var a = new Function( "", "return true;" );
        return a()
      } catch ( b ) {
        return !1
      }
    }

    function isIndex( a ) {
      return +a === a >>> 0
    }

    function toNumber( a ) {
      return +a
    }

    function isObject( a ) {
      return a === Object( a )
    }

    function areSameValue( a, b ) {
      return a === b ? 0 !== a || 1 / a === 1 / b : numberIsNaN( a ) && numberIsNaN( b ) ? !0 : a !== a && b !== b
    }

    function isPathValid( a ) {
      return "string" != typeof a ? !1 : ( a = a.trim(), "" == a ? !0 : "." == a[ 0 ] ? !1 : pathRegExp.test( a ) )
    }

    function Path( a, b ) {
      if ( b !== constructorIsPrivate ) throw Error( "Use Path.get to retrieve path objects" );
      return "" == a.trim() ? this : isIndex( a ) ? ( this.push( a ), this ) : ( a.split( /\s*\.\s*/ ).filter( function ( a ) {
        return a
      } ).forEach( function ( a ) {
        this.push( a )
      }, this ), void( hasEval && this.length && ( this.getValueFrom = this.compiledGetValueFromFn() ) ) )
    }

    function getPath( a ) {
      if ( a instanceof Path ) return a;
      null == a && ( a = "" ), "string" != typeof a && ( a = String( a ) );
      var b = pathCache[ a ];
      if ( b ) return b;
      if ( !isPathValid( a ) ) return invalidPath;
      var b = new Path( a, constructorIsPrivate );
      return pathCache[ a ] = b, b
    }

    function dirtyCheck( a ) {
      for ( var b = 0; MAX_DIRTY_CHECK_CYCLES > b && a.check_(); ) b++;
      return global.testingExposeCycleCount && ( global.dirtyCheckCycleCount = b ), b > 0
    }

    function objectIsEmpty( a ) {
      for ( var b in a ) return !1;
      return !0
    }

    function diffIsEmpty( a ) {
      return objectIsEmpty( a.added ) && objectIsEmpty( a.removed ) && objectIsEmpty( a.changed )
    }

    function diffObjectFromOldObject( a, b ) {
      var c = {},
        d = {},
        e = {};
      for ( var f in b ) {
        var g = a[ f ];
        ( void 0 === g || g !== b[ f ] ) && ( f in a ? g !== b[ f ] && ( e[ f ] = g ) : d[ f ] = void 0 )
      }
      for ( var f in a ) f in b || ( c[ f ] = a[ f ] );
      return Array.isArray( a ) && a.length !== b.length && ( e.length = a.length ), {
        added: c,
        removed: d,
        changed: e
      }
    }

    function runEOMTasks() {
      if ( !eomTasks.length ) return !1;
      for ( var a = 0; a < eomTasks.length; a++ ) eomTasks[ a ]();
      return eomTasks.length = 0, !0
    }

    function newObservedObject() {
      function a( a ) {
        b && b.state_ === OPENED && !d && b.check_( a )
      }
      var b, c, d = !1,
        e = !0;
      return {
        open: function ( c ) {
          if ( b ) throw Error( "ObservedObject in use" );
          e || Object.deliverChangeRecords( a ), b = c, e = !1
        },
        observe: function ( b, d ) {
          c = b, d ? Array.observe( c, a ) : Object.observe( c, a )
        },
        deliver: function ( b ) {
          d = b, Object.deliverChangeRecords( a ), d = !1
        },
        close: function () {
          b = void 0, Object.unobserve( c, a ), observedObjectCache.push( this )
        }
      }
    }

    function getObservedObject( a, b, c ) {
      var d = observedObjectCache.pop() || newObservedObject();
      return d.open( a ), d.observe( b, c ), d
    }

    function newObservedSet() {
      function a( b, f ) {
        b && ( b === d && ( e[ f ] = !0 ), h.indexOf( b ) < 0 && ( h.push( b ), Object.observe( b, c ) ), a( Object.getPrototypeOf( b ), f ) )
      }

      function b( a ) {
        for ( var b = 0; b < a.length; b++ ) {
          var c = a[ b ];
          if ( c.object !== d || e[ c.name ] || "setPrototype" === c.type ) return !1
        }
        return !0
      }

      function c( c ) {
        if ( !b( c ) ) {
          for ( var d, e = 0; e < g.length; e++ ) d = g[ e ], d.state_ == OPENED && d.iterateObjects_( a );
          for ( var e = 0; e < g.length; e++ ) d = g[ e ], d.state_ == OPENED && d.check_()
        }
      }
      var d, e, f = 0,
        g = [],
        h = [],
        i = {
          object: void 0,
          objects: h,
          open: function ( b, c ) {
            d || ( d = c, e = {} ), g.push( b ), f++, b.iterateObjects_( a )
          },
          close: function () {
            if ( f--, !( f > 0 ) ) {
              for ( var a = 0; a < h.length; a++ ) Object.unobserve( h[ a ], c ), Observer.unobservedCount++;
              g.length = 0, h.length = 0, d = void 0, e = void 0, observedSetCache.push( this )
            }
          }
        };
      return i
    }

    function getObservedSet( a, b ) {
      return lastObservedSet && lastObservedSet.object === b || ( lastObservedSet = observedSetCache.pop() || newObservedSet(), lastObservedSet.object = b ), lastObservedSet.open( a, b ), lastObservedSet
    }

    function Observer() {
      this.state_ = UNOPENED, this.callback_ = void 0, this.target_ = void 0, this.directObserver_ = void 0, this.value_ = void 0, this.id_ = nextObserverId++
    }

    function addToAll( a ) {
      Observer._allObserversCount++, collectObservers && allObservers.push( a )
    }

    function removeFromAll() {
      Observer._allObserversCount--
    }

    function ObjectObserver( a ) {
      Observer.call( this ), this.value_ = a, this.oldObject_ = void 0
    }

    function ArrayObserver( a ) {
      if ( !Array.isArray( a ) ) throw Error( "Provided object is not an Array" );
      ObjectObserver.call( this, a )
    }

    function PathObserver( a, b ) {
      Observer.call( this ), this.object_ = a, this.path_ = getPath( b ), this.directObserver_ = void 0
    }

    function CompoundObserver( a ) {
      Observer.call( this ), this.reportChangesOnOpen_ = a, this.value_ = [], this.directObserver_ = void 0, this.observed_ = []
    }

    function identFn( a ) {
      return a
    }

    function ObserverTransform( a, b, c, d ) {
      this.callback_ = void 0, this.target_ = void 0, this.value_ = void 0, this.observable_ = a, this.getValueFn_ = b || identFn, this.setValueFn_ = c || identFn, this.dontPassThroughSet_ = d
    }

    function notify( a, b, c, d ) {
      if ( !areSameValue( c, d ) && ( "function" == typeof a.propertyChanged_ && a.propertyChanged_( b, c, d ), hasObserve ) ) {
        var e = a.notifier_;
        e || ( e = a.notifier_ = Object.getNotifier( a ) ), updateRecord.object = a, updateRecord.name = b, updateRecord.oldValue = d, e.notify( updateRecord )
      }
    }

    function diffObjectFromChangeRecords( a, b, c ) {
      for ( var d = {}, e = {}, f = 0; f < b.length; f++ ) {
        var g = b[ f ];
        expectedRecordTypes[ g.type ] ? ( g.name in c || ( c[ g.name ] = g.oldValue ), "update" != g.type && ( "add" != g.type ? g.name in d ? ( delete d[ g.name ], delete c[ g.name ] ) : e[ g.name ] = !0 : g.name in e ? delete e[ g.name ] : d[ g.name ] = !0 ) ) : ( console.error( "Unknown changeRecord type: " + g.type ), console.error( g ) )
      }
      for ( var h in d ) d[ h ] = a[ h ];
      for ( var h in e ) e[ h ] = void 0;
      var i = {};
      for ( var h in c )
        if ( !( h in d || h in e ) ) {
          var j = a[ h ];
          c[ h ] !== j && ( i[ h ] = j )
        } return {
        added: d,
        removed: e,
        changed: i
      }
    }

    function newSplice( a, b, c ) {
      return {
        index: a,
        removed: b,
        addedCount: c
      }
    }

    function ArraySplice() {}

    function calcSplices( a, b, c, d, e, f ) {
      return arraySplice.calcSplices( a, b, c, d, e, f )
    }

    function intersect( a, b, c, d ) {
      return c > b || a > d ? -1 : b == c || d == a ? 0 : c > a ? d > b ? b - c : d - c : b > d ? d - a : b - a
    }

    function mergeSplice( a, b, c, d ) {
      for ( var e = newSplice( b, c, d ), f = !1, g = 0, h = 0; h < a.length; h++ ) {
        var i = a[ h ];
        if ( i.index += g, !f ) {
          var j = intersect( e.index, e.index + e.removed.length, i.index, i.index + i.addedCount );
          if ( j >= 0 ) {
            a.splice( h, 1 ), h--, g -= i.addedCount - i.removed.length, e.addedCount += i.addedCount - j;
            var k = e.removed.length + i.removed.length - j;
            if ( e.addedCount || k ) {
              var c = i.removed;
              if ( e.index < i.index ) {
                var l = e.removed.slice( 0, i.index - e.index );
                Array.prototype.push.apply( l, c ), c = l
              }
              if ( e.index + e.removed.length > i.index + i.addedCount ) {
                var m = e.removed.slice( i.index + i.addedCount - e.index );
                Array.prototype.push.apply( c, m )
              }
              e.removed = c, i.index < e.index && ( e.index = i.index )
            } else f = !0
          } else if ( e.index < i.index ) {
            f = !0, a.splice( h, 0, e ), h++;
            var n = e.addedCount - e.removed.length;
            i.index += n, g += n
          }
        }
      }
      f || a.push( e )
    }

    function createInitialSplices( a, b ) {
      for ( var c = [], d = 0; d < b.length; d++ ) {
        var e = b[ d ];
        switch ( e.type ) {
          case "splice":
            mergeSplice( c, e.index, e.removed.slice(), e.addedCount );
            break;
          case "add":
          case "update":
          case "delete":
            if ( !isIndex( e.name ) ) continue;
            var f = toNumber( e.name );
            if ( 0 > f ) continue;
            mergeSplice( c, f, [ e.oldValue ], 1 );
            break;
          default:
            console.error( "Unexpected record type: " + JSON.stringify( e ) )
        }
      }
      return c
    }

    function projectArraySplices( a, b ) {
      var c = [];
      return createInitialSplices( a, b ).forEach( function ( b ) {
        return 1 == b.addedCount && 1 == b.removed.length ? void( b.removed[ 0 ] !== a[ b.index ] && c.push( b ) ) : void( c = c.concat( calcSplices( a, b.index, b.index + b.addedCount, b.removed, 0, b.removed.length ) ) )
      } ), c
    }
    var hasObserve = detectObjectObserve(),
      hasEval = detectEval(),
      numberIsNaN = global.Number.isNaN || function ( a ) {
        return "number" == typeof a && global.isNaN( a )
      },
      createObject = "__proto__" in {} ? function ( a ) {
        return a
      } : function ( a ) {
        var b = a.__proto__;
        if ( !b ) return a;
        var c = Object.create( b );
        return Object.getOwnPropertyNames( a ).forEach( function ( b ) {
          Object.defineProperty( c, b, Object.getOwnPropertyDescriptor( a, b ) )
        } ), c
      },
      identStart = "[$_a-zA-Z]",
      identPart = "[$_a-zA-Z0-9]",
      ident = identStart + "+" + identPart + "*",
      elementIndex = "(?:[0-9]|[1-9]+[0-9]+)",
      identOrElementIndex = "(?:" + ident + "|" + elementIndex + ")",
      path = "(?:" + identOrElementIndex + ")(?:\\s*\\.\\s*" + identOrElementIndex + ")*",
      pathRegExp = new RegExp( "^" + path + "$" ),
      constructorIsPrivate = {},
      pathCache = {};
    Path.get = getPath, Path.prototype = createObject( {
      __proto__: [],
      valid: !0,
      toString: function () {
        return this.join( "." )
      },
      getValueFrom: function ( a ) {
        for ( var b = 0; b < this.length; b++ ) {
          if ( null == a ) return;
          a = a[ this[ b ] ]
        }
        return a
      },
      iterateObjects: function ( a, b ) {
        for ( var c = 0; c < this.length; c++ ) {
          if ( c && ( a = a[ this[ c - 1 ] ] ), !isObject( a ) ) return;
          b( a, this[ 0 ] )
        }
      },
      compiledGetValueFromFn: function () {
        var a = this.map( function ( a ) {
            return isIndex( a ) ? '["' + a + '"]' : "." + a
          } ),
          b = "",
          c = "obj";
        b += "if (obj != null";
        for ( var d = 0; d < this.length - 1; d++ ) {
          {
            this[ d ]
          }
          c += a[ d ], b += " &&\n     " + c + " != null"
        }
        return b += ")\n", c += a[ d ], b += "  return " + c + ";\nelse\n  return undefined;", new Function( "obj", b )
      },
      setValueFrom: function ( a, b ) {
        if ( !this.length ) return !1;
        for ( var c = 0; c < this.length - 1; c++ ) {
          if ( !isObject( a ) ) return !1;
          a = a[ this[ c ] ]
        }
        return isObject( a ) ? ( a[ this[ c ] ] = b, !0 ) : !1
      }
    } );
    var invalidPath = new Path( "", constructorIsPrivate );
    invalidPath.valid = !1, invalidPath.getValueFrom = invalidPath.setValueFrom = function () {};
    var MAX_DIRTY_CHECK_CYCLES = 1e3,
      eomTasks = [],
      runEOM = hasObserve ? function () {
        var a = {
            pingPong: !0
          },
          b = !1;
        return Object.observe( a, function () {
            runEOMTasks(), b = !1
          } ),
          function ( c ) {
            eomTasks.push( c ), b || ( b = !0, a.pingPong = !a.pingPong )
          }
      }() : function () {
        return function ( a ) {
          eomTasks.push( a )
        }
      }(),
      observedObjectCache = [],
      observedSetCache = [],
      lastObservedSet, UNOPENED = 0,
      OPENED = 1,
      CLOSED = 2,
      RESETTING = 3,
      nextObserverId = 1;
    Observer.prototype = {
      open: function ( a, b ) {
        if ( this.state_ != UNOPENED ) throw Error( "Observer has already been opened." );
        return addToAll( this ), this.callback_ = a, this.target_ = b, this.connect_(), this.state_ = OPENED, this.value_
      },
      close: function () {
        this.state_ == OPENED && ( removeFromAll( this ), this.disconnect_(), this.value_ = void 0, this.callback_ = void 0, this.target_ = void 0, this.state_ = CLOSED )
      },
      deliver: function () {
        this.state_ == OPENED && dirtyCheck( this )
      },
      report_: function ( a ) {
        try {
          this.callback_.apply( this.target_, a )
        } catch ( b ) {
          Observer._errorThrownDuringCallback = !0, console.error( "Exception caught during observer callback: " + ( b.stack || b ) )
        }
      },
      discardChanges: function () {
        return this.check_( void 0, !0 ), this.value_
      }
    };
    var collectObservers = !hasObserve,
      allObservers;
    Observer._allObserversCount = 0, collectObservers && ( allObservers = [] );
    var runningMicrotaskCheckpoint = !1,
      hasDebugForceFullDelivery = hasObserve && function () {
        try {
          return eval( "%RunMicrotasks()" ), !0
        } catch ( ex ) {
          return !1
        }
      }();
    global.Platform = global.Platform || {}, global.Platform.performMicrotaskCheckpoint = function () {
      if ( !runningMicrotaskCheckpoint ) {
        if ( hasDebugForceFullDelivery ) return void eval( "%RunMicrotasks()" );
        if ( collectObservers ) {
          runningMicrotaskCheckpoint = !0;
          var cycles = 0,
            anyChanged, toCheck;
          do {
            cycles++, toCheck = allObservers, allObservers = [], anyChanged = !1;
            for ( var i = 0; i < toCheck.length; i++ ) {
              var observer = toCheck[ i ];
              observer.state_ == OPENED && ( observer.check_() && ( anyChanged = !0 ), allObservers.push( observer ) )
            }
            runEOMTasks() && ( anyChanged = !0 )
          } while ( MAX_DIRTY_CHECK_CYCLES > cycles && anyChanged );
          global.testingExposeCycleCount && ( global.dirtyCheckCycleCount = cycles ), runningMicrotaskCheckpoint = !1
        }
      }
    }, collectObservers && ( global.Platform.clearObservers = function () {
      allObservers = []
    } ), ObjectObserver.prototype = createObject( {
      __proto__: Observer.prototype,
      arrayObserve: !1,
      connect_: function () {
        hasObserve ? this.directObserver_ = getObservedObject( this, this.value_, this.arrayObserve ) : this.oldObject_ = this.copyObject( this.value_ )
      },
      copyObject: function ( a ) {
        var b = Array.isArray( a ) ? [] : {};
        for ( var c in a ) b[ c ] = a[ c ];
        return Array.isArray( a ) && ( b.length = a.length ), b
      },
      check_: function ( a ) {
        var b, c;
        if ( hasObserve ) {
          if ( !a ) return !1;
          c = {}, b = diffObjectFromChangeRecords( this.value_, a, c )
        } else c = this.oldObject_, b = diffObjectFromOldObject( this.value_, this.oldObject_ );
        return diffIsEmpty( b ) ? !1 : ( hasObserve || ( this.oldObject_ = this.copyObject( this.value_ ) ), this.report_( [ b.added || {}, b.removed || {}, b.changed || {}, function ( a ) {
          return c[ a ]
        } ] ), !0 )
      },
      disconnect_: function () {
        hasObserve ? ( this.directObserver_.close(), this.directObserver_ = void 0 ) : this.oldObject_ = void 0
      },
      deliver: function () {
        this.state_ == OPENED && ( hasObserve ? this.directObserver_.deliver( !1 ) : dirtyCheck( this ) )
      },
      discardChanges: function () {
        return this.directObserver_ ? this.directObserver_.deliver( !0 ) : this.oldObject_ = this.copyObject( this.value_ ), this.value_
      }
    } ), ArrayObserver.prototype = createObject( {
      __proto__: ObjectObserver.prototype,
      arrayObserve: !0,
      copyObject: function ( a ) {
        return a.slice()
      },
      check_: function ( a ) {
        var b;
        if ( hasObserve ) {
          if ( !a ) return !1;
          b = projectArraySplices( this.value_, a )
        } else b = calcSplices( this.value_, 0, this.value_.length, this.oldObject_, 0, this.oldObject_.length );
        return b && b.length ? ( hasObserve || ( this.oldObject_ = this.copyObject( this.value_ ) ), this.report_( [ b ] ), !0 ) : !1
      }
    } ), ArrayObserver.applySplices = function ( a, b, c ) {
      c.forEach( function ( c ) {
        for ( var d = [ c.index, c.removed.length ], e = c.index; e < c.index + c.addedCount; ) d.push( b[ e ] ), e++;
        Array.prototype.splice.apply( a, d )
      } )
    }, PathObserver.prototype = createObject( {
      __proto__: Observer.prototype,
      connect_: function () {
        hasObserve && ( this.directObserver_ = getObservedSet( this, this.object_ ) ), this.check_( void 0, !0 )
      },
      disconnect_: function () {
        this.value_ = void 0, this.directObserver_ && ( this.directObserver_.close( this ), this.directObserver_ = void 0 )
      },
      iterateObjects_: function ( a ) {
        this.path_.iterateObjects( this.object_, a )
      },
      check_: function ( a, b ) {
        var c = this.value_;
        return this.value_ = this.path_.getValueFrom( this.object_ ), b || areSameValue( this.value_, c ) ? !1 : ( this.report_( [ this.value_, c ] ), !0 )
      },
      setValue: function ( a ) {
        this.path_ && this.path_.setValueFrom( this.object_, a )
      }
    } );
    var observerSentinel = {};
    CompoundObserver.prototype = createObject( {
      __proto__: Observer.prototype,
      connect_: function () {
        if ( hasObserve ) {
          for ( var a, b = !1, c = 0; c < this.observed_.length; c += 2 )
            if ( a = this.observed_[ c ], a !== observerSentinel ) {
              b = !0;
              break
            } b && ( this.directObserver_ = getObservedSet( this, a ) )
        }
        this.check_( void 0, !this.reportChangesOnOpen_ )
      },
      disconnect_: function () {
        for ( var a = 0; a < this.observed_.length; a += 2 ) this.observed_[ a ] === observerSentinel && this.observed_[ a + 1 ].close();
        this.observed_.length = 0, this.value_.length = 0, this.directObserver_ && ( this.directObserver_.close( this ), this.directObserver_ = void 0 )
      },
      addPath: function ( a, b ) {
        if ( this.state_ != UNOPENED && this.state_ != RESETTING ) throw Error( "Cannot add paths once started." );
        var b = getPath( b );
        if ( this.observed_.push( a, b ), this.reportChangesOnOpen_ ) {
          var c = this.observed_.length / 2 - 1;
          this.value_[ c ] = b.getValueFrom( a )
        }
      },
      addObserver: function ( a ) {
        if ( this.state_ != UNOPENED && this.state_ != RESETTING ) throw Error( "Cannot add observers once started." );
        if ( this.observed_.push( observerSentinel, a ), this.reportChangesOnOpen_ ) {
          var b = this.observed_.length / 2 - 1;
          this.value_[ b ] = a.open( this.deliver, this )
        }
      },
      startReset: function () {
        if ( this.state_ != OPENED ) throw Error( "Can only reset while open" );
        this.state_ = RESETTING, this.disconnect_()
      },
      finishReset: function () {
        if ( this.state_ != RESETTING ) throw Error( "Can only finishReset after startReset" );
        return this.state_ = OPENED, this.connect_(), this.value_
      },
      iterateObjects_: function ( a ) {
        for ( var b, c = 0; c < this.observed_.length; c += 2 ) b = this.observed_[ c ], b !== observerSentinel && this.observed_[ c + 1 ].iterateObjects( b, a )
      },
      check_: function ( a, b ) {
        for ( var c, d = 0; d < this.observed_.length; d += 2 ) {
          var e, f = this.observed_[ d ],
            g = this.observed_[ d + 1 ];
          if ( f === observerSentinel ) {
            var h = g;
            e = this.state_ === UNOPENED ? h.open( this.deliver, this ) : h.discardChanges()
          } else e = g.getValueFrom( f );
          b ? this.value_[ d / 2 ] = e : areSameValue( e, this.value_[ d / 2 ] ) || ( c = c || [], c[ d / 2 ] = this.value_[ d / 2 ], this.value_[ d / 2 ] = e )
        }
        return c ? ( this.report_( [ this.value_, c, this.observed_ ] ), !0 ) : !1
      }
    } ), ObserverTransform.prototype = {
      open: function ( a, b ) {
        return this.callback_ = a, this.target_ = b, this.value_ = this.getValueFn_( this.observable_.open( this.observedCallback_, this ) ), this.value_
      },
      observedCallback_: function ( a ) {
        if ( a = this.getValueFn_( a ), !areSameValue( a, this.value_ ) ) {
          var b = this.value_;
          this.value_ = a, this.callback_.call( this.target_, this.value_, b )
        }
      },
      discardChanges: function () {
        return this.value_ = this.getValueFn_( this.observable_.discardChanges() ), this.value_
      },
      deliver: function () {
        return this.observable_.deliver()
      },
      setValue: function ( a ) {
        return a = this.setValueFn_( a ), !this.dontPassThroughSet_ && this.observable_.setValue ? this.observable_.setValue( a ) : void 0
      },
      close: function () {
        this.observable_ && this.observable_.close(), this.callback_ = void 0, this.target_ = void 0, this.observable_ = void 0, this.value_ = void 0, this.getValueFn_ = void 0, this.setValueFn_ = void 0
      }
    };
    var expectedRecordTypes = {
        add: !0,
        update: !0,
        "delete": !0
      },
      updateRecord = {
        object: void 0,
        type: "update",
        name: void 0,
        oldValue: void 0
      };
    Observer.createBindablePrototypeAccessor = function ( a, b ) {
      var c = b + "_",
        d = b + "Observable_";
      a[ c ] = a[ b ], Object.defineProperty( a, b, {
        get: function () {
          var a = this[ d ];
          return a && a.deliver(), this[ c ]
        },
        set: function ( a ) {
          var e = this[ d ];
          if ( e ) return void e.setValue( a );
          var f = this[ c ];
          return this[ c ] = a, notify( this, b, a, f ), a
        },
        configurable: !0
      } )
    }, Observer.bindToInstance = function ( a, b, c, d ) {
      var e = b + "_",
        f = b + "Observable_";
      a[ f ] = c;
      var g = a[ e ],
        h = c.open( function ( c, d ) {
          a[ e ] = c, notify( a, b, c, d )
        } );
      if ( d && !areSameValue( g, h ) ) {
        var i = d( g, h );
        areSameValue( h, i ) || ( h = i, c.setValue && c.setValue( h ) )
      }
      return a[ e ] = h, notify( a, b, h, g ), {
        close: function () {
          c.close(), a[ f ] = void 0
        }
      }
    };
    var EDIT_LEAVE = 0,
      EDIT_UPDATE = 1,
      EDIT_ADD = 2,
      EDIT_DELETE = 3;
    ArraySplice.prototype = {
      calcEditDistances: function ( a, b, c, d, e, f ) {
        for ( var g = f - e + 1, h = c - b + 1, i = new Array( g ), j = 0; g > j; j++ ) i[ j ] = new Array( h ), i[ j ][ 0 ] = j;
        for ( var k = 0; h > k; k++ ) i[ 0 ][ k ] = k;
        for ( var j = 1; g > j; j++ )
          for ( var k = 1; h > k; k++ )
            if ( this.equals( a[ b + k - 1 ], d[ e + j - 1 ] ) ) i[ j ][ k ] = i[ j - 1 ][ k - 1 ];
            else {
              var l = i[ j - 1 ][ k ] + 1,
                m = i[ j ][ k - 1 ] + 1;
              i[ j ][ k ] = m > l ? l : m
            } return i
      },
      spliceOperationsFromEditDistances: function ( a ) {
        for ( var b = a.length - 1, c = a[ 0 ].length - 1, d = a[ b ][ c ], e = []; b > 0 || c > 0; )
          if ( 0 != b )
            if ( 0 != c ) {
              var f, g = a[ b - 1 ][ c - 1 ],
                h = a[ b - 1 ][ c ],
                i = a[ b ][ c - 1 ];
              f = i > h ? g > h ? h : g : g > i ? i : g, f == g ? ( g == d ? e.push( EDIT_LEAVE ) : ( e.push( EDIT_UPDATE ), d = g ), b--, c-- ) : f == h ? ( e.push( EDIT_DELETE ), b--, d = h ) : ( e.push( EDIT_ADD ), c--, d = i )
            } else e.push( EDIT_DELETE ), b--;
        else e.push( EDIT_ADD ), c--;
        return e.reverse(), e
      },
      calcSplices: function ( a, b, c, d, e, f ) {
        var g = 0,
          h = 0,
          i = Math.min( c - b, f - e );
        if ( 0 == b && 0 == e && ( g = this.sharedPrefix( a, d, i ) ), c == a.length && f == d.length && ( h = this.sharedSuffix( a, d, i - g ) ), b += g, e += g, c -= h, f -= h, c - b == 0 && f - e == 0 ) return [];
        if ( b == c ) {
          for ( var j = newSplice( b, [], 0 ); f > e; ) j.removed.push( d[ e++ ] );
          return [ j ]
        }
        if ( e == f ) return [ newSplice( b, [], c - b ) ];
        for ( var k = this.spliceOperationsFromEditDistances( this.calcEditDistances( a, b, c, d, e, f ) ), j = void 0, l = [], m = b, n = e, o = 0; o < k.length; o++ ) switch ( k[ o ] ) {
          case EDIT_LEAVE:
            j && ( l.push( j ), j = void 0 ), m++, n++;
            break;
          case EDIT_UPDATE:
            j || ( j = newSplice( m, [], 0 ) ), j.addedCount++, m++, j.removed.push( d[ n ] ), n++;
            break;
          case EDIT_ADD:
            j || ( j = newSplice( m, [], 0 ) ), j.addedCount++, m++;
            break;
          case EDIT_DELETE:
            j || ( j = newSplice( m, [], 0 ) ), j.removed.push( d[ n ] ), n++
        }
        return j && l.push( j ), l
      },
      sharedPrefix: function ( a, b, c ) {
        for ( var d = 0; c > d; d++ )
          if ( !this.equals( a[ d ], b[ d ] ) ) return d;
        return c
      },
      sharedSuffix: function ( a, b, c ) {
        for ( var d = a.length, e = b.length, f = 0; c > f && this.equals( a[ --d ], b[ --e ] ); ) f++;
        return f
      },
      calculateSplices: function ( a, b ) {
        return this.calcSplices( a, 0, a.length, b, 0, b.length )
      },
      equals: function ( a, b ) {
        return a === b
      }
    };
    var arraySplice = new ArraySplice;
    global.Observer = Observer, global.Observer.runEOM_ = runEOM, global.Observer.observerSentinel_ = observerSentinel, global.Observer.hasObjectObserve = hasObserve, global.ArrayObserver = ArrayObserver, global.ArrayObserver.calculateSplices = function ( a, b ) {
      return arraySplice.calculateSplices( a, b )
    }, global.ArraySplice = ArraySplice, global.ObjectObserver = ObjectObserver, global.PathObserver = PathObserver, global.CompoundObserver = CompoundObserver, global.Path = Path, global.ObserverTransform = ObserverTransform
  }( "undefined" != typeof global && global && "undefined" != typeof module && module ? global : this || window ), Platform.flags.shadow ? ( window.ShadowDOMPolyfill = {}, function ( a ) {
    "use strict";

    function b( a ) {
      if ( !a ) throw new Error( "Assertion failed" )
    }

    function c( a, b ) {
      for ( var c = M( b ), d = 0; d < c.length; d++ ) {
        var e = c[ d ];
        L( a, e, N( b, e ) )
      }
      return a
    }

    function d( a, b ) {
      for ( var c = M( b ), d = 0; d < c.length; d++ ) {
        var e = c[ d ];
        switch ( e ) {
          case "arguments":
          case "caller":
          case "length":
          case "name":
          case "prototype":
          case "toString":
            continue
        }
        L( a, e, N( b, e ) )
      }
      return a
    }

    function e( a, b ) {
      for ( var c = 0; c < b.length; c++ )
        if ( b[ c ] in a ) return b[ c ]
    }

    function f( a, b, c ) {
      O.value = c, L( a, b, O )
    }

    function g( a ) {
      var b = a.__proto__ || Object.getPrototypeOf( a ),
        c = F.get( b );
      if ( c ) return c;
      var d = g( b ),
        e = u( d );
      return r( b, e, a ), e
    }

    function h( a, b ) {
      p( a, b, !0 )
    }

    function i( a, b ) {
      p( b, a, !1 )
    }

    function j( a ) {
      return /^on[a-z]+$/.test( a )
    }

    function k( a ) {
      return /^\w[a-zA-Z_0-9]*$/.test( a )
    }

    function l( a ) {
      return I && k( a ) ? new Function( "return this.impl." + a ) : function () {
        return this.impl[ a ]
      }
    }

    function m( a ) {
      return I && k( a ) ? new Function( "v", "this.impl." + a + " = v" ) : function ( b ) {
        this.impl[ a ] = b
      }
    }

    function n( a ) {
      return I && k( a ) ? new Function( "return this.impl." + a + ".apply(this.impl, arguments)" ) : function () {
        return this.impl[ a ].apply( this.impl, arguments )
      }
    }

    function o( a, b ) {
      try {
        return Object.getOwnPropertyDescriptor( a, b )
      } catch ( c ) {
        return Q
      }
    }

    function p( b, c, d ) {
      for ( var e = M( b ), f = 0; f < e.length; f++ ) {
        var g = e[ f ];
        if ( "polymerBlackList_" !== g && !( g in c || b.polymerBlackList_ && b.polymerBlackList_[ g ] ) ) {
          P && b.__lookupGetter__( g );
          var h, i, k = o( b, g );
          if ( d && "function" == typeof k.value ) c[ g ] = n( g );
          else {
            var p = j( g );
            h = p ? a.getEventHandlerGetter( g ) : l( g ), ( k.writable || k.set ) && ( i = p ? a.getEventHandlerSetter( g ) : m( g ) ), L( c, g, {
              get: h,
              set: i,
              configurable: k.configurable,
              enumerable: k.enumerable
            } )
          }
        }
      }
    }

    function q( a, b, c ) {
      var e = a.prototype;
      r( e, b, c ), d( b, a )
    }

    function r( a, c, d ) {
      var e = c.prototype;
      b( void 0 === F.get( a ) ), F.set( a, c ), G.set( e, a ), h( a, e ), d && i( e, d ), f( e, "constructor", c ), c.prototype = e
    }

    function s( a, b ) {
      return F.get( b.prototype ) === a
    }

    function t( a ) {
      var b = Object.getPrototypeOf( a ),
        c = g( b ),
        d = u( c );
      return r( b, d, a ), d
    }

    function u( a ) {
      function b( b ) {
        a.call( this, b )
      }
      var c = Object.create( a.prototype );
      return c.constructor = b, b.prototype = c, b
    }

    function v( a ) {
      return a instanceof H.EventTarget || a instanceof H.Event || a instanceof H.Range || a instanceof H.DOMImplementation || a instanceof H.CanvasRenderingContext2D || H.WebGLRenderingContext && a instanceof H.WebGLRenderingContext
    }

    function w( a ) {
      return S && a instanceof S || a instanceof U || a instanceof T || a instanceof V || a instanceof W || a instanceof R || a instanceof X || Y && a instanceof Y || Z && a instanceof Z
    }

    function x( a ) {
      return null === a ? null : ( b( w( a ) ), a.polymerWrapper_ || ( a.polymerWrapper_ = new( g( a ) )( a ) ) )
    }

    function y( a ) {
      return null === a ? null : ( b( v( a ) ), a.impl )
    }

    function z( a ) {
      return a && v( a ) ? y( a ) : a
    }

    function A( a ) {
      return a && !v( a ) ? x( a ) : a
    }

    function B( a, c ) {
      null !== c && ( b( w( a ) ), b( void 0 === c || v( c ) ), a.polymerWrapper_ = c )
    }

    function C( a, b, c ) {
      $.get = c, L( a.prototype, b, $ )
    }

    function D( a, b ) {
      C( a, b, function () {
        return x( this.impl[ b ] )
      } )
    }

    function E( a, b ) {
      a.forEach( function ( a ) {
        b.forEach( function ( b ) {
          a.prototype[ b ] = function () {
            var a = A( this );
            return a[ b ].apply( a, arguments )
          }
        } )
      } )
    }
    var F = new WeakMap,
      G = new WeakMap,
      H = Object.create( null ),
      I = !( "securityPolicy" in document ) || document.securityPolicy.allowsEval;
    if ( "undefined" != typeof chrome && chrome.app && chrome.app.runtime && ( I = !1 ), I ) try {
      var J = new Function( "", "return true;" );
      I = J()
    } catch ( K ) {
      I = !1
    }
    var L = Object.defineProperty,
      M = Object.getOwnPropertyNames,
      N = Object.getOwnPropertyDescriptor,
      O = {
        value: void 0,
        configurable: !0,
        enumerable: !1,
        writable: !0
      };
    M( window );
    var P = /Firefox/.test( navigator.userAgent ),
      Q = {
        get: function () {},
        set: function () {},
        configurable: !0,
        enumerable: !0
      },
      R = window.DOMImplementation,
      S = window.EventTarget,
      T = window.Event,
      U = window.Node,
      V = window.Window,
      W = window.Range,
      X = window.CanvasRenderingContext2D,
      Y = window.WebGLRenderingContext,
      Z = window.SVGElementInstance,
      $ = {
        get: void 0,
        configurable: !0,
        enumerable: !0
      };
    a.assert = b, a.constructorTable = F, a.defineGetter = C, a.defineWrapGetter = D, a.forwardMethodsToWrapper = E, a.isWrapper = v, a.isWrapperFor = s, a.mixin = c, a.nativePrototypeTable = G, a.oneOf = e, a.registerObject = t, a.registerWrapper = q, a.rewrap = B, a.unwrap = y, a.unwrapIfNeeded = z, a.wrap = x, a.wrapIfNeeded = A, a.wrappers = H
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b() {
      g = !1;
      var a = f.slice( 0 );
      f = [];
      for ( var b = 0; b < a.length; b++ ) a[ b ]()
    }

    function c( a ) {
      f.push( a ), g || ( g = !0, d( b, 0 ) )
    }
    var d, e = window.MutationObserver,
      f = [],
      g = !1;
    if ( e ) {
      var h = 1,
        i = new e( b ),
        j = document.createTextNode( h );
      i.observe( j, {
        characterData: !0
      } ), d = function () {
        h = ( h + 1 ) % 2, j.data = h
      }
    } else d = window.setImmediate || window.setTimeout;
    a.setEndOfMicrotask = c
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b() {
      p || ( k( c ), p = !0 )
    }

    function c() {
      p = !1;
      do
        for ( var a = o.slice(), b = !1, c = 0; c < a.length; c++ ) {
          var d = a[ c ],
            e = d.takeRecords();
          f( d ), e.length && ( d.callback_( e, d ), b = !0 )
        }
      while ( b )
    }

    function d( a, b ) {
      this.type = a, this.target = b, this.addedNodes = new m.NodeList, this.removedNodes = new m.NodeList, this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
    }

    function e( a, b ) {
      for ( ; a; a = a.parentNode ) {
        var c = n.get( a );
        if ( c )
          for ( var d = 0; d < c.length; d++ ) {
            var e = c[ d ];
            e.options.subtree && e.addTransientObserver( b )
          }
      }
    }

    function f( a ) {
      for ( var b = 0; b < a.nodes_.length; b++ ) {
        var c = a.nodes_[ b ],
          d = n.get( c );
        if ( !d ) return;
        for ( var e = 0; e < d.length; e++ ) {
          var f = d[ e ];
          f.observer === a && f.removeTransientObservers()
        }
      }
    }

    function g( a, c, e ) {
      for ( var f = Object.create( null ), g = Object.create( null ), h = a; h; h = h.parentNode ) {
        var i = n.get( h );
        if ( i )
          for ( var j = 0; j < i.length; j++ ) {
            var k = i[ j ],
              l = k.options;
            if ( ( h === a || l.subtree ) && !( "attributes" === c && !l.attributes || "attributes" === c && l.attributeFilter && ( null !== e.namespace || -1 === l.attributeFilter.indexOf( e.name ) ) || "characterData" === c && !l.characterData || "childList" === c && !l.childList ) ) {
              var m = k.observer;
              f[ m.uid_ ] = m, ( "attributes" === c && l.attributeOldValue || "characterData" === c && l.characterDataOldValue ) && ( g[ m.uid_ ] = e.oldValue )
            }
          }
      }
      var o = !1;
      for ( var p in f ) {
        var m = f[ p ],
          q = new d( c, a );
        "name" in e && "namespace" in e && ( q.attributeName = e.name, q.attributeNamespace = e.namespace ), e.addedNodes && ( q.addedNodes = e.addedNodes ), e.removedNodes && ( q.removedNodes = e.removedNodes ), e.previousSibling && ( q.previousSibling = e.previousSibling ), e.nextSibling && ( q.nextSibling = e.nextSibling ), void 0 !== g[ p ] && ( q.oldValue = g[ p ] ), m.records_.push( q ), o = !0
      }
      o && b()
    }

    function h( a ) {
      if ( this.childList = !!a.childList, this.subtree = !!a.subtree, this.attributes = "attributes" in a || !( "attributeOldValue" in a || "attributeFilter" in a ) ? !!a.attributes : !0, this.characterData = "characterDataOldValue" in a && !( "characterData" in a ) ? !0 : !!a.characterData, !this.attributes && ( a.attributeOldValue || "attributeFilter" in a ) || !this.characterData && a.characterDataOldValue ) throw new TypeError;
      if ( this.characterData = !!a.characterData, this.attributeOldValue = !!a.attributeOldValue, this.characterDataOldValue = !!a.characterDataOldValue, "attributeFilter" in a ) {
        if ( null == a.attributeFilter || "object" != typeof a.attributeFilter ) throw new TypeError;
        this.attributeFilter = q.call( a.attributeFilter )
      } else this.attributeFilter = null
    }

    function i( a ) {
      this.callback_ = a, this.nodes_ = [], this.records_ = [], this.uid_ = ++r, o.push( this )
    }

    function j( a, b, c ) {
      this.observer = a, this.target = b, this.options = c, this.transientObservedNodes = []
    }
    var k = a.setEndOfMicrotask,
      l = a.wrapIfNeeded,
      m = a.wrappers,
      n = new WeakMap,
      o = [],
      p = !1,
      q = Array.prototype.slice,
      r = 0;
    i.prototype = {
      observe: function ( a, b ) {
        a = l( a );
        var c, d = new h( b ),
          e = n.get( a );
        e || n.set( a, e = [] );
        for ( var f = 0; f < e.length; f++ ) e[ f ].observer === this && ( c = e[ f ], c.removeTransientObservers(), c.options = d );
        c || ( c = new j( this, a, d ), e.push( c ), this.nodes_.push( a ) )
      },
      disconnect: function () {
        this.nodes_.forEach( function ( a ) {
          for ( var b = n.get( a ), c = 0; c < b.length; c++ ) {
            var d = b[ c ];
            if ( d.observer === this ) {
              b.splice( c, 1 );
              break
            }
          }
        }, this ), this.records_ = []
      },
      takeRecords: function () {
        var a = this.records_;
        return this.records_ = [], a
      }
    }, j.prototype = {
      addTransientObserver: function ( a ) {
        if ( a !== this.target ) {
          this.transientObservedNodes.push( a );
          var b = n.get( a );
          b || n.set( a, b = [] ), b.push( this )
        }
      },
      removeTransientObservers: function () {
        var a = this.transientObservedNodes;
        this.transientObservedNodes = [];
        for ( var b = 0; b < a.length; b++ )
          for ( var c = a[ b ], d = n.get( c ), e = 0; e < d.length; e++ )
            if ( d[ e ] === this ) {
              d.splice( e, 1 );
              break
            }
      }
    }, a.enqueueMutation = g, a.registerTransientObservers = e, a.wrappers.MutationObserver = i, a.wrappers.MutationRecord = d
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a, b ) {
      this.root = a, this.parent = b
    }

    function c( a, b ) {
      if ( a.treeScope_ !== b ) {
        a.treeScope_ = b;
        for ( var d = a.shadowRoot; d; d = d.olderShadowRoot ) d.treeScope_.parent = b;
        for ( var e = a.firstChild; e; e = e.nextSibling ) c( e, b )
      }
    }

    function d( a ) {
      if ( a.treeScope_ ) return a.treeScope_;
      var c, e = a.parentNode;
      return c = e ? d( e ) : new b( a, null ), a.treeScope_ = c
    }
    b.prototype = {
      get renderer() {
        return this.root instanceof a.wrappers.ShadowRoot ? a.getRendererForHost( this.root.host ) : null
      },
      contains: function ( a ) {
        for ( ; a; a = a.parent )
          if ( a === this ) return !0;
        return !1
      }
    }, a.TreeScope = b, a.getTreeScope = d, a.setTreeScope = c
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      return a instanceof R.ShadowRoot
    }

    function c( a ) {
      var b = a.localName;
      return "content" === b || "shadow" === b
    }

    function d( a ) {
      return !!a.shadowRoot
    }

    function e( a ) {
      var b;
      return a.parentNode || ( b = a.defaultView ) && Q( b ) || null
    }

    function f( f, g, h ) {
      if ( h.length ) return h.shift();
      if ( b( f ) ) return j( f ) || f.host;
      var i = a.eventParentsTable.get( f );
      if ( i ) {
        for ( var k = 1; k < i.length; k++ ) h[ k - 1 ] = i[ k ];
        return i[ 0 ]
      }
      if ( g && c( f ) ) {
        var l = f.parentNode;
        if ( l && d( l ) )
          for ( var m = a.getShadowTrees( l ), n = j( g ), k = 0; k < m.length; k++ )
            if ( m[ k ].contains( n ) ) return n
      }
      return e( f )
    }

    function g( a ) {
      for ( var d = [], e = a, g = [], i = []; e; ) {
        var j = null;
        if ( c( e ) ) {
          j = h( d );
          var k = d[ d.length - 1 ] || e;
          d.push( k )
        } else d.length || d.push( e );
        var l = d[ d.length - 1 ];
        g.push( {
          target: l,
          currentTarget: e
        } ), b( e ) && d.pop(), e = f( e, j, i )
      }
      return g
    }

    function h( a ) {
      for ( var b = a.length - 1; b >= 0; b-- )
        if ( !c( a[ b ] ) ) return a[ b ];
      return null
    }

    function i( a, d ) {
      for ( var e = []; a; ) {
        for ( var g = [], i = d, j = void 0; i; ) {
          var m = null;
          if ( g.length ) {
            if ( c( i ) && ( m = h( g ), k( j ) ) ) {
              var n = g[ g.length - 1 ];
              g.push( n )
            }
          } else g.push( i );
          if ( l( i, a ) ) return g[ g.length - 1 ];
          b( i ) && g.pop(), j = i, i = f( i, m, e )
        }
        a = b( a ) ? a.host : a.parentNode
      }
    }

    function j( b ) {
      return a.insertionParentTable.get( b )
    }

    function k( a ) {
      return j( a )
    }

    function l( a, b ) {
      return M( a ) === M( b )
    }

    function m( a ) {
      if ( !T.get( a ) && ( T.set( a, !0 ), o( Q( a ), Q( a.target ) ), K ) ) {
        var b = K;
        throw K = null, b
      }
    }

    function n( a ) {
      switch ( a.type ) {
        case "beforeunload":
        case "load":
        case "unload":
          return !0
      }
      return !1
    }

    function o( b, c ) {
      if ( U.get( b ) ) throw new Error( "InvalidStateError" );
      U.set( b, !0 ), a.renderAllPending();
      var d = g( c );
      return 2 === d.length && d[ 0 ].target instanceof R.Document && n( b ) && d.shift(), ab.set( b, d ), p( b, d ) && q( b, d ) && r( b, d ), Y.set( b, u.NONE ), W.delete( b, null ), U.delete( b ), b.defaultPrevented
    }

    function p( a, b ) {
      for ( var c, d = b.length - 1; d > 0; d-- ) {
        var e = b[ d ].target,
          f = b[ d ].currentTarget;
        if ( e !== f && ( c = u.CAPTURING_PHASE, !s( b[ d ], a, c ) ) ) return !1
      }
      return !0
    }

    function q( a, b ) {
      var c = u.AT_TARGET;
      return s( b[ 0 ], a, c )
    }

    function r( a, b ) {
      for ( var c, d = a.bubbles, e = 1; e < b.length; e++ ) {
        var f = b[ e ].target,
          g = b[ e ].currentTarget;
        if ( f === g ) c = u.AT_TARGET;
        else {
          if ( !d || $.get( a ) ) continue;
          c = u.BUBBLING_PHASE
        }
        if ( !s( b[ e ], a, c ) ) return
      }
    }

    function s( a, b, c ) {
      var d = a.target,
        e = a.currentTarget,
        f = S.get( e );
      if ( !f ) return !0;
      if ( "relatedTarget" in b ) {
        var g = P( b ),
          h = g.relatedTarget;
        if ( h ) {
          if ( h instanceof Object && h.addEventListener ) {
            var j = Q( h ),
              k = i( e, j );
            if ( k === d ) return !0
          } else k = null;
          X.set( b, k )
        }
      }
      Y.set( b, c );
      var l = b.type,
        m = !1;
      V.set( b, d ), W.set( b, e );
      for ( var n = 0; n < f.length; n++ ) {
        var o = f[ n ];
        if ( o.removed ) m = !0;
        else if ( !( o.type !== l || !o.capture && c === u.CAPTURING_PHASE || o.capture && c === u.BUBBLING_PHASE ) ) try {
          if ( "function" == typeof o.handler ? o.handler.call( e, b ) : o.handler.handleEvent( b ), $.get( b ) ) return !1
        } catch ( p ) {
          K || ( K = p )
        }
      }
      if ( m ) {
        var q = f.slice();
        f.length = 0;
        for ( var n = 0; n < q.length; n++ ) q[ n ].removed || f.push( q[ n ] )
      }
      return !Z.get( b )
    }

    function t( a, b, c ) {
      this.type = a, this.handler = b, this.capture = Boolean( c )
    }

    function u( a, b ) {
      if ( !( a instanceof bb ) ) return Q( y( bb, "Event", a, b ) );
      var c = a;
      return mb || "beforeunload" !== c.type ? void( this.impl = c ) : new z( c )
    }

    function v( a ) {
      return a && a.relatedTarget ? Object.create( a, {
        relatedTarget: {
          value: P( a.relatedTarget )
        }
      } ) : a
    }

    function w( a, b, c ) {
      var d = window[ a ],
        e = function ( b, c ) {
          return b instanceof d ? void( this.impl = b ) : Q( y( d, a, b, c ) )
        };
      if ( e.prototype = Object.create( b.prototype ), c && N( e.prototype, c ), d ) try {
        O( d, e, new d( "temp" ) )
      } catch ( f ) {
        O( d, e, document.createEvent( a ) )
      }
      return e
    }

    function x( a, b ) {
      return function () {
        arguments[ b ] = P( arguments[ b ] );
        var c = P( this );
        c[ a ].apply( c, arguments )
      }
    }

    function y( a, b, c, d ) {
      if ( kb ) return new a( c, v( d ) );
      var e = P( document.createEvent( b ) ),
        f = jb[ b ],
        g = [ c ];
      return Object.keys( f ).forEach( function ( a ) {
        var b = null != d && a in d ? d[ a ] : f[ a ];
        "relatedTarget" === a && ( b = P( b ) ), g.push( b )
      } ), e[ "init" + b ].apply( e, g ), e
    }

    function z( a ) {
      u.call( this, a )
    }

    function A( a ) {
      return "function" == typeof a ? !0 : a && a.handleEvent
    }

    function B( a ) {
      switch ( a ) {
        case "DOMAttrModified":
        case "DOMAttributeNameChanged":
        case "DOMCharacterDataModified":
        case "DOMElementNameChanged":
        case "DOMNodeInserted":
        case "DOMNodeInsertedIntoDocument":
        case "DOMNodeRemoved":
        case "DOMNodeRemovedFromDocument":
        case "DOMSubtreeModified":
          return !0
      }
      return !1
    }

    function C( a ) {
      this.impl = a
    }

    function D( a ) {
      return a instanceof R.ShadowRoot && ( a = a.host ), P( a )
    }

    function E( a, b ) {
      var c = S.get( a );
      if ( c )
        for ( var d = 0; d < c.length; d++ )
          if ( !c[ d ].removed && c[ d ].type === b ) return !0;
      return !1
    }

    function F( a, b ) {
      for ( var c = P( a ); c; c = c.parentNode )
        if ( E( Q( c ), b ) ) return !0;
      return !1
    }

    function G( a ) {
      L( a, ob )
    }

    function H( b, c, d, e ) {
      a.renderAllPending();
      for ( var f = Q( pb.call( c.impl, d, e ) ), h = g( f, this ), i = 0; i < h.length; i++ ) {
        var j = h[ i ];
        if ( j.currentTarget === b ) return j.target
      }
      return null
    }

    function I( a ) {
      return function () {
        var b = _.get( this );
        return b && b[ a ] && b[ a ].value || null
      }
    }

    function J( a ) {
      var b = a.slice( 2 );
      return function ( c ) {
        var d = _.get( this );
        d || ( d = Object.create( null ), _.set( this, d ) );
        var e = d[ a ];
        if ( e && this.removeEventListener( b, e.wrapped, !1 ), "function" == typeof c ) {
          var f = function ( b ) {
            var d = c.call( this, b );
            d === !1 ? b.preventDefault() : "onbeforeunload" === a && "string" == typeof d && ( b.returnValue = d )
          };
          this.addEventListener( b, f, !1 ), d[ a ] = {
            value: c,
            wrapped: f
          }
        }
      }
    }
    var K, L = a.forwardMethodsToWrapper,
      M = a.getTreeScope,
      N = a.mixin,
      O = a.registerWrapper,
      P = a.unwrap,
      Q = a.wrap,
      R = a.wrappers,
      S = ( new WeakMap, new WeakMap ),
      T = new WeakMap,
      U = new WeakMap,
      V = new WeakMap,
      W = new WeakMap,
      X = new WeakMap,
      Y = new WeakMap,
      Z = new WeakMap,
      $ = new WeakMap,
      _ = new WeakMap,
      ab = new WeakMap;
    t.prototype = {
      equals: function ( a ) {
        return this.handler === a.handler && this.type === a.type && this.capture === a.capture
      },
      get removed() {
        return null === this.handler
      },
      remove: function () {
        this.handler = null
      }
    };
    var bb = window.Event;
    bb.prototype.polymerBlackList_ = {
      returnValue: !0,
      keyLocation: !0
    }, u.prototype = {
      get target() {
        return V.get( this )
      },
      get currentTarget() {
        return W.get( this )
      },
      get eventPhase() {
        return Y.get( this )
      },
      get path() {
        var a = new R.NodeList,
          b = ab.get( this );
        if ( b ) {
          for ( var c = 0, d = b.length - 1, e = M( W.get( this ) ), f = 0; d >= f; f++ ) {
            var g = b[ f ].currentTarget,
              h = M( g );
            h.contains( e ) && ( f !== d || g instanceof R.Node ) && ( a[ c++ ] = g )
          }
          a.length = c
        }
        return a
      },
      stopPropagation: function () {
        Z.set( this, !0 )
      },
      stopImmediatePropagation: function () {
        Z.set( this, !0 ), $.set( this, !0 )
      }
    }, O( bb, u, document.createEvent( "Event" ) );
    var cb = w( "UIEvent", u ),
      db = w( "CustomEvent", u ),
      eb = {
        get relatedTarget() {
          var a = X.get( this );
          return void 0 !== a ? a : Q( P( this ).relatedTarget )
        }
      },
      fb = N( {
        initMouseEvent: x( "initMouseEvent", 14 )
      }, eb ),
      gb = N( {
        initFocusEvent: x( "initFocusEvent", 5 )
      }, eb ),
      hb = w( "MouseEvent", cb, fb ),
      ib = w( "FocusEvent", cb, gb ),
      jb = Object.create( null ),
      kb = function () {
        try {
          new window.FocusEvent( "focus" )
        } catch ( a ) {
          return !1
        }
        return !0
      }();
    if ( !kb ) {
      var lb = function ( a, b, c ) {
        if ( c ) {
          var d = jb[ c ];
          b = N( N( {}, d ), b )
        }
        jb[ a ] = b
      };
      lb( "Event", {
        bubbles: !1,
        cancelable: !1
      } ), lb( "CustomEvent", {
        detail: null
      }, "Event" ), lb( "UIEvent", {
        view: null,
        detail: 0
      }, "Event" ), lb( "MouseEvent", {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: !1,
        altKey: !1,
        shiftKey: !1,
        metaKey: !1,
        button: 0,
        relatedTarget: null
      }, "UIEvent" ), lb( "FocusEvent", {
        relatedTarget: null
      }, "UIEvent" )
    }
    var mb = window.BeforeUnloadEvent;
    z.prototype = Object.create( u.prototype ), N( z.prototype, {
      get returnValue() {
        return this.impl.returnValue
      },
      set returnValue( a ) {
        this.impl.returnValue = a
      }
    } ), mb && O( mb, z );
    var nb = window.EventTarget,
      ob = [ "addEventListener", "removeEventListener", "dispatchEvent" ];
    [ Node, Window ].forEach( function ( a ) {
      var b = a.prototype;
      ob.forEach( function ( a ) {
        Object.defineProperty( b, a + "_", {
          value: b[ a ]
        } )
      } )
    } ), C.prototype = {
      addEventListener: function ( a, b, c ) {
        if ( A( b ) && !B( a ) ) {
          var d = new t( a, b, c ),
            e = S.get( this );
          if ( e ) {
            for ( var f = 0; f < e.length; f++ )
              if ( d.equals( e[ f ] ) ) return
          } else e = [], S.set( this, e );
          e.push( d );
          var g = D( this );
          g.addEventListener_( a, m, !0 )
        }
      },
      removeEventListener: function ( a, b, c ) {
        c = Boolean( c );
        var d = S.get( this );
        if ( d ) {
          for ( var e = 0, f = !1, g = 0; g < d.length; g++ ) d[ g ].type === a && d[ g ].capture === c && ( e++, d[ g ].handler === b && ( f = !0, d[ g ].remove() ) );
          if ( f && 1 === e ) {
            var h = D( this );
            h.removeEventListener_( a, m, !0 )
          }
        }
      },
      dispatchEvent: function ( b ) {
        var c = P( b ),
          d = c.type;
        T.set( c, !1 ), a.renderAllPending();
        var e;
        F( this, d ) || ( e = function () {}, this.addEventListener( d, e, !0 ) );
        try {
          return P( this ).dispatchEvent_( c )
        } finally {
          e && this.removeEventListener( d, e, !0 )
        }
      }
    }, nb && O( nb, C );
    var pb = document.elementFromPoint;
    a.adjustRelatedTarget = i, a.elementFromPoint = H, a.getEventHandlerGetter = I, a.getEventHandlerSetter = J, a.wrapEventTargetMethods = G, a.wrappers.BeforeUnloadEvent = z, a.wrappers.CustomEvent = db, a.wrappers.Event = u, a.wrappers.EventTarget = C, a.wrappers.FocusEvent = ib, a.wrappers.MouseEvent = hb, a.wrappers.UIEvent = cb
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a, b ) {
      Object.defineProperty( a, b, g )
    }

    function c() {
      this.length = 0, b( this, "length" )
    }

    function d( a ) {
      if ( null == a ) return a;
      for ( var b = new c, d = 0, e = a.length; e > d; d++ ) b[ d ] = f( a[ d ] );
      return b.length = e, b
    }

    function e( a, b ) {
      a.prototype[ b ] = function () {
        return d( this.impl[ b ].apply( this.impl, arguments ) )
      }
    }
    var f = a.wrap,
      g = {
        enumerable: !1
      };
    c.prototype = {
      item: function ( a ) {
        return this[ a ]
      }
    }, b( c.prototype, "item" ), a.wrappers.NodeList = c, a.addWrapNodeListMethod = e, a.wrapNodeList = d
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";
    a.wrapHTMLCollection = a.wrapNodeList, a.wrappers.HTMLCollection = a.wrappers.NodeList
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      A( a instanceof w )
    }

    function c( a ) {
      var b = new y;
      return b[ 0 ] = a, b.length = 1, b
    }

    function d( a, b, c ) {
      C( b, "childList", {
        removedNodes: c,
        previousSibling: a.previousSibling,
        nextSibling: a.nextSibling
      } )
    }

    function e( a, b ) {
      C( a, "childList", {
        removedNodes: b
      } )
    }

    function f( a, b, d, e ) {
      if ( a instanceof DocumentFragment ) {
        var f = h( a );
        O = !0;
        for ( var g = f.length - 1; g >= 0; g-- ) a.removeChild( f[ g ] ), f[ g ].parentNode_ = b;
        O = !1;
        for ( var g = 0; g < f.length; g++ ) f[ g ].previousSibling_ = f[ g - 1 ] || d, f[ g ].nextSibling_ = f[ g + 1 ] || e;
        return d && ( d.nextSibling_ = f[ 0 ] ), e && ( e.previousSibling_ = f[ f.length - 1 ] ), f
      }
      var f = c( a ),
        i = a.parentNode;
      return i && i.removeChild( a ), a.parentNode_ = b, a.previousSibling_ = d, a.nextSibling_ = e, d && ( d.nextSibling_ = a ), e && ( e.previousSibling_ = a ), f
    }

    function g( a ) {
      if ( a instanceof DocumentFragment ) return h( a );
      var b = c( a ),
        e = a.parentNode;
      return e && d( a, e, b ), b
    }

    function h( a ) {
      for ( var b = new y, c = 0, d = a.firstChild; d; d = d.nextSibling ) b[ c++ ] = d;
      return b.length = c, e( a, b ), b
    }

    function i( a ) {
      return a
    }

    function j( a, b ) {
      I( a, b ), a.nodeIsInserted_()
    }

    function k( a, b ) {
      for ( var c = D( b ), d = 0; d < a.length; d++ ) j( a[ d ], c )
    }

    function l( a ) {
      I( a, new z( a, null ) )
    }

    function m( a ) {
      for ( var b = 0; b < a.length; b++ ) l( a[ b ] )
    }

    function n( a, b ) {
      var c = a.nodeType === w.DOCUMENT_NODE ? a : a.ownerDocument;
      c !== b.ownerDocument && c.adoptNode( b )
    }

    function o( b, c ) {
      if ( c.length ) {
        var d = b.ownerDocument;
        if ( d !== c[ 0 ].ownerDocument )
          for ( var e = 0; e < c.length; e++ ) a.adoptNodeNoRemove( c[ e ], d )
      }
    }

    function p( a, b ) {
      o( a, b );
      var c = b.length;
      if ( 1 === c ) return J( b[ 0 ] );
      for ( var d = J( a.ownerDocument.createDocumentFragment() ), e = 0; c > e; e++ ) d.appendChild( J( b[ e ] ) );
      return d
    }

    function q( a ) {
      if ( void 0 !== a.firstChild_ )
        for ( var b = a.firstChild_; b; ) {
          var c = b;
          b = b.nextSibling_, c.parentNode_ = c.previousSibling_ = c.nextSibling_ = void 0
        }
      a.firstChild_ = a.lastChild_ = void 0
    }

    function r( a ) {
      if ( a.invalidateShadowRenderer() ) {
        for ( var b = a.firstChild; b; ) {
          A( b.parentNode === a );
          var c = b.nextSibling,
            d = J( b ),
            e = d.parentNode;
          e && V.call( e, d ), b.previousSibling_ = b.nextSibling_ = b.parentNode_ = null, b = c
        }
        a.firstChild_ = a.lastChild_ = null
      } else
        for ( var c, f = J( a ), g = f.firstChild; g; ) c = g.nextSibling, V.call( f, g ), g = c
    }

    function s( a ) {
      var b = a.parentNode;
      return b && b.invalidateShadowRenderer()
    }

    function t( a ) {
      for ( var b, c = 0; c < a.length; c++ ) b = a[ c ], b.parentNode.removeChild( b )
    }

    function u( a, b, c ) {
      var d;
      if ( d = L( c ? P.call( c, a.impl, !1 ) : Q.call( a.impl, !1 ) ), b ) {
        for ( var e = a.firstChild; e; e = e.nextSibling ) d.appendChild( u( e, !0, c ) );
        if ( a instanceof N.HTMLTemplateElement )
          for ( var f = d.content, e = a.content.firstChild; e; e = e.nextSibling ) f.appendChild( u( e, !0, c ) )
      }
      return d
    }

    function v( a, b ) {
      if ( !b || D( a ) !== D( b ) ) return !1;
      for ( var c = b; c; c = c.parentNode )
        if ( c === a ) return !0;
      return !1
    }

    function w( a ) {
      A( a instanceof R ), x.call( this, a ), this.parentNode_ = void 0, this.firstChild_ = void 0, this.lastChild_ = void 0, this.nextSibling_ = void 0, this.previousSibling_ = void 0, this.treeScope_ = void 0
    }
    var x = a.wrappers.EventTarget,
      y = a.wrappers.NodeList,
      z = a.TreeScope,
      A = a.assert,
      B = a.defineWrapGetter,
      C = a.enqueueMutation,
      D = a.getTreeScope,
      E = a.isWrapper,
      F = a.mixin,
      G = a.registerTransientObservers,
      H = a.registerWrapper,
      I = a.setTreeScope,
      J = a.unwrap,
      K = a.unwrapIfNeeded,
      L = a.wrap,
      M = a.wrapIfNeeded,
      N = a.wrappers,
      O = !1,
      P = document.importNode,
      Q = window.Node.prototype.cloneNode,
      R = window.Node,
      S = window.DocumentFragment,
      T = ( R.prototype.appendChild, R.prototype.compareDocumentPosition ),
      U = R.prototype.insertBefore,
      V = R.prototype.removeChild,
      W = R.prototype.replaceChild,
      X = /Trident/.test( navigator.userAgent ),
      Y = X ? function ( a, b ) {
        try {
          V.call( a, b )
        } catch ( c ) {
          if ( !( a instanceof S ) ) throw c
        }
      } : function ( a, b ) {
        V.call( a, b )
      };
    w.prototype = Object.create( x.prototype ), F( w.prototype, {
      appendChild: function ( a ) {
        return this.insertBefore( a, null )
      },
      insertBefore: function ( a, c ) {
        b( a );
        var d;
        c ? E( c ) ? d = J( c ) : ( d = c, c = L( d ) ) : ( c = null, d = null ), c && A( c.parentNode === this );
        var e, h = c ? c.previousSibling : this.lastChild,
          i = !this.invalidateShadowRenderer() && !s( a );
        if ( e = i ? g( a ) : f( a, this, h, c ), i ) n( this, a ), q( this ), U.call( this.impl, J( a ), d );
        else {
          h || ( this.firstChild_ = e[ 0 ] ), c || ( this.lastChild_ = e[ e.length - 1 ] );
          var j = d ? d.parentNode : this.impl;
          j ? U.call( j, p( this, e ), d ) : o( this, e )
        }
        return C( this, "childList", {
          addedNodes: e,
          nextSibling: c,
          previousSibling: h
        } ), k( e, this ), a
      },
      removeChild: function ( a ) {
        if ( b( a ), a.parentNode !== this ) {
          for ( var d = !1, e = ( this.childNodes, this.firstChild ); e; e = e.nextSibling )
            if ( e === a ) {
              d = !0;
              break
            } if ( !d ) throw new Error( "NotFoundError" )
        }
        var f = J( a ),
          g = a.nextSibling,
          h = a.previousSibling;
        if ( this.invalidateShadowRenderer() ) {
          var i = this.firstChild,
            j = this.lastChild,
            k = f.parentNode;
          k && Y( k, f ), i === a && ( this.firstChild_ = g ), j === a && ( this.lastChild_ = h ), h && ( h.nextSibling_ = g ), g && ( g.previousSibling_ = h ), a.previousSibling_ = a.nextSibling_ = a.parentNode_ = void 0
        } else q( this ), Y( this.impl, f );
        return O || C( this, "childList", {
          removedNodes: c( a ),
          nextSibling: g,
          previousSibling: h
        } ), G( this, a ), a
      },
      replaceChild: function ( a, d ) {
        b( a );
        var e;
        if ( E( d ) ? e = J( d ) : ( e = d, d = L( e ) ), d.parentNode !== this ) throw new Error( "NotFoundError" );
        var h, i = d.nextSibling,
          j = d.previousSibling,
          m = !this.invalidateShadowRenderer() && !s( a );
        return m ? h = g( a ) : ( i === a && ( i = a.nextSibling ), h = f( a, this, j, i ) ), m ? ( n( this, a ), q( this ), W.call( this.impl, J( a ), e ) ) : ( this.firstChild === d && ( this.firstChild_ = h[ 0 ] ), this.lastChild === d && ( this.lastChild_ = h[ h.length - 1 ] ), d.previousSibling_ = d.nextSibling_ = d.parentNode_ = void 0, e.parentNode && W.call( e.parentNode, p( this, h ), e ) ), C( this, "childList", {
          addedNodes: h,
          removedNodes: c( d ),
          nextSibling: i,
          previousSibling: j
        } ), l( d ), k( h, this ), d
      },
      nodeIsInserted_: function () {
        for ( var a = this.firstChild; a; a = a.nextSibling ) a.nodeIsInserted_()
      },
      hasChildNodes: function () {
        return null !== this.firstChild
      },
      get parentNode() {
        return void 0 !== this.parentNode_ ? this.parentNode_ : L( this.impl.parentNode )
      },
      get firstChild() {
        return void 0 !== this.firstChild_ ? this.firstChild_ : L( this.impl.firstChild )
      },
      get lastChild() {
        return void 0 !== this.lastChild_ ? this.lastChild_ : L( this.impl.lastChild )
      },
      get nextSibling() {
        return void 0 !== this.nextSibling_ ? this.nextSibling_ : L( this.impl.nextSibling )
      },
      get previousSibling() {
        return void 0 !== this.previousSibling_ ? this.previousSibling_ : L( this.impl.previousSibling )
      },
      get parentElement() {
        for ( var a = this.parentNode; a && a.nodeType !== w.ELEMENT_NODE; ) a = a.parentNode;
        return a
      },
      get textContent() {
        for ( var a = "", b = this.firstChild; b; b = b.nextSibling ) b.nodeType != w.COMMENT_NODE && ( a += b.textContent );
        return a
      },
      set textContent( a ) {
        var b = i( this.childNodes );
        if ( this.invalidateShadowRenderer() ) {
          if ( r( this ), "" !== a ) {
            var c = this.impl.ownerDocument.createTextNode( a );
            this.appendChild( c )
          }
        } else q( this ), this.impl.textContent = a;
        var d = i( this.childNodes );
        C( this, "childList", {
          addedNodes: d,
          removedNodes: b
        } ), m( b ), k( d, this )
      },
      get childNodes() {
        for ( var a = new y, b = 0, c = this.firstChild; c; c = c.nextSibling ) a[ b++ ] = c;
        return a.length = b, a
      },
      cloneNode: function ( a ) {
        return u( this, a )
      },
      contains: function ( a ) {
        return v( this, M( a ) )
      },
      compareDocumentPosition: function ( a ) {
        return T.call( this.impl, K( a ) )
      },
      normalize: function () {
        for ( var a, b, c = i( this.childNodes ), d = [], e = "", f = 0; f < c.length; f++ ) b = c[ f ], b.nodeType === w.TEXT_NODE ? a || b.data.length ? a ? ( e += b.data, d.push( b ) ) : a = b : this.removeNode( b ) : ( a && d.length && ( a.data += e, cleanUpNodes( d ) ), d = [], e = "", a = null, b.childNodes.length && b.normalize() );
        a && d.length && ( a.data += e, t( d ) )
      }
    } ), B( w, "ownerDocument" ), H( R, w, document.createDocumentFragment() ), delete w.prototype.querySelector, delete w.prototype.querySelectorAll, w.prototype = F( Object.create( x.prototype ), w.prototype ), a.cloneNode = u, a.nodeWasAdded = j, a.nodeWasRemoved = l, a.nodesWereAdded = k, a.nodesWereRemoved = m, a.snapshotNodeList = i, a.wrappers.Node = w
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a, c ) {
      for ( var d, e = a.firstElementChild; e; ) {
        if ( e.matches( c ) ) return e;
        if ( d = b( e, c ) ) return d;
        e = e.nextElementSibling
      }
      return null
    }

    function c( a, b ) {
      return a.matches( b )
    }

    function d( a, b, c ) {
      var d = a.localName;
      return d === b || d === c && a.namespaceURI === l
    }

    function e() {
      return !0
    }

    function f( a, b ) {
      return a.localName === b
    }

    function g( a, b ) {
      return a.namespaceURI === b
    }

    function h( a, b, c ) {
      return a.namespaceURI === b && a.localName === c
    }

    function i( a, b, c, d, e ) {
      for ( var f = a.firstElementChild; f; ) c( f, d, e ) && ( b[ b.length++ ] = f ), i( f, b, c, d, e ), f = f.nextElementSibling;
      return b
    }
    var j = a.wrappers.HTMLCollection,
      k = a.wrappers.NodeList,
      l = "http://www.w3.org/1999/xhtml",
      m = {
        querySelector: function ( a ) {
          return b( this, a )
        },
        querySelectorAll: function ( a ) {
          return i( this, new k, c, a )
        }
      },
      n = {
        getElementsByTagName: function ( a ) {
          var b = new j;
          return "*" === a ? i( this, b, e ) : i( this, b, d, a, a.toLowerCase() )
        },
        getElementsByClassName: function ( a ) {
          return this.querySelectorAll( "." + a )
        },
        getElementsByTagNameNS: function ( a, b ) {
          var c = new j;
          if ( "" === a ) a = null;
          else if ( "*" === a ) return "*" === b ? i( this, c, e ) : i( this, c, f, b );
          return "*" === b ? i( this, c, g, a ) : i( this, c, h, a, b )
        }
      };
    a.GetElementsByInterface = n, a.SelectorsInterface = m
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      for ( ; a && a.nodeType !== Node.ELEMENT_NODE; ) a = a.nextSibling;
      return a
    }

    function c( a ) {
      for ( ; a && a.nodeType !== Node.ELEMENT_NODE; ) a = a.previousSibling;
      return a
    }
    var d = a.wrappers.NodeList,
      e = {
        get firstElementChild() {
          return b( this.firstChild )
        },
        get lastElementChild() {
          return c( this.lastChild )
        },
        get childElementCount() {
          for ( var a = 0, b = this.firstElementChild; b; b = b.nextElementSibling ) a++;
          return a
        },
        get children() {
          for ( var a = new d, b = 0, c = this.firstElementChild; c; c = c.nextElementSibling ) a[ b++ ] = c;
          return a.length = b, a
        },
        remove: function () {
          var a = this.parentNode;
          a && a.removeChild( this )
        }
      },
      f = {
        get nextElementSibling() {
          return b( this.nextSibling )
        },
        get previousElementSibling() {
          return c( this.previousSibling )
        }
      };
    a.ChildNodeInterface = f, a.ParentNodeInterface = e
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      d.call( this, a )
    }
    var c = a.ChildNodeInterface,
      d = a.wrappers.Node,
      e = a.enqueueMutation,
      f = a.mixin,
      g = a.registerWrapper,
      h = window.CharacterData;
    b.prototype = Object.create( d.prototype ), f( b.prototype, {
      get textContent() {
        return this.data
      },
      set textContent( a ) {
        this.data = a
      },
      get data() {
        return this.impl.data
      },
      set data( a ) {
        var b = this.impl.data;
        e( this, "characterData", {
          oldValue: b
        } ), this.impl.data = a
      }
    } ), f( b.prototype, c ), g( h, b, document.createTextNode( "" ) ), a.wrappers.CharacterData = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      return a >>> 0
    }

    function c( a ) {
      d.call( this, a )
    }
    var d = a.wrappers.CharacterData,
      e = ( a.enqueueMutation, a.mixin ),
      f = a.registerWrapper,
      g = window.Text;
    c.prototype = Object.create( d.prototype ), e( c.prototype, {
      splitText: function ( a ) {
        a = b( a );
        var c = this.data;
        if ( a > c.length ) throw new Error( "IndexSizeError" );
        var d = c.slice( 0, a ),
          e = c.slice( a );
        this.data = d;
        var f = this.ownerDocument.createTextNode( e );
        return this.parentNode && this.parentNode.insertBefore( f, this.nextSibling ), f
      }
    } ), f( g, c, document.createTextNode( "" ) ), a.wrappers.Text = c
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( b, c ) {
      var d = b.parentNode;
      if ( d && d.shadowRoot ) {
        var e = a.getRendererForHost( d );
        e.dependsOnAttribute( c ) && e.invalidate()
      }
    }

    function c( a, b, c ) {
      k( a, "attributes", {
        name: b,
        namespace: null,
        oldValue: c
      } )
    }

    function d( a ) {
      h.call( this, a )
    }

    function e( a, c, d ) {
      var e = d || c;
      Object.defineProperty( a, c, {
        get: function () {
          return this.impl[ c ]
        },
        set: function ( a ) {
          this.impl[ c ] = a, b( this, e )
        },
        configurable: !0,
        enumerable: !0
      } )
    }
    var f = a.ChildNodeInterface,
      g = a.GetElementsByInterface,
      h = a.wrappers.Node,
      i = a.ParentNodeInterface,
      j = a.SelectorsInterface,
      k = ( a.addWrapNodeListMethod, a.enqueueMutation ),
      l = a.mixin,
      m = ( a.oneOf, a.registerWrapper ),
      n = a.wrappers,
      o = window.Element,
      p = [ "matches", "mozMatchesSelector", "msMatchesSelector", "webkitMatchesSelector" ].filter( function ( a ) {
        return o.prototype[ a ]
      } ),
      q = p[ 0 ],
      r = o.prototype[ q ];
    d.prototype = Object.create( h.prototype ), l( d.prototype, {
      createShadowRoot: function () {
        var b = new n.ShadowRoot( this );
        this.impl.polymerShadowRoot_ = b;
        var c = a.getRendererForHost( this );
        return c.invalidate(), b
      },
      get shadowRoot() {
        return this.impl.polymerShadowRoot_ || null
      },
      setAttribute: function ( a, d ) {
        var e = this.impl.getAttribute( a );
        this.impl.setAttribute( a, d ), c( this, a, e ), b( this, a )
      },
      removeAttribute: function ( a ) {
        var d = this.impl.getAttribute( a );
        this.impl.removeAttribute( a ), c( this, a, d ), b( this, a )
      },
      matches: function ( a ) {
        return r.call( this.impl, a )
      }
    } ), p.forEach( function ( a ) {
      "matches" !== a && ( d.prototype[ a ] = function ( a ) {
        return this.matches( a )
      } )
    } ), o.prototype.webkitCreateShadowRoot && ( d.prototype.webkitCreateShadowRoot = d.prototype.createShadowRoot ), e( d.prototype, "id" ), e( d.prototype, "className", "class" ), l( d.prototype, f ), l( d.prototype, g ), l( d.prototype, i ), l( d.prototype, j ), m( o, d, document.createElementNS( null, "x" ) ), a.matchesNames = p, a.wrappers.Element = d
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      switch ( a ) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case " ":
          return "&nbsp;"
      }
    }

    function c( a ) {
      return a.replace( z, b )
    }

    function d( a ) {
      return a.replace( A, b )
    }

    function e( a ) {
      for ( var b = {}, c = 0; c < a.length; c++ ) b[ a[ c ] ] = !0;
      return b
    }

    function f( a, b ) {
      switch ( a.nodeType ) {
        case Node.ELEMENT_NODE:
          for ( var e, f = a.tagName.toLowerCase(), h = "<" + f, i = a.attributes, j = 0; e = i[ j ]; j++ ) h += " " + e.name + '="' + c( e.value ) + '"';
          return h += ">", B[ f ] ? h : h + g( a ) + "</" + f + ">";
        case Node.TEXT_NODE:
          var k = a.data;
          return b && C[ b.localName ] ? k : d( k );
        case Node.COMMENT_NODE:
          return "<!--" + a.data + "-->";
        default:
          throw console.error( a ), new Error( "not implemented" )
      }
    }

    function g( a ) {
      a instanceof y.HTMLTemplateElement && ( a = a.content );
      for ( var b = "", c = a.firstChild; c; c = c.nextSibling ) b += f( c, a );
      return b
    }

    function h( a, b, c ) {
      var d = c || "div";
      a.textContent = "";
      var e = w( a.ownerDocument.createElement( d ) );
      e.innerHTML = b;
      for ( var f; f = e.firstChild; ) a.appendChild( x( f ) )
    }

    function i( a ) {
      o.call( this, a )
    }

    function j( a, b ) {
      var c = w( a.cloneNode( !1 ) );
      c.innerHTML = b;
      for ( var d, e = w( document.createDocumentFragment() ); d = c.firstChild; ) e.appendChild( d );
      return x( e )
    }

    function k( b ) {
      return function () {
        return a.renderAllPending(), this.impl[ b ]
      }
    }

    function l( a ) {
      p( i, a, k( a ) )
    }

    function m( b ) {
      Object.defineProperty( i.prototype, b, {
        get: k( b ),
        set: function ( c ) {
          a.renderAllPending(), this.impl[ b ] = c
        },
        configurable: !0,
        enumerable: !0
      } )
    }

    function n( b ) {
      Object.defineProperty( i.prototype, b, {
        value: function () {
          return a.renderAllPending(), this.impl[ b ].apply( this.impl, arguments )
        },
        configurable: !0,
        enumerable: !0
      } )
    }
    var o = a.wrappers.Element,
      p = a.defineGetter,
      q = a.enqueueMutation,
      r = a.mixin,
      s = a.nodesWereAdded,
      t = a.nodesWereRemoved,
      u = a.registerWrapper,
      v = a.snapshotNodeList,
      w = a.unwrap,
      x = a.wrap,
      y = a.wrappers,
      z = /[&\u00A0"]/g,
      A = /[&\u00A0<>]/g,
      B = e( [ "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr" ] ),
      C = e( [ "style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript" ] ),
      D = /MSIE/.test( navigator.userAgent ),
      E = window.HTMLElement,
      F = window.HTMLTemplateElement;
    i.prototype = Object.create( o.prototype ), r( i.prototype, {
      get innerHTML() {
        return g( this )
      },
      set innerHTML( a ) {
        if ( D && C[ this.localName ] ) return void( this.textContent = a );
        var b = v( this.childNodes );
        this.invalidateShadowRenderer() ? this instanceof y.HTMLTemplateElement ? h( this.content, a ) : h( this, a, this.tagName ) : !F && this instanceof y.HTMLTemplateElement ? h( this.content, a ) : this.impl.innerHTML = a;
        var c = v( this.childNodes );
        q( this, "childList", {
          addedNodes: c,
          removedNodes: b
        } ), t( b ), s( c, this )
      },
      get outerHTML() {
        return f( this, this.parentNode )
      },
      set outerHTML( a ) {
        var b = this.parentNode;
        if ( b ) {
          b.invalidateShadowRenderer();
          var c = j( b, a );
          b.replaceChild( c, this )
        }
      },
      insertAdjacentHTML: function ( a, b ) {
        var c, d;
        switch ( String( a ).toLowerCase() ) {
          case "beforebegin":
            c = this.parentNode, d = this;
            break;
          case "afterend":
            c = this.parentNode, d = this.nextSibling;
            break;
          case "afterbegin":
            c = this, d = this.firstChild;
            break;
          case "beforeend":
            c = this, d = null;
            break;
          default:
            return
        }
        var e = j( c, b );
        c.insertBefore( e, d )
      }
    } ), [ "clientHeight", "clientLeft", "clientTop", "clientWidth", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollWidth" ].forEach( l ), [ "scrollLeft", "scrollTop" ].forEach( m ), [ "getBoundingClientRect", "getClientRects", "scrollIntoView" ].forEach( n ), u( E, i, document.createElement( "b" ) ), a.wrappers.HTMLElement = i, a.getInnerHTML = g, a.setInnerHTML = h
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.wrap,
      g = window.HTMLCanvasElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      getContext: function () {
        var a = this.impl.getContext.apply( this.impl, arguments );
        return a && f( a )
      }
    } ), e( g, b, document.createElement( "canvas" ) ), a.wrappers.HTMLCanvasElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = window.HTMLContentElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      get select() {
        return this.getAttribute( "select" )
      },
      set select( a ) {
        this.setAttribute( "select", a )
      },
      setAttribute: function ( a, b ) {
        c.prototype.setAttribute.call( this, a, b ), "select" === String( a ).toLowerCase() && this.invalidateShadowRenderer( !0 )
      }
    } ), f && e( f, b ), a.wrappers.HTMLContentElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      d.call( this, a )
    }

    function c( a, b ) {
      if ( !( this instanceof c ) ) throw new TypeError( "DOM object constructor cannot be called as a function." );
      var e = f( document.createElement( "img" ) );
      d.call( this, e ), g( e, this ), void 0 !== a && ( e.width = a ), void 0 !== b && ( e.height = b )
    }
    var d = a.wrappers.HTMLElement,
      e = a.registerWrapper,
      f = a.unwrap,
      g = a.rewrap,
      h = window.HTMLImageElement;
    b.prototype = Object.create( d.prototype ), e( h, b, document.createElement( "img" ) ), c.prototype = b.prototype, a.wrappers.HTMLImageElement = b, a.wrappers.Image = c
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = window.HTMLShadowElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {} ), f && e( f, b ), a.wrappers.HTMLShadowElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      if ( !a.defaultView ) return a;
      var b = k.get( a );
      if ( !b ) {
        for ( b = a.implementation.createHTMLDocument( "" ); b.lastChild; ) b.removeChild( b.lastChild );
        k.set( a, b )
      }
      return b
    }

    function c( a ) {
      for ( var c, d = b( a.ownerDocument ), e = h( d.createDocumentFragment() ); c = a.firstChild; ) e.appendChild( c );
      return e
    }

    function d( a ) {
      if ( e.call( this, a ), !l ) {
        var b = c( a );
        j.set( this, i( b ) )
      }
    }
    var e = a.wrappers.HTMLElement,
      f = a.mixin,
      g = a.registerWrapper,
      h = a.unwrap,
      i = a.wrap,
      j = new WeakMap,
      k = new WeakMap,
      l = window.HTMLTemplateElement;
    d.prototype = Object.create( e.prototype ), f( d.prototype, {
      get content() {
        return l ? i( this.impl.content ) : j.get( this )
      }
    } ), l && g( l, d ), a.wrappers.HTMLTemplateElement = d
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.registerWrapper,
      e = window.HTMLMediaElement;
    b.prototype = Object.create( c.prototype ), d( e, b, document.createElement( "audio" ) ), a.wrappers.HTMLMediaElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      d.call( this, a )
    }

    function c( a ) {
      if ( !( this instanceof c ) ) throw new TypeError( "DOM object constructor cannot be called as a function." );
      var b = f( document.createElement( "audio" ) );
      d.call( this, b ), g( b, this ), b.setAttribute( "preload", "auto" ), void 0 !== a && b.setAttribute( "src", a )
    }
    var d = a.wrappers.HTMLMediaElement,
      e = a.registerWrapper,
      f = a.unwrap,
      g = a.rewrap,
      h = window.HTMLAudioElement;
    b.prototype = Object.create( d.prototype ), e( h, b, document.createElement( "audio" ) ), c.prototype = b.prototype, a.wrappers.HTMLAudioElement = b, a.wrappers.Audio = c
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      return a.replace( /\s+/g, " " ).trim()
    }

    function c( a ) {
      e.call( this, a )
    }

    function d( a, b, c, f ) {
      if ( !( this instanceof d ) ) throw new TypeError( "DOM object constructor cannot be called as a function." );
      var g = i( document.createElement( "option" ) );
      e.call( this, g ), h( g, this ), void 0 !== a && ( g.text = a ), void 0 !== b && g.setAttribute( "value", b ), c === !0 && g.setAttribute( "selected", "" ), g.selected = f === !0
    }
    var e = a.wrappers.HTMLElement,
      f = a.mixin,
      g = a.registerWrapper,
      h = a.rewrap,
      i = a.unwrap,
      j = a.wrap,
      k = window.HTMLOptionElement;
    c.prototype = Object.create( e.prototype ), f( c.prototype, {
      get text() {
        return b( this.textContent )
      },
      set text( a ) {
        this.textContent = b( String( a ) )
      },
      get form() {
        return j( i( this ).form )
      }
    } ), g( k, c, document.createElement( "option" ) ), d.prototype = c.prototype, a.wrappers.HTMLOptionElement = c, a.wrappers.Option = d
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.unwrap,
      g = a.wrap,
      h = window.HTMLSelectElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      add: function ( a, b ) {
        "object" == typeof b && ( b = f( b ) ), f( this ).add( f( a ), b )
      },
      remove: function ( a ) {
        return void 0 === a ? void c.prototype.remove.call( this ) : ( "object" == typeof a && ( a = f( a ) ), void f( this ).remove( a ) )
      },
      get form() {
        return g( f( this ).form )
      }
    } ), e( h, b, document.createElement( "select" ) ), a.wrappers.HTMLSelectElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.unwrap,
      g = a.wrap,
      h = a.wrapHTMLCollection,
      i = window.HTMLTableElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      get caption() {
        return g( f( this ).caption )
      },
      createCaption: function () {
        return g( f( this ).createCaption() )
      },
      get tHead() {
        return g( f( this ).tHead )
      },
      createTHead: function () {
        return g( f( this ).createTHead() )
      },
      createTFoot: function () {
        return g( f( this ).createTFoot() )
      },
      get tFoot() {
        return g( f( this ).tFoot )
      },
      get tBodies() {
        return h( f( this ).tBodies )
      },
      createTBody: function () {
        return g( f( this ).createTBody() )
      },
      get rows() {
        return h( f( this ).rows )
      },
      insertRow: function ( a ) {
        return g( f( this ).insertRow( a ) )
      }
    } ), e( i, b, document.createElement( "table" ) ), a.wrappers.HTMLTableElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.wrapHTMLCollection,
      g = a.unwrap,
      h = a.wrap,
      i = window.HTMLTableSectionElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      get rows() {
        return f( g( this ).rows )
      },
      insertRow: function ( a ) {
        return h( g( this ).insertRow( a ) )
      }
    } ), e( i, b, document.createElement( "thead" ) ), a.wrappers.HTMLTableSectionElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.HTMLElement,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.wrapHTMLCollection,
      g = a.unwrap,
      h = a.wrap,
      i = window.HTMLTableRowElement;
    b.prototype = Object.create( c.prototype ), d( b.prototype, {
      get cells() {
        return f( g( this ).cells )
      },
      insertCell: function ( a ) {
        return h( g( this ).insertCell( a ) )
      }
    } ), e( i, b, document.createElement( "tr" ) ), a.wrappers.HTMLTableRowElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      switch ( a.localName ) {
        case "content":
          return new c( a );
        case "shadow":
          return new e( a );
        case "template":
          return new f( a )
      }
      d.call( this, a )
    }
    var c = a.wrappers.HTMLContentElement,
      d = a.wrappers.HTMLElement,
      e = a.wrappers.HTMLShadowElement,
      f = a.wrappers.HTMLTemplateElement,
      g = ( a.mixin, a.registerWrapper ),
      h = window.HTMLUnknownElement;
    b.prototype = Object.create( d.prototype ), g( h, b ), a.wrappers.HTMLUnknownElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";
    var b = a.registerObject,
      c = "http://www.w3.org/2000/svg",
      d = document.createElementNS( c, "title" ),
      e = b( d ),
      f = Object.getPrototypeOf( e.prototype ).constructor;
    a.wrappers.SVGElement = f
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      m.call( this, a )
    }
    var c = a.mixin,
      d = a.registerWrapper,
      e = a.unwrap,
      f = a.wrap,
      g = window.SVGUseElement,
      h = "http://www.w3.org/2000/svg",
      i = f( document.createElementNS( h, "g" ) ),
      j = document.createElementNS( h, "use" ),
      k = i.constructor,
      l = Object.getPrototypeOf( k.prototype ),
      m = l.constructor;
    b.prototype = Object.create( l ), "instanceRoot" in j && c( b.prototype, {
      get instanceRoot() {
        return f( e( this ).instanceRoot )
      },
      get animatedInstanceRoot() {
        return f( e( this ).animatedInstanceRoot )
      }
    } ), d( g, b, j ), a.wrappers.SVGUseElement = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.EventTarget,
      d = a.mixin,
      e = a.registerWrapper,
      f = a.wrap,
      g = window.SVGElementInstance;
    g && ( b.prototype = Object.create( c.prototype ), d( b.prototype, {
      get correspondingElement() {
        return f( this.impl.correspondingElement )
      },
      get correspondingUseElement() {
        return f( this.impl.correspondingUseElement )
      },
      get parentNode() {
        return f( this.impl.parentNode )
      },
      get childNodes() {
        throw new Error( "Not implemented" )
      },
      get firstChild() {
        return f( this.impl.firstChild )
      },
      get lastChild() {
        return f( this.impl.lastChild )
      },
      get previousSibling() {
        return f( this.impl.previousSibling )
      },
      get nextSibling() {
        return f( this.impl.nextSibling )
      }
    } ), e( g, b ), a.wrappers.SVGElementInstance = b )
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      this.impl = a
    }
    var c = a.mixin,
      d = a.registerWrapper,
      e = a.unwrap,
      f = a.unwrapIfNeeded,
      g = a.wrap,
      h = window.CanvasRenderingContext2D;
    c( b.prototype, {
      get canvas() {
        return g( this.impl.canvas )
      },
      drawImage: function () {
        arguments[ 0 ] = f( arguments[ 0 ] ), this.impl.drawImage.apply( this.impl, arguments )
      },
      createPattern: function () {
        return arguments[ 0 ] = e( arguments[ 0 ] ), this.impl.createPattern.apply( this.impl, arguments )
      }
    } ), d( h, b, document.createElement( "canvas" ).getContext( "2d" ) ), a.wrappers.CanvasRenderingContext2D = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      this.impl = a
    }
    var c = a.mixin,
      d = a.registerWrapper,
      e = a.unwrapIfNeeded,
      f = a.wrap,
      g = window.WebGLRenderingContext;
    if ( g ) {
      c( b.prototype, {
        get canvas() {
          return f( this.impl.canvas )
        },
        texImage2D: function () {
          arguments[ 5 ] = e( arguments[ 5 ] ), this.impl.texImage2D.apply( this.impl, arguments )
        },
        texSubImage2D: function () {
          arguments[ 6 ] = e( arguments[ 6 ] ), this.impl.texSubImage2D.apply( this.impl, arguments )
        }
      } );
      var h = /WebKit/.test( navigator.userAgent ) ? {
        drawingBufferHeight: null,
        drawingBufferWidth: null
      } : {};
      d( g, b, h ), a.wrappers.WebGLRenderingContext = b
    }
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      this.impl = a
    }
    var c = a.registerWrapper,
      d = a.unwrap,
      e = a.unwrapIfNeeded,
      f = a.wrap,
      g = window.Range;
    b.prototype = {
      get startContainer() {
        return f( this.impl.startContainer )
      },
      get endContainer() {
        return f( this.impl.endContainer )
      },
      get commonAncestorContainer() {
        return f( this.impl.commonAncestorContainer )
      },
      setStart: function ( a, b ) {
        this.impl.setStart( e( a ), b )
      },
      setEnd: function ( a, b ) {
        this.impl.setEnd( e( a ), b )
      },
      setStartBefore: function ( a ) {
        this.impl.setStartBefore( e( a ) )
      },
      setStartAfter: function ( a ) {
        this.impl.setStartAfter( e( a ) )
      },
      setEndBefore: function ( a ) {
        this.impl.setEndBefore( e( a ) )
      },
      setEndAfter: function ( a ) {
        this.impl.setEndAfter( e( a ) )
      },
      selectNode: function ( a ) {
        this.impl.selectNode( e( a ) )
      },
      selectNodeContents: function ( a ) {
        this.impl.selectNodeContents( e( a ) )
      },
      compareBoundaryPoints: function ( a, b ) {
        return this.impl.compareBoundaryPoints( a, d( b ) )
      },
      extractContents: function () {
        return f( this.impl.extractContents() )
      },
      cloneContents: function () {
        return f( this.impl.cloneContents() )
      },
      insertNode: function ( a ) {
        this.impl.insertNode( e( a ) )
      },
      surroundContents: function ( a ) {
        this.impl.surroundContents( e( a ) )
      },
      cloneRange: function () {
        return f( this.impl.cloneRange() )
      },
      isPointInRange: function ( a, b ) {
        return this.impl.isPointInRange( e( a ), b )
      },
      comparePoint: function ( a, b ) {
        return this.impl.comparePoint( e( a ), b )
      },
      intersectsNode: function ( a ) {
        return this.impl.intersectsNode( e( a ) )
      },
      toString: function () {
        return this.impl.toString()
      }
    }, g.prototype.createContextualFragment && ( b.prototype.createContextualFragment = function ( a ) {
      return f( this.impl.createContextualFragment( a ) )
    } ), c( window.Range, b, document.createRange() ), a.wrappers.Range = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";
    var b = a.GetElementsByInterface,
      c = a.ParentNodeInterface,
      d = a.SelectorsInterface,
      e = a.mixin,
      f = a.registerObject,
      g = f( document.createDocumentFragment() );
    e( g.prototype, c ), e( g.prototype, d ), e( g.prototype, b );
    var h = f( document.createComment( "" ) );
    a.wrappers.Comment = h, a.wrappers.DocumentFragment = g
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      var b = k( a.impl.ownerDocument.createDocumentFragment() );
      c.call( this, b ), i( b, this ), this.treeScope_ = new d( this, g( a ) );
      var e = a.shadowRoot;
      m.set( this, e ), l.set( this, a )
    }
    var c = a.wrappers.DocumentFragment,
      d = a.TreeScope,
      e = a.elementFromPoint,
      f = a.getInnerHTML,
      g = a.getTreeScope,
      h = a.mixin,
      i = a.rewrap,
      j = a.setInnerHTML,
      k = a.unwrap,
      l = new WeakMap,
      m = new WeakMap,
      n = /[ \t\n\r\f]/;
    b.prototype = Object.create( c.prototype ), h( b.prototype, {
      get innerHTML() {
        return f( this )
      },
      set innerHTML( a ) {
        j( this, a ), this.invalidateShadowRenderer()
      },
      get olderShadowRoot() {
        return m.get( this ) || null
      },
      get host() {
        return l.get( this ) || null
      },
      invalidateShadowRenderer: function () {
        return l.get( this ).invalidateShadowRenderer()
      },
      elementFromPoint: function ( a, b ) {
        return e( this, this.ownerDocument, a, b )
      },
      getElementById: function ( a ) {
        return n.test( a ) ? null : this.querySelector( '[id="' + a + '"]' )
      }
    } ), a.wrappers.ShadowRoot = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      a.previousSibling_ = a.previousSibling, a.nextSibling_ = a.nextSibling, a.parentNode_ = a.parentNode
    }

    function c( a, c, e ) {
      var f = G( a ),
        g = G( c ),
        h = e ? G( e ) : null;
      if ( d( c ), b( c ), e ) a.firstChild === e && ( a.firstChild_ = e ), e.previousSibling_ = e.previousSibling;
      else {
        a.lastChild_ = a.lastChild, a.lastChild === a.firstChild && ( a.firstChild_ = a.firstChild );
        var i = H( f.lastChild );
        i && ( i.nextSibling_ = i.nextSibling )
      }
      f.insertBefore( g, h )
    }

    function d( a ) {
      var c = G( a ),
        d = c.parentNode;
      if ( d ) {
        var e = H( d );
        b( a ), a.previousSibling && ( a.previousSibling.nextSibling_ = a ), a.nextSibling && ( a.nextSibling.previousSibling_ = a ), e.lastChild === a && ( e.lastChild_ = a ), e.firstChild === a && ( e.firstChild_ = a ), d.removeChild( c )
      }
    }

    function e( a, b ) {
      g( b ).push( a ), x( a, b );
      var c = J.get( a );
      c || J.set( a, c = [] ), c.push( b )
    }

    function f( a ) {
      I.set( a, [] )
    }

    function g( a ) {
      var b = I.get( a );
      return b || I.set( a, b = [] ), b
    }

    function h( a ) {
      for ( var b = [], c = 0, d = a.firstChild; d; d = d.nextSibling ) b[ c++ ] = d;
      return b
    }

    function i( a, b, c ) {
      for ( var d = a.firstChild; d; d = d.nextSibling )
        if ( b( d ) ) {
          if ( c( d ) === !1 ) return
        } else i( d, b, c )
    }

    function j( a, b ) {
      var c = b.getAttribute( "select" );
      if ( !c ) return !0;
      if ( c = c.trim(), !c ) return !0;
      if ( !( a instanceof z ) ) return !1;
      if ( "*" === c || c === a.localName ) return !0;
      if ( !M.test( c ) ) return !1;
      if ( ":" === c[ 0 ] && !N.test( c ) ) return !1;
      try {
        return a.matches( c )
      } catch ( d ) {
        return !1
      }
    }

    function k() {
      for ( var a = 0; a < P.length; a++ ) {
        var b = P[ a ],
          c = b.parentRenderer;
        c && c.dirty || b.render()
      }
      P = []
    }

    function l() {
      y = null, k()
    }

    function m( a ) {
      var b = L.get( a );
      return b || ( b = new q( a ), L.set( a, b ) ), b
    }

    function n( a ) {
      var b = E( a ).root;
      return b instanceof D ? b : null
    }

    function o( a ) {
      return m( a.host )
    }

    function p( a ) {
      this.skip = !1, this.node = a, this.childNodes = []
    }

    function q( a ) {
      this.host = a, this.dirty = !1, this.invalidateAttributes(), this.associateNode( a )
    }

    function r( a ) {
      return a instanceof A
    }

    function s( a ) {
      return a instanceof A
    }

    function t( a ) {
      return a instanceof B
    }

    function u( a ) {
      return a instanceof B
    }

    function v( a ) {
      return a.shadowRoot
    }

    function w( a ) {
      for ( var b = [], c = a.shadowRoot; c; c = c.olderShadowRoot ) b.push( c );
      return b
    }

    function x( a, b ) {
      K.set( a, b )
    }
    var y, z = a.wrappers.Element,
      A = a.wrappers.HTMLContentElement,
      B = a.wrappers.HTMLShadowElement,
      C = a.wrappers.Node,
      D = a.wrappers.ShadowRoot,
      E = ( a.assert, a.getTreeScope ),
      F = ( a.mixin, a.oneOf ),
      G = a.unwrap,
      H = a.wrap,
      I = new WeakMap,
      J = new WeakMap,
      K = new WeakMap,
      L = new WeakMap,
      M = /^[*.:#[a-zA-Z_|]/,
      N = new RegExp( "^:(" + [ "link", "visited", "target", "enabled", "disabled", "checked", "indeterminate", "nth-child", "nth-last-child", "nth-of-type", "nth-last-of-type", "first-child", "last-child", "first-of-type", "last-of-type", "only-of-type" ].join( "|" ) + ")" ),
      O = F( window, [ "requestAnimationFrame", "mozRequestAnimationFrame", "webkitRequestAnimationFrame", "setTimeout" ] ),
      P = [],
      Q = new ArraySplice;
    Q.equals = function ( a, b ) {
      return G( a.node ) === b
    }, p.prototype = {
      append: function ( a ) {
        var b = new p( a );
        return this.childNodes.push( b ), b
      },
      sync: function ( a ) {
        if ( !this.skip ) {
          for ( var b = this.node, e = this.childNodes, f = h( G( b ) ), g = a || new WeakMap, i = Q.calculateSplices( e, f ), j = 0, k = 0, l = 0, m = 0; m < i.length; m++ ) {
            for ( var n = i[ m ]; l < n.index; l++ ) k++, e[ j++ ].sync( g );
            for ( var o = n.removed.length, p = 0; o > p; p++ ) {
              var q = H( f[ k++ ] );
              g.get( q ) || d( q )
            }
            for ( var r = n.addedCount, s = f[ k ] && H( f[ k ] ), p = 0; r > p; p++ ) {
              var t = e[ j++ ],
                u = t.node;
              c( b, u, s ), g.set( u, !0 ), t.sync( g )
            }
            l += r
          }
          for ( var m = l; m < e.length; m++ ) e[ m ].sync( g )
        }
      }
    }, q.prototype = {
      render: function ( a ) {
        if ( this.dirty ) {
          this.invalidateAttributes(), this.treeComposition();
          var b = this.host,
            c = b.shadowRoot;
          this.associateNode( b );
          for ( var d = !e, e = a || new p( b ), f = c.firstChild; f; f = f.nextSibling ) this.renderNode( c, e, f, !1 );
          d && e.sync(), this.dirty = !1
        }
      },
      get parentRenderer() {
        return E( this.host ).renderer
      },
      invalidate: function () {
        if ( !this.dirty ) {
          if ( this.dirty = !0, P.push( this ), y ) return;
          y = window[ O ]( l, 0 )
        }
      },
      renderNode: function ( a, b, c, d ) {
        if ( v( c ) ) {
          b = b.append( c );
          var e = m( c );
          e.dirty = !0, e.render( b )
        } else r( c ) ? this.renderInsertionPoint( a, b, c, d ) : t( c ) ? this.renderShadowInsertionPoint( a, b, c ) : this.renderAsAnyDomTree( a, b, c, d )
      },
      renderAsAnyDomTree: function ( a, b, c, d ) {
        if ( b = b.append( c ), v( c ) ) {
          var e = m( c );
          b.skip = !e.dirty, e.render( b )
        } else
          for ( var f = c.firstChild; f; f = f.nextSibling ) this.renderNode( a, b, f, d )
      },
      renderInsertionPoint: function ( a, b, c, d ) {
        var e = g( c );
        if ( e.length ) {
          this.associateNode( c );
          for ( var f = 0; f < e.length; f++ ) {
            var h = e[ f ];
            r( h ) && d ? this.renderInsertionPoint( a, b, h, d ) : this.renderAsAnyDomTree( a, b, h, d )
          }
        } else this.renderFallbackContent( a, b, c );
        this.associateNode( c.parentNode )
      },
      renderShadowInsertionPoint: function ( a, b, c ) {
        var d = a.olderShadowRoot;
        if ( d ) {
          x( d, c ), this.associateNode( c.parentNode );
          for ( var e = d.firstChild; e; e = e.nextSibling ) this.renderNode( d, b, e, !0 )
        } else this.renderFallbackContent( a, b, c )
      },
      renderFallbackContent: function ( a, b, c ) {
        this.associateNode( c ), this.associateNode( c.parentNode );
        for ( var d = c.firstChild; d; d = d.nextSibling ) this.renderAsAnyDomTree( a, b, d, !1 )
      },
      invalidateAttributes: function () {
        this.attributes = Object.create( null )
      },
      updateDependentAttributes: function ( a ) {
        if ( a ) {
          var b = this.attributes;
          /\.\w+/.test( a ) && ( b[ "class" ] = !0 ), /#\w+/.test( a ) && ( b.id = !0 ), a.replace( /\[\s*([^\s=\|~\]]+)/g, function ( a, c ) {
            b[ c ] = !0
          } )
        }
      },
      dependsOnAttribute: function ( a ) {
        return this.attributes[ a ]
      },
      distribute: function ( a, b ) {
        var c = this;
        i( a, s, function ( a ) {
          f( a ), c.updateDependentAttributes( a.getAttribute( "select" ) );
          for ( var d = 0; d < b.length; d++ ) {
            var g = b[ d ];
            void 0 !== g && j( g, a ) && ( e( g, a ), b[ d ] = void 0 )
          }
        } )
      },
      treeComposition: function () {
        for ( var a = this.host, b = a.shadowRoot, c = [], d = a.firstChild; d; d = d.nextSibling )
          if ( r( d ) ) {
            var e = g( d );
            e && e.length || ( e = h( d ) ), c.push.apply( c, e )
          } else c.push( d );
        for ( var f, j; b; ) {
          if ( f = void 0, i( b, u, function ( a ) {
              return f = a, !1
            } ), j = f, this.distribute( b, c ), j ) {
            var k = b.olderShadowRoot;
            if ( k ) {
              b = k, x( b, j );
              continue
            }
            break
          }
          break
        }
      },
      associateNode: function ( a ) {
        a.impl.polymerShadowRenderer_ = this
      }
    }, C.prototype.invalidateShadowRenderer = function () {
      var a = this.impl.polymerShadowRenderer_;
      return a ? ( a.invalidate(), !0 ) : !1
    }, A.prototype.getDistributedNodes = function () {
      return k(), g( this )
    }, B.prototype.nodeIsInserted_ = A.prototype.nodeIsInserted_ = function () {
      this.invalidateShadowRenderer();
      var a, b = n( this );
      b && ( a = o( b ) ), this.impl.polymerShadowRenderer_ = a, a && a.invalidate()
    }, a.eventParentsTable = J, a.getRendererForHost = m, a.getShadowTrees = w, a.insertionParentTable = K, a.renderAllPending = k, a.visual = {
      insertBefore: c,
      remove: d
    }
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( b ) {
      if ( window[ b ] ) {
        d( !a.wrappers[ b ] );
        var i = function ( a ) {
          c.call( this, a )
        };
        i.prototype = Object.create( c.prototype ), e( i.prototype, {
          get form() {
            return h( g( this ).form )
          }
        } ), f( window[ b ], i, document.createElement( b.slice( 4, -7 ) ) ), a.wrappers[ b ] = i
      }
    }
    var c = a.wrappers.HTMLElement,
      d = a.assert,
      e = a.mixin,
      f = a.registerWrapper,
      g = a.unwrap,
      h = a.wrap,
      i = [ "HTMLButtonElement", "HTMLFieldSetElement", "HTMLInputElement", "HTMLKeygenElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLObjectElement", "HTMLOutputElement", "HTMLTextAreaElement" ];
    i.forEach( b )
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      this.impl = a
    } {
      var c = a.registerWrapper,
        d = a.unwrap,
        e = a.unwrapIfNeeded,
        f = a.wrap;
      window.Selection
    }
    b.prototype = {
      get anchorNode() {
        return f( this.impl.anchorNode )
      },
      get focusNode() {
        return f( this.impl.focusNode )
      },
      addRange: function ( a ) {
        this.impl.addRange( d( a ) )
      },
      collapse: function ( a, b ) {
        this.impl.collapse( e( a ), b )
      },
      containsNode: function ( a, b ) {
        return this.impl.containsNode( e( a ), b )
      },
      extend: function ( a, b ) {
        this.impl.extend( e( a ), b )
      },
      getRangeAt: function ( a ) {
        return f( this.impl.getRangeAt( a ) )
      },
      removeRange: function ( a ) {
        this.impl.removeRange( d( a ) )
      },
      selectAllChildren: function ( a ) {
        this.impl.selectAllChildren( e( a ) )
      },
      toString: function () {
        return this.impl.toString()
      }
    }, c( window.Selection, b, window.getSelection() ), a.wrappers.Selection = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      k.call( this, a ), this.treeScope_ = new p( this, null )
    }

    function c( a ) {
      var c = document[ a ];
      b.prototype[ a ] = function () {
        return A( c.apply( this.impl, arguments ) )
      }
    }

    function d( a, b ) {
      D.call( b.impl, z( a ) ), e( a, b )
    }

    function e( a, b ) {
      a.shadowRoot && b.adoptNode( a.shadowRoot ), a instanceof o && f( a, b );
      for ( var c = a.firstChild; c; c = c.nextSibling ) e( c, b )
    }

    function f( a, b ) {
      var c = a.olderShadowRoot;
      c && b.adoptNode( c )
    }

    function g( a ) {
      this.impl = a
    }

    function h( a, b ) {
      var c = document.implementation[ b ];
      a.prototype[ b ] = function () {
        return A( c.apply( this.impl, arguments ) )
      }
    }

    function i( a, b ) {
      var c = document.implementation[ b ];
      a.prototype[ b ] = function () {
        return c.apply( this.impl, arguments )
      }
    }
    var j = a.GetElementsByInterface,
      k = a.wrappers.Node,
      l = a.ParentNodeInterface,
      m = a.wrappers.Selection,
      n = a.SelectorsInterface,
      o = a.wrappers.ShadowRoot,
      p = a.TreeScope,
      q = a.cloneNode,
      r = a.defineWrapGetter,
      s = a.elementFromPoint,
      t = a.forwardMethodsToWrapper,
      u = a.matchesNames,
      v = a.mixin,
      w = a.registerWrapper,
      x = a.renderAllPending,
      y = a.rewrap,
      z = a.unwrap,
      A = a.wrap,
      B = a.wrapEventTargetMethods,
      C = ( a.wrapNodeList, new WeakMap );
    b.prototype = Object.create( k.prototype ), r( b, "documentElement" ), r( b, "body" ), r( b, "head" ), [ "createComment", "createDocumentFragment", "createElement", "createElementNS", "createEvent", "createEventNS", "createRange", "createTextNode", "getElementById" ].forEach( c );
    var D = document.adoptNode,
      E = document.getSelection;
    if ( v( b.prototype, {
        adoptNode: function ( a ) {
          return a.parentNode && a.parentNode.removeChild( a ), d( a, this ), a
        },
        elementFromPoint: function ( a, b ) {
          return s( this, this, a, b )
        },
        importNode: function ( a, b ) {
          return q( a, b, this.impl )
        },
        getSelection: function () {
          return x(), new m( E.call( z( this ) ) )
        }
      } ), document.registerElement ) {
      var F = document.registerElement;
      b.prototype.registerElement = function ( b, c ) {
        function d( a ) {
          return a ? void( this.impl = a ) : f ? document.createElement( f, b ) : document.createElement( b )
        }
        var e, f;
        if ( void 0 !== c && ( e = c.prototype, f = c.extends ), e || ( e = Object.create( HTMLElement.prototype ) ), a.nativePrototypeTable.get( e ) ) throw new Error( "NotSupportedError" );
        for ( var g, h = Object.getPrototypeOf( e ), i = []; h && !( g = a.nativePrototypeTable.get( h ) ); ) i.push( h ), h = Object.getPrototypeOf( h );
        if ( !g ) throw new Error( "NotSupportedError" );
        for ( var j = Object.create( g ), k = i.length - 1; k >= 0; k-- ) j = Object.create( j );
        [ "createdCallback", "attachedCallback", "detachedCallback", "attributeChangedCallback" ].forEach( function ( a ) {
          var b = e[ a ];
          b && ( j[ a ] = function () {
            A( this ) instanceof d || y( this ), b.apply( A( this ), arguments )
          } )
        } );
        var l = {
          prototype: j
        };
        f && ( l.extends = f ), d.prototype = e, d.prototype.constructor = d, a.constructorTable.set( j, d ), a.nativePrototypeTable.set( e, j );
        F.call( z( this ), b, l );
        return d
      }, t( [ window.HTMLDocument || window.Document ], [ "registerElement" ] )
    }
    t( [ window.HTMLBodyElement, window.HTMLDocument || window.Document, window.HTMLHeadElement, window.HTMLHtmlElement ], [ "appendChild", "compareDocumentPosition", "contains", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "insertBefore", "querySelector", "querySelectorAll", "removeChild", "replaceChild" ].concat( u ) ), t( [ window.HTMLDocument || window.Document ], [ "adoptNode", "importNode", "contains", "createComment", "createDocumentFragment", "createElement", "createElementNS", "createEvent", "createEventNS", "createRange", "createTextNode", "elementFromPoint", "getElementById", "getSelection" ] ), v( b.prototype, j ), v( b.prototype, l ), v( b.prototype, n ), v( b.prototype, {
      get implementation() {
        var a = C.get( this );
        return a ? a : ( a = new g( z( this ).implementation ), C.set( this, a ), a )
      }
    } ), w( window.Document, b, document.implementation.createHTMLDocument( "" ) ), window.HTMLDocument && w( window.HTMLDocument, b ), B( [ window.HTMLBodyElement, window.HTMLDocument || window.Document, window.HTMLHeadElement ] ), h( g, "createDocumentType" ), h( g, "createDocument" ), h( g, "createHTMLDocument" ), i( g, "hasFeature" ), w( window.DOMImplementation, g ), t( [ window.DOMImplementation ], [ "createDocumentType", "createDocument", "createHTMLDocument", "hasFeature" ] ), a.adoptNodeNoRemove = d, a.wrappers.DOMImplementation = g, a.wrappers.Document = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      c.call( this, a )
    }
    var c = a.wrappers.EventTarget,
      d = a.wrappers.Selection,
      e = a.mixin,
      f = a.registerWrapper,
      g = a.renderAllPending,
      h = a.unwrap,
      i = a.unwrapIfNeeded,
      j = a.wrap,
      k = window.Window,
      l = window.getComputedStyle,
      m = window.getSelection;
    b.prototype = Object.create( c.prototype ), k.prototype.getComputedStyle = function ( a, b ) {
      return j( this || window ).getComputedStyle( i( a ), b )
    }, k.prototype.getSelection = function () {
      return j( this || window ).getSelection()
    }, delete window.getComputedStyle, delete window.getSelection, [ "addEventListener", "removeEventListener", "dispatchEvent" ].forEach( function ( a ) {
      k.prototype[ a ] = function () {
        var b = j( this || window );
        return b[ a ].apply( b, arguments )
      }, delete window[ a ]
    } ), e( b.prototype, {
      getComputedStyle: function ( a, b ) {
        return g(), l.call( h( this ), i( a ), b )
      },
      getSelection: function () {
        return g(), new d( m.call( h( this ) ) )
      }
    } ), f( k, b ), a.wrappers.Window = b
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";
    var b = a.unwrap,
      c = window.DataTransfer || window.Clipboard,
      d = c.prototype.setDragImage;
    c.prototype.setDragImage = function ( a, c, e ) {
      d.call( this, b( a ), c, e )
    }
  }( window.ShadowDOMPolyfill ), function ( a ) {
    "use strict";

    function b( a ) {
      var b = c[ a ],
        d = window[ b ];
      if ( d ) {
        var e = document.createElement( a ),
          f = e.constructor;
        window[ b ] = f
      }
    }
    var c = ( a.isWrapperFor, {
      a: "HTMLAnchorElement",
      area: "HTMLAreaElement",
      audio: "HTMLAudioElement",
      base: "HTMLBaseElement",
      body: "HTMLBodyElement",
      br: "HTMLBRElement",
      button: "HTMLButtonElement",
      canvas: "HTMLCanvasElement",
      caption: "HTMLTableCaptionElement",
      col: "HTMLTableColElement",
      content: "HTMLContentElement",
      data: "HTMLDataElement",
      datalist: "HTMLDataListElement",
      del: "HTMLModElement",
      dir: "HTMLDirectoryElement",
      div: "HTMLDivElement",
      dl: "HTMLDListElement",
      embed: "HTMLEmbedElement",
      fieldset: "HTMLFieldSetElement",
      font: "HTMLFontElement",
      form: "HTMLFormElement",
      frame: "HTMLFrameElement",
      frameset: "HTMLFrameSetElement",
      h1: "HTMLHeadingElement",
      head: "HTMLHeadElement",
      hr: "HTMLHRElement",
      html: "HTMLHtmlElement",
      iframe: "HTMLIFrameElement",
      img: "HTMLImageElement",
      input: "HTMLInputElement",
      keygen: "HTMLKeygenElement",
      label: "HTMLLabelElement",
      legend: "HTMLLegendElement",
      li: "HTMLLIElement",
      link: "HTMLLinkElement",
      map: "HTMLMapElement",
      marquee: "HTMLMarqueeElement",
      menu: "HTMLMenuElement",
      menuitem: "HTMLMenuItemElement",
      meta: "HTMLMetaElement",
      meter: "HTMLMeterElement",
      object: "HTMLObjectElement",
      ol: "HTMLOListElement",
      optgroup: "HTMLOptGroupElement",
      option: "HTMLOptionElement",
      output: "HTMLOutputElement",
      p: "HTMLParagraphElement",
      param: "HTMLParamElement",
      pre: "HTMLPreElement",
      progress: "HTMLProgressElement",
      q: "HTMLQuoteElement",
      script: "HTMLScriptElement",
      select: "HTMLSelectElement",
      shadow: "HTMLShadowElement",
      source: "HTMLSourceElement",
      span: "HTMLSpanElement",
      style: "HTMLStyleElement",
      table: "HTMLTableElement",
      tbody: "HTMLTableSectionElement",
      template: "HTMLTemplateElement",
      textarea: "HTMLTextAreaElement",
      thead: "HTMLTableSectionElement",
      time: "HTMLTimeElement",
      title: "HTMLTitleElement",
      tr: "HTMLTableRowElement",
      track: "HTMLTrackElement",
      ul: "HTMLUListElement",
      video: "HTMLVideoElement"
    } );
    Object.keys( c ).forEach( b ), Object.getOwnPropertyNames( a.wrappers ).forEach( function ( b ) {
      window[ b ] = a.wrappers[ b ]
    } )
  }( window.ShadowDOMPolyfill ), function () {
    window.wrap = ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = ShadowDOMPolyfill.unwrapIfNeeded, Object.defineProperty( Element.prototype, "webkitShadowRoot", Object.getOwnPropertyDescriptor( Element.prototype, "shadowRoot" ) );
    var a = Element.prototype.createShadowRoot;
    Element.prototype.createShadowRoot = function () {
      var b = a.call( this );
      return CustomElements.watchShadow( this ), b
    }, Element.prototype.webkitCreateShadowRoot = Element.prototype.createShadowRoot
  }(), function ( a ) {
    function b( a, b ) {
      var c = "";
      return Array.prototype.forEach.call( a, function ( a ) {
        c += a.textContent + "\n\n"
      } ), b || ( c = c.replace( l, "" ) ), c
    }

    function c( a ) {
      var b = document.createElement( "style" );
      return b.textContent = a, b
    }

    function d( a ) {
      var b = c( a );
      document.head.appendChild( b );
      var d = [];
      if ( b.sheet ) try {
        d = b.sheet.cssRules
      } catch ( e ) {} else console.warn( "sheet not found", b );
      return b.parentNode.removeChild( b ), d
    }

    function e() {
      v.initialized = !0, document.body.appendChild( v );
      var a = v.contentDocument,
        b = a.createElement( "base" );
      b.href = document.baseURI, a.head.appendChild( b )
    }

    function f( a ) {
      v.initialized || e(), document.body.appendChild( v ), a( v.contentDocument ), document.body.removeChild( v )
    }

    function g( a, b ) {
      if ( b ) {
        var e;
        if ( a.match( "@import" ) && x ) {
          var g = c( a );
          f( function ( a ) {
            a.head.appendChild( g.impl ), e = g.sheet.cssRules, b( e )
          } )
        } else e = d( a ), b( e )
      }
    }

    function h( a ) {
      a && j().appendChild( document.createTextNode( a ) )
    }

    function i( a, b ) {
      var d = c( a );
      d.setAttribute( b, "" ), d.setAttribute( z, "" ), document.head.appendChild( d )
    }

    function j() {
      return w || ( w = document.createElement( "style" ), w.setAttribute( z, "" ), w[ z ] = !0 ), w
    }
    var k = {
        strictStyling: !1,
        registry: {},
        shimStyling: function ( a, c, d ) {
          var e = this.prepareRoot( a, c, d ),
            f = this.isTypeExtension( d ),
            g = this.makeScopeSelector( c, f ),
            h = b( e, !0 );
          h = this.scopeCssText( h, g ), a && ( a.shimmedStyle = h ), this.addCssToDocument( h, c )
        },
        shimStyle: function ( a, b ) {
          return this.shimCssText( a.textContent, b )
        },
        shimCssText: function ( a, b ) {
          return a = this.insertDirectives( a ), this.scopeCssText( a, b )
        },
        makeScopeSelector: function ( a, b ) {
          return a ? b ? "[is=" + a + "]" : a : ""
        },
        isTypeExtension: function ( a ) {
          return a && a.indexOf( "-" ) < 0
        },
        prepareRoot: function ( a, b, c ) {
          var d = this.registerRoot( a, b, c );
          return this.replaceTextInStyles( d.rootStyles, this.insertDirectives ), this.removeStyles( a, d.rootStyles ), this.strictStyling && this.applyScopeToContent( a, b ), d.scopeStyles
        },
        removeStyles: function ( a, b ) {
          for ( var c, d = 0, e = b.length; e > d && ( c = b[ d ] ); d++ ) c.parentNode.removeChild( c )
        },
        registerRoot: function ( a, b, c ) {
          var d = this.registry[ b ] = {
              root: a,
              name: b,
              extendsName: c
            },
            e = this.findStyles( a );
          d.rootStyles = e, d.scopeStyles = d.rootStyles;
          var f = this.registry[ d.extendsName ];
          return f && ( d.scopeStyles = f.scopeStyles.concat( d.scopeStyles ) ), d
        },
        findStyles: function ( a ) {
          if ( !a ) return [];
          var b = a.querySelectorAll( "style" );
          return Array.prototype.filter.call( b, function ( a ) {
            return !a.hasAttribute( A )
          } )
        },
        applyScopeToContent: function ( a, b ) {
          a && ( Array.prototype.forEach.call( a.querySelectorAll( "*" ), function ( a ) {
            a.setAttribute( b, "" )
          } ), Array.prototype.forEach.call( a.querySelectorAll( "template" ), function ( a ) {
            this.applyScopeToContent( a.content, b )
          }, this ) )
        },
        insertDirectives: function ( a ) {
          return a = this.insertPolyfillDirectivesInCssText( a ), this.insertPolyfillRulesInCssText( a )
        },
        insertPolyfillDirectivesInCssText: function ( a ) {
          return a = a.replace( m, function ( a, b ) {
            return b.slice( 0, -2 ) + "{"
          } ), a.replace( n, function ( a, b ) {
            return b + " {"
          } )
        },
        insertPolyfillRulesInCssText: function ( a ) {
          return a = a.replace( o, function ( a, b ) {
            return b.slice( 0, -1 )
          } ), a.replace( p, function ( a, b, c, d ) {
            var e = a.replace( b, "" ).replace( c, "" );
            return d + e
          } )
        },
        scopeCssText: function ( a, b ) {
          var c = this.extractUnscopedRulesFromCssText( a );
          if ( a = this.insertPolyfillHostInCssText( a ), a = this.convertColonHost( a ), a = this.convertColonHostContext( a ), a = this.convertCombinators( a ), b ) {
            var a, d = this;
            g( a, function ( c ) {
              a = d.scopeRules( c, b )
            } )
          }
          return a = a + "\n" + c, a.trim()
        },
        extractUnscopedRulesFromCssText: function ( a ) {
          for ( var b, c = ""; b = q.exec( a ); ) c += b[ 1 ].slice( 0, -1 ) + "\n\n";
          for ( ; b = r.exec( a ); ) c += b[ 0 ].replace( b[ 2 ], "" ).replace( b[ 1 ], b[ 3 ] ) + "\n\n";
          return c
        },
        convertColonHost: function ( a ) {
          return this.convertColonRule( a, cssColonHostRe, this.colonHostPartReplacer )
        },
        convertColonHostContext: function ( a ) {
          return this.convertColonRule( a, cssColonHostContextRe, this.colonHostContextPartReplacer )
        },
        convertColonRule: function ( a, b, c ) {
          return a.replace( b, function ( a, b, d, e ) {
            if ( b = polyfillHostNoCombinator, d ) {
              for ( var f, g = d.split( "," ), h = [], i = 0, j = g.length; j > i && ( f = g[ i ] ); i++ ) f = f.trim(), h.push( c( b, f, e ) );
              return h.join( "," )
            }
            return b + e
          } )
        },
        colonHostContextPartReplacer: function ( a, b, c ) {
          return b.match( s ) ? this.colonHostPartReplacer( a, b, c ) : a + b + c + ", " + b + " " + a + c
        },
        colonHostPartReplacer: function ( a, b, c ) {
          return a + b.replace( s, "" ) + c
        },
        convertCombinators: function ( a ) {
          for ( var b = 0; b < combinatorsRe.length; b++ ) a = a.replace( combinatorsRe[ b ], " " );
          return a
        },
        scopeRules: function ( a, b ) {
          var c = "";
          return a && Array.prototype.forEach.call( a, function ( a ) {
            a.selectorText && a.style && a.style.cssText ? ( c += this.scopeSelector( a.selectorText, b, this.strictStyling ) + " {\n	", c += this.propertiesFromRule( a ) + "\n}\n\n" ) : a.type === CSSRule.MEDIA_RULE ? ( c += "@media " + a.media.mediaText + " {\n", c += this.scopeRules( a.cssRules, b ), c += "\n}\n\n" ) : a.cssText && ( c += a.cssText + "\n\n" )
          }, this ), c
        },
        scopeSelector: function ( a, b, c ) {
          var d = [],
            e = a.split( "," );
          return e.forEach( function ( a ) {
            a = a.trim(), this.selectorNeedsScoping( a, b ) && ( a = c && !a.match( polyfillHostNoCombinator ) ? this.applyStrictSelectorScope( a, b ) : this.applySelectorScope( a, b ) ), d.push( a )
          }, this ), d.join( ", " )
        },
        selectorNeedsScoping: function ( a, b ) {
          if ( Array.isArray( b ) ) return !0;
          var c = this.makeScopeMatcher( b );
          return !a.match( c )
        },
        makeScopeMatcher: function ( a ) {
          return a = a.replace( /\[/g, "\\[" ).replace( /\[/g, "\\]" ), new RegExp( "^(" + a + ")" + selectorReSuffix, "m" )
        },
        applySelectorScope: function ( a, b ) {
          return Array.isArray( b ) ? this.applySelectorScopeList( a, b ) : this.applySimpleSelectorScope( a, b )
        },
        applySelectorScopeList: function ( a, b ) {
          for ( var c, d = [], e = 0; c = b[ e ]; e++ ) d.push( this.applySimpleSelectorScope( a, c ) );
          return d.join( ", " )
        },
        applySimpleSelectorScope: function ( a, b ) {
          return a.match( polyfillHostRe ) ? ( a = a.replace( polyfillHostNoCombinator, b ), a.replace( polyfillHostRe, b + " " ) ) : b + " " + a
        },
        applyStrictSelectorScope: function ( a, b ) {
          b = b.replace( /\[is=([^\]]*)\]/g, "$1" );
          var c = [ " ", ">", "+", "~" ],
            d = a,
            e = "[" + b + "]";
          return c.forEach( function ( a ) {
            var b = d.split( a );
            d = b.map( function ( a ) {
              var b = a.trim().replace( polyfillHostRe, "" );
              return b && c.indexOf( b ) < 0 && b.indexOf( e ) < 0 && ( a = b.replace( /([^:]*)(:*)(.*)/, "$1" + e + "$2$3" ) ), a
            } ).join( a )
          } ), d
        },
        insertPolyfillHostInCssText: function ( a ) {
          return a.replace( colonHostContextRe, t ).replace( colonHostRe, s )
        },
        propertiesFromRule: function ( a ) {
          var b = a.style.cssText;
          a.style.content && !a.style.content.match( /['"]+|attr/ ) && ( b = b.replace( /content:[^;]*;/g, "content: '" + a.style.content + "';" ) );
          var c = a.style;
          for ( var d in c ) "initial" === c[ d ] && ( b += d + ": initial; " );
          return b
        },
        replaceTextInStyles: function ( a, b ) {
          a && b && ( a instanceof Array || ( a = [ a ] ), Array.prototype.forEach.call( a, function ( a ) {
            a.textContent = b.call( this, a.textContent )
          }, this ) )
        },
        addCssToDocument: function ( a, b ) {
          a.match( "@import" ) ? i( a, b ) : h( a )
        }
      },
      l = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      m = /\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,
      n = /polyfill-next-selector[^}]*content\:[\s]*'([^']*)'[^}]*}([^{]*?){/gim,
      o = /\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
      p = /(polyfill-rule)[^}]*(content\:[\s]*'([^']*)'[^;]*;)[^}]*}/gim,
      q = /\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
      r = /(polyfill-unscoped-rule)[^}]*(content\:[\s]*'([^']*)'[^;]*;)[^}]*}/gim,
      s = "-shadowcsshost",
      t = "-shadowcsscontext",
      u = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
    cssColonHostRe = new RegExp( "(" + s + u, "gim" ), cssColonHostContextRe = new RegExp( "(" + t + u, "gim" ), selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$", colonHostRe = /\:host/gim, colonHostContextRe = /\:host-context/gim, polyfillHostNoCombinator = s + "-no-combinator", polyfillHostRe = new RegExp( s, "gim" ), polyfillHostContextRe = new RegExp( t, "gim" ), combinatorsRe = [ /\^\^/g, /\^/g, /\/shadow\//g, /\/shadow-deep\//g, /::shadow/g, /\/deep\//g ];
    var v = document.createElement( "iframe" );
    v.style.display = "none";
    var w, x = navigator.userAgent.match( "Chrome" ),
      y = "shim-shadowdom",
      z = "shim-shadowdom-css",
      A = "no-shim";
    if ( window.ShadowDOMPolyfill ) {
      h( "style { display: none !important; }\n" );
      var B = wrap( document ),
        C = B.querySelector( "head" );
      C.insertBefore( j(), C.childNodes[ 0 ] ), document.addEventListener( "DOMContentLoaded", function () {
        var b = a.urlResolver;
        if ( window.HTMLImports && !HTMLImports.useNative ) {
          var c = "link[rel=stylesheet][" + y + "]",
            d = "style[" + y + "]";
          HTMLImports.importer.documentPreloadSelectors += "," + c, HTMLImports.importer.importsPreloadSelectors += "," + c, HTMLImports.parser.documentSelectors = [ HTMLImports.parser.documentSelectors, c, d ].join( "," );
          var e = HTMLImports.parser.parseGeneric;
          HTMLImports.parser.parseGeneric = function ( a ) {
            if ( !a[ z ] ) {
              var c = a.__importElement || a;
              if ( !c.hasAttribute( y ) ) return void e.call( this, a );
              a.__resource ? ( c = a.ownerDocument.createElement( "style" ), c.textContent = b.resolveCssText( a.__resource, a.href ) ) : b.resolveStyle( c ), c.textContent = k.shimStyle( c ), c.removeAttribute( y, "" ), c.setAttribute( z, "" ), c[ z ] = !0, c.parentNode !== C && ( a.parentNode === C ? C.replaceChild( c, a ) : C.appendChild( c ) ), c.__importParsed = !0, this.markParsingComplete( a )
            }
          };
          var f = HTMLImports.parser.hasResource;
          HTMLImports.parser.hasResource = function ( a ) {
            return "link" === a.localName && "stylesheet" === a.rel && a.hasAttribute( y ) ? a.__resource : f.call( this, a )
          }
        }
      } )
    }
    a.ShadowCSS = k
  }( window.Platform ) ) : ! function () {
    window.templateContent = window.templateContent || function ( a ) {
      return a.content
    }, window.wrap = window.unwrap = function ( a ) {
      return a
    }, addEventListener( "DOMContentLoaded", function () {
      if ( CustomElements.useNative === !1 ) {
        var a = Element.prototype.createShadowRoot;
        Element.prototype.createShadowRoot = function () {
          var b = a.call( this );
          return CustomElements.watchShadow( this ), b
        }
      }
    } ), window.templateContent = function ( a ) {
      if ( window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap( a ), !a.content && !a._content ) {
        for ( var b = document.createDocumentFragment(); a.firstChild; ) b.appendChild( a.firstChild );
        a._content = b
      }
      return a.content || a._content
    }
  }(),
  function ( a ) {
    "use strict";

    function b( a ) {
      return void 0 !== m[ a ]
    }

    function c() {
      h.call( this ), this._isInvalid = !0
    }

    function d( a ) {
      return "" == a && c.call( this ), a.toLowerCase()
    }

    function e( a ) {
      var b = a.charCodeAt( 0 );
      return b > 32 && 127 > b && -1 == [ 34, 35, 60, 62, 63, 96 ].indexOf( b ) ? a : encodeURIComponent( a )
    }

    function f( a ) {
      var b = a.charCodeAt( 0 );
      return b > 32 && 127 > b && -1 == [ 34, 35, 60, 62, 96 ].indexOf( b ) ? a : encodeURIComponent( a )
    }

    function g( a, g, h ) {
      function i( a ) {
        t.push( a )
      }
      var j = g || "scheme start",
        k = 0,
        l = "",
        r = !1,
        s = !1,
        t = [];
      a: for ( ;
        ( a[ k - 1 ] != o || 0 == k ) && !this._isInvalid; ) {
        var u = a[ k ];
        switch ( j ) {
          case "scheme start":
            if ( !u || !p.test( u ) ) {
              if ( g ) {
                i( "Invalid scheme." );
                break a
              }
              l = "", j = "no scheme";
              continue
            }
            l += u.toLowerCase(), j = "scheme";
            break;
          case "scheme":
            if ( u && q.test( u ) ) l += u.toLowerCase();
            else {
              if ( ":" != u ) {
                if ( g ) {
                  if ( o == u ) break a;
                  i( "Code point not allowed in scheme: " + u );
                  break a
                }
                l = "", k = 0, j = "no scheme";
                continue
              }
              if ( this._scheme = l, l = "", g ) break a;
              b( this._scheme ) && ( this._isRelative = !0 ), j = "file" == this._scheme ? "relative" : this._isRelative && h && h._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data"
            }
            break;
          case "scheme data":
            "?" == u ? ( query = "?", j = "query" ) : "#" == u ? ( this._fragment = "#", j = "fragment" ) : o != u && "	" != u && "\n" != u && "\r" != u && ( this._schemeData += e( u ) );
            break;
          case "no scheme":
            if ( h && b( h._scheme ) ) {
              j = "relative";
              continue
            }
            i( "Missing scheme." ), c.call( this );
            break;
          case "relative or authority":
            if ( "/" != u || "/" != a[ k + 1 ] ) {
              i( "Expected /, got: " + u ), j = "relative";
              continue
            }
            j = "authority ignore slashes";
            break;
          case "relative":
            if ( this._isRelative = !0, "file" != this._scheme && ( this._scheme = h._scheme ), o == u ) {
              this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query;
              break a
            }
            if ( "/" == u || "\\" == u ) "\\" == u && i( "\\ is an invalid code point." ), j = "relative slash";
            else if ( "?" == u ) this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = "?", j = "query";
            else {
              if ( "#" != u ) {
                var v = a[ k + 1 ],
                  w = a[ k + 2 ];
                ( "file" != this._scheme || !p.test( u ) || ":" != v && "|" != v || o != w && "/" != w && "\\" != w && "?" != w && "#" != w ) && ( this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._path.pop() ), j = "relative path";
                continue
              }
              this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query, this._fragment = "#", j = "fragment"
            }
            break;
          case "relative slash":
            if ( "/" != u && "\\" != u ) {
              "file" != this._scheme && ( this._host = h._host, this._port = h._port ), j = "relative path";
              continue
            }
            "\\" == u && i( "\\ is an invalid code point." ), j = "file" == this._scheme ? "file host" : "authority ignore slashes";
            break;
          case "authority first slash":
            if ( "/" != u ) {
              i( "Expected '/', got: " + u ), j = "authority ignore slashes";
              continue
            }
            j = "authority second slash";
            break;
          case "authority second slash":
            if ( j = "authority ignore slashes", "/" != u ) {
              i( "Expected '/', got: " + u );
              continue
            }
            break;
          case "authority ignore slashes":
            if ( "/" != u && "\\" != u ) {
              j = "authority";
              continue
            }
            i( "Expected authority, got: " + u );
            break;
          case "authority":
            if ( "@" == u ) {
              r && ( i( "@ already seen." ), l += "%40" ), r = !0;
              for ( var x = 0; x < l.length; x++ ) {
                var y = l[ x ];
                if ( "	" != y && "\n" != y && "\r" != y )
                  if ( ":" != y || null !== this._password ) {
                    var z = e( y );
                    null !== this._password ? this._password += z : this._username += z
                  } else this._password = "";
                else i( "Invalid whitespace in authority." )
              }
              l = ""
            } else {
              if ( o == u || "/" == u || "\\" == u || "?" == u || "#" == u ) {
                k -= l.length, l = "", j = "host";
                continue
              }
              l += u
            }
            break;
          case "file host":
            if ( o == u || "/" == u || "\\" == u || "?" == u || "#" == u ) {
              2 != l.length || !p.test( l[ 0 ] ) || ":" != l[ 1 ] && "|" != l[ 1 ] ? 0 == l.length ? j = "relative path start" : ( this._host = d.call( this, l ), l = "", j = "relative path start" ) : j = "relative path";
              continue
            }
            "	" == u || "\n" == u || "\r" == u ? i( "Invalid whitespace in file host." ) : l += u;
            break;
          case "host":
          case "hostname":
            if ( ":" != u || s ) {
              if ( o == u || "/" == u || "\\" == u || "?" == u || "#" == u ) {
                if ( this._host = d.call( this, l ), l = "", j = "relative path start", g ) break a;
                continue
              }
              "	" != u && "\n" != u && "\r" != u ? ( "[" == u ? s = !0 : "]" == u && ( s = !1 ), l += u ) : i( "Invalid code point in host/hostname: " + u )
            } else if ( this._host = d.call( this, l ), l = "", j = "port", "hostname" == g ) break a;
            break;
          case "port":
            if ( /[0-9]/.test( u ) ) l += u;
            else {
              if ( o == u || "/" == u || "\\" == u || "?" == u || "#" == u || g ) {
                if ( "" != l ) {
                  var A = parseInt( l, 10 );
                  A != m[ this._scheme ] && ( this._port = A + "" ), l = ""
                }
                if ( g ) break a;
                j = "relative path start";
                continue
              }
              "	" == u || "\n" == u || "\r" == u ? i( "Invalid code point in port: " + u ) : c.call( this )
            }
            break;
          case "relative path start":
            if ( "\\" == u && i( "'\\' not allowed in path." ), j = "relative path", "/" != u && "\\" != u ) continue;
            break;
          case "relative path":
            if ( o != u && "/" != u && "\\" != u && ( g || "?" != u && "#" != u ) ) "	" != u && "\n" != u && "\r" != u && ( l += e( u ) );
            else {
              "\\" == u && i( "\\ not allowed in relative path." );
              var B;
              ( B = n[ l.toLowerCase() ] ) && ( l = B ), ".." == l ? ( this._path.pop(), "/" != u && "\\" != u && this._path.push( "" ) ) : "." == l && "/" != u && "\\" != u ? this._path.push( "" ) : "." != l && ( "file" == this._scheme && 0 == this._path.length && 2 == l.length && p.test( l[ 0 ] ) && "|" == l[ 1 ] && ( l = l[ 0 ] + ":" ), this._path.push( l ) ), l = "", "?" == u ? ( this._query = "?", j = "query" ) : "#" == u && ( this._fragment = "#", j = "fragment" )
            }
            break;
          case "query":
            g || "#" != u ? o != u && "	" != u && "\n" != u && "\r" != u && ( this._query += f( u ) ) : ( this._fragment = "#", j = "fragment" );
            break;
          case "fragment":
            o != u && "	" != u && "\n" != u && "\r" != u && ( this._fragment += u )
        }
        k++
      }
    }

    function h() {
      this._scheme = "", this._schemeData = "", this._username = "", this._password = null, this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", this._isInvalid = !1, this._isRelative = !1
    }

    function i( a, b ) {
      void 0 === b || b instanceof i || ( b = new i( String( b ) ) ), this._url = a, h.call( this );
      var c = a.replace( /^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "" );
      g.call( this, c, null, b )
    }
    var j = !1;
    if ( !a.forceJURL ) try {
      var k = new URL( "b", "http://a" );
      j = "http://a/b" === k.href
    } catch ( l ) {}
    if ( !j ) {
      var m = Object.create( null );
      m.ftp = 21, m.file = 0, m.gopher = 70, m.http = 80, m.https = 443, m.ws = 80, m.wss = 443;
      var n = Object.create( null );
      n[ "%2e" ] = ".", n[ ".%2e" ] = "..", n[ "%2e." ] = "..", n[ "%2e%2e" ] = "..";
      var o = void 0,
        p = /[a-zA-Z]/,
        q = /[a-zA-Z0-9\+\-\.]/;
      i.prototype = {
        get href() {
          if ( this._isInvalid ) return this._url;
          var a = "";
          return ( "" != this._username || null != this._password ) && ( a = this._username + ( null != this._password ? ":" + this._password : "" ) + "@" ), this.protocol + ( this._isRelative ? "//" + a + this.host : "" ) + this.pathname + this._query + this._fragment
        },
        set href( a ) {
          h.call( this ), g.call( this, a )
        },
        get protocol() {
          return this._scheme + ":"
        },
        set protocol( a ) {
          this._isInvalid || g.call( this, a + ":", "scheme start" )
        },
        get host() {
          return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host
        },
        set host( a ) {
          !this._isInvalid && this._isRelative && g.call( this, a, "host" )
        },
        get hostname() {
          return this._host
        },
        set hostname( a ) {
          !this._isInvalid && this._isRelative && g.call( this, a, "hostname" )
        },
        get port() {
          return this._port
        },
        set port( a ) {
          !this._isInvalid && this._isRelative && g.call( this, a, "port" )
        },
        get pathname() {
          return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join( "/" ) : this._schemeData
        },
        set pathname( a ) {
          !this._isInvalid && this._isRelative && ( this._path = [], g.call( this, a, "relative path start" ) )
        },
        get search() {
          return this._isInvalid || !this._query || "?" == this._query ? "" : this._query
        },
        set search( a ) {
          !this._isInvalid && this._isRelative && ( this._query = "?", "?" == a[ 0 ] && ( a = a.slice( 1 ) ), g.call( this, a, "query" ) )
        },
        get hash() {
          return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment
        },
        set hash( a ) {
          this._isInvalid || ( this._fragment = "#", "#" == a[ 0 ] && ( a = a.slice( 1 ) ), g.call( this, a, "fragment" ) )
        }
      }, a.URL = i
    }
  }( window ),
  function ( a ) {
    function b( a ) {
      for ( var b = a || {}, d = 1; d < arguments.length; d++ ) {
        var e = arguments[ d ];
        try {
          for ( var f in e ) c( f, e, b )
        } catch ( g ) {}
      }
      return b
    }

    function c( a, b, c ) {
      var e = d( b, a );
      Object.defineProperty( c, a, e )
    }

    function d( a, b ) {
      if ( a ) {
        var c = Object.getOwnPropertyDescriptor( a, b );
        return c || d( Object.getPrototypeOf( a ), b )
      }
    }
    Function.prototype.bind || ( Function.prototype.bind = function ( a ) {
      var b = this,
        c = Array.prototype.slice.call( arguments, 1 );
      return function () {
        var d = c.slice();
        return d.push.apply( d, arguments ), b.apply( a, d )
      }
    } ), a.mixin = b
  }( window.Platform ),
  function ( a ) {
    "use strict";

    function b( a, b, c ) {
      var d = "string" == typeof a ? document.createElement( a ) : a.cloneNode( !0 );
      if ( d.innerHTML = b, c )
        for ( var e in c ) d.setAttribute( e, c[ e ] );
      return d
    }
    var c = DOMTokenList.prototype.add,
      d = DOMTokenList.prototype.remove;
    DOMTokenList.prototype.add = function () {
      for ( var a = 0; a < arguments.length; a++ ) c.call( this, arguments[ a ] )
    }, DOMTokenList.prototype.remove = function () {
      for ( var a = 0; a < arguments.length; a++ ) d.call( this, arguments[ a ] )
    }, DOMTokenList.prototype.toggle = function ( a, b ) {
      1 == arguments.length && ( b = !this.contains( a ) ), b ? this.add( a ) : this.remove( a )
    }, DOMTokenList.prototype.switch = function ( a, b ) {
      a && this.remove( a ), b && this.add( b )
    };
    var e = function () {
        return Array.prototype.slice.call( this )
      },
      f = window.NamedNodeMap || window.MozNamedAttrMap || {};
    if ( NodeList.prototype.array = e, f.prototype.array = e, HTMLCollection.prototype.array = e, !window.performance ) {
      var g = Date.now();
      window.performance = {
        now: function () {
          return Date.now() - g
        }
      }
    }
    window.requestAnimationFrame || ( window.requestAnimationFrame = function () {
      var a = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
      return a ? function ( b ) {
        return a( function () {
          b( performance.now() )
        } )
      } : function ( a ) {
        return window.setTimeout( a, 1e3 / 60 )
      }
    }() ), window.cancelAnimationFrame || ( window.cancelAnimationFrame = function () {
      return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function ( a ) {
        clearTimeout( a )
      }
    }() );
    var h = [],
      i = function () {
        h.push( arguments )
      };
    window.Polymer = i, a.deliverDeclarations = function () {
      return a.deliverDeclarations = function () {
        throw "Possible attempt to load Polymer twice"
      }, h
    }, window.addEventListener( "DOMContentLoaded", function () {
      window.Polymer === i && ( window.Polymer = function () {
        console.error( 'You tried to use polymer without loading it first. To load polymer, <link rel="import" href="components/polymer/polymer.html">' )
      } )
    } ), a.createDOM = b
  }( window.Platform ), window.templateContent = window.templateContent || function ( a ) {
    return a.content
  },
  function ( a ) {
    a = a || ( window.Inspector = {} );
    var b;
    window.sinspect = function ( a, d ) {
      b || ( b = window.open( "", "ShadowDOM Inspector", null, !0 ), b.document.write( c ), b.api = {
        shadowize: shadowize
      } ), f( a || wrap( document.body ), d )
    };
    var c = [ "<!DOCTYPE html>", "<html>", "  <head>", "    <title>ShadowDOM Inspector</title>", "    <style>", "      body {", "      }", "      pre {", '        font: 9pt "Courier New", monospace;', "        line-height: 1.5em;", "      }", "      tag {", "        color: purple;", "      }", "      ul {", "         margin: 0;", "         padding: 0;", "         list-style: none;", "      }", "      li {", "         display: inline-block;", "         background-color: #f1f1f1;", "         padding: 4px 6px;", "         border-radius: 4px;", "         margin-right: 4px;", "      }", "    </style>", "  </head>", "  <body>", '    <ul id="crumbs">', "    </ul>", '    <div id="tree"></div>', "  </body>", "</html>" ].join( "\n" ),
      d = [],
      e = function () {
        var a = b.document,
          c = a.querySelector( "#crumbs" );
        c.textContent = "";
        for ( var e, g = 0; e = d[ g ]; g++ ) {
          var h = a.createElement( "a" );
          h.href = "#", h.textContent = e.localName, h.idx = g, h.onclick = function ( a ) {
            for ( var b; d.length > this.idx; ) b = d.pop();
            f( b.shadow || b, b ), a.preventDefault()
          }, c.appendChild( a.createElement( "li" ) ).appendChild( h )
        }
      },
      f = function ( a, c ) {
        var f = b.document;
        k = [];
        var g = c || a;
        d.push( g ), e(), f.body.querySelector( "#tree" ).innerHTML = "<pre>" + j( a, a.childNodes ) + "</pre>"
      },
      g = Array.prototype.forEach.call.bind( Array.prototype.forEach ),
      h = {
        STYLE: 1,
        SCRIPT: 1,
        "#comment": 1,
        TEMPLATE: 1
      },
      i = function ( a ) {
        return h[ a.nodeName ]
      },
      j = function ( a, b, c ) {
        if ( i( a ) ) return "";
        var d = c || "";
        if ( a.localName || 11 == a.nodeType ) {
          var e = a.localName || "shadow-root",
            f = d + l( a );
          "content" == e && ( b = a.getDistributedNodes() ), f += "<br/>";
          var h = d + "&nbsp;&nbsp;";
          g( b, function ( a ) {
            f += j( a, a.childNodes, h )
          } ), f += d, {
            br: 1
          } [ e ] || ( f += "<tag>&lt;/" + e + "&gt;</tag>", f += "<br/>" )
        } else {
          var k = a.textContent.trim();
          f = k ? d + '"' + k + '"<br/>' : ""
        }
        return f
      },
      k = [],
      l = function ( a ) {
        var b = "<tag>&lt;",
          c = a.localName || "shadow-root";
        return a.webkitShadowRoot || a.shadowRoot ? ( b += ' <button idx="' + k.length + '" onclick="api.shadowize.call(this)">' + c + "</button>", k.push( a ) ) : b += c || "shadow-root", a.attributes && g( a.attributes, function ( a ) {
          b += " " + a.name + ( a.value ? '="' + a.value + '"' : "" )
        } ), b += "&gt;</tag>"
      };
    shadowize = function () {
      var a = Number( this.attributes.idx.value ),
        b = k[ a ];
      b ? f( b.webkitShadowRoot || b.shadowRoot, b ) : ( console.log( "bad shadowize node" ), console.dir( this ) )
    }, a.output = j
  }( window.Inspector ),
  function () {
    var a = document.createElement( "style" );
    a.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; } \n";
    var b = document.querySelector( "head" );
    b.insertBefore( a, b.firstChild )
  }( Platform ),
  function ( a ) {
    function b( a, b ) {
      return b = b || [], b.map || ( b = [ b ] ), a.apply( this, b.map( d ) )
    }

    function c( a, c, d ) {
      var e;
      switch ( arguments.length ) {
        case 0:
          return;
        case 1:
          e = null;
          break;
        case 2:
          e = c.apply( this );
          break;
        default:
          e = b( d, c )
      }
      f[ a ] = e
    }

    function d( a ) {
      return f[ a ]
    }

    function e( a, c ) {
      HTMLImports.whenImportsReady( function () {
        b( c, a )
      } )
    }
    var f = {};
    a.marshal = d, a.module = c, a.using = e
  }( window ),
  function ( a ) {
    function b( a ) {
      f.textContent = d++, e.push( a )
    }

    function c() {
      for ( ; e.length; ) e.shift()()
    }
    var d = 0,
      e = [],
      f = document.createTextNode( "" );
    new( window.MutationObserver || JsMutationObserver )( c ).observe( f, {
      characterData: !0
    } ), a.endOfMicrotask = b
  }( Platform ),
  function ( a ) {
    function b( a, b, d ) {
      return a.replace( d, function ( a, d, e, f ) {
        var g = e.replace( /["']/g, "" );
        return g = c( b, g ), d + "'" + g + "'" + f
      } )
    }

    function c( a, b ) {
      var c = new URL( b, a );
      return d( c.href )
    }

    function d( a ) {
      var b = document.location,
        c = new URL( a, b );
      return c.host === b.host && c.port === b.port && c.protocol === b.protocol ? e( b.pathname, c.pathname ) : a
    }

    function e( a, b ) {
      for ( var c = a.split( "/" ), d = b.split( "/" ); c.length && c[ 0 ] === d[ 0 ]; ) c.shift(), d.shift();
      for ( var e = 0, f = c.length - 1; f > e; e++ ) d.unshift( ".." );
      return d.join( "/" )
    }
    var f = {
        resolveDom: function ( a, b ) {
          b = b || a.ownerDocument.baseURI, this.resolveAttributes( a, b ), this.resolveStyles( a, b );
          var c = a.querySelectorAll( "template" );
          if ( c )
            for ( var d, e = 0, f = c.length; f > e && ( d = c[ e ] ); e++ ) d.content && this.resolveDom( d.content, b )
        },
        resolveTemplate: function ( a ) {
          this.resolveDom( a.content, a.ownerDocument.baseURI )
        },
        resolveStyles: function ( a, b ) {
          var c = a.querySelectorAll( "style" );
          if ( c )
            for ( var d, e = 0, f = c.length; f > e && ( d = c[ e ] ); e++ ) this.resolveStyle( d, b )
        },
        resolveStyle: function ( a, b ) {
          b = b || a.ownerDocument.baseURI, a.textContent = this.resolveCssText( a.textContent, b )
        },
        resolveCssText: function ( a, c ) {
          return a = b( a, c, g ), b( a, c, h )
        },
        resolveAttributes: function ( a, b ) {
          a.hasAttributes && a.hasAttributes() && this.resolveElementAttributes( a, b );
          var c = a && a.querySelectorAll( j );
          if ( c )
            for ( var d, e = 0, f = c.length; f > e && ( d = c[ e ] ); e++ ) this.resolveElementAttributes( d, b )
        },
        resolveElementAttributes: function ( a, d ) {
          d = d || a.ownerDocument.baseURI, i.forEach( function ( e ) {
            var f, h = a.attributes[ e ],
              i = h && h.value;
            i && i.search( k ) < 0 && ( f = "style" === e ? b( i, d, g ) : c( d, i ), h.value = f )
          } )
        }
      },
      g = /(url\()([^)]*)(\))/g,
      h = /(@import[\s]+(?!url\())([^;]*)(;)/g,
      i = [ "href", "src", "action", "style" ],
      j = "[" + i.join( "],[" ) + "]",
      k = "{{.*}}";
    a.urlResolver = f
  }( Platform ),
  function ( a ) {
    function b( a ) {
      u.push( a ), t || ( t = !0, q( d ) )
    }

    function c( a ) {
      return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded( a ) || a
    }

    function d() {
      t = !1;
      var a = u;
      u = [], a.sort( function ( a, b ) {
        return a.uid_ - b.uid_
      } );
      var b = !1;
      a.forEach( function ( a ) {
        var c = a.takeRecords();
        e( a ), c.length && ( a.callback_( c, a ), b = !0 )
      } ), b && d()
    }

    function e( a ) {
      a.nodes_.forEach( function ( b ) {
        var c = p.get( b );
        c && c.forEach( function ( b ) {
          b.observer === a && b.removeTransientObservers()
        } )
      } )
    }

    function f( a, b ) {
      for ( var c = a; c; c = c.parentNode ) {
        var d = p.get( c );
        if ( d )
          for ( var e = 0; e < d.length; e++ ) {
            var f = d[ e ],
              g = f.options;
            if ( c === a || g.subtree ) {
              var h = b( g );
              h && f.enqueue( h )
            }
          }
      }
    }

    function g( a ) {
      this.callback_ = a, this.nodes_ = [], this.records_ = [], this.uid_ = ++v
    }

    function h( a, b ) {
      this.type = a, this.target = b, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
    }

    function i( a ) {
      var b = new h( a.type, a.target );
      return b.addedNodes = a.addedNodes.slice(), b.removedNodes = a.removedNodes.slice(), b.previousSibling = a.previousSibling, b.nextSibling = a.nextSibling, b.attributeName = a.attributeName, b.attributeNamespace = a.attributeNamespace, b.oldValue = a.oldValue, b
    }

    function j( a, b ) {
      return w = new h( a, b )
    }

    function k( a ) {
      return x ? x : ( x = i( w ), x.oldValue = a, x )
    }

    function l() {
      w = x = void 0
    }

    function m( a ) {
      return a === x || a === w
    }

    function n( a, b ) {
      return a === b ? a : x && m( a ) ? x : null
    }

    function o( a, b, c ) {
      this.observer = a, this.target = b, this.options = c, this.transientObservedNodes = []
    }
    var p = new WeakMap,
      q = window.msSetImmediate;
    if ( !q ) {
      var r = [],
        s = String( Math.random() );
      window.addEventListener( "message", function ( a ) {
        if ( a.data === s ) {
          var b = r;
          r = [], b.forEach( function ( a ) {
            a()
          } )
        }
      } ), q = function ( a ) {
        r.push( a ), window.postMessage( s, "*" )
      }
    }
    var t = !1,
      u = [],
      v = 0;
    g.prototype = {
      observe: function ( a, b ) {
        if ( a = c( a ), !b.childList && !b.attributes && !b.characterData || b.attributeOldValue && !b.attributes || b.attributeFilter && b.attributeFilter.length && !b.attributes || b.characterDataOldValue && !b.characterData ) throw new SyntaxError;
        var d = p.get( a );
        d || p.set( a, d = [] );
        for ( var e, f = 0; f < d.length; f++ )
          if ( d[ f ].observer === this ) {
            e = d[ f ], e.removeListeners(), e.options = b;
            break
          } e || ( e = new o( this, a, b ), d.push( e ), this.nodes_.push( a ) ), e.addListeners()
      },
      disconnect: function () {
        this.nodes_.forEach( function ( a ) {
          for ( var b = p.get( a ), c = 0; c < b.length; c++ ) {
            var d = b[ c ];
            if ( d.observer === this ) {
              d.removeListeners(), b.splice( c, 1 );
              break
            }
          }
        }, this ), this.records_ = []
      },
      takeRecords: function () {
        var a = this.records_;
        return this.records_ = [], a
      }
    };
    var w, x;
    o.prototype = {
      enqueue: function ( a ) {
        var c = this.observer.records_,
          d = c.length;
        if ( c.length > 0 ) {
          var e = c[ d - 1 ],
            f = n( e, a );
          if ( f ) return void( c[ d - 1 ] = f )
        } else b( this.observer );
        c[ d ] = a
      },
      addListeners: function () {
        this.addListeners_( this.target )
      },
      addListeners_: function ( a ) {
        var b = this.options;
        b.attributes && a.addEventListener( "DOMAttrModified", this, !0 ), b.characterData && a.addEventListener( "DOMCharacterDataModified", this, !0 ), b.childList && a.addEventListener( "DOMNodeInserted", this, !0 ), ( b.childList || b.subtree ) && a.addEventListener( "DOMNodeRemoved", this, !0 )
      },
      removeListeners: function () {
        this.removeListeners_( this.target )
      },
      removeListeners_: function ( a ) {
        var b = this.options;
        b.attributes && a.removeEventListener( "DOMAttrModified", this, !0 ), b.characterData && a.removeEventListener( "DOMCharacterDataModified", this, !0 ), b.childList && a.removeEventListener( "DOMNodeInserted", this, !0 ), ( b.childList || b.subtree ) && a.removeEventListener( "DOMNodeRemoved", this, !0 )
      },
      addTransientObserver: function ( a ) {
        if ( a !== this.target ) {
          this.addListeners_( a ), this.transientObservedNodes.push( a );
          var b = p.get( a );
          b || p.set( a, b = [] ), b.push( this )
        }
      },
      removeTransientObservers: function () {
        var a = this.transientObservedNodes;
        this.transientObservedNodes = [], a.forEach( function ( a ) {
          this.removeListeners_( a );
          for ( var b = p.get( a ), c = 0; c < b.length; c++ )
            if ( b[ c ] === this ) {
              b.splice( c, 1 );
              break
            }
        }, this )
      },
      handleEvent: function ( a ) {
        switch ( a.stopImmediatePropagation(), a.type ) {
          case "DOMAttrModified":
            var b = a.attrName,
              c = a.relatedNode.namespaceURI,
              d = a.target,
              e = new j( "attributes", d );
            e.attributeName = b, e.attributeNamespace = c;
            var g = a.attrChange === MutationEvent.ADDITION ? null : a.prevValue;
            f( d, function ( a ) {
              return !a.attributes || a.attributeFilter && a.attributeFilter.length && -1 === a.attributeFilter.indexOf( b ) && -1 === a.attributeFilter.indexOf( c ) ? void 0 : a.attributeOldValue ? k( g ) : e
            } );
            break;
          case "DOMCharacterDataModified":
            var d = a.target,
              e = j( "characterData", d ),
              g = a.prevValue;
            f( d, function ( a ) {
              return a.characterData ? a.characterDataOldValue ? k( g ) : e : void 0
            } );
            break;
          case "DOMNodeRemoved":
            this.addTransientObserver( a.target );
          case "DOMNodeInserted":
            var h, i, d = a.relatedNode,
              m = a.target;
            "DOMNodeInserted" === a.type ? ( h = [ m ], i = [] ) : ( h = [], i = [ m ] );
            var n = m.previousSibling,
              o = m.nextSibling,
              e = j( "childList", d );
            e.addedNodes = h, e.removedNodes = i, e.previousSibling = n, e.nextSibling = o, f( d, function ( a ) {
              return a.childList ? e : void 0
            } )
        }
        l()
      }
    }, a.JsMutationObserver = g, a.MutationObserver || ( a.MutationObserver = g )
  }( this ), window.HTMLImports = window.HTMLImports || {
    flags: {}
  },
  function ( a ) {
    var b = ( a.path, a.xhr ),
      c = a.flags,
      d = function ( a, b ) {
        this.cache = {}, this.onload = a, this.oncomplete = b, this.inflight = 0, this.pending = {}
      };
    d.prototype = {
      addNodes: function ( a ) {
        this.inflight += a.length;
        for ( var b, c = 0, d = a.length; d > c && ( b = a[ c ] ); c++ ) this.require( b );
        this.checkDone()
      },
      addNode: function ( a ) {
        this.inflight++, this.require( a ), this.checkDone()
      },
      require: function ( a ) {
        var b = a.src || a.href;
        a.__nodeUrl = b, this.dedupe( b, a ) || this.fetch( b, a )
      },
      dedupe: function ( a, b ) {
        if ( this.pending[ a ] ) return this.pending[ a ].push( b ), !0;
        return this.cache[ a ] ? ( this.onload( a, b, this.cache[ a ] ), this.tail(), !0 ) : ( this.pending[ a ] = [ b ], !1 )
      },
      fetch: function ( a, d ) {
        if ( c.load && console.log( "fetch", a, d ), a.match( /^data:/ ) ) {
          var e = a.split( "," ),
            f = e[ 0 ],
            g = e[ 1 ];
          g = f.indexOf( ";base64" ) > -1 ? atob( g ) : decodeURIComponent( g ), setTimeout( function () {
            this.receive( a, d, null, g )
          }.bind( this ), 0 )
        } else {
          var h = function ( b, c ) {
            this.receive( a, d, b, c )
          }.bind( this );
          b.load( a, h )
        }
      },
      receive: function ( a, b, c, d ) {
        this.cache[ a ] = d;
        for ( var e, f = this.pending[ a ], g = 0, h = f.length; h > g && ( e = f[ g ] ); g++ ) this.onload( a, e, d ), this.tail();
        this.pending[ a ] = null
      },
      tail: function () {
        --this.inflight, this.checkDone()
      },
      checkDone: function () {
        this.inflight || this.oncomplete()
      }
    }, b = b || {
      async: !0,
      ok: function ( a ) {
        return a.status >= 200 && a.status < 300 || 304 === a.status || 0 === a.status
      },
      load: function ( c, d, e ) {
        var f = new XMLHttpRequest;
        return ( a.flags.debug || a.flags.bust ) && ( c += "?" + Math.random() ), f.open( "GET", c, b.async ), f.addEventListener( "readystatechange", function () {
          4 === f.readyState && d.call( e, !b.ok( f ) && f, f.response || f.responseText, c )
        } ), f.send(), f
      },
      loadDocument: function ( a, b, c ) {
        this.load( a, b, c ).responseType = "document"
      }
    }, a.xhr = b, a.Loader = d
  }( window.HTMLImports ),
  function ( a ) {
    function b( a ) {
      return "link" === a.localName && a.rel === g
    }

    function c( a ) {
      var b, c = d( a );
      try {
        b = btoa( c )
      } catch ( e ) {
        b = btoa( unescape( encodeURIComponent( c ) ) ), console.warn( "Script contained non-latin characters that were forced to latin. Some characters may be wrong.", a )
      }
      return "data:text/javascript;base64," + b
    }

    function d( a ) {
      return a.textContent + e( a )
    }

    function e( a ) {
      var b = a.__nodeUrl;
      if ( !b ) {
        b = a.ownerDocument.baseURI;
        var c = "[" + Math.floor( 1e3 * ( Math.random() + 1 ) ) + "]",
          d = a.textContent.match( /Polymer\(['"]([^'"]*)/ );
        c = d && d[ 1 ] || c, b += "/" + c + ".js"
      }
      return "\n//# sourceURL=" + b + "\n"
    }

    function f( a ) {
      var b = a.ownerDocument.createElement( "style" );
      return b.textContent = a.textContent, n.resolveUrlsInStyle( b ), b
    }
    var g = "import",
      h = a.flags,
      i = /Trident/.test( navigator.userAgent ),
      j = window.ShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded( document ) : document,
      k = {
        documentSelectors: "link[rel=" + g + "]",
        importsSelectors: [ "link[rel=" + g + "]", "link[rel=stylesheet]", "style", "script:not([type])", 'script[type="text/javascript"]' ].join( "," ),
        map: {
          link: "parseLink",
          script: "parseScript",
          style: "parseStyle"
        },
        parseNext: function () {
          var a = this.nextToParse();
          a && this.parse( a )
        },
        parse: function ( a ) {
          if ( this.isParsed( a ) ) return void( h.parse && console.log( "[%s] is already parsed", a.localName ) );
          var b = this[ this.map[ a.localName ] ];
          b && ( this.markParsing( a ), b.call( this, a ) )
        },
        markParsing: function ( a ) {
          h.parse && console.log( "parsing", a ), this.parsingElement = a
        },
        markParsingComplete: function ( a ) {
          a.__importParsed = !0, a.__importElement && ( a.__importElement.__importParsed = !0 ), this.parsingElement = null, h.parse && console.log( "completed", a ), this.parseNext()
        },
        parseImport: function ( a ) {
          if ( a.import.__importParsed = !0, HTMLImports.__importsParsingHook && HTMLImports.__importsParsingHook( a ), a.dispatchEvent( a.__resource ? new CustomEvent( "load", {
              bubbles: !1
            } ) : new CustomEvent( "error", {
              bubbles: !1
            } ) ), a.__pending )
            for ( var b; a.__pending.length; ) b = a.__pending.shift(), b && b( {
              target: a
            } );
          this.markParsingComplete( a )
        },
        parseLink: function ( a ) {
          b( a ) ? this.parseImport( a ) : ( a.href = a.href, this.parseGeneric( a ) )
        },
        parseStyle: function ( a ) {
          var b = a;
          a = f( a ), a.__importElement = b, this.parseGeneric( a )
        },
        parseGeneric: function ( a ) {
          this.trackElement( a ), document.head.appendChild( a )
        },
        trackElement: function ( a, b ) {
          var c = this,
            d = function ( d ) {
              b && b( d ), c.markParsingComplete( a )
            };
          if ( a.addEventListener( "load", d ), a.addEventListener( "error", d ), i && "style" === a.localName ) {
            var e = !1;
            if ( -1 == a.textContent.indexOf( "@import" ) ) e = !0;
            else if ( a.sheet ) {
              e = !0;
              for ( var f, g = a.sheet.cssRules, h = g ? g.length : 0, j = 0; h > j && ( f = g[ j ] ); j++ ) f.type === CSSRule.IMPORT_RULE && ( e = e && Boolean( f.styleSheet ) )
            }
            e && a.dispatchEvent( new CustomEvent( "load", {
              bubbles: !1
            } ) )
          }
        },
        parseScript: function ( b ) {
          var d = document.createElement( "script" );
          d.__importElement = b, d.src = b.src ? b.src : c( b ), a.currentScript = b, this.trackElement( d, function () {
            d.parentNode.removeChild( d ), a.currentScript = null
          } ), document.head.appendChild( d )
        },
        nextToParse: function () {
          return !this.parsingElement && this.nextToParseInDoc( j )
        },
        nextToParseInDoc: function ( a, c ) {
          for ( var d, e = a.querySelectorAll( this.parseSelectorsForNode( a ) ), f = 0, g = e.length; g > f && ( d = e[ f ] ); f++ )
            if ( !this.isParsed( d ) ) return this.hasResource( d ) ? b( d ) ? this.nextToParseInDoc( d.import, d ) : d : void 0;
          return c
        },
        parseSelectorsForNode: function ( a ) {
          var b = a.ownerDocument || a;
          return b === j ? this.documentSelectors : this.importsSelectors
        },
        isParsed: function ( a ) {
          return a.__importParsed
        },
        hasResource: function ( a ) {
          return b( a ) && !a.import ? !1 : !0
        }
      },
      l = /(url\()([^)]*)(\))/g,
      m = /(@import[\s]+(?!url\())([^;]*)(;)/g,
      n = {
        resolveUrlsInStyle: function ( a ) {
          var b = a.ownerDocument,
            c = b.createElement( "a" );
          return a.textContent = this.resolveUrlsInCssText( a.textContent, c ), a
        },
        resolveUrlsInCssText: function ( a, b ) {
          var c = this.replaceUrls( a, b, l );
          return c = this.replaceUrls( c, b, m )
        },
        replaceUrls: function ( a, b, c ) {
          return a.replace( c, function ( a, c, d, e ) {
            var f = d.replace( /["']/g, "" );
            return b.href = f, f = b.href, c + "'" + f + "'" + e
          } )
        }
      };
    a.parser = k, a.path = n, a.isIE = i
  }( HTMLImports ),
  function ( a ) {
    function b( a ) {
      return c( a, m )
    }

    function c( a, b ) {
      return "link" === a.localName && a.getAttribute( "rel" ) === b
    }

    function d( a, b ) {
      var c = a;
      c instanceof Document || ( c = document.implementation.createHTMLDocument( m ) ), c._URL = b;
      var d = c.createElement( "base" );
      d.setAttribute( "href", b ), c.baseURI || ( c.baseURI = b );
      var e = c.createElement( "meta" );
      return e.setAttribute( "charset", "utf-8" ), c.head.appendChild( e ), c.head.appendChild( d ), a instanceof Document || ( c.body.innerHTML = a ), window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap( c ), c
    }

    function e( a, b ) {
      b = b || n, g( function () {
        h( a, b )
      }, b )
    }

    function f( a ) {
      return "complete" === a.readyState || a.readyState === u
    }

    function g( a, b ) {
      if ( f( b ) ) a && a();
      else {
        var c = function () {
          ( "complete" === b.readyState || b.readyState === u ) && ( b.removeEventListener( v, c ), g( a, b ) )
        };
        b.addEventListener( v, c )
      }
    }

    function h( a, b ) {
      function c() {
        f == g && requestAnimationFrame( a )
      }

      function d() {
        f++, c()
      }
      var e = b.querySelectorAll( "link[rel=import]" ),
        f = 0,
        g = e.length;
      if ( g )
        for ( var h, j = 0; g > j && ( h = e[ j ] ); j++ ) i( h ) ? d.call( h ) : ( h.addEventListener( "load", d ), h.addEventListener( "error", d ) );
      else c()
    }

    function i( a ) {
      return k ? a.import && "loading" !== a.import.readyState : a.__importParsed
    }
    var j = "import" in document.createElement( "link" ),
      k = j,
      l = a.flags,
      m = "import",
      n = window.ShadowDOMPolyfill ? ShadowDOMPolyfill.wrapIfNeeded( document ) : document;
    if ( k ) var o = {};
    else var p = ( a.xhr, a.Loader ),
      q = a.parser,
      o = {
        documents: {},
        documentPreloadSelectors: "link[rel=" + m + "]",
        importsPreloadSelectors: [ "link[rel=" + m + "]" ].join( "," ),
        loadNode: function ( a ) {
          r.addNode( a )
        },
        loadSubtree: function ( a ) {
          var b = this.marshalNodes( a );
          r.addNodes( b )
        },
        marshalNodes: function ( a ) {
          return a.querySelectorAll( this.loadSelectorsForNode( a ) )
        },
        loadSelectorsForNode: function ( a ) {
          var b = a.ownerDocument || a;
          return b === n ? this.documentPreloadSelectors : this.importsPreloadSelectors
        },
        loaded: function ( a, c, e ) {
          if ( l.load && console.log( "loaded", a, c ), c.__resource = e, b( c ) ) {
            var f = this.documents[ a ];
            f || ( f = d( e, a ), f.__importLink = c, this.bootDocument( f ), this.documents[ a ] = f ), c.import = f
          }
          q.parseNext()
        },
        bootDocument: function ( a ) {
          this.loadSubtree( a ), this.observe( a ), q.parseNext()
        },
        loadedAll: function () {
          q.parseNext()
        }
      },
      r = new p( o.loaded.bind( o ), o.loadedAll.bind( o ) );
    var s = {
      get: function () {
        return HTMLImports.currentScript || document.currentScript
      },
      configurable: !0
    };
    if ( Object.defineProperty( document, "_currentScript", s ), Object.defineProperty( n, "_currentScript", s ), !document.baseURI ) {
      var t = {
        get: function () {
          return window.location.href
        },
        configurable: !0
      };
      Object.defineProperty( document, "baseURI", t ), Object.defineProperty( n, "baseURI", t )
    }
    var u = HTMLImports.isIE ? "complete" : "interactive",
      v = "readystatechange";
    a.hasNative = j, a.useNative = k, a.importer = o, a.whenImportsReady = e, a.IMPORT_LINK_TYPE = m, a.isImportLoaded = i, a.importLoader = r
  }( window.HTMLImports ),
  function ( a ) {
    function b( a ) {
      for ( var b, d = 0, e = a.length; e > d && ( b = a[ d ] ); d++ ) "childList" === b.type && b.addedNodes.length && c( b.addedNodes )
    }

    function c( a ) {
      for ( var b, e = 0, g = a.length; g > e && ( b = a[ e ] ); e++ ) d( b ) && f.loadNode( b ), b.children && b.children.length && c( b.children )
    }

    function d( a ) {
      return 1 === a.nodeType && g.call( a, f.loadSelectorsForNode( a ) )
    }

    function e( a ) {
      h.observe( a, {
        childList: !0,
        subtree: !0
      } )
    }
    var f = ( a.IMPORT_LINK_TYPE, a.importer ),
      g = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector,
      h = new MutationObserver( b );
    a.observe = e, f.observe = e
  }( HTMLImports ),
  function () {
    function a() {
      HTMLImports.importer.bootDocument( b )
    }
    "function" != typeof window.CustomEvent && ( window.CustomEvent = function ( a, b ) {
      var c = document.createEvent( "HTMLEvents" );
      return c.initEvent( a, b.bubbles === !1 ? !1 : !0, b.cancelable === !1 ? !1 : !0, b.detail ), c
    } );
    var b = window.ShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded( document ) : document;
    HTMLImports.whenImportsReady( function () {
      HTMLImports.ready = !0, HTMLImports.readyTime = ( new Date ).getTime(), b.dispatchEvent( new CustomEvent( "HTMLImportsLoaded", {
        bubbles: !0
      } ) )
    } ), HTMLImports.useNative || ( "complete" === document.readyState || "interactive" === document.readyState && !window.attachEvent ? a() : document.addEventListener( "DOMContentLoaded", a ) )
  }(), window.CustomElements = window.CustomElements || {
    flags: {}
  },
  function ( a ) {
    function b( a, c, d ) {
      var e = a.firstElementChild;
      if ( !e )
        for ( e = a.firstChild; e && e.nodeType !== Node.ELEMENT_NODE; ) e = e.nextSibling;
      for ( ; e; ) c( e, d ) !== !0 && b( e, c, d ), e = e.nextElementSibling;
      return null
    }

    function c( a, b ) {
      for ( var c = a.shadowRoot; c; ) d( c, b ), c = c.olderShadowRoot
    }

    function d( a, d ) {
      b( a, function ( a ) {
        return d( a ) ? !0 : void c( a, d )
      } ), c( a, d )
    }

    function e( a ) {
      return h( a ) ? ( i( a ), !0 ) : void l( a )
    }

    function f( a ) {
      d( a, function ( a ) {
        return e( a ) ? !0 : void 0
      } )
    }

    function g( a ) {
      return e( a ) || f( a )
    }

    function h( b ) {
      if ( !b.__upgraded__ && b.nodeType === Node.ELEMENT_NODE ) {
        var c = b.getAttribute( "is" ) || b.localName,
          d = a.registry[ c ];
        if ( d ) return A.dom && console.group( "upgrade:", b.localName ), a.upgrade( b ), A.dom && console.groupEnd(), !0
      }
    }

    function i( a ) {
      l( a ), r( a ) && d( a, function ( a ) {
        l( a )
      } )
    }

    function j( a ) {
      if ( E.push( a ), !D ) {
        D = !0;
        var b = window.Platform && window.Platform.endOfMicrotask || setTimeout;
        b( k )
      }
    }

    function k() {
      D = !1;
      for ( var a, b = E, c = 0, d = b.length; d > c && ( a = b[ c ] ); c++ ) a();
      E = []
    }

    function l( a ) {
      C ? j( function () {
        m( a )
      } ) : m( a )
    }

    function m( a ) {
      ( a.attachedCallback || a.detachedCallback || a.__upgraded__ && A.dom ) && ( A.dom && console.group( "inserted:", a.localName ), r( a ) && ( a.__inserted = ( a.__inserted || 0 ) + 1, a.__inserted < 1 && ( a.__inserted = 1 ), a.__inserted > 1 ? A.dom && console.warn( "inserted:", a.localName, "insert/remove count:", a.__inserted ) : a.attachedCallback && ( A.dom && console.log( "inserted:", a.localName ), a.attachedCallback() ) ), A.dom && console.groupEnd() )
    }

    function n( a ) {
      o( a ), d( a, function ( a ) {
        o( a )
      } )
    }

    function o( a ) {
      C ? j( function () {
        p( a )
      } ) : p( a )
    }

    function p( a ) {
      ( a.attachedCallback || a.detachedCallback || a.__upgraded__ && A.dom ) && ( A.dom && console.group( "removed:", a.localName ), r( a ) || ( a.__inserted = ( a.__inserted || 0 ) - 1, a.__inserted > 0 && ( a.__inserted = 0 ), a.__inserted < 0 ? A.dom && console.warn( "removed:", a.localName, "insert/remove count:", a.__inserted ) : a.detachedCallback && a.detachedCallback() ), A.dom && console.groupEnd() )
    }

    function q( a ) {
      return window.ShadowDOMPolyfill ? ShadowDOMPolyfill.wrapIfNeeded( a ) : a
    }

    function r( a ) {
      for ( var b = a, c = q( document ); b; ) {
        if ( b == c ) return !0;
        b = b.parentNode || b.host
      }
    }

    function s( a ) {
      if ( a.shadowRoot && !a.shadowRoot.__watched ) {
        A.dom && console.log( "watching shadow-root for: ", a.localName );
        for ( var b = a.shadowRoot; b; ) t( b ), b = b.olderShadowRoot
      }
    }

    function t( a ) {
      a.__watched || ( w( a ), a.__watched = !0 )
    }

    function u( a ) {
      if ( A.dom ) {
        var b = a[ 0 ];
        if ( b && "childList" === b.type && b.addedNodes && b.addedNodes ) {
          for ( var c = b.addedNodes[ 0 ]; c && c !== document && !c.host; ) c = c.parentNode;
          var d = c && ( c.URL || c._URL || c.host && c.host.localName ) || "";
          d = d.split( "/?" ).shift().split( "/" ).pop()
        }
        console.group( "mutations (%d) [%s]", a.length, d || "" )
      }
      a.forEach( function ( a ) {
        "childList" === a.type && ( G( a.addedNodes, function ( a ) {
          a.localName && g( a )
        } ), G( a.removedNodes, function ( a ) {
          a.localName && n( a )
        } ) )
      } ), A.dom && console.groupEnd()
    }

    function v() {
      u( F.takeRecords() ), k()
    }

    function w( a ) {
      F.observe( a, {
        childList: !0,
        subtree: !0
      } )
    }

    function x( a ) {
      w( a )
    }

    function y( a ) {
      A.dom && console.group( "upgradeDocument: ", a.baseURI.split( "/" ).pop() ), g( a ), A.dom && console.groupEnd()
    }

    function z( a ) {
      a = q( a );
      for ( var b, c = a.querySelectorAll( "link[rel=" + B + "]" ), d = 0, e = c.length; e > d && ( b = c[ d ] ); d++ ) b.import && b.import.__parsed && z( b.import );
      y( a )
    }
    var A = window.logFlags || {},
      B = window.HTMLImports ? HTMLImports.IMPORT_LINK_TYPE : "none",
      C = !window.MutationObserver || window.MutationObserver === window.JsMutationObserver;
    a.hasPolyfillMutations = C;
    var D = !1,
      E = [],
      F = new MutationObserver( u ),
      G = Array.prototype.forEach.call.bind( Array.prototype.forEach );
    a.IMPORT_LINK_TYPE = B, a.watchShadow = s, a.upgradeDocumentTree = z, a.upgradeAll = g, a.upgradeSubtree = f, a.insertedNode = i, a.observeDocument = x, a.upgradeDocument = y, a.takeRecords = v
  }( window.CustomElements ),
  function ( a ) {
    function b( b, g ) {
      var h = g || {};
      if ( !b ) throw new Error( "document.registerElement: first argument `name` must not be empty" );
      if ( b.indexOf( "-" ) < 0 ) throw new Error( "document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String( b ) + "'." );
      if ( c( b ) ) throw new Error( "Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String( b ) + "'. The type name is invalid." );
      if ( n( b ) ) throw new Error( "DuplicateDefinitionError: a type with name '" + String( b ) + "' is already registered" );
      if ( !h.prototype ) throw new Error( "Options missing required prototype property" );
      return h.__name = b.toLowerCase(), h.lifecycle = h.lifecycle || {}, h.ancestry = d( h.extends ), e( h ), f( h ), l( h.prototype ), o( h.__name, h ), h.ctor = p( h ), h.ctor.prototype = h.prototype, h.prototype.constructor = h.ctor, a.ready && a.upgradeDocumentTree( document ), h.ctor
    }

    function c( a ) {
      for ( var b = 0; b < y.length; b++ )
        if ( a === y[ b ] ) return !0
    }

    function d( a ) {
      var b = n( a );
      return b ? d( b.extends ).concat( [ b ] ) : []
    }

    function e( a ) {
      for ( var b, c = a.extends, d = 0; b = a.ancestry[ d ]; d++ ) c = b.is && b.tag;
      a.tag = c || a.__name, c && ( a.is = a.__name )
    }

    function f( a ) {
      if ( !Object.__proto__ ) {
        var b = HTMLElement.prototype;
        if ( a.is ) {
          var c = document.createElement( a.tag );
          b = Object.getPrototypeOf( c )
        }
        for ( var d, e = a.prototype; e && e !== b; ) {
          var d = Object.getPrototypeOf( e );
          e.__proto__ = d, e = d
        }
      }
      a.native = b
    }

    function g( a ) {
      return h( B( a.tag ), a )
    }

    function h( b, c ) {
      return c.is && b.setAttribute( "is", c.is ), b.removeAttribute( "unresolved" ), i( b, c ), b.__upgraded__ = !0, k( b ), a.insertedNode( b ), a.upgradeSubtree( b ), b
    }

    function i( a, b ) {
      Object.__proto__ ? a.__proto__ = b.prototype : ( j( a, b.prototype, b.native ), a.__proto__ = b.prototype )
    }

    function j( a, b, c ) {
      for ( var d = {}, e = b; e !== c && e !== HTMLElement.prototype; ) {
        for ( var f, g = Object.getOwnPropertyNames( e ), h = 0; f = g[ h ]; h++ ) d[ f ] || ( Object.defineProperty( a, f, Object.getOwnPropertyDescriptor( e, f ) ), d[ f ] = 1 );
        e = Object.getPrototypeOf( e )
      }
    }

    function k( a ) {
      a.createdCallback && a.createdCallback()
    }

    function l( a ) {
      if ( !a.setAttribute._polyfilled ) {
        var b = a.setAttribute;
        a.setAttribute = function ( a, c ) {
          m.call( this, a, c, b )
        };
        var c = a.removeAttribute;
        a.removeAttribute = function ( a ) {
          m.call( this, a, null, c )
        }, a.setAttribute._polyfilled = !0
      }
    }

    function m( a, b, c ) {
      var d = this.getAttribute( a );
      c.apply( this, arguments );
      var e = this.getAttribute( a );
      this.attributeChangedCallback && e !== d && this.attributeChangedCallback( a, d, e )
    }

    function n( a ) {
      return a ? z[ a.toLowerCase() ] : void 0
    }

    function o( a, b ) {
      z[ a ] = b
    }

    function p( a ) {
      return function () {
        return g( a )
      }
    }

    function q( a, b, c ) {
      return a === A ? r( b, c ) : C( a, b )
    }

    function r( a, b ) {
      var c = n( b || a );
      if ( c ) {
        if ( a == c.tag && b == c.is ) return new c.ctor;
        if ( !b && !c.is ) return new c.ctor
      }
      if ( b ) {
        var d = r( a );
        return d.setAttribute( "is", b ), d
      }
      var d = B( a );
      return a.indexOf( "-" ) >= 0 && i( d, HTMLElement ), d
    }

    function s( a ) {
      if ( !a.__upgraded__ && a.nodeType === Node.ELEMENT_NODE ) {
        var b = a.getAttribute( "is" ),
          c = n( b || a.localName );
        if ( c ) {
          if ( b && c.tag == a.localName ) return h( a, c );
          if ( !b && !c.extends ) return h( a, c )
        }
      }
    }

    function t( b ) {
      var c = D.call( this, b );
      return a.upgradeAll( c ), c
    }
    a || ( a = window.CustomElements = {
      flags: {}
    } );
    var u = a.flags,
      v = Boolean( document.registerElement ),
      w = !u.register && v && !window.ShadowDOMPolyfill;
    if ( w ) {
      var x = function () {};
      a.registry = {}, a.upgradeElement = x, a.watchShadow = x, a.upgrade = x, a.upgradeAll = x, a.upgradeSubtree = x, a.observeDocument = x, a.upgradeDocument = x, a.upgradeDocumentTree = x, a.takeRecords = x, a.reservedTagList = []
    } else {
      var y = [ "annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph" ],
        z = {},
        A = "http://www.w3.org/1999/xhtml",
        B = document.createElement.bind( document ),
        C = document.createElementNS.bind( document ),
        D = Node.prototype.cloneNode;
      document.registerElement = b, document.createElement = r, document.createElementNS = q, Node.prototype.cloneNode = t, a.registry = z, a.upgrade = s
    }
    var E;
    E = Object.__proto__ || w ? function ( a, b ) {
      return a instanceof b
    } : function ( a, b ) {
      for ( var c = a; c; ) {
        if ( c === b.prototype ) return !0;
        c = c.__proto__
      }
      return !1
    }, a.instanceof = E, a.reservedTagList = y, document.register = document.registerElement, a.hasNative = v, a.useNative = w
  }( window.CustomElements ),
  function ( a ) {
    function b( a ) {
      return "link" === a.localName && a.getAttribute( "rel" ) === c
    }
    var c = a.IMPORT_LINK_TYPE,
      d = {
        selectors: [ "link[rel=" + c + "]" ],
        map: {
          link: "parseLink"
        },
        parse: function ( a ) {
          if ( !a.__parsed ) {
            a.__parsed = !0;
            var b = a.querySelectorAll( d.selectors );
            e( b, function ( a ) {
              d[ d.map[ a.localName ] ]( a )
            } ), CustomElements.upgradeDocument( a ), CustomElements.observeDocument( a )
          }
        },
        parseLink: function ( a ) {
          b( a ) && this.parseImport( a )
        },
        parseImport: function ( a ) {
          a.import && d.parse( a.import )
        }
      },
      e = Array.prototype.forEach.call.bind( Array.prototype.forEach );
    a.parser = d, a.IMPORT_LINK_TYPE = c
  }( window.CustomElements ),
  function ( a ) {
    function b() {
      CustomElements.parser.parse( document ), CustomElements.upgradeDocument( document );
      var a = window.Platform && Platform.endOfMicrotask ? Platform.endOfMicrotask : setTimeout;
      a( function () {
        CustomElements.ready = !0, CustomElements.readyTime = Date.now(), window.HTMLImports && ( CustomElements.elapsed = CustomElements.readyTime - HTMLImports.readyTime ), document.dispatchEvent( new CustomEvent( "WebComponentsReady", {
          bubbles: !0
        } ) ), window.HTMLImports && ( HTMLImports.__importsParsingHook = function ( a ) {
          CustomElements.parser.parse( a.import )
        } )
      } )
    }
    if ( "function" != typeof window.CustomEvent && ( window.CustomEvent = function ( a ) {
        var b = document.createEvent( "HTMLEvents" );
        return b.initEvent( a, !0, !0 ), b
      } ), "complete" === document.readyState || a.flags.eager ) b();
    else if ( "interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready ) {
      var c = window.HTMLImports && !HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
      window.addEventListener( c, b )
    } else b()
  }( window.CustomElements ),
  function () {
    if ( window.ShadowDOMPolyfill ) {
      var a = [ "upgradeAll", "upgradeSubtree", "observeDocument", "upgradeDocument" ],
        b = {};
      a.forEach( function ( a ) {
        b[ a ] = CustomElements[ a ]
      } ), a.forEach( function ( a ) {
        CustomElements[ a ] = function ( c ) {
          return b[ a ]( wrap( c ) )
        }
      } )
    }
  }(),
  function ( a ) {
    function b( a ) {
      this.regex = a
    }
    var c = a.endOfMicrotask;
    b.prototype = {
      extractUrls: function ( a, b ) {
        for ( var c, d, e = []; c = this.regex.exec( a ); ) d = new URL( c[ 1 ], b ), e.push( {
          matched: c[ 0 ],
          url: d.href
        } );
        return e
      },
      process: function ( a, b, c ) {
        var d = this.extractUrls( a, b );
        this.fetch( d, {}, c )
      },
      fetch: function ( a, b, d ) {
        var e = a.length;
        if ( !e ) return d( b );
        for ( var f, g, h, i = function () {
            0 === --e && d( b )
          }, j = function ( a, c ) {
            var d = c.match,
              e = d.url;
            if ( a ) return b[ e ] = "", i();
            var f = c.response || c.responseText;
            b[ e ] = f, this.fetch( this.extractUrls( f, e ), b, i )
          }, k = 0; e > k; k++ ) f = a[ k ], h = f.url, b[ h ] ? c( i ) : ( g = this.xhr( h, j, this ), g.match = f, b[ h ] = g )
      },
      xhr: function ( a, b, c ) {
        var d = new XMLHttpRequest;
        return d.open( "GET", a, !0 ), d.send(), d.onload = function () {
          b.call( c, null, d )
        }, d.onerror = function () {
          b.call( c, null, d )
        }, d
      }
    }, a.Loader = b
  }( window.Platform ),
  function ( a ) {
    function b() {
      this.loader = new d( this.regex )
    }
    var c = a.urlResolver,
      d = a.Loader;
    b.prototype = {
      regex: /@import\s+(?:url)?["'\(]*([^'"\)]*)['"\)]*;/g,
      resolve: function ( a, b, c ) {
        var d = function ( d ) {
          c( this.flatten( a, b, d ) )
        }.bind( this );
        this.loader.process( a, b, d )
      },
      resolveNode: function ( a, b ) {
        var c = a.textContent,
          d = a.ownerDocument.baseURI,
          e = function ( c ) {
            a.textContent = c, b( a )
          };
        this.resolve( c, d, e )
      },
      flatten: function ( a, b, d ) {
        for ( var e, f, g, h = this.loader.extractUrls( a, b ), i = 0; i < h.length; i++ ) e = h[ i ], f = e.url, g = c.resolveCssText( d[ f ], f ), g = this.flatten( g, b, d ), a = a.replace( e.matched, g );
        return a
      },
      loadStyles: function ( a, b ) {
        function c() {
          e++, e === f && b && b()
        }
        for ( var d, e = 0, f = a.length, g = 0; f > g && ( d = a[ g ] ); g++ ) this.resolveNode( d, c )
      }
    };
    var e = new b;
    a.styleResolver = e
  }( window.Platform ),
  function () {
    "use strict";

    function a( a ) {
      for ( ; a.parentNode; ) a = a.parentNode;
      return "function" == typeof a.getElementById ? a : null
    }

    function b( a, b, c ) {
      var d = a.bindings_;
      return d || ( d = a.bindings_ = {} ), d[ b ] && c[ b ].close(), d[ b ] = c
    }

    function c( a, b, c ) {
      return c
    }

    function d( a ) {
      return null == a ? "" : a
    }

    function e( a, b ) {
      a.data = d( b )
    }

    function f( a ) {
      return function ( b ) {
        return e( a, b )
      }
    }

    function g( a, b, c, e ) {
      return c ? void( e ? a.setAttribute( b, "" ) : a.removeAttribute( b ) ) : void a.setAttribute( b, d( e ) )
    }

    function h( a, b, c ) {
      return function ( d ) {
        g( a, b, c, d )
      }
    }

    function i( a ) {
      switch ( a.type ) {
        case "checkbox":
          return u;
        case "radio":
        case "select-multiple":
        case "select-one":
          return "change";
        case "range":
          if ( /Trident|MSIE/.test( navigator.userAgent ) ) return "change";
        default:
          return "input"
      }
    }

    function j( a, b, c, e ) {
      a[ b ] = ( e || d )( c )
    }

    function k( a, b, c ) {
      return function ( d ) {
        return j( a, b, d, c )
      }
    }

    function l() {}

    function m( a, b, c, d ) {
      function e() {
        c.setValue( a[ b ] ), c.discardChanges(), ( d || l )( a ), Platform.performMicrotaskCheckpoint()
      }
      var f = i( a );
      return a.addEventListener( f, e ), {
        close: function () {
          a.removeEventListener( f, e ), c.close()
        },
        observable_: c
      }
    }

    function n( a ) {
      return Boolean( a )
    }

    function o( b ) {
      if ( b.form ) return s( b.form.elements, function ( a ) {
        return a != b && "INPUT" == a.tagName && "radio" == a.type && a.name == b.name
      } );
      var c = a( b );
      if ( !c ) return [];
      var d = c.querySelectorAll( 'input[type="radio"][name="' + b.name + '"]' );
      return s( d, function ( a ) {
        return a != b && !a.form
      } )
    }

    function p( a ) {
      "INPUT" === a.tagName && "radio" === a.type && o( a ).forEach( function ( a ) {
        var b = a.bindings_.checked;
        b && b.observable_.setValue( !1 )
      } )
    }

    function q( a, b ) {
      var c, e, f, g = a.parentNode;
      g instanceof HTMLSelectElement && g.bindings_ && g.bindings_.value && ( c = g, e = c.bindings_.value, f = c.value ), a.value = d( b ), c && c.value != f && ( e.observable_.setValue( c.value ), e.observable_.discardChanges(), Platform.performMicrotaskCheckpoint() )
    }

    function r( a ) {
      return function ( b ) {
        q( a, b )
      }
    }
    var s = Array.prototype.filter.call.bind( Array.prototype.filter );
    Node.prototype.bind = function ( a, b ) {
      console.error( "Unhandled binding to Node: ", this, a, b )
    }, Node.prototype.bindFinished = function () {};
    var t = c;
    Object.defineProperty( Platform, "enableBindingsReflection", {
      get: function () {
        return t === b
      },
      set: function ( a ) {
        return t = a ? b : c, a
      },
      configurable: !0
    } ), Text.prototype.bind = function ( a, b, c ) {
      if ( "textContent" !== a ) return Node.prototype.bind.call( this, a, b, c );
      if ( c ) return e( this, b );
      var d = b;
      return e( this, d.open( f( this ) ) ), t( this, a, d )
    }, Element.prototype.bind = function ( a, b, c ) {
      var d = "?" == a[ a.length - 1 ];
      if ( d && ( this.removeAttribute( a ), a = a.slice( 0, -1 ) ), c ) return g( this, a, d, b );
      var e = b;
      return g( this, a, d, e.open( h( this, a, d ) ) ), t( this, a, e )
    };
    var u;
    ! function () {
      var a = document.createElement( "div" ),
        b = a.appendChild( document.createElement( "input" ) );
      b.setAttribute( "type", "checkbox" );
      var c, d = 0;
      b.addEventListener( "click", function () {
        d++, c = c || "click"
      } ), b.addEventListener( "change", function () {
        d++, c = c || "change"
      } );
      var e = document.createEvent( "MouseEvent" );
      e.initMouseEvent( "click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null ), b.dispatchEvent( e ), u = 1 == d ? "change" : c
    }(), HTMLInputElement.prototype.bind = function ( a, c, e ) {
      if ( "value" !== a && "checked" !== a ) return HTMLElement.prototype.bind.call( this, a, c, e );
      this.removeAttribute( a );
      var f = "checked" == a ? n : d,
        g = "checked" == a ? p : l;
      if ( e ) return j( this, a, c, f );
      var h = c,
        i = m( this, a, h, g );
      return j( this, a, h.open( k( this, a, f ) ), f ), b( this, a, i )
    }, HTMLTextAreaElement.prototype.bind = function ( a, b, c ) {
      if ( "value" !== a ) return HTMLElement.prototype.bind.call( this, a, b, c );
      if ( this.removeAttribute( "value" ), c ) return j( this, "value", b );
      var e = b,
        f = m( this, "value", e );
      return j( this, "value", e.open( k( this, "value", d ) ) ), t( this, a, f )
    }, HTMLOptionElement.prototype.bind = function ( a, b, c ) {
      if ( "value" !== a ) return HTMLElement.prototype.bind.call( this, a, b, c );
      if ( this.removeAttribute( "value" ), c ) return q( this, b );
      var d = b,
        e = m( this, "value", d );
      return q( this, d.open( r( this ) ) ), t( this, a, e )
    }, HTMLSelectElement.prototype.bind = function ( a, c, d ) {
      if ( "selectedindex" === a && ( a = "selectedIndex" ), "selectedIndex" !== a && "value" !== a ) return HTMLElement.prototype.bind.call( this, a, c, d );
      if ( this.removeAttribute( a ), d ) return j( this, a, c );
      var e = c,
        f = m( this, a, e );
      return j( this, a, e.open( k( this, a ) ) ), b( this, a, f )
    }
  }( this ),
  function ( a ) {
    "use strict";

    function b( a ) {
      if ( !a ) throw new Error( "Assertion failed" )
    }

    function c( a ) {
      for ( var b; b = a.parentNode; ) a = b;
      return a
    }

    function d( a, b ) {
      if ( b ) {
        for ( var d, e = "#" + b; !d && ( a = c( a ), a.protoContent_ ? d = a.protoContent_.querySelector( e ) : a.getElementById && ( d = a.getElementById( b ) ), !d && a.templateCreator_ ); ) a = a.templateCreator_;
        return d
      }
    }

    function e( a ) {
      return "template" == a.tagName && "http://www.w3.org/2000/svg" == a.namespaceURI
    }

    function f( a ) {
      return "TEMPLATE" == a.tagName && "http://www.w3.org/1999/xhtml" == a.namespaceURI
    }

    function g( a ) {
      return Boolean( L[ a.tagName ] && a.hasAttribute( "template" ) )
    }

    function h( a ) {
      return void 0 === a.isTemplate_ && ( a.isTemplate_ = "TEMPLATE" == a.tagName || g( a ) ), a.isTemplate_
    }

    function i( a, b ) {
      var c = a.querySelectorAll( N );
      h( a ) && b( a ), G( c, b )
    }

    function j( a ) {
      function b( a ) {
        HTMLTemplateElement.decorate( a ) || j( a.content )
      }
      i( a, b )
    }

    function k( a, b ) {
      Object.getOwnPropertyNames( b ).forEach( function ( c ) {
        Object.defineProperty( a, c, Object.getOwnPropertyDescriptor( b, c ) )
      } )
    }

    function l( a ) {
      var b = a.ownerDocument;
      if ( !b.defaultView ) return b;
      var c = b.templateContentsOwner_;
      if ( !c ) {
        for ( c = b.implementation.createHTMLDocument( "" ); c.lastChild; ) c.removeChild( c.lastChild );
        b.templateContentsOwner_ = c
      }
      return c
    }

    function m( a ) {
      if ( !a.stagingDocument_ ) {
        var b = a.ownerDocument;
        if ( !b.stagingDocument_ ) {
          b.stagingDocument_ = b.implementation.createHTMLDocument( "" ), b.stagingDocument_.isStagingDocument = !0;
          var c = b.stagingDocument_.createElement( "base" );
          c.href = document.baseURI, b.stagingDocument_.head.appendChild( c ), b.stagingDocument_.stagingDocument_ = b.stagingDocument_
        }
        a.stagingDocument_ = b.stagingDocument_
      }
      return a.stagingDocument_
    }

    function n( a ) {
      var b = a.ownerDocument.createElement( "template" );
      a.parentNode.insertBefore( b, a );
      for ( var c = a.attributes, d = c.length; d-- > 0; ) {
        var e = c[ d ];
        K[ e.name ] && ( "template" !== e.name && b.setAttribute( e.name, e.value ), a.removeAttribute( e.name ) )
      }
      return b
    }

    function o( a ) {
      var b = a.ownerDocument.createElement( "template" );
      a.parentNode.insertBefore( b, a );
      for ( var c = a.attributes, d = c.length; d-- > 0; ) {
        var e = c[ d ];
        b.setAttribute( e.name, e.value ), a.removeAttribute( e.name )
      }
      return a.parentNode.removeChild( a ), b
    }

    function p( a, b, c ) {
      var d = a.content;
      if ( c ) return void d.appendChild( b );
      for ( var e; e = b.firstChild; ) d.appendChild( e )
    }

    function q( a ) {
      P ? a.__proto__ = HTMLTemplateElement.prototype : k( a, HTMLTemplateElement.prototype )
    }

    function r( a ) {
      a.setModelFn_ || ( a.setModelFn_ = function () {
        a.setModelFnScheduled_ = !1;
        var b = z( a, a.delegate_ && a.delegate_.prepareBinding );
        w( a, b, a.model_ )
      } ), a.setModelFnScheduled_ || ( a.setModelFnScheduled_ = !0, Observer.runEOM_( a.setModelFn_ ) )
    }

    function s( a, b, c, d ) {
      if ( a && a.length ) {
        for ( var e, f = a.length, g = 0, h = 0, i = 0, j = !0; f > h; ) {
          var g = a.indexOf( "{{", h ),
            k = a.indexOf( "[[", h ),
            l = !1,
            m = "}}";
          if ( k >= 0 && ( 0 > g || g > k ) && ( g = k, l = !0, m = "]]" ), i = 0 > g ? -1 : a.indexOf( m, g + 2 ), 0 > i ) {
            if ( !e ) return;
            e.push( a.slice( h ) );
            break
          }
          e = e || [], e.push( a.slice( h, g ) );
          var n = a.slice( g + 2, i ).trim();
          e.push( l ), j = j && l;
          var o = d && d( n, b, c );
          e.push( null == o ? Path.get( n ) : null ), e.push( o ), h = i + 2
        }
        return h === f && e.push( "" ), e.hasOnePath = 5 === e.length, e.isSimplePath = e.hasOnePath && "" == e[ 0 ] && "" == e[ 4 ], e.onlyOneTime = j, e.combinator = function ( a ) {
          for ( var b = e[ 0 ], c = 1; c < e.length; c += 4 ) {
            var d = e.hasOnePath ? a : a[ ( c - 1 ) / 4 ];
            void 0 !== d && ( b += d ), b += e[ c + 3 ]
          }
          return b
        }, e
      }
    }

    function t( a, b, c, d ) {
      if ( b.hasOnePath ) {
        var e = b[ 3 ],
          f = e ? e( d, c, !0 ) : b[ 2 ].getValueFrom( d );
        return b.isSimplePath ? f : b.combinator( f )
      }
      for ( var g = [], h = 1; h < b.length; h += 4 ) {
        var e = b[ h + 2 ];
        g[ ( h - 1 ) / 4 ] = e ? e( d, c ) : b[ h + 1 ].getValueFrom( d )
      }
      return b.combinator( g )
    }

    function u( a, b, c, d ) {
      var e = b[ 3 ],
        f = e ? e( d, c, !1 ) : new PathObserver( d, b[ 2 ] );
      return b.isSimplePath ? f : new ObserverTransform( f, b.combinator )
    }

    function v( a, b, c, d ) {
      if ( b.onlyOneTime ) return t( a, b, c, d );
      if ( b.hasOnePath ) return u( a, b, c, d );
      for ( var e = new CompoundObserver, f = 1; f < b.length; f += 4 ) {
        var g = b[ f ],
          h = b[ f + 2 ];
        if ( h ) {
          var i = h( d, c, g );
          g ? e.addPath( i ) : e.addObserver( i )
        } else {
          var j = b[ f + 1 ];
          g ? e.addPath( j.getValueFrom( d ) ) : e.addPath( d, j )
        }
      }
      return new ObserverTransform( e, b.combinator )
    }

    function w( a, b, c, d ) {
      for ( var e = 0; e < b.length; e += 2 ) {
        var f = b[ e ],
          g = b[ e + 1 ],
          h = v( f, g, a, c ),
          i = a.bind( f, h, g.onlyOneTime );
        i && d && d.push( i )
      }
      if ( a.bindFinished(), b.isTemplate ) {
        a.model_ = c;
        var j = a.processBindingDirectives_( b );
        d && j && d.push( j )
      }
    }

    function x( a, b, c ) {
      var d = a.getAttribute( b );
      return s( "" == d ? "{{}}" : d, b, a, c )
    }

    function y( a, c ) {
      b( a );
      for ( var d = [], e = 0; e < a.attributes.length; e++ ) {
        for ( var f = a.attributes[ e ], g = f.name, i = f.value;
          "_" === g[ 0 ]; ) g = g.substring( 1 );
        if ( !h( a ) || g !== J && g !== H && g !== I ) {
          var j = s( i, g, a, c );
          j && d.push( g, j )
        }
      }
      return h( a ) && ( d.isTemplate = !0, d.if = x( a, J, c ), d.bind = x( a, H, c ), d.repeat = x( a, I, c ), !d.if || d.bind || d.repeat || ( d.bind = s( "{{}}", H, a, c ) ) ), d
    }

    function z( a, b ) {
      if ( a.nodeType === Node.ELEMENT_NODE ) return y( a, b );
      if ( a.nodeType === Node.TEXT_NODE ) {
        var c = s( a.data, "textContent", a, b );
        if ( c ) return [ "textContent", c ]
      }
      return []
    }

    function A( a, b, c, d, e, f, g ) {
      for ( var h = b.appendChild( c.importNode( a, !1 ) ), i = 0, j = a.firstChild; j; j = j.nextSibling ) A( j, h, c, d.children[ i++ ], e, f, g );
      return d.isTemplate && ( HTMLTemplateElement.decorate( h, a ), f && h.setDelegate_( f ) ), w( h, d, e, g ), h
    }

    function B( a, b ) {
      var c = z( a, b );
      c.children = {};
      for ( var d = 0, e = a.firstChild; e; e = e.nextSibling ) c.children[ d++ ] = B( e, b );
      return c
    }

    function C( a ) {
      var b = a.id_;
      return b || ( b = a.id_ = S++ ), b
    }

    function D( a, b ) {
      var c = C( a );
      if ( b ) {
        var d = b.bindingMaps[ c ];
        return d || ( d = b.bindingMaps[ c ] = B( a, b.prepareBinding ) || [] ), d
      }
      var d = a.bindingMap_;
      return d || ( d = a.bindingMap_ = B( a, void 0 ) || [] ), d
    }

    function E( a ) {
      this.closed = !1, this.templateElement_ = a, this.instances = [], this.deps = void 0, this.iteratedValue = [], this.presentValue = void 0, this.arrayObserver = void 0
    }
    var F, G = Array.prototype.forEach.call.bind( Array.prototype.forEach );
    a.Map && "function" == typeof a.Map.prototype.forEach ? F = a.Map : ( F = function () {
      this.keys = [], this.values = []
    }, F.prototype = {
      set: function ( a, b ) {
        var c = this.keys.indexOf( a );
        0 > c ? ( this.keys.push( a ), this.values.push( b ) ) : this.values[ c ] = b
      },
      get: function ( a ) {
        var b = this.keys.indexOf( a );
        if ( !( 0 > b ) ) return this.values[ b ]
      },
      "delete": function ( a ) {
        var b = this.keys.indexOf( a );
        return 0 > b ? !1 : ( this.keys.splice( b, 1 ), this.values.splice( b, 1 ), !0 )
      },
      forEach: function ( a, b ) {
        for ( var c = 0; c < this.keys.length; c++ ) a.call( b || this, this.values[ c ], this.keys[ c ], this )
      }
    } );
    "function" != typeof document.contains && ( Document.prototype.contains = function ( a ) {
      return a === this || a.parentNode === this ? !0 : this.documentElement.contains( a )
    } );
    var H = "bind",
      I = "repeat",
      J = "if",
      K = {
        template: !0,
        repeat: !0,
        bind: !0,
        ref: !0
      },
      L = {
        THEAD: !0,
        TBODY: !0,
        TFOOT: !0,
        TH: !0,
        TR: !0,
        TD: !0,
        COLGROUP: !0,
        COL: !0,
        CAPTION: !0,
        OPTION: !0,
        OPTGROUP: !0
      },
      M = "undefined" != typeof HTMLTemplateElement;
    M && ! function () {
      var a = document.createElement( "template" ),
        b = a.content.ownerDocument,
        c = b.appendChild( b.createElement( "html" ) ),
        d = c.appendChild( b.createElement( "head" ) ),
        e = b.createElement( "base" );
      e.href = document.baseURI, d.appendChild( e )
    }();
    var N = "template, " + Object.keys( L ).map( function ( a ) {
      return a.toLowerCase() + "[template]"
    } ).join( ", " );
    document.addEventListener( "DOMContentLoaded", function () {
      j( document ), Platform.performMicrotaskCheckpoint()
    }, !1 ), M || ( a.HTMLTemplateElement = function () {
      throw TypeError( "Illegal constructor" )
    } );
    var O, P = "__proto__" in {};
    "function" == typeof MutationObserver && ( O = new MutationObserver( function ( a ) {
      for ( var b = 0; b < a.length; b++ ) a[ b ].target.refChanged_()
    } ) ), HTMLTemplateElement.decorate = function ( a, c ) {
      if ( a.templateIsDecorated_ ) return !1;
      var d = a;
      d.templateIsDecorated_ = !0;
      var h = f( d ) && M,
        i = h,
        k = !h,
        m = !1;
      if ( h || ( g( d ) ? ( b( !c ), d = n( a ), d.templateIsDecorated_ = !0, h = M, m = !0 ) : e( d ) && ( d = o( a ), d.templateIsDecorated_ = !0, h = M ) ), !h ) {
        q( d );
        var r = l( d );
        d.content_ = r.createDocumentFragment()
      }
      return c ? d.instanceRef_ = c : k ? p( d, a, m ) : i && j( d.content ), !0
    }, HTMLTemplateElement.bootstrap = j;
    var Q = a.HTMLUnknownElement || HTMLElement,
      R = {
        get: function () {
          return this.content_
        },
        enumerable: !0,
        configurable: !0
      };
    M || ( HTMLTemplateElement.prototype = Object.create( Q.prototype ), Object.defineProperty( HTMLTemplateElement.prototype, "content", R ) ), k( HTMLTemplateElement.prototype, {
      bind: function ( a, b, c ) {
        if ( "ref" != a ) return Element.prototype.bind.call( this, a, b, c );
        var d = this,
          e = c ? b : b.open( function ( a ) {
            d.setAttribute( "ref", a ), d.refChanged_()
          } );
        return this.setAttribute( "ref", e ), this.refChanged_(), c ? void 0 : ( this.bindings_ ? this.bindings_.ref = b : this.bindings_ = {
          ref: b
        }, b )
      },
      processBindingDirectives_: function ( a ) {
        return this.iterator_ && this.iterator_.closeDeps(), a.if || a.bind || a.repeat ? ( this.iterator_ || ( this.iterator_ = new E( this ) ), this.iterator_.updateDependencies( a, this.model_ ), O && O.observe( this, {
          attributes: !0,
          attributeFilter: [ "ref" ]
        } ), this.iterator_ ) : void( this.iterator_ && ( this.iterator_.close(), this.iterator_ = void 0 ) )
      },
      createInstance: function ( a, b, c ) {
        b ? c = this.newDelegate_( b ) : c || ( c = this.delegate_ ), this.refContent_ || ( this.refContent_ = this.ref_.content );
        var d = this.refContent_;
        if ( null === d.firstChild ) return T;
        var e = D( d, c ),
          f = m( this ),
          g = f.createDocumentFragment();
        g.templateCreator_ = this, g.protoContent_ = d, g.bindings_ = [], g.terminator_ = null;
        for ( var h = g.templateInstance_ = {
            firstNode: null,
            lastNode: null,
            model: a
          }, i = 0, j = !1, k = d.firstChild; k; k = k.nextSibling ) {
          null === k.nextSibling && ( j = !0 );
          var l = A( k, g, f, e.children[ i++ ], a, c, g.bindings_ );
          l.templateInstance_ = h, j && ( g.terminator_ = l )
        }
        return h.firstNode = g.firstChild, h.lastNode = g.lastChild, g.templateCreator_ = void 0, g.protoContent_ = void 0, g
      },
      get model() {
        return this.model_
      },
      set model( a ) {
        this.model_ = a, r( this )
      },
      get bindingDelegate() {
        return this.delegate_ && this.delegate_.raw
      },
      refChanged_: function () {
        this.iterator_ && this.refContent_ !== this.ref_.content && ( this.refContent_ = void 0, this.iterator_.valueChanged(), this.iterator_.updateIteratedValue() )
      },
      clear: function () {
        this.model_ = void 0, this.delegate_ = void 0, this.bindings_ && this.bindings_.ref && this.bindings_.ref.close(), this.refContent_ = void 0, this.iterator_ && ( this.iterator_.valueChanged(), this.iterator_.close(), this.iterator_ = void 0 )
      },
      setDelegate_: function ( a ) {
        this.delegate_ = a, this.bindingMap_ = void 0, this.iterator_ && ( this.iterator_.instancePositionChangedFn_ = void 0, this.iterator_.instanceModelFn_ = void 0 )
      },
      newDelegate_: function ( a ) {
        function b( b ) {
          var c = a && a[ b ];
          if ( "function" == typeof c ) return function () {
            return c.apply( a, arguments )
          }
        }
        if ( a ) return {
          bindingMaps: {},
          raw: a,
          prepareBinding: b( "prepareBinding" ),
          prepareInstanceModel: b( "prepareInstanceModel" ),
          prepareInstancePositionChanged: b( "prepareInstancePositionChanged" )
        }
      },
      set bindingDelegate( a ) {
        if ( this.delegate_ ) throw Error( "Template must be cleared before a new bindingDelegate can be assigned" );
        this.setDelegate_( this.newDelegate_( a ) )
      },
      get ref_() {
        var a = d( this, this.getAttribute( "ref" ) );
        if ( a || ( a = this.instanceRef_ ), !a ) return this;
        var b = a.ref_;
        return b ? b : a
      }
    } );
    var S = 1;
    Object.defineProperty( Node.prototype, "templateInstance", {
      get: function () {
        var a = this.templateInstance_;
        return a ? a : this.parentNode ? this.parentNode.templateInstance : void 0
      }
    } );
    var T = document.createDocumentFragment();
    T.bindings_ = [], T.terminator_ = null, E.prototype = {
      closeDeps: function () {
        var a = this.deps;
        a && ( a.ifOneTime === !1 && a.ifValue.close(), a.oneTime === !1 && a.value.close() )
      },
      updateDependencies: function ( a, b ) {
        this.closeDeps();
        var c = this.deps = {},
          d = this.templateElement_;
        if ( a.if ) {
          if ( c.hasIf = !0, c.ifOneTime = a.if.onlyOneTime, c.ifValue = v( J, a.if, d, b ), c.ifOneTime && !c.ifValue ) return void this.updateIteratedValue();
          c.ifOneTime || c.ifValue.open( this.updateIteratedValue, this )
        }
        a.repeat ? ( c.repeat = !0, c.oneTime = a.repeat.onlyOneTime, c.value = v( I, a.repeat, d, b ) ) : ( c.repeat = !1, c.oneTime = a.bind.onlyOneTime, c.value = v( H, a.bind, d, b ) ), c.oneTime || c.value.open( this.updateIteratedValue, this ), this.updateIteratedValue()
      },
      updateIteratedValue: function () {
        if ( this.deps.hasIf ) {
          var a = this.deps.ifValue;
          if ( this.deps.ifOneTime || ( a = a.discardChanges() ), !a ) return void this.valueChanged()
        }
        var b = this.deps.value;
        this.deps.oneTime || ( b = b.discardChanges() ), this.deps.repeat || ( b = [ b ] );
        var c = this.deps.repeat && !this.deps.oneTime && Array.isArray( b );
        this.valueChanged( b, c )
      },
      valueChanged: function ( a, b ) {
        Array.isArray( a ) || ( a = [] ), a !== this.iteratedValue && ( this.unobserve(), this.presentValue = a, b && ( this.arrayObserver = new ArrayObserver( this.presentValue ), this.arrayObserver.open( this.handleSplices, this ) ), this.handleSplices( ArrayObserver.calculateSplices( this.presentValue, this.iteratedValue ) ) )
      },
      getLastInstanceNode: function ( a ) {
        if ( -1 == a ) return this.templateElement_;
        var b = this.instances[ a ],
          c = b.terminator_;
        if ( !c ) return this.getLastInstanceNode( a - 1 );
        if ( c.nodeType !== Node.ELEMENT_NODE || this.templateElement_ === c ) return c;
        var d = c.iterator_;
        return d ? d.getLastTemplateNode() : c
      },
      getLastTemplateNode: function () {
        return this.getLastInstanceNode( this.instances.length - 1 )
      },
      insertInstanceAt: function ( a, b ) {
        var c = this.getLastInstanceNode( a - 1 ),
          d = this.templateElement_.parentNode;
        this.instances.splice( a, 0, b ), d.insertBefore( b, c.nextSibling )
      },
      extractInstanceAt: function ( a ) {
        for ( var b = this.getLastInstanceNode( a - 1 ), c = this.getLastInstanceNode( a ), d = this.templateElement_.parentNode, e = this.instances.splice( a, 1 )[ 0 ]; c !== b; ) {
          var f = b.nextSibling;
          f == c && ( c = b ), e.appendChild( d.removeChild( f ) )
        }
        return e
      },
      getDelegateFn: function ( a ) {
        return a = a && a( this.templateElement_ ), "function" == typeof a ? a : null
      },
      handleSplices: function ( a ) {
        if ( !this.closed && a.length ) {
          var b = this.templateElement_;
          if ( !b.parentNode ) return void this.close();
          ArrayObserver.applySplices( this.iteratedValue, this.presentValue, a );
          var c = b.delegate_;
          void 0 === this.instanceModelFn_ && ( this.instanceModelFn_ = this.getDelegateFn( c && c.prepareInstanceModel ) ), void 0 === this.instancePositionChangedFn_ && ( this.instancePositionChangedFn_ = this.getDelegateFn( c && c.prepareInstancePositionChanged ) );
          for ( var d = new F, e = 0, f = 0; f < a.length; f++ ) {
            for ( var g = a[ f ], h = g.removed, i = 0; i < h.length; i++ ) {
              var j = h[ i ],
                k = this.extractInstanceAt( g.index + e );
              k !== T && d.set( j, k )
            }
            e -= g.addedCount
          }
          for ( var f = 0; f < a.length; f++ )
            for ( var g = a[ f ], l = g.index; l < g.index + g.addedCount; l++ ) {
              var j = this.iteratedValue[ l ],
                k = d.get( j );
              k ? d.delete( j ) : ( this.instanceModelFn_ && ( j = this.instanceModelFn_( j ) ), k = void 0 === j ? T : b.createInstance( j, void 0, c ) ), this.insertInstanceAt( l, k )
            }
          d.forEach( function ( a ) {
            this.closeInstanceBindings( a )
          }, this ), this.instancePositionChangedFn_ && this.reportInstancesMoved( a )
        }
      },
      reportInstanceMoved: function ( a ) {
        var b = this.instances[ a ];
        b !== T && this.instancePositionChangedFn_( b.templateInstance_, a )
      },
      reportInstancesMoved: function ( a ) {
        for ( var b = 0, c = 0, d = 0; d < a.length; d++ ) {
          var e = a[ d ];
          if ( 0 != c )
            for ( ; b < e.index; ) this.reportInstanceMoved( b ), b++;
          else b = e.index;
          for ( ; b < e.index + e.addedCount; ) this.reportInstanceMoved( b ), b++;
          c += e.addedCount - e.removed.length
        }
        if ( 0 != c )
          for ( var f = this.instances.length; f > b; ) this.reportInstanceMoved( b ), b++
      },
      closeInstanceBindings: function ( a ) {
        for ( var b = a.bindings_, c = 0; c < b.length; c++ ) b[ c ].close()
      },
      unobserve: function () {
        this.arrayObserver && ( this.arrayObserver.close(), this.arrayObserver = void 0 )
      },
      close: function () {
        if ( !this.closed ) {
          this.unobserve();
          for ( var a = 0; a < this.instances.length; a++ ) this.closeInstanceBindings( this.instances[ a ] );
          this.instances.length = 0, this.closeDeps(), this.templateElement_.iterator_ = void 0, this.closed = !0
        }
      }
    }, HTMLTemplateElement.forAllTemplatesFrom_ = i
  }( this ),
  function ( a ) {
    function b() {
      e || ( e = !0, a.endOfMicrotask( function () {
        e = !1, logFlags.data && console.group( "Platform.flush()" ), a.performMicrotaskCheckpoint(), logFlags.data && console.groupEnd()
      } ) )
    }
    var c = document.createElement( "style" );
    c.textContent = "template {display: none !important;} /* injected by platform.js */";
    var d = document.querySelector( "head" );
    d.insertBefore( c, d.firstChild );
    var e;
    if ( Observer.hasObjectObserve ) b = function () {};
    else {
      var f = 125;
      window.addEventListener( "WebComponentsReady", function () {
        b(), a.flushPoll = setInterval( b, f )
      } )
    }
    if ( window.CustomElements && !CustomElements.useNative ) {
      var g = Document.prototype.importNode;
      Document.prototype.importNode = function ( a, b ) {
        var c = g.call( this, a, b );
        return CustomElements.upgradeAll( c ), c
      }
    }
    a.flush = b
  }( window.Platform );

//# sourceMappingURL=platform.js.map

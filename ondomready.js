/*! 
 * onDomReady.js 1.1 (c) 2012 Tubal Martin - MIT license
 */
!function (definition) {
    if (typeof define === "function" && define.amd) {
        // Register as an AMD module.
        define(definition);
    } else {
        // Browser globals
        window.onDomReady = definition();
    }
}(function() {
    var onreadystatechange = "onreadystatechange",
    DOMContentLoaded = "DOMContentLoaded",
    addEventListener = "addEventListener",
    attachEvent = "attachEvent",
    readyState = "readyState",
    complete = "complete",
    bfalse = false,
    win = window,
    doc = win.document,
    docElem = doc.documentElement,
    top = bfalse,
    
    // Callbacks pending execution until DOM is ready
    callbacks = [],
    
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady = bfalse,
    
    // The document ready event handler
    DOMContentLoadedHandler;
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( !isReady ) {
            
            // Make sure body exists, at least, in case IE gets a little overzealous.
            if ( !doc.body ) {
                return defer( ready );
            }
            
            // Remember that the DOM is ready
            isReady = true;

            // Execute all callbacks
            while ( fn = callbacks.shift() ) {
                defer( fn );
            }
        }    
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn, wait ) {
        // Allow 0 to be passed
        win.setTimeout( fn, +wait >= 0 ? wait : 1 );
    }
    
    // Attach the listeners:

    // Catch cases where onDomReady is called after the
    // browser event has already occurred.
    if ( doc[readyState] === complete || ( doc[readyState] !== "loading" && doc[addEventListener] ) ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        defer( ready );
    } else {
        // W3C event model
        if ( doc[addEventListener] ) {
            DOMContentLoadedHandler = function() {
                doc.removeEventListener( DOMContentLoaded, DOMContentLoadedHandler, bfalse );
                ready();
            };
            
            // Use the handy event callback
            doc[addEventListener]( DOMContentLoaded, DOMContentLoadedHandler, bfalse );
    
            // A fallback to window.onload, that will always work
            win[addEventListener]( "load", ready, bfalse );
    
        // IE event model
        } else if ( doc[attachEvent] ) {
            DOMContentLoadedHandler = function() {
                if ( doc[readyState] === complete ) {
                    doc.detachEvent( onreadystatechange, DOMContentLoadedHandler );
                    ready();
                }
            };
            
            // ensure firing before onload,
            // maybe late but safe also for iframes
            doc[attachEvent]( onreadystatechange, DOMContentLoadedHandler );
    
            // A fallback to window.onload, that will always work
            win[attachEvent]( "onload", ready );
    
            // If IE and not a frame
            // continually check to see if the document is ready
            try {
                top = win.frameElement == null && docElem;
            } catch(e) {}

            if ( top && top.doScroll ) {
                (function doScrollCheck() {
                    if ( !isReady ) {

                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll("left");
                        } catch(e) {
                            return defer( doScrollCheck, 50 );
                        }

                        // and execute any waiting functions
                        ready();
                    }
                })();
            }
        }
    } 
    
    function onDomReady( fn ) { 
        // If DOM is ready, execute the function (async), otherwise wait
        isReady ? defer( fn ) : callbacks.push( fn );
    }
    
    // Add version
    onDomReady.version = "1.1";
    
    return onDomReady;
});
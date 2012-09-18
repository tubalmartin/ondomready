/*! 
 * onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license
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
    
    'use strict';

    var win = window,
        doc = win.document,
        docElem = doc.documentElement,

        FALSE = false,
        COMPLETE = "complete",
        READYSTATE = "readyState",
        ATTACHEVENT = "attachEvent",
        ADDEVENTLISTENER = "addEventListener",
        DOMCONTENTLOADED = "DOMContentLoaded",
        ONREADYSTATECHANGE = "onreadystatechange",

        // W3C Event model
        w3c = ADDEVENTLISTENER in doc,
        top = FALSE,

        // isReady: Is the DOM ready to be used? Set to true once it occurs.
        isReady = FALSE,

        // Callbacks pending execution until DOM is ready
        callbacks = [];
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( !isReady ) {
            
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
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

    // The document ready event handler
    function DOMContentLoadedHandler() {
        if ( w3c ) {
            doc.removeEventListener( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );
            ready();
        } else if ( doc[READYSTATE] === COMPLETE ) {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            doc.detachEvent( ONREADYSTATECHANGE, DOMContentLoadedHandler );
            ready();
        }
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn, wait ) {
        // Allow 0 to be passed
        setTimeout( fn, +wait >= 0 ? wait : 1 );
    }
    
    // Attach the listeners:

    // Catch cases where onDomReady is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( doc[READYSTATE] === COMPLETE ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        defer( ready );

    // Standards-based browsers support DOMContentLoaded    
    } else if ( w3c ) {
        // Use the handy event callback
        doc[ADDEVENTLISTENER]( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );

        // A fallback to window.onload, that will always work
        win[ADDEVENTLISTENER]( "load", ready, FALSE );

    // If IE event model is used
    } else {            
        // ensure firing before onload,
        // maybe late but safe also for iframes
        doc[ATTACHEVENT]( ONREADYSTATECHANGE, DOMContentLoadedHandler );

        // A fallback to window.onload, that will always work
        win[ATTACHEVENT]( "onload", ready );

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
    
    function onDomReady( fn ) { 
        // If DOM is ready, execute the function (async), otherwise wait
        isReady ? defer( fn ) : callbacks.push( fn );
    }
    
    // Add version
    onDomReady.version = "1.2";
    
    return onDomReady;
});
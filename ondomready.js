/*! 
 * onDomReady.js 1.0 (c) 2012 Tubal Martin - MIT license
 */
!function (definition) {
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module.
        define(definition);
    } else {
        // Browser globals
        window.onDomReady = definition();
    }
}(function() {
    var onreadystatechange = 'onreadystatechange',
    DOMContentLoaded = 'DOMContentLoaded',
    addEventListener = 'addEventListener',
    attachEvent = 'attachEvent',
    readyState = 'readyState',
    complete = 'complete',
    bfalse = false,
    win = window,
    doc = win.document,
    docElem = doc.documentElement,
    toplevel = bfalse,
    
    // Callbacks pending execution until DOM is ready
    callbacks = [],
    
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady = bfalse,
    
    // The document ready event handler
    DOMContentLoadedHandler;
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( isReady ) {
            return;
        }
        
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
    
    // The DOM ready check for Internet Explorer
    function doScrollCheck() {
        if ( isReady ) {
            return;
        }
    
        try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            docElem.doScroll('left');
        } catch(e) {
            return defer( doScrollCheck );
        }
    
        // and execute any waiting functions
        ready();
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn ) {
        win.setTimeout( fn, 1 );
    }
    
    // Attach the listeners:
    // Catch cases where onDomReady is called after the
    // browser event has already occurred.
    if ( doc[readyState] === complete ) {
        ready();
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
            win[addEventListener]( 'load', ready, bfalse );
    
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
            win[attachEvent]( 'onload', ready );
    
            // If IE and not a frame
            // continually check to see if the document is ready
            try {
                toplevel = win.frameElement == null;
            } catch(e) {}
    
            if ( docElem.doScroll && toplevel ) {
                doScrollCheck();
            }
        }
    } 
    
    function onDomReady( fn ) { 
        // If DOM is ready, execute the function (async), otherwise wait
        isReady ? defer( fn ) : callbacks.push( fn );
    }
    
    // Add version
    onDomReady.version = '1.0';
    
    return onDomReady;
});
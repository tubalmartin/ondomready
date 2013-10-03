# onDomReady

A function that allows you to safely initialize your code when the DOM is ready.

* **Bullet proof**: Based on jQuery's `ready()` method (same behavior & reliability).
* Easy to maintain: Since onDomReady is based on jQuery's implementation, whenever the jQuery team improves it onDomReady will be updated.
* Browser support: IE6+  
* AMD compatible (anonymous module = more portable),
* MIT license.

## How to use:

```js
// Functions passed to onDomReady will be executed as soon as the DOM is ready.

// Execute this function ASAP
onDomReady( function() {
    // Your code
} );

// Define a callback
var init = function() {
    // Your code
};

// Execute the init function ASAP
onDomReady( init );

// Get the version of onDomReady (string)
var version = onDomReady.version; // "1.4.0"

// Check at anytime whether DOM is ready
onDomReady.isReady(); // returns true or false (version 1.4.0+)
```

## Changelog

**3 Oct 2013**  
Version 1.4.0: based on jQuery 1.10.x but keeping support for IE6+

**13 Jun 2013**  
Version 1.3: based on jQuery 1.10.x but keeping support for IE6+

**18 Sep 2012**  
Version 1.2: based on jQuery 1.8.1

**11 Aug 2012**  
Version 1.1: based on jQuery 1.8.0

**8 Apr 2012**  
Version 1.0: based on jQuery 1.7.2

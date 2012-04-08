# onDomReady

A function that allows you to safely initialize your code when the DOM is ready.

Since it's based on jQuery's `ready()` method, when the jQuery team improves the function I'll update onDomReady in a breeze. 

* Bullet proof: Based on jQuery 1.7 ready() method (same behavior & reliability).
* AMD compatible (anonymous module = more portable).
* MIT license

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
var version = onDomReady.version; // "1.0"
```

## Changelog

**2012/05/08**  
Version 1.0: based on jQuery 1.7.2

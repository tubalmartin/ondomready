# onDomReady

A function that allows you to safely initialize dependent code of DOM ready state.

* Bullet proof: Based on jQuery 1.7 ready() method (same behavior & reliability).
* AMD compatible (anonymous module = more portable).
* MIT license

## How to use:

```js
// Functions passed to onDomReady will be executed in order as soon as the DOM is ready.

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

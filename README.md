# About x-countdown
A custom Element using X-Tag to provide a countdown timer

# Methods
## start()

Starts a countdown

## stop()

Stops/Pauses the countdown (countdownstopped-Event will be fired)

## setCountdown(seconds)

Set amount of seconds the countdown should have

## restart([optional]newSeconds)

Restart a countdown with optional new seconds. If seconds is not given, it starts with initial seconds set
by `setCountdown()`

# Events
## `countdownstopped`
Will be fired when countdown reaches 0 or being stopped.

# Attributes
## render

Set render to `"true"` and the current countdown will be rendered into your element.
Therefore a container will be added to `x-countdown`:

`<div class="x-countdown-container"></div>`


# Example

## html
```
<!-- renders the time -->
<x-countdown render="true"></x-countdown>

<!-- does not render time. (you could leave render="false", too -->
<x-countdown render="false"></x-countdown>

```

## javascript
```
document.addEventListener('DOMComponentsLoaded', function() {
    var timer = document.querySelector('x-countdown');

    // Set countdown to 10s, add event listener and start timer!
    timer.setCountdown(10);
    timer.addEventListener('countdownstopped', function() {
        alert("stopped");
    });
    timer.start();
});

```

Take a look at `demo` for a [working example](http://casarock.github.io/experiment/x-countdown/demo/index.html).

# Download it
[Releases are here](https://github.com/casarock/countdown/releases).

Use bower: `bower install x-tag-countdown`


# Dev Setup

```
Fork this repo, rename it, then clone it.

$ npm install	// install bower tasks
$ bower install	// install components
$ grunt build   // build
$ grunt bump-push  // bump the version number, tag it and push to origin master

```



# Links

[Yeoman X-Tag Generator](https://github.com/x-tag/x-tag-generator)

[X-Tags Docs](http://x-tags.org/docs)

[Guide for creating X-Tag Components](https://github.com/x-tag/core/wiki/Creating-X-Tag-Components)

[Using X-Tag components in your applications](https://github.com/x-tag/core/wiki/Using-our-Web-Components-in-Your-Application)



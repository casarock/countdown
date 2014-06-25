(function() {

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    function Timer(countTo, renderTime, element) {

        this.countDown = countTo || 15;
        this.counter = this.countDown;
        this.initialCountDown = this.countDown;
        this.runs = false;
        this.renderTime = renderTime || false;
        this.element = element;
    }

    Timer.prototype.restart = function(newStartValue) {
        newStartValue = newStartValue || this.initialCountDown;
        this.start(newStartValue);
    };

    Timer.prototype.stop = function() {
        this.this.runs = false;
    };

    Timer.prototype.start = function(startValue) {

        startValue = startValue || this.counter;
        this.timer = Date.now();
        this.runs = true;
        this.countDown = startValue;
        this._loop.call(this);
    };

    Timer.prototype.setCountdown = function(countTo) {
        this.counter = countTo;
        this.initialCountDown = countTo;
    };

    Timer.prototype.setTimerElement = function(elementToRender) {
        this.timerElement = elementToRender;
    };

    Timer.prototype.getFormatedTime = function(seconds) {
        var mins = ~~(seconds / 60),
            secs = seconds % 60;

        return "" + formatNumbers(mins) + ":" + formatNumbers(secs);
    };

    Timer.prototype._renderTime = function() {
        this.timerElement.innerHTML = this.getFormatedTime(this.counter);
    };

    function formatNumbers(value) {
        return value < 10 ? "0" + value + "" : "" + value;
    }

    Timer.prototype._updateTimer = function() {

        var newTime = Date.now(),
            delta = parseInt((newTime - this.timer) / 1000);

        this.counter = this.countDown - delta;

        if (this.renderTime) {
            this._renderTime.call(this);
        }
    };

    Timer.prototype._loop = function() {

        if (this.runs && this.counter > 0) {
            window.requestAnimationFrame(this._loop.bind(this));
            this._updateTimer.call(this);
        } else {
            this.runs = false;
            xtag.fireEvent(this.element, 'countdownstopped');
        }
    };

    xtag.register('x-countdown', {
        lifecycle: {
            created: function() {
                this.timer = new Timer(20, false, this);
            }
        },
        events:    {},
        accessors: {

        },
        methods:   {
            start: function() {
                this.timer.start();
            },
            stop:  function() {
                this.timer.stop();
            },
            getFormattedTime: function() {
                return this.timer.getFormatedTime(this.timer.counter);
            },
            setCountdown: function(seconds) {
                this.timer.setCountdown(seconds);
            }

        }
    });

})();

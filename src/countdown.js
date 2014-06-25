(function() {

    function Timer(countTo, renderTime) {

        this.countDown = countTo || 15;
        this.counter = this.countDown;
        this.initialCountDown = this.countDown;
        this.runs = false;
        this.renderTime = renderTime || false;
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
            console.log("Stopped");
        }
    };

    xtag.register('x-countdown', {
        lifecycle: {
            created: function() {
                this.timer = new Timer(20, false);
            }
        },
        events:    {},
        accessors: {},
        methods:   {
            start: function() {
                this.timer.start();
            },
            stop:  function() {
                this.timer.stop();
            },
            getFormattedTime: function() {
                return this.timer.getFormatedTime(this.timer.counter);
            }

        }
    });

})();

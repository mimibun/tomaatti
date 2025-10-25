// A Timer takes an array of cycle objects (called intervals) which contain a unique id, name and a duration
// cycleArray = [ { id: "p7feee", name: "name", duration: int }, { ... } ]
export default class Timer {
    constructor(cycle) {
        this.cycleArray = cycle;

        this.intervalIndex = $state(0);
        this.intervalName = $derived(this.cycleArray[this.intervalIndex].name);
        this.intervalDuration = $derived(this.cycleArray[this.intervalIndex].duration);
        this.intervalProgressPercentage = $derived(this.getProgressAsPercentage());
        this.isPaused = $state(true);
        this.isFinished = $state(false);
        this.remainingIntervalSeconds = $state(Timer.minuteToSeconds(this.cycleArray[this.intervalIndex].duration));
        this.digitalTime = $derived(Timer.secondsToDigitalTime(this.remainingIntervalSeconds));

        this.currentInterval = null;
    };

    start() { // starts and/or resumes the timer
        if (this.currentInterval != null) { return; }

        console.log("Starting/Resuming timer...")
        this.isPaused = false;
        this.isFinished = false;

        this.currentInterval = setInterval(() => {
            if (this.remainingIntervalSeconds === 0) {
                this.isPaused = true;
                this.isFinished = true;
                this.nextInterval();
                console.log("Current timer finished!");
            } else {
                this.remainingIntervalSeconds--;
            };
        }, 1);
    };

    stop() { // stops the timer
        this.isPaused = true;
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        console.log("Stopped timer...");
    };

    toggle() {
        if (this.currentInterval != null) {
            this.stop()
        } else { this.start(); }
    };

    skip() {
        this.nextInterval()
        console.log("Current timer skipped...");
    };

    nextInterval() {
        this.stop();
        this.intervalIndex = (this.intervalIndex + 1) % this.cycleArray.length // thanks gideon! 

        this.remainingIntervalSeconds = Timer.minuteToSeconds(this.cycleArray[this.intervalIndex].duration);
    };

    getProgressAsPercentage() {
        let minutesDuration = Timer.minuteToSeconds(this.cycleArray[this.intervalIndex].duration);
        return 100 - (this.remainingIntervalSeconds / minutesDuration) * 100;
    }


    static minuteToSeconds(minutes) {
        return minutes * 60;
    }

    static secondsToDigitalTime(timeAsSeconds) {
        let minutes = Math.floor(timeAsSeconds / 60);
        let seconds = timeAsSeconds % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        };

        return `${minutes}:${seconds}`;
    }
};


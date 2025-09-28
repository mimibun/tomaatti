export default class Timer {
    constructor(cycle) {
        this.cycle = $state(cycle);
        this.currentCycleIndex = $state(0);
        this.currentCycleName = $derived(this.cycle[this.currentCycleIndex].name);
        this.isPaused = $state(true);
        this.isFinished = $state(false);
        this.remainingTimeSeconds = $state(Timer.minuteToSeconds(this.cycle[this.currentCycleIndex].duration));
        this.digitalTime = $derived(Timer.secondsToDigitalTime(this.remainingTimeSeconds));

        this.currentInterval = null;
    };

    start() { // starts and/or resumes the timer
        if (this.currentInterval != null) { return; }

        console.log("Starting/Resuming timer...")
        this.currentInterval = setInterval(() => {
            if (this.remainingTimeSeconds === 0) {
                this.isFinished = true;
                this.nextTimer();
                console.log("Current timer finished!");
            } else {
                this.isFinished = false;
                this.isPaused = false;
                this.remainingTimeSeconds--;
            };
        }, 1);
    };
    
    stop() {
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
        this.nextTimer()
        console.log("Current timer skipped...");
    };

    nextTimer() {
        this.stop();
        if (this.currentCycleIndex >= this.cycle.length - 1) {
            this.currentCycleIndex = 0;
        } else { this.currentCycleIndex++; };

        this.remainingTimeSeconds = Timer.minuteToSeconds(this.cycle[this.currentCycleIndex].duration);
    };

    
    setNewCycle(newCycle) {
        this.cycle = newCycle;
        this.reset();
        console.log(`New cycle (${this.cycle}) set!`);
    };

    reset() {
        this.stop();
        this.currentCycleIndex = 0;
        console.log("Timer reset...");
    };

    
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
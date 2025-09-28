<script>
	import favicon from '$lib/assets/favicon.svg';
    import Timer from '$lib/Timer.svelte.js';

    let defaultCycle = [
        { name: "focus", duration: 25 },
        { name: "short break", duration: 5 },
        { name: "long break", duration: 15 }
    ]


    let pomodoro = new Timer(defaultCycle);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
    <p>{pomodoro.digitalTime}</p>
    <button onclick={() => pomodoro.toggle()}>start/resume</button>
    <button onclick={() => pomodoro.skip()}>skip</button>

    <p>cycle: {pomodoro.cycle}</p>
    <p>currentCycleIndex: {pomodoro.currentCycleIndex}</p>
    <p>currentCycleName: {pomodoro.currentCycleName}</p>
    <p>isPaused: {pomodoro.isPaused}</p>
    <p>isFinished: {pomodoro.isFinished}</p>
    <p>remainingTimeSeconds: {pomodoro.remainingTimeSeconds}</p>
    <p>currentInterval: {pomodoro.currentInterval}</p>
    <p>currentInterval type: {typeof(pomodoro.currentInterval)}</p>
</main>

<style lang="scss">
	@use '../scss/reset.scss' as *;
	@use '../scss/defaults.scss' as *;
	@use '../scss/mixins.scss' as *;

    :global(body) {
        background-color: $base;
        color: $text
    }
</style>
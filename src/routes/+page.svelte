<script>
	import favicon from '$lib/assets/favicon.svg';
    
    import Timer from '$lib/components/Timer.svelte'
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import SettingsMenu from "$lib/components/SettingsMenu/SettingsMenu.svelte";

    import '@fontsource-variable/nunito';
	import '@fontsource/material-icons-round';

    import { onMount } from 'svelte';

    let progress = $state()

    let settings = $state({
        volume: 0.5,
        alarm: "blxuhi",
        cycle: [
            { id: "gsjp3m", name: "focus", duration: 25 },
            { id: "u12qjh", name: "short break", duration: 5 },
            { id: "7wt8dn", name: "focus", duration: 25 },
            { id: "ogjcyb", name: "long break", duration: 15 },
        ]
    });

    onMount(() => {
        if (localStorage.getItem("settings") === null) {
            localStorage.setItem("settings", JSON.stringify(settings))
        } else { settings = JSON.parse(localStorage.getItem("settings"))}
    })

    $effect(() => {
        localStorage.setItem("settings", JSON.stringify(settings))
    })
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
    <p id="name">tomaatti 🍅</p>
    <section class="timer">
        {#key settings.cycle}
            <Timer bind:progress={progress} {settings} />
        {/key}
    </section>
    <section class="progress-bar">
        <ProgressBar {progress}/>
    </section>
    <section class="settings-menu">
        <SettingsMenu bind:settings={settings}/>
    </section>
</main>

<style lang="scss">
	@use '$scss/reset.scss' as *;
	@use '$scss/defaults.scss' as *;
	@use '$scss/mixins.scss' as *;

	:global(body) {
		display: flex;
		flex-direction: column;
		margin-top: 15%;
		align-items: center;

		font-family: $font-default;
		font-weight: 600;

		background-color: $base;
		color: $text;
	}

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        flex-grow: 1;
        width: 390px;

        margin: 0;
        gap: 1rem;

        padding: 0.75rem;
    }

    #name {
        font-weight: bold;
        font-size: 3rem;
    }

    .timer {
        width: 100%
    }

    .settings-menu {
        width: 100%;
    }

    .progress-bar {
        width: 100%;
    }
</style>
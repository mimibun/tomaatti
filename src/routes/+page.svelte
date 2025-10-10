<script>
    import { onMount } from 'svelte';

	import favicon from '$lib/assets/favicon.svg';
    
    import Timer from '$lib/components/Timer.svelte'
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import SettingsMenu from "$lib/components/SettingsMenu.svelte";

    import '@fontsource-variable/nunito';
	import '@fontsource/material-icons-round';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
    <article>
        <p id="name">tomaatti</p>
        <section class="timer">
            <Timer />
        </section>
        <section class="progress-bar">
            <ProgressBar progress={50}/>
        </section>
        <section class="settings-menu">
            <SettingsMenu />
        </section>
    </article>
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

    article {
        display: flex;
        flex-direction: column;
        align-items: center;

        flex-grow: 1;
        width: 390px;

        margin: 0;
        gap: 1rem;
    }

    #name {
        font-weight: bold;
        font-size: 3rem;
    }

    .settings-menu {
        width: 100%;
    }

    .progress-bar {
        width: 100%;
    }
</style>
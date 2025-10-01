<script>
    import { onMount } from 'svelte';

	import favicon from '$lib/assets/favicon.svg';
    
    import Timer from '$lib/Timer.svelte.js';
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import SettingsMenu from "$lib/components/SettingsMenu.svelte";

    import '@fontsource-variable/nunito';
	import '@fontsource/material-icons-round';

    let settings = $state("");
    let settingsArray = $state([])

    onMount(() => {
        localStorage.setItem("cycle", JSON.stringify(defaultCycle));
    })

    let test = {
        gay: "true",
        urmom: "gay",
        femboy: "cute"
    }
   
    let defaultCycle = [
        { id: "gsjp3m", name: "focus", duration: 25 },
        { id: "u12qjh", name: "short break", duration: 5 },
        { id: "ogjcyb", name: "long break", duration: 15 }
    ];
    
    let timer = new Timer(defaultCycle);

    let alarm;
    let alarmVolume = $state(0.5);

    $effect(() => {
        alarm.volume = alarmVolume;

        if (timer.isFinished) {
            alarm.play();
        };   
    })
    
    $effect(() => {
        settings = localStorage.getItem("cycle");
        settingsArray = JSON.parse(settings);
    })
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
    <article>
        <p id="name">tomaatti</p>
        <section class="timer">
            <p id="phase">{timer.intervalName}</p>
            <p id="time">
                {timer.digitalTime}
            </p>
            <section class="buttons">
                <button class="icon" onclick={() => timer.toggle()}>{timer.isPaused ? "play_arrow" : "pause"}</button>
                <button class="icon" onclick={() => timer.skip()}>fast_forward</button>
            </section>
        </section>
<!--------------------------------------------------------------------------------->
        <section class="progress-bar">
            <ProgressBar progress={timer.intervalProgressPercentage}/>
        </section>
        <SettingsMenu bind:volume={alarmVolume}/>
    </article>
</main>

{#each settingsArray as item}
    {item.name}
{/each}


<audio bind:this={alarm} preload="auto">
    <source src="/audio/pop-pop.ogg">
</audio>

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

    .timer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        flex-grow: 1;
        width: 390px;

        background-color: $surface0;
        
        border-radius: 30px;

        #phase {
            font-size: 1.5rem;
            padding: 1rem 0 0 0;
        }

        #time {
            font-size: 4rem;
        }
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        width: 100%;

        padding: 0 0 1rem 0;

        button {
            &:hover {
                transform: scale(105%);
                cursor: pointer;
            }

            &:disabled {
                background-color: $surface1;
                color: $overlay0;
                transform: none;
                cursor: default;
            }

            &:active {
                transform: scale(100%);
            }

            transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
            
            background-color: $surface2;
            border: none;
            border-radius: 100vw;
            
            padding: 0rem 3rem;

            font-size: 32px;
            color: $text;
        }
    }

    .progress-bar {
        width: 100%;
    }
</style>
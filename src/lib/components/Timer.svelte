<script>
    let { progress = $bindable(), settings } = $props()
    
    import Timer from '$lib/Timer.svelte.js';
    import { alarms } from "$lib/alarms";

    let timer = new Timer(settings.cycle);

    let alarm;
    let alarmVolume = $derived(settings.volume);
    let selectedAlarm = $derived(alarms.find(alarm => alarm.id === settings.alarm))

    $effect(() => {
        alarm.volume = alarmVolume;

        if (timer.isFinished) {
            alarm.play();
        };
    })

    $effect(() => {
        progress = timer.intervalProgressPercentage
    })

    $inspect(timer)
</script>

<section class="timer">
    {#if timer.intervalName != ""}
        <p id="name">{timer.intervalName}</p>
    {/if}
    <p id="time">{timer.digitalTime}</p>
    <section class="buttons">
        <button class="icon" onclick={() => timer.toggle()}>{timer.isPaused ? "play_arrow" : "pause"}</button>
        <button class="icon" onclick={() => timer.skip()}>fast_forward</button>
    </section>
</section>

{#key selectedAlarm}
    <audio bind:this={alarm} preload="auto" volume={settings.volume}>
        <source src={selectedAlarm.path}>
    </audio>
{/key}

<style lang="scss">
	@use '$scss/defaults.scss' as *;
	@use '$scss/mixins.scss' as *;

    .timer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: $surface0;
        
        border-radius: 30px;

        #name {
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
</style>
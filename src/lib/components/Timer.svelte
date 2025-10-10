<script>
    import Timer from '$lib/Timer.svelte.js';
    
    let cycle = $state([
        { id: "gsjp3m", name: "focus", duration: 25 },
        { id: "u12qjh", name: "short break", duration: 5 },
        { id: "7wt8dn", name: "focus", duration: 25 },
        { id: "ogjcyb", name: "long break", duration: 15 },
    ]);

    let timer = new Timer(cycle);

    let alarm;
    let alarmVolume = $state(0.5);

    $effect(() => {
        alarm.volume = alarmVolume;

        if (timer.isFinished) {
            alarm.play();
        };   
    })

</script>

<section class="timer">
    <p id="phase">{timer.intervalName}</p>
    <p id="time">{timer.digitalTime}</p>
    <section class="buttons">
        <button class="icon" onclick={() => timer.toggle()}>{timer.isPaused ? "play_arrow" : "pause"}</button>
        <button class="icon" onclick={() => timer.skip()}>fast_forward</button>
    </section>
</section>

<audio bind:this={alarm} preload="auto">
    <source src="/audio/pop-pop.ogg">
</audio>

<style lang="scss">
	@use '$scss/defaults.scss' as *;
	@use '$scss/mixins.scss' as *;

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
</style>
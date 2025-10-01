<script>
    import { createSwapy } from "swapy";
    import { onDestroy, onMount } from "svelte";

    // svelte-ignore non_reactive_update
    let container;
    let swapy = null;

    onMount(() => {
        if (container) {
            swapy = createSwapy(container, {
                dragAxis: "y",
            });

            swapy.onSwap((event) => {
                console.log("swap", event);
            });
        }
    });

    onDestroy(() => {
        swapyx.destroy();
        console.log("component has been destroyed")
    });

    let savedCycle = [
        { id: "gsjp3m", name: "focus", duration: 25 },
        { id: "u12qjh", name: "short break", duration: 5 },
        { id: "7wt8dn", name: "focus", duration: 25 },
        { id: "ogjcyb", name: "long break", duration: 15 },
    ];

    let editableCycle = $state(savedCycle);

    function createId() {
        return Math.random().toString(36).slice(2, 8);
    }

    function removeInterval(id) {
        editableCycle = editableCycle.filter((interval) => interval.id !== id);
        swapy.update();
    }

    function spawnNewIntervalInput() {
        const emptyInterval = { id: createId(), name: "", duration: 0 };

        if (editableCycle) editableCycle.push(emptyInterval);
        swapy.update();
    }
</script>

{#key editableCycle}
    <div class="container" bind:this={container}>
        {#each editableCycle as interval (interval.id)}
            <div class="slot" data-swapy-slot={interval.id}>
                <div class="interval" data-swapy-item={interval.id}>
                    <div data-swapy-handle style="display:inline-block"><button class="icon handle">drag_indicator</button></div>
                    <input
                        type="number"
                        min="1"
                        max="60"
                        oninput={() => {
                            if (interval.duration >= 60) interval.duration = 60;
                            if (interval.duration <= 0) interval.duration = 0;
                        }}
                        bind:value={interval.duration}
                        data-swapy-no-drag/>
                    <input
                        type="text"
                        maxlength="12"
                        bind:value={interval.name}
                        data-swapy-no-drag/>
                    <button class="icon remove" onclick={() => removeInterval(interval.id)} data-swapy-no-drag>delete</button>
                </div>
            </div>
        {/each}
    </div>
{/key}

<div class="">
    <button class="icon" onclick={() => spawnNewIntervalInput()}>new</button>
    <button class="icon" onclick={() => {savedCycle = editableCycle}}>save</button>
</div>

<style lang="scss">
    @use '$scss/defaults.scss' as *;

    .container {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .interval {
        display: flex;
        justify-content: space-between;
        gap: 0.3rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    input {
        &:focus-visible {
            transform: scale(105%);
            border: none;
            outline: none;
            border-radius: 20px;
        }
        
        background-color: $surface0;
        width: 100px;
        flex-grow: 1;
        padding: 0.2rem 1rem;
        
        text-align: center;
        
        border: none;
        border-radius: 20px;
        color: $text;
        transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
    }

    .item[data-swapy-dragging] {
        opacity: 0.6;
    }

    button {
        &:hover {
            transform: scale(110%);
            cursor: pointer;
        }

        &.remove {
            &:hover {
                background-color: $maroon;
                color: $surface0;
            }
        }

        &.handle {
            &:hover {
                transform: none;
                cursor: grab;
            }

            background-color: $overlay1;
        }
        background-color: $surface0;

        border: none;
        border-radius: 100vw;
        text-align: center;
        height: 2rem;
        width: 2rem;
        z-index: 1;

        color: $text;
        transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
    }
</style>
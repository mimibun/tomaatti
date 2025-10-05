<script>
    import { createSwapy, utils } from "swapy";
    import { onDestroy, onMount, untrack } from "svelte";
    import { useLocalStorage } from "$lib/useLocalStorage.svelte";

    // svelte-ignore non_reactive_update
    let container;
    let swapy = null;


    const settings = {
        volume: 0.5,
        alarm: "pop-pop",
        cycle: [
            { id: "gsjp3m", name: "focus", duration: 25 },
            { id: "u12qjh", name: "short break", duration: 5 },
            { id: "7wt8dn", name: "focus", duration: 25 },
            { id: "ogjcyb", name: "long break", duration: 15 },
        ]
    };

    useLocalStorage("tomaattiSettings", settings)

    let cycle = $state(useLocalStorage("tomaattiSettings").cycle);

    let slotItemMap = $state(utils.initSlotItemMap(cycle, "id"));
    let slottedItems = $derived(utils.toSlottedItems(cycle, "id", slotItemMap))

    let setSlotItemMap = (value => (slotItemMap = value));

    $inspect(slottedItems)

    $effect(() => {
        utils.dynamicSwapy(swapy, cycle, "id", untrack(() => slotItemMap), setSlotItemMap);
    })

    onMount(() => {
        if (container) {
            swapy = createSwapy(container, {
                manualSwap: true,
                dragAxis: 'y'
            })
            
            swapy.onSwap((event) => { 
                requestAnimationFrame(() => { 
                    slotItemMap = event.newSlotItemMap.asArray 
                }) 
            }) 
        }
    });

    onDestroy(() => {
        swapy.value?.destroy()
    });

    function createId() {
        return Math.random().toString(36).slice(2, 8);
    };
</script>

<div class="container" bind:this={container}>
    {#each slottedItems as { slotId, itemId, item }}
    {#key slotId}
        <div class="slot" data-swapy-slot={slotId}>
        {#if item}
        {#key itemId}
            <div class="interval" data-swapy-item={itemId}>
                <div style="display:inline-block"><button class="icon handle">drag_indicator</button></div>
                <input
                type="number"
                min="1"
                max="60"
                oninput={() => {
                    if (item.duration >= 60) item.duration = 60;
                    if (item.duration <= 0) item.duration = 0;}}
                    bind:value={item.duration}>
                    
                <input
                type="text"
                maxlength="12"
                bind:value={item.name}>
                    
                <button class="icon remove" onclick={() => {cycle = cycle.filter((i) => i.id !== item.id)}}>delete</button>
                </div>
        {/key}
        {/if}
        </div>
    {/key}
    {/each}
    <button class="icon new-interval" onclick={() => {cycle.push({ id: createId(), name: "", duration: 0 })}}>add</button>
</div>



<style lang="scss">
    @use '$scss/defaults.scss' as *;

    .container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .interval {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        appearance: textfield;
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
            
            background-color: $surface2;
            color: $subtext1;
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

    button.new-interval {
        &:hover {
            transition: scale(100%);
        }

        flex-grow: 1;
        width: 100%;
        align-self: center;
        text-align: center;
        border: $green 1px solid inset;
    }
</style>
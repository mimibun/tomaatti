<script>
    let { settings = $bindable() } = $props();

    import { createSwapy, utils } from "swapy";
    import { onDestroy, onMount, untrack } from "svelte";

    import { createId } from "$lib/createId.js";

    // svelte-ignore non_reactive_update
    let container;
    let swapy = null;

    let slotItemMap = $state(utils.initSlotItemMap(settings.cycle, "id"));
    let slottedItems = $derived(utils.toSlottedItems(settings.cycle, "id", slotItemMap))

    let setSlotItemMap = (value => (slotItemMap = value));

    $effect(() => {
        utils.dynamicSwapy(swapy, settings.cycle, "id", untrack(() => slotItemMap), setSlotItemMap);
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
                    
                <button class="icon remove" onclick={() => {
                    if (settings.cycle.length > 1) {
                        settings.cycle = settings.cycle.filter((i) => i.id !== item.id)
                    }}}>delete</button>
                </div>
        {/key}
        {/if}
        </div>
    {/key}
    {/each}
    <button class="icon new-interval" onclick={() => {settings.cycle.push({ id: createId(), name: "", duration: 0 })}}>add</button>
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
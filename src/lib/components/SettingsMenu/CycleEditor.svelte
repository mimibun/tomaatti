<script>
    import CycleItem from "./cycleItem.svelte";
    let { saveCycle, cycle } = $props();
    
    import { createSwapy, utils } from "swapy";
    import { onDestroy, onMount, untrack } from "svelte";
    import { slide } from "svelte/transition";
    import { createId } from "$lib/utils.js";

    let items = $state($state.snapshot(cycle))
    let itemsIsDifferentThanCycle = $derived(!compareItemsToCycle(slottedItems.map(i => i.item)))

    function addItem() {
        items.push({
            id: createId(),
            name: "",
            duration: 5
        })
    }
    
    function removeItem(item) {
        if (items.length > 1) {
            items = items.filter((i) => i.id !== item.id)
        }
    }

    function compareItemsToCycle(slottedItems) {
        if (slottedItems.length === cycle.length) {
            return slottedItems.every((element, index, a) => element.id === cycle[index]?.id && element.name === cycle[index].name && element.duration === cycle[index].duration)
        } else { return false }
    }
    //--------------------------------------------------------------
    // svelte-ignore non_reactive_update
    let container;
    let swapy = null;

    let slotItemMap = $state(utils.initSlotItemMap(items, "id"));
    let slottedItems = $derived(utils.toSlottedItems(items, "id", slotItemMap));

    let setSlotItemMap = (value => (slotItemMap = value));

    $effect(() => {
        utils.dynamicSwapy(swapy, items, "id", untrack(() => slotItemMap), setSlotItemMap);
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
                <CycleItem {removeItem} {itemId} {item}/>
            {/key}
            {/if}
        </div>
    {/key}
    {/each}
        <button class="icon new-item" onclick={() => addItem()}>add</button>
    {#if itemsIsDifferentThanCycle}
        <button class="icon save"
        in:slide={{ duration: 200, delay: 300 }}
        out:slide={{ duration: 200, delay: 300 }} 
        onclick={() => saveCycle(slottedItems)}>
        {itemsIsDifferentThanCycle ? "save" : "check"}</button>
    {/if}
</div>

<style lang="scss">
    @use '$scss/defaults.scss' as *;

    .container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    button {
        &:hover {
            transform: scale(103%);
            cursor: pointer;
        }

        &.save {
            background-color: $green;
            color: $surface0;
        }

        background-color: $surface0;

        border: none;
        border-radius: 100vw;
        text-align: center;

        color: $text;
        transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
        transition: background-color .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
    }
</style>
<script>
	import { circInOut } from "svelte/easing";
	import { slide } from "svelte/transition";
	import AlarmSelector from "./AlarmSelector.svelte";
    import CycleEditor from "./CycleEditor.svelte";

    let isVisible = $state(false);
    function toggleVisibility() {
        isVisible ? isVisible = false : isVisible = true;
    }

    let { volume = $bindable() } = $props();
</script>

<article>
    <button class="settings-button icon" onclick={toggleVisibility}><p id="arrow" style="rotate: {isVisible ? "180" : "0"}deg;">keyboard_double_arrow_down</p></button>
    {#if isVisible}
    <section class="settings" transition:slide={{ duration: 200, easing: circInOut }}>
        <div class="volume-slider">
            <span class="icon">volume_mute</span>
            <input type="range" name="volume" id="volume" min="0" max="1" step="0.01" bind:value={volume}>
            <span class="icon">volume_up</span>
        </div>
        <div class="cycle-editor">
            <CycleEditor />
        </div>
        <div class="alarm-selector">
            <AlarmSelector/>
        </div>
    </section>
    {/if}
</article>

<style lang="scss">
    @use '$scss/defaults.scss' as *;
	@use '$scss/mixins.scss' as *;

    article {
        display: grid;
        gap: 0.5rem;
        width: 100%;
    }

    .icon {
        font-family: 'Material Icons Round', sans-serif;
    }

    .settings-button {
        &:hover {
            transform: scale(102%);
            cursor: pointer;
        }

        &:disabled {
            background-color: $surface1;
            color: $overlay0;
            transform: none;
            cursor: default;
        }

        width: 100%;

        transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1); // hover-animation
        
        background-color: $surface2;
        border: none;
        border-radius: 100vw;
        
        font-size: 18px;
        color: $text;
    }

    .settings {
        display: flex;
        flex-direction: column;
        border-radius: 15px;

        padding: 1rem;
        gap: 0.5rem;

        background-color: $surface1;
    }

    #arrow {
        transition: rotate 0.2s ease-in-out;
    }

    .volume-slider {
        display: flex;

        #volume {
            flex-grow: 1;
            margin: 0 0.5rem;
        }
    }
</style>
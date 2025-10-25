<script>
    let { selectedAlarm = $bindable() } = $props()

    import { alarms } from "$lib/alarms";

	import { fly } from "svelte/transition";

    let selectedAlarmIndex = $state(selectedAlarm === "" ?  selectedAlarm = alarms[0].id : alarms.map(e => e.id).indexOf(selectedAlarm))
    let flyDirection = $state(1);

    function next() {
        selectedAlarmIndex + 1 < alarms.length ? selectedAlarmIndex++ : selectedAlarmIndex = 0;

        flyDirection = 1;
    };

    function previous() {
        selectedAlarmIndex - 1 < 0 ? selectedAlarmIndex = alarms.length -1 : selectedAlarmIndex--;

        flyDirection = -1;
    };

    $effect(() => {
        selectedAlarm = alarms[selectedAlarmIndex].id
    })
</script>

<div class="container">
    <button onclick={() => previous()} class="icon rotate-180">arrow_forward_ios</button>
        {#key selectedAlarmIndex}
            <p in:fly={{ x: 150 * flyDirection }} out:fly={{ x: -150 * flyDirection }}>{alarms[selectedAlarmIndex].name}</p>
        {/key}
    <button onclick={() => next()} class="icon">arrow_forward_ios</button>
</div>

<style lang="scss">
    @use '$scss/defaults.scss' as *;
	@use '$scss/mixins.scss' as *;

    div {
        display: flex;
        justify-content: space-between;

        position: relative;
        min-height: 1.6em;

        button {
            &:hover {
                transform: scale(110%);
                cursor: pointer;
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

        p {
            position: absolute;
            width: 100%;

            text-align: center;
            z-index: 0;
        }
    }

    .icon {
        @include icon();
    }

    .rotate-180 {
        rotate: 180deg;
    }

</style>
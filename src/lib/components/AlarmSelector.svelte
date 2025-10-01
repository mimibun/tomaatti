<script>
	import { fly } from "svelte/transition";

    const alarms = ["one","two","three","four"];

    const newAlarms = [
        { name: "Pop-pop", path:"/audio/pop-pop.ogg" },
        { name: "Pop", path: "/audio/pop.ogg" }
    ]

    let currentAlarmIndex = 0;

    let flyDirection = 1;

    function nextAlarm() {
        currentAlarmIndex + 1 < newAlarms.length ? currentAlarmIndex++ : currentAlarmIndex = 0;

        flyDirection = 1;
    };

    function previousAlarm() {
        currentAlarmIndex - 1 < 0 ? currentAlarmIndex = newAlarms.length -1 : currentAlarmIndex--;

        flyDirection = -1;
    };
</script>

<div class="container">
    <button on:click={previousAlarm} class="icon rotate-180">arrow_forward_ios</button>
    {#key currentAlarmIndex}
    <p in:fly={{ x: 150 * flyDirection }} out:fly={{ x: -150 * flyDirection }}>{newAlarms[currentAlarmIndex].name}</p>
    {/key}
    <button on:click={nextAlarm} class="icon">arrow_forward_ios</button>
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
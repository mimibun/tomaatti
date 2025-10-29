<script>
    let { removeItem, itemId, item } = $props()

    let duration = $state($state.snapshot(item.duration))
    let name = $state($state.snapshot(item.name))

    function updateDuration(duration) {
        item.duration = duration
    }

    function updateName(name) {
        item.name = name
    }
</script>

<div class="interval" data-swapy-item={itemId}>
    <div style="display:inline-block"><button class="icon handle">drag_indicator</button></div>
    <input
    type="number"
    min="1"
    max="60"
    data-swapy-no-drag
    bind:value={item.duration}>
        
    <input
    type="text"
    maxlength="12"
    data-swapy-no-drag
    bind:value={item.name}>
        
    <button class="icon remove" onclick={() => {removeItem(item)}}>delete</button>
</div>

<style lang="scss">
    @use '$scss/defaults.scss' as *;

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
            box-shadow:0px 0px 0px 2px $teal inset;
            border: none;
            outline: none;
            border-radius: 20px;
        }
        
        background-color: $surface0;
        min-width: 0;
        flex: 1;
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
        flex-grow: 0;

        color: $text;
        transition: transform .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
        transition: background-color .3s cubic-bezier(0,0,0,1),opacity .3s cubic-bezier(0,0,0,1);
    }

</style>
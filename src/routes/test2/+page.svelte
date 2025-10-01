<script>
  import { createSwapy } from 'swapy'
  import { onDestroy, onMount } from 'svelte'

  let container
  let swapy = null

  onMount(() => {
    if (container) {
      swapy = createSwapy(container)

      swapy.onSwap(event => {
        console.log('swap', event)
      })
    }
  })

  onDestroy(() => {
    swapy?.destroy()
  })
</script>

<div bind:this={container}>

  <div data-swapy-slot="a">
    <div data-swapy-item="a">
      <div>A</div>
    </div>
  </div>

  <div data-swapy-slot="b">
    <div data-swapy-item="b">
      <div>B</div>
    </div>
  </div>

</div>
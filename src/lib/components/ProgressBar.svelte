<script>
    let { progress } = $props(); 

</script>

<div class="progress-bar">
    <div class="progress" style="transform: translateX(-{100 - progress}%)"></div>
</div>

<style lang="scss">
    @use '$scss/defaults.scss' as *;

    .progress-bar {
        background-color: $mantle;
        width: 100%;
        height: 20px;
        overflow: hidden;

        border-radius: 100vw;
    }

    .progress {
        background: linear-gradient(69deg, $mauve, $lavender) left bottom $surface1 no-repeat;
        height: 100%;
        width: 100%;
        border-radius: 100vw;
    }
</style>
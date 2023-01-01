<script>
    // Components
    import Copyright from "../Atoms/Copyright.svelte";
</script>

<footer class="{`site-footer flex text-center`}">
    <Copyright />
</footer>

<style lang="scss">
    .site-footer {
        position: fixed;
        right: 0;
        top: 0;
        display: flex;
        width: 75px;
        height: 100%;
        justify-content: center;
        @media all and (max-width: 767px) {
            position: absolute;
            top: initial;
            bottom: 0;
            right: initial;
            left: 0;
            width: 100%;
            height: 75px;
        }
    }
</style>

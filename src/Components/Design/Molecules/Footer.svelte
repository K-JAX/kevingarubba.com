<script>

    // Components
    import Burger from "../Atoms/Burger.svelte";
    import Copyright from "../Atoms/Copyright.svelte";
    import Nav from "../Molecules/Nav.svelte";

    let active;
    
</script>

<footer class={`site-footer grid fixed text-center`}>
    <Burger bind:active />
    <Copyright />
</footer>
<Nav bind:active className="{active}" />

<style lang="scss">
    .site-footer {
        grid-area: rightSide;
        right: 0;
        grid-row-start: 1;
        grid-row-end: 4;
        width: 75px;
        height: 100%;
        justify-content: center;
        z-index: 6;
        grid-template-rows: 100px 1fr;
        grid-template-columns: 75px;

    }
</style>

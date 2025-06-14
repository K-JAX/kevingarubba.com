<script>
    // Components
    import SiteTitleHeader from "../Molecules/SiteTitleHeader.svelte";
    import Burger from "../Atoms/Burger.svelte";
    import Nav from "../Molecules/Nav.svelte";

    export let template = "";

    let active;
</script>

<header class="site-header fixed flex flex-col sm:flex-row">
    <SiteTitleHeader title="Kevin Garubba" description="Design | Development" />
    <Burger {template} bind:active />
    <Nav bind:active className="{active}" />

</header>
<div id="header-placeholder" class="w-32 sm:w-2"></div>

<style lang="scss">
    .site-header {
        position: fixed;
        width: 100%;
        z-index: 6;
        @media all and (max-width: 767px) {
            background: rgba(255, 255, 255, 0.9);
        }
    }
    :global.sidebar {
        width: 166px;
        .sidebar-svg {
            height: 100%;
            width: 100%;
        }
    }
    :global.vert {
        height: 100%;
    }

    #header-placeholder {
        // width: 126px;
        height: 100%;
    }
</style>

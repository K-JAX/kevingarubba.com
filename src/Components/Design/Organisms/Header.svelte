<script>
    import SiteTitleHeader from "../Molecules/SiteTitleHeader.svelte";
    // import Nav from "../Molecules/Nav.svelte";
</script>

<header class="site-header fixed flex flex-col">
    <SiteTitleHeader title="Kevin Garubba" description="Design | Development" />

</header>
<div id="header-placeholder" class="w-32 sm:w-2"></div>

<style lang="scss">
    .site-header {
        z-index: 5;
    }
    .sidebar {
        width: 166px;
        .sidebar-svg {
            height: 100%;
            width: 100%;
        }
    }
    .vert {
        height: 100%;
    }

    #header-placeholder {
        // width: 126px;
        height: 100%;
    }
</style>

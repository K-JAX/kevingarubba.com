<script>
    // Modules

    // Compnents
    import SocialNav from "../Molecules/SocialNav.svelte";
</script>

<aside
    class="sidebar fixed flex flex-col content-center justify-center w-32
    md:w-20 h-full sm:hidden"
>
    <div class="sidebar-line absolute mx-auto"></div>
    <SocialNav />
</aside>

<style lang="scss">
    .sidebar {
        z-index: 5;
        // width: 148px;
        left: 0;
        .sidebar-line {
            top: 117px;
            left: 0;
            right: 0;
            width: 6px;
            box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.25);
            animation: goDown 2s 1.38s forwards;
            @media all and (max-width: 767px) {
                top: 70px;
                box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.25);
            }
        }
    }

    @keyframes goDown {
        0% {
            height: 0;
        }
        100% {
            height: 100%;
        }
    }
</style>

<script>
    import { Router, Link } from "svelte-routing";
    export let title, description;

    // Components
    import Logo from "../Atoms/Logo.svelte";
    import SiteTitle from "../Atoms/SiteTitle.svelte";
</script>

<Router>
    <Link to="/">
        <div class="logo-container flex flex-row md:content-start">
            <Logo />
            <SiteTitle {title} {description} />
        </div>
    </Link>
</Router>

<style>
    .logo-container {
        height: 140px;
        /* overflow: hidden; */
    }
</style>

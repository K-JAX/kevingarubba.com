<script>
    // Modules
    import { fade } from "svelte/transition";
    // Components
    import Page from "./Components/Design/Page.svelte";
    import { durVal } from "./Components/Functional/SiteLoadCookie.svelte";
    import { Recaptcha, recaptcha, observer } from "svelte-recaptcha-v2";
</script>

<div
    class="svelte-root relative flex flex-col"
    transition:fade="{{ duration: durVal }}"
>
    <Page />
</div>

<style lang="scss" global>
    @import "./Components/Design/theme.scss";
    .svelte-root {
        min-height: 100vh;
    }
</style>

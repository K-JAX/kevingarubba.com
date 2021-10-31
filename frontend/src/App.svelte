<script>
    // Modules
    import { fade } from "svelte/transition";

    // Components
    import Page from "./Components/Design/Page.svelte";

    import { durVal } from "./Components/Functional/SiteLoadCookie.svelte";

    // console.log("performing fetch");
    // fetch("http://localhost:8080/wp-json")
    //     .then(res => res.json())
    //     .then(data => console.log(data));
</script>

<div class="svelte-root flex flex-row" transition:fade="{{ duration: durVal }}">
    <Page />
</div>

<style lang="scss" global>
    @import "./Components/Design/theme.scss";

    .svelte-root {
        min-height: 100vh;
    }
</style>

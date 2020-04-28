<script>
    import { onMount } from 'svelte';

    let logo = [];


    onMount(async () => {
        const res = await fetch(`${process.env.SAPPER_APP_API_URL}/wp/v2/logo`)
        const json = await res.json()
        logo = json
    })
 
</script>

<div>
    <img src="{logo.url}" alt="" width=150>
    <h1 class="thin">Kevin Garubba</h1>
    <h2 class="h4 regular">Design | Dev</h2>
</div>
<script>
    import PageTitle from "../Atoms/PageTitle.svelte";
    import { fade } from "svelte/transition";

    import Head from "../../Functional/Head.svelte";

    import { onMount } from "svelte";
    let data = [];
    let metaFields = [];
    let pageData = {};
    let title = "";
    let content = "";

    const apiURL = process.env.SAPPER_APP_API_URL;

    onMount(async () => {
        const res = await fetch(`${apiURL}/wp/v2/pages?slug=404-not-found`);
        const json = await res.json();
        data = json;
        metaFields = data.yoast_meta;
        if (data[0] !== "") {
            pageData = data[0];
            title = data[0].title.rendered;
            content = data[0].content.rendered;
        }
        console.log(data);
    });
</script>

<Head pageTagData="{pageData}" />

<section in:fade>
    <PageTitle {title} />
    {@html content}
</section>

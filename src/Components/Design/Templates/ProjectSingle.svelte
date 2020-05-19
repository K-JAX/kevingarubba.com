<script>

    // modules
    import { onMount, afterUpdate } from "svelte";

    // components
    import Head from "../../Functional/Head.svelte";
    import PageTitle from "../Atoms/PageTitle.svelte";

    export let slug;
    let storedState;
    let data = [];
    let pageData = [];
    let title = '';
    let content = '';

    const apiURL = process.env.SAPPER_APP_API_URL;

    const getData = async ()  => {
        const res = await fetch(`${apiURL}/wp/v2/project/?slug=${slug}`)
        const json = await res.json()
        data = json
        if (data[0] !== undefined){
            pageData = data[0];
            title = pageData.title.rendered;
            content = pageData.content.rendered;
        }
        storedState = slug;
    }

	onMount(async () => {
        getData();
        console.log(slug)
	})

    afterUpdate(async () => {
        if ( slug != storedState ){
            getData();
        }
    });


</script>

{#if data != ''}
<Head pageTagData={pageData} />
<div>
    <PageTitle title={title} style="position: relative; z-index:4;" />
    <div>{@html content}</div>
</div>
{/if}
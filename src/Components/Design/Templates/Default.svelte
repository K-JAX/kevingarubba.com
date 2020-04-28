<script>
    // Modules
    import { fade } from 'svelte/transition';
	import { onMount, afterUpdate } from 'svelte';

    // Components
    import PageTitle from '../Atoms/PageTitle.svelte';
    import Head from '../../Functional/Head.svelte';
    import NotFound from './NotFound.svelte';

    let data = [];
    let pageData = [];
    let title = ''
    let metaFields = [];
    let isLoaded = false;
    let storedState = '';
    export let slug;
	
	const apiURL = process.env.SAPPER_APP_API_URL;
    
    const getData = async ()  => {
        const res = await fetch(`${apiURL}/wp/v2/pages/?slug=${slug}`)
        const json = await res.json()
        data = json
        if (data[0] !== undefined){
            pageData = data[0];
            title = data[0].yoast_title
            metaFields = data[0].yoast_meta

        }
        storedState = slug;
    }

	onMount(async () => {
        getData();
	})

    afterUpdate(async () => {
        if ( slug != storedState ){
            getData();
        }
    });

</script>

{#if data != ''}
<Head pageTagData={pageData} />
<section in:fade>
    <PageTitle title="{title}" />
    <p >{slug}</p>
</section>
{:else}
<NotFound />
{/if}
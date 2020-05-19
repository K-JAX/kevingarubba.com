<script>
    // Modules
    import { fade } from 'svelte/transition';
    import { onMount, afterUpdate } from 'svelte';
    import queryString from 'query-string';


    // Components
    import PageTitle from '../Atoms/PageTitle.svelte';
    import Head from '../../Functional/Head.svelte';
    import NotFound from './NotFound.svelte';

    let data = [];
    let pageData = [];
    let title = '';
    let content = '';
    let metaFields = [];
    let isLoaded = false;
    let storedState = '';
    let successMessage = '';
    let error = '';
    let loading = false;
    export let slug;
	
	const apiURL = process.env.SAPPER_APP_API_URL;
    
    const getData = async ()  => {
        const res = await fetch(`${apiURL}/wp/v2/pages/?slug=${slug}`)
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
    <PageTitle className="my-5" title={title} />
    {@html content}
</section>
{:else}
<NotFound />
{/if}

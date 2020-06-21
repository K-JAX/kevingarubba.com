<!-- Only for meta tags and site info. No resource loading here -->
<script>
    import { onMount, afterUpdate, tick } from 'svelte';

    export let pageTagData = {}
    let fav = '',
        favJson = '',
        siteTitle = '',
        siteJson = '',
        title = '',
        meta = [],
        stateStore = '';
        
	const apiURL = process.env.SAPPER_APP_API_URL;

    const getJsonResponse = async() => {
        
        const [favResponse, siteResponse] = await Promise.all([
            fetch(`${apiURL}/wp/v2/favicon`),
            fetch(`${apiURL}/`)
        ]);
        favJson = await favResponse.json();
        siteJson = await siteResponse.json();
        tick();
        fav = favJson.url
        siteTitle = siteJson.name + ' '  + siteJson.description

        // Check if there's yoast data then and assign with what exists
        if(pageTagData.yoast_title == undefined){
            pageTagData.yoast_title = pageTagData.title != undefined ? pageTagData.title.rendered : siteTitle
        }
        if(pageTagData.yoast_meta == undefined ){
            pageTagData.yoast_meta = [{ name: "description", content: "Welcome to Kevin Garubba Design & Development site, where I showcase my latest portfolio pieces in web design and mobile application development."}]
        }
        title = pageTagData.yoast_title;
        meta = pageTagData.yoast_meta;

        if( pageTagData.title !== undefined){
            stateStore = pageTagData.title.rendered;

        }
    }

    onMount(async () => {
        await getJsonResponse();
    })

    afterUpdate(async () => {
        if(pageTagData.title !== undefined){
            if( stateStore != pageTagData.title.rendered){
                await getJsonResponse();
    
            }

        }
    });
    AOS.init();

</script>

<svelte:head>
	<title>{title}</title>
    <link rel="icon" href={fav} />

    <!-- Site Meta -->
    {#each meta as {name, property, content}}
        {#if name != undefined || name != null || name != '' }
            <meta name={name} content={content} />
        {:else if property != undefined || property != null || property != '' }
            <meta name={property} content={content} />
        {/if}
    {/each}

</svelte:head>
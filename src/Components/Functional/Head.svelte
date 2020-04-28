<script>
    import { onMount, afterUpdate } from 'svelte';

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
        fav = favJson.url
        siteTitle = siteJson.name + ' '  + siteJson.description

        // Check if there's yoast data then and assign with what exists
        if(pageTagData.yoast_title == undefined){
            // console.log(siteTitle)
            pageTagData.yoast_title = siteTitle != '' ? siteTitle : 'kevingarubba.com'
        }
        if(pageTagData.yoast_meta == undefined ){
            pageTagData.yoast_meta = [{ name: "description", content: "Welcome to Kevin Garubba Design & Development site, where I showcase my latest portfolio pieces in web design and mobile application development."}]
        }
        title = pageTagData.yoast_title;
        meta = pageTagData.yoast_meta;
        stateStore = siteJson.name;
    }

    onMount(async () => {
        getJsonResponse();
    })

    afterUpdate(async () => {
        if( stateStore != siteJson.name){
            getJsonResponse();

        }
    });
</script>

<svelte:head>
	<title>{title}</title>
    <link rel="icon" href={fav} />
        {#each meta as {name, property, content}}
            {#if name != undefined || name != null || name != '' }
                <meta name={name} content={content} />
            {:else if property != undefined || property != null || property != '' }
                <meta name={property} content={content} />
            {/if}
        {/each}
</svelte:head>
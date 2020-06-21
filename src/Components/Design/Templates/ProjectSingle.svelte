<script>

    // modules
    import { onMount, afterUpdate, onDestroy } from "svelte";
	import { Link } from "svelte-routing";

    // components
    import Head from "../../Functional/Head.svelte";
    import PageTitle from "../Atoms/PageTitle.svelte";
    import ProjectFeature from "../Organisms/ProjectFeature.svelte";

    export let slug;
    export let template ='project-single';
    let storedState;
    let data = [];
    let pageData = [];
    let title = '';
    let brandName = '';
    let featuredImage = {};
    let content = '';

    const apiURL = process.env.SAPPER_APP_API_URL;

    const getData = async ()  => {
        const res = await fetch(`${apiURL}/wp/v2/project/?slug=${slug}&_embed`)
        const json = await res.json()
        data = json
        if (data[0] !== undefined){
            pageData = data[0];
            title = pageData.title.rendered;
            brandName = pageData.acf.brand_name !== '' ? pageData.acf.brand_name : title;
            featuredImage = pageData._embedded['wp:featuredmedia'][0].media_details.sizes.large;
            content = pageData.content.rendered;

        }
        storedState = slug;
    }

	onMount(async () => {
        template ='project-single';
        getData();
	})

    afterUpdate(async () => {
        if ( slug != storedState ){
            getData();
        }
    });

    onDestroy(() => {
        template = 'nothin'
    })


</script>

{#if data != ''}
<Head pageTagData={pageData} />
<div class="absolute bg-black w-1/2 h-full -mr-8 top-0 right-0" style="z-index: -1;"></div>
<div class="flex">
    <div class="w-1/2 pr-12">
        <Link to="projects"><i>Projects</i></Link> 
        <PageTitle title={brandName} className="text-6xl flex -ml-10" style="letter-spacing: 10px" />

        <div>{@html content}</div>
    </div>
    <div class="w-1/2">
        <div class="w-full rounded-md -ml-10 bg-gray-500 shadow-2xl">
            <header class="w-full h-16">
                <div class="flex justify-between">
                    <button class="mt-2 -mb-1 uppercase text-xs font-semibold tracking-wideset underline rounded-md px-4 py-2 bg-gray-300">Click to view site <i class="fas fa-link ml-2"></i></button>
                    <div class="w-12 h-4 mt-1 mr-2 flex justify-between">
                        <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                        <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                        <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                    </div>
                </div>
                <div class="w-full flex h-6 bg-gray-300">
                    <div class="w-full h-full mx-2 my-px px-2 border-2 bg-white">
                        <p style="font-size: 0.75em;"><span class="text-gray-600">https://</span>thelimitlesstheory.com</p>
                    </div>
                </div>
            </header>
            <img class="w-full" src="{featuredImage.source_url}" />
        </div>
    </div>
</div>
{/if}
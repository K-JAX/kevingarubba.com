<script>

    // modules
    import { onMount, afterUpdate, onDestroy } from "svelte";
	import { Link } from "svelte-routing";
    import Rellax from 'rellax';

// This is the default setting

    // components
    import Head from "../../Functional/Head.svelte";
    import PageTitle from "../Atoms/PageTitle.svelte";
    import ProjectFeature from "../Organisms/ProjectFeature.svelte";
    import BrowserFrame from '../Molecules/BrowserFrame.svelte';
    import ProjectDetailHeader from '../Molecules/ProjectDetailHeader.svelte';
    import Button from '../Atoms/Button.svelte';

    export let slug;
    export let template ='project-single';
    let storedState;
    let data = [];
    let pageData = [];
    let title = '';
    let url = '';
    let featuredImage = {};
    let content = '';
    let arrow = '<i class="ml-5 fas fa-chevron-circle-right">';

    const apiURL = process.env.SAPPER_APP_API_URL;

    const getData = async ()  => {
        const res = await fetch(`${apiURL}/wp/v2/project/?slug=${slug}&_embed`)
        const json = await res.json()
        data = json
        if (data[0] !== undefined){
            pageData = data[0];
            url = pageData.acf.site_url;
            featuredImage = pageData._embedded['wp:featuredmedia'][0].media_details.sizes.large;
            content = pageData.content.rendered;
        }
        storedState = slug;
    }

	onMount(async () => {
        template ='project-single';
        getData();
        setTimeout(function(){
            var rellax = new Rellax('.rellax', {
                breakpoints:[639, 767, 1201]
            }); 

        }, 500)
	})

    afterUpdate(async () => {
        if ( slug != storedState ){
            getData();
        }
    });

    onDestroy(() => {
        template = ''
    })


</script>

{#if data != ''}
<Head pageTagData={pageData} />
<div class="fixed bg-black md:hidden w-1/2 h-screen -mr-8 top-0 right-0" style="z-index: -1;"></div>
<div class="flex md:flex-col-reverse">
    <div class="md:w-full md:mt-16 w-1/2 pr-12 rellax" data-rellax-speed="7" data-rellax-xs-speed="1" data-rellax-mobile-speed="1" >
        <ProjectDetailHeader projectData={pageData} />
    </div>
    <div class="md:w-full w-1/2" data-aos="zoom-out-left" data-aos-duration="1000" data-aos-delay="1000">
        <BrowserFrame image={featuredImage} siteURL={url} />
    </div>
</div>
<div class="project-content">
    {@html content}
</div>
<div class="flex justify-end" data-aos="fade-left" data-aos-delay="600">
    <div class="flex flex-wrap w-3/4 md:w-full bg-white shadow-2xl mt-12 mb-16 -ml-24 p-8 md:p-5 rounded-l-lg">
        <h2 class="text-3xl w-full mb-5">Want to see more?</h2>
        <div class="flex">
            <Link to={`projects/`} ><Button priority='primary' className="mr-5" >See all {@html arrow }</Button></Link>
            <Link to={`contact/`} ><Button priority='tertiary'>Contact me</Button></Link>
        </div>
    </div>
</div>
{/if}


<style lang="scss">

</style>
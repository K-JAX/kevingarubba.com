<script>
    // modules
    import { fade } from 'svelte/transition';
    import { onMount, afterUpdate } from 'svelte';

    // components
    import PageTitle from '../Atoms/PageTitle.svelte';
    import Head from '../../Functional/Head.svelte';
    import Slideshow from '../Organisms/Slideshow.svelte';
    
    let posts = [];
    let featuredPosts = [];
    let example = '';
    let pageData = {};
    // export let slug;
	
	const apiURL = process.env.SAPPER_APP_API_URL;
	
	onMount(async () => {
        const [pageResponse, projResponse] = await Promise.all([
            fetch(`${apiURL}/wp/v2/pages?slug=home`),
            fetch(`${apiURL}/wp/v2/project?_embed`)
        ]);
		const page = await pageResponse.json()
        const posts = await projResponse.json()
        if( page[0] !== ''){
            pageData = page[0]
        }
        featuredPosts = posts.filter( post => post.acf.feature_project == true )
        // console.log(pageData.title.rendered);
    })
    


</script>

<Head pageTagData={pageData} />
<section class="w-full h-full" in:fade="{{duration: 2000}}">
    <Slideshow data={featuredPosts} duration={8000} transition={4000} />
</section>
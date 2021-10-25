<script>
    // modules
    import { onMount, afterUpdate } from 'svelte';
    import { fly } from 'svelte/transition';
   	import { expoInOut } from 'svelte/easing';


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
    })
    


</script>

<Head pageTagData={pageData} />
<section class="w-full h-full overflow-hidden" in:fly="{{y: 500, duration: 2000, easing: expoInOut}}" out:fly="{{y: 500}}">
    <div in:fly="{{y: -1000, duration: 2000, easing: expoInOut}}" out:fly="{{y: -1000}}">
    <!-- <h1>whatevs</h1> -->
        <Slideshow data={featuredPosts} duration={8000} transition={4000} />
    </div>
</section>
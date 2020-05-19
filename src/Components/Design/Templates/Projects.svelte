<script>

	// modules
	import { onMount } from 'svelte';
	import { Router, Link, navigate } from "svelte-routing";
	import queryString from "query-string";
	
	// components
    import PageTitle from '../Atoms/PageTitle.svelte';

	// props
	export let location;
	
	// variables
	let posts = [];
	let filter = false;
	let query = '';
	let parsed = {};
	let queryParams;
	queryParams = queryString.parse(location.search);
	const apiURL = process.env.SAPPER_APP_API_URL;

	if (typeof window !== 'undefined') {
		parsed = queryString.parse(window.location.search);
	}
	
	const getData = async() => {
		const res = await fetch(`${apiURL}/wp/v2/project`)
		const json = await res.json()
		posts = json
	}
	
	onMount(async () => {
		getData();
		
		
	})

	function test(){
		console.log(filter)
		navigate("/projects" + "/", { replace: false });
		if(filter == true){
			navigate("/projects" + "/?search=dev", { replace: false });
		}else{
			navigate("/projects" + "/", { replace: false });
		}

		// if(filter == true){
		// 	window.history.replaceState({}, document.title,  '/projects/dev');
		// }else{
		// 	window.history.replaceState({}, document.title,  '/');
		// }

	}

</script>


<PageTitle title="Projects" />
<label>Development <input type="checkbox" on:change={test} bind:checked={filter} value="something" /></label>
<p>{queryParams.foo}</p>
<ul>
    {#each posts as post}
        <li><Link to="projects/{post.slug}" >{post.title.rendered}</Link></li>
    {/each}
</ul>
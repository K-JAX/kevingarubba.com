<script>
	import { onMount } from 'svelte';
	let posts = [];
	
	const apiURL = process.env.SAPPER_APP_API_URL;
	
	onMount(async () => {
		const res = await fetch(`${apiURL}/wp/v2/posts`)
		const json = await res.json()
		posts = json
	})
    import PageTitle from '../Atoms/PageTitle.svelte';
</script>


<PageTitle title="Blog" />

<ul>
    {#each posts as post}
        <li>{post.title.rendered}</li>
    {/each}
</ul>
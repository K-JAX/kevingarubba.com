<script>
	import { onMount } from 'svelte';
	let posts = [];
	
	onMount(async () => {
		const res = await fetch('http://kg.wordpress.local/wp-json/wp/v2/posts')
		const json = await res.json()
		posts = json
		console.log(posts)
	})
    import PageTitle from '../Atoms/PageTitle.svelte';
</script>


<PageTitle title="Blog" />

<ul>
    {#each posts as post}
        <li>{post.title.rendered}</li>
    {/each}
</ul>
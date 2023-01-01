<script>
	import TransitionContainer from "@components/functional/TransitionContainer.svelte";
	export let data;
	
</script>

<TransitionContainer>
	<h1>Blog page!</h1>

	<ul>
	{#each data.posts as post}	
		<li><a href="/blog/{post.slug}">{post.title.rendered}</a></li>
	{/each}
	</ul>
</TransitionContainer>
<script>
	import { getByTitle } from '@storybook/testing-library';
	import TransitionContainer from '@components/functional/TransitionContainer.svelte';

	export let data;
	let { post } = data;
</script>

<TransitionContainer>
	<h1>{post.title}</h1>
	<div class="content">{@html post.content}</div>
</TransitionContainer>

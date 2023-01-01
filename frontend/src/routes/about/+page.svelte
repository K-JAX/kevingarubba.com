<script>
	import { getByTitle } from '@storybook/testing-library';
	import { fly, fade } from 'svelte/transition';
	import TransitionContainer from '@components/functional/TransitionContainer.svelte';

	export let data;
	let { pageData } = data;
</script>

<!-- <div` in:fly="{{ y: 20, duration: 1000 }}" out:fade class="about-container warning-content"> -->
<TransitionContainer animType="fade">
	<h1>{pageData.title.rendered}</h1>
	<p in:fly={{ y: 20, duration: 500 }} out:fly={{ y: 20, duration: 500 }}>Testingz</p>
</TransitionContainer>

<!-- </div> -->
<style>
	.about-container {
		/* position: absolute; */
	}
</style>

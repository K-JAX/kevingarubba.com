<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	export let animType: string = '';
</script>

{#if animType == 'fade'}
	<main in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
		<slot />
	</main>
{/if}
{#if animType == 'fly'}
	<main in:fly={{ y: 20, duration: 500 }} out:fly={{ y: 20, duration: 500 }}>
		<slot />
	</main>
{/if}
{#if animType == ''}
	<main>
		<slot />
	</main>
{/if}

<style>
	main {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>

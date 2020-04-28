<script>

    import PageTitle from '../Atoms/PageTitle.svelte';
    import { fade } from 'svelte/transition';

    import Head from '../../Functional/Head.svelte';

	import { onMount } from 'svelte';
	let data = [];
	let metaFields = [];
	
	const apiURL = process.env.SAPPER_APP_API_URL;
	
	onMount(async () => {
		const res = await fetch(`${apiURL}/wp/v2/pages/72`)
		const json = await res.json()
		data = json
		metaFields = data.yoast_meta
	})

</script>

<svelte:head>
	<title>Not Found - 404</title>
</svelte:head>

<section in:fade>
    <PageTitle title="404 Not Found" />
    <p >Man dat shit ain't exist!</p>
</section>
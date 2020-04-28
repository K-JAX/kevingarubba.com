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

	let visible = false;

	function typewriter(node, { speed = 50 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === 3
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length * speed;

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
    
</script>

<Head />

<section in:fade>
    <PageTitle title="About" />
    <p >asdf asdlf;l jfdslfkjas ;lsdf</p>
</section>